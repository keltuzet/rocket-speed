import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { filter, share } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class KeyboardListener {
  private lastestKeydown$ = new BehaviorSubject<KeyboardEvent>(null);
  public onKeydown: Observable<KeyboardEvent>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.onKeydown = this.getKeydown().pipe(share());
  }

  init() {
    this.onKeydown.subscribe((event: KeyboardEvent) => {
      this.lastestKeydown$.next(event);
    });
  }

  public getKeydown(): Observable<KeyboardEvent> {
    return fromEvent<KeyboardEvent>(this.document, 'keydown');
  }

  public getKeydownByShortcut(keys: string[], ) {
    return this.getKeydown().pipe(
      filter(event => {
        return true;
      }),
    );
  }
}
