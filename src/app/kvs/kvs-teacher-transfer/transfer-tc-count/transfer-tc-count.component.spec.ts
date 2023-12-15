import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTcCountComponent } from './transfer-tc-count.component';

describe('TransferTcCountComponent', () => {
  let component: TransferTcCountComponent;
  let fixture: ComponentFixture<TransferTcCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferTcCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTcCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
