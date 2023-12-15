import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transfer-dc-count',
  templateUrl: './transfer-dc-count.component.html',
  styleUrls: ['./transfer-dc-count.component.css']
})
export class TransferDcCountComponent implements OnInit {
  responseData: any;
  displacementCountForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.displacementCountForm = new FormGroup({
      'kvCode': new FormControl(),
      'id': new FormControl(),
      'tcSaveYn': new FormControl(),
      'teacherId': new FormControl(),
      'transferId': new FormControl(),
      'teacherEmployeeCode': new FormControl(),
      'dcStayStationPoint': new FormControl(),//1
      'dcTenureHardPoint': new FormControl(),//3
      'dcPhysicalChallengedPoint': new FormControl(),//3     
      'dcMdDfGroungPoint': new FormControl(),
      'dcLtrPoint': new FormControl(),//5   
      'dcSinglePoint': new FormControl(),//6
      'dcSpousePoint': new FormControl(),//6    
      'dcRjcmNjcmPoint': new FormControl(),//7        
      'dcTotalPoint': new FormControl(),
    });
  }
  onSubmit(){
    
  }
}
