import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { BloodGroupPipe, DisabilityPipe, TransferGroundPipe } from '../utilities/myPipe/myPipe';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TeacherAppPdfService {


  teacherTrainingArray: any[] = [];
  teacherTrainingDisplacementDataArray: any[] = [];
  acdQualificationArray:any;
  profQualificationArray:any;
  trainingReceivedArray:any;
  awardReceivedArray:any;
  workExperienceArray:any;
  teacherMissleniusDataArray:any;
  workExpHead = [['School Name ', 'From','To','Position Held','Appointed for Subject','Transfer Ground']]
  //acdHead = [['Qualifications', 'Major Subject', 'Minor Subject', 'Board/University', 'School/College', 'Year of Passing']]
  teacherStationChiceHead = [['Station One', 'Station Two', 'Station three', 'Station Four', 'Station Five']]
  teacherStationChiceDisplacementHead = [['Station One', 'Station Two', 'Station three', 'Station Four', 'Station Five']]
  profHead = [['Qualifications', 'Subject', 'Board/University', 'Institution', 'Year of Passing']]
  awardHead = [['Award Name', 'Year', 'Award By', 'Remark']]
  trainingHead = [['Training Name', 'Year', 'Organised By', 'Place']]

  yPoint: any;


  currentDate: any;
  absencedays: any;

  constructor(private date: DatePipe) {




  }

  testFnc(teacherProfile, kvNameCode, stationNameCode, workExperience,teacherStationChioc) {

    console.log("pdf data")
    debugger
console.log(teacherStationChioc)
    const transferGround = new TransferGroundPipe();
    var teacherTrainingData= [];
    this.absencedays =teacherStationChioc['absenceDaysOne'].toString();
    teacherTrainingData.push(teacherStationChioc['choiceKv1StationName'])
    teacherTrainingData.push(teacherStationChioc['choiceKv2StationName'])
    teacherTrainingData.push(teacherStationChioc['choiceKv3StationName'])
    teacherTrainingData.push(teacherStationChioc['choiceKv4StationName'])
    teacherTrainingData.push(teacherStationChioc['choiceKv5StationName'])
    this.teacherTrainingArray.push(teacherTrainingData)
    console.log(this.teacherTrainingArray)
    var teacherTrainingDisplacementData= [];
    teacherTrainingDisplacementData.push(teacherStationChioc['displacement1StationName'])
    teacherTrainingDisplacementData.push(teacherStationChioc['displacement2StationName'])
    teacherTrainingDisplacementData.push(teacherStationChioc['displacement3StationName'])
    teacherTrainingDisplacementData.push(teacherStationChioc['displacement4StationName'])
    teacherTrainingDisplacementData.push(teacherStationChioc['displacement5StationName'])
    this.teacherTrainingDisplacementDataArray.push(teacherTrainingDisplacementData)

    
    // this.acdQualificationArray = [];
    // for(let i=0; i<acdQualification.length; i++){
    //   var acdQualTemp = [];
    //   acdQualTemp.push(acdQualification[i]?.degreeName)
    //   acdQualTemp.push(acdQualification[i]?.qualificationDegreeMajor)
    //   acdQualTemp.push(acdQualification[i]?.qualificationDegreeMinor)
    //   acdQualTemp.push(acdQualification[i]?.boardUniversity)
    //   acdQualTemp.push(acdQualification[i]?.institution)
    //   acdQualTemp.push(acdQualification[i]?.yearOfPassing)

    //   this.acdQualificationArray.push(acdQualTemp)
    // }

    // this.profQualificationArray = [];
    // for(let i=0; i<profQual.length; i++){
    //   var profQualTemp = [];
    //   profQualTemp.push(profQual[i]?.degreeName)
    //   profQualTemp.push(profQual[i]?.qualificationDegreeMajor)
    //   profQualTemp.push(profQual[i]?.boardUniversity)
    //   profQualTemp.push(profQual[i]?.institution)
    //   profQualTemp.push(profQual[i]?.yearOfPassing)

    //   this.profQualificationArray.push(profQualTemp)
    // }

    // this.awardReceivedArray = [];
    // for(let i=0; i<awardReceived.length; i++){
    //   var awardReceivedTemp = [];
    //   awardReceivedTemp.push(awardReceived[i]?.awardName)
    //   awardReceivedTemp.push(awardReceived[i]?.awardYear)
    //   awardReceivedTemp.push(awardReceived[i]?.awardBy)
    //   awardReceivedTemp.push(awardReceived[i]?.remarks)

    //   this.awardReceivedArray.push(awardReceivedTemp)
    // }

    // this.trainingReceivedArray = [];
    // for(let i=0; i<trainingReceived.length; i++){
    //   var trainingReceivedTemp = [];
    //   trainingReceivedTemp.push(trainingReceived[i]?.trainingName)
    //   trainingReceivedTemp.push(trainingReceived[i]?.trainingYear)
    //   trainingReceivedTemp.push(trainingReceived[i]?.trainingOrganizedBy)
    //   trainingReceivedTemp.push(trainingReceived[i]?.place)

    //   this.trainingReceivedArray.push(trainingReceivedTemp)
    // }


    this.workExperienceArray = [];
    for(let i=0; i<workExperience.length; i++){
      var workExperienceTemp = [];
      workExperienceTemp.push(workExperience[i]?.udiseSchoolName)
     // workExperienceTemp.push(workExperience[i]?.shiftType)
      // workExperienceTemp.push( this.date.transform(new Date( workExperience[i]?.workStartDate ), 'dd-MM-yyyy'))
      workExperienceTemp.push(workExperience[i]?.workStartDate)
      if(workExperience[i]?.workEndDate != null && workExperience[i]?.workEndDate != 'null'){
        // workExperienceTemp.push( this.date.transform(new Date( workExperience[i]?.workEndDate ), 'dd-MM-yyyy'))
        workExperienceTemp.push(workExperience[i]?.workEndDate)
      }else{
        workExperienceTemp.push(workExperience[i]?.workEndDate)
      }
   //   workExperienceTemp.push(workExperience[i]?.natureOfAppointment == '1'?'Regular':'Not Applicable')
      workExperienceTemp.push(workExperience[i]?.positionType)
      workExperienceTemp.push(workExperience[i]?.appointedForSubject)
      workExperienceTemp.push(workExperience[i].groundForTransfer == 'null' ? '':workExperience[i]?.groundForTransfer.toUpperCase())

      this.workExperienceArray.push(workExperienceTemp)
    }

    

    const disabilityPipe = new DisabilityPipe();
    const bloodGroupPipe = new BloodGroupPipe();
    

    this.currentDate = new Date();
    this.currentDate = "(" + this.currentDate + ")"
    var tchId = "" + teacherProfile.teacherId + ""
    const doc = new jsPDF('l', 'mm', 'a4');


    doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
    doc.setLineWidth(1);
    doc.line(15, 35, 280, 35);
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Basic Profile', 15, 45)

    //1.1
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('KV / Institution Code', 15, 52)

    // doc.setFont('Times-Roman', 'normal');
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(10);
    // if(teacherProfile?.currentUdiseSchCode == null || teacherProfile?.currentUdiseSchCode == 'null' || teacherProfile?.currentUdiseSchCode == ''){
    //   doc.text('Not Given', 85, 52)
    // }else{
    //   doc.text(teacherProfile?.currentUdiseSchCode, 85, 52)
    // }

 

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('KV/RO/ZIET/HQ Name', 15, 52)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(kvNameCode == null || kvNameCode == 'null' || kvNameCode == ''){
      doc.text('NOt GIVEN', 85, 52)
    }else{
      doc.text(kvNameCode, 85, 52)
    }

    

    //1.2
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Employee Code', 140, 52)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherEmployeeCode == null || teacherProfile?.teacherEmployeeCode == 'null' || teacherProfile?.teacherEmployeeCode == ''){
      doc.text('NOt GIVEN', 205, 52)
    }else{
      doc.text(teacherProfile?.teacherEmployeeCode, 205, 52)
    }

    

    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Teacher Id', 140, 59)

    // doc.setFont('Times-Roman', 'normal');
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(10);
    // if(tchId == null ||tchId == 'null' || tchId == ''){
    //   doc.text('Not Given', 205, 59)
    // }else{
    //   doc.text(tchId, 205, 59)
    // }

    

    //1.3
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Name', 15, 60)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherName == null || teacherProfile?.teacherName == 'null' || teacherProfile?.teacherName == ''){
      doc.text('NOt GIVEN', 85, 60)
    }else{
      doc.text(teacherProfile?.teacherName.toUpperCase(), 85, 60)
    }

 

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Gender', 140, 60)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherGender == null || teacherProfile?.teacherGender == 'null' || teacherProfile?.teacherGender == ''){
      doc.text('NOt GIVEN', 205, 60)
    }else{
      doc.text(teacherProfile?.teacherGender == '1' ? 'MALE' : 'FEMALE', 205, 60)
    }

   

    //1.4
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Date of Birth', 15, 67)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherDob == null || teacherProfile?.teacherDob == 'null' || teacherProfile?.teacherDob == ''){
      doc.text('NOt GIVEN', 85, 67)
    }else{
      doc.text(this.date.transform(new Date(teacherProfile?.teacherDob ), 'dd-MM-yyyy'), 85, 67)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Email', 140, 67)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherEmail == null || teacherProfile?.teacherEmail == 'null' || teacherProfile?.teacherEmail == ''){
      doc.text('NOt GIVEN', 205, 67)
    }else{
      doc.text(teacherProfile?.teacherEmail.toUpperCase(), 205, 67)
    }

  

    //1.5
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Mobile Number', 15, 74)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherMobile == null || teacherProfile?.teacherMobile == 'null' || teacherProfile?.teacherMobile == ''){
      doc.text('NOt GIVEN', 85, 74)
    }else{
      doc.text(teacherProfile?.teacherMobile, 85, 74)
    }

  
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Nature of Appointment', 140, 80)

    // doc.setFont('Times-Roman', 'normal');
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(10);
    // if(teacherProfile?.natureOfAppointment == null || teacherProfile?.natureOfAppointment == 'null' || teacherProfile?.natureOfAppointment == ''){
    //   doc.text('Regular', 205, 80)
    // }else{
    //   doc.text(teacherProfile?.natureOfAppointment == '1' ? 'Regular' : 'Not Available', 85, 115)
    // }





    //1.6
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Marital Status', 15, 81)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.maritalStatus == null || teacherProfile?.maritalStatus == 'null' || teacherProfile?.maritalStatus == ''){
      doc.text('NOt GIVEN', 85, 81)
    }else{
      doc.text(teacherProfile?.maritalStatus == '1' ? 'MARRIED' : teacherProfile?.maritalStatus == '4' ?'SINGLE' : teacherProfile?.maritalStatus == '7' ?  'WIDOW/WIDOWER' :' ', 85, 81)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Present Station Name', 140, 75)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(stationNameCode == null || stationNameCode == 'null' || stationNameCode == ''){
      doc.text('NOt GIVEN', 205, 75)
    }else{
      doc.text(stationNameCode.toUpperCase(), 205, 75)
    }

    

    //1.7
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('DoJ in Present Station Irrespective of Cadre', 15, 88)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.workExperiencePositionTypePresentStationStartDate == null || teacherProfile?.workExperiencePositionTypePresentStationStartDate == 'null' || teacherProfile?.workExperiencePositionTypePresentStationStartDate == ''){
      doc.text('NOt GIVEN', 85, 88)
    }else{
      doc.text(this.date.transform(new Date(teacherProfile?.workExperiencePositionTypePresentStationStartDate ), 'dd-MM-yyyy') , 105, 88)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('	DoJ in Present KV/RO/ZIET/HQ in Present Post', 6, 94)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.workExperienceWorkStartDatePresentKv == null || teacherProfile?.workExperienceWorkStartDatePresentKv == 'null' || teacherProfile?.workExperienceWorkStartDatePresentKv == ''){
      doc.text('NOt GIVEN', 85, 94)
    }else{
      doc.text(this.date.transform(new Date( teacherProfile?.workExperienceWorkStartDatePresentKv ), 'dd-MM-yyyy'), 105, 94)
    }

   

    //1.8
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Present Post Name', 15, 101)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.lastPromotionPositionType == null || teacherProfile?.lastPromotionPositionType == 'null' || teacherProfile?.lastPromotionPositionType == ''){
      doc.text('NOt GIVEN', 85, 101)
    }else{
      doc.text(teacherProfile?.lastPromotionPositionType.toUpperCase(), 85, 101)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('DoJ in KVS', 140, 82)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.lastPromotionPositionDate == null || teacherProfile?.lastPromotionPositionDate == 'null' || teacherProfile?.lastPromotionPositionDate == ''){
      doc.text('NOt GIVEN', 205, 82)
    }else{
      doc.text(this.date.transform(new Date(teacherProfile?.lastPromotionPositionDate ), 'dd-MM-yyyy') , 205, 82  )
    }
    

    //1.9
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Subject Name', 15, 108)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.workExperienceAppointedForSubject == null || teacherProfile?.workExperienceAppointedForSubject == 'null' || teacherProfile?.workExperienceAppointedForSubject == ''){
      doc.text('NOt GIVEN', 85, 108)
    }else{
      doc.text(teacherProfile?.workExperienceAppointedForSubject.toUpperCase(), 85, 108)
    }

   

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Staff Type', 140, 90)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teachingNonteaching == null || teacherProfile?.teachingNonteaching == 'null' || teacherProfile?.teachingNonteaching == ''){
      doc.text('NOt GIVEN', 205, 90)
    }else{
      doc.text(teacherProfile?.teachingNonteaching == '1' ? 'TEACHING' : 'NON-TEACHING', 205, 90)
    }

   

    //1.10
   

    

    //Personal Information
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Personal Information', 15, 125)

    //2.1
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Blood Group', 15, 132)

    // doc.setFont('Times-Roman', 'normal');
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(10);
    // if(teacherProfile?.teacherBloodGroup == null || teacherProfile?.teacherBloodGroup == 'null' || teacherProfile?.teacherBloodGroup == ''){
    //   doc.text('Not Given', 85, 132)
    // }else{
    //   doc.text(bloodGroupPipe.transform(teacherProfile?.teacherBloodGroup), 85, 132)
    // }
    

    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Pan Number', 140, 132)

    // doc.setFont('Times-Roman', 'normal');
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(10);
    // if(teacherProfile?.teacherPanNumber == null || teacherProfile?.teacherPanNumber == 'null' || teacherProfile?.teacherPanNumber == ''){
    //   doc.text('Not Given', 205, 132)
    // }else{
    //   doc.text(teacherProfile?.teacherPanNumber, 205, 132)
    // }
    

    //2.2
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Correspondence Address', 15, 141)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherCorrespondenceAddress == null || teacherProfile?.teacherCorrespondenceAddress == 'null' || teacherProfile?.teacherCorrespondenceAddress == ''){
      doc.text('NOt GIVEN', 85, 141)
    }else{
      doc.text(teacherProfile?.teacherCorrespondenceAddress.toUpperCase(), 85, 141)
    }

    

    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Staff Type', 140, 139)

    // doc.setFont('Times-Roman', 'normal');
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(10);
    // doc.text(teacherProfile?.teachingNonteaching == '1' ? 'Teaching' : 'Non-Teaching', 205, 139)

    //2.3
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Correspondence State', 15, 148)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherCorrespondenceState == null || teacherProfile?.teacherCorrespondenceState == 'null' || teacherProfile?.teacherCorrespondenceState == ''){
      doc.text('NOt GIVEN', 85, 148)
    }else{
      doc.text(teacherProfile?.teacherCorrespondenceState.toUpperCase(), 85, 148)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Correspondence District', 140, 148)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherCorrespondenceDistrict == null || teacherProfile?.teacherCorrespondenceDistrict == 'null' || teacherProfile?.teacherCorrespondenceDistrict == ''){
      doc.text('NOt GIVEN', 205, 148)
    }else{
      doc.text(teacherProfile?.teacherCorrespondenceDistrict.toUpperCase(), 205, 148)
    }

    

    //2.4
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Correspondence Pin Code', 15, 155)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherCorrespondencePin == null || teacherProfile?.teacherCorrespondencePin == 'null' || teacherProfile?.teacherCorrespondencePin == ''){
      doc.text('NOt GIVEN', 85, 155)
    }else{
      doc.text(teacherProfile?.teacherCorrespondencePin, 85, 155)
    }

   

    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Staff Type', 140, 153)

    // doc.setFont('Times-Roman', 'normal');
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(10);
    // doc.text(teacherProfile?.teachingNonteaching == '1' ? 'Teaching' : 'Non-Teaching', 205, 153)

    //2.5
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Home Town Address as per Service Record', 15, 164)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherPermanentAddress == null || teacherProfile?.teacherPermanentAddress == 'null' || teacherProfile?.teacherPermanentAddress == ''){
      doc.text('NOt GIVEN', 97, 164)
    }else{
      doc.text(teacherProfile?.teacherPermanentAddress.toUpperCase(), 97, 164)
    }

   

    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Staff Type', 140, 160)

    // doc.setFont('Times-Roman', 'normal');
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(10);
    // doc.text(teacherProfile?.teachingNonteaching == '1' ? 'Teaching' : 'Non-Teaching', 205, 160)

    //2.6
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('State', 15, 171)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherParmanentState == null || teacherProfile?.teacherParmanentState == 'null' || teacherProfile?.teacherParmanentState == ''){
      doc.text('NOt GIVEN', 85, 171)
    }else{
      doc.text(teacherProfile?.teacherParmanentState.toUpperCase(), 85, 171)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('District', 140, 171)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherPermanentDistrict == null || teacherProfile?.teacherPermanentDistrict == 'null' || teacherProfile?.teacherPermanentDistrict == ''){
      doc.text('NOt GIVEN', 205, 171)
    }else{
      doc.text(teacherProfile?.teacherPermanentDistrict.toUpperCase(), 205, 171)
    }

   

    //2.7
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Pin Code', 15, 178)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherPermanentPin == null || teacherProfile?.teacherPermanentPin == 'null' || teacherProfile?.teacherPermanentPin == ''){
      doc.text('NOt GIVEN', 85, 178)
    }else{
      doc.text(teacherProfile?.teacherPermanentPin, 85, 178)
    }

    

    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Permanent District', 140, 174)

    // doc.setFont('Times-Roman', 'normal');
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(10);
    // doc.text(teacherProfile?.teacherPermanentDistrict, 205, 174)

    //Date and Time
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Report Generation Date & Time', 175, 200)

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'normal');
    doc.text(this.currentDate.toUpperCase(), 175, 205)


    //New Page
    doc.addPage();

    doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
    doc.setLineWidth(1);
    doc.line(15, 35, 280, 35);

    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Disability', 15, 45)

    //3.1
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Any kind of Disability,if any', 15, 52)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherDisabilityYn == null || teacherProfile?.teacherDisabilityYn == 'null' || teacherProfile?.teacherDisabilityYn == ''){
      doc.text('NOt GIVEN', 85, 52)
    }else{
      doc.text(teacherProfile?.teacherDisabilityYn == '1' ? 'YES' : 'NO', 85, 52)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Type of Disability', 145, 52)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.teacherDisabilityType == null || teacherProfile?.teacherDisabilityType == 'null' || teacherProfile?.teacherDisabilityType == ''){
      doc.text('NOT GIVEN', 205, 52)
    }else{
      doc.text(disabilityPipe.transform(teacherProfile?.teacherDisabilityType).toUpperCase(), 205, 52)
    }

   

    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Spouse Details', 15, 62)

    //4.1
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('KVS Employee', 15, 69)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.spouseStatus == null || teacherProfile?.spouseStatus == 'null' || teacherProfile?.spouseStatus == ''){
      doc.text('NOt GIVEN', 85, 69)
    }else{
      doc.text(teacherProfile?.spouseStatus == '1' ? 'YES' : 'NO', 85, 69)
    }

   

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Central Government Employee', 145, 69)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.spouseStatus == null || teacherProfile?.spouseStatus == 'null' || teacherProfile?.spouseStatus == ''){
      doc.text('NOt GIVEN', 205, 69)
    }else{
      doc.text(teacherProfile?.spouseStatus == '2' ? 'YES' : 'NO', 205, 69)
    }

   

    //4.2
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('State Government Employee', 15, 76)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.spouseStatus == null || teacherProfile?.spouseStatus == 'null' || teacherProfile?.spouseStatus == ''){
      doc.text('NOt GIVEN', 85, 76)
    }else{
      doc.text(teacherProfile?.spouseStatus == '3' ? 'YES' : 'NO', 85, 76)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('None of these', 145, 76)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.spouseStatus == null || teacherProfile?.spouseStatus == 'null' || teacherProfile?.spouseStatus == ''){
      doc.text('NOt GIVEN', 205, 76)
    }else{
      doc.text(teacherProfile?.spouseStatus == '4' ? 'YES' : 'NO', 205, 76)
    }

    

    //4.3
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Spouse Employee Code', 15, 83)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.spouseEmpCode == null || teacherProfile?.spouseEmpCode == 'null' || teacherProfile?.spouseEmpCode == ''){
      doc.text('NOt GIVEN', 85, 83)
    }else{
      doc.text(teacherProfile?.spouseEmpCode, 85, 83)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Spouse Name', 145, 83)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.spouseName == null || teacherProfile?.spouseName == 'null' || teacherProfile?.spouseName == ''){
      doc.text('NOt GIVEN', 205, 83)
    }else{
      doc.text(teacherProfile?.spouseName.toUpperCase(), 205, 83)
    }

   

    //4.4
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Spouse Position', 15, 90)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.spousePost == null || teacherProfile?.spousePost == 'null' || teacherProfile?.spousePost == ''){
      doc.text('NOt GIVEN', 85, 90)
    }else{
      doc.text(teacherProfile?.spousePost.toUpperCase(), 85, 90)
    }

    

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Spouse Station', 145, 90)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if(teacherProfile?.spouseStationName == null || teacherProfile?.spouseStationName == 'null' || teacherProfile?.spouseStationName == ''){
      doc.text('NOt GIVEN', 205, 90)
    }else{
      doc.text(teacherProfile?.spouseStationName.toUpperCase(), 205, 90);
    }

   

    //5
    // doc.setTextColor(138, 24, 34);
    // doc.setFontSize(14);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Academic Qualification', 15, 100);    

    (doc as any).autoTable({
    //  head: this.acdHead,
     // body: this.acdQualificationArray,
      theme: 'grid',
      startY: 105,
      didDrawPage: function (data) {

        // const currentDate = new Date();
        // const convtCurrentDate = "(" + currentDate + ")"

       
        // doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
        // doc.setDrawColor(0, 0, 0);
        // doc.setTextColor(0, 0, 0);
        // doc.setLineWidth(1);
        // doc.line(15, 35, 280, 35);

      
        // var str = "Page " + data.doc.internal.getNumberOfPages();

        // doc.setFontSize(10);
      
        // var pageSize = doc.internal.pageSize;
        // var pageHeight = pageSize.height
        //   ? pageSize.height
        //   : pageSize.getHeight();
        // doc.text(str, data.settings.margin.left, pageHeight - 10);

        // doc.setTextColor(0, 0, 0);
        // doc.setFontSize(12);
        // doc.setFont('Times-Roman', 'bold');
        // doc.text('Report Generation Date & Time',  data.settings.margin.left+160, pageHeight - 10)
    
        // doc.setTextColor(0, 0, 0);
        // doc.setFontSize(12);
        // doc.setFont('Times-Roman', 'normal');
        // doc.text(convtCurrentDate,  data.settings.margin.left+160, pageHeight - 5)

        
      },

      // didDrawCell: data => {  
      //   this.yPoint = data.cursor.y
      // },
      // headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
      // alternateRowStyles: { fillColor: [255, 251, 245] },
      // valign: 'top',
      // margin: {
      //   top: 40,
      //   bottom: 15,
      // },
    })

    // let finalY = (doc as any).lastAutoTable.finalY;
    
    // doc.setTextColor(138, 24, 34);
    // doc.setFontSize(14);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Professional Qualification', 15, finalY+10);

    // (doc as any).autoTable({
    //   head: this.profHead,
    //   body: this.profQualificationArray,
    //   theme: 'grid',
    //   startY: finalY+15,
    //   didDrawPage: function (data) {

    //     const currentDate = new Date();
    //     const convtCurrentDate = "(" + currentDate + ")"

    //     // Header
    //     doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
    //     doc.setDrawColor(0, 0, 0);
    //     doc.setTextColor(0, 0, 0);
    //     doc.setLineWidth(1);
    //     doc.line(15, 35, 280, 35);
        
    //     // Footer
    //     var str = "Page " + data.doc.internal.getNumberOfPages();

    //     doc.setFontSize(10);
    //     // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    //     var pageSize = doc.internal.pageSize;
    //     var pageHeight = pageSize.height
    //       ? pageSize.height
    //       : pageSize.getHeight();
    //     doc.text(str, data.settings.margin.left, pageHeight - 10);

    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'bold');
    //     doc.text('Report Generation Date & Time',  data.settings.margin.left+160, pageHeight - 10)
    
    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'normal');
    //     doc.text(convtCurrentDate,  data.settings.margin.left+160, pageHeight - 5)

        
    //   },

    //   didDrawCell: data => {
    //     this.yPoint = data.cursor.y
    //   },

    //   headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    //   alternateRowStyles: { fillColor: [255, 251, 245] },
    //   valign: 'top',
    //   margin: {
    //     top: 40,
    //     bottom: 15,
    //   },
    // })


    // let finalY1 = (doc as any).lastAutoTable.finalY;
    
    // doc.setTextColor(138, 24, 34);
    // doc.setFontSize(14);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Awards Received', 15, finalY1+10);

    // (doc as any).autoTable({
    //   head: this.awardHead,
    //   body: this.awardReceivedArray,
    //   theme: 'grid',
    //   startY: finalY1+15,
    //   didDrawPage: function (data) {

    //     const currentDate = new Date();
    //     const convtCurrentDate = "(" + currentDate + ")"

    //     // Header
    //     doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
    //     doc.setDrawColor(0, 0, 0);
    //     doc.setTextColor(0, 0, 0);
    //     doc.setLineWidth(1);
    //     doc.line(15, 35, 280, 35);
        
    //     // Footer
    //     var str = "Page " + data.doc.internal.getNumberOfPages();

    //     doc.setFontSize(10);
    //     // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    //     var pageSize = doc.internal.pageSize;
    //     var pageHeight = pageSize.height
    //       ? pageSize.height
    //       : pageSize.getHeight();
    //     doc.text(str, data.settings.margin.left, pageHeight - 10);

    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'bold');
    //     doc.text('Report Generation Date & Time',  data.settings.margin.left+160, pageHeight - 10)
    
    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'normal');
    //     doc.text(convtCurrentDate,  data.settings.margin.left+160, pageHeight - 5)

        
    //   },

    //   didDrawCell: data => {
    //     this.yPoint = data.cursor.y
    //   },

    //   headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    //   alternateRowStyles: { fillColor: [255, 251, 245] },
    //   valign: 'top',
    //   margin: {
    //     top: 40,
    //     bottom: 15,
    //   },
    // })



    // let finalY2 = (doc as any).lastAutoTable.finalY;
    
    // doc.setTextColor(138, 24, 34);
    // doc.setFontSize(14);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Training Received', 15, finalY2+10);

    // (doc as any).autoTable({
    //   head: this.trainingHead,
    //   body: this.trainingReceivedArray,
    //   theme: 'grid',
    //   startY: finalY2+15,
    //   didDrawPage: function (data) {

    //     const currentDate = new Date();
    //     const convtCurrentDate = "(" + currentDate + ")"

    //     // Header
    //     doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
    //     doc.setDrawColor(0, 0, 0);
    //     doc.setTextColor(0, 0, 0);
    //     doc.setLineWidth(1);
    //     doc.line(15, 35, 280, 35);
        
    //     // Footer
    //     var str = "Page " + data.doc.internal.getNumberOfPages();

    //     doc.setFontSize(10);
    //     // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    //     var pageSize = doc.internal.pageSize;
    //     var pageHeight = pageSize.height
    //       ? pageSize.height
    //       : pageSize.getHeight();
    //     doc.text(str, data.settings.margin.left, pageHeight - 10);

    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'bold');
    //     doc.text('Report Generation Date & Time',  data.settings.margin.left+160, pageHeight - 10)
    
    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'normal');
    //     doc.text(convtCurrentDate,  data.settings.margin.left+160, pageHeight - 5)

        
    //   },

    //   didDrawCell: data => {
    //     this.yPoint = data.cursor.y
    //   },

    //   headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    //   alternateRowStyles: { fillColor: [255, 251, 245] },
    //   valign: 'top',
    //   margin: {
    //     top: 40,
    //     bottom: 15,
    //   },
    // })


  


    // let finalY2 = (doc as any).lastAutoTable.finalY;
    
    // doc.setTextColor(138, 24, 34);
    // doc.setFontSize(14);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Order of Station Choice', 15, finalY2+10);

    // (doc as any).autoTable({
    //   head: this.teacherStationChiceHead,
    //   body: this.teacherTrainingArray,
    //   theme: 'grid',
    //   startY: finalY2+15,
    //   didDrawPage: function (data) {

    //     const currentDate = new Date();
    //     const convtCurrentDate = "(" + currentDate + ")"

    //     // Header
    //     doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
    //     doc.setDrawColor(0, 0, 0);
    //     doc.setTextColor(0, 0, 0);
    //     doc.setLineWidth(1);
    //     doc.line(15, 35, 280, 35);
        
    //     // Footer
    //     var str = "Page " + data.doc.internal.getNumberOfPages();

    //     doc.setFontSize(10);
    //     // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    //     var pageSize = doc.internal.pageSize;
    //     var pageHeight = pageSize.height
    //       ? pageSize.height
    //       : pageSize.getHeight();
    //     doc.text(str, data.settings.margin.left, pageHeight - 10);

    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'bold');
    //     doc.text('Report Generation Date & Time',  data.settings.margin.left+160, pageHeight - 10)
    
    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'normal');
    //     doc.text(convtCurrentDate,  data.settings.margin.left+160, pageHeight - 5)

        
    //   },

    //   didDrawCell: data => {
    //     this.yPoint = data.cursor.y
    //   },

    //   headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    //   alternateRowStyles: { fillColor: [255, 251, 245] },
    //   valign: 'top',
    //   margin: {
    //     top: 40,
    //     bottom: 15,
    //   },
    // })

    // let finalY3 = (doc as any).lastAutoTable.finalY;
    
    // doc.setTextColor(138, 24, 34);
    // doc.setFontSize(14);
    // doc.setFont('Times-Roman', 'bold');
    // doc.text('Order of Displacement Station Choice', 15, finalY3+10);

    // (doc as any).autoTable({
    //   head: this.teacherStationChiceDisplacementHead ,
    //   body: this.teacherTrainingDisplacementDataArray,
    //   theme: 'grid',
    //   startY: finalY3+15,
    //   didDrawPage: function (data) {

    //     const currentDate = new Date();
    //     const convtCurrentDate = "(" + currentDate + ")"

    //     // Header
    //     doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
    //     doc.setDrawColor(0, 0, 0);
    //     doc.setTextColor(0, 0, 0);
    //     doc.setLineWidth(1);
    //     doc.line(15, 35, 280, 35);
        
    //     // Footer
    //     var str = "Page " + data.doc.internal.getNumberOfPages();

    //     doc.setFontSize(10);
    //     // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    //     var pageSize = doc.internal.pageSize;
    //     var pageHeight = pageSize.height
    //       ? pageSize.height
    //       : pageSize.getHeight();
    //     doc.text(str, data.settings.margin.left, pageHeight - 10);

    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'bold');
    //     doc.text('Report Generation Date & Time',  data.settings.margin.left+160, pageHeight - 10)
    
    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontSize(12);
    //     doc.setFont('Times-Roman', 'normal');
    //     doc.text(convtCurrentDate,  data.settings.margin.left+160, pageHeight - 5)

        
    //   },

    //   didDrawCell: data => {
    //     this.yPoint = data.cursor.y
    //   },

    //   headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    //   alternateRowStyles: { fillColor: [255, 251, 245] },
    //   valign: 'top',
    //   margin: {
    //     top: 40,
    //     bottom: 15,
    //   },
    // })
    let finalY4 = (doc as any).lastAutoTable.finalY;
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Miscellaneous', 15, 101);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Whether the employee is seeking benefit of spouse who is working at the same station where employee is posted/transfer is being sought for.', 15,110)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(teacherStationChioc['spouseKvsYnD'] == '1'?'YES':'NO', 250, 110)


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Whether the employee is seeking benefit of medical ground (MDG Ground).', 15, 116)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(teacherStationChioc['personalStatusMdgD'] == '1'?'YES':'NO', 250, 116) 

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Whether the employee is seeking benefit of single parent (SP Ground).', 15, 121)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(teacherStationChioc['personalStatusSpD'] == '1'?'YES':'NO', 250, 121) 


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Whether the employee is seeking benefit of Death of Family Person (DFP Ground).', 15, 127)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(teacherStationChioc['personalStatusDfpD'] == '1'?'YES':'NO', 250, 127) 

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Whether your are main care-giver to the person with disability in the family (i.e spouse/son/daughter).', 15, 133)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(teacherStationChioc['careGiverFaimlyYnD'] == '1'?'YES':'NO', 250, 133) 


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Members of JCM at KVS Regional Office (RJCM) / KVS Headquarters (NJCM).', 15, 139)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(teacherStationChioc['memberJCM'] == '1'?'RJCM':'', 250, 139) 
    doc.text(teacherStationChioc['memberJCM'] == '0'?'NO':'', 250, 139) 
    doc.text(teacherStationChioc['memberJCM'] == '2'?'NJCM':'', 250, 139) 

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Active stay (in years) refer 2 (i) of Part- 1 of Transfer Policy 2023.', 15, 145)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(this.absencedays, 250, 145) 
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Whether disciplinary proceedings are in progress.', 15, 151)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10); 
    doc.text(teacherStationChioc['disciplinaryYn'] == '1'?'YES':'NO', 250, 151)  

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Whether, the employee has completed one teure at hard/NER/Priority station(during entire service).', 15, 157)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12); 
    doc.text(teacherStationChioc['surveHardYn'] == '1'?'YES':'NO', 250, 157) 
  
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Report Generation Date & Time', 175, 200)

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'normal');
    doc.text(this.currentDate, 175, 205)

    doc.addPage();
    let finalY1 = (doc as any).lastAutoTable.finalY;
    
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Work Experience', 15, 45);

    (doc as any).autoTable({
      head: this.workExpHead,
      body: this.workExperienceArray,
      theme: 'grid',
      startY: 50,
      didDrawPage: function (data) {

        const currentDate = new Date();
        const convtCurrentDate = "(" + currentDate + ")"

        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.line(15, 35, 280, 35);
        
        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report Generation Date & Time',  data.settings.margin.left+160, pageHeight - 10)
    
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate,  data.settings.margin.left+160, pageHeight - 5)

        
      },

      didDrawCell: data => {
        this.yPoint = data.cursor.y
      },

      headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 251, 245] },
      valign: 'top',
      margin: {
        top: 40,
        bottom: 15,
      },
    })


    doc.save(teacherProfile?.teacherName+'.pdf')
  }
}
