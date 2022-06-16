import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogRef } from '@features/dialog';
import { PROJECT_COLORS } from '@shared/const';
import { ColorOption } from '@shared/models';
import { ProjectsService } from '@stores/projects';

@Component({
  selector: 't-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectComponent {
  readonly colors = PROJECT_COLORS;
  title: string;
  color: string;

  constructor(private projectsService: ProjectsService, private dialogRef: DialogRef) {}

  create(): void {
    this.projectsService
      .create({
        title: this.title,
        color: this.color,
      })
      .subscribe(() => this.close());
  }

  close(): void {
    this.dialogRef.close();
  }

  handleSelectColor(colorOption: ColorOption): void {
    this.color = colorOption.color;
  }
}
