import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './credentials/change-password/change-password.component';
import { AuthGuard } from './guard/AuthGuard';
import { KvsTeacherProfileComponent } from './kvs/kvs-teacher-profile/kvs-teacher-profile.component';
import { KvsTeacherTransferComponent } from './kvs/kvs-teacher-transfer/kvs-teacher-transfer.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './tDashboard/main-page/main-page.component';
import { TDashboardComponent } from './tDashboard/t-dashboard/t-dashboard.component';
import { TeacherProfileComponent } from './teacherDetailed/teacher-profile/teacher-profile.component';
import { TeacherComponent } from './teacherEntryForm/teacher.component';
import { ApplicationFlowComponent } from './utilities/instructions/application-flow/application-flow.component';
import {LoginComponent} from './login/login.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { TeacherBasicProfileComponent } from './teacherDetailed/teacher-basic-profile/teacher-basic-profile.component';
import { TeacherWorkExperienceComponent } from './teacherDetailed/teacher-work-experience/teacher-work-experience.component';
import { TeacherPreviewConfirmComponent } from './teacherDetailed/teacher-preview-confirm/teacher-preview-confirm.component';
import { ProfileVerificationComponent } from './kvs/kvs-teacher-transfer/profile-verification/profile-verification.component';
import { TransferMiscellaneousComponent } from './kvs/kvs-teacher-transfer/transfer-miscellaneous/transfer-miscellaneous.component';
import { TransferStationChoiceComponent } from './kvs/kvs-teacher-transfer/transfer-station-choice/transfer-station-choice.component';
import { TransferDcCountComponent } from './kvs/kvs-teacher-transfer/transfer-dc-count/transfer-dc-count.component';
import { TransferTcCountComponent } from './kvs/kvs-teacher-transfer/transfer-tc-count/transfer-tc-count.component';

import { PreviewUndertakingComponent } from './kvs/kvs-teacher-transfer/preview-undertaking/preview-undertaking.component';

const routes: Routes = [
  // {path:'', component: TDashboardComponent},
  {path:'', component: LoginComponent},
  // {path:'loginuser', component:LoginuserComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:LoginComponent},
  {path: 'teacher', component:TeacherComponent,canActivate: [AuthGuard], children:[
      {path: 'mainPage', component:MainPageComponent},
      {path:'profile',component:TeacherProfileComponent}, 
      {path:'teacherBasicProfile',component:TeacherBasicProfileComponent},  
      {path:'profileVerifiation', component:ProfileVerificationComponent},  
      {path:'transferMiscellaneous', component:TransferMiscellaneousComponent}, 
      {path:'transferDcCount', component:TransferDcCountComponent},
      {path:'transferTcCount', component:TransferTcCountComponent},
      {path:'transferStationChoice', component:TransferStationChoiceComponent},     

      {path:'preview-undertaking', component:PreviewUndertakingComponent},


      {path:'teacherWorkExperience', component:TeacherWorkExperienceComponent}, 
      {path:'teacherPreviewConfirm', component:TeacherPreviewConfirmComponent}, 
      {path:'kvsteacherprofile', component:KvsTeacherProfileComponent},
      {path:'kvsteachertransfer', component:KvsTeacherTransferComponent},
      {path:'disclaimer', component:DisclaimerComponent},
      {path:'changePassword', component:ChangePasswordComponent},
      {path: 'kvsTicket', loadChildren: () => import('./kvs/ticket/ticket.module').then(m => m.TicketModule) },
      // {path:'appFlow',component:ApplicationFlowComponent}
    ]},  

];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { useHash:false, scrollPositionRestoration: 'enabled' })],
  // imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
