import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preview-undertaking',
  templateUrl: './preview-undertaking.component.html',
  styleUrls: ['./preview-undertaking.component.css']
})
export class PreviewUndertakingComponent implements OnInit {
  responseData: any;
  displacementCountForm: FormGroup;
  transferCountForm: FormGroup;
  teacherPreviewUndertakingForm: FormGroup;
  tempTeacherId: any;
  teacherrofileData:any;
  enableTransferFormYn: boolean = true;
  kvCode: any;
  responseTcDcData:any;
  transDisable: boolean = false;
  spouseAtSmaeStation: boolean;
  spouseAtCentralGovt: boolean;
  spouseAtStateGovt: boolean;
  wooomanEmp: boolean;
  tcSpouseAtSmaeStation: boolean;
  tcSpouseAtCentralGovt: boolean;
  tcSpouseAtStateGovt: boolean;
  tcWooomanEmp: boolean;
  statUsMessage:any
  totaldaysPresent: number;
  totaldaysPresentTc: number;
  dcStayAtStation: any;
  dcPeriodAbsence: any;
  dcReturnStation: any;
  tcStayAtStation: any;
  tcPeriodAbsence: any;
  tcReturnStation: any;
  showTcField: boolean = false;
  disabled = true;
  empTransferradioButton:any;
  tcSaveYn: any;
  user_name: any;
  profileFinalStatus: boolean = false;
  constructor(private outSideService: OutsideServicesService,private fb: FormBuilder,private modalService: NgbModal) { }
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

