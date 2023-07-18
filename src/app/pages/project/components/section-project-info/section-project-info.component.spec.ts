import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionProjectInfoComponent } from './section-project-info.component';

describe('SectionProjectInfoComponent', () => {
  let component: SectionProjectInfoComponent;
  let fixture: ComponentFixture<SectionProjectInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionProjectInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionProjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
