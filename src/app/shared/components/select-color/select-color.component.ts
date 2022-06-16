import { EventEmitter } from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { ColorOption } from '@shared/models';
import { isNil } from '@shared/utils';
import { ColorListMenuComponent, ColorListMenuData } from './color-list-menu/color-list-menu.component';

@Component({
  selector: 't-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectColorComponent {
  @Input() activeIndex: number;
  @Input() colorsList: ColorOption[];
  @Output('selectColor') selectEventEmitter = new EventEmitter<ColorOption>();

  readonly colorListMenu = ColorListMenuComponent;

  get hasActiveIndex(): boolean {
    return !isNil(this.activeIndex);
  }
  get menuData(): ColorListMenuData {
    return { colorsList: this.colorsList, activeIndex: this.activeIndex };
  }

  selectColor(option: ColorOption): void {
    this.activeIndex = this.colorsList.findIndex(item => option.label === item.label);
    this.selectEventEmitter.emit(option);
  }
}
