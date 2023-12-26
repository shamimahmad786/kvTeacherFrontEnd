import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
@Component({
  selector: 'app-kvs-teacher-transfer',
  templateUrl: './kvs-teacher-transfer.component.html',
  styleUrls: ['./kvs-teacher-transfer.component.css']
})
export class KvsTeacherTransferComponent implements OnInit {
  tempTeacherId: any;
  FormStatus1: boolean = false;
  FormStatus2: boolean = false;
  FormStatus3: boolean = false;
  FormStatus4: boolean = false;
  constructor(private outSideService: OutsideServicesService,private router: Router) {
  }
  ngOnInit(): void {  
   this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
   this.getFormStatusV2();
  }
  getFormStatusV2(){
    var data ={
      "teacherId": this.tempTeacherId
    }
    this.outSideService.getFormStatusV2(data).subscribe((res) => {
     if(res.response['form1Status']=='1'){
      this.FormStatus1=true;
     }
     if(res.response['form2Status']=='1'){
      this.FormStatus2=true;
     }
     if(res.response['form3Status']=='1'){
      this.FormStatus3=true;
     }
     if(res.response['form4Status']=='1'){
      this.FormStatus4=true;
     }
    })
  }
  processTransfer(){
    if(this.FormStatus1==true){
      this.router.navigate(['/teacher/transferMiscellaneous']);
    }
    else{
      this.router.navigate(['/teacher/profileVerifiation']);
    }
  }
}
