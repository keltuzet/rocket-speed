import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetModule } from 'ng-let';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuModule } from 'todoist-menu';

import { SelectColorComponent } from './select-color.component';
import { ColorListMenuComponent } from './color-list-menu/color-list-menu.component';

@NgModule({
  imports: [CommonModule, MenuModule, NgLetModule, AngularSvgIconModule],
  declarations: [SelectColorComponent, ColorListMenuComponent],
  exports: [SelectColorComponent, ColorListMenuComponent],
})
export class SelectColorModule {}
