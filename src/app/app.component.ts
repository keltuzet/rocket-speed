import { Component, Inject } from '@angular/core';
import { AuthQuery } from '@auth/stores';
import { IconRegistrarService, KeyboardListener, ThemesService } from '@shared/services';

@Component({
  selector: 'rock-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly loading$ = this.authQuery.selectLoading();

  constructor(
    iconRegistrarService: IconRegistrarService,
    themesService: ThemesService,
    private authQuery: AuthQuery,
    private readonly keyboardListener: KeyboardListener,
  ) {
    iconRegistrarService.init();
    themesService.init();
    keyboardListener.init();
  }
}
