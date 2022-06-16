import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  ContentChild,
  AfterViewInit,
  OnInit,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';

export type IconSizeName = 'extra-large' | 'large' | 'me';
export type IconSizeShortName = '';

@Component({
  selector: 't-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements AfterViewInit {
  @Input() set size(value: number) {
    this.width = value;
    this.height = value;
  }
  @ContentChild(ViewContainerRef) elementRef: ElementRef<any>;

  width: number;
  height: number;
  name: string;
  showIconName = true;

  constructor(private elRef: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.name = this.elRef.nativeElement.textContent;
    this.showIconName = false;
    this.cdr.detectChanges();
  }
}
