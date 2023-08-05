import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService, AuthStore } from '@auth/stores';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private authStore: AuthStore) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authStore.setLoading(true);
    return this.authService.sync().pipe(
      map(data => {
        this.authStore.setLoading(false);
        if (!data) this.navToLogin();
        const [user, profile] = data;
        this.authService.updateOnHasChanges(user, profile);
        return true;
      }),
    );
  }

  private navToLogin(): void {
    this.router.navigate(['/login']);
  }
}
