import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ColorOption } from '@shared/models';
import { trackByIdentity } from '@shared/utils';
import { MenuRef, MENU_DATA } from 'todoist-menu';

export type ColorListMenuData = {
  colorsList: ColorOption[];
  activeIndex?: number;
};

@Component({
  selector: 't-color-list-menu',
  templateUrl: './color-list-menu.component.html',
  styleUrls: ['./color-list-menu.component.scss', '../select-color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorListMenuComponent {
  activeIndex: number;
  colorsList: ColorOption[];
  trackByLabel = trackByIdentity<ColorOption>('label');

  constructor(@Inject(MENU_DATA) data: ColorListMenuData, private menuRef: MenuRef<ColorOption>) {
    this.activeIndex = data?.activeIndex;
    this.colorsList = data?.colorsList || [];
  }

  select(option: ColorOption): void {
    if (this.colorsList[this.activeIndex] === option) return;
    this.menuRef.close(option);
  }
}
