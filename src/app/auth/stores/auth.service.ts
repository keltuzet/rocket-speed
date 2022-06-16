import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isNil } from '@shared/utils';
import { CollectionConfig, FireAuthService } from 'akita-ng-fire';
import { User, UserCredential } from 'firebase/auth';
import { from } from 'rxjs';
import { AuthState, AuthStore, Profile, profileKeys } from './auth.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class AuthService extends FireAuthService<AuthState> {
  private readonly accessTokenKey = 'accessToken';
  private readonly refreshTokenKey = 'refreshToken';

  constructor(protected store: AuthStore, private router: Router) {
    super(store);
  }

  onSignin(credentials: UserCredential): void {
  }

  onSignout(): void {
    this.router.navigateByUrl('/login');
  }

  createProfile(user: User): Partial<Profile> {
    return { photoURL: user.photoURL, displayName: user.displayName };
  }

  updateOnHasChanges(user: User, profile?: Partial<Profile>): void {
    const updatedProfile = this.assignProfile(user, profile);
    if (!updatedProfile) return;
    this.update(updatedProfile).then()
  }

  private assignProfile(authProfile: User, profile?: Partial<Profile>): Partial<Profile> | undefined {
    let hasChanges = false;
    const updatesProfile = profileKeys.reduce((collector, key) => {
      if (!profile || isNil(profile[key]) && !isNil(authProfile[key])) {
        collector[key] = authProfile[key];
        hasChanges = true;
      } else {
        collector[key] = profile[key] || null;
      }
      return collector;
    }, {});

    return hasChanges ? updatesProfile : undefined;
  }
}
