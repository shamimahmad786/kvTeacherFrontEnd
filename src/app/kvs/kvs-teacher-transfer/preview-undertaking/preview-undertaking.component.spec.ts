import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUndertakingComponent } from './preview-undertaking.component';

describe('PreviewUndertakingComponent', () => {
  let component: PreviewUndertakingComponent;
  let fixture: ComponentFixture<PreviewUndertakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewUndertakingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewUndertakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
