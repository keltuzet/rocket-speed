import { Component } from '@angular/core';
import { AuthQuery } from '@auth/stores';
import { IconRegistrarService, ThemesService } from '@shared/services';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 'rock-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly loading$ = this.authQuery.selectLoading();

  constructor(iconRegistrarService: IconRegistrarService, themesService: ThemesService, private authQuery: AuthQuery) {
    iconRegistrarService.init();
    themesService.init();
  }
}
