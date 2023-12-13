import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBasicProfileComponent } from './teacher-basic-profile.component';

describe('TeacherBasicProfileComponent', () => {
  let component: TeacherBasicProfileComponent;
  let fixture: ComponentFixture<TeacherBasicProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherBasicProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherBasicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
