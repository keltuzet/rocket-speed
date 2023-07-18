import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionProjectInfoComponent } from './components/section-project-info/section-project-info.component';
import { SectionProjectTasksComponent } from './components/section-project-tasks/section-project-tasks.component';
import { ProjectRedirectGuard } from './project-redirect.guard';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProjectComponent,
    canActivate: [ProjectRedirectGuard],
    data: {
      showPanel: true,
      panelDetails: {
        showAccessUser: true,
        provider: () => true,
      },
    },
    children: [
      {
        path: 'project-info-section',
        component: SectionProjectInfoComponent,
        outlet: 'project-info',
      },
      {
        path: 'project-tasks-section',
        component: SectionProjectTasksComponent,
        outlet: 'project-tasks',
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
