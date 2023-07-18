import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionProjectTasksComponent } from './section-project-tasks.component';

describe('SectionProjectTasksComponent', () => {
  let component: SectionProjectTasksComponent;
  let fixture: ComponentFixture<SectionProjectTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionProjectTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionProjectTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
