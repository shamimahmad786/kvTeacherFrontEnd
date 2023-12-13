
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service'
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { environment } from 'src/environments/environment';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
//import{ExperienceType} from 'src/app/utilities/myPipe/myPipe'
// import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare const loadScroller: any;
declare const nextClickCalled: any;
declare const onNextClick: any;
declare const onPreviousClick: any;
declare const changePassword: any;
import * as moment from 'moment';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TeacherAppPdfService } from 'src/app/makePDF/teacher-app-pdf.service';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from '@angular/material/core';
interface SubjectData {
  subNameCode: string;
  subjectCode: string;
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile-updated.component.html',
  styleUrls: ['./teacher-profile.component.css'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },


  ],
})
export class TeacherProfileComponent implements OnInit {

  @ViewChild('verifyProfile', { static: true }) verifyProfile: TemplateRef<any>;
  @ViewChild('selectSchoolModal', { static: true }) selectSchoolModal: TemplateRef<any>;
  @ViewChild('selectSpouseStationModal', { static: true }) selectSpouseStationModal: TemplateRef<any>;
  @ViewChild('schoolRemarksModal', { static: true }) schoolRemarksModal: TemplateRef<any>;
  @ViewChild('processFlow', { static: true }) processFlow: TemplateRef<any>;
  @ViewChild('selectSchoolModalInterStation', { static: true }) selectSchoolModalInterStation: TemplateRef<any>;
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('resetPasswordModal', { static: true }) resetPasswordModal: TemplateRef<any>;
  @ViewChild('spouseFile')
  spouseFile: ElementRef;
  @ViewChild('Medical_Certificate')
  Medical_Certificate: ElementRef;
  @ViewChild('Single_Parent_Declaration')
  Single_Parent_Declaration: ElementRef;
  @ViewChild('DFP_Declaration')
  DFP_Declaration: ElementRef;
  @ViewChild('Disability_Certificate')
  Disability_Certificate: ElementRef;
  @ViewChild('NJCM_RJCM_Declaration')
  NJCM_RJCM_Declaration: ElementRef;
  flagUpdatedList: any;
  teacherForm: FormGroup;
  changePaswordForm: FormGroup;
  correctionProfile: FormGroup;
  tempTeacherId: any;
  isVisible: boolean = false;
  responseData: any;
  stationNameCode: any;
  careGiverRelationData: any;
  kvNameCode: any;
  profQualMasterList: any;
  acadQualMasterList: any;
  subjectListQual: any[] = [];
  subjectListQualP: any[] = [];
  acdQualList: any;
  year: any = 'Enter year';
  find: any;
  public sh: boolean = true;
  public sh1: boolean = true;
  public sh2: boolean = true;
  public sh3: boolean = true;
  public sh4: boolean = true;
  public sh5: boolean = true;
  public sh6: boolean = true;
  public sh7: boolean = true;
  public sh8: boolean = true;
  transferRelatedFormTempId: any;
  public sh21: boolean = true;
  public sh22: boolean = true;
  public sh23: boolean = true;
  public sh24: boolean = true;
  public sh25: boolean = true;
  public sh26: boolean = true;
  public sh27: boolean = true;
  public sh28: boolean = true;
  responseStatus: any;
  currentDateTime: any;
  regionList: any;
  stationList: any
  kvSchoolList: any;
  selectedUdiseCode: any;
  indexNew: any;
  spouseNone: boolean = false;
  spouseKVSStation: boolean = false;
  marriedStatusYN: boolean = false;

  selectedSpouseStation: any;

  declaration1: boolean = false;
  declaration2: boolean = false;

  codeList: any;
  allowEdit: any;
  teacherTypeData: any;
  kvCode: any;
  subjectList: any;
  newTeacherEntry: any;
  addType: any;


  isVisibleBirth: boolean = false;
  isBirth: boolean = true;
  isVisibleTet: any;
  isSelectedTet: boolean = true;
  onvalid;
  teacherData: any;
  genderMale: any;
  genderFemale;
  genderOther;
  kvSchoolDetails: any;
  stationCode: any;
  teacherTypeDataNameCode: any = [];
  subjectListNameCode: any = [];
  formStatusLocale: any;

  subjectListNameCode1: SubjectData[] = [];
  subjectListNameCode2: any[] = [];

  tchExpList: any;

  applicationId: any;
  kvicons: any;
  kvIfConditions: boolean = false;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  awardsList: any;
  trainingList: any;

  workExpId: any;
  tchPromotionList: any;
  profQualList: any;
  formDataList: any;
  stateMasterList: any;
  districListByStateIdC: any;
  districListByStateIdP: any;

  documentUploadArray: any[] = [];
  enableUploadButton0: boolean = false;
  enableUploadButton1: boolean = false;
  enableUploadButton2: boolean = false;
  enableUploadButton3: boolean = false;
  enableUploadButton4: boolean = false;

  deleteDocUpdate0: boolean = true;
  deleteDocUpdate1: boolean = true;
  deleteDocUpdate2: boolean = true;
  deleteDocUpdate3: boolean = true;
  deleteDocUpdate4: boolean = true;
  surveHardYnradioButton: any;
  lastPromotionId: any;
  confirmEnable: boolean = false;
  optionDisable: boolean = false;
  verifyTchTeacherProfileData: any;
  verifyTchTeacherAcdQualification: any;
  verifyTchTeacherProfQualification: any;
  verifyTchTeacherAward: any;
  verifyTchTeacherTraining: any;
  verifyTchTeacherWorkExp: any;
  transferGroundList: any;
  showStationChoice18C: boolean = false;
  showStationChoice18: boolean = false;
  spouseKvsYnDradioButton: any;
  inlineRadio13radioButton: any;
  spGround: boolean = false;
  personalStatusSpDradioButton: any;
  dfpGround: boolean = false;
  personalStatusDfpDradioButton: any;
  abledChild: boolean = false;
  childDifferentAbleYnDradioButton: any;
  careGiver: boolean = false;
  careGiverFaimlyYnDradioButton: any;
  gkFilemMedical: boolean = false;
  empTransferradioButton: any;
  personalStatusMdgDradioButton: any;
  disciplinaryYnradioButton: any;
  teacherStationChioce: any;
  gkFilebenefit: boolean = false;
  enableUploadButtonRelatedForm0: boolean = false;
  enableUploadButtonRelatedForm1: boolean = false;
  enableUploadButtonRelatedForm2: boolean = false;
  enableUploadButtonRelatedForm3: boolean = false;
  enableUploadButtonRelatedForm5: boolean = false;
  enableUploadButtonRelatedForm6: boolean = false;
  enableUploadButtonRelatedForm7: boolean = false;
  enableUploadButtonRelatedForm8: boolean = false;
  deleteDeclairaionFormDocUpdate0: boolean = false;
  deleteDeclairaionFormDocUpdate1: boolean = false;
  deleteDeclairaionFormDocUpdate2: boolean = false;
  deleteDeclairaionFormDocUpdate3: boolean = false;
  deleteDeclairaionFormDocUpdate5: boolean = false;
  deleteDeclairaionFormDocUpdate6: boolean = false;
  deleteDeclairaionFormDocUpdate7: boolean = false;
  deleteDeclairaionFormDocUpdate8: boolean = false;
  positionHeld: boolean = false;
  regionShow: boolean = false;
  zoneShow: boolean = false;
  stationShow: boolean = false;
  schoolShow: boolean = false;
  showSchoolType: boolean = false;
  headQuaterShow: boolean = false;
  selectHeadQuaterZoneRegion = false
  selectedKvCode: any;
  selectedKvname: any;
  headQuaterList: any = [];
  selectRegionList: any = [];
  zoneList: any = [];
  selectStationName: any;
  selectedSchoolType: any;
  selectSchoolType: any;
  position: any;
  hashId: any;
  gender: any;
 // For Document Show On PreView Page
 medicalDocName:any;
 medicalDocURLName:any;
 disabilityCertiDocName:any;
 disabilityCertiDocURLName:any;
 singleParentDocName:any;
 singleParentDocURLName:any;
 dFPDocName:any;
 dFPDocURLName:any;
 nJCMRJCMDocName:any;
 nJCMRJCMDocURLName:any;
 spouseDeclarationDocUrlName:any;

  shiftYN: any;
  maxDate: any;
  stationType: any;
  patientAilmentData: any;
  medicalCertificateIssueDateData: any;
  singleParentGroundData: any;
  singleParentCertificateIssueDateData: any;
  deathOfFamilyGroundData: any;
  deathCertificateIssueDateData: any;
  relationWithEmplMdgData: any;
  buttonVisible: boolean = false;
  user_name: any;
  dialogRef: any;
  fileUpgkFilebenefit: boolean = true;
  fileUpgkFilemMedical: boolean = true;
  fileUpspGround: boolean = true;
  fileUpdfpGround: boolean = true;
  fileUpcareGiver: boolean = true;
  fileUppositionHeld: boolean = true;
  @ViewChild('Physically_Handicap_Certificate')
  Physically_Handicap_Certificate: ElementRef;

  fileUpload: boolean = true;

  myAppointmnet(event) {
    if (event.target.value == "1") {
      this.onvalid = event.target.value;
    }
    else if (event.target.value == "0") {
      this.onvalid = event.target.value;
    }
  }


  toppings = new FormControl();
  toppingList: string[] = [];


