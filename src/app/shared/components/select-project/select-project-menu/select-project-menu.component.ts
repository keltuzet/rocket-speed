import { Component, ChangeDetectionStrategy, Inject, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, startWith, switchMap } from 'rxjs';
import { MenuRef, MENU_DATA } from 'todoist-menu';
import { PROJECT_INBOX_COLOR } from '@shared/const';
import { getFilterToken } from '@shared/utils';
import { Project, ProjectsQuery, SelectedProject, SelectedProjectType, Status } from '@stores/projects';

@Component({
  selector: 't-select-project-menu',
  templateUrl: './select-project-menu.component.html',
  styleUrls: ['./select-project-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectProjectMenuComponent {
  readonly projects$ = this.getProjectList();
  readonly selectedProjectID: string = this.project.status ? this.project.status.id : this.project.id;
  readonly search = new FormControl();
  readonly filteredProjects$ = this.getFilteredProjects();
  @HostBinding('class.menu-list') readonly hostMenuClass = true;

  constructor(
    @Inject(MENU_DATA) private project: SelectedProject,
    private menuRef: MenuRef<SelectedProjectType>,
    private projectsQuery: ProjectsQuery,
  ) {
    const search$ = this.search.valueChanges.pipe(startWith(''));
  }

  select(project: Project, status?: Status): void {
    this.menuRef.close({
      ...project,
      status,
    });
  }

  private getProjectList(): Observable<Project[]> {
    return this.projectsQuery.all$.pipe(
      map(projects => [
        { color: PROJECT_INBOX_COLOR, title: 'Входящие', isIncoming: true, id: 'incoming' } as Project,
        ...projects,
      ]),
    );
  }

  private getFilteredProjects(): Observable<Project[]> {
    const search$ = this.search.valueChanges.pipe(debounceTime(300), startWith(''));
    return search$.pipe(
      switchMap((searchStr: string) => {
        const search = searchStr?.toLocaleLowerCase().trim();
        if (!search) return this.projects$;
        return this.projects$.pipe(
          map(projects => {
            const hasMap = new Map<string, Project>();
            projects.forEach(project => {
              if (project.isIncoming) {
                if (getFilterToken(project.title).includes(search)) hasMap.set(project.id, project);
                return;
              }

              if (getFilterToken(project.title).includes(search)) {
                hasMap.set(project.id, { ...project, statuses: [] });
              }

              project.statuses.forEach(status => {
                if (getFilterToken(status.title).includes(search)) {
                  if (hasMap.has(project.id)) {
                    hasMap.get(project.id).statuses.push(status);
                  } else {
                    hasMap.set(project.id, { ...project, statuses: [status] });
                  }
                }
              });
            });

            return Array.from(hasMap.values());
          }),
        );
      }),
    );
  }
}
