import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { from, Observable, of } from 'rxjs';
import { PROJECT_DEFAULT_COLOR } from '@shared/const';
import { CreateProject, Project } from './project.model';
import { ProjectsState, ProjectsStore } from './projects.store';

@Injectable({
  providedIn: 'root',
})
@CollectionConfig({ path: 'projects' })
export class ProjectsService extends CollectionService<ProjectsState> {
  constructor(store: ProjectsStore) {
    super(store);
  }

  duplicate(project: Project): Observable<string> {
    const statuses = project.statuses.map(status => ({ title: status.title, id: this.createId() }));
    return this.create({
      title: `Copy ${project.title}`,
      color: project.color,
      users: project.users,
      statuses,
    });
  }

  create({ title, color, statuses }: CreateProject): Observable<string> {
    return from(
      this.add({
        title,
        statuses: statuses || [],
        color: color || PROJECT_DEFAULT_COLOR,
      }),
    );
  }
}
