import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorListMenuComponent } from './color-list-menu.component';

describe('ColorListMenuComponent', () => {
  let component: ColorListMenuComponent;
  let fixture: ComponentFixture<ColorListMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorListMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
