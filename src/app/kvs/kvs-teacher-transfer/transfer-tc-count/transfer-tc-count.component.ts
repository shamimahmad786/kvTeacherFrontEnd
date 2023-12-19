import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transfer-tc-count',
  templateUrl: './transfer-tc-count.component.html',
  styleUrls: ['./transfer-tc-count.component.css']
})
export class TransferTcCountComponent implements OnInit {
  responseData: any;
  transferCountForm: FormGroup;
  enableTransferFormYn: boolean = true;
  isZiet: any;  
  constructor() { }

  ngOnInit(): void {
    this.transferCountForm = new FormGroup({
      'id': new FormControl(),
        'kvCode': new FormControl(),
        'teacherId': new FormControl(),
        'transferId': new FormControl(),
        'teacherEmployeeCode': new FormControl(),
        'tcStayStationPoint': new FormControl(),//1
        'tcTenureHardPoint': new FormControl(),//3
        'tcPhysicalChallengedPoint': new FormControl(),//3     
        'tcMdDfGroungPoint': new FormControl(),
        'tcLtrPoint': new FormControl(),//5   
        'tcSinglePoint': new FormControl(),//6
        'tcSpousePoint': new FormControl(),//6    
        'tcRjcmNjcmPoint': new FormControl(),//7        
        'tcTotalPoint': new FormControl(),
    });
  }
  enableTransferForm(val) {
    if (val == '1') {
      this.enableTransferFormYn = true;
    } else if (val == '0') {
      this.enableTransferFormYn = false;
    }
  }
  onSubmit(){

  }
}
