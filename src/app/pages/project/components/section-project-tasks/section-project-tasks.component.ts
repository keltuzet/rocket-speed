import { Component } from '@angular/core';
import { ProjectPageManager } from '@pages/project/project-page-manager.service';
import { DetailedTodo } from '@stores/todos';
import { Observable } from 'rxjs';

@Component({
  selector: 't-section-project-tasks',
  templateUrl: './section-project-tasks.component.html',
  styleUrls: ['./section-project-tasks.component.scss'],
})
export class SectionProjectTasksComponent {
  readonly todos$: Observable<DetailedTodo[]> = this.projectPageManager.selectTodos();
  readonly isTodosLoading$: Observable<boolean> = this.projectPageManager.isTodosLoading$;

  constructor(private projectPageManager: ProjectPageManager) {}
}