  onClickDisability(val) {
    if (val == 'yes') {
      this.isVisible = true;
    } else if (val == 'no') {
      this.isVisible = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          disabilityType: '',
          disabilityFromBirthYN: '',
          disabilityDate: '',
          disabilityPercentage: '',
          disabilityCertAuth: '',
          disabilityCertNo: '',
        }
      })
    } else if (val == 'yesBirth') {
      this.isVisibleBirth = false;
    } else if (val == 'noBirth') {
      this.isVisibleBirth = true;
    }
  }

  nextClick(index) {
    onNextClick(index);
  }

  onPreviousClick(index) {
    onPreviousClick(index);
  }

  constructor(private date: DatePipe, private dataService: DataService, private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private pdfServive: TeacherAppPdfService) { }

  ngOnInit(): void {
    //alert("called");
    const dtToday = new Date();
    let month = String(dtToday.getMonth() + 1);
    let day = String(dtToday.getDate());
    let year = dtToday.getFullYear();
    if (parseInt(month, 10) < 10) {
      month = '0' + month.toString();
    }
    if (parseInt(day, 10) < 10) {
      day = '0' + day.toString();
    }
    this.maxDate = `2023-07-20`;
     ;
    // if(sessionStorage.getItem('displayPopUp') == 'true'){
    //   this.modalService.open(this.processFlow, { size: 'xl', backdrop: 'static', keyboard: false })
    // }

    // loadScroller(6);
    // this.getDocumentByTeacherId();
    setTimeout(function () {
      loadScroller(6);
    }, 1000);

    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround
    this.getAllMaster();

    this.newTeacherEntry = false;

    this.teacherForm = new FormGroup({
      profileForm: new FormGroup({
        'empCode': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        'fullName': new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z ]*$")]),
        'gender': new FormControl('', Validators.required),
        'genderP': new FormControl('', Validators.required),
        'dob': new FormControl('', [Validators.required, this.dateDifferenceFnc.bind(this)]),
        'socialCat': new FormControl(''),
        'religion': new FormControl(''),
        //  'nationality': new FormControl('', Validators.required),
        'mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[8976][0-9]{9}")]),
        'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        'presentStationName': new FormControl('', Validators.required),
        'presentStationPostDate': new FormControl('', [Validators.required, this.dateDifferenceFnc.bind(this)]),
        'presentKvName': new FormControl('', Validators.required),
        'presentKvDate': new FormControl('', [Validators.required, this.dateDifferenceFnc.bind(this)]),
        'presentPostName': new FormControl('', Validators.required),
        'presentPostDate': new FormControl('', [Validators.required, this.dateDifferenceFnc.bind(this)]),
        'presentSubjectName': new FormControl('', Validators.required),
        'tariningJnKvs': new FormControl(''),
        'staffType': new FormControl('', Validators.required),
        'staffTypeP': new FormControl('', Validators.required),
        // 'natureOfAptmnt': new FormControl('', Validators.required),
        'specialRecruitmentYn': new FormControl('', Validators.required)
        // 'maritalStatusF': new FormControl('', Validators.required)
      }),
      disabilityForm: new FormGroup({
        'disabilityYN': new FormControl('', Validators.required),
        'disabilityType': new FormControl('', Validators.required),
        'disabilityFromBirthYN': new FormControl('', Validators.required),
        'disabilityDate': new FormControl('', Validators.required),
        'disabilityPercentage': new FormControl('', Validators.required),
        'disabilityCertAuth': new FormControl('', Validators.required),
        'disabilityCertNo': new FormControl('', Validators.required),
      }),
      //-------------------------- newform transferRelatedForm  add  start  here---------------------------------
      transferRelatedForm: new FormGroup({
        'id': new FormControl(''),
        'absenceDaysOne': new FormControl('', Validators.required),
        'disciplinaryYn': new FormControl(''),
        'teacherId': new FormControl('', Validators.required),
        'applyTransferYn': new FormControl('', Validators.required),
        'choiceKv1StationName': new FormControl('', Validators.required),
        'choiceKv2StationName': new FormControl('', Validators.required),
        'choiceKv3StationName': new FormControl('', Validators.required),
        'choiceKv4StationName': new FormControl('', Validators.required),
        'choiceKv5StationName': new FormControl('', Validators.required),
        'displacement1StationCode': new FormControl('', Validators.required),
        'displacement1StationName': new FormControl('', Validators.required),
        'displacement2StationName': new FormControl('', Validators.required),
        'displacement2StationCode': new FormControl('', Validators.required),
        'displacement3StationName': new FormControl('', Validators.required),
        'displacement3StationCode': new FormControl('', Validators.required),
        'displacement4StationCode': new FormControl('', Validators.required),
        'displacement4StationName': new FormControl('', Validators.required),
        'displacement5StationCode': new FormControl('', Validators.required),
        'displacement5StationName': new FormControl('', Validators.required),
        'spouseKvsYnD': new FormControl(),
        'personalStatusMdgD': new FormControl(),
        'personalStatusSpD': new FormControl(),
        'personalStatusDfpD': new FormControl(),
        'memberJCM': new FormControl(),
        'surveHardYn': new FormControl(),
        'careGiverYnD': new FormControl(),
        'relationWithEmplMdg': new FormControl('', Validators.required),
        'positionOfNjcmRjcm': new FormControl('', Validators.required),
        'nameOfFamilyMember': new FormControl('', Validators.required),
        'medicalCertificateIssueDate': new FormControl('', Validators.required),
        'singleParentGround': new FormControl('', Validators.required),
        'deathOfFamilyGround': new FormControl('', Validators.required),
        'deathCertificateIssueDate': new FormControl('', Validators.required),
        'singleParentCertificateIssueDate': new FormControl('', Validators.required),
        'childDifferentAbleYnD': new FormControl(),
        //'spouseName': new FormControl(''),
        'spousePost': new FormControl(''),
        'spouseStationName': new FormControl(''),
        'careGiverFaimlyYnD': new FormControl(''),
        'patientName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientAilment': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientHospital': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientMedicalOfficerName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientMedicalOfficerDesignation': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'careGiverName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'careGiverRelation': new FormControl('', Validators.required),
        'careGiverDisabilityName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'careGiverDisabilityPrcnt': new FormControl('', [Validators.required, Validators.maxLength(3), Validators.min(0), Validators.max(100), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]),
        'childDifferentName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'childDifferentDisabilityName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'childDifferentDisabilityPrcnt': new FormControl('', [Validators.required, Validators.min(0), Validators.max(100), Validators.maxLength(3), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]),
      }),

      //------------------------- end here------------------------------------------------------------------------
      personalInfoForm: new FormGroup({
        'disabilityYN': new FormControl('', Validators.required),
        'disabilityYNP': new FormControl(''),
        'disabilityType': new FormControl('', Validators.required),
        'disabilityFromBirthYN': new FormControl(''),
        'disabilityFromBirthYNP': new FormControl(''),
        'disabilityDate': new FormControl(''),
        'disabilityPercentage': new FormControl(''),
        'disabilityCertAuth': new FormControl(''),
        'disabilityCertNo': new FormControl(''),
        // 'bloodGroup': new FormControl(''),
        'crspndncAddress': new FormControl('', Validators.required),
        'crspndncState': new FormControl('', Validators.required),
        'crspndncDistrict': new FormControl('', Validators.required),
        'crspndncPinCode': new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
        'prmntAddress': new FormControl('', Validators.required),
        'prmntState': new FormControl('', Validators.required),
        'prmntDistrict': new FormControl('', Validators.required),
        'prmntPinCode': new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
        'personalIdNo': new FormControl(''),
        'aadhaarNo': new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.minLength(14), Validators.maxLength(14)]),
        //'panNo': new FormControl('', [Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.minLength(10), Validators.maxLength(10)]),
        'passportNo': new FormControl('', [Validators.pattern("^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$")]),
        'spouseStatusF': new FormControl('', Validators.required),
        'spouseEmpCode': new FormControl('', Validators.required),
        'spouseName': new FormControl('', Validators.required),
        'spousePost': new FormControl('', Validators.required),
        'maritalStatusF': new FormControl('', Validators.required),
        'spouseStationCode': new FormControl(''),
        'spouseStationName': new FormControl('', Validators.required),

        'spouseStatusKVS': new FormControl('', Validators.required),
        'spouseStatusCentral': new FormControl('', Validators.required),
        'spouseStatusState': new FormControl('', Validators.required),
        'spouseStatusNone': new FormControl('', Validators.required),
        'sameAbove': new FormControl(),
      }),
      'detailsOfPosting': new FormArray([]),
      'subAndClassTaught': new FormArray([]),
      'promotionDetails': new FormArray([]),
      'acadProfQual': new FormArray([]),
      'profQual': new FormArray([]),
      'awardReceived': new FormArray([]),
      'trainingReceived': new FormArray([]),
      'subjectTaught': new FormArray([])
    })

    this.user_name = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.user_name;
    setTimeout(() => {
      this.changePaswordForm.patchValue({
        userId:this.user_name
      })
    }, 100)
     
    const data = {
      userId: this.user_name
    }
    this.outSideService.checkPasswordChanged(data).subscribe((res) => {
      if (res.status == 1) {
        this.dialogRef = this.modalService.open(this.resetPasswordModal, { backdrop: 'static', keyboard: false, },);
      }
      console.log(res);
    })

    this.changePaswordForm = new FormGroup({
      'userId': new FormControl(''),
      'oldPassword': new FormControl('', Validators.required),
      'newPassword': new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8), this.checkConfirmPassword.bind(this)])
    })
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      if (JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.hashId != null) {
        this.hashId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.hashId;
      }

    }

    if (this.hashId != null) {
      this.getTeacherById(this.hashId);
    }

    // this.getSchoolDetailsByKvCode();

    if (this.kvicons?.includes(this.applicationId)) {
      this.kvIfConditions = true;
    } else {
      this.kvIfConditions = false;
    }
    this.getKvRegion();
    this.teacherForm.patchValue({
      transferRelatedForm: {
        spouseKvsYnD: '0',
        personalStatusMdgD: '0',
        personalStatusSpD: '0',
        personalStatusDfpD: '0',
        careGiverFaimlyYnD: '0',
        disciplinaryYn: '0',
        childDifferentAbleYnD: '0',
        memberJCM: '0'
      }
    });
  }




  //New --Start

  //Add and Remove Posting Form --Start
  detailsOfPosting(): FormArray {
    return this.teacherForm.get("detailsOfPosting") as FormArray
  }
  newQuantity(data): FormGroup {
     
    var experienceType = "";

    if (data?.experienceType == "1") {
      experienceType = "School";
    } else if (data?.experienceType == "2") {
      experienceType = "Region";
    } else if (data?.experienceType == "3") {
      experienceType = "ZIET";
    } else if (data?.experienceType == "4") {
      experienceType = "Head Quarter";
    }
    if (data != undefined) {
      return this.fb.group({
        teacherId: data.teacherId,
        workExperienceId: data.workExperienceId,
        shiftType: data.shiftType,
        experienceType: data.experienceType,
        groundForTransfer: parseInt(data.groundForTransfer),
        currentlyActiveYn: data.currentlyActiveYn,
        shiftYn: data.shift_yn,
        udiseSchoolName: [data.udiseSchoolName, [Validators.required]],
        udiseSchCode: [data.udiseSchCode, [Validators.required]],
        workStartDate: [data.workStartDate, [Validators.required]],
        workEndDate: [data.workEndDate, [Validators.required]],
        // natureOfAppointment: [data.natureOfAppointment, [Validators.required]],

        positionType: [data.positionType, [Validators.required]],
        appointedForSubject: [data.appointedForSubject, [Validators.required]],
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        workExperienceId: '',
        experienceType: '',
        shiftType: '',
        groundForTransfer: ["", [Validators.required]],
        currentlyActiveYn: '',
        udiseSchoolName: ["", [Validators.required]],
        udiseSchCode: ["", [Validators.required]],
        workStartDate: ["", [Validators.required]],
        workEndDate: ["", [Validators.required]],
        // natureOfAppointment: ["", [Validators.required]],
        positionType: ["", [Validators.required]],
        appointedForSubject: ["", [Validators.required]],
        shiftYn: '',
      })
    }

  }
  addQuantity(data) {
    this.detailsOfPosting().push(this.newQuantity(data));
  }
  removeQuantity(val) {

    if (this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA' || this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES') {
      return
    } else {
      let deletedData = this.teacherForm.value.detailsOfPosting[val]
      var data = {
        "workExperienceId": deletedData.workExperienceId
      }

      if (this.workExpId == data.workExperienceId) {
        Swal.fire(
          'Alert !',
          'This record cannot be deleted !',
          'error'
        )
      } else {
        this.detailsOfPosting().removeAt(val)
        this.outSideService.deleteExpByWorkExpId(data).subscribe((response) => {
          if (response) {
            Swal.fire(
              'This record has been deleted !',
              '',
              'success'
            )
          }
        })
      }
    }



    // this.detailsOfPosting().removeAt();
  }

  getTchExpByTchId() {
    (this.teacherForm.controls['detailsOfPosting'] as FormArray).clear();
    this.tchExpList = [];
    this.subjectListNameCode2 = [];
    if (this.tempTeacherId) {
      this.outSideService.fetchTchExpByTchId(this.tempTeacherId).subscribe((res) => {
        this.tchExpList = res.response;
        for (let i = 0; i < this.tchExpList.length; i++) {
          var data = {
            "applicationId": this.applicationId,
            "teacherTypeId": this.tchExpList[i].positionType
          }

          if (this.tchExpList[i].workEndDate != null && this.tchExpList[i].workEndDate != "null") {
            this.tchExpList[i].workEndDate = this.date.transform(new Date(this.tchExpList[i].workEndDate * 1), 'yyyy-MM-dd')
          }
          this.tchExpList[i].workStartDate = this.date.transform(new Date(this.tchExpList[i].workStartDate * 1), 'yyyy-MM-dd')

          this.addQuantity(this.tchExpList[i])
          this.getSubjectByTchTypeExp(data, i)

          this.tempTeacherId = this.tchExpList[i].teacherId;
        }
        for (let i = 0; i < this.tchExpList.length; i++) {
          if (this.tchExpList[i].workExperienceId == this.workExpId) {
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('workStartDate').disable();
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('workEndDate').disable();
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('groundForTransfer').disable();
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('positionType').disable();
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('appointedForSubject').disable();
            if (sessionStorage.getItem('shiftAvailable') == '0') {
              ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('shiftType').disable();
            }
          }
          if (this.tchExpList[i].shift_yn == '0') {
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('shiftType').disable();
          } else if (this.tchExpList[i].shift_yn == '0') {
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('shiftType').enable();
          }

        }
      })
    } else {
    }

  }
  //Add and Remove Posting Form --Start 

  //Add and Remove Promotion Details -- Start
  addQuantityPromotion(data) {
    this.promotionDetails().push(this.newQuantityPromotion(data));
  }
  promotionDetails(): FormArray {
    return this.teacherForm.get("promotionDetails") as FormArray
  }
  newQuantityPromotion(data): FormGroup {

    if (data != undefined) {
      return this.fb.group({
        promotionId: data.promotionId,
        teacherId: this.tempTeacherId,
        udiseSchCode: data.udiseSchCode,
        schoolId: data.schoolId,
        businessUnitCode: data.businessUnitCode,
        businessUnitTypeId: data.businessUnitTypeId,
        currentlyWorkingYn: data.currentlyWorkingYn,
        workStartDate: [data.workStartDate, [Validators.required]],
        workEndDate: data.workEndDate,
        positionType: [data.positionType, [Validators.required]],
        natureOfAppontment: data.natureOfAppontment
      })
    } else {
      return this.fb.group({
        promotionId: '',
        teacherId: this.tempTeacherId,
        udiseSchCode: '',
        schoolId: '',
        businessUnitCode: '',
        businessUnitTypeId: '',
        currentlyWorkingYn: '',
        workStartDate: ["", [Validators.required]],
        workEndDate: '',
        positionType: ["", [Validators.required]],
        natureOfAppontment: ''
      })
    }
  }
  removeQuantityPromotion(val) {
    let deletedData = this.teacherForm.value.promotionDetails[val]

    if (deletedData.promotionId == this.lastPromotionId) {

      Swal.fire(
        'Alert !',
        'This record cannot be deleted !',
        'error'

      )
    } else {
      this.promotionDetails().removeAt(val)
      this.outSideService.deletePromotion(deletedData.promotionId).subscribe((response) => {
        if (response.status == '1') {
          Swal.fire(
            'This record has been deleted !',
            '',
            'success'
          )
        }
      })
    }

  }
  getPromotionByTchId() {
    (this.teacherForm.controls['promotionDetails'] as FormArray).clear();
    this.tchPromotionList = [];
    if (this.tempTeacherId) {
      this.outSideService.fetchPromotionByTchId(this.tempTeacherId).subscribe((res) => {
        this.tchPromotionList = res.response;
        for (let i = 0; i < this.tchPromotionList.length; i++) {
          this.addQuantityPromotion(this.tchPromotionList[i])
        }
      })
    } else {
    }

  }
  //Add and Remove Promotion Details -- End

  //Add and Remove Academic Qualification-- Start
  addAcadProfQual(data) {
    this.acadProfQual().push(this.newAcadProfQual(data));
  }
  newAcadProfQual(data) {

    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        teacherEducationalQualificationId: data.teacherEducationalQualificationId,
        qualificationDegreeId: [data.qualificationDegreeId, [Validators.required]],
        qualificationDegreeMajorList: [data.qualificationDegreeMajorList, [Validators.required]],
        qualificationDegreeMinorList: [data.qualificationDegreeMinorList, [Validators.required]],
        boardUniversity: [data.boardUniversity, [Validators.required]],
        institution: [data.institution, [Validators.required]],
        yearOfPassing: [data.yearOfPassing, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
        totalMarks: [data.totalMarks],
        marksObtaioned: [data.marksObtaioned]
      })
    } else {

      return this.fb.group({
        teacherId: this.tempTeacherId,
        teacherEducationalQualificationId: '',
        qualificationDegreeId: ["", [Validators.required]],
        qualificationDegreeMajorList: ["", [Validators.required]],
        qualificationDegreeMinorList: ["", [Validators.required]],
        boardUniversity: ["", [Validators.required]],
        institution: ["", [Validators.required]],
        yearOfPassing: ["", [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
        totalMarks: [""],
        marksObtaioned: [""]
      })
    }
  }
  acadProfQual() {
    return this.teacherForm.get("acadProfQual") as FormArray
  }
  removeAcadQual(val) {

    if (this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA' || this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES') {
      return
    } else {
      let deletedData = this.teacherForm.value.acadProfQual[val]
      this.acadProfQual().removeAt(val)

      this.outSideService.deteleEducationalQualification(deletedData.teacherEducationalQualificationId).subscribe((response) => {
        if (response.status == '1') {
          Swal.fire(
            'Record has been successfully deleted!',
            '',
            'success'
          )
        }
      })
    }
  }
  getAcdQualList() {

    this.acdQualList = [];
    (this.teacherForm.controls['acadProfQual'] as FormArray).clear();
    if (this.tempTeacherId) {
      this.outSideService.fetchAcdQual(this.tempTeacherId).subscribe((res) => {

        this.acdQualList = res.response;
        for (let i = 0; i < this.acdQualList.length; i++) {

          this.getSubjectByQualAll(this.acdQualList[i].qualificationDegreeId, 'A', i)
        }
      })
    } else {
    }

  }



  //Add and Remove Academic Qualification -- End

  //Add and Remove Academic Professional Form -- Start
  addProfQual(data) {
    this.profQual().push(this.newProfQual(data));
  }
  newProfQual(data) {
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        teacherProfessionalQualificationId: data.teacherProfessionalQualificationId,
        qualificationDegreeId: [data.qualificationDegreeId, [Validators.required]],
        qualificationDegreeMajorList: [data.qualificationDegreeMajorList, [Validators.required]],
        boardUniversity: [data.boardUniversity, [Validators.required]],
        institution: [data.institution, [Validators.required]],
        yearOfPassing: [data.yearOfPassing, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
        totalMarks: [data.totalMarks],
        marksObtaioned: [data.marksObtaioned]
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        teacherProfessionalQualificationId: '',
        qualificationDegreeId: ["", [Validators.required]],
        qualificationDegreeMajorList: ["", [Validators.required]],
        boardUniversity: ["", [Validators.required]],
        institution: ["", [Validators.required]],
        yearOfPassing: ["", [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
        totalMarks: [""],
        marksObtaioned: [""]
      })
    }
  }
  profQual() {
    return this.teacherForm.get("profQual") as FormArray
  }
  removeProfQual(val) {

    if (this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA' || this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES') {
      return
    } else {
      let deletedData = this.teacherForm.value.profQual[val]
      this.profQual().removeAt(val)

      this.outSideService.deleteProfessionalQualification(deletedData.teacherProfessionalQualificationId).subscribe((response) => {
        if (response.status == '1') {
          Swal.fire(
            'This record has been deleted !',
            '',
            'success'
          )
        }
      })
    }
  }
  getProfQualList() {

    this.profQualList = [];
    (this.teacherForm.controls['profQual'] as FormArray).clear();
    if (this.tempTeacherId) {
      this.outSideService.fetchProfQual(this.tempTeacherId).subscribe((res) => {

        this.profQualList = res.response;

        for (let i = 0; i < this.profQualList.length; i++) {
          this.getSubjectByQualAll(this.profQualList[i].qualificationDegreeId, 'P', i)
        }
      })
    } else {
    }

  }
  //Add and Remove Academic Professional Form -- End

  getStationByRegionIdWithCond(event) {
    // this.selectedUdiseCode = '';
    // this.stationList = []
    // var stationByInterCond = {
    //   "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTER",
    //   "conditionvalue": [this.responseData.teacherId, event.target.value, event.target.value, this.responseData.teacherId]
    // }

    const data = { "regionCode": event.target.value };

    this.outSideService.fetchStationByRegionId(data).subscribe((res) => {

      this.stationList = res.rowValue
      // alert(JSON.stringify(this.stationList));
    })
    console.log(this.stationList)
  }


  //Add and Remove Award Received Form --Start
  addawardReceived(data) {
    this.awardReceived().push(this.newawardReceived(data));
  }
  newawardReceived(data) {
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id: data.id,
        awardId: data.awardId,
        awardName: [data.awardName, [Validators.required]],
        awardYear: [data.awardYear, [Validators.required]],
        awardBy: [data.awardBy, [Validators.required]],
        remarks: [data.remarks]
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id: '',
        awardName: ["", [Validators.required]],
        awardId: ["", [Validators.required]],
        awardYear: ["", [Validators.required]],
        awardBy: ["", [Validators.required]],
        remarks: [""]
      })
    }
  }
  awardReceived() {
    return this.teacherForm.get("awardReceived") as FormArray
  }
  removeAwardReceived(val) {

    if (this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA' || this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES') {
      return
    } else {
      let deletedData = this.teacherForm.value.awardReceived[val]
      this.awardReceived().removeAt(val)

      this.outSideService.deleteAwards(deletedData.id).subscribe((response) => {
        if (response.status == '1') {
          Swal.fire(
            'This record has been deleted !',
            '',
            'success'
          )
        }
      })
    }
  }
  getAwardsByTchId() {
    this.awardsList = [];
    (this.teacherForm.controls['awardReceived'] as FormArray).clear();
    if (this.tempTeacherId) {
      this.outSideService.fetchAwardsByTchId(this.tempTeacherId).subscribe((res) => {
        this.awardsList = res.response;
        for (let i = 0; i < this.awardsList.length; i++) {
          this.addawardReceived(this.awardsList[i])
        }
      })
    } else {
    }

  }
  //Add and Remove Award Received Form --End

  //Training Received Form --Start
  addtrainingReceived(data) {
    this.trainingReceived().push(this.newtrainingReceived(data));


  }
  newtrainingReceived(data) {
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        place: [data.place, [Validators.required]],
        id: data.id,
        trainingOrganizedBy: [data.trainingOrganizedBy, [Validators.required]],
        trainingName: [data.trainingName, [Validators.required]],
        trainingYear: [data.trainingYear, [Validators.required]]
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        place: ["", [Validators.required]],
        id: '',
        trainingOrganizedBy: ["", [Validators.required]],
        trainingName: ["", [Validators.required]],
        trainingYear: ["", [Validators.required]]
      })
    }
  }
  trainingReceived() {
    return this.teacherForm.get("trainingReceived") as FormArray
  }
  removeTrainingReceived(val) {

    if (this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA' || this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES') {
      return
    } else {
      let deletedData = this.teacherForm.value.trainingReceived[val]
      this.trainingReceived().removeAt(val)

      this.outSideService.deleteTraning(deletedData.id).subscribe((response) => {
        if (response.status == '1') {
          Swal.fire(
            'This record has been deleted !',
            '',
            'success'
          )
        }
      })
    }
  }
  getTrainingByTchId() {
    this.awardsList = [];
    (this.teacherForm.controls['trainingReceived'] as FormArray).clear();
    if (this.tempTeacherId) {
      this.outSideService.fetchTrainingList(this.tempTeacherId).subscribe((res) => {
        this.trainingList = res.response;
        for (let i = 0; i < this.trainingList.length; i++) {
          this.addtrainingReceived(this.trainingList[i])
        }
      })
    } else {
    }

  }
  //Training Received Form --End


  //Class Taught and Subject -- Start
  addsubjectTaught(data) {
    this.subjectTaught().push(this.newsubjectTaught(data));


  }
  newsubjectTaught(data) {
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id: data.id,
        classTaught: [data.classTaught, [Validators.required]],
        subjectTaught: [data.subjectTaught, [Validators.required]],
        moiTaught: [data.moiTaught, [Validators.required]]
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id: '',
        classTaught: ["", [Validators.required]],
        subjectTaught: ["", [Validators.required]],
        moiTaught: ["", [Validators.required]]
      })
    }
  }
  subjectTaught() {
    return this.teacherForm.get("subjectTaught") as FormArray
  }
  removesubjectTaught(val) {
    if (this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA' || this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES') {
      return
    } else {
      this.subjectTaught().removeAt(val)
    }
  }

  genderValueConvt(event) {
    this.genderValueConvtFinal(event.target.value);
  }

  genderValueConvtFinal(val) {

    if (val == '1') {

      this.teacherForm.patchValue({
        profileForm: ({
          genderP: 'Male'
        })
      })

    } else if (val == '2') {
      this.teacherForm.patchValue({
        profileForm: ({
          genderP: 'Female'
        })
      })
    } else if (val == '3') {
      this.teacherForm.patchValue({
        profileForm: ({
          genderP: 'Others'
        })
      })
    }
  }

  getFlagStatus(tchId) {
    this.outSideService.getUpdatedFlag(tchId).subscribe((res) => {
      this.flagUpdatedList = res.response

    }, (error) => {

    })
  }

  // userIdCheck(event) {
  //   var userIdTemp = event.target.value;
  //   if (userIdTemp == JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name) {

  //   } else {
  //     this.changePaswordForm.patchValue({
  //       userId: ''
  //     })

  //     Swal.fire(
  //       'Incorrect User Id !',
  //       'Please re-enter again',
  //       'error'
  //     )
  //   }
  // }



  checkConfirmPassword(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      if (this.changePaswordForm.value.newPassword != control.value) {
        return { 'passwordNotSame': true }
      }
    }
    return null;
  }
  getStatus(tempTeacherId) {
    this.outSideService.getUpdatedFlag(tempTeacherId).subscribe((res) => {
      this.flagUpdatedList = res.response
    })
  }
  updateFinalStatus(data: any) {
    this.outSideService.updateFormStatusFlag(data).subscribe((res) => {
      this.flagUpdatedList = res.response
    })
  }
  onSubmitChangePassword() {
     
    var res = changePassword(this.user_name, this.changePaswordForm.value.oldPassword, this.changePaswordForm.value.newPassword, this.changePaswordForm.value.confirmPassword);

    console.log(res)
    if (res == "Password Changed successfully") {
      this.dialogRef.close();
    }
    Swal.fire(
      '',
      res,
    )
  }
  changeDateFormat(date: any){
    return moment(date).format('DD-MM-YYYY')
  }
  onSubmit(event: Event) {
    var activeButton = document.activeElement.id;
    if (activeButton == "submit1") {
      this.responseData.lastPromotionId = this.lastPromotionId;
      this.responseData.workExperienceIdPresentKv = this.workExpId;
      this.responseData.udiseSchoolName = this.schName;
      this.responseData.currentUdiseSchCode = this.udiseSchCode;
      this.responseData.teacherId = this.tempTeacherId;
      this.responseData.teacherDob = moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.dob).toString()))).format('YYYY-MM-DD');
      this.responseData.teacherEmail = this.teacherForm.value.profileForm.email;
      this.responseData.teacherEmployeeCode = this.teacherForm.value.profileForm.empCode;
      this.responseData.teacherGender = this.teacherForm.value.profileForm.gender;
      this.responseData.teacherMobile = this.teacherForm.value.profileForm.mobile;
      this.responseData.teacherName = this.teacherForm.value.profileForm.fullName;
      // this.responseData.teacherNationality = this.teacherForm.value.profileForm.nationality;
      this.responseData.teacherReligion = this.teacherForm.value.profileForm.religion;
      this.responseData.teacherSocialCategory = this.teacherForm.value.profileForm.socialCat;
      this.responseData.workExperienceAppointedForSubject = this.teacherForm.value.profileForm.presentSubjectName;
      this.responseData.workExperiencePositionTypePresentStationStartDate = moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.presentStationPostDate).toString()))).format('YYYY-MM-DD');
      this.responseData.workExperienceWorkStartDatePresentKv = moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.presentKvDate).toString()))).format('YYYY-MM-DD');
      this.responseData.lastPromotionPositionType = this.teacherForm.value.profileForm.presentPostName;
      this.responseData.lastPromotionPositionDate = moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.presentPostDate).toString()))).format('YYYY-MM-DD');
      this.responseData.teachingNonteaching = this.teacherForm.value.profileForm.staffType;
      //this.responseData.natureOfAppointment = this.teacherForm.value.profileForm.natureOfAptmnt;
      this.responseData.specialRecruitmentYn = this.teacherForm.value.profileForm.specialRecruitmentYn
      this.responseData.teacherSystemGeneratedCode = sessionStorage.getItem('systemTeacherCode');
      this.responseData.teacherAccountId = this.responseData.teacherAccountId;


      this.outSideService.saveSingleTeacher(this.responseData).subscribe((res) => {
        this.responseData = JSON.parse(JSON.stringify(res)).response;
        this.flagUpdatedList.form1Status = 'TI'
        this.flagUpdatedList.finalStatus = 'TI'
        sessionStorage.setItem('finalStatus', 'TI')
        this.formStatusLocale = 'TI'
        this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
          this.flagUpdatedList = res.response
        })

        sessionStorage.setItem('responseData', JSON.stringify(this.responseData))
        this.tempTeacherId = this.responseData.teacherId;
        this.workExpId = this.responseData.workExperienceIdPresentKv;
        this.lastPromotionId = this.responseData.lastPromotionId;
        // sessionStorage.setItem('workExpId', this.workExpId)
        Swal.fire(
          'Your Data has been saved Successfully!',
          '',
          'success'
        )
        this.getTchExpByTchId();
        this.nextClick(2)
      })
    } else if (activeButton == "submit2") {
      this.responseData.teacherDisabilityYn = this.teacherForm.value.disabilityForm.disabilityYN;
      this.responseData.teacherDisabilityType = this.teacherForm.value.disabilityForm.disabilityType;
      this.responseData.teacherDisabilityPrcnt = this.teacherForm.value.disabilityForm.disabilityPercentage;
      this.responseData.teacherDisabilityFromBirthYn = this.teacherForm.value.disabilityForm.disabilityFromBirthYN;
      this.responseData.teacherDisabilityDate = this.teacherForm.value.disabilityForm.disabilityDate;
      this.responseData.teacherDisabilityCertNumber = this.teacherForm.value.disabilityForm.disabilityCertNo;
      this.responseData.teacherDisabilityCertAuthority = this.teacherForm.value.disabilityForm.disabilityCertAuth;

      this.outSideService.saveSingleTeacher(this.responseData).subscribe((res) => {
        this.responseData = JSON.parse(JSON.stringify(res)).response;
        sessionStorage.setItem('responseData', JSON.stringify(this.responseData))
        this.tempTeacherId = this.responseData.teacherId;
        this.workExpId = this.responseData.workExperienceIdPresentKv;
        Swal.fire(
          'Your Data has been saved Successfully!',
          '',
          'success'
        )
        this.nextClick(2)
      })
    } else if (activeButton == "submit3") {
      debugger
      this.teacherForm.patchValue({
        profileForm: {
          dob: moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.dob).toString()))).format('YYYY-MM-DD'),
          presentStationPostDate :moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.presentStationPostDate).toString()))).format('YYYY-MM-DD'),
          presentKvDate : moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.presentKvDate).toString()))).format('YYYY-MM-DD'),
          presentPostDate: moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.presentPostDate).toString()))).format('YYYY-MM-DD')
        }
      })
      this.responseData.spouseName = this.teacherForm.value.personalInfoForm.spouseName
      this.teacherForm.patchValue({
        transferRelatedForm: {
          // spouseName:this.teacherForm.value.personalInfoForm.spouseName,
          spouseStationName: this.teacherForm.value.personalInfoForm.spouseStationName
        }
      });
       
      if (!this.teacherForm.value.personalInfoForm.spouseStationCode) {
        this.teacherForm.patchValue({
          personalInfoForm: {
            spouseStationCode: this.responseData.spouseStationCode,

          }
        })
      }
      if (this.teacherForm.value.personalInfoForm.disabilityYN == '1') {
        if (this.documentUploadArray[4].docName == 'Physically_Handicap_Certificate.pdf') {
          this.responseData.teacherDisabilityYn = this.teacherForm.value.personalInfoForm.disabilityYN;
          this.responseData.teacherDisabilityType = this.teacherForm.value.personalInfoForm.disabilityType;
          this.responseData.teacherDisabilityPrcnt = this.teacherForm.value.personalInfoForm.disabilityPercentage;
          this.responseData.teacherDisabilityFromBirthYn = this.teacherForm.value.personalInfoForm.disabilityFromBirthYN;
          this.responseData.teacherDisabilityDate = this.teacherForm.value.personalInfoForm.disabilityDate;
          this.responseData.teacherDisabilityCertNumber = this.teacherForm.value.personalInfoForm.disabilityCertNo;
          this.responseData.teacherDisabilityCertAuthority = this.teacherForm.value.personalInfoForm.disabilityCertAuth;
          // this.responseData.teacherBloodGroup = this.teacherForm.value.personalInfoForm.bloodGroup
          this.responseData.teacherCorrespondenceAddress = this.teacherForm.value.personalInfoForm.crspndncAddress
          this.responseData.teacherCorrespondenceDistrict = this.teacherForm.value.personalInfoForm.crspndncDistrict
          this.responseData.teacherCorrespondencePin = this.teacherForm.value.personalInfoForm.crspndncPinCode
          this.responseData.teacherCorrespondenceState = this.teacherForm.value.personalInfoForm.crspndncState
          this.responseData.maritalStatus = this.teacherForm.value.personalInfoForm.maritalStatusF;
          if (this.teacherForm.value.personalInfoForm.sameAbove == true) {
            this.responseData.teacherParmanentState = this.teacherForm.getRawValue().personalInfoForm.prmntState
          } else {
            this.responseData.teacherParmanentState = this.teacherForm.value.personalInfoForm.prmntState
          }
          if (this.teacherForm.value.personalInfoForm.sameAbove == true) {
            this.responseData.teacherPermanentAddress = this.teacherForm.getRawValue().personalInfoForm.prmntAddress
          } else {
            this.responseData.teacherPermanentAddress = this.teacherForm.value.personalInfoForm.prmntAddress
          }
          if (this.teacherForm.value.personalInfoForm.sameAbove == true) {
            this.responseData.teacherPermanentDistrict = this.teacherForm.getRawValue().personalInfoForm.prmntDistrict
          } else {
            this.responseData.teacherPermanentDistrict = this.teacherForm.value.personalInfoForm.prmntDistrict
          }
          if (this.teacherForm.value.personalInfoForm.sameAbove == true) {
            this.responseData.teacherPermanentPin = this.teacherForm.getRawValue().personalInfoForm.prmntPinCode
          } else {
            this.responseData.teacherPermanentPin = this.teacherForm.value.personalInfoForm.prmntPinCode
          }
          // this.responseData.teacherPanNumber = this.teacherForm.value.personalInfoForm.panNo
          this.responseData.teacherAadhaarNumber = this.teacherForm.value.personalInfoForm.aadhaarNo
          this.responseData.teacherPassportNumber = this.teacherForm.value.personalInfoForm.passportNo
          this.responseData.teacherPersonnelIdentification = this.teacherForm.value.personalInfoForm.personalIdNo


          this.responseData.spouseStatus = this.teacherForm.value.personalInfoForm.spouseStatusF
          this.responseData.spouseEmpCode = this.teacherForm.value.personalInfoForm.spouseEmpCode
          this.responseData.spouseName = this.teacherForm.value.personalInfoForm.spouseName
          this.responseData.spousePost = this.teacherForm.value.personalInfoForm.spousePost
          this.responseData.spouseStationCode = this.teacherForm.value.personalInfoForm.spouseStationCode
          this.responseData.spouseStationName = this.teacherForm.value.personalInfoForm.spouseStationName
          this.outSideService.saveSingleTeacher(this.responseData).subscribe((res) => {
            this.responseData = JSON.parse(JSON.stringify(res)).response;

            this.flagUpdatedList.form3Status = 'TI'
            this.flagUpdatedList.finalStatus = 'TI'
            sessionStorage.setItem('finalStatus', 'TI')
            this.formStatusLocale = 'TI'
            this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
              this.flagUpdatedList = res.response
            })

            sessionStorage.setItem('responseData', JSON.stringify(this.responseData))
            this.tempTeacherId = this.responseData.teacherId;

            Swal.fire(
              'Your Data has been saved Successfully!',
              '',
              'success'
            )
            this.nextClick(3)
          })
        } else {
          Swal.fire(
            'Please upload the PH Certificate!',
            '',
            'error'
          )
        }
      } else {
        this.responseData.teacherDisabilityYn = this.teacherForm.value.personalInfoForm.disabilityYN;
        this.responseData.teacherDisabilityType = this.teacherForm.value.personalInfoForm.disabilityType;
        this.responseData.teacherDisabilityPrcnt = this.teacherForm.value.personalInfoForm.disabilityPercentage;
        this.responseData.teacherDisabilityFromBirthYn = this.teacherForm.value.personalInfoForm.disabilityFromBirthYN;
        this.responseData.teacherDisabilityDate = this.teacherForm.value.personalInfoForm.disabilityDate;
        this.responseData.teacherDisabilityCertNumber = this.teacherForm.value.personalInfoForm.disabilityCertNo;
        this.responseData.teacherDisabilityCertAuthority = this.teacherForm.value.personalInfoForm.disabilityCertAuth;
        //this.responseData.teacherBloodGroup = this.teacherForm.value.personalInfoForm.bloodGroup
        this.responseData.teacherCorrespondenceAddress = this.teacherForm.value.personalInfoForm.crspndncAddress
        this.responseData.teacherCorrespondenceDistrict = this.teacherForm.value.personalInfoForm.crspndncDistrict
        this.responseData.teacherCorrespondencePin = this.teacherForm.value.personalInfoForm.crspndncPinCode
        this.responseData.maritalStatus = this.teacherForm.value.personalInfoForm.maritalStatusF;
        this.responseData.teacherCorrespondenceState = this.teacherForm.value.personalInfoForm.crspndncState
        if (this.teacherForm.value.personalInfoForm.sameAbove == true) {
          this.responseData.teacherParmanentState = this.teacherForm.getRawValue().personalInfoForm.prmntState
        } else {
          this.responseData.teacherParmanentState = this.teacherForm.value.personalInfoForm.prmntState
        }
        if (this.teacherForm.value.personalInfoForm.sameAbove == true) {
          this.responseData.teacherPermanentAddress = this.teacherForm.getRawValue().personalInfoForm.prmntAddress
        } else {
          this.responseData.teacherPermanentAddress = this.teacherForm.value.personalInfoForm.prmntAddress
        }
        if (this.teacherForm.value.personalInfoForm.sameAbove == true) {
          this.responseData.teacherPermanentDistrict = this.teacherForm.getRawValue().personalInfoForm.prmntDistrict
        } else {
          this.responseData.teacherPermanentDistrict = this.teacherForm.value.personalInfoForm.prmntDistrict
        }
        if (this.teacherForm.value.personalInfoForm.sameAbove == true) {
          this.responseData.teacherPermanentPin = this.teacherForm.getRawValue().personalInfoForm.prmntPinCode
        } else {
          this.responseData.teacherPermanentPin = this.teacherForm.value.personalInfoForm.prmntPinCode
        }
        // this.responseData.teacherPanNumber = this.teacherForm.value.personalInfoForm.panNo
        this.responseData.teacherAadhaarNumber = this.teacherForm.value.personalInfoForm.aadhaarNo
        this.responseData.teacherPassportNumber = this.teacherForm.value.personalInfoForm.passportNo
        this.responseData.teacherPersonnelIdentification = this.teacherForm.value.personalInfoForm.personalIdNo


        this.responseData.spouseStatus = this.teacherForm.value.personalInfoForm.spouseStatusF
        this.responseData.spouseEmpCode = this.teacherForm.value.personalInfoForm.spouseEmpCode
        this.responseData.spouseName = this.teacherForm.value.personalInfoForm.spouseName
        this.responseData.spousePost = this.teacherForm.value.personalInfoForm.spousePost
        this.responseData.spouseStationCode = this.teacherForm.value.personalInfoForm.spouseStationCode
        this.responseData.spouseStationName = this.teacherForm.value.personalInfoForm.spouseStationName
        this.outSideService.saveSingleTeacher(this.responseData).subscribe((res) => {
          this.responseData = JSON.parse(JSON.stringify(res)).response;

          this.flagUpdatedList.form3Status = 'TI'
          this.flagUpdatedList.finalStatus = 'TI'
          sessionStorage.setItem('finalStatus', 'TI')
          this.formStatusLocale = 'TI'
          this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
            this.flagUpdatedList = res.response
          })

          sessionStorage.setItem('responseData', JSON.stringify(this.responseData))
          this.tempTeacherId = this.responseData.teacherId;

          Swal.fire(
            'Your Data has been saved Successfully!',
            '',
            'success'
          )
          this.nextClick(3)
        })
      }


    } else if (activeButton == "submit33") {
       
      if (this.teacherForm.controls.profileForm.status == 'VALID') {
        if (this.teacherForm.controls.acadProfQual.status == 'VALID') {
          if (this.teacherForm.controls.profQual.status == 'VALID') {
            if (this.teacherForm.controls.awardReceived.status == 'VALID') {
              if (this.teacherForm.controls.trainingReceived.status == 'VALID') {
                if (this.teacherForm.controls.detailsOfPosting.status == 'VALID') {
                  if (this.teacherForm.value.personalInfoForm.disabilityYN == '1') {
                    for (let i = 0; i < this.documentUploadArray.length; i++) {
                      if (this.documentUploadArray[i].docName == 'Physically_Handicap_Certificate.pdf') {
                        this.flagUpdatedList.finalStatus = 'TA'
                        sessionStorage.setItem('finalStatus', 'TA')
                        this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
                          this.flagUpdatedList = res.response
                          this.formStatusLocale = 'TA'
                          Swal.fire(
                            'Your Data has been saved for verification!',
                            '',
                            'success'
                          )
                        })
                        const flagData = {
                          'teacherId': this.tempTeacherId,
                          'form1Status': this.flagUpdatedList.form1Status,
                          'form2Status': this.flagUpdatedList.form1Status,
                          'form3Status': this.flagUpdatedList.form1Status,
                          'form4Status': this.flagUpdatedList.form1Status,
                          'form5Status': this.flagUpdatedList.form1Status,
                          'form6Status': this.flagUpdatedList.form1Status,
                          'form7Status': this.flagUpdatedList.form1Status,
                          'finalStatus': 'TA',
                        }
                        this.outSideService.updateFlagByTeacherId(flagData).subscribe((res) => {
                        })
                      } else {
                        Swal.fire(
                          'Kindly upload PH Certificate !',
                          '',
                          'error'
                        )
                      }
                    }
                  } else {
                    this.flagUpdatedList.finalStatus = 'TA'
                    sessionStorage.setItem('finalStatus', 'TA')
                    this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
                      this.flagUpdatedList = res.response
                      this.formStatusLocale = 'TA';
                      Swal.fire(
                        'Your Data has been saved and sent for Verification!',
                        '',
                        'success'
                      )
                      const data = {
                        "teacherId": this.tempTeacherId,
                        "reportType": "2"
                      }
                      this.outSideService.sentReport(data).subscribe((res) => {
                        console.log(res)
                      })
                    })
                    const flagData = {
                      'teacherId': this.tempTeacherId,
                      'form1Status': this.flagUpdatedList.form1Status,
                      'form2Status': this.flagUpdatedList.form1Status,
                      'form3Status': this.flagUpdatedList.form1Status,
                      'form4Status': this.flagUpdatedList.form1Status,
                      'form5Status': this.flagUpdatedList.form1Status,
                      'form6Status': this.flagUpdatedList.form1Status,
                      'form7Status': this.flagUpdatedList.form1Status,
                      'finalStatus': 'TA',
                    }
                    this.outSideService.updateFlagByTeacherId(flagData).subscribe((res) => {
                    })
                  }
                } else {
                  Swal.fire(
                    'Kindly complete your Experience Profile!',
                    '',
                    'error'
                  )
                }
              } else {
                Swal.fire(
                  'Kindly complete your Training Profile!',
                  '',
                  'error'
                )
              }
            } else {
              Swal.fire(
                'Kindly complete your Award Profile!',
                '',
                'error'
              )
            }
          } else {
            Swal.fire(
              'Kindly complete your Qualification Profile!',
              '',
              'error'
            )
          }
        } else {
          Swal.fire(
            'Kindly complete your Qualification Profile!',
            '',
            'error'
          )
        }
      }
      else {
        Swal.fire(
          'Kindly complete your Basic Profile!',
          '',
          'error'
        )
      }
    } else if (activeButton == "submit4") {
       
      this.getStatus(this.tempTeacherId);
      this.teacherForm.patchValue({
        transferRelatedForm: {
          teacherId: this.tempTeacherId,
        }
      });
      if (this.responseData?.spouseStatus == null || this.responseData?.spouseStatus == '5' || this.responseData?.spouseStatus == '') {

        (this.teacherForm.get('transferRelatedForm') as FormGroup).get('spouseKvsYnD').disable();
        this.optionDisable = true;
        this.gkFilebenefit = false
        this.spouseKvsYnDradioButton = 0;
        this.teacherForm.patchValue({
          transferRelatedForm: {
            spouseKvsYnD: '0',

          }
        })
      }
      else {
        (this.teacherForm.get('transferRelatedForm') as FormGroup).get('spouseKvsYnD').enable();
        // this.optionDisable = false;
        // this.gkFilebenefit = true
        // this.spouseKvsYnDradioButton = 1;
        // this.teacherForm.patchValue({
        //   transferRelatedForm: {
        //     spouseKvsYnD: '1'
        //   }
        // })
      }
      this.outSideService.saveTransProfile(this.teacherForm.value.transferRelatedForm).subscribe((res) => {
        if (res.status == 1) {
          this.transferRelatedFormTempId = res.response.id
          this.responseStatus = res.status

          // this.teacherForm.value.transferRelatedForm.i
          this.teacherForm.patchValue({
            declarationRelatedForm: {
              id: this.transferRelatedFormTempId,
            }
          })

          this.flagUpdatedList.form4Status = 'TI'
          this.flagUpdatedList.finalStatus = 'TI'
          this.updateFinalStatus(this.flagUpdatedList);


          Swal.fire(
            'Your Data has been saved Successfully!',
            '',
            'success'
          )
          this.nextClick(5)
        } else if (this.responseStatus == '0') {
          Swal.fire(
            this.responseStatus.message
          )
        }

      })

    } else if (activeButton == "submit5") {

       
      this.getStatus(this.tempTeacherId);
      this.teacherForm.patchValue({
        transferRelatedForm: {
          teacherId: this.tempTeacherId,
        }
      });
      if (this.teacherForm.value.transferRelatedForm.absenceDaysOne == '' || this.teacherForm.value.transferRelatedForm.absenceDaysOne == null) {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            absenceDaysOne: 0,
          }
        });
      }
      this.outSideService.saveTransProfile(this.teacherForm.value.transferRelatedForm).subscribe((res) => {
        if (res.status == 1) {
          this.transferRelatedFormTempId = res.response.id
          // this.teacherForm.value.transferRelatedForm.i
          this.teacherForm.patchValue({
            declarationRelatedForm: {
              id: this.transferRelatedFormTempId,
            }
          })
          this.teacherForm.patchValue({
            transferRelatedForm: {
              id: this.transferRelatedFormTempId,
            }
          })

          this.flagUpdatedList.form4Status = 'TI'
          this.flagUpdatedList.finalStatus = 'TI'
          this.updateFinalStatus(this.flagUpdatedList);

          this.onVerifyClick();

          Swal.fire(
            'Your Data has been saved Successfully!',
            '',
            'success'
          )
          this.getDocumentByTeacherId();
          this.nextClick(5)
        } else if (this.responseStatus == '0') {
          Swal.fire(
            this.responseStatus.message
          )
        }
      })
    } else if (activeButton == "submit6") {
      this.teacherForm.patchValue({
        profileForm: {
          dob: moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.dob).toString()))).format('YYYY-MM-DD'),
          presentStationPostDate :moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.presentStationPostDate).toString()))).format('YYYY-MM-DD'),
          presentKvDate : moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.presentKvDate).toString()))).format('YYYY-MM-DD'),
          presentPostDate: moment(JSON.parse(JSON.stringify((this.teacherForm.value.profileForm.presentPostDate).toString()))).format('YYYY-MM-DD')
        }
      })
       
      for (let i = 0; i < this.teacherForm.value.detailsOfPosting.length; i++) {
        ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('workStartDate').enable();
        ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('positionType').enable();
        ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('appointedForSubject').enable();
        this.teacherForm.value.detailsOfPosting[i].teacherId = this.tempTeacherId
        if (this.teacherForm.value.detailsOfPosting[i].workExperienceId == this.workExpId) {
          this.teacherForm.value.detailsOfPosting[i].currentlyActiveYn = '1';
        } else {
          this.teacherForm.value.detailsOfPosting[i].currentlyActiveYn = '0';
        }
      }
      for (let i = 0; i < this.teacherForm.value.promotionDetails.length; i++) {
        this.teacherForm.value.promotionDetails[i].teacherId = this.tempTeacherId
      }


      if (this.responseData?.spouseStatus == null || this.responseData?.spouseStatus == '5' || this.responseData?.spouseStatus == '') {

        (this.teacherForm.get('transferRelatedForm') as FormGroup).get('spouseKvsYnD').disable();
        this.optionDisable = true;
        this.gkFilebenefit = false
        this.spouseKvsYnDradioButton = 0;
        this.teacherForm.patchValue({
          transferRelatedForm: {
            spouseKvsYnD: '0',

          }
        })
      }
      else {
        (this.teacherForm.get('transferRelatedForm') as FormGroup).get('spouseKvsYnD').enable();
        // this.optionDisable = false;
        // this.gkFilebenefit = true
        // this.spouseKvsYnDradioButton = 1;
        // this.teacherForm.patchValue({
        //   transferRelatedForm: {
        //     spouseKvsYnD: '1'
        //   }
        // })
      }
      if (this.teacherForm.controls.detailsOfPosting.status == 'VALID') {
        this.outSideService.saveTchExperience(this.teacherForm.value.detailsOfPosting).subscribe((res) => {

          var responsePosting = res.status;
          if (responsePosting == '1') {
            this.onVerifyClick();
            Swal.fire(
              'Your Data has been saved Successfully!',
              '',
              'success'
            )
            this.nextClick(4)
            this.flagUpdatedList.form1Status = 'TI'
            this.flagUpdatedList.finalStatus = 'TI'
            sessionStorage.setItem('finalStatus', 'TI')
            this.formStatusLocale = 'TI'
            this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {

              this.flagUpdatedList = res.response
            })

            this.getTchExpByTchId();
          } else if (responsePosting == '0') {
            Swal.fire(
              res.message
            )
          }
        })
        this.outSideService.savePromotion(this.teacherForm.value.promotionDetails).subscribe((res) => {
        })
      } else {
        ((this.teacherForm.get('detailsOfPosting') as FormArray).at(0) as FormGroup).get('workStartDate').disable();
        ((this.teacherForm.get('detailsOfPosting') as FormArray).at(0) as FormGroup).get('positionType').disable();
        ((this.teacherForm.get('detailsOfPosting') as FormArray).at(0) as FormGroup).get('appointedForSubject').disable();
        Swal.fire(
          'Please enter the required data!',
          '',
          'error'
        )

      }
    }
  }

  onCorrectionFormSubmit() {

    this.outSideService.saveCorrectionFormProfile(this.correctionProfile.value).subscribe((res) => {

    })
  }

  onSpouseClick(event) {
    this.spouseValueConvt(event.target.value)
    if (event.target.value == '1') {
      this.spouseNone = true;
      this.spouseKVSStation = true;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
        }
      });

    } else if (event.target.value == '2') {
      this.spouseNone = true;
      this.spouseKVSStation = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
        }
      });
    } else if (event.target.value == '3') {
      this.spouseNone = true;
      this.spouseKVSStation = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
        }
      });
    } else if (event.target.value == '5') {
      this.spouseNone = false;
      this.spouseKVSStation = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
        }
      });
    }
  }

  spouseValueConvt(val) {
     
    if (val == '1') {
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStatusKVS: 'Yes',
          spouseStatusCentral: 'No',
          spouseStatusState: 'No',
          spouseStatusNone: 'No'
        }
      })
    } else if (val == '2') {
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStatusKVS: 'No',
          spouseStatusCentral: 'Yes',
          spouseStatusState: 'No',
          spouseStatusNone: 'No'
        }
      })
    } else if (val == '3') {
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStatusKVS: 'No',
          spouseStatusCentral: 'No',
          spouseStatusState: 'Yes',
          spouseStatusNone: 'No'
        }
      })
    } else if (val == '5') {
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStatusKVS: 'No',
          spouseStatusCentral: 'No',
          spouseStatusState: 'No',
          spouseStatusNone: 'Yes'
        }
      })

      // this.teacherForm.value.transferRelatedForm.get('spouseKvsYnD') .disable();
      // this.teacherForm.value.transferRelatedForm.spouseKvsYnD


    }
  }

  maritalStatusCheck(event) {

    if (event.target.value == '1') {
      this.responseData.maritalStatus = '1'
      this.responseData.spouseStatus = '5'
      this.marriedStatusYN = true;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
        }
      })

    } else if (event.target.value == '7') {
      this.responseData.maritalStatus = '7'
      this.responseData.spouseStatus = '5'
      this.marriedStatusYN = false;
      this.spouseKVSStation = false;
      this.spouseNone = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
        }
      })

    } else if (event.target.value == '4') {
      this.responseData.maritalStatus = '4'
      this.responseData.spouseStatus = '5'
      this.marriedStatusYN = false;
      this.spouseKVSStation = false;
      this.spouseNone = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
        }
      })



      if (this.teacherForm.value.profileForm.gender == '2') {
        this.responseData.spouseStatus = '4'
        this.teacherForm.patchValue({
          personalInfoForm: {
            spouseStationName: '',
            spousePost: '',
            spouseStationCode: '',
            spouseName: '',
            spouseEmpCode: '',
            spouseStatusF: '4'
          }
        })
      }

    }
  }



  // ---------------------------------------  new change code start here--------------------------

  stationCoice(val) {

    if (val == '3') {

      this.showStationChoice18C = true;
      // this.showStationChoice18B = false;


    } else if (val == '0') {
      // this.showStationChoice18B = false;
      this.showStationChoice18C = false;
      this.teacherForm.patchValue({
        transferRelatedForm: {
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

        }
      })

    }
  }
  getTransferProfile() {

    const data = { "teacherId": this.tempTeacherId }
     
    //alert(data)
    this.outSideService.getTransferData(data).subscribe((res) => {
      this.patientAilmentData = res.response.patientAilment
      this.medicalCertificateIssueDateData = this.date.transform(res.response.medicalCertificateIssueDate, 'yyyy-MM-dd');
      this.singleParentGroundData = res.response.singleParentGround
      this.singleParentCertificateIssueDateData = this.date.transform(res.response.singleParentCertificateIssueDate, 'yyyy-MM-dd');
      this.deathOfFamilyGroundData = res.response.deathOfFamilyGround;
      this.careGiverRelationData = res.response.careGiverRelation;
      this.relationWithEmplMdgData = res.response.relationWithEmplMdg
      this.deathCertificateIssueDateData = this.date.transform(res.response.deathCertificateIssueDate, 'yyyy-MM-dd');

      this.teacherForm.patchValue({
        transferRelatedForm: {
          id: res.response.id,
          teacherId: res.response.teacherId,
          applyTransferYn: res.response.applyTransferYn,
          disciplinaryYn: res.response.disciplinaryYn,
          absenceDaysOne: res.response.absenceDaysOne,
          positionOfNjcmRjcm: res.response.positionOfNjcmRjcm,
          nameOfFamilyMember: res.response.nameOfFamilyMember,
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
          spouseKvsYnD: res.response.spouseKvsYnD,
          surveHardYn: res.response.surveHardYn,
          childDifferentAbleYnD: res.response.childDifferentAbleYnD,
          careGiverFaimlyYnD: res.response.careGiverFaimlyYnD,
          careGiverYnD: res.response.careGiverYnD,
          personalStatusMdgD: res.response.personalStatusMdgD,
          personalStatusDfpD: res.response.personalStatusDfpD,
          personalStatusSpD: res.response.personalStatusSpD,
          memberJCM: res.response.memberJCM,
          //spouseEmpCode:res.response.spouseEmpCode,
          //spouseStationName:res.response.spouseStationName,
          //spousePost:res.response.spousePost,
          spouseStation: res.response.spouseStation,
          patientName: res.response.patientName,
          patientAilment: res.response.patientAilment,
          patientHospital: res.response.patientHospital,
          patientMedicalOfficerName: res.response.patientMedicalOfficerName,
          patientMedicalOfficerDesignation: res.response.patientMedicalOfficerDesignation,
          careGiverName: res.response.careGiverName,
          careGiverRelation: res.response.careGiverRelation,
          careGiverDisabilityName: res.response.careGiverDisabilityName,
          careGiverDisabilityPrcnt: res.response.careGiverDisabilityPrcnt,
          childDifferentName: res.response.childDifferentName,
          childDifferentDisabilityName: res.response.childDifferentDisabilityName,
          childDifferentDisabilityPrcnt: res.response.childDifferentDisabilityPrcnt,

        },

      })
      // ----------------------------- emp transfer radio button start  here ------------------------------------
      this.empTransferradioButton = this.teacherForm.value.transferRelatedForm.applyTransferYn
      if (this.empTransferradioButton == 3) {
        this.showStationChoice18C = true
      }
      if (this.empTransferradioButton == 0) {
        this.showStationChoice18C = false
      }

      // ---------------------------- end here--------------------------------------------------------------------

      // ---------------------------  declairation from radio button start  here ---------------------------------
      console.log(this.teacherForm.value.transferRelatedForm.spouseKvsYnD)
      ////////////////////////   spouse  //////////////////////////
      if (this.teacherForm.value.transferRelatedForm.spouseKvsYnD == 1) {
        this.spouseKvsYnDradioButton = 1;
        this.gkFilebenefit = true

      }
      if (this.teacherForm.value.transferRelatedForm.spouseKvsYnD == '' || this.teacherForm.value.transferRelatedForm.spouseKvsYnD == null) {
        this.spouseKvsYnDradioButton = 0;
        this.gkFilebenefit = false

      }
      if (this.teacherForm.value.transferRelatedForm.spouseKvsYnD == 0) {
        this.spouseKvsYnDradioButton = 0;
        this.gkFilebenefit = false
      }
      /////////////////////////  personalStatusMdgD //////////////////////
      if (this.teacherForm.value.transferRelatedForm.personalStatusMdgD == 1) {
        this.personalStatusMdgDradioButton = 1;
        this.gkFilemMedical = true
      }
      if (this.teacherForm.value.transferRelatedForm.personalStatusMdgD == '' || this.teacherForm.value.transferRelatedForm.personalStatusMdgD == null) {
        this.personalStatusMdgDradioButton = 0;
        this.gkFilemMedical = false
      }
      if (this.teacherForm.value.transferRelatedForm.personalStatusMdgD == 0) {
        this.personalStatusMdgDradioButton = 0;
        this.gkFilemMedical = false
      }
      //////////////// careGiverFaimlyYnD ///////////////////////////////////

      if (this.teacherForm.value.transferRelatedForm.careGiverFaimlyYnD == 1) {
        this.careGiverFaimlyYnDradioButton = 1;
        this.careGiver = true
      }
      if (this.teacherForm.value.transferRelatedForm.careGiverFaimlyYnD == '' || this.teacherForm.value.transferRelatedForm.careGiverFaimlyYnD == null) {
        this.careGiverFaimlyYnDradioButton = 0;
        this.careGiver = false
      }
      if (this.teacherForm.value.transferRelatedForm.careGiverFaimlyYnD == 0) {
        this.careGiverFaimlyYnDradioButton = 0;
        this.careGiver = false
      }
      /////////////////////////// careGiverYnD ////////////////////////
      if (this.teacherForm.value.transferRelatedForm.careGiverYnD == 1) {
        this.childDifferentAbleYnDradioButton = 1;
        this.abledChild = true
      }
      if (this.teacherForm.value.transferRelatedForm.careGiverYnD == '' || this.teacherForm.value.transferRelatedForm.careGiverYnD == null) {
        this.childDifferentAbleYnDradioButton = 0;
        this.abledChild = false
      }
      if (this.teacherForm.value.transferRelatedForm.careGiverYnD == 0) {
        this.childDifferentAbleYnDradioButton = 0;
        this.abledChild = false
      }
      //////////////////////////// personalStatusDfpD  ////////////////////
      if (this.teacherForm.value.transferRelatedForm.personalStatusDfpD == 1) {
        this.personalStatusDfpDradioButton = 1;
        this.dfpGround = true
      }
      if (this.teacherForm.value.transferRelatedForm.personalStatusDfpD == 0) {
        this.personalStatusDfpDradioButton = 0;
        this.dfpGround = false
      }
      if (this.teacherForm.value.transferRelatedForm.personalStatusDfpD == '' || this.teacherForm.value.transferRelatedForm.personalStatusDfpD == null) {
        this.personalStatusDfpDradioButton = 0;
        this.dfpGround = false
      }
      //////////////////////////// personalStatusSpD //////////////////////
      if (this.teacherForm.value.transferRelatedForm.personalStatusSpD == 1) {
        this.personalStatusSpDradioButton = 1;
        this.spGround = true
      }
      if (this.teacherForm.value.transferRelatedForm.personalStatusSpD == '' || this.teacherForm.value.transferRelatedForm.personalStatusSpD == null || this.teacherForm.value.transferRelatedForm.personalStatusSpD == 'undefined') {
        //(this.teacherForm.get('transferRelatedForm') as FormGroup).get('personalStatusSpD').disable(); 
        this.teacherForm.patchValue({
          transferRelatedForm: {
            personalStatusSpD: '0',
          }
        })
        this.personalStatusSpDradioButton = 0;
        this.spGround = false
      }
      if (this.teacherForm.value.transferRelatedForm.personalStatusSpD == 0) {
        // (this.teacherForm.get('transferRelatedForm') as FormGroup).get('personalStatusSpD').disable(); 
        // this.teacherForm.patchValue({
        //   transferRelatedForm: { 
        //     personalStatusSpD: '0',
        //   }
        // })
        this.personalStatusSpDradioButton = 0;
        this.spGround = false
      }
      //////////////// childDifferentAbleYnD ////////////
      if (this.teacherForm.value.transferRelatedForm.childDifferentAbleYnD == 1) {
        this.childDifferentAbleYnDradioButton = 1;
        this.abledChild = true
      }
      if (this.teacherForm.value.transferRelatedForm.childDifferentAbleYnD == '' || this.teacherForm.value.transferRelatedForm.childDifferentAbleYnD == null) {
        this.childDifferentAbleYnDradioButton = 0;
        this.abledChild = false
      }
      if (this.teacherForm.value.transferRelatedForm.childDifferentAbleYnD == 0) {
        this.childDifferentAbleYnDradioButton = 0;
        this.abledChild = false
      }

      /////////////////////////  memberJCM  ///////////////////////////
      if (this.teacherForm.value.transferRelatedForm.memberJCM == 1) {
        this.inlineRadio13radioButton = 1;
        this.positionHeld = true
        // this.abledChild=true
      }
      if (this.teacherForm.value.transferRelatedForm.memberJCM == 2) {
        this.inlineRadio13radioButton = 2;
        this.positionHeld = true
      }
      if (this.teacherForm.value.transferRelatedForm.memberJCM == '' || this.teacherForm.value.transferRelatedForm.memberJCM == null) {
        this.inlineRadio13radioButton = 0;
        this.positionHeld = false
        this.teacherForm.patchValue({
          transferRelatedForm: {
            memberJCM: '0',
          }
        })
        //this.abledChild=false
      }
      if (this.teacherForm.value.transferRelatedForm.memberJCM == 0) {
        this.positionHeld = false
        this.inlineRadio13radioButton = 0;
        //this.abledChild=false
      }
       
      if (this.teacherForm.value.transferRelatedForm.disciplinaryYn == 1) {
        this.disciplinaryYnradioButton = 1;
      }
      if (this.teacherForm.value.transferRelatedForm.disciplinaryYn == '' || this.teacherForm.value.transferRelatedForm.disciplinaryYn == null) {
        this.disciplinaryYnradioButton = 0;
      }

      if (this.teacherForm.value.transferRelatedForm.disciplinaryYn == 0) {
        this.disciplinaryYnradioButton = 0;
      }
      if (this.teacherForm.value.transferRelatedForm.surveHardYn == 1) {
        this.surveHardYnradioButton = 1;
      }
      if (this.teacherForm.value.transferRelatedForm.surveHardYn == '' || this.teacherForm.value.transferRelatedForm.surveHardYn == null) {
        this.surveHardYnradioButton = 0;
      }
      if (this.teacherForm.value.transferRelatedForm.surveHardYn == 0) {
        this.surveHardYnradioButton = 0;
      }
      // if(this.teacherForm.value.transferRelatedForm.childDifferentAbleYnD==0)
      // {
      //   this.disciplinaryYnradioButton=1;
      // }
      this.teacherForm.patchValue({
        transferRelatedForm: {
          spouseStationName: this.responseData.spouseStationName,

        }
      })
      // if (this.responseData.spouseStatus == null || this.responseData.spouseStatus == '5' || this.responseData.spouseStatus == '' || this.teacherForm.value.transferRelatedForm.spouseKvsYnD ==0) {

      //   (this.teacherForm.get('transferRelatedForm') as FormGroup).get('spouseKvsYnD').disable();
      //   this.optionDisable = true;
      //   this.gkFilebenefit = false
      //   this.spouseKvsYnDradioButton = 0;
      //   this.teacherForm.patchValue({
      //     transferRelatedForm: {
      //       spouseKvsYnD: '0',

      //     }
      //   })
      // }
      // else {
      //   (this.teacherForm.get('transferRelatedForm') as FormGroup).get('spouseKvsYnD').enable();
      //   this.optionDisable = false;
      //   this.gkFilebenefit = true
      //   this.spouseKvsYnDradioButton = 1;
      //   this.teacherForm.patchValue({
      //     transferRelatedForm: {
      //       spouseKvsYnD: '1'
      //     }
      //   })
      // }
      // --------------------------- end here --------------------------------------------------------------------
    })

  }

  checkRjcmNjcm(val: any) {
    if (val == 'show') {
      this.positionHeld = true
    } else {
      this.positionHeld = false
    }
  }
  //----------------------------------------------- Start New Function declarationRelatedForm add Here---------------------
  declarationtransferRelated1(event) {
    if (event.target.value == '1') {
      this.gkFilebenefit = true;
    } else if (event.target.value == '0') {
      this.gkFilebenefit = false;
    }
  }

  declarationtransferRelated2(event) {
    if (event.target.value == '1') {
      this.gkFilemMedical = true;
    } else if (event.target.value == '0') {
      this.gkFilemMedical = false;
    }
  }

  declarationtransferRelated6(event) {
    if (event.target.value == '1') {
      this.spGround = true;
    } else if (event.target.value == '0') {
      this.spGround = false;
    }
  }
  declarationtransferRelated7(event) {
    if (event.target.value == '1') {
      this.dfpGround = true;
    } else if (event.target.value == '0') {
      this.dfpGround = false;
    }
  }

  declarationtransferRelated4(event) {
    if (event.target.value == '1') {
      this.teacherForm.patchValue({
        declarationRelatedForm: {
          careGiverYnD: '1'
        }
      })
      this.careGiver = true;
    } else if (event.target.value == '0') {
      this.teacherForm.patchValue({
        declarationRelatedForm: {
          careGiverYnD: '0'
        }
      })
      this.careGiver = false;
    }
  }
  declarationtransferRelated5(event) {
    if (event.target.value == '1') {

      this.teacherForm.patchValue({
        declarationRelatedForm: {
          childDifferentAbleYnD: '1'
        }
      })
      this.abledChild = true;
    } else if (event.target.value == '0') {
      this.abledChild = false;
      this.teacherForm.patchValue({
        declarationRelatedForm: {
          childDifferentAbleYnD: '0'
        }
      })
    }
  }

  fileToRelatedFormUpload: File | null = null;
  handledeclarationRelatedFormFileInput(files: FileList, index) {
    var data = files.item(0).name
    var splitted = data.split('.', 2)
    if (splitted[1] == 'pdf' || splitted[1] == 'PDF') {
      if (files.item(0).size <= 512000) {
        this.fileToRelatedFormUpload = files.item(0);
        if (index == '0') {
          this.fileUpgkFilemMedical = true;
          this.enableUploadButtonRelatedForm0 = false;
        } else if (index == '1') {
          this.enableUploadButtonRelatedForm1 = false;
        } else if (index == '2') {
          this.fileUpcareGiver = true;
          this.enableUploadButtonRelatedForm2 = false;
        } else if (index == '3') {
          this.enableUploadButtonRelatedForm3 = false;
        } else if (index == '5') {
          this.fileUpgkFilebenefit = true;
          this.enableUploadButtonRelatedForm5 = false;
        } else if (index == '6') {
          this.fileUpspGround = true;
          this.enableUploadButtonRelatedForm6 = false;
        } else if (index == '7') {
          this.fileUpdfpGround = true;
          this.enableUploadButtonRelatedForm7 = false;
        } else if (index == '8') {
          this.fileUppositionHeld = true;
          this.enableUploadButtonRelatedForm8 = false;
        }
      } else {
        this.fileToRelatedFormUpload = null;
        Swal.fire(
          'File size allowed upto 500KB only !',
          '',
          'error'
        )
        if (index == '0') {
          this.fileUpgkFilemMedical = false;
          this.enableUploadButtonRelatedForm0 = true;
        } else if (index == '1') {
          this.enableUploadButtonRelatedForm1 = true;
        } else if (index == '2') {
          this.fileUpcareGiver = false;
          this.enableUploadButtonRelatedForm2 = true;
        } else if (index == '3') {
          this.enableUploadButtonRelatedForm3 = true;
        } else if (index == '5') {
          this.fileUpgkFilebenefit = false;
          this.enableUploadButtonRelatedForm5 = true;
        } else if (index == '6') {
          this.fileUpspGround = false;
          this.enableUploadButtonRelatedForm6 = true;
        } else if (index == '7') {
          this.fileUpdfpGround = false;
          this.enableUploadButtonRelatedForm7 = true;
        } else if (index == '8') {
          this.fileUppositionHeld = false;
          this.enableUploadButtonRelatedForm8 = true;
        }
      }
    } else {
      this.fileToRelatedFormUpload = null;
      Swal.fire(
        'Only PDF file can be uploaded',
        '',
        'error'
      )
      if (index == '0') {
        this.fileUpgkFilemMedical = false;
        this.enableUploadButtonRelatedForm0 = true;
      } else if (index == '1') {
        this.enableUploadButtonRelatedForm1 = true;
      } else if (index == '2') {
        this.fileUpcareGiver = false;
        this.enableUploadButtonRelatedForm2 = true;
      } else if (index == '3') {
        this.enableUploadButtonRelatedForm3 = true;
      } else if (index == '5') {
        this.fileUpgkFilebenefit = false;
        this.enableUploadButtonRelatedForm5 = true;
      } else if (index == '6') {
        this.fileUpspGround = false;
        this.enableUploadButtonRelatedForm6 = true;
      } else if (index == '7') {
        this.fileUpdfpGround = false;
        this.enableUploadButtonRelatedForm7 = true;
      } else if (index == '8') {
        this.fileUppositionHeld = false;
        this.enableUploadButtonRelatedForm8 = true;
      }
    }
  }
  setSchoolType(event) {
     ;
    this.selectStationName = ''
    //HQ
    if (event.target.value == '4') {
      this.regionShow = false
      this.schoolShow = false
      this.zoneShow = false;
      this.headQuaterShow = true
      this.selectHeadQuaterZoneRegion = true
      this.showSchoolType = false;
    }
    //zone
    else if (event.target.value == '2') {
      this.regionShow = false
      this.stationShow = false
      this.schoolShow = false
      this.zoneShow = true;
      this.headQuaterShow = false
      this.showSchoolType = false;
      this.selectHeadQuaterZoneRegion = true
    }
    //region
    else if (event.target.value == '3') {
      this.regionShow = true
      this.stationShow = false
      this.schoolShow = false
      this.zoneShow = false;
      this.headQuaterShow = false
      this.selectHeadQuaterZoneRegion = true
      this.showSchoolType = false;
    }
    //school
    else if (event.target.value == '1') {
      this.regionShow = false
      this.stationShow = false
      this.schoolShow = false
      this.zoneShow = false;
      this.headQuaterShow = false;
      this.selectHeadQuaterZoneRegion = false;
      this.showSchoolType = true;
    }
    else if (event.target.value == '5') {
       
      this.regionShow = false
      this.schoolShow = false
      this.stationShow = false
      this.zoneShow = false;
      this.headQuaterShow = false
      this.selectHeadQuaterZoneRegion = false;
      this.showSchoolType = false;
    }
    this.selectedSchoolType = event.target.value;

    const data: any = {
      "extcall": "MOE_EXT_GET_HQ_REG_ZN",
      "conditionvalue": [event.target.value]
    }
    this.getMaster(data, event.target.value);
  }
  getMaster(data, schoolType) {
    this.selectSchoolType = schoolType;
    this.outSideService.getMasterData(data).subscribe((res: any) => {
      if (schoolType == 4) {
        this.headQuaterList = res.response.rowValue;
      }
      else if (schoolType == 2) {
        this.zoneList = res.response.rowValue;
      } else if (schoolType == 3) {
        this.selectRegionList = res.response.rowValue;
      }

      console.log(this.selectRegionList)
    })
  }
  
  getStationByHqId(id: any) {
     console.log(id.target.value);
    this.selectStationName = '';
    if (this.selectSchoolType == 4) {
      for (let i = 0; i < this.headQuaterList.length; i++) {
        if (this.headQuaterList[i].kv_code == id.target.value) {
          this.selectedKvCode = this.headQuaterList[i].kv_code
          this.selectedKvname = this.headQuaterList[i].kv_name
          this.selectStationName = this.headQuaterList[i].station_name
        }
      }
    }
    else if (this.selectSchoolType == 2) {
      for (let i = 0; i < this.zoneList.length; i++) {
        if (this.zoneList[i].kv_code == id.target.value) {
          this.selectedKvCode = this.zoneList[i].kv_code
          this.selectedKvname = this.zoneList[i].kv_name
          this.selectStationName = this.zoneList[i].station_name
        }
      }
    }
    else if (this.selectSchoolType == 3) {
      for (let i = 0; i < this.selectRegionList.length; i++) {
         
        if (this.selectRegionList[i].kv_code == id.target.value) {
          this.selectedKvCode = this.selectRegionList[i].kv_code
          this.selectedKvname = this.selectRegionList[i].kv_name
          this.selectStationName = this.selectRegionList[i].station_name
        }
      }
    }
    console.log(this.selectedKvCode, this.selectedKvname)
  }
  documentUploadRelatedForm(index) {
    const formData = new FormData();
    if (this.fileToRelatedFormUpload != null) {
      formData.append('teacherId', this.responseData.teacherId);
      formData.append('file', this.fileToRelatedFormUpload);
      if (index == 0) {
        this.fileUpgkFilemMedical = true;
        formData.append('filename', "Medical_Certificate");
      } else if (index == 1) {
        formData.append('filename', "Board_examination_Proof");
      } else if (index == 2) {
        this.fileUpcareGiver = true;
        formData.append('filename', "Disability_Certificate");
      } else if (index == 3) {
        formData.append('filename', "Differentially_Abled_Certificate");
      } else if (index == 5) {
        this.fileUpgkFilebenefit = true;
        formData.append('filename', "Spouse_Declaration");
      } else if (index == 6) {
        this.fileUpspGround = true;
        formData.append('filename', "Single_Parent_Declaration");
      } else if (index == 7) {
        this.fileUpdfpGround = true;
        formData.append('filename', "DFP_Declaration");
      } else if (index == 8) {
        this.fileUppositionHeld = true;
        formData.append('filename', "NJCM_RJCM_Declaration");
      }

      this.outSideService.uploadDocument(formData).subscribe((res) => {
        this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
          this.documentUploadArray = res;
          for (let i = 0; i < res.length; i++) {

            if (res[i].docName == 'Medical_Certificate.pdf') {
              this.fileUpgkFilemMedical = false;
              this.deleteDeclairaionFormDocUpdate0 = false;
            }
            if (res[i].docName == 'Board_examination_Proof.pdf') {
              this.deleteDeclairaionFormDocUpdate1 = false;
            }
            if (res[i].docName == 'Disability_Certificate.pdf') {
              this.fileUpcareGiver = false;
              this.deleteDeclairaionFormDocUpdate2 = false;
            }
            if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
              this.deleteDeclairaionFormDocUpdate3 = false;
            }
            if (res[i].docName == 'Spouse_Declaration.pdf') {
              this.fileUpgkFilebenefit = false;
              this.deleteDeclairaionFormDocUpdate5 = false;
            }
            if (res[i].docName == 'Single_Parent_Declaration.pdf') {
              this.fileUpspGround = false;
              this.deleteDeclairaionFormDocUpdate6 = false;
            }
            if (res[i].docName == 'DFP_Declaration.pdf') {
              this.fileUpdfpGround = false;
              this.deleteDeclairaionFormDocUpdate7 = false;
            }
            if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
              this.fileUppositionHeld = false;
              this.deleteDeclairaionFormDocUpdate8 = false;
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
          this.deleteDeclairaionFormDocUpdate0 = false
        } else if (index == 1) {
          this.deleteDeclairaionFormDocUpdate1 = false
        } else if (index == 2) {
          this.deleteDeclairaionFormDocUpdate2 = false
        } else if (index == 3) {
          this.deleteDeclairaionFormDocUpdate3 = false
        } else if (index == 5) {
          this.deleteDeclairaionFormDocUpdate5 = false
        } else if (index == 6) {
          this.deleteDeclairaionFormDocUpdate6 = false
        } else if (index == 7) {
          this.deleteDeclairaionFormDocUpdate7 = false
        } else if (index == 8) {
          this.deleteDeclairaionFormDocUpdate8 = false
        }

      })
    } else {
      Swal.fire(
        'Select PDF to be uploaded !',
        '',
        'error'
      )
    }

    this.fileToRelatedFormUpload = null;
  }

  // ---------------------------------------------------- Start new function TransferRelatedForm add here ---------------------
  restStationSelection(val) {
    if (val == 1) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          choiceKv1StationCode: '',
          choiceKv1StationName: ''
        }
      })
    } else if (val == 2) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          choiceKv2StationCode: '',
          choiceKv2StationName: ''
        }
      })
    } else if (val == 3) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          choiceKv3StationCode: '',
          choiceKv3StationName: ''
        }
      })
    } else if (val == 4) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          choiceKv4StationCode: '',
          choiceKv4StationName: ''
        }
      })
    } else if (val == 5) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          choiceKv5StationCode: '',
          choiceKv5StationName: ''
        }
      })
    } else if (val == 191) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          displacement1StationName: '',
          displacement1StationCode: ''
        }
      })
    } else if (val == 192) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          displacement2StationName: '',
          displacement2StationCode: ''
        }
      })
    } else if (val == 193) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          displacement3StationName: '',
          displacement3StationCode: ''
        }
      })
    } else if (val == 194) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          displacement4StationName: '',
          displacement4StationCode: ''
        }
      })
    } else if (val == 195) {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          displacement5StationName: '',
          displacement5StationCode: ''
        }
      })
    }
  }

  // ----------------------------------------------  end here-------------------------------------
  selectTransferFormSchoolByUdise() {

    var str = this.selectedUdiseCode
    console.log(str)
    var splitted = str.split("-", 2);
     
    if (this.position == '1') {

      // choiceKv1StationName
      if (this.teacherForm.value.transferRelatedForm.choiceKv2StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv3StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv4StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv1StationCode: '',
            choiceKv1StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv1StationName: splitted[1],
            choiceKv1StationCode: splitted[0]
          }
        })
      }

    } else if (this.position == '2') {
      if (this.teacherForm.value.transferRelatedForm.choiceKv1StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv3StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv4StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv2StationCode: '',
            choiceKv2StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv2StationName: splitted[1],
            choiceKv2StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '3') {
      if (this.teacherForm.value.transferRelatedForm.choiceKv2StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv1StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv4StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv3StationCode: '',
            choiceKv3StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv3StationName: splitted[1],
            choiceKv3StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '4') {
      if (this.teacherForm.value.transferRelatedForm.choiceKv2StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv3StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv1StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv4StationCode: '',
            choiceKv4StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv4StationName: splitted[1],
            choiceKv4StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '5') {
      if (this.teacherForm.value.transferRelatedForm.choiceKv2StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv3StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv4StationName == splitted[1] ||
        this.teacherForm.value.transferRelatedForm.choiceKv1StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv5StationCode: '',
            choiceKv5StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            choiceKv5StationName: splitted[1],
            choiceKv5StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '191') {
      if (this.teacherForm.value.transferRelatedForm.displacement2StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement3StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement4StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement1StationCode: '',
            displacement1StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement1StationName: splitted[1],
            displacement1StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '192') {
      if (this.teacherForm.value.transferRelatedForm.displacement1StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement3StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement4StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement2StationCode: '',
            displacement2StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement2StationName: splitted[1],
            displacement2StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '193') {
      if (this.teacherForm.value.transferRelatedForm.displacement2StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement1StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement4StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement3StationCode: '',
            displacement3StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement3StationName: splitted[1],
            displacement3StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '194') {
      if (this.teacherForm.value.transferRelatedForm.displacement2StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement3StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement1StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement4StationCode: '',
            displacement4StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement4StationName: splitted[1],
            displacement4StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '195') {
      if (this.teacherForm.value.transferRelatedForm.displacement2StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement3StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement4StationCode == splitted[0] ||
        this.teacherForm.value.transferRelatedForm.displacement1StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement5StationCode: '',
            displacement5StationName: ''
          }
        })
      } else {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            displacement5StationName: splitted[1],
            displacement5StationCode: splitted[0]
          }
        })
      }
    }
  }
  getSpouseDetails(event) {

    this.teacherForm.patchValue({
      personalInfoForm: {
        spouseStationName: '',
        spousePost: '',
        spouseStationCode: '',
        spouseName: ''
      }
    })

    this.outSideService.fetchSpouseByEmpCode(event.target.value).subscribe((res) => {

      if (res.status == '0') {

      }
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: res.response?.stationName,
          spousePost: res.response?.lastPromotionPositionType,
          spouseStationCode: res.response?.stationCode
        }
      })

      if (res.status == '1') {
        this.outSideService.fetchTeacherByTeacherId(res.response?.teacherId).subscribe((res) => {
          this.teacherForm.patchValue({
            personalInfoForm: {
              spouseName: res.response?.teacherName
            }
          })
        })
      }
    })
  }

  getSchoolDetailsByKvCode() {
    this.outSideService.fetchKvSchoolDetails(this.kvCode).subscribe((res) => {
      this.kvSchoolDetails = res.response;
      for (let i = 0; i < this.kvSchoolDetails.rowValue.length; i++) {
        this.stationType = this.kvSchoolDetails.rowValue[i].school_type;
        this.stationNameCode = this.kvSchoolDetails.rowValue[i].station_name;
        this.stationNameCode = this.stationNameCode + "(" + this.kvSchoolDetails.rowValue[i].station_code + ")";
        this.stationCode = this.kvSchoolDetails.rowValue[i].station_code
        sessionStorage.setItem('shiftYn', this.kvSchoolDetails.rowValue[i].shift_yn)
        sessionStorage.setItem('stationCode', this.kvSchoolDetails.rowValue[i].station_code)

        this.kvNameCode = this.kvSchoolDetails.rowValue[i].kv_name;
        this.kvNameCode = this.kvNameCode + "(" + this.kvSchoolDetails.rowValue[i].kv_code + ")";

        this.udiseSchCode = this.kvSchoolDetails.rowValue[i].udise_sch_code;
        this.schName = this.kvSchoolDetails.rowValue[i].kv_name;
        this.stationName = this.kvSchoolDetails.rowValue[i].station_name;
      }
      sessionStorage.removeItem('isZiet');
      if (this.stationType) {
        sessionStorage.setItem('isZiet', (this.responseData?.teachingNonteaching == '1' && this.stationType == '2') ? '1' : '0')
      }
    })
  }

  teacherTypeSelect(event) {
    if (event.target.value != 22 && event.target.value != 23 && event.target.value != 10  && event.target.value != 12 && event.target.value != 24 && event.target.value != '22' && event.target.value != '23' && event.target.value != '24') {
      this.teacherForm.patchValue({
        profileForm: {
          staffType: '2'
        }
      });
    } else {
      this.teacherForm.patchValue({
        profileForm: {
          staffType: '1'
        }
      });
    }
    this.subjectListNameCode = [];
    this.responseData.workExperienceAppointedForSubject = '';
    this.teacherForm.patchValue({
      profileForm: {
        presentSubjectName: ''
      }
    });
    var data = {
      "applicationId": this.applicationId,
      "teacherTypeId": event.target.value
    }
    this.getSubjectByTchType(data);
  }

  getSubjectByTchType(data) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      this.subjectList = res.response.rowValue;
      this.subjectListNameCode = [];
      for (let i = 0; i < this.subjectList.length; i++) {
        var conElement;
        conElement = this.subjectList[i].subject_name;
        conElement = conElement + "(" + this.subjectList[i].subject_code + ")";
        var data = {
          'subNameCode': conElement,
          'subjectCode': this.subjectList[i].subject_id
        }
        this.subjectListNameCode.push(data);
      }
    })
  }


  getAllMaster() {

    this.outSideService.fetchAllMaster(6).subscribe((res) => {

      this.teacherTypeData = res.response.postionType;
      this.teacherTypeDataNameCode = [];
      for (let i = 0; i < this.teacherTypeData.length; i++) {

        var concatElement;
        concatElement = this.teacherTypeData[i].organizationTeacherTypeName;
        concatElement = concatElement + "(" + this.teacherTypeData[i].orgTeacherTypeCode + ")";
        var data = {
          'nameCode': concatElement,
          'teacherTypeId': this.teacherTypeData[i].teacherTypeId
        }
        this.teacherTypeDataNameCode.push(data)
      }
    })
  }

  getQualMasterByTchType() {
    this.outSideService.fetchQualByType("A").subscribe((res) => {
      this.acadQualMasterList = res.response;
      this.outSideService.fetchQualByType("P").subscribe((res) => {
        this.profQualMasterList = res.response;
      })
    })
  }

  getSubjectByQual(event, val, index) {
    this.outSideService.fetchSubByQual(event.target.value).subscribe((res) => {

      if (val == 'A') {
        this.subjectListQual[index] = res.response.rowValue;
      } else if (val == 'P') {
        this.subjectListQualP[index] = res.response.rowValue;
      }

    })
  }
  showSaveBuuton() {
    if (this.buttonVisible == true) {
      this.buttonVisible = false;
    } else {
      this.buttonVisible = true;
    }
  }
  getSubjectByQualAll(event, val, index) {
    this.outSideService.fetchSubByQual(event).subscribe((res) => {
      if (val == 'A') {
        this.subjectListQual[index] = res.response.rowValue;
        this.addAcadProfQual(this.acdQualList[index])
      } else if (val == 'P') {
        this.subjectListQualP[index] = res.response.rowValue;
        this.addProfQual(this.profQualList[index]);
      }
    })
  }

  public saveCode(e, i): void {
    this.find = this.codeList.find(x => x?.awardName === e.target.value);
    this.setAwardId(i, this.find.awardId)
  }

  setAwardId(index, awardId) {
    ((this.teacherForm.get('awardReceived') as FormArray).at(index) as FormGroup).get('awardId').patchValue(awardId);
  }

  getAwardsList() {
    this.outSideService.fetchAwardsList("a").subscribe((res) => {
      this.codeList = res.response;
    })
  }

  getStateMaster() {
    this.outSideService.fetchStateMaster("a").subscribe((res) => {
      this.stateMasterList = res.response.rowValue;

    })
  }

  getDistrictListByStateId(event, data) {

    this.addType = data;
    if (data == 'C') {
      this.districListByStateIdC = [];
      this.teacherForm.patchValue({
        personalInfoForm: {
          crspndncPinCode: '',
          sameAbove: false
        }
      });
      this.enableDisableAddress('enable');
    } else if (data == 'P') {
      this.districListByStateIdP = [];
      this.teacherForm.patchValue({
        personalInfoForm: {
          prmntPinCode: ''
        }
      })
    }
    this.getDistrictByStateId(event.target.value, data);
  }

  getDistrictByStateId(stateId, data) {

    this.outSideService.fetchDistrictByStateId(stateId).subscribe((res) => {
      if (data == 'C') {
        this.districListByStateIdC = res.response.rowValue

      } else if (data == 'P') {
        this.districListByStateIdP = res.response.rowValue

      }

    })
  }

  onNewEntry() {
    sessionStorage.removeItem('singleTeacherList')
    this.allowEdit = false;
    this.newTeacherEntry = true;
    this.teacherForm.reset();
  }

  passwordChange(event: any){
    console.log(event?.target?.value)
  }

  getTeacherById(id) {
    //alert("calleddd");
    this.outSideService.fetchTeacherById(id).subscribe((res) => {
       
      this.responseData = res.response;
      this.lastPromotionId = this.responseData?.lastPromotionId;
      this.workExpId = this.responseData?.workExperienceIdPresentKv;
      this.getSchoolDetailsByKvCode();
      sessionStorage.setItem('finalStatus', this.responseData.verifyFlag)
      this.formStatusLocale = this.responseData.verifyFlag
      this.genderValueConvtFinal(this.responseData?.teacherGender)
      this.staffTypeConvtFinal(this.responseData?.teachingNonteaching)
      this.spouseValueConvt(this.responseData?.spouseStatus)

      sessionStorage.setItem('systemTeacherCode', this.responseData.teacherSystemGeneratedCode)
      this.tempTeacherId = this.responseData.teacherId;
      sessionStorage.setItem('teacherId', this.tempTeacherId)


      this.getFlagStatus(this.tempTeacherId)

      if (this.responseData?.teacherDisabilityYn == "1") {
        this.isVisible = true;
        if (this.responseData?.teacherDisabilityFromBirthYn == "0") {
          this.isVisibleBirth = true;
        }
      }

      if (this.responseData?.maritalStatus == '1') {
        this.teacherForm.patchValue({
          transferRelatedForm: {
            personalStatusSpD: '0',
          }
        })
        this.personalStatusSpDradioButton = 0;
       // (this.teacherForm.get('transferRelatedForm') as FormGroup).get('personalStatusSpD').disable();
        this.marriedStatusYN = true;
      } else if (this.responseData?.maritalStatus == '4') {
        this.marriedStatusYN = false;
      }

      if (this.responseData?.spouseStatus == '1') {
        this.spouseNone = true;
        this.spouseKVSStation = true;
      } else if (this.responseData?.spouseStatus == '2' || this.responseData?.spouseStatus == '3') {
        this.spouseNone = true;
        this.spouseKVSStation = false;
      } else if (this.responseData?.spouseStatus == '5') {
        this.spouseNone = false;
        this.spouseKVSStation = false;
      }

      var data = {
        "applicationId": environment.applicationId,
        "teacherTypeId": this.responseData.lastPromotionPositionType
      }
      this.getSubjectByTchType(data);
      this.getDistrictByStateId(this.responseData.teacherCorrespondenceState, "C")
      this.getDistrictByStateId(this.responseData.teacherParmanentState, "P")

      this.tempTeacherId = this.responseData.teacherId;
      this.getStateMaster();
      this.getTrainingByTchId();
      // this.getAwardsList();
      // this.getAwardsByTchId();
      this.getAcdQualList();
      this.getProfQualList();
      this.getTchExpByTchId();
      // this.getPromotionByTchId();
      this.getQualMasterByTchType();
      this.getTransferProfile();
      this.getDocumentByTeacherId();
       
      setTimeout(() => {
        if (this.responseData != null) {

          if (this.responseData.spouseStatus == "1" || this.responseData.spouseStatus == 1) {
            this.teacherForm.patchValue({
              transferRelatedForm: {
                //spouseName:this.teacherForm.value.personalInfoForm.spouseName,
                spouseStationName: this.teacherForm.value.personalInfoForm.spouseStationName
              }
            });
          }
        }
      }, 1000);
    })
  }

  teacherTypeSelectExp(event, index) {
    var data = {
      "applicationId": this.applicationId,
      "teacherTypeId": event.target.value
    }
    this.getSubjectByTchTypeExp(data, index);
  }

  getSubjectByTchTypeExp(data, index) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      this.subjectList = res.response.rowValue;
      this.subjectListNameCode1 = [];
      for (let i = 0; i < this.subjectList.length; i++) {
        var conElement;
        conElement = this.subjectList[i].subject_name;
        conElement = conElement + "(" + this.subjectList[i].subject_code + ")";
        data = {
          'subNameCode': conElement,
          'subjectCode': this.subjectList[i].subject_id
        };
        this.subjectListNameCode1.push(data);

      }
      this.subjectListNameCode2[index] = this.subjectListNameCode1;

    })
  }

  staffTypeConvt(event) {
    this.staffTypeConvtFinal(event.target.value)
  }

  staffTypeConvtFinal(val) {
    if (val == '1') {
      this.teacherForm.patchValue({
        profileForm: ({
          staffTypeP: 'Teaching'
        })
      })
    } else if (val == '2') {
      this.teacherForm.patchValue({
        profileForm: ({
          staffTypeP: 'Non-Teaching'
        })
      })
    }

  }

  verifyModal() {
    this.correctionProfile = new FormGroup({
      'id': new FormControl(),
      'teacherId': new FormControl(),
      'teacherEmployeeCode': new FormControl({ value: '', disabled: true }),
      'teacherEmployeeCodeNew': new FormControl('', Validators.required),
      'teacherName': new FormControl(),
      'teacherNameNew': new FormControl('', Validators.required),
      'teacherGender': new FormControl(),
      'teacherGenderNew': new FormControl('', Validators.required),
      'teacherDob': new FormControl(),
      'teacherDobNew': new FormControl('', Validators.required),
      'teacherSocialCategory': new FormControl(),
      'teacherSocialCategoryNew': new FormControl('', Validators.required),
      'teacherReligion': new FormControl(),
      'teacherReligionNew': new FormControl('', Validators.required),
      'teacherNationality': new FormControl(),
      'teacherNationalityNew': new FormControl('', Validators.required),
      'teacherMobile': new FormControl(),
      'teacherMobileNew': new FormControl('', Validators.required),
      'teacherEmail': new FormControl(),
      'teacherEmailNew': new FormControl('', Validators.required),
      'workExperiencePositionTypePresentStationStartDate': new FormControl(),
      'workExperiencePositionTypePresentStationStartDateNew': new FormControl('', Validators.required),
      'workExperienceWorkStartDatePresentKv': new FormControl(),
      'workExperienceWorkStartDatePresentKvNew': new FormControl('', Validators.required),
      'lastPromotionPositionType': new FormControl(),
      'lastPromotionPositionTypeNew': new FormControl('', Validators.required),
      'lastPromotionPositionDate': new FormControl(),
      'lastPromotionPositionDateNew': new FormControl('', Validators.required),
      'workExperienceAppointedForSubject': new FormControl(),
      'workExperienceAppointedForSubjectNew': new FormControl('', Validators.required),
      'remarks': new FormControl('', Validators.required),
      'queryInitiateDate': new FormControl('', Validators.required)
    })

    this.correctionProfile.patchValue({
      teacherId: this.responseData.teacherId,
      teacherEmployeeCode: this.responseData.teacherEmployeeCode,
      teacherName: this.responseData.teacherName,
      teacherGender: this.responseData.teacherGender,
      teacherDob: this.responseData.teacherDob,
      teacherSocialCategory: this.responseData.teacherSocialCategory,
      teacherReligion: this.responseData.teacherReligion,
      teacherNationality: this.responseData.teacherNationality,
      teacherMobile: this.responseData.teacherMobile,
      teacherEmail: this.responseData.teacherEmail,
      workExperiencePositionTypePresentStationStartDate: this.responseData.workExperiencePositionTypePresentStationStartDate,
      workExperienceWorkStartDatePresentKv: this.responseData.workExperienceWorkStartDatePresentKv,
      lastPromotionPositionType: this.responseData.lastPromotionPositionType,
      lastPromotionPositionDate: this.responseData.lastPromotionPositionDate,
      workExperienceAppointedForSubject: this.responseData.workExperienceAppointedForSubject,
    })
    this.modalService.open(this.verifyProfile, { size: 'full', backdrop: 'static', keyboard: false })
  }

  correctionForm(data, val) {

    if (data == 'sh') {
      if (val == '1') {
        this.sh = true;
      } else if (val == '0') {
        this.sh = false;
      }
    } else if (data == 'sh1') {
      if (val == '1') {
        this.sh1 = true;
      } else if (val == '0') {
        this.sh1 = false;
      }
    } else if (data == 'sh2') {
      if (val == '1') {
        this.sh2 = true;
      } else if (val == '0') {
        this.sh2 = false;
      }
    } else if (data == 'sh3') {
      if (val == '1') {
        this.sh3 = true;
      } else if (val == '0') {
        this.sh3 = false;
      }
    } else if (data == 'sh4') {
      if (val == '1') {
        this.sh4 = true;
      } else if (val == '0') {
        this.sh4 = false;
      }
    } else if (data == 'sh5') {
      if (val == '1') {
        this.sh5 = true;
      } else if (val == '0') {
        this.sh5 = false;
      }
    } else if (data == 'sh6') {
      if (val == '1') {
        this.sh6 = true;
      } else if (val == '0') {
        this.sh6 = false;
      }
    } else if (data == 'sh7') {
      if (val == '1') {
        this.sh7 = true;
      } else if (val == '0') {
        this.sh7 = false;
      }
    } else if (data == 'sh8') {
      if (val == '1') {
        this.sh8 = true;
      } else if (val == '0') {
        this.sh8 = false;
      }
    } else if (data == 'sh21') {
      if (val == '1') {
        this.sh21 = true;
      } else if (val == '0') {
        this.sh21 = false;
      }
    } else if (data == 'sh22') {
      if (val == '1') {
        this.sh22 = true;
      } else if (val == '0') {
        this.sh22 = false;
      }
    } else if (data == 'sh23') {
      if (val == '1') {
        this.sh23 = true;
      } else if (val == '0') {
        this.sh23 = false;
      }
    } else if (data == 'sh24') {
      if (val == '1') {
        this.sh24 = true;
      } else if (val == '0') {
        this.sh24 = false;
      }
    } else if (data == 'sh25') {
      if (val == '1') {
        this.sh25 = true;
      } else if (val == '0') {
        this.sh25 = false;
      }
    } else if (data == 'sh26') {
      if (val == '1') {
        this.sh26 = true;
      } else if (val == '0') {
        this.sh26 = false;
      }
    } else if (data == 'sh27') {
      if (val == '1') {
        this.sh27 = true;
      } else if (val == '0') {
        this.sh27 = false;
      }
    }

  }

  dateDifferenceFnc(control: FormControl): { [s: string]: boolean } {

    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isBefore(today) == false) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }

  getKvRegion() {
     
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      this.regionList = res.response.rowValue;

    })
  }

  getStationByRegionId(event) {
    // this.selectedUdiseCode = '';
    // this.stationList = []
    // var stationByInterCond = {
    //   "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTER",
    //   "conditionvalue": [this.responseData.teacherId, event.target.value, event.target.value, this.responseData.teacherId]
    // }
    const data = { "regionCode": event.target.value };
    this.outSideService.fetchStationByRegionId(data).subscribe((res) => {

      this.stationList = res.rowValue
    })
    console.log(this.stationList)
  }

  getStationByRegionIds(event: any) {
     
    const data = { "regionCode": event.target.value };
    this.outSideService.fetchStationByRegionIds(data).subscribe((res) => {
      this.stationList = res.rowValue
    })
    console.log("hello  stationnnn")
    console.log(this.stationList)
  }

  getKvSchoolByStationId(event) {
    this.selectedUdiseCode = '';
    this.kvSchoolList = []
    this.outSideService.fetchKvSchoolByStationCode(event.target.value).subscribe((res) => {
      this.kvSchoolList = res.response;

    })
  }


  selectSchoolByUdise() {

     
    if (this.selectedSchoolType == 1) {
      for (let i = 0; i < this.kvSchoolList.length; i++) {
debugger
        if (this.kvSchoolList[i].udiseSchCode == this.selectedUdiseCode) {
          this.shiftYN = this.kvSchoolList[i].shiftYn
          this.setTeacherPostingData(this.kvSchoolList[i].kvName, this.kvSchoolList[i].udiseSchCode, this.selectedSchoolType)
        }
      }
    }
    else if(this.selectedSchoolType == 5){
      this.setTeacherPostingData('DEPUTATION', '77777', this.selectedSchoolType)
    }
    else {
      this.setTeacherPostingData(this.selectedKvname, this.selectedKvCode, this.selectedSchoolType)
    }
  }

  setTeacherPostingData(name, udiseCode, schoolType) {
    console.log(name, udiseCode, schoolType);
    ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('udiseSchoolName').patchValue(name);
    ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('experienceType').patchValue(schoolType);
    ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('udiseSchCode').patchValue(udiseCode);
    // console.log(((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('udiseSchCode'))
    if (this.shiftYN == '0' || this.shiftYN == 0) {
      ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('shiftYn').patchValue('0');
      ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('shiftType').disable();
    } else if (this.shiftYN == '1' || this.shiftYN == 1) {
      ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('shiftYn').patchValue('1');
      ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('shiftType').enable();
    }
  }
  selectExperianceSchool(val) {


    this.selectedUdiseCode = '';
    this.indexNew = val;
    this.modalService.open(this.selectSchoolModal, { size: 'xl', backdrop: 'static', keyboard: false })
  }
  selectSchool(val) {
    this.selectedUdiseCode = '';
    this.indexNew = val;
    this.position = val;
    this.modalService.open(this.selectSchoolModalInterStation, { size: 'xl', backdrop: 'static', keyboard: false })
  }

  profileDeclaration(e, id) {

    if (e.target.checked) {
      if (id == '1') {
        this.declaration1 = true;
        if (this.declaration1 == true && this.declaration2 == true) {
          this.confirmEnable = true;
        }
      } else if (id == '2') {
        this.declaration2 = true;
        if (this.declaration1 == true && this.declaration2 == true) {
          this.confirmEnable = true;
        }
      }
    } else if (!e.target.checked) {
      if (id == '1') {
        this.declaration1 = false;
        this.confirmEnable = false;
      } else if (id == '2') {
        this.declaration2 = false;
        this.confirmEnable = false;
      }
    }
  }

  schoolRemarks() {
    this.modalService.open(this.schoolRemarksModal, { size: 'small', backdrop: 'static', keyboard: false })
  }

  experienceDataManagement(event, index,type) {
    
    // alert("called");
    debugger
    ((this.teacherForm.get('detailsOfPosting') as FormArray).at(0) as FormGroup).get('workStartDate').enable();
    for (let i = 0; i < this.teacherForm.value.detailsOfPosting.length - 1; i++) {
      var dateFrom = this.teacherForm.value.detailsOfPosting[i].workStartDate;
      var dateTo = this.teacherForm.value.detailsOfPosting[i].workEndDate;
      var dateCheck;
      if(event.target.value =='undefined'){
        // alert("if");
        dateCheck =event.target.value;
        
      }else{
        dateCheck = moment(event.value?._d).format("YYYY-MM-DD");
        // alert("in else");
      }
     
      // alert(dateCheck);
      var returnType
      if (dateTo == null || dateTo == 'null') {
        returnType = this.dateGreater(dateFrom, dateCheck,type);
      } else {
        returnType = this.dateCheck(dateFrom, dateTo, dateCheck,type);
      }
      if (returnType == 0) {
        Swal.fire(
          'Date lies between previous experience !',
          '',
          'error'
        );
       
        setTimeout(() => {
          
          (<HTMLInputElement>document.getElementById("wordStartDate-" + index)).value = "";
          (<HTMLInputElement>document.getElementById("wordEndDate-" + index)).value = "";
          this.teacherForm.value.detailsOfPosting[index].workStartDate = "";
          this.teacherForm.value.detailsOfPosting[index].workEndDate = "";
        }, 200);

        // this.teacherForm.value.detailsOfPosting[index].workStartDate.setValue(null);
        // this.teacherForm.value.detailsOfPosting[index].workEndDate.setValue(null);
        // event.stopPropagation();
        
       
      }
    }
    ((this.teacherForm.get('detailsOfPosting') as FormArray).at(0) as FormGroup).get('workStartDate').disable();
    return false;
  }


  dateCheck(dateFrom, dateTo, dateCheck,type) {
    // alert("from--->"+dateFrom+"----to-"+dateTo+"--check--"+dateCheck);
    var from = Math.round((new Date(dateFrom).getTime())/(3600000*24));
    var to = Math.round((new Date(dateTo).getTime())/(3600000*24));
    var check = Math.round((new Date(dateCheck).getTime())/(3600000*24));

    // var final1=(+check)-(+to);
    // alert("from--->"+from+"----to-"+to+"--check--"+check);
debugger;
    if(type==1){
      if (check >= from && check < to) {
        return 0
      } else {
        return 1;
      }
    }else if(type==2){
      if (check > from && check <= to) {
        return 0
      } else {
        return 1;
      }
    }


  }

  dateGreater(dateFrom, dateCheck,type) {
    var from =  Math.round((new Date(dateFrom).getTime())/(3600000*24));
    var check = Math.round((new Date(dateCheck).getTime())/(3600000*24));
    if(type==1){
    if (check >= from) {
      return 0
    } else {
      return 1;
    }
}else if(type==2){
  if (check > from) {
    return 0
  } else {
    return 1;
  }
}

}

  profileDateManagement(event, val) {

     ;
    var date1
    var dateVaule
    if (event.target.value == 'undefined' || event.target.value == null) {

      date1 = event.target.value.split("-").reverse().join("-");
      var dateVaule = event.target.value.split("-").reverse().join("-");

    } else {
      date1 = moment(event.value._d).format("DD-MM-YYYY").split("-").reverse().join("-");
      dateVaule = moment(event.value._d).format("DD-MM-YYYY").split("-").reverse().join("-");
    }



    var date2 = this.teacherForm.value.profileForm.dob;
    var Time = new Date(date1).getTime() - new Date(date2).getTime();
    var Days = Time / (1000 * 3600 * 24); //Diference in Days

    if (val == 'a') {
      var dateA = dateVaule
      var dateB = this.teacherForm.value.profileForm.presentStationPostDate
      var dateC = this.teacherForm.value.profileForm.presentPostDate
      var returnType
      if ((dateB == undefined || dateB == '' || dateB == null) && (dateC == undefined || dateC == '' || dateC == null)) {
        return true;
      } else if (dateA && dateC && (dateB == undefined || dateB == '' || dateB == null)) {
        returnType = this.check2ProfileDate(dateA, dateC);
      } else if (dateA && dateB && (dateC == undefined || dateC == '' || dateC == null)) {
        returnType = this.check2ProfileDate(dateA, dateB);
      } else if (dateA && dateB && dateC) {
        returnType = this.check3ProfileDate(dateA, dateB, dateC);
      }
    } else if (val == 'b') {
      var dateB = dateVaule;
      var dateA = this.teacherForm.value.profileForm.presentKvDate
      var dateC = this.teacherForm.value.profileForm.presentPostDate
      var returnType
      if ((dateA == undefined || dateA == '' || dateA == null) && (dateC == undefined || dateC == '' || dateC == null)) {
        return true;
      } else if (dateB && dateC && (dateA == undefined || dateA == '' || dateA == null)) {
        returnType = this.check2ProfileDate(dateB, dateC);
      } else if (dateA && dateB && (dateC == undefined || dateC == '' || dateC == null)) {
        returnType = this.check2ProfileDate(dateA, dateB);
      } else if (dateA && dateB && dateC) {
        returnType = this.check3ProfileDate(dateA, dateB, dateC);
      }
    } else if (val == 'c') {
      if (Days * 1 >= 6570) {
        var dateC = dateVaule;
        var dateA = this.teacherForm.value.profileForm.presentKvDate
        var dateB = this.teacherForm.value.profileForm.presentStationPostDate
        var returnType
        if ((dateA == undefined || dateA == '' || dateA == null) && (dateB == undefined || dateB == '' || dateB == null)) {
          return true;
        } else if (dateA && dateC && (dateB == undefined || dateB == '' || dateB == null)) {
          returnType = this.check2ProfileDate(dateA, dateC);
        } else if (dateB && dateC && (dateA == undefined || dateA == '' || dateA == null)) {
          returnType = this.check2ProfileDate(dateB, dateC);
        } else if (dateB != undefined && dateA != undefined) {
          returnType = this.check3ProfileDate(dateA, dateB, dateC);
        }
      } else {
        this.teacherForm.patchValue({
          profileForm: {
            presentPostDate: ''
          }
        })
        Swal.fire(
          'Please check DoB and posting year selected !',
          '',
          'error'
        )
      }
    }

    if (returnType == 0) {
      Swal.fire(
        'Dates provide in "DoJ in Present KV/RO/ZIET/HQ in Present Post","DoJ in Present Station Irrespective of Cadre","DoJ in KVS" are contradicting !',
        'Kindly enter the dates in correct sequence',
        'error'
      );
      if (val == 'a') {
        this.teacherForm.patchValue({
          profileForm: {
            presentKvDate: '',
            presentStationPostDate: '',
            presentPostDate: ''
          }
        })
      } else if (val == 'b') {
        this.teacherForm.patchValue({
          profileForm: {
            presentKvDate: '',
            presentStationPostDate: '',
            presentPostDate: ''
          }
        })
      } else if (val == 'c') {
        this.teacherForm.patchValue({
          profileForm: {
            presentKvDate: '',
            presentStationPostDate: '',
            presentPostDate: ''
          }
        })
      }
    }
  }

  checkActiveStaty(event){
    let regex = /^[0-9]*$/;
    if (regex.test(event.target.value) && event.target.value > -1) {
      return true
    } else {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          absenceDaysOne: '',
        }
      });
      Swal.fire(
        'Alert !',
        'Only Numeric are allowed!',
        'error'
      )
    }
  }

  check3ProfileDate(a, b, c) {

    let dateOne = new Date(b);
    let dateTwo = new Date(a);
    let dateThird = new Date(c)


    // var checkA = Math.round((new Date(a).getTime()) / (3600000 * 24));
    // var checkB = Math.round((new Date(b).getTime()) / (3600000 * 24));
    // var checkC = Math.round((new Date(c).getTime()) / (3600000 * 24));

    // alert("checkA--->"+checkA+"---checkB->"+checkB+"---checkC->"+checkC)


    // var final1 = Math.abs(checkB - checkA);
    // var final2 = Math.abs(checkC - checkB);



    var final1 = Math.floor((Date.UTC(dateOne.getFullYear(), dateOne.getMonth(), dateOne.getDate()) - Date.UTC(dateThird.getFullYear(), dateThird.getMonth(), dateThird.getDate())) / (1000 * 60 * 60 * 24));
    var final2 = Math.floor((Date.UTC(dateTwo.getFullYear(), dateTwo.getMonth(), dateTwo.getDate()) - Date.UTC(dateThird.getFullYear(), dateThird.getMonth(), dateThird.getDate())) / (1000 * 60 * 60 * 24));
    var final3 = Math.floor((Date.UTC(dateTwo.getFullYear(), dateTwo.getMonth(), dateTwo.getDate()) - Date.UTC(dateOne.getFullYear(), dateOne.getMonth(), dateOne.getDate())) / (1000 * 60 * 60 * 24));

    if (final1 >= 0 && final2 >= 0 && final3 >= 0) {
      return 1;
    }
    else {
      return 0
    }

    // if (checkC >= checkB && checkC >= checkA && checkB >= checkA) {
    //   return 1;
    // } else {
    //   return 0;
    // }
  }

  check2ProfileDate(a, b) {
    let dateOne = new Date(b);
    let dateTwo = new Date(a);
    // var checkA = Math.round((new Date(a).getTime())/(3600000*24));
    // var checkB = Math.round((new Date(b).getTime())/(3600000*24));
    // alert("checkA--->"+checkA+"---checkB->"+checkB)
    var final1 = Math.floor((Date.UTC(dateOne.getFullYear(), dateOne.getMonth(), dateOne.getDate()) - Date.UTC(dateTwo.getFullYear(), dateTwo.getMonth(), dateTwo.getDate())) / (1000 * 60 * 60 * 24));
    if (final1 < 1) {
      return 1;
    } else {
      return 0;
    }
  }

  checkYearLength(event, index, type) {

    var dobYear = new Date(this.teacherForm.value.profileForm.dob).getFullYear()

    if (event.target.value.length < 4 || event.target.value.length > 4) {
      this.year = "Select a valid year";
      if (type == 'Prof') {
        ((this.teacherForm.get('profQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'Acd') {
        ((this.teacherForm.get('acadProfQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'award') {
        ((this.teacherForm.get('awardReceived') as FormArray).at(index) as FormGroup).get('awardYear').patchValue('');
      } else if (type == 'training') {
        ((this.teacherForm.get('trainingReceived') as FormArray).at(index) as FormGroup).get('trainingYear').patchValue('');
      }


    } else if (event.target.value > (new Date()).getFullYear()) {
      Swal.fire(
        'Entered year is after present year!',
        '',
        'error'
      )
      this.year = "Select a valid year";
      if (type == 'Prof') {
        ((this.teacherForm.get('profQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'Acd') {
        ((this.teacherForm.get('acadProfQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'award') {
        ((this.teacherForm.get('awardReceived') as FormArray).at(index) as FormGroup).get('awardYear').patchValue('');
      } else if (type == 'training') {
        ((this.teacherForm.get('trainingReceived') as FormArray).at(index) as FormGroup).get('trainingYear').patchValue('');
      }
    } else if (event.target.value < dobYear) {
      Swal.fire(
        'Entered year is before year of birth !',
        '',
        'error'
      )
      this.year = "Select a valid year";
      if (type == 'Prof') {
        ((this.teacherForm.get('profQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'Acd') {
        ((this.teacherForm.get('acadProfQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'award') {
        ((this.teacherForm.get('awardReceived') as FormArray).at(index) as FormGroup).get('awardYear').patchValue('');
      } else if (type == 'training') {
        ((this.teacherForm.get('trainingReceived') as FormArray).at(index) as FormGroup).get('trainingYear').patchValue('');
      }
    }


  }

  selectSpouseStation() {
    this.modalService.open(this.selectSpouseStationModal, { size: 'small', backdrop: 'static', keyboard: false })
  }

  selectSpouseStationFn() {
    debugger
    var str = this.selectedSpouseStation
    var splitted = str.split("-", 2);
    this.teacherForm.patchValue({
      personalInfoForm: {
        spouseStationName: splitted[1],
        spouseStationCode: splitted[0]
      }
    })

  }


  fileToUpload: File | null = null;
  handleFileInput(files: FileList, index) {
    this.fileUpload = true;
    var data = files.item(0).name
    var splitted = data.split('.', 2)

    if (splitted[1] == 'pdf' || splitted[1] == 'PDF' || splitted[1] == 'Pdf') {
      if (files.item(0).size <= 512000) {
        this.fileToUpload = files.item(0);
        if (index == '0') {
          this.enableUploadButton0 = false;
        } else if (index == '1') {
          this.enableUploadButton1 = false;
        } else if (index == '2') {
          this.enableUploadButton2 = false;
        } else if (index == '3') {
          this.enableUploadButton3 = false;
        } else if (index == '4') {
          this.enableUploadButton4 = true;
        }
      } else {
        this.fileToUpload = null;
        Swal.fire(
          'File size allowed upto 500KB only !',
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
        } else if (index == '4') {
          this.enableUploadButton4 = true;
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
      } else if (index == '4') {
        this.enableUploadButton4 = true;
      }
    }
  }



  documentUpload(index) {
    this.fileUpload = true;
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
      } else if (index == 4) {
        formData.append('filename', "Physically_Handicap_Certificate");
      }


      this.outSideService.uploadDocument(formData).subscribe((res) => {
        this.fileUpload = false;
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
        } else if (index == 4) {
          this.deleteDocUpdate4 = false
        }
        this.getDocumentByTeacherId()
      })
    } else {
      Swal.fire(
        'Select PDF to be uploaded !',
        '',
        'error'
      )
    }
  }

  deleteDocumentUploaded(documentName) {
    for (let i = 0; i < this.documentUploadArray.length; i++) {
      if (this.documentUploadArray[i].docName == documentName) {
        this.documentUploadArray[i] = {}
      }

    }
    if (documentName == 'Medical_Certificate.pdf') {
      this.fileUpgkFilemMedical = true;
      this.Medical_Certificate.nativeElement.value = "";
    }
    if (documentName == 'Single_Parent_Declaration.pdf') {
      this.fileUpspGround = true;
      this.Single_Parent_Declaration.nativeElement.value = "";
    }
    if (documentName == 'Spouse_Declaration.pdf') {
      this.fileUpgkFilebenefit = true;
      this.spouseFile.nativeElement.value = "";
    }
    if (documentName == 'DFP_Declaration.pdf') {
      this.fileUpdfpGround = true;
      this.DFP_Declaration.nativeElement.value = "";
    }
    if (documentName == 'NJCM_RJCM_Declaration.pdf') {
      this.fileUppositionHeld = true;
      this.NJCM_RJCM_Declaration.nativeElement.value = "";
    }
    if (documentName == 'Disability_Certificate.pdf') {
      this.fileUpcareGiver = true;
      this.Disability_Certificate.nativeElement.value = "";
    }
    if(documentName == 'Physically_Handicap_Certificate.pdf'){
      this.fileUpload = true;
      this.Physically_Handicap_Certificate.nativeElement.value = "";
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
    })
  }

  getDocumentByTeacherId() {
     
    // alert(this.tempTeacherId)
    this.outSideService.fetchUploadedDoc(this.tempTeacherId).subscribe((res) => {

      this.documentUploadArray = res;

      for (let i = 0; i < res.length; i++) {

        if (res[i].docName == 'Medical_Certificate.pdf') {
          this.fileUpgkFilemMedical=false;
          this.deleteDocUpdate0 = false;
          this.medicalDocName = res[i].docName;
          this.medicalDocURLName = res[i].url;
        }
        if (res[i].docName == 'Board_examination_Proof.pdf') {
          this.deleteDocUpdate1 = false;
        }
        if (res[i].docName == 'Disability_Certificate.pdf') {
          this.fileUpcareGiver = false;
          this.disabilityCertiDocName = res[i].docName;
          this.disabilityCertiDocURLName = res[i].url
        }
        if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
          this.deleteDocUpdate3 = false;
        }
        if (res[i].docName == 'Spouse_Declaration.pdf') {
          this.fileUpgkFilebenefit = false;
          this.deleteDocUpdate0 = false;
          this.spouseDeclarationDocUrlName = res[i].url
        }
        if (res[i].docName == 'Single_Parent_Declaration.pdf') {
          this.fileUpspGround = false;
          this.singleParentDocName = res[i].docName;
          this.singleParentDocURLName = res[i].url;
        }

        if (res[i].docName == 'DFP_Declaration.pdf') {
          this.fileUpdfpGround = false;
          this.dFPDocName = res[i].docName;
          this.dFPDocURLName = res[i].url;
        }
        if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
          this.fileUppositionHeld = false;
          this.nJCMRJCMDocName = res[i].docName;
          this.nJCMRJCMDocURLName = res[i].url;
        }
      
        if (res[i].docName == 'Physically_Handicap_Certificate.pdf') {
          this.fileUpload = false;
        }
        
        if (res[i].docName == 'Disability_Certificate.pdf') {
          this.deleteDocUpdate2 = false;
        }
       
      }
    })
  }

  checkMobileNumber(event) {
    this.outSideService.fetchTchDuplicateMobile(event.target.value).subscribe((res) => {
      if (res.response.status == 1) {
      }
      else if (res.response.status == 0) {
        Swal.fire(
          'Mobile number already exist',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          profileForm: {
            mobile: ''
          }
        })
      }
    })
  }
  checkPercentageOfDisablity(event: any) {
    let regex = /^[0-9]*$/;
    if (regex.test(event.target.value) && event.target.value > 0 && event.target.value <= 100) {
      return true
    } else {
      this.teacherForm.patchValue({
        transferRelatedForm: {
          careGiverDisabilityPrcnt: '',
        }
      });
      Swal.fire(
        'Alert !',
        'Only numbers are allowed and percentage should be less than 100',
        'error'
      )
    }
  }
  onVerifyClick() {

    this.outSideService.getUpdatedFlag(this.tempTeacherId).subscribe((res) => {
      this.flagUpdatedList = res.response
    }, error => {

    })
    this.outSideService.fetchConfirmedTchDetails(this.responseData.teacherId).subscribe((res) => {
       
      this.verifyTchTeacherProfileData = res.response.teacherProfile
      this.verifyTchTeacherAcdQualification = res.response.educationalQualification
      this.verifyTchTeacherProfQualification = res.response.profestinalQualification
      this.teacherStationChioce = res.response.teacherTrainingProfile
      this.verifyTchTeacherAward = res.response.awards
      this.verifyTchTeacherTraining = res.response.training
      for (let i = 0; i < res.response.experience.length; i++) {
        if (res.response.experience[i].workEndDate != null || res.response.experience[i].workEndDate != null) {
          // res.response.experience[i].workEndDate = this.date.transform(new Date(res.response.experience[i].workEndDate * 1), 'yyyy-MM-dd')
          res.response.experience[i].workEndDate =res.response.experience[i].workEndDate;
        }
        res.response.experience[i].workStartDate = res.response.experience[i].workStartDate;
      }
      this.verifyTchTeacherWorkExp = res.response.experience
    })
  }

  setUdiseCode(event) {

    this.selectedUdiseCode = event.target.value;
  }
  menuClick(menuvalue: any) {
    this.nextClick(menuvalue)
  }
  teacherPdf() {
    this.onVerifyClick();
    setTimeout(() => {
      this.pdfServive.testFnc(this.verifyTchTeacherProfileData, this.kvNameCode, this.stationNameCode,
        this.verifyTchTeacherWorkExp, this.teacherStationChioce);
    }, 1000);

  }

  cDistrictChange(value) {
    this.teacherForm.patchValue({
      personalInfoForm: {
        crspndncPinCode: '',
        sameAbove: false
      }
    })
    this.responseData.teacherCorrespondenceDistrict = value;
    this.enableDisableAddress('enable');
  }
  pDistrictChange(value) {

    this.responseData.teacherPermanentDistrict = value;
  }

  sameAsAbove(event) {

    this.districListByStateIdP = [];
    this.getDistrictByStateId(this.teacherForm.value.personalInfoForm.crspndncState, 'P');
    if (event.target.checked) {
      this.enableDisableAddress('disable')
      this.teacherForm.patchValue({
        personalInfoForm: {
          prmntAddress: this.teacherForm.value.personalInfoForm.crspndncAddress,
          prmntState: this.teacherForm.value.personalInfoForm.crspndncState,
          prmntDistrict: this.teacherForm.value.personalInfoForm.crspndncDistrict,
          prmntPinCode: this.teacherForm.value.personalInfoForm.crspndncPinCode
        }
      });

    } else if (!event.target.checked) {
      this.teacherForm.patchValue({
        personalInfoForm: {
          prmntAddress: '',
          prmntState: '',
          prmntDistrict: '',
          prmntPinCode: ''
        }
      });
      this.enableDisableAddress('enable')
    }
  }

  addOrPinChange(val) {
    this.teacherForm.patchValue({
      personalInfoForm: {
        sameAbove: false
      }
    });
    this.enableDisableAddress('enable')
  }

  enableDisableAddress(val) {
    if (val == 'disable') {
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntAddress').disable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntState').disable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntDistrict').disable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntPinCode').disable();
    } else if (val == 'enable') {
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntAddress').enable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntState').enable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntDistrict').enable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntPinCode').enable();
    }
  }

}
