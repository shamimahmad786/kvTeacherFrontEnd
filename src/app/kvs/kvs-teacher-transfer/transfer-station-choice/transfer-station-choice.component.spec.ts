import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferStationChoiceComponent } from './transfer-station-choice.component';

describe('TransferStationChoiceComponent', () => {
  let component: TransferStationChoiceComponent;
  let fixture: ComponentFixture<TransferStationChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferStationChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferStationChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
