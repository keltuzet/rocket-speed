import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TooltipModule } from 'todoist-tooltip';

import { IconModule } from '@features/icon';
import { SvgIconTextModule } from '@shared/directives';
import { TodoScheduleHolderComponent } from './todo-schedule-holder.component';

@NgModule({
  declarations: [TodoScheduleHolderComponent],
  imports: [CommonModule, AngularSvgIconModule, TooltipModule, SvgIconTextModule, IconModule],
  exports: [TodoScheduleHolderComponent],
})
export class TodoScheduleHolderModule {}
