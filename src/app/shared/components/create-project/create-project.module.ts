import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project.component';
import { SelectColorModule } from '../select-color/select-color.module';
import { SwitchModule } from '@features/switch';
import { ButtonModule } from '@features/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateProjectComponent],
  imports: [CommonModule, SelectColorModule, SwitchModule, ButtonModule, FormsModule],
  exports: [CreateProjectComponent],
})
export class CreateProjectModule {}
