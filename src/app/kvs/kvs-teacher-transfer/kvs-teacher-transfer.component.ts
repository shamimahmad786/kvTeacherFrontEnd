import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import * as moment from 'moment';
import { TeacherTransferPdfService } from 'src/app/makePDF/teacher-transfer-pdf.service';
import { DataService } from 'src/app/service/data.service'
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare const loadScroller: any;
declare const nextClickCalled: any;
declare const nextTempClick: any;
declare const onNextClick: any;
declare const onPreviousClick: any;

@Component({
  selector: 'app-kvs-teacher-transfer',
  templateUrl: './kvs-teacher-transfer.component.html',
  styleUrls: ['./kvs-teacher-transfer.component.css']
})
export class KvsTeacherTransferComponent implements OnInit {

  @ViewChild('selectSchoolModal', { static: true }) selectSchoolModal: TemplateRef<any>;
  @ViewChild('selectSchoolModalInterStation', { static: true }) selectSchoolModalInterStation: TemplateRef<any>;

  transferForm: FormGroup;

  showMe: boolean = true
  responseDataTransfer: any = {}
  sh: any;
  gkFile: any;
  gkFile11: any;
  gkFile12: any;
  gkFilebenefit: boolean = false;
  gkFilemMedical: boolean = false;
  spGround: boolean = false;
  dfpGround: boolean = false;
  boardExam: boolean = false;
  careGiver: boolean = false;
  abledChild: boolean = false;
  isChecked: boolean = true;
  panelOpenState = false;
  step = 0;
  tempTeacherId: any;
  isCheckedNew: any;
  proceed: boolean;
  teacherTypeData: any;
  teacherTypeDataNameCode: any;
  stationList: any;
  tempFalse: boolean = false;
  disabled = true;

  kvSchoolDetails: any;
  stationNameCode: any;
  stationCode: any;
  kvNameCode: any;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  kvCode: any;
  existingTransferId: any;

  subjectList: any;
  subjectListNameCode: any;

  stateMasterList: any;
  noAward: boolean = false;
  regionalAward: boolean = false;
  nationalAward: boolean = false;
  presidentAward: boolean = false;

  responseData: any;
  appG1: any;
  appG2: any;

  showStationChoice18B: boolean = false;
  showStationChoice18C: boolean = false;
  showStationChoice18: boolean = false;
  show18BOption: boolean = false;
  show18COption: boolean = false;
  onlyDcFill: boolean = false;
  profileData: any;
  districListByStateIdP: any;
  teacherExperienceData: any;

  kvSchoolList: any;
  kvSchoolListP1: any;
  kvSchoolListP2: any;
  kvSchoolListP3: any;
  kvSchoolListP4: any;
  kvSchoolListP5: any;
  showMe11: boolean = true;

  regionList: any;
  selectedUdiseCode: any;
  position: any;

  sameStationSchool1: any;
  sameStationSchool2: any;
  sameStationSchool3: any;
  sameStationSchool4: any;
  sameStationSchool5: any;

  absence1: number = 0;
  absence2: number = 0;
  totalWorkingDaysF: number = 0;
  totalWorkingDaysTC: number = 0;
  show18BOptionCheckBox = null;

  disableShiftType: boolean = false;
  preferenceStationList: any = [];
  preferenceSchoolList: any;
  reponseDataForPdf: any;
  empTransferradioButton: any;
  absenceTc: number = 0;
  transfer5b: boolean = true;
  transfer7b: boolean = true;
  documentUploadArray: any[] = [];
  enableUploadButton0: boolean = false;
  enableUploadButton1: boolean = false;
  enableUploadButton2: boolean = false;
  enableUploadButton3: boolean = false;
  enableUploadButton5: boolean = false;
  enableUploadButton6: boolean = false;
  enableUploadButton7: boolean = false;
  enableUploadButton8: boolean = false;

  deleteDocUpdate0: boolean = true;
  deleteDocUpdate1: boolean = true;
  deleteDocUpdate2: boolean = true;
  deleteDocUpdate3: boolean = true;
  deleteDocUpdate5: boolean = true;
  deleteDocUpdate6: boolean = true;
  deleteDocUpdate7: boolean = true;
  deleteDocUpdate8: boolean = true;
  fromStatus: any;

  employeeType: any = "Regular"
  transferApplicationNumberVal: any;
  enableTransferFormYn: boolean = true;
  enableTransferFormYnVal: any;
  transferStatusOperation: any;

  memJCM: boolean = false;
  formStatusLocale: any;
  showTcField: boolean = false;
  formDataList: any;
  transferGroundList: any

  imageData: any;

  disableLTR: boolean = false;
  disableDFP: boolean = false;
  disableMDG: boolean = false;
  disableSP: boolean = false;
  disableWidow: boolean = false;

  isZiet: any;
  spouseStationName: any;

  spouseStationCode: any;

  spouseStatus: any;
  responseTcDcData: any;
  totaldaysPresent: any;
  totaldaysPresentTc: any;
  dcStayAtStation: any;
  dcPeriodAbsence: any;
  dcReturnStation: any;
  tcStayAtStation: any;
  tcPeriodAbsence: any;
  tcReturnStation: any;
  spouseAtSmaeStation: boolean;
  spouseAtCentralGovt: boolean;
  spouseAtStateGovt: boolean;
  wooomanEmp: boolean;
  tcSpouseAtSmaeStation: boolean;
  tcSpouseAtCentralGovt: boolean;
  tcSpouseAtStateGovt: boolean;
  tcWooomanEmp: boolean;
  transDisable: boolean = false;

  verifyTchTeacherProfileData: any;
  teacherStationChioce: any;
  verifyTchTeacherWorkExp: any;

  consentCheckBoxValue: boolean = false;
  schoolVerifyStatus: boolean = false;
  tcButtondisable: boolean = false;

  savedPreview: number = 0;
  spouseStationFlag: boolean = false;

  conscentProccedClick: number = 0;

  blinkClass: boolean = true;
  temppTeacherId: any;
  AllregionList: any;

  dynamicFlagBasedMessages: string;
  flagsBasedMessages: boolean = false;
  showMessageForTcEligible :boolean = false;
  tcMessage:any;
  transferCountSaveYn: any;


  constructor(private date: DatePipe, private formData: FormDataService, private router: Router, private dataService: DataService, private outSideService: OutsideServicesService, private fb: FormBuilder, private modalService: NgbModal,
    private transferPdfService: TeacherTransferPdfService) {

    // this.onNextClick(2);
  }

  nextClick(index) {
    nextClickCalled(index);
  }

  onNextClick(index) {
    onNextClick(index);
  }

