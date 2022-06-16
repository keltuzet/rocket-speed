import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OverlayModule } from '@angular/cdk/overlay';

import { SnackbarService } from './services/snackbar.service';
import { SnackbarContainerComponent, ActionCompletedDetailsComponent } from './components';

@NgModule({
  declarations: [SnackbarContainerComponent, ActionCompletedDetailsComponent],
  imports: [CommonModule, AngularSvgIconModule, OverlayModule],
  providers: [SnackbarService],
  exports: [ActionCompletedDetailsComponent],
})
export class SnackbarModule {}
