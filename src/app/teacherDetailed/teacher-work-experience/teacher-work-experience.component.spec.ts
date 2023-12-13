import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherWorkExperienceComponent } from './teacher-work-experience.component';

describe('TeacherWorkExperienceComponent', () => {
  let component: TeacherWorkExperienceComponent;
  let fixture: ComponentFixture<TeacherWorkExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherWorkExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
