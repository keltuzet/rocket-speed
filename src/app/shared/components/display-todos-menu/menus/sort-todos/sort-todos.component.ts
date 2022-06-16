import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MENU_DATA, MenuRef } from 'todoist-menu';
import { SortTodosBy } from '@stores/todos';

@Component({
  selector: 't-sort-todos-by',
  templateUrl: './sort-todos.component.html',
  styleUrls: ['./sort-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortTodosByComponent {
  menuItems: SortTodosBy[] = Object.values(SortTodosBy);

  constructor(@Inject(MENU_DATA) public selected$: BehaviorSubject<SortTodosBy>, private menuRef: MenuRef) {}

  select(item: SortTodosBy): void {
    this.menuRef.close(item);
  }
}
