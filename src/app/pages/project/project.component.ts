import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { trackByIdentity } from '@shared/utils';
import { ProjectsQuery, ProjectWithTodos, Status, StatusWithTodos } from '@stores/projects';
import { DetailedTodo, TodosQuery } from '@stores/todos';
import { ProjectPageManager } from './project-page-manager.service';
import { ProjectDeatilsQuery } from '@stores/projects/project-details.query';

@Component({
  selector: 't-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  readonly project$ = this.projectPageManager.projectId$.pipe(
    switchMap(id => this.projectDeatilsQuery.selectProject(id)),
  );
  readonly trackByID = trackByIdentity<Status>('id');
  readonly loading$ = this.projectsQuery.selectLoading().pipe(
    tap(isLoading => {
      if (isLoading) this.spinnerService.show(this.projectLoaderName);
      else this.spinnerService.hide(this.projectLoaderName);
    }),
  );
  readonly projectLoaderName = 'project-loader';
  projectTodos$: Observable<DetailedTodo[]>;

  constructor(
    private projectsQuery: ProjectsQuery,
    private todosQuery: TodosQuery,
    private spinnerService: NgxSpinnerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly projectPageManager: ProjectPageManager,
    private readonly projectDeatilsQuery: ProjectDeatilsQuery,
  ) {}

  ngOnInit(): void {}

  navToProjectInfoSection() {
    this.router.navigate(
      [{ outlets: { 'project-info': 'project-info-section', 'project-tasks': 'project-tasks-section' } }],
      {
        relativeTo: this.activatedRoute,
      },
    );
  }

  getProject(): Observable<ProjectWithTodos> {
    return this.projectsQuery.selectRouteProject().pipe(
      switchMap(project => {
        this.projectTodos$ = this.todosQuery.selectProjectTodos(project.id);
        if (!project.statuses.length) return of(project as ProjectWithTodos);

        const statuses$: Observable<StatusWithTodos[]> = combineLatest(
          project.statuses.map(status =>
            this.todosQuery.selectByStatusID(status.id).pipe(map(todos => ({ ...status, todos }))),
          ),
        );

        return statuses$.pipe(
          map(statuses => {
            return { ...project, statuses };
          }),
        );
      }),
    );
  }
}
