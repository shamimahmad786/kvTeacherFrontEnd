import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMiscellaneousComponent } from './transfer-miscellaneous.component';

describe('TransferMiscellaneousComponent', () => {
  let component: TransferMiscellaneousComponent;
  let fixture: ComponentFixture<TransferMiscellaneousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferMiscellaneousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMiscellaneousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
