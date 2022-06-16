import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent, LoginComponent, ForgotPasswordComponent } from '@auth/components';
import { AuthGuard } from '@auth/guards';
import { AppPreloadingStrategy } from '@core/routing';
import { FaqGuard } from '@shared/guards';
import {
  TagsResolver,
  ProjectsResolver,
  TodosResolver,
  UsersResolver,
  PrioritiesResolver,
  CommentsResolver,
} from '@shared/resolvers';
import { environment } from 'environments/environment';

import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';

const devRoutes: Routes = !environment.production
  ? [
      {
        path: 'icon-catalog',
        loadChildren: () => import('./pages/icon-catalog/icon-catalog.module').then(m => m.IconCatalogModule),
      },
    ]
  : [];

const routes: Routes = [
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  ...devRoutes,
  {
    path: '',
    component: PageLayoutComponent,
    canActivate: [AuthGuard],
    resolve: {
      tags: TagsResolver,
      projects: ProjectsResolver,
      todos: TodosResolver,
      users: UsersResolver,
      priorities: PrioritiesResolver,
      comments: CommentsResolver,
    },
    children: [
      {
        path: 'todays',
        loadChildren: () => import('./pages/todays/todays.module').then(m => m.TodaysModule),
        data: { preload: true },
      },
      {
        path: 'upcoming',
        loadChildren: () => import('./pages/upcoming/upcoming.module').then(m => m.UpcomingModule),
        data: { preload: true },
      },
      {
        path: 'project',
        loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule),
        data: { preload: true },
      },
      {
        path: 'label',
        loadChildren: () => import('./pages/label/label.module').then(m => m.LabelModule),
      },
      {
        path: 'faq',
        loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule),
        canActivate: [FaqGuard],
        canDeactivate: [FaqGuard],
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'todays',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
