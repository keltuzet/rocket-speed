import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TooltipModule } from 'todoist-tooltip';
import { MenuModule } from 'todoist-menu';
import { NgLetModule } from 'ng-let';
import { ProjectIconModule } from '@shared/pipes';
import { SelectProjectMenuComponent } from './select-project-menu/select-project-menu.component';
import { SelectProjectButtonComponent } from './select-project-button/select-project-button.component';

@NgModule({
  declarations: [SelectProjectMenuComponent, SelectProjectButtonComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    NgLetModule,
    TooltipModule,
    MenuModule,
    ProjectIconModule,
  ],
  exports: [SelectProjectMenuComponent, SelectProjectButtonComponent],
})
export class SelectProjectModule {}
