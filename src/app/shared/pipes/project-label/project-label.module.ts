import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectLabelPipe } from './project-label.pipe';



@NgModule({
  declarations: [
    ProjectLabelPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProjectLabelPipe
  ]
})
export class ProjectLabelModule { }
