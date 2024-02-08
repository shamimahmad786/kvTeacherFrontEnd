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
  selector: 'app-teacher-preview-confirm',
  templateUrl: './teacher-preview-confirm.component.html',
  styleUrls: ['./teacher-preview-confirm.component.css']
})
export class TeacherPreviewConfirmComponent implements OnInit {
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
  ReadOnlyStyleGuideNotes: boolean;
  token:any;
  exportProfileUrl: any;
  constructor(private pdfServive: TeacherAppPdfService,private router: Router, private date: DatePipe, private dataService: DataService,
    private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.ReadOnlyStyleGuideNotes = true;
    this.exportProfileUrl=environment.BASE_URL_DATA_REPORT
    this.teacherPreviewConfirmForm = this.fb.group({
      "teacherName": new FormControl('', Validators.required),
      "teacherGender": new FormControl('', Validators.required),
      "teacherDob": new FormControl('', Validators.required),
      "teacherEmplCode": new FormControl('', Validators.required),
      "teacherDisability": new FormControl('', Validators.required),
      "ExperienceStartDatePresentKv": new FormControl('', Validators.required),
      "workExperienceAppointedForSubject": new FormControl('', Validators.required),
      "lastPromotionPositionType": new FormControl('', Validators.required),
      "undertaking1": new FormControl('', Validators.required),
      "undertaking2": new FormControl('', Validators.required),
    });

    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.profileTeacherName=sessionStorage.getItem('profileTeacherName');
    this.onVerifyClick();
    this.getTeacherConfirmationV2();

    this.token =JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token;
  }
  teacherPdf() {
    // this.onVerifyClick();
    // setTimeout(() => {
    //   this.pdfServive.testFnc(this.verifyTchTeacherProfileData this.verifyTchTeacherWorkExp, this.teacherStationChioce);
    // }, 1000);

  }
  onVerifyClick() {
    this.outSideService.getUpdatedFlag(this.tempTeacherId).subscribe((res) => {
      this.flagUpdatedList = res.response
    }, error => {
    })
    this.outSideService.fetchConfirmedTchDetails(this.tempTeacherId).subscribe((res) => {
      debugger
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
  getTeacherConfirmationV2(){
    var data={
      "teacherId":this.tempTeacherId}
    this.outSideService.getTeacherConfirmationV2(data).subscribe((res)=>{
      if(res){
        console.log("---------------teacher check  detilll------");
        console.log(res);
        this.teacherPreviewConfirmForm.patchValue({
          teacherName:  res.response['teacherName'],
          teacherGender:  res.response['teacherGender'],
          teacherDob:  res.response['teacherDob'],
          teacherEmplCode:  res.response['teacherEmployeeCode'],
          teacherDisability:  res.response['teacherDisabilityYn'],
          ExperienceStartDatePresentKv:  res.response['workExperienceWorkStartDatePresentKv'],
          workExperienceAppointedForSubject:  res.response['workExperienceAppointedForSubject'],
          lastPromotionPositionType:  res.response['lastPromotionPositionType'],
      });
   
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

  previousPage(){
    this.router.navigate(['/teacher/teacherWorkExperience']);
  }
  submit(){
    debugger
    if (this.teacherPreviewConfirmForm.invalid) {
      Swal.fire({
        'icon':'error',
        'text':'something went worng!'
      })
      return false;
       }
  if(this.teacherPreviewConfirmForm.value.teacherName==false || this.teacherPreviewConfirmForm.value.teacherGender==false || this.teacherPreviewConfirmForm.value.teacherDob==false || this.teacherPreviewConfirmForm.value.teacherEmplCode==false
       || (this.teacherPreviewConfirmForm.value.teacherDisability==false  && this.teacherPreviewConfirmForm.value.teacherDisability!='0')|| this.teacherPreviewConfirmForm.value.ExperienceStartDatePresentKv==false
       || this.teacherPreviewConfirmForm.value.workExperienceAppointedForSubject==false || this.teacherPreviewConfirmForm.value.lastPromotionPositionType==false
       || this.teacherPreviewConfirmForm.value.undertaking1==false || this.teacherPreviewConfirmForm.value.undertaking2==false ){
        Swal.fire({
          'icon':'error',
          'text':'Please check all fields'
        })
        return false;
       }
       else{
       
        var data = {
            "teacherName": this.verifyTchTeacherProfileData['teacherName'],
            "teacherGender": this.verifyTchTeacherProfileData['teacherGender'],
            "teacherDob":this.verifyTchTeacherProfileData['teacherDob'],
            "teacherEmployeeCode":this.verifyTchTeacherProfileData['teacherEmployeeCode'],
            "teacherDisabilityYn": this.verifyTchTeacherProfileData['teacherDisabilityYn'],
            "workExperienceWorkStartDatePresentKv": this.verifyTchTeacherProfileData['workExperienceWorkStartDatePresentKv'],
            "workExperienceAppointedForSubject": this.verifyTchTeacherProfileData['workExperienceAppointedForSubject'],
            "lastPromotionPositionType": this.verifyTchTeacherProfileData['lastPromotionPositionType'],
            "teacherId": this.verifyTchTeacherProfileData['teacherId'],
        }
       console.log(data)
       Swal.fire({
        'icon':'warning',
        'text': "Do you want to proceed ?",
        'allowEscapeKey': false,
        'allowOutsideClick': false,
        'showCancelButton': true,
        'confirmButtonColor': "#DD6B55",
        'confirmButtonText': "Yes",
        'cancelButtonText': "No",
        'showLoaderOnConfirm': true,
      }
      ).then((isConfirm) => {
        if (isConfirm.value === true) {
            this.outSideService.saveTeacherConfirmationV2(data).subscribe((res)=>{
              debugger
              console.log(res)
              if(res){
                Swal.fire(
                  'Confirmation save successfully!',
                  '',
                  'success'
                ) 
              } 
              this.getTeacherConfirmationV2(); 
        },
        error => {
          Swal.fire({
            'icon':'error',
            'text':error.error
          }
          )
        })
      }
      return false;
      });
       }
  }
}
