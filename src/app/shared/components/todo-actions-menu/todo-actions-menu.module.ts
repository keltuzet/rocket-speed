import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MenuModule } from 'todoist-menu';
import { TooltipModule } from 'todoist-tooltip';
import { TodoActionsMenuComponent } from './todo-actions-menu.component';
import { PriorityListModule } from '../todo-priority-list/todo-priority-list.module';
import { TodoScheduleHolderModule } from '../todo-schedule-holder/todo-schedule-holder.module';

@NgModule({
  declarations: [TodoActionsMenuComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    RouterModule,
    MenuModule,
    TooltipModule,
    PriorityListModule,
    TodoScheduleHolderModule,
  ],
  exports: [TodoActionsMenuComponent],
})
export class TodoActionsMenuModule {}