  onPreviousClick(index) {
    onPreviousClick(index);
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  appraisalAvg() {

    var appG1Value = 0;
    var appG2Value = 0;
    var total = 0;
    if (this.appG1 * 1 >= 0 && this.appG1 * 1 <= 3.9 || this.appG2 * 1 >= 0 && this.appG2 * 1 <= 3.9) {

      if (this.appG1 != null && this.appG1 * 1 >= 0 && this.appG1 * 1 <= 3.9) {
        appG1Value = 2;
      }
      if (this.appG2 != null && this.appG2 * 1 >= 0 && this.appG2 * 1 <= 3.9) {
        appG2Value = 2;
      }

      var total = (appG1Value * 1 + appG2Value * 1)

      if (total < 5) {
        this.transferForm.patchValue({
          displacementCount: {
            q2DPt: total
          }
        })
      }
    } else {
      this.transferForm.patchValue({
        displacementCount: {
          q2DPt: 0
        }
      })
    }
    this.appraisalAvgT();
  }

  appraisalAvgT() {
    var appG1ValueT = 0;
    var appG2ValueT = 0;
    var totalT = 0;
    if (this.appG1 * 1 >= 8 || this.appG2 * 1 >= 8) {

      if (this.appG1 != null && this.appG1 * 1 >= 8) {
        appG1ValueT = 2;
      }
      if (this.appG2 != null && this.appG2 * 1 >= 8) {
        appG2ValueT = 2;
      }
      var totalT = (appG1ValueT * 1 + appG2ValueT * 1)
      if (totalT < 5) {
        this.transferForm.patchValue({
          transferCount: {
            q2TPt: totalT
          }
        })
      }
    } else {
      this.transferForm.patchValue({
        transferCount: {
          q2TPt: 0
        }
      })
    }
  }

  pHEmployee(val) {
    if (val == '1') {
      this.transferForm.patchValue({
        displacementCount: {
          q9DPt: -60
        }
      })
    } else if (val == '0') {
      this.transferForm.patchValue({
        displacementCount: {
          q9DPt: 0
        }
      })
    }
  }

  associatedMember(val) {
    if (val == '1') {
      this.memJCM = true;
      this.transferForm.patchValue({
        displacementCount: {
          q10DPt: -25
        },
        declaration: {
          memberJCM: '1'
        },
        transferCount: {
          associationMemberYnT: '1'
        }
      })
    } else if (val == '2') {
      this.memJCM = true;
      this.transferForm.patchValue({
        displacementCount: {
          q10DPt: -25
        },
        declaration: {
          memberJCM: '1'
        },
        transferCount: {
          associationMemberYnT: '2'
        }
      })
    } else if (val == '0') {
      this.memJCM = false;
      this.transferForm.patchValue({
        displacementCount: {
          q10DPt: 0
        },
        declaration: {
          memberJCM: '0'
        },
        transferCount: {
          associationMemberYnT: '3'
        }
      })
    }
  }

  prevStep() {
    this.step--;
  }
  toogleTag() {
    this.showMe = !this.showMe
  }
  showMe1: boolean = true
  toogleTag1() {
    this.showMe1 = !this.showMe1
  }
  showMe2: boolean = true
  toogleTag2() {
    this.showMe2 = !this.showMe2
  }
  showMe3: boolean = true
  toogleTag3() {
    this.showMe3 = !this.showMe3
  }
  showMe4: boolean = true
  toogleTag4() {
    this.showMe4 = !this.showMe4
  }
  showMe5: boolean = true
  toogleTag5() {
    this.showMe5 = !this.showMe5
  }
  showMe6: boolean = true
  toogleTag6() {
    this.showMe6 = !this.showMe6
  }
  showMe7: boolean = true
  toogleTag7() {
    this.showMe7 = !this.showMe7
  }
  showMe8: boolean = true
  toogleTag8() {
    this.showMe8 = !this.showMe8
  }
  showMe9: boolean = true
  toogleTag9() {
    this.showMe9 = !this.showMe9
  }
  showMe10: boolean = true
  toogleTag10() {
    this.showMe10 = !this.showMe10
  }
  toogleTag11() {
    this.showMe11 = !this.showMe11
  }

  getTeacherDetailsForPreview() {
    this.outSideService.fetchConfirmedTchDetails(this.tempTeacherId).subscribe((res: any) => {
      this.verifyTchTeacherProfileData = res.response.teacherProfile;
      this.teacherStationChioce = res.response.teacherTrainingProfile;
    })
  }

  changeDateFormat(date: any) {
    return moment(date).format('DD-MM-YYYY')
  }

  consentCheckBoxChange(event: any) {
    this.consentCheckBoxValue = event?.target?.checked;
  }


  mouseEnter(){
    this.blinkClass= false;
  }

  mouseLeave(){
    this.blinkClass = true;
  }
  
  proceedToStationChoice() {
    this.conscentProccedClick = 1;
    if (this.consentCheckBoxValue) {
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
            teacherId: this.tempTeacherId
          }
          this.outSideService.savePreviewConsent(data).subscribe((res: any) => {
            if (res?.status) {
              if (res?.response?.status == 1) {
                this.savedPreview = 1;
                // this.checkDeclairationStatus();
              }
            }
          })
        }
      })
    }
    else {
      Swal.fire('Please check the consent', '', 'error')
    }
  }

  getPreviewAndChcekPermissions(teacherId: any) {
    let data = {
      teacher_id: teacherId
    }
    this.outSideService.getTransferPreviewPermissions(data).subscribe((res: any) => {
      debugger
console.log(res?.response?.rowValue[0]?.unfrez_flag);
      if(res?.response?.rowValue[0]?.unfrez_flag=='Y'){
        this.flagsBasedMessages = true;
        this.dynamicFlagBasedMessages = `You recently updated your basic profile, so please check after sometime.`;
      }
      var specialCheck=(+res?.response?.rowValue[0]?.teacher_disability_yn)+(+res?.response?.rowValue[0]?.personal_status_dfpd)+(+res?.response?.rowValue[0]?.personal_status_mdgd);
      if (res?.status) {
        let spouseStatus = res?.response?.rowValue[0]?.spouse_status;
        let spouseStationCode = res?.response?.rowValue[0]?.spouse_station_code;
        if (spouseStatus == 1 || spouseStatus == 2 || spouseStatus == 3) {
          if (spouseStationCode) {
            this.schoolVerifyStatus = (res?.response?.rowValue[0]?.final_status == 'SA' || res?.response?.rowValue[0]?.final_status == 'TTD'  || res?.response?.rowValue[0]?.final_status == 'TTS');
            this.fromStatus = res?.response?.rowValue[0]?.final_status;
            this.consentCheckBoxValue = res?.response?.rowValue[0]?.trans_emp_is_declaration == '1';

          

            if(res?.response?.rowValue[0]?.valid_post_for_transfer != 1){
              this.flagsBasedMessages = true;
              this.dynamicFlagBasedMessages = `Your post is not eligible to proceed further with transfer Application. In case of any clarifications, please contact your controlling officer.`;
            }
            if(res?.response?.rowValue[0]?.valid_location_for_transfer == 3){
              this.flagsBasedMessages = true;
              this.dynamicFlagBasedMessages = 'Ziet or RO Teaching employees are not eligible to procced further with Transfer applications. In case of any clarifications, please contact your controlling officer. ';
            }
            if(res?.response?.rowValue[0]?.valid_location_for_transfer == 4){
              this.flagsBasedMessages = true;
              this.dynamicFlagBasedMessages = 'HQ employees are not eligible to procced further with Transfer applications due to Administrative reasons. In case of any clarifications, please contact your controlling officer.';
            }
            if(res?.response?.rowValue[0]?.court_case_flag != 1){
              this.flagsBasedMessages = true;
              this.dynamicFlagBasedMessages = `You are not eligible to procced further with Transfer application due to Administrative reasons. In case any clarifications, please contact your controlling officer.`;
            }
            if(res?.response?.rowValue[0]?.disciplinary_yn != 1){
              this.flagsBasedMessages = true;
              this.dynamicFlagBasedMessages = `Employees with disciplinary proceedings are not eligible to procced further with Transfer application as per Transfer Policy 2023. In case any clarifications, please contact your controlling officer.`;
            }
     
            if( specialCheck < 1 &&  res?.response?.rowValue[0]?.teacher_age < 57 )
            {
            if(res?.response?.rowValue[0]?.nature_of_stn_at_join == 1 ){
            
              if(res?.response?.rowValue[0]?.dctenure_year < 5 && res?.response?.rowValue[0]?.activestay < 5 ){
                this.flagsBasedMessages = true;
                this.dynamicFlagBasedMessages = `You are not eligible as minimum active stay at Normal Station is not complete as per Transfer Policy 2023. In case any clarifications, please contact your controlling officer.`;
              }
              else if(res?.response?.rowValue[0]?.dctenure_year >= 5 && res?.response?.rowValue[0]?.activestay < 5 ){
                   this.onlyDcFill = true;
              }
            }
            else if(res?.response?.rowValue[0]?.nature_of_stn_at_join == 3 || res?.response?.rowValue[0]?.nature_of_stn_at_join == 4){
              if(res?.response?.rowValue[0]?.dctenure_year < 5 && res?.response?.rowValue[0]?.activestay < 3 ){
                this.flagsBasedMessages = true;
                this.dynamicFlagBasedMessages = `You are not eligible as minimum active stay at Hard Station is not complete as per Transfer Policy 2023. In case any clarifications, please contact your controlling officer.`;
              }else if(res?.response?.rowValue[0]?.dctenure_year >= 5 && res?.response?.rowValue[0]?.activestay < 3 ){
                this.onlyDcFill = true;
           }           
            }
          }
          }
          else {
 
            this.spouseStationFlag = true;

          }
        }
        else {
          this.schoolVerifyStatus = (res?.response?.rowValue[0]?.final_status == 'SA' || res?.response?.rowValue[0]?.final_status == 'TTD' || res?.response?.rowValue[0]?.final_status == 'TTS');
          this.fromStatus = res?.response?.rowValue[0]?.final_status;
          this.consentCheckBoxValue = res?.response?.rowValue[0]?.trans_emp_is_declaration == '1';

        

          if(res?.response?.rowValue[0]?.valid_post_for_transfer != 1){
            this.flagsBasedMessages = true;
            this.dynamicFlagBasedMessages = `Your post is not eligible to proceed further with transfer Application. In case of any clarifications, please contact your controlling officer.`;
          }
          if(res?.response?.rowValue[0]?.valid_location_for_transfer == 3){
            this.flagsBasedMessages = true;
            this.dynamicFlagBasedMessages = 'Ziet or RO Teaching employees are not eligible to procced further with Transfer applications due to Administrative reasons. In case of any clarifications, please contact your controlling officer. ';
          }
          if(res?.response?.rowValue[0]?.valid_location_for_transfer == 4){
            this.flagsBasedMessages = true;
            this.dynamicFlagBasedMessages = 'HQ employees are not eligible to procced further with Transfer applications due to Administrative reasons. In case of any clarifications, please contact your controlling officer.';
          }
          if(res?.response?.rowValue[0]?.court_case_flag != 1){
            this.flagsBasedMessages = true;
            this.dynamicFlagBasedMessages = `You are not eligible to procced further with transfer application due to Administrative reasons. In case any clarifications, please contact your controlling officer.`;
          }
          if(res?.response?.rowValue[0]?.disciplinary_yn != 1){
            this.flagsBasedMessages = true;
            this.dynamicFlagBasedMessages = `Employees with disciplinary proceedings are not eligible to procced further with Transfer application as per Transfer Policy 2023. In case any clarifications, please contact your controlling officer.`;
          }

          if( specialCheck < 1 &&  res?.response?.rowValue[0]?.teacher_age < 57 )
           {
          if(res?.response?.rowValue[0]?.nature_of_stn_at_join == 1 ){
            if(res?.response?.rowValue[0]?.dctenure_year < 5 && res?.response?.rowValue[0]?.activestay < 5 ){
              this.flagsBasedMessages = true;
              this.dynamicFlagBasedMessages = `You are not eligible as minimum active stay at Normal Station is not complete as per Transfer Policy 2023. In case any clarifications, please contact your controlling officer.`;
            }
            else if(res?.response?.rowValue[0]?.dctenure_year >= 5 && res?.response?.rowValue[0]?.activestay < 5 ){
                 this.onlyDcFill = true;
            }
          }
          else if(res?.response?.rowValue[0]?.nature_of_stn_at_join == 3 || res?.response?.rowValue[0]?.nature_of_stn_at_join == 4){
            if(res?.response?.rowValue[0]?.dctenure_year < 5 && res?.response?.rowValue[0]?.activestay < 3 ){
              this.flagsBasedMessages = true;
              this.dynamicFlagBasedMessages = `You are not eligible as minimum active stay at Hard Station is not complete as per Transfer Policy 2023. In case any clarifications, please contact your controlling officer.`;
            }else if(res?.response?.rowValue[0]?.dctenure_year >= 5 && res?.response?.rowValue[0]?.activestay < 3 ){
              this.onlyDcFill = true;
         }           
          }
         
        }

        }

        if ((res?.response?.rowValue[0]?.final_status == 'SA' || res?.response?.rowValue[0]?.final_status == 'TTD' || res?.response?.rowValue[0]?.final_status == 'TTS') && res?.response?.rowValue[0]?.trans_emp_is_declaration == '1') {
          this.savedPreview = 1;
          // this.checkDeclairationStatus();
        }
      }
      else {
        Swal.fire(res?.message, '', 'error')
      }
    })
  }

  ngOnInit(): void {
    this.isZiet = sessionStorage.getItem('isZiet');
    this.kvCode = JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_code;
    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround;
    this.fromStatus = sessionStorage.getItem('finalStatus')
    this.disableShiftType = ((sessionStorage.getItem('shiftYn')) == '0') ? true : false;
    this.getAllMaster();
    this.getStateMaster();
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.tempTeacherId = sessionStorage.getItem("teacherId");
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      //this.getTransferBasicProfileByTchId()
      this.getTeacherDetailsForPreview();
      this.getSchoolDetailsByKvCode();
    }
    this.getPreviewAndChcekPermissions(this.tempTeacherId)

    // setTimeout(function () {
    //   onNextClick(1);
    // }, 1000);

    this.transferForm = new FormGroup({

      stationChoice: new FormGroup({
        'applyTransferYn': new FormControl('', Validators.required),
        //   'id':new FormControl(''),
        // 'transferStatus':new FormControl(''),
        'teacherId': new FormControl(''),
        'choiceKv1StationCode': new FormControl,
        'choiceKv2StationCode': new FormControl,
        'choiceKv3StationCode': new FormControl,
        'choiceKv4StationCode': new FormControl,
        'choiceKv5StationCode': new FormControl,
        'choiceKv1StationName': new FormControl('', Validators.required),
        'choiceKv2StationName': new FormControl('', Validators.required),
        'choiceKv3StationName': new FormControl('', Validators.required),
        'choiceKv4StationName': new FormControl('', Validators.required),
        'choiceKv5StationName': new FormControl('', Validators.required)
        // 'displacement1StationCode': new FormControl,
        // 'displacement2StationCode': new FormControl,
        // 'displacement3StationCode': new FormControl,
        // 'displacement4StationCode': new FormControl,
        // 'displacement5StationCode': new FormControl,
        // 'displacement1StationName': new FormControl('', Validators.required),
        // 'displacement2StationName': new FormControl,
        // 'displacement3StationName': new FormControl,
        // 'displacement4StationName': new FormControl,
        // 'displacement5StationName': new FormControl
      }),


      displacementCount: new FormGroup({
        'kvCode': new FormControl(),
        'id': new FormControl(),
        'tcSaveYn': new FormControl(),
        'teacherId': new FormControl(),
        'transferId': new FormControl(),
        'teacherEmployeeCode': new FormControl(),
        //'workExperiencePositionTypePresentStationStartDate': new FormControl(), //1
        // 'presentStationName': new FormControl(), //1
        // 'presentStationCode': new FormControl(), //1
        'dcStayStationPoint': new FormControl(),//1
        // 'teacherDob': new FormControl,//3    
        //'hardStationWorkStartDate': new FormControl(), //3
        // 'hardStationWorkEndDate': new FormControl(), //3
        'dcTenureHardPoint': new FormControl(),//3
        'dcPhysicalChallengedPoint': new FormControl(),//3     
        'dcMdDfGroungPoint': new FormControl(),
        'dcLtrPoint': new FormControl(),//5   
        'dcSinglePoint': new FormControl(),//6
        'dcSpousePoint': new FormControl(),//6    
        'dcRjcmNjcmPoint': new FormControl(),//7        
        'dcTotalPoint': new FormControl(),
      }),
      transferCount: new FormGroup({
        'id': new FormControl(),
        'kvCode': new FormControl(),
        'teacherId': new FormControl(),
        'transferId': new FormControl(),
        'teacherEmployeeCode': new FormControl(),
        //  'workExperiencePositionTypePresentStationStartDate': new FormControl(), //1
        //  'presentStationName': new FormControl(), //1
        // 'presentStationCode': new FormControl(), //1
        'tcStayStationPoint': new FormControl(),//1
        // 'teacherDob': new FormControl,//3    
        // 'hardStationWorkStartDate': new FormControl(), //3
        //'hardStationWorkEndDate': new FormControl(), //3
        'tcTenureHardPoint': new FormControl(),//3
        'tcPhysicalChallengedPoint': new FormControl(),//3     
        'tcMdDfGroungPoint': new FormControl(),
        'tcLtrPoint': new FormControl(),//5   
        'tcSinglePoint': new FormControl(),//6
        'tcSpousePoint': new FormControl(),//6    
        'tcRjcmNjcmPoint': new FormControl(),//7        
        'tcTotalPoint': new FormControl(),
      }),
      declaration: new FormGroup({
        'spouseKvsYnD': new FormControl(),
        'personalStatusMdgD': new FormControl(),
        'personalStatusSpD': new FormControl(),
        'personalStatusDfpD': new FormControl(),
        'memberJCM': new FormControl(),
        'child_10_12_ynD': new FormControl(),
        'careGiverYnD': new FormControl(),
        'childDifferentAbleYnD': new FormControl(),

        'spouseEmpCode': new FormControl(''),
        'spousePost': new FormControl(''),
        'spouseStationName': new FormControl(''),

        'patientName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientAilment': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientHospital': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientMedicalOfficerName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientMedicalOfficerDesignation': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),

        'child_10_12_name': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'child_10_12_class': new FormControl('', Validators.required),
        'child_10_12_school': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'child_10_12_board': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),

        'careGiverName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'careGiverRelation': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'careGiverDisabilityName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'careGiverDisabilityPrcnt': new FormControl('', [Validators.required, Validators.maxLength(3), Validators.min(0), Validators.max(100), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]),

        'childDifferentName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'childDifferentDisabilityName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'childDifferentDisabilityPrcnt': new FormControl('', [Validators.required, Validators.min(0), Validators.max(100), Validators.maxLength(3), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]),
      }),
      'previousPostingDetails': new FormArray([]),
    })
    this.getTransferProfile();

    this.setTcDcReceivedData();
    this.getTransferBasicProfileByTchId();
    
  }

  //Add Posting Form --Start
  previousPostingDetails(): FormArray {
    return this.transferForm.get("previousPostingDetails") as FormArray
  }

  //Add Posting Form --Start
  checkDeclairationStatus() {
    this.outSideService.getTransferDeclaration(this.tempTeacherId).subscribe((res) => {

      if (res.status == '0' || res.status == 0) {
        this.router.navigate(['/teacher/disclaimer']);
      }
    });
  }
  getTransferBasicProfileByTchId() {
    this.outSideService.fetchConfirmedTchDetails(this.tempTeacherId).subscribe((res) => {
      console.log(res)
      this.spouseStationName = res.response.teacherProfile?.spouseStationName;
      this.spouseStationCode = res.response.teacherProfile?.spouseStationCode;
      this.spouseStatus = res.response.teacherProfile?.spouseStatus;
      this.temppTeacherId = res.response.teacherProfile?.teacherId;
    
      for (let i = 0; i < res.response.experience.length; i++) {
        if (res.response.experience[i].workEndDate != null || res.response.experience[i].workEndDate != null) {
          // res.response.experience[i].workEndDate = this.date.transform(new Date(res.response.experience[i].workEndDate * 1), 'yyyy-MM-dd')
          res.response.experience[i].workEndDate =res.response.experience[i].workEndDate;
        }
        res.response.experience[i].workStartDate = res.response.experience[i].workStartDate;
      }
      this.verifyTchTeacherWorkExp = res.response.experience
    })
    //this.getTransferRegionsByEmployee();
  }

