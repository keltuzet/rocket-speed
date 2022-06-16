import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 't-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {}
