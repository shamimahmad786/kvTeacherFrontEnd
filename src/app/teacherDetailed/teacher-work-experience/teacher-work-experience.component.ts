import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { DataService } from 'src/app/service/data.service';
import { TeacherAppPdfService } from 'src/app/makePDF/teacher-app-pdf.service';
@Component({
  selector: 'app-teacher-work-experience',
  templateUrl: './teacher-work-experience.component.html',
  styleUrls: ['./teacher-work-experience.component.css']
})
export class TeacherWorkExperienceComponent implements OnInit {
  teacherForm: FormGroup;
  applicationId: any;
  loginUserNameForChild: any;
  kvicons: string;
  kvCode: any;
  responseData:any;
  tempTeacherId: any;
  tchExpList: any[] = [];
  subjectListNameCode2: any[] = [];
  subjectList: any;
  workExpId: any;
  selectedUdiseCode: any;
  subjectListNameCode1: any[] = [];
  indexNew: any;
  selectStationName: any;
  regionShow: boolean = false;
  zoneShow: boolean = false;
  stationShow: boolean = false;
  schoolShow: boolean = false;
  showSchoolType: boolean = false;
  headQuaterShow: boolean = false;
  selectHeadQuaterZoneRegion = false;
  selectedSchoolType: any;
  selectSchoolType: any;
  stationList: any;
  kvSchoolList: any;
  headQuaterList: any = [];
  zoneList: any = [];
  selectRegionList: any = [];
  selectedKvCode: any;
  selectedKvname: any;
  enableInstitution: any = false;
  shiftYN: any;
  teacherTypeData: any;
  teacherTypeDataNameCode: any = [];
  workExperienceArray: any = [];
  spouseTypeData: any;
  spouseTypeDataNameCode: any;
  formDataList: any;
  @ViewChild('selectSchoolModal', { static: true }) selectSchoolModal: TemplateRef<any>;
  transferGroundList: any;
  profileTeacherName: any;
  constructor(private pdfServive: TeacherAppPdfService,private router: Router, private date: DatePipe, private dataService: DataService,
    private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private _adapter: DateAdapter<any>) {
    }
  ngOnInit(): void {
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.profileTeacherName=sessionStorage.getItem('profileTeacherName');
    this.teacherForm= this.fb.group({
      'workExperienceForm': new FormArray([]),
    });
    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround
    this.getTchExpByTchId();
    this.getAllMaster();
  }
  detailsOfPosting(): FormArray {
    return this.teacherForm.get("workExperienceForm") as FormArray
  }
  getTchExpByTchId() {
    (this.teacherForm.controls['workExperienceForm'] as FormArray).clear();
    this.tchExpList = [];
    this.subjectListNameCode2 = [];
    if (this.tempTeacherId) {
      this.outSideService.fetchTchExpByTchId(this.tempTeacherId).subscribe((res) => {
        this.tchExpList = res.response;
        console.log("-------------teacher exp-------------")
        console.log(this.tchExpList)
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
            ((this.teacherForm.get('workExperienceForm') as FormArray).at(i) as FormGroup).get('workStartDate');
            ((this.teacherForm.get('workExperienceForm') as FormArray).at(i) as FormGroup).get('workEndDate');
            ((this.teacherForm.get('workExperienceForm') as FormArray).at(i) as FormGroup).get('groundForTransfer');

            ((this.teacherForm.get('workExperienceForm') as FormArray).at(i) as FormGroup).get('positionType');
            ((this.teacherForm.get('workExperienceForm') as FormArray).at(i) as FormGroup).get('appointedForSubject');
            if (sessionStorage.getItem('shiftAvailable') == '0') {
              ((this.teacherForm.get('workExperienceForm') as FormArray).at(i) as FormGroup).get('shiftType');
            }
          }
          if (this.tchExpList[i].shift_yn == '0') {
            ((this.teacherForm.get('workExperienceForm') as FormArray).at(i) as FormGroup).get('shiftType');
          }  
          if (this.tchExpList[i].shift_yn == '0') {
            ((this.teacherForm.get('workExperienceForm') as FormArray).at(i) as FormGroup).get('shiftType');
          }
        }
      })
    } 
  }
  addQuantity(data) {
    this.detailsOfPosting().push(this.newQuantity(data));
    console.log( this.detailsOfPosting())
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
        experienceType: experienceType,
        groundForTransfer: parseInt(data.groundForTransfer),
        currentlyActiveYn: data.currentlyActiveYn,
        shiftYn: data.shift_yn,
        buttonType:'update',
        udiseSchoolName: [data.udiseSchoolName, [Validators.required]],
        udiseSchCode: [data.udiseSchCode, [Validators.required]],
        workStartDate: [data.workStartDate, [Validators.required]],
        workEndDate:data.workEndDate,
        positionType: data.positionType,
        appointedForSubject: data.appointedForSubject,
        kvCode: [data.kvCode, [Validators.required]],
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        workExperienceId: '',
        experienceType: '',
        shiftType: '',
        buttonType:'save',
        groundForTransfer: ["", [Validators.required]],
        currentlyActiveYn: '',
        udiseSchoolName: ["", [Validators.required]],
        udiseSchCode: ["", [Validators.required]],
        workStartDate: ["", [Validators.required]],
        workEndDate: '',
        positionType: ["", [Validators.required]],
        appointedForSubject: "",
        shiftYn: '',
        kvCode: ['', [Validators.required]],
      })
    }
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
  selectExperianceSchool(val) {
    this.selectedUdiseCode = '';
    this.indexNew = val;
    this.modalService.open(this.selectSchoolModal, { size: 'xl', backdrop: 'static', keyboard: false })
  }
  setSchoolType(event) {
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
        debugger
        if (this.selectRegionList[i].kv_code == id.target.value) {
          this.selectedKvCode = this.selectRegionList[i].kv_code
          this.selectedKvname = this.selectRegionList[i].kv_name
          this.selectStationName = this.selectRegionList[i].station_name
        }
      }
    }
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
  getKvSchoolByStationId(event) {
    this.selectedUdiseCode = '';
    this.kvSchoolList = []
    this.outSideService.fetchKvSchoolByStationCode(event.target.value).subscribe((res) => {
    this.kvSchoolList = res.response;
    })
  }
  setUdiseCode(event) {
    this.selectedUdiseCode = event.target.value;
  }
  selectSchoolByUdise() {
    this.enableInstitution = true;
    ((this.teacherForm.get('workExperienceForm') as FormArray).at(this.indexNew) as FormGroup).get('udiseSchoolName').patchValue(name);
    if (this.selectSchoolType == 1) {
      for (let i = 0; i < this.kvSchoolList.length; i++) {
        if (this.kvSchoolList[i].udiseSchCode == this.selectedUdiseCode) {
          this.shiftYN = this.kvSchoolList[i].shiftYn
          this.setTeacherPostingData(this.kvSchoolList[i].kvName, this.kvSchoolList[i].kvCode, this.selectedSchoolType)
        }
      }
    }
    else if(this.selectSchoolType == 5){
      this.setTeacherPostingData('DEPUTATION', '77777', this.selectedSchoolType)
    }
    else {
      this.setTeacherPostingData(this.selectedKvname, this.selectedKvCode, this.selectedSchoolType)
    }
  }
  setTeacherPostingData(name, kvCode, schoolType) {
    ((this.teacherForm.get('workExperienceForm') as FormArray).at(this.indexNew) as FormGroup).get('udiseSchoolName').patchValue(name);
    ((this.teacherForm.get('workExperienceForm') as FormArray).at(this.indexNew) as FormGroup).get('experienceType').patchValue(schoolType);
    ((this.teacherForm.get('workExperienceForm') as FormArray).at(this.indexNew) as FormGroup).get('udiseSchCode').patchValue(kvCode);
    ((this.teacherForm.get('workExperienceForm') as FormArray).at(this.indexNew) as FormGroup).get('kvCode').patchValue(kvCode);

    if (this.shiftYN == '0' || this.shiftYN == 0) {
      ((this.teacherForm.get('workExperienceForm') as FormArray).at(this.indexNew) as FormGroup).get('shiftYn').patchValue('0');
      ((this.teacherForm.get('workExperienceForm') as FormArray).at(this.indexNew) as FormGroup).get('shiftType');
    } else if (this.shiftYN == '1' || this.shiftYN == 1) {
      ((this.teacherForm.get('workExperienceForm') as FormArray).at(this.indexNew) as FormGroup).get('shiftYn').patchValue('1');
      ((this.teacherForm.get('workExperienceForm') as FormArray).at(this.indexNew) as FormGroup).get('shiftType');
    }
  }
  experienceDataManagement(event, index,type) {
    ((this.teacherForm.get('workExperienceForm') as FormArray).at(0) as FormGroup).get('workStartDate');
    for (let i = 0; i < this.teacherForm.value.workExperienceForm.length - 1; i++) {
      var dateFrom = this.teacherForm.value.workExperienceForm[i].workStartDate;
      var dateTo = this.teacherForm.value.workExperienceForm[i].workEndDate;
      var dateCheck;
      if(event.target.value =='undefined'){
        dateCheck =event.target.value;
        
      }else{
        dateCheck = moment(event.value?._d).format("YYYY-MM-DD");
      }
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
          this.teacherForm.value.workExperienceForm[index].workStartDate = "";
          this.teacherForm.value.workExperienceForm[index].workEndDate = "";
        }, 200);
      }
    }
    ((this.teacherForm.get('workExperienceForm') as FormArray).at(0) as FormGroup).get('workStartDate');
    return false;
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

