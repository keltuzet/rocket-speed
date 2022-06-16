import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectProjectModule } from '@shared/components';
import { IconModule } from '@features/icon';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [FaqComponent, QuestionComponent],
  imports: [CommonModule, FaqRoutingModule, ReactiveFormsModule, SelectProjectModule, IconModule],
})
export class FaqModule {}
