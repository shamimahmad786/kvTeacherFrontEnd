import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-kvs-teacher-transfer',
  templateUrl: './kvs-teacher-transfer.component.html',
  styleUrls: ['./kvs-teacher-transfer.component.css']
})
export class KvsTeacherTransferComponent implements OnInit {
  profileVerification: any = false;
  Miscellaneous: any = false;
  stationChoice: any = false;
  displacementCount: any = false;
  transferCount: any = false;
  previewAndUndertaking: any = false;
  constructor() {
  }
  ngOnInit(): void {
   this.profileVerification=true;
   this.Miscellaneous=true;
   this.stationChoice=true;
   this.displacementCount=true;
   this.transferCount=true;
   this.previewAndUndertaking=false;  
  }

}