statUsMessage:any
  setTcDcReceivedData() {
    const data = {
      "kvCode": this.kvCode,
      "teacherId": this.tempTeacherId
    }
    this.outSideService.fetchTcDcData(data).subscribe((res) => {
      console.log("tc dc res")
      console.log(res)
      this.responseTcDcData = res;
      if (this.responseTcDcData.transferId != null && this.responseTcDcData.transferId != '') {
        this.transDisable = true;
      }
      this.transferForm.patchValue({
        displacementCount: {
          id: this.responseTcDcData.id
        },
      })
      this.transferForm.patchValue({
        transferCount: {
          id: this.responseTcDcData.id
        },
      })

      if(this.responseTcDcData.tcSaveYn=="1"){
        this.statUsMessage="Application Submitted";
      }else if(this.responseTcDcData.dcSaveYn=="1"){
        this.statUsMessage="Application Submitted";
      }

      this.totaldaysPresent = this.responseTcDcData.dcStayAtStation + this.responseTcDcData.dcReturnStation - this.responseTcDcData.dcPeriodAbsence
      this.totaldaysPresentTc = this.responseTcDcData.tcStayAtStation - this.responseTcDcData.tcPeriodAbsence
      this.dcStayAtStation = this.responseTcDcData.dcStayAtStation,
        this.dcPeriodAbsence = this.responseTcDcData.dcPeriodAbsence,
        this.dcReturnStation = this.responseTcDcData.dcReturnStation,
        this.tcStayAtStation = this.responseTcDcData.tcStayAtStation,
        this.tcPeriodAbsence = this.responseTcDcData.tcPeriodAbsence,
        this.tcReturnStation = this.responseTcDcData.tcReturnStation,
        this.transferForm.patchValue({
          displacementCount: {
            kvCode: this.kvCode,
            teacherId: this.tempTeacherId,
            dcStayStationPoint: this.responseTcDcData.dcStayStationPoint,
            dcTenureHardPoint: this.responseTcDcData.dcTenureHardPoint,
            dcPhysicalChallengedPoint: this.responseTcDcData.dcPhysicalChallengedPoint,
            dcMdDfGroungPoint: this.responseTcDcData.dcMdDfGroungPoint,
            dcLtrPoint: this.responseTcDcData.dcLtrPoint,
            dcRjcmNjcmPoint: this.responseTcDcData.dcRjcmNjcmPoint,
            dcTotalPoint: this.responseTcDcData.dcTotalPoint
          },
        })
      this.transferForm.patchValue({
        transferCount: {
          kvCode: this.kvCode,
          teacherId: this.tempTeacherId,
          tcStayStationPoint: this.responseTcDcData.tcStayStationPoint,
          tcTenureHardPoint: this.responseTcDcData.tcTenureHardPoint,
          tcPhysicalChallengedPoint: this.responseTcDcData.tcPhysicalChallengedPoint,
          tcMdDfGroungPoint: this.responseTcDcData.tcMdDfGroungPoint,
          tcLtrPoint: this.responseTcDcData.tcLtrPoint,
          tcRjcmNjcmPoint: this.responseTcDcData.tcRjcmNjcmPoint,
          tcTotalPoint: this.responseTcDcData.tcTotalPoint
        },
      })
      this.canculateDcPoint();
      this.canculateTcPoint();
    })


  }

  canculateDcPoint() {
    if (this.responseTcDcData.dcSinglePoint == '-12') {
      this.transferForm.patchValue({
        displacementCount: {
          dcSinglePoint: this.responseTcDcData.dcSinglePoint
        },
      })
    }
    else {
      this.transferForm.patchValue({
        displacementCount: {
          dcSpousePoint: this.responseTcDcData.dcSpousePoint
        },
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
      this.transferForm.patchValue({
        transferCount: {
          tcSinglePoint: this.responseTcDcData.tcSinglePoint
        },
      })
    }
    else {
      this.transferForm.patchValue({
        transferCount: {
          tcSpousePoint: this.responseTcDcData.tcSpousePoint
        },
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
  // getInitiatedTeacherDetails() {
  //   this.outSideService.fetchInitiateTeacherTransfer(this.tempTeacherId).subscribe((res) => {
  //     this.responseData = res.response;
  //     this.existingTransferId = this.responseData.transferApplicationNumber

  //   })
  // }



  getTransferProfile() {

    if (this.tempTeacherId == null) {
      this.transferForm.patchValue({
        stationChoice: {
          applyTransferYn: '0',

        }
      })
    }
    const data = { "teacherId": this.tempTeacherId }

    this.outSideService.getTransferData(data).subscribe((res) => {
      if (res.response != null || res.response == '') {
        if(res.response.choiceKv1StationCode !='' && res.response.choiceKv1StationCode !=null){
          
        // this.statUsMessage="Station Choice Saved";

        }
        this.transferForm.patchValue({
          stationChoice: {
            id: res.response.id,
            teacherId: res.response.teacherId,
            applyTransferYn: res.response.applyTransferYn,
            choiceKv1StationCode: res.response.choiceKv1StationCode != 'null' ? res.response.choiceKv1StationCode : '',
            choiceKv2StationCode: res.response.choiceKv2StationCode != 'null' ? res.response.choiceKv2StationCode : '',
            choiceKv3StationCode: res.response.choiceKv3StationCode != 'null' ? res.response.choiceKv3StationCode : '',
            choiceKv4StationCode: res.response.choiceKv4StationCode != 'null' ? res.response.choiceKv4StationCode : '',
            choiceKv5StationCode: res.response.choiceKv5StationCode != 'null' ? res.response.choiceKv5StationCode : '',
            choiceKv1StationName: res.response.choiceKv1StationName,
            choiceKv2StationName: res.response.choiceKv2StationName,
            choiceKv3StationName: res.response.choiceKv3StationName,
            choiceKv4StationName: res.response.choiceKv4StationName,
            choiceKv5StationName: res.response.choiceKv5StationName,
            displacement1StationCode: res.response.displacement1StationCode,
            displacement1StationName: res.response.displacement1StationName,
            displacement2StationName: res.response.displacement2StationName,
            displacement2StationCode: res.response.displacement2StationCode,
            displacement3StationName: res.response.displacement3StationName,
            displacement3StationCode: res.response.displacement3StationCode,
            displacement4StationCode: res.response.displacement4StationCode,
            displacement4StationName: res.response.displacement4StationName,
            displacement5StationCode: res.response.displacement5StationCode,
            displacement5StationName: res.response.displacement5StationName,
          },

        })
      }

      this.empTransferradioButton = res.response.applyTransferYn
      if (this.empTransferradioButton == null || this.empTransferradioButton == "") {
        this.transferForm.patchValue({
          stationChoice: {
            applyTransferYn: '0',
  
          }
        })
        this.empTransferradioButton = 0;
        this.disabled = true;
        this.showTcField =true;
      }
      if (this.empTransferradioButton == 1 || this.empTransferradioButton == '1') {
        this.transferForm.patchValue({
          stationChoice: {
            applyTransferYn: '1',
  
          }
        })
        this.empTransferradioButton = 1;
        this.disabled = false;
        this.showTcField =false;
      }
      if (this.empTransferradioButton == 0 || this.empTransferradioButton == '0') {
        this.transferForm.patchValue({
          stationChoice: {
            applyTransferYn: '0',
  
          }
        })
        this.empTransferradioButton = 0;
        this.disabled = true;
        this.showTcField =true;
      }
    })

  }
  manageChoice(val) {
    //this.transferStatus=val;
    this.transferForm.patchValue({
      stationChoice: {
        choiceKv1StationCode: '',
        choiceKv1StationName: '',
        choiceKv2StationCode: '',
        choiceKv2StationName: '',
        choiceKv3StationCode: '',
        choiceKv3StationName: '',
        choiceKv4StationCode: '',
        choiceKv4StationName: '',
        choiceKv5StationCode: '',
        choiceKv5StationName: ''
      }
    })
    if (val == 1) {
      this.showTcField=false;
      this.disabled = false;
    }
    else {
      this.showTcField=true
      this.disabled = true;
    }
  }


  onSubmit(event: Event) {

    // this.displacementTotalPoint();
    //this.transferTotalPoint();
    // if (this.transferStatusOperation == 'TRA' || this.transferStatusOperation == 'TRE' || this.transferStatusOperation == 'TRS' || this.transferStatusOperation == 'TRR') {
    //   return;
    // }
    var activeButton = document.activeElement.id;

    if (activeButton == 'submit2') {

      const data = {
        kvCode: this.responseTcDcData.kvCode,
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
        tcSaveYn:this.transferForm.value.displacementCount.tcSaveYn,
        id:this.transferForm.value.displacementCount.id,
        tcReturnStation: this.tcReturnStation
      };
      this.outSideService.saveTransferDCTCPoints(data).subscribe((res) => {
        debugger
        if (res) {
          this.transferForm.patchValue({
            displacementCount: {
              id: res.id,
            }
          });
          this.transferForm.patchValue({
            transferCount: {
              id: res.id,
            }
          });
          Swal.fire(
            'Your DC Point has been submitted.',
            '',
            'success'
          );
         // this.transDisable = true;
         this.setTcDcReceivedData();
        }
      })
    } else if (activeButton == 'submit1') {
      debugger
      this.transferForm.patchValue({
        stationChoice: {
          teacherId: this.tempTeacherId,
        }
      });
   
      //this.responseData.transferStatus = 'TRI'
      // if(this.transferForm.value.stationChoice?.applyTransferYn ==0)
      // {
      //   this.tcButtondisable=true;
      // }
      // else{
      //   this.tcButtondisable=false;
      // }

      if(this.transferForm.value.stationChoice?.applyTransferYn ==0 && this.onlyDcFill==false )
      {
        this.showMessageForTcEligible=true;
       
		    this.tcMessage ='You are not opting for Request Transfer. Either you have not selected "Yes" for Request Transfer at the time of filling Station Choice, or your active stay does not met the requirements as per Transfer Policy 2023. If you are eligible for a Request Trasnfer and willing to opt for it, please go back and select the Request Transfer option.'
  
      }else{
        this.tcMessage="";
      }
      this.outSideService.saveStationChoice(this.transferForm.value.stationChoice).subscribe((res) => {
        
        if (res.status == 1) {
          Swal.fire(
            
            'Your Station choice has been saved Successfully! ' ,
             this.tcMessage,
            'success'
          )

          this.onNextClick(2)
        }
      })
    } else if (activeButton == 'submit5') {
      if(this.transferForm.value.stationChoice?.applyTransferYn==0){
        this.transferCountSaveYn=0
      }
      else if(this.onlyDcFill==true) {
        this.transferCountSaveYn=0
      }
    else{
      this.transferCountSaveYn=1
      }

      const data = {
        kvCode: this.responseTcDcData.kvCode,
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
        tcMdDfGroungPoint:this.responseTcDcData.tcMdDfGroungPoint,
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
        tcSaveYn:this.transferCountSaveYn,
        dcSaveYn:1,
        finalStatus:1,
        id:this.transferForm.value.transferCount.id,
        tcReturnStation: this.tcReturnStation
      };
      if (data) {
        Swal.fire({
          title: 'Are you sure your TC/DC data is correct!',
          text: 'Once you confirmed here, then your complete data will be freezed.',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Cancel',
          cancelButtonText: 'Confirm',
          confirmButtonColor: '#ea6c75',
          cancelButtonColor: '#2064cc',
        }).then((result: any) => {
          if (result?.dismiss == "cancel") {
            debugger
            
            this.outSideService.saveTransferDCTCPoints(data).subscribe((res: any) => {
              if (res.transferId != null && res.transferId != '') {
                this.transferForm.patchValue({
                  transferCount: {
                    id: res.id,
                  }
                });
                this.transferForm.patchValue({
                  displacementCount: {
                    tcSaveYn: res.tcSaveYn,
                  }
                });
                Swal.fire(
                  'Your data has been saved ',
                  '',
                  'success'
                );
                this.transDisable = true;
                this.setTcDcReceivedData();
              //  this.onNextClick(3)
              }
            })
          }
        })
      }
    }
  }

  getAllMaster() {
    this.outSideService.fetchAllMaster(6).subscribe((res) => {
      this.teacherTypeData = res.response.postionType;
      this.teacherTypeDataNameCode = [];
      for (let i = 0; i < this.teacherTypeData.length; i++) {
        var concatElement;
        concatElement = this.teacherTypeData[i].organizationTeacherTypeName;
        concatElement = concatElement + "(" + this.teacherTypeData[i].teacherTypeId + ")";
        var data = {
          'nameCode': concatElement,
          'teacherTypeId': this.teacherTypeData[i].teacherTypeId
        }
        this.teacherTypeDataNameCode.push(data)
      }
    })
  }

  getSpouseDetails(event) {
    this.outSideService.fetchSpouseByEmpCode(event.target.value).subscribe((res) => {
      this.transferForm.patchValue({
        declaration: {
          spouseStation: res.response?.stationName,
          spousePost: res.response?.workExperienceIdPresentKv,
        }
      })
    })
  }

  getSchoolDetailsByKvCode() {
    this.outSideService.fetchKvSchoolDetails(this.kvCode).subscribe((res) => {
      this.kvSchoolDetails = res.response;
      for (let i = 0; i < this.kvSchoolDetails.rowValue.length; i++) {
        this.stationNameCode = this.kvSchoolDetails.rowValue[i].station_name;
        this.stationNameCode = this.stationNameCode + "(" + this.kvSchoolDetails.rowValue[i].station_code + ")";
        this.stationCode = this.kvSchoolDetails.rowValue[i].station_code

        this.kvNameCode = this.kvSchoolDetails.rowValue[i].kv_name;
        this.kvNameCode = this.kvNameCode + "(" + this.kvSchoolDetails.rowValue[i].kv_code + ")";
        this.udiseSchCode = this.kvSchoolDetails.rowValue[i].udise_sch_code;
        this.schName = this.kvSchoolDetails.rowValue[i].kv_name;
        this.stationName = this.kvSchoolDetails.rowValue[i].station_name;
      }

      this.transferForm.patchValue({
        basicDetails: {
          currentSchoolName: this.kvNameCode,
          presentStationName: this.stationNameCode,
        }
      })
    })
  }

  getSubjectByTchType(data) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      this.subjectList = res.response.rowValue;
      this.subjectListNameCode = [];
      for (let i = 0; i < this.subjectList.length; i++) {
        var conElement;
        conElement = this.subjectList[i].subject_name;
        conElement = conElement + "(" + this.subjectList[i].subject_id + ")";
        var data = {
          'subNameCode': conElement,
          'subjectCode': this.subjectList[i].subject_id
        }
        this.subjectListNameCode.push(data);
      }
    })
  }

  getStateMaster() {
    this.outSideService.fetchStateMaster("a").subscribe((res) => {
      this.stateMasterList = res.response.rowValue;
    })
  }

  getDistrictByStateId(stateId) {
    this.outSideService.fetchDistrictByStateId(stateId).subscribe((res) => {
      this.districListByStateIdP = res.response.rowValue
    })
  }

  updateSpouseValue(event) {
    var val = event.target.value
    if (val == '1') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: -50,
          spouseKvsYn: '1',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        },
        transferCount: {
          q4TPt: 50,
          spouseKvsYn: '1',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        }
      })
    } else if (val == '2') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: -40,
          spouseKvsYn: '0',
          spouseCentralGvotYn: '2',
          spouseStateGvotYn: '0',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        },
        transferCount: {
          q4TPt: 40,
          spouseKvsYn: '0',
          spouseCentralGvotYn: '2',
          spouseStateGvotYn: '0',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        }
      })
    } else if (val == '3') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: -30,
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '3',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        },
        transferCount: {
          q4TPt: 30,
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '3',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        }
      })
    } else if (val == '4') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: -20,
          unmarriedWomanYn: '4',
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          spouseNa: '0'
        },
        transferCount: {
          unmarriedWomanYn: '4',
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          spouseNa: '0',
          q4TPt: 0
        }
      })
    } else if (val == '5') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: 0,
          unmarriedWomanYn: '0',
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          spouseNa: '5'
        },
        transferCount: {
          q4TPt: 0,
          unmarriedWomanYn: '0',
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          spouseNa: '5'
        }
      })
    }
  }

  stationCoice(val) {

    if (val == '1') {
      this.showStationChoice18B = false;
      this.showStationChoice18C = false;
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1UdiseCodePresentStation: '',
          choiceKv2UdiseCodePresentStation: '',
          choiceKv3UdiseCodePresentStation: '',
          choiceKv4UdiseCodePresentStation: '',
          choiceKv5UdiseCodePresentStation: '',
          choiceKv1StationCode: '',
          choiceKv2StationCode: '',
          choiceKv3StationCode: '',
          choiceKv4StationCode: '',
          choiceKv5StationCode: '',
          choiceKv1UdiseNamePresentStation: '',
          choiceKv2UdiseNamePresentStation: '',
          choiceKv3UdiseNamePresentStation: '',
          choiceKv4UdiseNamePresentStation: '',
          choiceKv5UdiseNamePresentStation: '',
          choiceKv1StationName: '',
          choiceKv2StationName: '',
          choiceKv3StationName: '',
          choiceKv4StationName: '',
          choiceKv5StationName: '',

          choiceKv1StationCodeUdiseCode1: '',
          choiceKv1StationCodeUdiseCode2: '',
          choiceKv1StationCodeUdiseCode3: '',
          choiceKv2StationCodeUdiseCode1: '',
          choiceKv2StationCodeUdiseCode2: '',
          choiceKv2StationCodeUdiseCode3: '',
          choiceKv3StationCodeUdiseCode1: '',
          choiceKv3StationCodeUdiseCode2: '',
          choiceKv3StationCodeUdiseCode3: '',
          choiceKv4StationCodeUdiseCode1: '',
          choiceKv4StationCodeUdiseCode2: '',
          choiceKv4StationCodeUdiseCode3: '',
          choiceKv5StationCodeUdiseCode1: '',
          choiceKv5StationCodeUdiseCode2: '',
          choiceKv5StationCodeUdiseCode3: '',

          choiceKv1StationCodeUdiseName1: '',
          choiceKv1StationCodeUdiseName2: '',
          choiceKv1StationCodeUdiseName3: '',
          choiceKv2StationCodeUdiseName1: '',
          choiceKv2StationCodeUdiseName2: '',
          choiceKv2StationCodeUdiseName3: '',
          choiceKv3StationCodeUdiseName1: '',
          choiceKv3StationCodeUdiseName2: '',
          choiceKv3StationCodeUdiseName3: '',
          choiceKv4StationCodeUdiseName1: '',
          choiceKv4StationCodeUdiseName2: '',
          choiceKv4StationCodeUdiseName3: '',
          choiceKv5StationCodeUdiseName1: '',
          choiceKv5StationCodeUdiseName2: '',
          choiceKv5StationCodeUdiseName3: '',

        }
      })
    } else if (val == '2') {
      var intraStationCond = {
        "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTRA",
        "conditionvalue": [this.responseData.teacherId, this.responseData.teacherId]
      }
      this.getKvSchoolByStationId(intraStationCond);
      this.showStationChoice18B = true;
      this.showStationChoice18C = false;
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1StationCode: '',
          choiceKv2StationCode: '',
          choiceKv3StationCode: '',
          choiceKv4StationCode: '',
          choiceKv5StationCode: '',

          choiceKv1StationName: '',
          choiceKv2StationName: '',
          choiceKv3StationName: '',
          choiceKv4StationName: '',
          choiceKv5StationName: '',

          choiceKv1StationCodeUdiseCode1: '',
          choiceKv1StationCodeUdiseCode2: '',
          choiceKv1StationCodeUdiseCode3: '',
          choiceKv2StationCodeUdiseCode1: '',
          choiceKv2StationCodeUdiseCode2: '',
          choiceKv2StationCodeUdiseCode3: '',
          choiceKv3StationCodeUdiseCode1: '',
          choiceKv3StationCodeUdiseCode2: '',
          choiceKv3StationCodeUdiseCode3: '',
          choiceKv4StationCodeUdiseCode1: '',
          choiceKv4StationCodeUdiseCode2: '',
          choiceKv4StationCodeUdiseCode3: '',
          choiceKv5StationCodeUdiseCode1: '',
          choiceKv5StationCodeUdiseCode2: '',
          choiceKv5StationCodeUdiseCode3: '',

          choiceKv1StationCodeUdiseName1: '',
          choiceKv1StationCodeUdiseName2: '',
          choiceKv1StationCodeUdiseName3: '',
          choiceKv2StationCodeUdiseName1: '',
          choiceKv2StationCodeUdiseName2: '',
          choiceKv2StationCodeUdiseName3: '',
          choiceKv3StationCodeUdiseName1: '',
          choiceKv3StationCodeUdiseName2: '',
          choiceKv3StationCodeUdiseName3: '',
          choiceKv4StationCodeUdiseName1: '',
          choiceKv4StationCodeUdiseName2: '',
          choiceKv4StationCodeUdiseName3: '',
          choiceKv5StationCodeUdiseName1: '',
          choiceKv5StationCodeUdiseName2: '',
          choiceKv5StationCodeUdiseName3: '',

        }
      })

    } else if (val == '3') {
      this.showStationChoice18C = true;
      this.showStationChoice18B = false;
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1UdiseCodePresentStation: '',
          choiceKv2UdiseCodePresentStation: '',
          choiceKv3UdiseCodePresentStation: '',
          choiceKv4UdiseCodePresentStation: '',
          choiceKv5UdiseCodePresentStation: '',

          choiceKv1UdiseNamePresentStation: '',
          choiceKv2UdiseNamePresentStation: '',
          choiceKv3UdiseNamePresentStation: '',
          choiceKv4UdiseNamePresentStation: '',
          choiceKv5UdiseNamePresentStation: '',
        }
      })

    } else if (val == '0') {
      this.showStationChoice18B = false;
      this.showStationChoice18C = false;
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1UdiseCodePresentStation: '',
          choiceKv2UdiseCodePresentStation: '',
          choiceKv3UdiseCodePresentStation: '',
          choiceKv4UdiseCodePresentStation: '',
          choiceKv5UdiseCodePresentStation: '',
          choiceKv1StationCode: '',
          choiceKv2StationCode: '',
          choiceKv3StationCode: '',
          choiceKv4StationCode: '',
          choiceKv5StationCode: '',
          choiceKv1UdiseNamePresentStation: '',
          choiceKv2UdiseNamePresentStation: '',
          choiceKv3UdiseNamePresentStation: '',
          choiceKv4UdiseNamePresentStation: '',
          choiceKv5UdiseNamePresentStation: '',
          choiceKv1StationName: '',
          choiceKv2StationName: '',
          choiceKv3StationName: '',
          choiceKv4StationName: '',
          choiceKv5StationName: '',

          choiceKv1StationCodeUdiseCode1: '',
          choiceKv1StationCodeUdiseCode2: '',
          choiceKv1StationCodeUdiseCode3: '',
          choiceKv2StationCodeUdiseCode1: '',
          choiceKv2StationCodeUdiseCode2: '',
          choiceKv2StationCodeUdiseCode3: '',
          choiceKv3StationCodeUdiseCode1: '',
          choiceKv3StationCodeUdiseCode2: '',
          choiceKv3StationCodeUdiseCode3: '',
          choiceKv4StationCodeUdiseCode1: '',
          choiceKv4StationCodeUdiseCode2: '',
          choiceKv4StationCodeUdiseCode3: '',
          choiceKv5StationCodeUdiseCode1: '',
          choiceKv5StationCodeUdiseCode2: '',
          choiceKv5StationCodeUdiseCode3: '',

          choiceKv1StationCodeUdiseName1: '',
          choiceKv1StationCodeUdiseName2: '',
          choiceKv1StationCodeUdiseName3: '',
          choiceKv2StationCodeUdiseName1: '',
          choiceKv2StationCodeUdiseName2: '',
          choiceKv2StationCodeUdiseName3: '',
          choiceKv3StationCodeUdiseName1: '',
          choiceKv3StationCodeUdiseName2: '',
          choiceKv3StationCodeUdiseName3: '',
          choiceKv4StationCodeUdiseName1: '',
          choiceKv4StationCodeUdiseName2: '',
          choiceKv4StationCodeUdiseName3: '',
          choiceKv5StationCodeUdiseName1: '',
          choiceKv5StationCodeUdiseName2: '',
          choiceKv5StationCodeUdiseName3: '',
        }
      })
    }
  }

  show18B(event) {
    var intraStationCond = {
      "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTRA",
      "conditionvalue": [this.responseData.teacherId, this.responseData.teacherId]
    }
    this.getKvSchoolByStationId(intraStationCond);
    if (event.target.checked) {
      this.show18BOption = true;
    } else if (!event.target.checked) {
      this.show18BOption = false;
    }
  }

  show18C(event) {
    if (event.target.checked) {
      this.show18COption = true;
    } else if (!event.target.checked) {
      this.show18COption = false;
    }
  }

  getKvSchoolByStationId(val) {
    this.outSideService.fetchIntraStationSchool(val).subscribe((res) => {
      this.kvSchoolList = res.response.rowValue;
    })
  }

  getKvSchoolByStationIdPreference(event) {
    var str = event.target.value
    this.selectedUdiseCode = str
    var splitted = str.split("-", 2);
    this.outSideService.fetchKvSchoolByStationCode(splitted[0]).subscribe((res) => {

      if (this.position == '1') {
        this.kvSchoolListP1 = res.response;
      } else if (this.position == '2') {
        this.kvSchoolListP2 = res.response;
      } else if (this.position == '3') {
        this.kvSchoolListP3 = res.response;
      } else if (this.position == '4') {
        this.kvSchoolListP4 = res.response;
      } else if (this.position == '5') {
        this.kvSchoolListP5 = res.response;
      }
    })
  }

  schoolPreferenceListByStationCode(finalList) {
    this.outSideService.fetchSchoolPreferenceByStationCode(finalList).subscribe((res) => {
      this.preferenceSchoolList = res.response;
      for (let i = 0; i < this.preferenceSchoolList.length; i++) {
        if (this.preferenceSchoolList[i].key == this.responseData.choiceKv1StationCode) {
          this.kvSchoolListP1 = this.preferenceSchoolList[i].value
        } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv2StationCode) {
          this.kvSchoolListP2 = this.preferenceSchoolList[i].value
        } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv3StationCode) {
          this.kvSchoolListP3 = this.preferenceSchoolList[i].value
        } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv4StationCode) {
          this.kvSchoolListP4 = this.preferenceSchoolList[i].value
        } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv5StationCode) {
          this.kvSchoolListP5 = this.preferenceSchoolList[i].value
        }
      }
    })
  }

  schoolPreference(event, pos) {
    var val = event.target.value
    if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP1.length; i++) {
        if (this.kvSchoolListP1[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1StationCodeUdiseName1: this.kvSchoolListP1[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP1.length; i++) {
        if (this.kvSchoolListP1[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1StationCodeUdiseName2: this.kvSchoolListP1[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP1.length; i++) {
        if (this.kvSchoolListP1[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1StationCodeUdiseName3: this.kvSchoolListP1[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP2.length; i++) {
        if (this.kvSchoolListP2[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2StationCodeUdiseName1: this.kvSchoolListP2[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP2.length; i++) {
        if (this.kvSchoolListP2[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2StationCodeUdiseName2: this.kvSchoolListP2[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP2.length; i++) {
        if (this.kvSchoolListP2[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2StationCodeUdiseName3: this.kvSchoolListP2[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP3.length; i++) {
        if (this.kvSchoolListP3[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3StationCodeUdiseName1: this.kvSchoolListP3[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP3.length; i++) {
        if (this.kvSchoolListP3[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3StationCodeUdiseName2: this.kvSchoolListP3[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP3.length; i++) {
        if (this.kvSchoolListP3[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3StationCodeUdiseName3: this.kvSchoolListP3[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP4.length; i++) {
        if (this.kvSchoolListP4[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4StationCodeUdiseName1: this.kvSchoolListP4[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP4.length; i++) {
        if (this.kvSchoolListP4[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4StationCodeUdiseName2: this.kvSchoolListP4[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP4.length; i++) {
        if (this.kvSchoolListP4[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4StationCodeUdiseName3: this.kvSchoolListP4[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP5.length; i++) {
        if (this.kvSchoolListP5[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5StationCodeUdiseName1: this.kvSchoolListP5[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP5.length; i++) {
        if (this.kvSchoolListP5[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5StationCodeUdiseName2: this.kvSchoolListP5[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP5.length; i++) {
        if (this.kvSchoolListP5[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5StationCodeUdiseName3: this.kvSchoolListP5[i].kvName
            }
          })
        }
      }
    }
  }

  selectSchool(val) {

    this.position = val;


    // this.getKvRegion();
    this.getTransferRegionsByEmployee()
  }

  getKvRegion() {

    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      this.regionList = res.response.rowValue;
      this.modalService.open(this.selectSchoolModalInterStation, { size: 'lg', backdrop: 'static', keyboard: false })
    })
  }
  getTransferRegionsByEmployee(){
    debugger
    const data={
      teacherId:this.tempTeacherId
    }
    this.AllregionList=[];
    this.outSideService.getTransferRegionByEmployee(data).subscribe((res) => {
      this.AllregionList = res.rowValue;
      // console.log("kv region--------")
      // console.log(this.AllregionList)
     this.modalService.open(this.selectSchoolModalInterStation, { size: 'lg', backdrop: 'static', keyboard: false })
    })
  }
  resetStationChoices() {
    this.transferForm.patchValue({
      stationChoice: {
        choiceKv1StationCode: '',
        choiceKv2StationCode: '',
        choiceKv3StationCode: '',
        choiceKv4StationCode: '',
        choiceKv5StationCode: '',
        choiceKv1StationName: '',
        choiceKv2StationName: '',
        choiceKv3StationName: '',
        choiceKv4StationName: '',
        choiceKv5StationName: ''
      }
    })
  }

  //   getKvRegion() {
  //  
  //     var data = {
  //       "teacherID": this.tempTeacherId,
  //       "nerFlag": this.transferForm.value.stationChoice.recruitedSpclDriveNer == '1' ? 'Y' : 'N',
  //       "dfpFlag": this.transferForm.value.displacementCount.personalStatusDfp == '1' ? 'Y' : 'N',
  //       "jcmFlag": this.transferForm.value.displacementCount.associationMemberYn == '1' ? 'Y' : 'N',
  //     }
  //     this.outSideService.fetchTransferRegion(data).subscribe((res) => {
  //       this.regionList = res.response;
  //     })
  //   }

  // getStationByRegionId(event) {
  //   this.stationList = [];
  //   this.selectedUdiseCode = '';
  //   var data = {
  //     "teacherId": this.responseData.teacherId,
  //     "regionCode": event.target.value
  //   }

  //   this.outSideService.fetchTransferStation(data).subscribe((res) => {
  //     this.stationList = res.response;
  //   })
  // }
// api/transfer/getTransferRegionByEmployee
  getStationByRegionId(event) {

    const data = {
      "regionCode": event.target.value,
      "teacherId": this.tempTeacherId
    };
    this.outSideService.fetchTransferStation(data).subscribe((res) => {
      this.stationList = res.response
    })
  }
  getTransfersStationByEmployee(event) {
debugger
    const data = {
      "regionCode": event.target.value,
      "teacherId": this.tempTeacherId
    };
    this.outSideService.getTransferStationByEmployee(data).subscribe((res) => {
      this.stationList = res.rowValue 
    })
  }


  getStationByRegionIdWithCond(event) {

    var stationByInterCond = {
      "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTER",
      "conditionvalue": [this.responseData.teacherId, event.target.value, event.target.value, this.responseData.teacherId]
    }

    this.outSideService.fetchIntraStationSchool(stationByInterCond).subscribe((res) => {
      this.stationList = res.response.rowValue
    })
  }

  selectSchoolByUdise() {
    debugger
    var str = this.selectedUdiseCode
    var splitted = str.split("-", 2);
    if (this.position == '1') {
      if ((splitted[0] != this.spouseStationCode) && (this.spouseStatus == 1 || this.spouseStatus == 2 || this.spouseStatus == 3) && this.transferForm.value.stationChoice?.applyTransferYn == 1) {
        Swal.fire(
          'You have not selected spouse station in first choice so you are not eligible to get spouse point in transfer and spouse station is available in only first choice',
          '',
          'error'
        )
      }
      if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv1StationCode: '',
            choiceKv1StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv1StationName: splitted[1],
            choiceKv1StationCode: splitted[0]
          }
        })
      }

    } else if (this.position == '2') {
      if (this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv2StationCode: '',
            choiceKv2StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv2StationName: splitted[1],
            choiceKv2StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '3') {
      if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv3StationCode: '',
            choiceKv3StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv3StationName: splitted[1],
            choiceKv3StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '4') {
      if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv4StationCode: '',
            choiceKv4StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv4StationName: splitted[1],
            choiceKv4StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '5') {
      if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv5StationCode: '',
            choiceKv5StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv5StationName: splitted[1],
            choiceKv5StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '191') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement1StationCode: '',
            displacement1StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement1StationName: splitted[1],
            displacement1StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '192') {
      if (this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement2StationCode: '',
            displacement2StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement2StationName: splitted[1],
            displacement2StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '193') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement3StationCode: '',
            displacement3StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement3StationName: splitted[1],
            displacement3StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '194') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement4StationCode: '',
            displacement4StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement4StationName: splitted[1],
            displacement4StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '195') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement1StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement5StationCode: '',
            displacement5StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement5StationName: splitted[1],
            displacement5StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '291') {
      if (this.transferForm.value.transferCount.doptStationTwoCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          transferCount: {
            doptStationOneCode: '',
            doptStationOneName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          transferCount: {
            doptStationOneName: splitted[1],
            doptStationOneCode: splitted[0]
          }
        })
      }
    } else if (this.position == '292') {
      if (this.transferForm.value.transferCount.doptStationOneCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          transferCount: {
            doptStationTwoCode: '',
            doptStationTwoName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          transferCount: {
            doptStationTwoName: splitted[1],
            doptStationTwoCode: splitted[0]
          }
        })
      }
    }
  }

  absenceCal() {
    var newCal = (this.totalWorkingDaysF * 1 + this.absence2 * 1)
    var calPoint = Math.floor(newCal / 365);
    var finalCalPoint = calPoint * 2;
    this.transferForm.patchValue({
      displacementCount: {
        actualNumberOfWorkingDays: newCal,
        q1DPt: finalCalPoint < 0 ? 0 : finalCalPoint
      }
    })
  }

  absenceCalTransferCount() {
    var newCal = (this.totalWorkingDaysTC * 1 - (this.absenceTc * 1))
    var calPoint = Math.floor(newCal / 365);
    var finalCalPoint = calPoint * 2;
    this.transferForm.patchValue({
      transferCount: {
        actualNumberOfWorkingTcdays: newCal,
        q1TPt: finalCalPoint
      }
    })
  }

  displacementTotalPoint() {

    var displaceMentTotal = (this.transferForm.value.displacementCount.q1DPt * 1)
      + (this.transferForm.value.displacementCount.q2DPt * 1)
      + (this.transferForm.value.displacementCount.q3DPt * 1)
      + (this.transferForm.value.displacementCount.q10DPt * 1)
      + (this.transferForm.value.displacementCount.q4DPt * 1)
      + (this.transferForm.value.displacementCount.q11DPt * 1)
      + (this.transferForm.value.displacementCount.q5DPt * 1)
      + (this.transferForm.value.displacementCount.q12DPt * 1)
      + (this.transferForm.value.displacementCount.q9DPt * 1)
      + (this.transferForm.value.displacementCount.q13DPt * 1)

    this.transferForm.patchValue({
      displacementCount: {
        totalDisplacementCount: displaceMentTotal
      }
    })
  }

  transferTotalPoint() {
    var transferTotal = this.transferForm.value.transferCount.q1TPt * 1
      + this.transferForm.value.transferCount.q2TPt * 1
      + this.transferForm.value.transferCount.q3TPt * 1
      + this.transferForm.value.transferCount.q4TPt * 1
      + this.transferForm.value.transferCount.q6TPt * 1
      + this.transferForm.value.transferCount.q7TPt * 1
      + this.transferForm.value.transferCount.q8TPt * 1
      + this.transferForm.value.transferCount.q9TPt * 1
      + this.transferForm.value.transferCount.q10TPt * 1

    this.transferForm.patchValue({
      transferCount: {
        totalTransferCount: transferTotal
      }
    })
  }

  personalStatusCheckBox(e, id) {
    if (e.target.checked) {
      if (id == '1') {
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusLtrDc: '1',
            q4DPt: -50,
            personalStatus: '1',
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '2') {
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusDfpDc: '1',
            personalStatus: '1',
            q4DPt: -50,
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '3') {
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusMdgDc: '1',
            personalStatus: '1',
            q4DPt: -50,
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '4') {
        if (this.transferForm.value.displacementCount.spouseStatus != '' && this.transferForm.value.displacementCount.spouseStatus != null
          && (this.transferForm.value.displacementCount.spouseStatus == '4' || this.transferForm.value.displacementCount.spouseStatus == 4)) {
          this.transferForm.patchValue({
            displacementCount: {
              spouseStatusDisplacement: '5',
              q5DPt: 0
            }
          })
        }
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusWidDc: '1',
            personalStatus: '1',
            q4DPt: -50,
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '5') {
        if (this.transferForm.value.displacementCount.spouseStatus != '' && this.transferForm.value.displacementCount.spouseStatus != null
          && (this.transferForm.value.displacementCount.spouseStatus == '4' || this.transferForm.value.displacementCount.spouseStatus == 4)) {
          this.transferForm.patchValue({
            displacementCount: {
              spouseStatusDisplacement: '5',
              q5DPt: 0
            }
          })
        }
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusSpDc: '1',
            personalStatus: '1',
            q4DPt: -50,
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '6') {
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusDefaultDc: '1',
            personalStatus: '1',
            q4DPt: 0,
            personalStatusLtrDc: null,
            personalStatusDfpDc: null,
            personalStatusMdgDc: null,
            personalStatusWidDc: null,
            personalStatusSpDc: null
          }
        })
        this.transferForm.patchValue({
          displacementCount: {
            spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus,
            q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
              this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
                this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
                  this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
                    this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
                      this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
                        this.transferForm.value.displacementCount.spouseStatus == '4' ? -20 :
                          this.transferForm.value.displacementCount.spouseStatus == 4 ? -20 : 0
          }
        })
      }
    } else if (!e.target.checked) {
      if (id == '1') {
        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusLtrDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusLtrDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }
      } else if (id == '2') {
        if (this.transferForm.value.displacementCount.personalStatusLtrDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusDfpDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusDfpDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }

      } else if (id == '3') {

        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusLtrDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusMdgDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusMdgDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }

      } else if (id == '4') {
        if (this.transferForm.value.displacementCount.personalStatusSpDc != '1' || this.transferForm.value.displacementCount.personalStatusSpDc != 1) {
          this.transferForm.patchValue({
            displacementCount: {
              spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus,
              q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
                this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
                  this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
                    this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
                      this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
                        this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
                          this.transferForm.value.displacementCount.spouseStatus == '4' ? -20 :
                            this.transferForm.value.displacementCount.spouseStatus == 4 ? -20 : 0
            }
          })
        }
        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusLtrDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusWidDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusWidDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }

      } else if (id == '5') {
        if (this.transferForm.value.displacementCount.personalStatusWidDc != '1' || this.transferForm.value.displacementCount.personalStatusWidDc != 1) {
          this.transferForm.patchValue({
            displacementCount: {
              spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus,
              q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
                this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
                  this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
                    this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
                      this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
                        this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
                          this.transferForm.value.displacementCount.spouseStatus == '4' ? -20 :
                            this.transferForm.value.displacementCount.spouseStatus == 4 ? -20 : 0
            }
          })
        }
        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusLtrDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusSpDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusSpDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }
      }
      else if (id == '6') {
        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusLtrDc == '1'
          || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusDefaultDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusDefaultDc: '1',
              personalStatus: '1',
              q4DPt: 0
            }
          })
        }
      }
    }
  }


  personalStatusCheckBoxTc(e, id) {
    if (e.target.checked) {
      if (id == '1') {
        this.transferForm.patchValue({
          transferCount: {
            personalStatusLtr: '1',
            personalStatus: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            // q9TPt: '0',
            // unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
      } else if (id == '2') {
        this.transferForm.patchValue({
          declaration: {
            personalStatusDfpD: '1'
          },
          transferCount: {
            personalStatus: '1',
            personalStatusDfp: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            // q9TPt: '0',
            // unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
        this.dfpGround = true;
      } else if (id == '3') {
        this.transferForm.patchValue({
          declaration: {
            personalStatusMdgD: '1'
          },
          transferCount: {
            personalStatusMdg: '1',
            personalStatus: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            // q9TPt: '0',
            // unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
        this.gkFilemMedical = true;
      } else if (id == '4') {
        this.transferForm.patchValue({
          transferCount: {
            personalStatusWid: '1',
            personalStatus: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            q9TPt: '0',
            unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
      } else if (id == '5') {
        this.transferForm.patchValue({
          declaration: {
            personalStatusSpD: '1'
          },
          transferCount: {
            personalStatusSp: '1',
            personalStatus: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            q9TPt: '0',
            unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
        this.spGround = true;
      } else if (id == '6') {
        this.transferForm.patchValue({
          transferCount: {
            personalStatusDefault: '1',
            personalStatus: '1',
            personalStatusLtr: this.disableLTR == true ? '9' : null,
            personalStatusDfp: this.disableDFP == true ? '9' : null,
            personalStatusMdg: this.disableMDG == true ? '9' : null,
            personalStatusWid: this.disableWidow == true ? '9' : null,
            personalStatusSp: this.disableSP == true ? '9' : null,
            q6TPt: 0,
            q9TPt: sessionStorage.getItem('q9TPt'),
            unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
          },
          declaration: {
            personalStatusDfpD: '0',
            personalStatusMdgD: '0',
            personalStatusSpD: '0'
          }
        })

        this.transfer5b = false;
        this.spGround = false;
        this.gkFilemMedical = false;
        this.dfpGround = false;
      }
    } else if (!e.target.checked) {
      if (id == '1') {
        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusLtr: null,
              q6TPt: 50,
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusLtr: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }
      } else if (id == '2') {
        if (this.transferForm.value.transferCount.personalStatusLtr == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            declaration: {
              personalStatusDfpD: '0'
            },
            transferCount: {
              personalStatusDfp: null,
              q6TPt: 50,
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            declaration: {
              personalStatusDfpD: '0'
            },
            transferCount: {
              personalStatusDfp: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }
        this.dfpGround = false;

      } else if (id == '3') {

        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusLtr == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            declaration: {
              personalStatusMdgD: '0'
            },
            transferCount: {
              personalStatusMdg: null,
              q6TPt: 50,
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            declaration: {
              personalStatusMdgD: '0'
            },
            transferCount: {
              personalStatusMdg: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }
        this.gkFilemMedical = false;

      } else if (id == '4') {
        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusLtr == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusWid: null,
              q6TPt: 50,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusWid: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }

      } else if (id == '5') {
        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusLtr == '1') {
          this.transferForm.patchValue({
            declaration: {
              personalStatusSpD: '0'
            },
            transferCount: {
              personalStatusSp: null,
              q6TPt: 50,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            declaration: {
              personalStatusSpD: '0'
            },
            transferCount: {
              personalStatusSp: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }
        this.spGround = false;
      }
      else if (id == '6') {

        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusLtr == '1'
          || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusDefault: null,
              q6TPt: 50,
              q9TPt: '0',
              unmarriedWomanYn: '0'
            }
          })
        } else {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusDefault: '1',
              personalStatus: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
          this.spGround = false;
          this.dfpGround = false;
          this.gkFilemMedical = false;
        }
      }
    }

    if (this.transferForm.value.transferCount.q6TPt == '0' || this.transferForm.value.transferCount.q6TPt == 0) {
      this.transfer5b = true;
    } else {
      this.transfer5b = false;
    }
  }

  lastTransferBasedYn(event) {
    if (this.transferForm.value.basicDetails.teacherGender == '2') {
      if (event.target.value == '1') {
        this.transferForm.patchValue({
          transferCount: {
            q6TPt: 0,
            unmarriedWomanYn: '4',
            q9TPt: 20

          }
        })

        this.transferTotalPoint();
      } else if (event.target.value == '0') {
        if (this.transferForm.value.transferCount.tpersonalStatusDefault != '1' || this.transferForm.value.transferCount.tpersonalStatusDefault != 1) {
          var data = 50;
        } else {
          data = 0;
        }
        this.transferForm.patchValue({
          transferCount: {
            q6TPt: data,
            unmarriedWomanYn: '0',
            q9TPt: 0
          }
        })

        this.transferTotalPoint();
      }
    } else if (this.transferForm.value.basicDetails.teacherGender == '1') {
      if (event.target.value == '1') {
        this.transferForm.patchValue({
          transferCount: {
            q6TPt: 0

          }
        })

        this.transferTotalPoint();
      } else if (event.target.value == '0') {
        if (this.transferForm.value.transferCount.tpersonalStatusDefault != '1' || this.transferForm.value.transferCount.tpersonalStatusDefault != 1) {
          var data = 50;
        } else {
          data = 0;
        }
        this.transferForm.patchValue({
          transferCount: {
            q6TPt: data
          }
        })

        this.transferTotalPoint();
      }
    }

  }

  lastTransferBasedOnDisablityYn(event) {

    if (event.target.value == '1') {
      this.transferForm.patchValue({
        transferCount: {
          q8TPt: 0
        }
      })
      this.transferTotalPoint();
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q8TPt: 60
        }
      })
      this.transferTotalPoint();
    }
  }

  transferCount7(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        transferCount: {
          q7TPt: 55
        }
      })
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q7TPt: 0
        }
      })
    }
  }

  transferCount8(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        transferCount: {
          q8TPt: 60
        }
      })
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q8TPt: 0
        }
      })
    }
  }

  transferCount9(event) {

    if (event.target.value == '4') {
      this.transferForm.patchValue({
        transferCount: {
          q9TPt: 20
        }
      })
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q9TPt: 0
        }
      })
    }
  }

  transferCount10(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        transferCount: {
          q10TPt: 25
        }
      })
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q10TPt: 0
        }
      })
    }
  }

  declaration1(event) {
    if (event.target.value == '1') {
      this.gkFilebenefit = true;
    } else if (event.target.value == '0') {
      this.gkFilebenefit = false;
    }
  }

  declaration2(event) {
    if (event.target.value == '1') {
      this.gkFilemMedical = true;
    } else if (event.target.value == '0') {
      this.gkFilemMedical = false;
    }
  }

  declaration6(event) {
    if (event.target.value == '1') {
      this.spGround = true;
    } else if (event.target.value == '0') {
      this.spGround = false;
    }
  }

  declaration3(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        declaration: {
          child_10_12_ynD: '1'
        }
      })
      this.boardExam = true;
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        declaration: {
          child_10_12_ynD: '0'
        }
      })
      this.boardExam = false;
    }
  }

  declaration4(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        declaration: {
          careGiverYnD: '1'
        }
      })
      this.careGiver = true;
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        declaration: {
          careGiverYnD: '0'
        }
      })
      this.careGiver = false;
    }
  }

  declaration5(event) {
    if (event.target.value == '1') {

      this.transferForm.patchValue({
        declaration: {
          childDifferentAbleYnD: '1'
        }
      })
      this.abledChild = true;
    } else if (event.target.value == '0') {
      this.abledChild = false;
      this.transferForm.patchValue({
        declaration: {
          childDifferentAbleYnD: '0'
        }
      })
    }
  }

  declaration7(event) {
    if (event.target.value == '1') {
      this.dfpGround = true;
    } else if (event.target.value == '0') {
      this.dfpGround = false;
    }
  }

  fileToUpload: File | null = null;
  handleFileInput(files: FileList, index) {
    var data = files.item(0).name
    var splitted = data.split('.', 2)

    if (splitted[1] == 'pdf' || splitted[1] == 'PDF') {
      if (files.item(0).size <= 204800) {
        this.fileToUpload = files.item(0);
        if (index == '0') {
          this.enableUploadButton0 = false;
        } else if (index == '1') {
          this.enableUploadButton1 = false;
        } else if (index == '2') {
          this.enableUploadButton2 = false;
        } else if (index == '3') {
          this.enableUploadButton3 = false;
        } else if (index == '5') {
          this.enableUploadButton5 = false;
        } else if (index == '6') {
          this.enableUploadButton6 = false;
        } else if (index == '7') {
          this.enableUploadButton7 = false;
        } else if (index == '8') {
          this.enableUploadButton8 = false;
        }
      } else {
        this.fileToUpload = null;
        Swal.fire(
          'File size allowed upto 200KB only !',
          '',
          'error'
        )
        if (index == '0') {
          this.enableUploadButton0 = true;
        } else if (index == '1') {
          this.enableUploadButton1 = true;
        } else if (index == '2') {
          this.enableUploadButton2 = true;
        } else if (index == '3') {
          this.enableUploadButton3 = true;
        } else if (index == '5') {
          this.enableUploadButton5 = true;
        } else if (index == '6') {
          this.enableUploadButton6 = true;
        } else if (index == '7') {
          this.enableUploadButton7 = true;
        } else if (index == '8') {
          this.enableUploadButton8 = true;
        }
      }

    } else {
      this.fileToUpload = null;
      Swal.fire(
        'Only PDF file can be uploaded',
        '',
        'error'
      )
      if (index == '0') {
        this.enableUploadButton0 = true;
      } else if (index == '1') {
        this.enableUploadButton1 = true;
      } else if (index == '2') {
        this.enableUploadButton2 = true;
      } else if (index == '3') {
        this.enableUploadButton3 = true;
      } else if (index == '5') {
        this.enableUploadButton5 = true;
      } else if (index == '6') {
        this.enableUploadButton6 = true;
      } else if (index == '7') {
        this.enableUploadButton7 = true;
      } else if (index == '8') {
        this.enableUploadButton8 = true;
      }
    }
  }



  documentUpload(index) {
    const formData = new FormData();
    if (this.fileToUpload != null) {
      formData.append('teacherId', this.responseData.teacherId);
      formData.append('file', this.fileToUpload);
      if (index == 0) {
        formData.append('filename', "Medical_Certificate");
      } else if (index == 1) {
        formData.append('filename', "Board_examination_Proof");
      } else if (index == 2) {
        formData.append('filename', "Disability_Certificate");
      } else if (index == 3) {
        formData.append('filename', "Differentially_Abled_Certificate");
      } else if (index == 5) {
        formData.append('filename', "Spouse_Declaration");
      } else if (index == 6) {
        formData.append('filename', "Single_Parent_Declaration");
      } else if (index == 7) {
        formData.append('filename', "DFP_Declaration");
      } else if (index == 8) {
        formData.append('filename', "NJCM_RJCM_Declaration");
      }
      this.outSideService.uploadDocument(formData).subscribe((res) => {
        this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
          this.documentUploadArray = res;
          for (let i = 0; i < res.length; i++) {

            if (res[i].docName == 'Medical_Certificate.pdf') {
              this.deleteDocUpdate0 = false;
            }
            if (res[i].docName == 'Board_examination_Proof.pdf') {
              this.deleteDocUpdate1 = false;
            }
            if (res[i].docName == 'Disability_Certificate.pdf') {
              this.deleteDocUpdate2 = false;
            }
            if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
              this.deleteDocUpdate3 = false;
            }
            if (res[i].docName == 'Spouse_Declaration.pdf') {
              this.deleteDocUpdate5 = false;
            }
            if (res[i].docName == 'Single_Parent_Declaration.pdf') {
              this.deleteDocUpdate6 = false;
            }
            if (res[i].docName == 'DFP_Declaration.pdf') {
              this.deleteDocUpdate7 = false;
            }
            if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
              this.deleteDocUpdate8 = false;
            }
          }
        })

        Swal.fire(
          'Document Upload Sucessfully',
          '',
          'success'
        )
        this.documentUploadArray[index] = { "docName": res.response.docName, "url": res.response.url };
        if (index == 0) {
          this.deleteDocUpdate0 = false
        } else if (index == 1) {
          this.deleteDocUpdate1 = false
        } else if (index == 2) {
          this.deleteDocUpdate2 = false
        } else if (index == 3) {
          this.deleteDocUpdate3 = false
        } else if (index == 5) {
          this.deleteDocUpdate5 = false
        } else if (index == 6) {
          this.deleteDocUpdate6 = false
        } else if (index == 7) {
          this.deleteDocUpdate7 = false
        } else if (index == 8) {
          this.deleteDocUpdate8 = false
        }
      })
    } else {
      Swal.fire(
        'Select PDF to be uploaded !',
        '',
        'error'
      )
    }
    this.fileToUpload = null;
  }

  deleteDocumentUploaded(documentName) {
    for (let i = 0; i < this.documentUploadArray.length; i++) {
      if (this.documentUploadArray[i].docName == documentName) {
        this.documentUploadArray[i] = {}
      }
    }
    var data = {
      "teacherId": this.responseData.teacherId,
      "docName": documentName
    }
    this.outSideService.deleteUploadedDoc(data).subscribe((res) => {
      Swal.fire(
        'Deleted !',
        '',
        'success'
      )
      this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
        this.documentUploadArray = res;
        for (let i = 0; i < res.length; i++) {
          if (res[i].docName == 'Medical_Certificate.pdf') {
            this.deleteDocUpdate0 = false;
          }
          if (res[i].docName == 'Board_examination_Proof.pdf') {
            this.deleteDocUpdate1 = false;
          }
          if (res[i].docName == 'Disability_Certificate.pdf') {
            this.deleteDocUpdate2 = false;
          }
          if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
            this.deleteDocUpdate3 = false;
          }
          if (res[i].docName == 'Spouse_Declaration.pdf') {
            this.deleteDocUpdate5 = false;
          }
          if (res[i].docName == 'Single_Parent_Declaration.pdf') {
            this.deleteDocUpdate6 = false;
          }
          if (res[i].docName == 'DFP_Declaration.pdf') {
            this.deleteDocUpdate7 = false;
          }
          if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
            this.deleteDocUpdate8 = false;
          }
        }
      })
    })
  }

  enableTransferForm(val) {
    if (val == '1') {
      this.enableTransferFormYn = true;
    } else if (val == '0') {
      this.enableTransferFormYn = false;
    }
  }

  stationChoiceSpouse(e, val) {
    if (e.target.checked) {
      if (val == 1) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km1: '1'
          }
        })

      } else if (val == 2) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km2: '1'
          }
        })
      } else if (val == 3) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km3: '1'
          }
        })
      } else if (val == 4) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km4: '1'
          }
        })
      } else if (val == 5) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km5: '1'
          }
        })
      }
    } else if (!e.target.checked) {
      if (val == 1) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km1: null
          }
        })
      } else if (val == 2) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km2: null
          }
        })
      } else if (val == 3) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km3: null
          }
        })
      } else if (val == 4) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km4: null
          }
        })
      } else if (val == 5) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km5: null
          }
        })
      }
    }
  }

  getSubjectByTchTypePdf(data) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      var subjectList = res.response.rowValue;
      for (let i = 0; i < subjectList.length; i++) {
        if (this.reponseDataForPdf.workExperienceAppointedForSubject == subjectList[i].subject_id) {
          this.reponseDataForPdf.workExperienceAppointedForSubject = subjectList[i].subject_name;
        }

      }
    })
  }

  teacherTransferPdf() {
    this.getProfileImage();
    for (let i = 0; i < this.teacherTypeData.length; i++) {
      if (this.reponseDataForPdf.lastPromotionPositionType == this.teacherTypeData[i].teacherTypeId) {
        this.reponseDataForPdf.lastPromotionPositionType = this.teacherTypeData[i].organizationTeacherTypeName;
        var data = {
          "applicationId": environment.applicationId,
          "teacherTypeId": this.teacherTypeData[i].teacherTypeId
        }
        this.getSubjectByTchTypePdf(data);
      }
    }
    setTimeout(() => {
      this.transferPdfService.teacherTransferFnc(this.reponseDataForPdf, this.kvNameCode, this.stationNameCode, this.teacherExperienceData, this.documentUploadArray, this.imageData);
    }, 500);
  }

  getProfileImage() {
    this.outSideService.getProfileImage(JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name).subscribe((res) => {
      if (res.status == '1' || res.status == '1') {
        this.imageData = "data:image/jpg;base64," + res.data;
      } else if (res.status == '0' || res.status == '0') {
        this.imageData = 'assets/assets/img/download.jpg';
      }
    },
      error => {
        this.imageData = 'assets/assets/img/download.jpg';
      })
  }

  checkForSameSchool(event, index) {
    let checkForZiet: boolean = false;
    for (let i = 0; i < this.kvSchoolList.length; i++) {
      if (this.responseData.teachingNonTeachingStaff == '1' && this.kvSchoolList[i].udise_sch_code == event.target.value && this.kvSchoolList[i].school_type == '2') {
        checkForZiet = true;
      }
    }

    if (checkForZiet) {
      if (index == 1) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv1UdiseCodePresentStation: ''
          }
        })
      } else if (index == 2) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv2UdiseCodePresentStation: ''
          }
        })
      } else if (index == 3) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv3UdiseCodePresentStation: ''
          }
        })
      } else if (index == 4) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv4UdiseCodePresentStation: ''
          }
        })
      } else if (index == 5) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv5UdiseCodePresentStation: ''
          }
        })
      }
      Swal.fire(
        'ZIET school selection not allowed',
        '',
        'error'
      )

    } else {
      if (index == 1) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 2) {
        if (this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 3) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 4) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 5) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5UdiseCodePresentStation: ''
            }
          })
        }
      }
    }
  }

  restStationSelection(val) {
    if (val == 1) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1StationCode: '',
          choiceKv1StationName: ''
        }
      })
    } else if (val == 2) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv2StationCode: '',
          choiceKv2StationName: ''
        }
      })
    } else if (val == 3) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv3StationCode: '',
          choiceKv3StationName: ''
        }
      })
    } else if (val == 4) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv4StationCode: '',
          choiceKv4StationName: ''
        }
      })
    } else if (val == 5) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv5StationCode: '',
          choiceKv5StationName: ''
        }
      })
    } else if (val == 191) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement1StationName: '',
          displacement1StationCode: ''
        }
      })
    } else if (val == 192) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement2StationName: '',
          displacement2StationCode: ''
        }
      })
    } else if (val == 193) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement3StationName: '',
          displacement3StationCode: ''
        }
      })
    } else if (val == 194) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement4StationName: '',
          displacement4StationCode: ''
        }
      })
    } else if (val == 195) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement5StationName: '',
          displacement5StationCode: ''
        }
      })
    } else if (val == 291) {
      this.transferForm.patchValue({
        transferCount: {
          doptStationOneCode: '',
          doptStationOneName: ''
        }
      })
    } else if (val == 292) {
      this.transferForm.patchValue({
        transferCount: {
          doptStationTwoCode: '',
          doptStationTwoName: ''
        }
      })
    }
  }

  spouseWithin100kmDisp(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
            this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
              this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
                this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
                  this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
                    this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
                      this.transferForm.value.displacementCount.spouseStatus == '2' ? -20 :
                        this.transferForm.value.displacementCount.spouseStatus == 2 ? -20 : 0,
          spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus
        }
      })
    } else if (event.target.value == '0') {
      if (this.responseData.teacherGender == '1' || this.responseData.teacherGender == '1') {
        this.transferForm.patchValue({
          displacementCount: {
            q5DPt: 0,
            spouseStatusDisplacement: '5'
          }
        })
      } else if (this.responseData.teacherGender == '2' || this.responseData.teacherGender == '2') {
        this.transferForm.patchValue({
          displacementCount: {
            q5DPt: -20,
            spouseStatusDisplacement: '4'
          }
        })
      }

    }
  }


}
