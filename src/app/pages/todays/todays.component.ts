import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthQuery } from '@auth/stores';
import { HexTransparencyPipe } from '@shared/pipes';
import { CommentsQuery } from '@stores/comments';
import { MeQuery } from '@stores/me';
import { PrioritiesQuery, PrioritiesService } from '@stores/priorities';
import { ProjectsQuery } from '@stores/projects';
import { TagsQuery } from '@stores/tags';
import { TodosQuery } from '@stores/todos';
import { UsersQuery } from '@stores/users/users.query';
import { UsersService } from '@stores/users/users.service';
import { SortMenuComponent } from './components/sort-menu/sort-menu.component';

@Component({
  selector: 't-todays',
  templateUrl: './todays.component.html',
  styleUrls: ['./todays.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodaysComponent {
  today = new Date();
  sortMenu = SortMenuComponent;
  todays$ = this.todosQuery.selectTodays().pipe();
  overdue$ = this.todosQuery.selectOverdue().pipe().subscribe();

  @ViewChild('header', { read: ElementRef }) header: ElementRef<HTMLDivElement>;

  constructor(
    private todosQuery: TodosQuery,
    private user: UsersQuery,
    private usersService: UsersService,
    private p: PrioritiesService,
    private pq: PrioritiesQuery,
    private t: TagsQuery,
    private pr: ProjectsQuery,
    private to: TodosQuery,
    private auth: AuthQuery,
    private meQuery: MeQuery,
    private commentsQuery: CommentsQuery,
    private hex: HexTransparencyPipe,
  ) {}

  /**
   * Add scroll event to blacklist
   */
  @HostListener('scroll', ['$event']) onScroll(event): void {
    if (event.target.scrollTop < 25) {
      this.header.nativeElement.style.borderBottom = '';
      return;
    }
    if (event.target.scrollTop > 25) {
      this.header.nativeElement.style.borderBottom = '1px solid #f0f0f0';
      return;
    }
  }
}
