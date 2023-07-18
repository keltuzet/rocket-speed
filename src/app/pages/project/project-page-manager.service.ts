import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, filter, switchMap } from 'rxjs/operators';
import { Project, ProjectsQuery } from '@stores/projects';
import { DetailedTodo, TodosQuery } from '@stores/todos';

@Injectable()
export class ProjectPageManager {
  private todos$ = new BehaviorSubject<DetailedTodo[]>([]);
  private project$ = new BehaviorSubject<Project>(null);
  readonly isTodosLoading$: Observable<boolean> = this.todosQuery.selectLoading();
  readonly projectId$: Observable<string>;

  constructor(private projectsQuery: ProjectsQuery, private todosQuery: TodosQuery, private router: Router) {
    this.projectId$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.url.includes('/project/')),
      map((event: NavigationEnd) => {
        return event.url.split('/')[2];
      }),
      shareReplay(1),
    );

    this.projectId$
      .pipe(
        switchMap((id: string) => {
          return this.projectsQuery.selectEntity(id);
        }),
      )
      .subscribe(project => this.project$.next(project));

    this.projectId$
      .pipe(
        switchMap((id: string) => {
          return this.todosQuery.selectProjectTodos(id);
        }),
      )
      .subscribe(todos => this.todos$.next(todos));
  }

  selectTodos(): Observable<DetailedTodo[]> {
    return this.todos$;
  }

  selectProject(): Observable<Project> {
    return this.project$;
  }

  /*
    // Gets activated route from root level
  getProjectId(): string {
    let currentRoute = this.activatedRoute;
    this.projectId = null;
    do {
      if (currentRoute.snapshot.paramMap.has('id')) {
        this.projectId = currentRoute.snapshot.paramMap.get('id');
        break;
      }
      currentRoute = currentRoute.parent;
    } while (currentRoute);

    return this.projectId;
  }
  */
}
