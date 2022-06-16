import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuModule } from 'todoist-menu';
import { TooltipModule } from 'todoist-tooltip';
import { ButtonModule } from '@features/button';
import { AddTagsButtonComponent } from './add-tags-button/add-tags-button.component';
import { SelectTagsMenuComponent } from './select-tags-menu/select-tags-menu.component';
import { CheckboxModule } from '@features/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddTagsButtonComponent, SelectTagsMenuComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    MenuModule,
    TooltipModule,
    CheckboxModule,
    ButtonModule,
  ],
  exports: [AddTagsButtonComponent, SelectTagsMenuComponent],
})
export class TagActionsModule {}
