import { Injectable } from '@angular/core';
import { combineQueries } from '@datorama/akita';
import { TodosQuery } from '@stores/todos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectWithTodos, StatusWithTodos } from './project.model';
import { ProjectsQuery } from './projects.query';

@Injectable({
  providedIn: 'root',
})
export class ProjectDeatilsQuery {
  constructor(private readonly projectsQuery: ProjectsQuery, private readonly todosQuery: TodosQuery) {}

  selectProject(projectId: string): Observable<ProjectWithTodos> {
    return combineQueries([this.projectsQuery.selectEntity(projectId), this.todosQuery.selectProjectTodos(projectId)]).pipe(
      map(([project, todos]) => {
        const statusesMap: Map<string, StatusWithTodos> = new Map(
          project.statuses.map(status => [status.id, { ...status, todos: [] }]),
        );
        todos.forEach(todo => {
          if (statusesMap.has(todo.statusId)) {
            const status = statusesMap.get(todo.statusId);
            status.todos.push(todo);
          }
        });
        return {
          ...project,
          statuses: Array.from(statusesMap.values()),
        };
      }),
    );
  }
}
