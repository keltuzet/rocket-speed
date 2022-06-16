import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TooltipModule } from 'todoist-tooltip';
import { MenuModule } from 'todoist-menu';

import { RadioButtonModule } from '@features/radio-button';
import { CapitalizeModule, TimePassedModule } from '@shared/pipes';
import { TodoComponent } from './todo.component';
import { TodoActionsMenuModule } from '../todo-actions-menu';
import { UpdateTaskDetailsModule } from '../update-task-details/update-task-details.module';
import { TodoDeadlineMenuModule } from '../t-todo-deadline-menu/t-todo-deadline-menu.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule,
    RouterModule,
    RadioButtonModule,
    TooltipModule,
    MenuModule,
    TimePassedModule,
    CapitalizeModule,
    TodoActionsMenuModule,
    UpdateTaskDetailsModule,
    TodoDeadlineMenuModule,
  ],
  declarations: [TodoComponent],
  exports: [TodoComponent],
})
export class TodoModule {}
