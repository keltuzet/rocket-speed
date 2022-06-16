import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IconComponent } from './icon.component';
import { IconDirective } from './icon.directive';

@NgModule({
  declarations: [IconComponent, IconDirective],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [IconComponent, IconDirective],
})
export class IconModule {}
