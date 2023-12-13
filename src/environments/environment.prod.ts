export const environment = {
  production: true,



 //Local

  BASE_URL_DATA: 'http://10.25.26.10:8014/api/teacher/',
  udiseApi:'https://demo.udiseplus.gov.in/api-v1/public/getSchoolMaster/',
  auth_service:'http://' + "10.25.26.251:8090/meuser"+'/api/userCradential',
  LOGIN_URL_JWT:'http://10.25.26.251:8014/api/login/',
 
  BASE_URL_DATA_TEACHER: 'http://10.25.26.251:8014/api/teacher/',
  BASE_URL_DATA_MASTER: 'http://10.25.26.251:8014/api/master/',
  BASE_URL_DATA_QUESTION: 'http://10.25.26.251:8014/api/question/',
  BASE_URL_DATA_SURVEY: 'http://10.25.26.251:8014/api/survey/',
  BASE_URL_DATA_EXPERIENCE: 'http://10.25.26.251:8014/api/experience/',
  BASE_URL_DATA_PROMOTION: 'http://10.25.26.251:8014/api/promotion/',
  BASE_URL_DATA_QUALIFICATION: 'http://10.25.26.251:8014/api/qualification/',
  BASE_URL_DATA_AWARDS: 'http://10.25.26.251:8014/api/awards/',
  BASE_URL_DATA_TRANSFER: 'http://10.25.26.251:8014/api/transfer/',

  LOGOUT_URL: 'http://10.25.26.251:8385/meauth/logout?returnTo=http://10.25.26.10:6200/',
  LOGIN_URL_INDIVIDUAL: 'http://10.25.26.251:8385/meauth/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teachermodule&redirect_uri=http://10.25.26.10:6200/teacher/teacher/profile&scopes=read',
  AUTH_GUARD_HREF1:'http://10.25.26.10:4200',



  // Demo2

  // LOGIN_URL_JWT:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/login/',
  // BASE_URL_DATA: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // udiseApi:'https://demo.udiseplus.gov.in/api-v1/public/getSchoolMaster/',
  // auth_service:'https://demopgi.udiseplus.gov.in/UserService/api/userCradential',
  // BASE_URL_DATA_TEACHER_TRANSFER:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/transprofile/',
  // // //Local
  // BASE_URL_DATA_TEACHER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // BASE_URL_DATA_MASTER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/master/',
  // BASE_URL_DATA_QUESTION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/question/',
  // BASE_URL_DATA_SURVEY: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/survey/',
  // BASE_URL_DATA_EXPERIENCE: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/experience/',
  // BASE_URL_DATA_PROMOTION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/promotion/',
  // BASE_URL_DATA_QUALIFICATION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/qualification/',
  // BASE_URL_DATA_AWARDS: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/awards/',
  // BASE_URL_DATA_TRANSFER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/transfer/',

  // LOGOUT_URL: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/logout?returnTo=http://10.25.26.10:6200/',
  // LOGIN_URL_INDIVIDUAL: 'http://10.25.26.251:8385/meauth/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teachermodule&redirect_uri=http://10.25.26.10:6200/teacher/profile&scopes=read',
  // AUTH_GUARD_HREF1:'http://10.25.26.10:4200',


  // BASE_URL_DATA_TEACHER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // BASE_URL_DATA_MASTER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/master/',
  // BASE_URL_DATA_QUESTION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/question/',
  // BASE_URL_DATA_SURVEY: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/survey/',
  // BASE_URL_DATA_EXPERIENCE: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/experience/',
  // BASE_URL_DATA_PROMOTION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/promotion/',
  // BASE_URL_DATA_QUALIFICATION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/qualification/',
  // BASE_URL_DATA_AWARDS: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/awards/', 
  // BASE_URL_DATA_TRANSFER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/transfer/',
  // BASE_URL_DATA_DASHBOARD: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/dashboard/',
  // BASE_URL_DATA_USER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/user/',
  // BASE_URL_DATA_SURPLUS_TRANSFER:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TRANSFER/api/transfer/',
  // BASE_URL_DATA_TEACHER_TRANSFER:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/transprofile/',
  // LOGOUT_URL:'https://kvsonlinetransfer.kvs.gov.in/SpringAuthSecurity/logout?returnTo=https://kvsonlinetransfer.kvs.gov.in/school',
  // LOGIN_URL_INDIVIDUAL:'https://kvsonlinetransfer.kvs.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
  // LOGIN_URL_COMMON:'https://kvsonlinetransfer.kvs.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
  // LOGIN_URL_COMMON_LOCAL1:'',
  // LOGIN_URL_COMMON_LOCAL2:'',
  // AUTH_GUARD_HREF:'https://kvsonlinetransfer.kvs.gov.in/teacher/teacher/profile',
  // AUTH_GUARD_HREF1:'https://kvsonlinetransfer.kvs.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',
  // BASE_URL_MEUSER:'https://kvsonlinetransfer.kvs.gov.in/UserService/api/user/',
  // LOGIN_URL_JWT:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/login/',
  // BASE_URL_REPORT:'https://kvsonlinetransfer.kvs.gov.in/MOE-KVS-PDF/api/kvsreport/',
  // BASE_URL_DATA_MASTER1:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/unee-api/v1/master/',
  // BASE_URL_DATA_MAPPING:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/unee-api/v1/mapping/',
  // BASE_URL_DATA: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // udiseApi:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api-v1/public/getSchoolMaster/',
  // auth_service:'http://' + "kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER"+'/api/userCradential',

// new pgi api

//   BASE_URL_DATA_TEACHER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/teacher/',
//   BASE_URL_DATA_MASTER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/master/',
//  BASE_URL_DATA_QUESTION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/question/',
//  BASE_URL_DATA_SURVEY: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/survey/',
//  BASE_URL_DATA_EXPERIENCE: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/experience/',
//   BASE_URL_DATA_PROMOTION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/promotion/',
//   BASE_URL_DATA_QUALIFICATION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/qualification/',
//  BASE_URL_DATA_AWARDS: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/awards/', 
//  BASE_URL_DATA_TRANSFER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/transfer/',
//  BASE_URL_DATA_DASHBOARD: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/dashboard/',
//  BASE_URL_DATA_USER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/user/',
//  BASE_URL_DATA_SURPLUS_TRANSFER:'https://demopgi.udiseplus.gov.in/MOE-RAD-TRANSFER/api/transfer/',
//  BASE_URL_DATA_TEACHER_TRANSFER:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/transprofile/',
//  LOGOUT_URL:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://kvsonlinetransfer.kvs.gov.in/school',
//  LOGIN_URL_INDIVIDUAL:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
//  LOGIN_URL_COMMON:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
//  LOGIN_URL_COMMON_LOCAL1:'',
//   LOGIN_URL_COMMON_LOCAL2:'',
//   AUTH_GUARD_HREF:'https://demopgi.udiseplus.gov.in/teacher/teacher/profile',
//  AUTH_GUARD_HREF1:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',
//  BASE_URL_MEUSER:'https://demopgi.udiseplus.gov.in/UserService/api/user/',
//  LOGIN_URL_JWT:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/login/',
//  BASE_URL_REPORT:'https://demopgi.udiseplus.gov.in/MOE-KVS-PDF/api/kvsreport/',
//  udiseApi:'https://demo.udiseplus.gov.in/api-v1/public/getSchoolMaster/',
//  BASE_URL_DATA_MASTER1:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/unee-api/v1/master/',
//  BASE_URL_DATA_MAPPING:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/unee-api/v1/mapping/',
//  BASE_URL_DATA: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/teacher/',
//  auth_service:'https://demopgi.udiseplus.gov.in/UserService/api/userCradential',

  //Demo 1
  // BASE_URL_DATA_TEACHER: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // BASE_URL_DATA_MASTER: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/master/',
  // BASE_URL_DATA_QUESTION: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/question/',
  // BASE_URL_DATA_SURVEY: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/survey/',
  // BASE_URL_DATA_EXPERIENCE: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/experience/',
  // BASE_URL_DATA_PROMOTION: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/promotion/',
  // BASE_URL_DATA_QUALIFICATION: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/qualification/',
  // BASE_URL_DATA_AWARDS: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/awards/',
  // BASE_URL_DATA_TRANSFER: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/transfer/',

  // LOGOUT_URL: 'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',
  // LOGIN_URL_INDIVIDUAL: 'https://pgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teachermodule&redirect_uri=https://pgi.udiseplus.gov.in/teacher/teacher/profile&scopes=read',
  // AUTH_GUARD_HREF1:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',


  
  //Demo 2
  //  BASE_URL_DATA_TEACHER: 'https://kvsdemo.udiseplus.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // BASE_URL_DATA_MASTER: 'https://kvsdemo.udiseplus.gov.in/MOE-RAD-TEACHER/api/master/',
  // BASE_URL_DATA_QUESTION: 'https://kvsdemo.udiseplus.gov.in/MOE-RAD-TEACHER/api/question/',
  // BASE_URL_DATA_SURVEY: 'https://kvsdemo.udiseplus.gov.in/MOE-RAD-TEACHER/api/survey/',
  // BASE_URL_DATA_EXPERIENCE: 'https://kvsdemo.udiseplus.gov.in/MOE-RAD-TEACHER/api/experience/',
  // BASE_URL_DATA_PROMOTION: 'https://kvsdemo.udiseplus.gov.in/MOE-RAD-TEACHER/api/promotion/',
  // BASE_URL_DATA_QUALIFICATION: 'https://kvsdemo.udiseplus.gov.in/MOE-RAD-TEACHER/api/qualification/',
  // BASE_URL_DATA_AWARDS: 'https://kvsdemo.udiseplus.gov.in/MOE-RAD-TEACHER/api/awards/',
  // BASE_URL_DATA_TRANSFER: 'https://kvsdemo.udiseplus.gov.in/MOE-RAD-TEACHER/api/transfer/',

  // LOGOUT_URL: 'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://kvsdemo.udiseplus.gov.in/school',
  // LOGIN_URL_INDIVIDUAL: 'https://pgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teachermodule&redirect_uri=https://kvsdemo.udiseplus.gov.in/teacher/teacher/profile&scopes=read',
  // AUTH_GUARD_HREF1:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',


  //KVS Main
  // BASE_URL_DATA_TEACHER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // BASE_URL_DATA_MASTER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/master/',
  // BASE_URL_DATA_QUESTION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/question/',
  // BASE_URL_DATA_SURVEY: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/survey/',
  // BASE_URL_DATA_EXPERIENCE: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/experience/',
  // BASE_URL_DATA_PROMOTION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/promotion/',
  // BASE_URL_DATA_QUALIFICATION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/qualification/',
  // BASE_URL_DATA_AWARDS: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/awards/',
  // BASE_URL_DATA_TRANSFER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/transfer/',

  // LOGOUT_URL: 'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=http://kvsonlinetransfer.kvs.gov.in/',
  // LOGIN_URL_INDIVIDUAL: 'https://pgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teachermodule&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/teacher/teacher/profile&scopes=read',
  // AUTH_GUARD_HREF1:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=http://kvsonlinetransfer.kvs.gov.in/',

  applicationId:2

  // BASE_URL_DATA: 'http://10.25.26.10:8014/api/teacher/',
  // udiseApi:'https://demo.udiseplus.gov.in/api-v1/public/getSchoolMaster/',
  // auth_service:'http://' + "10.25.26.251:8090/meuser"+'/api/userCradential',
};
