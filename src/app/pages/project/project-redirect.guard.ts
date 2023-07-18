import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProjectRedirectGuard implements CanActivate {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url.split('/').length > 3) return true;

    const redirectTo: any[] = route.pathFromRoot
      .filter(snapshot => snapshot.url !== null && snapshot.url.length > 0)
      .reduce((arr, snapshot) => arr.concat(snapshot.url.map(urlSegment => urlSegment.path)), new Array<string>());

    redirectTo.push({
      outlets: { 'project-info': 'project-info-section', 'project-tasks': 'project-tasks-section' },
    });

    this.router.navigate(redirectTo, { relativeTo: this.activatedRoute });
    return true;
  }
}
