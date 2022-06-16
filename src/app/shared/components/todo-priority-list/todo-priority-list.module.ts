import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TooltipModule } from 'todoist-tooltip';

import { PriorityFlagIconModule } from '@shared/directives';
import { PriorityListComponent } from './todo-priority-list.component';

@NgModule({
  declarations: [PriorityListComponent],
  imports: [CommonModule, AngularSvgIconModule, TooltipModule, PriorityFlagIconModule],
  exports: [PriorityListComponent],
})
export class PriorityListModule {}
