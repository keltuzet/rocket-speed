import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 't-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements OnInit {
  isFormModel = false;
  form = this.fb.group({
    title: ['', Validators.required],
    description: [],
  });
  formInvalid$ = this.form.statusChanges.pipe(
    startWith(this.form.invalid),
    map(() => this.form.invalid),
  );
  isInit = false;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.isInit = true;
  }

  displayFormModel(): void {
    this.isFormModel = true;
  }

  submit(): void {
  }
}
