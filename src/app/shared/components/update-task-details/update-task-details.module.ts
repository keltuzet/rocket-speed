import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxLetDirectiveModule } from 'ngx-let-directive';
import { MenuModule } from 'todoist-menu';
import { TooltipModule } from 'todoist-tooltip';

import { TabsModule } from '@features/tabs/tabs.module';
import { RadioButtonModule } from '@features/radio-button';
import { ButtonModule } from '@features/button';
import { HexTransparencyModule } from '@shared/pipes';
import { PriorityFlagIconModule } from '@shared/directives';


import { UpdateTaskDetailsComponent } from './update-task-details.component';
import { CommentsModule } from '../comments/comments.module';
import { PriorityActionsModule } from '../priority-actions/priority-actions.module';
import { TagActionsModule } from '../tag-actions/tag-actions.module';

@NgModule({
  declarations: [UpdateTaskDetailsComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    NgxLetDirectiveModule,
    TabsModule,
    RadioButtonModule,
    ButtonModule,
    MenuModule,
    TooltipModule,
    HexTransparencyModule,
    PriorityFlagIconModule,
    CommentsModule,
    PriorityActionsModule,
    TagActionsModule,
  ],
  exports: [UpdateTaskDetailsComponent],
})
export class UpdateTaskDetailsModule {}
