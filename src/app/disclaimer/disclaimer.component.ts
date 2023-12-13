import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/AuthService'
import { Router, ActivatedRoute } from '@angular/router';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { OutsideServicesService } from '../service/outside-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {
  disclaimerForm: FormGroup;
  declarationStr:any;
  declaration: boolean = false;
  declarationStrShow: boolean = false;
  responseData : any ;
  tempTeacherId: string;
  kvCode: any;
  buttonShow: boolean = true;
  constructor(private outSideService: OutsideServicesService,private router: Router) { }

  ngOnInit(): void {
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.tempTeacherId = sessionStorage.getItem("teacherId");
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }

    console.log( this.tempTeacherId)
    console.log( this.kvCode)
    this.disclaimerForm = new FormGroup({
      policyCheckBox: new FormControl('', Validators.required),
   //   ldceSelectBox: new FormControl('', Validators.required),
      policyRaioButtonOne: new FormControl('', Validators.required),
      customSelectOne: new FormControl('', Validators.required),
      customSelectTwo: new FormControl('', Validators.required),
      testFieldOne: new FormControl('', Validators.required),
      customSelectThree: new FormControl('', Validators.required),
      customSelectFour: new FormControl('', Validators.required),
      testFieldTwo: new FormControl('', Validators.required),
    });
    this.getDisclaimerValue();
  }
  getDisclaimerValue()
  {
    const dataOne={
      teacherId:this.tempTeacherId
    }
    this.outSideService.getTransferDeclaration(this.tempTeacherId).subscribe((res) => {
      console.log(res)
      this.responseData=res.response;
      if(res.status==1)
      {
        this.buttonShow=false
        this.declarationStrShow=true
      this.disclaimerForm.patchValue({
        declarationStr: this.responseData.declarationStr,
       // ldceSelectBox:this.responseData.ldceYn,
        policyCheckBox:this.responseData.transferGoneThrough,
        policyRaioButtonOne:this.responseData.filledCase,
      })
      if(this.responseData.filledCase==0)
      {
        this.declaration=true ;
      }
    }
    });
  }
  declarationShow(value:any){
     if(value==1){
      this.declaration=false ;
    }else{
      this.declaration=true ;
    }
  }
 
  onSubmit(event:any) {
    var activeButton = document.activeElement.id;
    console.log(activeButton)
    console.log(event)
 
  if(activeButton=="submit1")
  {
    debugger
  console.log(this.disclaimerForm.value)
  this.declarationStr='I'+' '+ this.disclaimerForm.value.customSelectOne+' '+'filed and I'+' ' + this.disclaimerForm.value.customSelectTwo + ' '+ 'a party to case number'+ ' ' + this.disclaimerForm.value.testFieldOne +' '+ 'which is'+ ' ' + this.disclaimerForm.value.customSelectThree + 
  ' '+'before(specify the name of the' +' ' +  this.disclaimerForm.value.customSelectFour + ' ' + 'court/tribunal )'+' ' + this.disclaimerForm.value.testFieldTwo;
 
 // this.disclaimerForm.value.customSelectThree  // send in service
  const data ={
    teacherId:this.tempTeacherId,
    transferGoneThrough:this.disclaimerForm.value.policyCheckBox,
    filledCase:this.disclaimerForm.value.policyRaioButtonOne,
  //  ldceYn:this.disclaimerForm.value.ldceSelectBox,
    declarationStr:this.declarationStr
  }
  console.log(data)
 
  this.outSideService.saveTransferDeclaration(data).subscribe((res) => {
  console.log(res);
    if(res.id!='')
    {
        this.router.navigate(['/teacher/kvsteachertransfer']);
 
      Swal.fire(
        'Your Undertaking has been saved Successfully!',
        '',
        'success'
      )
    }

  }) 
  
} 
}
}
