import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, timer, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AppPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      const delay: number = route.data['delay'];
      if (!delay) return load();
      return timer(delay).pipe(
        mergeMap(_ => {
          return load();
        }),
      );
    } else {
      return of(null);
    }
  }
}
