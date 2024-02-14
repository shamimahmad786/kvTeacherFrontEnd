import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OutsideServicesService } from 'src/app/service/outside-services.service';

import { DateAdapter } from '@angular/material/core';

import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { TeacherAppPdfService } from 'src/app/makePDF/teacher-app-pdf.service';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-profile-verification',
  templateUrl: './profile-verification.component.html',
  styleUrls: ['./profile-verification.component.css']
})
export class ProfileVerificationComponent implements OnInit {
  teacherPreviewConfirmForm: FormGroup;
  verifyTchTeacherProfileData: any;
  applicationId: any;
  loginUserNameForChild: any;
  kvicons: any;
  kvCode: any;
  responseData: any;
  tempTeacherId: any;
  kvSchoolDetails: any;
  flagUpdatedList: any;
  verifyTchTeacherWorkExp: any;
  teacherStationChioce: any;
  schoolDetails:any;
  verifyTchTeacherTraining: any;
  profileTeacherName: any;
  formStatus1: any;
  blinkClass: boolean = true;
  schoolProfileFinalStatus:any;
  profileFinalStatus: boolean = false;
  exportProfileUrl: any;
  constructor(private pdfServive: TeacherAppPdfService,private router: Router, private date: DatePipe, private dataService: DataService,
    private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.exportProfileUrl=environment.BASE_URL_DATA_REPORT
    this.teacherPreviewConfirmForm = this.fb.group({
      "consentCheckBox": new FormControl('', Validators.required),
    });

    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.profileTeacherName=sessionStorage.getItem('profileTeacherName');
    this.getFormStatusV2();
    this.onVerifyClick();
  }
  teacherPdf() {
    // this.onVerifyClick();
    // setTimeout(() => {
    //   this.pdfServive.testFnc(this.verifyTchTeacherProfileData this.verifyTchTeacherWorkExp, this.teacherStationChioce);
    // }, 1000);

  }

  getFormStatusV2(){
    var data ={
      "teacherId": this.tempTeacherId
    }
    debugger
    this.outSideService.getFormStatusV2(data).subscribe((res)=>{
      this.schoolProfileFinalStatus = res.response['profileFinalStatus']
      console.log(res);
      if(res.response['form1Status']=='1' || res.response['form1Status']==1){
        this.profileFinalStatus=true;
       }
  },
  error => {
    Swal.fire({
      'icon':'error',
      'text':error.error
    }
    )
  })
  }
  onVerifyClick() {
    this.outSideService.getUpdatedFlag(this.tempTeacherId).subscribe((res) => {
      this.flagUpdatedList = res.response
    }, error => {
    })
    this.outSideService.fetchConfirmedTchDetails(this.tempTeacherId).subscribe((res) => {
    this.verifyTchTeacherProfileData = res.response.teacherProfile;
    console.log("------------------techer detail----------------")
    console.log(this.verifyTchTeacherProfileData)
    this.schoolDetails = res.response.schoolDetails;
    this.verifyTchTeacherTraining = res.response.training;
  
      for (let i = 0; i < res.response.experience.length; i++) {
        if (res.response.experience[i].workEndDate != null || res.response.experience[i].workEndDate != null) {
          res.response.experience[i].workEndDate = res.response.experience[i].workEndDate;
        }
        res.response.experience[i].workStartDate = res.response.experience[i].workStartDate;
      }
      this.verifyTchTeacherWorkExp = res.response.experience
    })
  }

  consentCheckBoxChange(event: any) {
  //  this.consentCheckBoxValue = event?.target?.checked;
  }
 
  // previousPage(){
  //   this.router.navigate(['/teacher/teacherWorkExperience']);
  // }
  next(){
    this.router.navigate(['/teacher/transferMiscellaneous']);  
  }
  submit(){
    if(this.schoolProfileFinalStatus=='SP' || this.schoolProfileFinalStatus=='' || this.schoolProfileFinalStatus==null){
      Swal.fire({
        icon: 'info',
        'text':'Your basic profile is yet to be verified by your controlling officer. Please get it verified before proceeding further'
      })
      return false;
    }
   // this.router.navigate(['/teacher/transferMiscellaneous'], { queryParams: { 'form': 2 } })
    if (this.teacherPreviewConfirmForm.invalid) {
      Swal.fire({
        'icon':'error',
        'text':'something went wrong!'
      })
      return false;
       }
       else{
            Swal.fire({
              title: 'Are you sure your data is correct!',
              text: 'Once you confirmed here, then you will not be able to modify your data.',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Cancel',
              cancelButtonText: 'Confirm',
              confirmButtonColor: '#ea6c75',
              cancelButtonColor: '#2064cc',
            }).then((result: any) => {
              if (result?.dismiss == "cancel") {
                let data = {
                  transEmpIsDeclaration: 1,
                  teacherId: this.tempTeacherId,
                  inityear:"2024"
                }

                this.outSideService.saveEmployeeTransferDeclarationV2(data).subscribe((res: any) => {
                  if (res?.status) {
                    if (res?.response?.status == 1) {
                      Swal.fire(
                        'Transfer undertaking submitted successfully!',
                        '',
                       'success'
                      ) 
                      this.router.navigate(['/teacher/transferMiscellaneous']);  
                    }
                  }
                })
              }
            })
          }
  }
}
