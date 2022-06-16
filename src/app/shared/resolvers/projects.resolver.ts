import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { orderBy, where } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ProjectsService } from '@stores/projects';

@Injectable({ providedIn: 'root' })
export class ProjectsResolver implements Resolve<boolean> {
  constructor(projectsService: ProjectsService) {
    projectsService.syncCollection([where('users', 'array-contains', 'G5ydi6skDnOvl1Ptwxo6Z3ECUlu1')]).subscribe();
  }

  resolve(): Observable<boolean> {
    return of(true);
  }
}