    this.teacherPreviewUndertakingForm =  this.fb.group({
      "stationOne": new FormControl('', Validators.required),
      "stationTwo": new FormControl('', Validators.required),
      "stationThree": new FormControl('', Validators.required),
      "stationFour": new FormControl('', Validators.required),
      "stationFive": new FormControl('', Validators.required),
      "dcCountStatus": new FormControl('', Validators.required),
      "tcCountStatus": new FormControl('', Validators.required),
    });
    this.user_name = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.user_name;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }

    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.getFormStatusV2();
   
  }
  getFormStatusV2(){
    var data ={
      "teacherId": this.tempTeacherId
    }
    this.outSideService.getFormStatusV2(data).subscribe((res) => {
     console.log(res.response);
     if(res.response['form4Status']==1 || res.response['form4Status']=='1')
     {
      this.profileFinalStatus=true;
      this.getTcDcPointByTeacherIdAndInityearV2();
     }
     else{
      this.setTcDcReceivedData();
     }
    })
  }
  getTcDcPointByTeacherIdAndInityearV2(){
    var data ={
      "teacherId": this.tempTeacherId,
      "inityear":"2024"
    }
    this.outSideService.getTcDcPointByTeacherIdAndInityear(data).subscribe((res) => {
     this.responseTcDcData=res;
     this.totaldaysPresent = this.responseTcDcData.dcStayAtStation + this.responseTcDcData.dcReturnStation - this.responseTcDcData.dcPeriodAbsence
     this.totaldaysPresentTc = this.responseTcDcData.tcStayAtStation - this.responseTcDcData.tcPeriodAbsence
     this.dcStayAtStation = this.responseTcDcData.dcStayAtStation,
       this.dcPeriodAbsence = this.responseTcDcData.dcPeriodAbsence,
       this.dcReturnStation = this.responseTcDcData.dcReturnStation,
       this.tcStayAtStation = this.responseTcDcData.tcStayAtStation,
       this.tcPeriodAbsence = this.responseTcDcData.tcPeriodAbsence,
       this.tcReturnStation = this.responseTcDcData.tcReturnStation,
       this.displacementCountForm.patchValue({
           kvCode: this.kvCode,
           teacherId: this.tempTeacherId,
           dcStayStationPoint: this.responseTcDcData.dcStayStationPoint,
           dcTenureHardPoint: this.responseTcDcData.dcTenureHardPoint,
           dcPhysicalChallengedPoint: this.responseTcDcData.dcPhysicalChallengedPoint,
           dcMdDfGroungPoint: this.responseTcDcData.dcMdDfGroungPoint,
           dcLtrPoint: this.responseTcDcData.dcLtrPoint,
           dcRjcmNjcmPoint: this.responseTcDcData.dcRjcmNjcmPoint,
           dcTotalPoint: this.responseTcDcData.dcTotalPoint
       })
     this.transferCountForm.patchValue({
         kvCode: this.kvCode,
         teacherId: this.tempTeacherId,
         tcStayStationPoint: this.responseTcDcData.tcStayStationPoint,
         tcTenureHardPoint: this.responseTcDcData.tcTenureHardPoint,
         tcPhysicalChallengedPoint: this.responseTcDcData.tcPhysicalChallengedPoint,
         tcMdDfGroungPoint: this.responseTcDcData.tcMdDfGroungPoint,
         tcLtrPoint: this.responseTcDcData.tcLtrPoint,
         tcRjcmNjcmPoint: this.responseTcDcData.tcRjcmNjcmPoint,
         tcTotalPoint: this.responseTcDcData.tcTotalPoint
     })
     this.getTransferProfile();
    })
  
  }
  getTransferProfile() {
    const data = {
       "teacherId": this.tempTeacherId,
       "inityear":"2024" 
      };
    this.outSideService.getTransferData(data).subscribe((res) => {
      console.log("------transfer data-----------------")
      console.log(res.response) 
      this.teacherrofileData=res.response
      this.teacherPreviewUndertakingForm.patchValue({
        stationOne:  res.response['choiceKv1StationName'],
        stationTwo:  res.response['choiceKv2StationName'],
        stationThree:  res.response['choiceKv3StationName'],
        stationFour:  res.response['choiceKv4StationName'],
        stationFive:  res.response['choiceKv5StationName'],
        dcCountStatus:  String(this.responseTcDcData.dcTotalPoint),
        tcCountStatus:  String(this.responseTcDcData.tcTotalPoint),
    });
      this.empTransferradioButton = res.response.applyTransferYn;
      debugger
      if (this.empTransferradioButton == null || this.empTransferradioButton == "" || this.empTransferradioButton == 0 || this.empTransferradioButton == '0') {
        this.disabled = true;
        this.showTcField =true;
      }
      if (this.empTransferradioButton == 1 || this.empTransferradioButton == '1') {
        this.disabled = false;
        this.showTcField =false;
      }
    })
  }

  setTcDcReceivedData() {
    const data = {
      "kvCode": this.kvCode,
      "teacherId": this.tempTeacherId
    }
    this.outSideService.fetchTcDcData(data).subscribe((res) => {
      debugger
      console.log("tc dc res")
      console.log(res)
      this.responseTcDcData = res;
      if (this.responseTcDcData.transferId != null && this.responseTcDcData.transferId != '') {
        this.transDisable = true;
      }
      this.totaldaysPresent = this.responseTcDcData.dcStayAtStation + this.responseTcDcData.dcReturnStation - this.responseTcDcData.dcPeriodAbsence
      this.totaldaysPresentTc = this.responseTcDcData.tcStayAtStation - this.responseTcDcData.tcPeriodAbsence
      this.dcStayAtStation = this.responseTcDcData.dcStayAtStation,
        this.dcPeriodAbsence = this.responseTcDcData.dcPeriodAbsence,
        this.dcReturnStation = this.responseTcDcData.dcReturnStation,
        this.tcStayAtStation = this.responseTcDcData.tcStayAtStation,
        this.tcPeriodAbsence = this.responseTcDcData.tcPeriodAbsence,
        this.tcReturnStation = this.responseTcDcData.tcReturnStation,
        this.displacementCountForm.patchValue({
            kvCode: this.kvCode,
            teacherId: this.tempTeacherId,
            dcStayStationPoint: this.responseTcDcData.dcStayStationPoint,
            dcTenureHardPoint: this.responseTcDcData.dcTenureHardPoint,
            dcPhysicalChallengedPoint: this.responseTcDcData.dcPhysicalChallengedPoint,
            dcMdDfGroungPoint: this.responseTcDcData.dcMdDfGroungPoint,
            dcLtrPoint: this.responseTcDcData.dcLtrPoint,
            dcRjcmNjcmPoint: this.responseTcDcData.dcRjcmNjcmPoint,
            dcTotalPoint: this.responseTcDcData.dcTotalPoint
        })
      this.transferCountForm.patchValue({
          kvCode: this.kvCode,
          teacherId: this.tempTeacherId,
          tcStayStationPoint: this.responseTcDcData.tcStayStationPoint,
          tcTenureHardPoint: this.responseTcDcData.tcTenureHardPoint,
          tcPhysicalChallengedPoint: this.responseTcDcData.tcPhysicalChallengedPoint,
          tcMdDfGroungPoint: this.responseTcDcData.tcMdDfGroungPoint,
          tcLtrPoint: this.responseTcDcData.tcLtrPoint,
          tcRjcmNjcmPoint: this.responseTcDcData.tcRjcmNjcmPoint,
          tcTotalPoint: this.responseTcDcData.tcTotalPoint
      })
      this.canculateDcPoint();
      this.canculateTcPoint();
      this.getTransferProfile();
    })
  
  }
  canculateDcPoint() {
    if (this.responseTcDcData.dcSinglePoint == '-12') {
      this.displacementCountForm.patchValue({
          dcSinglePoint: this.responseTcDcData.dcSinglePoint
      })
    }
    else {
      this.displacementCountForm.patchValue({
          dcSpousePoint: this.responseTcDcData.dcSpousePoint
      })
      if (this.responseTcDcData.dcSpousePoint == '-10') {
        this.spouseAtSmaeStation = true;
      }
      if (this.responseTcDcData.dcSpousePoint == '-8') {
        this.spouseAtCentralGovt = true;
      }
      if (this.responseTcDcData.dcSpousePoint == '-6') {
        this.spouseAtStateGovt = true;
      }
      if (this.responseTcDcData.dcSpousePoint == '-4') {
        this.wooomanEmp = true;
      }
    }
  }

  canculateTcPoint() {
  
    if (this.responseTcDcData.tcSinglePoint == '20') {
      this.transferCountForm.patchValue({
          tcSinglePoint: this.responseTcDcData.tcSinglePoint
      })
    }
    else {
      this.transferCountForm.patchValue({
          tcSpousePoint: this.responseTcDcData.tcSpousePoint
      })
      if (this.responseTcDcData.tcSpousePoint == '15') {
        this.tcSpouseAtSmaeStation = true;
      }
      if (this.responseTcDcData.tcSpousePoint == '12') {
        this.tcSpouseAtCentralGovt = true;
      }
      if (this.responseTcDcData.tcSpousePoint == '10') {
        this.tcSpouseAtStateGovt = true;
      }
      if (this.responseTcDcData.tcSpousePoint == '8') {
        this.tcWooomanEmp = true;
      }
    }
  }
  onSubmitConfermation(){
      if( this.empTransferradioButton==1){
        this.tcSaveYn=1;
      }else{
        this.tcSaveYn=0;
      }
      const data = {
        kvCode:  this.kvCode,
        teacherId: this.responseTcDcData.teacherId,
        dcStayStationPoint: this.responseTcDcData.dcStayStationPoint,
        dcTenureHardPoint: this.responseTcDcData.dcTenureHardPoint,
        dcPhysicalChallengedPoint: this.responseTcDcData.dcPhysicalChallengedPoint,
        dcMdDfGroungPoint: this.responseTcDcData.dcMdDfGroungPoint,
        dcLtrPoint: this.responseTcDcData.dcLtrPoint,
        dcRjcmNjcmPoint: this.responseTcDcData.dcRjcmNjcmPoint,
        dcTotalPoint: this.responseTcDcData.dcTotalPoint,
        tcStayStationPoint: this.responseTcDcData.tcStayStationPoint,
        tcTenureHardPoint: this.responseTcDcData.tcTenureHardPoint,
        tcPhysicalChallengedPoint: this.responseTcDcData.tcPhysicalChallengedPoint,
        tcMdDfGroungPoint: this.responseTcDcData.tcMdDfGroungPoint,
        tcLtrPoint: this.responseTcDcData.tcLtrPoint,
        tcRjcmNjcmPoint: this.responseTcDcData.tcRjcmNjcmPoint,
        tcTotalPoint: this.responseTcDcData.tcTotalPoint,
        dcSpousePoint: this.responseTcDcData.dcSpousePoint,
        tcSpousePoint: this.responseTcDcData.tcSpousePoint,
        tcSinglePoint: this.responseTcDcData.tcSinglePoint,
        dcSinglePoint: this.responseTcDcData.dcSinglePoint,
        dcStayAtStation: this.dcStayAtStation,
        dcPeriodAbsence: this.dcPeriodAbsence,
        dcReturnStation: this.dcReturnStation,
        tcStayAtStation: this.tcStayAtStation,
        tcPeriodAbsence: this.tcPeriodAbsence,
        dcSaveYn:1,
        inityear:"2024",
        tcSaveYn:this.tcSaveYn,
        tcReturnStation: this.tcReturnStation
      };

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
          this.outSideService.saveTransferDCTCPoints(data).subscribe((res) => {
            this.modalService.dismissAll() 
            if (res) {
             // this.transDisable = true;
             this.saveConfirmation();
            }
        })
      }
      return false;
      });
    }
    saveConfirmation(){
    var data =  {
    "teacherId":this.responseTcDcData.teacherId,
    "teacherEmployeeCode":this.user_name,
    "totalTcCount":this.responseTcDcData.tcTotalPoint,
    "totalDcCount":this.responseTcDcData.dcTotalPoint,
    "stationNameChoice1":this.responseTcDcData.choiceKv1StationName,
    "stationNameChoice2":this.responseTcDcData.choiceKv2StationName,
    "stationNameChoice3":this.responseTcDcData.choiceKv3StationName,
    "stationNameChoice4":this.responseTcDcData.choiceKv4StationName,
    "stationNameChoice5":this.responseTcDcData.choiceKv5StationName,
    "stationCodeChoice1":this.responseTcDcData.choiceKv1StationCode,
    "stationCodeChoice2":this.responseTcDcData.choiceKv2StationCode,
    "stationCodeChoice3":this.responseTcDcData.choiceKv3StationCode,
    "stationCodeChoice4":this.responseTcDcData.choiceKv4StationCode,
    "stationCodeChoice5":this.responseTcDcData.choiceKv5StationCode
  }
    this.outSideService.saveTransferConfirmation(data).subscribe((res)=>{
          if (res) {
            Swal.fire(
              'Your transfer has been submitted  successfully.',
              '',
              'success'
            );
          }
          this.getFormStatusV2();
      },
      error => {
        Swal.fire({
          'icon':'error',
          'text':error.error
        }
        )
      })
}
}
