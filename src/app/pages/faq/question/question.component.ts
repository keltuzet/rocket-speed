import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 't-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input() userName: string;
  @Output() onChanged = new EventEmitter<boolean>()
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {}

  userSaved(userName: string) {}

  change(incresed: boolean) {
    this.onChanged.emit(incresed)
  }
}
