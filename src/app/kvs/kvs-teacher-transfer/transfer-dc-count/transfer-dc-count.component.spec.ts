import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDcCountComponent } from './transfer-dc-count.component';

describe('TransferDcCountComponent', () => {
  let component: TransferDcCountComponent;
  let fixture: ComponentFixture<TransferDcCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferDcCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDcCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
