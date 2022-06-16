import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SelectedProjectType } from '@stores/projects';

import { SelectProjectMenuComponent } from '../select-project-menu/select-project-menu.component';

@Component({
  selector: 't-select-project-button',
  templateUrl: './select-project-button.component.html',
  styleUrls: ['./select-project-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectProjectButtonComponent {
  @Input() project: SelectedProjectType;
  @Output() readonly projectChange = new EventEmitter<SelectedProjectType>();
  readonly selectProjectMenu = SelectProjectMenuComponent;

  updateValue(selectedProject: SelectedProjectType): void {
    if (!selectedProject || selectedProject instanceof PointerEvent) return;
    this.project = selectedProject;
    this.projectChange.emit(selectedProject);
  }
}
