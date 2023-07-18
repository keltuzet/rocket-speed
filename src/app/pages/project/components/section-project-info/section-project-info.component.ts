import { Component, OnInit } from '@angular/core';
import { ProjectPageManager } from '@pages/project/project-page-manager.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 't-section-project-info',
  templateUrl: './section-project-info.component.html',
  styleUrls: ['./section-project-info.component.scss'],
})
export class SectionProjectInfoComponent implements OnInit {
  readonly project$ = this.projectPageManager.selectProject();
  readonly projectRawData$ = this.projectPageManager.selectProject().pipe(
    filter(Boolean),
    map(({ info, title }) => {
      const list = Object.entries(info ?? {});
      return [['Title', title], ...list];
    }),
  );

  constructor(private readonly projectPageManager: ProjectPageManager) {}

  ngOnInit(): void {}
}
