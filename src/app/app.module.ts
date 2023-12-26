import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './utilities/header/header/header.component';
import { SideNavComponent } from './utilities/sideNav/side-nav/side-nav.component';
import { FooterComponent } from './utilities/footer/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule} from '@angular/material/stepper';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormDataService } from './teacherEntryForm/service/internalService/form-data.service';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { TDashboardComponent } from './tDashboard/t-dashboard/t-dashboard.component';
//import { LoginComponent } from './tDashboard/t-dashboard/login/login/login.component';
import { TeacherComponent } from './teacherEntryForm/teacher.component';
import { TModuleModule } from './teacherModule/t-module/t-module.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceType,AppointedForLevelPipe, BloodGroupPipe, ClassTaughtPipe, DisabilityPipe, GenderPipe, HAcdQualPipe, MainSubjectPipe, MaritalStatusPipe, NationalityPipe, NatureOfApntmntPipe, NatureOfAppointmentPipe, ProfQualPipe, SocialCatPipe, StaffTypePipe, TrainingPipe, TransferGroundPipe, TypeOfTeacherPipe, YesNoPipe } from './utilities/myPipe/myPipe';
import { TeacherProfileComponent } from './teacherDetailed/teacher-profile/teacher-profile.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { RegistrationComponent } from './registration/registration.component';
import { KvsTeacherProfileComponent } from './kvs/kvs-teacher-profile/kvs-teacher-profile.component';
import { KvsTeacherTransferComponent } from './kvs/kvs-teacher-transfer/kvs-teacher-transfer.component';
import {MatIconModule} from '@angular/material/icon';
import { MatModuleModule } from './mat/mat-module/mat-module.module';
import { HttpReqInterceptor } from './interceptor/httpReqInterceptor';

import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ChangePasswordComponent } from './credentials/change-password/change-password.component';
import { MainPageComponent } from './tDashboard/main-page/main-page.component';
import { TeacherAppPdfService } from './makePDF/teacher-app-pdf.service';
import { TeacherTransferPdfService } from './makePDF/teacher-transfer-pdf.service';
import { AuthInterceptorService } from './guard/auth-interceptor.service';
import { DatePipe } from '@angular/common';
import { ApplicationFlowComponent } from './utilities/instructions/application-flow/application-flow.component';
import { LoginComponent } from './login/login.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { TeacherBasicProfileComponent } from './teacherDetailed/teacher-basic-profile/teacher-basic-profile.component';
import { TeacherWorkExperienceComponent } from './teacherDetailed/teacher-work-experience/teacher-work-experience.component';
import { TeacherPreviewConfirmComponent } from './teacherDetailed/teacher-preview-confirm/teacher-preview-confirm.component';
import { ProgresionBarComponent } from './teacherDetailed/progresion-bar/progresion-bar.component';
import { ProfileVerificationComponent } from './kvs/kvs-teacher-transfer/profile-verification/profile-verification.component';
import { TransferMiscellaneousComponent } from './kvs/kvs-teacher-transfer/transfer-miscellaneous/transfer-miscellaneous.component';
import { TransferProgresionBarComponent } from './kvs/kvs-teacher-transfer/transfer-progresion-bar/transfer-progresion-bar.component';
import { TransferStationChoiceComponent } from './kvs/kvs-teacher-transfer/transfer-station-choice/transfer-station-choice.component';
import { TransferDcCountComponent } from './kvs/kvs-teacher-transfer/transfer-dc-count/transfer-dc-count.component';
import { TransferTcCountComponent } from './kvs/kvs-teacher-transfer/transfer-tc-count/transfer-tc-count.component';
import { PreviewUndertakingComponent } from './kvs/kvs-teacher-transfer/preview-undertaking/preview-undertaking.component';
// import { MatModuleModule } from './mat/mat-module/mat-module.module';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new MultiTranslateHttpLoader(http, [
//     {prefix: "./assets/translate/core/", suffix:".json"},
//     {prefix: "./assets/translate/shared/", suffix:".json"},
//   ])
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    TDashboardComponent,
    LoginComponent,
    TeacherComponent,
    ProfileComponent,
    GenderPipe,
    MainSubjectPipe,
    YesNoPipe,
    ClassTaughtPipe,
    TrainingPipe,
    NatureOfApntmntPipe,
    AppointedForLevelPipe,
    DisabilityPipe,
    SocialCatPipe,
    TypeOfTeacherPipe,
    ExperienceType,
    HAcdQualPipe,
    ProfQualPipe,
    NationalityPipe, 
    MaritalStatusPipe, 
    StaffTypePipe, 
    NatureOfAppointmentPipe,
    TransferGroundPipe,
    BloodGroupPipe,
    TeacherProfileComponent,
    LoginuserComponent,
    RegistrationComponent,
    KvsTeacherProfileComponent,
    KvsTeacherTransferComponent,
    ChangePasswordComponent,
    MainPageComponent,
    ApplicationFlowComponent,
    DisclaimerComponent,
    TeacherBasicProfileComponent,
    TeacherWorkExperienceComponent,
    TeacherPreviewConfirmComponent,
    ProgresionBarComponent,
    ProfileVerificationComponent,
    TransferMiscellaneousComponent,
    TransferProgresionBarComponent,
    TransferStationChoiceComponent,
    TransferDcCountComponent,
    TransferTcCountComponent,
    PreviewUndertakingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    RxReactiveFormsModule,
    // HttpClientModule,
    // HttpClient,
    TModuleModule,
    NgbModule,
    FormsModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps:[HttpClient]
    //   }
    // })
    MatModuleModule,
    
  ],
  providers: [DatePipe, TeacherAppPdfService,TeacherTransferPdfService, { provide: HTTP_INTERCEPTORS, useClass: HttpReqInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
