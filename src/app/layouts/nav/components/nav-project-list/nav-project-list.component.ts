import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { ProjectActionsMenuComponent } from '@shared/components/project-actions-menu/project-actions-menu.component';
import { Project } from '@stores/projects';
import { UnsubscribeService } from '@shared/services';
import { ProjectsQuery } from '@stores/projects/projects.query';
import { Dialog } from '@features/dialog';
import { CreateProjectComponent } from '@shared/components';

@Component({
  selector: 't-nav-project-list',
  templateUrl: './nav-project-list.component.html',
  styleUrls: ['./nav-project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService],
})
export class NavProjectListComponent implements OnInit {
  projects: Project[];
  readonly projectActionsMenu = ProjectActionsMenuComponent;

  constructor(
    private projectsQuery: ProjectsQuery,
    private dialog: Dialog,
    private changeDetectorRef: ChangeDetectorRef,
    private unsubscribe: UnsubscribeService,
  ) {}

  ngOnInit(): void {
    this.projectsQuery.selectAll();
    this.projectsQuery.all$.pipe(takeUntil(this.unsubscribe)).subscribe(projects => {
      this.projects = projects;
      this.changeDetectorRef.markForCheck();
    });
  }

  projectTrackyBy(index: number, item: Project): string {
    return item.id;
  }

  drop(event: CdkDragDrop<Project[]>): void {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
  }

  create(event: MouseEvent): void {
    event.stopPropagation();
    this.dialog
      .open(CreateProjectComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe();
  }
}
