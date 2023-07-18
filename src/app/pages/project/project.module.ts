import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TooltipModule } from 'todoist-tooltip';

import { ButtonModule } from '@features/button';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectNotFoundComponent, TodoBoardCardComponent } from './components';
import { RadioButtonModule } from '@features/radio-button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SectionProjectInfoComponent } from './components/section-project-info/section-project-info.component';
import { SectionProjectTasksComponent } from './components/section-project-tasks/section-project-tasks.component';
import { IconModule } from '@features/icon';
import { NgLetModule } from 'ng-let';
import { ProjectPageManager } from './project-page-manager.service';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectNotFoundComponent,
    TodoBoardCardComponent,
    SectionProjectInfoComponent,
    SectionProjectTasksComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    AngularSvgIconModule,
    NgxSpinnerModule,
    ButtonModule,
    TooltipModule,
    RadioButtonModule,
    IconModule,
    NgLetModule,
  ],
  providers: [ProjectPageManager],
})
export class ProjectModule {}
