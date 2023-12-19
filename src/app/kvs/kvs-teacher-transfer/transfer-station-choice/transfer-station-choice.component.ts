import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-transfer-station-choice',
  templateUrl: './transfer-station-choice.component.html',
  styleUrls: ['./transfer-station-choice.component.css']
})
export class TransferStationChoiceComponent implements OnInit {
  transferForm: FormGroup;
  transDisable: boolean = false;
  formStatusLocale: any;
  statUsMessage:any
  AllregionList: any;
  @ViewChild('selectSchoolModal', { static: true }) selectSchoolModal: TemplateRef<any>;
  @ViewChild('selectSchoolModalInterStation', { static: true }) selectSchoolModalInterStation: TemplateRef<any>;
  position: any;
  applicationId: any;
  loginUserNameForChild: any;
  kvicons: any;
  kvCode: any;
  tempTeacherId: any;
  onlyDcFill: boolean = false;
  showTcField: boolean = false;
  regionList: any;
  disabled = true;
  constructor(private outSideService: OutsideServicesService,private modalService: NgbModal) { }

  ngOnInit(): void {
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
      }),
    })
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.getKvRegion();
  }
  selectSchool(val) {

    this.position = val;


    // this.getKvRegion();
    this.getTransferRegionsByEmployee()
  }
  getKvRegion() {
     
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      this.regionList = res.response.rowValue;

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
  }
}