dateCheck(dateFrom, dateTo, dateCheck,type) {
  var from = Math.round((new Date(dateFrom).getTime())/(3600000*24));
  var to = Math.round((new Date(dateTo).getTime())/(3600000*24));
  var check = Math.round((new Date(dateCheck).getTime())/(3600000*24));
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

    this.outSideService.fetchAllMaster(1).subscribe((res) => {
      this.spouseTypeData = res.response.postionType;
      this.spouseTypeDataNameCode = [];
      for (let i = 0; i < this.spouseTypeData.length; i++) {
        var concatElement;
        concatElement = this.spouseTypeData[i].organizationTeacherTypeName;
        concatElement = concatElement + "(" + this.spouseTypeData[i].teacherTypeId + ")";
        var data = {
          'nameCode': concatElement,
          'teacherTypeId': this.spouseTypeData[i].teacherTypeId
        }
        this.spouseTypeDataNameCode.push(data)
      }
    })
  }
  teacherTypeSelectExp(event, index) {
    var data = {
      "applicationId": this.applicationId,
      "teacherTypeId": event.target.value
    }
    this.getSubjectByTchTypeExp(data, index);
  }
  removeQuantity(val) {
    debugger
      let deletedData = this.teacherForm.value.workExperienceForm[val]
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
  previousPage(){
    this.router.navigate(['/teacher/teacherBasicProfile']);
  }
  onNextClick(){
    if(this.teacherForm.value.workExperienceForm.length<1){
      Swal.fire(
        'Plese fill Experience!',
        '',
        'error'
      )
    }
    else{
      this.router.navigate(['/teacher/teacherPreviewConfirm']);
    }
  }
  onSaveExperience(event:any){
 console.log(event)
 this.workExperienceArray=[];
    for (let i = 0; i < this.teacherForm.value.workExperienceForm.length; i++) {
      if (this.teacherForm.value.workExperienceForm[i].workEndDate == '' || this.teacherForm.value.workExperienceForm[i].workEndDate == null ) {
        this.teacherForm.value.workExperienceForm[i].currentlyActiveYn = '1';
      } else {
        this.teacherForm.value.workExperienceForm[i].currentlyActiveYn = '0';
      }
    }
    for (let i = 0; i < this.teacherForm.value.workExperienceForm.length; i++) {
    if(i==event){
      this.workExperienceArray.push(this.teacherForm.value.workExperienceForm[i])
    }
    }
    var data={
      "teacherId":this.workExperienceArray['0']['teacherId'],
      "udiseSchCode":this.workExperienceArray['0']['udiseSchCode'],
      "workStartDate":this.workExperienceArray['0']['workStartDate'],
      "workEndDate":this.workExperienceArray['0']['workEndDate'],
      "positionType":this.workExperienceArray['0']['positionType'],
      "appointedForSubject":this.workExperienceArray['0']['appointedForSubject'],
      "udiseSchoolName":this.workExperienceArray['0']['udiseSchoolName'],
      "shiftType":this.workExperienceArray['0']['shiftType'],
      "shiftYn":this.workExperienceArray['0']['shiftYn'],
      "kvCode":this.workExperienceArray['0']['kvCode'],
      "groundForTransfer":this.workExperienceArray['0']['groundForTransfer'],
      "currentlyActiveYn":this.workExperienceArray['0']['currentlyActiveYn'],
      "createdBy":'',
      "workExperienceId":this.workExperienceArray['0']['workExperienceId'],
      "experienceType":this.workExperienceArray['0']['experienceType']
      }
      if (this.teacherForm.controls.workExperienceForm.status == 'VALID') {
        this.outSideService.saveWorkExperienceV2(data).subscribe((res) => {
          debugger
          var responsePosting = res.status;
   
          if (responsePosting == '1') {
            Swal.fire(
              'Your Data has been saved Successfully!',
              '',
              'success'
            )
            this.getTchExpByTchId();
          } else if (responsePosting == '0') {
            Swal.fire(
              'Some thing wen wrong!',
              '',
              'error'
            )
          }
        })
      } else {
        ((this.teacherForm.get('workExperienceForm') as FormArray).at(0) as FormGroup).get('workStartDate');
        ((this.teacherForm.get('workExperienceForm') as FormArray).at(0) as FormGroup).get('positionType');
        ((this.teacherForm.get('workExperienceForm') as FormArray).at(0) as FormGroup).get('appointedForSubject');
        Swal.fire(
          'Please enter the required data!',
          '',
          'error'
        )
      }
  }
}
