import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPreviewConfirmComponent } from './teacher-preview-confirm.component';

describe('TeacherPreviewConfirmComponent', () => {
  let component: TeacherPreviewConfirmComponent;
  let fixture: ComponentFixture<TeacherPreviewConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPreviewConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPreviewConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
