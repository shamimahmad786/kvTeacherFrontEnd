import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/beans/response';
// import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutsideServicesService {

  constructor(private _http: HttpClient) { }

  fetchTeacherById(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherByAccountId", data, { headers })
  }

  saveCorrectionFormProfile(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "teacherProfileQueryInitiate", data, { headers })
  }

  initiateTeacherTransfer(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "initiateTeacherTransfer", data, { headers })
  }

  getTeacherLeaveMaster(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_LEAVE_MANAGEMENT+ "getTeacherLeaveMaster", data, {headers})
  }

  saveTeacherLeave(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_LEAVE_MANAGEMENT+ "saveTeacherLeave", data, {headers})
  }

  deleteTeacherLeave(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_LEAVE_MANAGEMENT+ "deleteTeacherLeave", data, {headers})
  }

  fetchInitiateTeacherTransfer(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getInitiateTeacherTransfer", data, { headers })
  }

  fetchSpouseByEmpCode(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getSpouseByEmpCode", data, { headers })
  }

  saveInitiatedTeacherTransfer(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "saveTeacherTransfer", data, { headers })
  }

  saveStationChoice(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "saveStationChoice", data, { headers });
  }

  getSpouseDetailsV2(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getSpouseDetailsV2", data, { headers });
  }

  fetchTcDcData(data: any) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post(environment.BASE_URL_DATA_TEACHER + "transfer/getTeacherTransferDetails", data, { headers })
  }
  updateFormStatusFlag(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });


    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "updatdFlag", data, { headers })

  }
  sentReport(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });


    return this._http.post<any>(environment.BASE_URL_REPORT + "sentReport", data, { headers })
  }
  reInitiateTeacherTransfer(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "reInitiateTeacherTransfer", data, { headers })
  }

  fetchTransferBasicProfileByTchId(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferBasicProfileByTeacherId", data, { headers })

  }

  fetchTeacherByTeacherId(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherByTeacherId", data, { headers })
  }

  getTeacherBySchool(udise_code: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    // let url = environment.BASE_URL_DATA + "getTeacherBySchool/" + JSON.stringify(udise_code);
    // return this._http.post(url);
    // 

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherBySchool", udise_code, { headers });
  }

  saveSingleTeacher(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "saveTeacher", data, { headers });
  }

  getMasterDataByStateCode(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getMaster", data, { headers });
  }


  getMasterData(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getMaster", data, { headers });
  }

  getVerified(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "verifyTeacher", data, { headers });
  }

  saveCustomQues(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_QUESTION + "saveQuestion", data, { headers })
  }

  getCustomQues(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_QUESTION + "getAllQuestionByBusinessUnit", data, { headers })
  }

  saveSurveyMaster(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY + "saveSurveyMaster", data, { headers })
  }

  getSurveyMasterList(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY + "getSurveyMasterBySchCode", data, { headers })
  }

  saveSurveyMstQues(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY + "saveSurveyMasterQues", data, { headers })
  }

  getSurveyMstQues(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY + "getSurveyMasterQues", data, { headers });
  }

  removeSurveyMstQuesBySurveyId(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY + "deleteSurveyMasterQues", data, { headers })
  }

  saveKvTeacher(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "saveTeacher", data, { headers });
  }

  fetchKvTeacherByKvCode(data: any): Observable<Response> {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getKvTeacherByKvCode", data, { headers })
  }

  getKvTeacherByUdiseCode(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getKvTeacherByUdiseCode", data, { headers })
  }

  fetchAllMaster(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getAllMaster", data, { headers })
  }

  fetchKvSchoolDetails(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getSchoolDetailsByKVCode", data, { headers })
  }

  fetchKvSubjectListByTchType(data) {
    const token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getSubjectByTeacherTypeId", data, { headers })
  }

  saveTchExperience(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE + "saveExperience", data, { headers })
  }


  fetchTchExpByTchId(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE + "getExperienceByTeacherId", data, { headers })
  }

  fetchPromotionByTchId(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_PROMOTION + "getPromotionByTeacherId", data, { headers })
  }

  savePromotion(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_PROMOTION + "savePromotion", data, { headers })
  }

  fetchQualByType(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getQualificationByType", data, { headers })
  }

  fetchSubByQual(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getSubjectByQualification", data, { headers })
  }

  saveTchAcadQual(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION + "saveEducationalQualification", data, { headers })
  }

  saveTchProfQual(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION + "saveProfessionalQualification", data, { headers })
  }

  fetchAcdQual(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION + "getEducationalQualificationByTeacherId", data, { headers })
  }

  fetchProfQual(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION + "getProfesionalQualificationByTeacherId", data, { headers })
  }

  saveAwards(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS + "saveAwards", data, { headers })
  }

  fetchAwardsByTchId(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS + "getAwardsByTeacherId", data, { headers })
  }

  fetchAwardsList(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getAwards", data, { headers })
  }

  saveTraining(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS + "saveTraning", data, { headers })
  }

  fetchTrainingList(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS + "getTraningByTeacherId", data, { headers })
  }

  fetchStateMaster(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getState", data, { headers })
  }

  fetchDistrictByStateId(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getDistrictByStateId", data, { headers })
  }

  fetchTchDuplicateMobile(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherDublicateMobile", data, { headers })
  }

  createUserOnVerify(data) {
    return this._http.post<any>('https://pgi.udiseplus.gov.in/UserService/api/user/create-kvuser', data)
  }

  fetchCorrectionInitiatedDetails(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherProfileQueryInitiate", data, { headers })

  }

  fetchKvRegion(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getKVRegion", data, { headers })
  }

  getTransferRegionByEmployee(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferRegionByEmployee", data, { headers })
  }
  getTransferStationByEmployee(data)
  {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferStationByEmployee", data, { headers })
  }

  fetchStationByRegionId(data) {
    debugger;
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json; charset=utf-8'

    });
    // return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data, {headers})
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER1 + "fetch/list-of-all-station-by-region", data, { headers })
  }

  fetchStationByRegionIds(data) {
    // alert(JSON.stringify(data));
    debugger;
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json; charset=utf-8'

    })
    // alert(headers);
    // return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data, {headers})
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER1 + "fetch/list-of-all-station-by-region", data, { headers })
  }

  fetchKvSchoolByStationCode(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
      'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getSchoolByStation", data, { headers })
  }

  updateSysTchCode(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "updateTeacherSystemGeneratedCode", data, { headers })
  }

  deleteExpByWorkExpId(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE + "deleteByWorkExperienceId", data, { headers })
  }

  updateFlagByTeacherId(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });


    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "updateFlagByTeachId", data, { headers })

  }


  getUpdatedFlag(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getUpdatdFlag", data, { headers })
  }

  deteleEducationalQualification(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION + "deteleEducationalQualification", data, { headers })
  }

  deleteProfessionalQualification(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION + "deleteProfessionalQualification", data, { headers })
  }

  deletePromotion(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_PROMOTION + "deletePromotion", data, { headers })
  }

  deleteByWorkExperienceId(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "deleteByWorkExperienceId", data, { headers })
  }

  deleteAwards(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS + "deleteAwards", data, { headers })
  }
  checkPasswordChanged(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.LOGIN_URL_JWT + "checkPasswordChanged", data, { headers })
  }
  deleteTraning(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS + "deleteTraning", data, { headers })
  }
  getEmployeeDetailV2(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    }); 
  
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "getEmployeeDetailV2", data, {headers})
  }
  saveTeacherConfirmationV2(data: any): Observable<Response>{
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "saveTeacherConfirmationV2", data, {headers});
  }
  getTeacherConfirmationV2(data: any){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherConfirmationV2", data, {headers});
  }
  saveWorkExperienceV2(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE+ "saveWorkExperienceV2", data, {headers})
  }

  fetchSchoolPreferenceByStationCode(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getSchoolByMultipleStation", data, { headers })
  }

  uploadDocument(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "uploadDocument",  data,{headers});
  }

  uploadTicketDocument(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
      return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "uploadTicketDocument",  data,{headers});
  }

  initiateTicket(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
      return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "initiateTicket",  data,{headers});
  }
  resolveTicketByTicketId(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
      return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "resolveTicketByTicketId",  data,{headers});
  }
  downloadDocument(folderId: string, fileName: string): Observable<Blob> {
    var baseUrl = environment.BASE_URL_DATA_API_TICKET;
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
    const url = `${baseUrl}downloadDocument?folderId=${folderId}&fileName=${fileName}`;
    return this._http.get(url, { responseType: 'blob' });
  }


  getInitiatedTicketByTicketId(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
      return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "getInitiatedTicketByTicketId",  data,{headers});
  }

  deleteTicketDocument(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
      return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "deleteTicketDocument",  data,{headers});
  }
  getInitiatedTicket(data){
    debugger
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
      return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "getInitiatedTicket",  data,{headers});
  }

  getTicketCount(data){
    debugger
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
      return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "getEmployeeTicketCount",  data,{headers});
  }

  getDocumentByFolderId(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
      return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "getDocumentByFolderId",  data,{headers});
  }

  fetchUploadedDoc(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token, 
    }); 
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getDocumentByTeacherId", data,{headers})
  }

  deleteUploadedDoc(data) {
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "deleteDocumentByTeacherIdAndName", data)

  }

  uploadProfileImage(data) {
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "uploadProfileImage", data);
  }


  getProfileImage(data) {
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getProfileImage", data)
  }



  fetchConfirmedTchDetails(data) {

    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getConfirmedTeacherDetailsV2", data, { headers })

  }



  fetchTransferRegion(data) {

    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getTransferRegion", data, { headers })
  }


  fetchTransferStation(data) {

    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getTransferStation", data, { headers })
  }


  fetchIntraStationSchool(data) {

    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_MASTER + "getMaster", data, { headers })

  }

  getTransferData(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "getTransProfileV2", data, { headers });
  }

  getTcDcPointByTeacherIdAndInityear(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER_V2 + "getTcDcPointByTeacherIdAndInityear", data, { headers });
  }
  getFormStatusV2(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getFormStatusV2", data, { headers });
  }
  saveTransProfile(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "saveTransProfile", data, { headers });
  }
  saveTransferDCTCPoints(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "transfer/saveTransferDCTCPoints", data, { headers });
  }

  saveTransferConfirmation(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER_PROCESS + "saveTransferConfirmation", data, { headers });
  }
  saveTransferDeclaration(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "saveTransferDeclaration", data, { headers });
  }
  getTransferDeclaration(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferDeclaration", data, { headers });
  }

  getTransferPreviewPermissions(data: any) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "getEmployeeStatus", data, { headers });
  }

  savePreviewConsent(data: any) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "saveEmployeeTransferDeclaration", data, { headers });
  }

  saveEmployeeTransferDeclarationV2(data: any) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "saveEmployeeTransferDeclarationV2", data, { headers });
  }




}

