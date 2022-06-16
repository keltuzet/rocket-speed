import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TooltipModule } from 'todoist-tooltip';
import { MenuModule } from 'todoist-menu';

import { TodoModule, OverdueTodoListModule } from '@shared/components';
import { CapitalizeModule } from '@shared/pipes';
import { TodaysRoutingModule } from './todays-routing.module';
import { TodaysComponent } from './todays.component';
import { SortMenuComponent, TodaysTodoListComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    TodaysRoutingModule,
    AngularSvgIconModule,
    DragDropModule,
    TooltipModule,
    CapitalizeModule,
    MenuModule,
    OverdueTodoListModule,
    TodoModule,
  ],
  declarations: [TodaysComponent, SortMenuComponent, TodaysTodoListComponent],
})
export class TodaysModule {}
