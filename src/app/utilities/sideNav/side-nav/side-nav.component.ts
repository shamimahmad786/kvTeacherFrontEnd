import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  imageData: any = "";
  firstName: any;
  lastName: any;
  teacherId:any;
  basicProfile: any = false;
  workExperience: any = false;
  leaveManagement:any = false;
  PreviewConfirm: any = false;

  formRoutingObj:any;
  miscellaneous: any = false;
  stationChoice: any = false;
  previewUnderTaking: any = false;

  tempTeacherId: string;
  constructor(private outSideService: OutsideServicesService,private route: ActivatedRoute) { }
  public ngOnInit(): void {
   this.basicProfile=true;
   this.workExperience=true;
   this.leaveManagement = true;
   this.PreviewConfirm=true;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.firstName = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.firstname;
      this.lastName = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.lastname;
      this.teacherId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.user_name;
    }
    this.getProfileImage();
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    $("#imageUpload").change(function () {
      readURL(this);
    });
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
   setTimeout(() => {
    this.getFormStatusLinkV2();
   },1000)
  }

  getFormStatusLinkV2(){
    debugger
  
  // this.formRoutingObj = this.route.snapshot.queryParamMap.get('form');

 this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    var data ={
      "teacherId": this.tempTeacherId
    }
    this.outSideService.getFormStatusV2(data).subscribe((res) => {
     
     if(res.response['form1Status']=='1' ){
      this.miscellaneous=true;
     }
     if(res.response['form2Status']=='1'){
      this.stationChoice=true;
     }
     if(res.response['form3Status']=='1'){
      this.previewUnderTaking=true;
     }
   
    })
  }
  // getTeacherConfirmation(){
  //   var data = {"teacherId": this.teacherId}
  //   this.outSideService.getTeacherConfirmationV2(data).subscribe((res)=>{
  //     debugger
  //     if(res){
  //     }   
  // },
  // error => {
  //   Swal.fire({
  //     'icon':'error',
  //     'text':error.error
  //   }  
  //   )
  // })
  // }
  fileToUpload: File | null = null;
  documentUpload(index) {
    const formData = new FormData();
    if (this.fileToUpload != null) {
      formData.append('teacherId', JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name);
      formData.append('file', this.fileToUpload);
      formData.append('filename', "ProfilePic");

      this.outSideService.uploadProfileImage(formData).subscribe((res) => {
        this.getProfileImage();
      })
    } else {

    }
  }

  handleFileInput(files: FileList, index) {    
    var data = files.item(0).name
    var splitted = data.split('.', 2)
    if (splitted[1] == 'jpg' || splitted[1] == 'jpeg' || splitted[1] == 'PNG' || splitted[1] == 'png') {
      if (files.item(0).size <= 204800) {
        this.fileToUpload = files.item(0);
        this.documentUpload(0);
      }
    }
  }

  getProfileImage() {
    this.outSideService.getProfileImage(JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name).subscribe((res) => {
          if(res.status == '1' || res.status == '1'){
            this.imageData = "data:image/jpg;base64," + res.data;
          }else if(res.status == '0' || res.status == '0'){
            this.imageData = 'assets/assets/img/download.jpg';
          }
    },
      error => {
        this.imageData = 'assets/assets/img/download.jpg';
      })
  }
}
