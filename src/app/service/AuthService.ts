import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
    
   }

  login(userDto,userName:any) {
    //alert("At service--->"+JSON.stringify(userDto));
    debugger
    var headers = new HttpHeaders({
     'username':userName
    });
     return this.http.post<any>(environment.LOGIN_URL_JWT + "sign-in", userDto,{ headers });
  
  }

//   getRoles()
//   {
//     return this.http.get<any>(environment.user_service_url + "/getRole")
//   }

//   register(userDto)
//   {
//     return this.http.post<any>(environment.user_service_url + "/sign-up", userDto)
//   }

//   getUsers(flag,stateId)
//   {
//     return this.http.get<any>(environment.user_service_url + "/getUserList", {params:{search : flag,stateId:stateId}});
//   }
//   getUserByStateId(){
//     return this.http.get<any>(environment.user_service_url + "/getUserByStateId", {params:{search : 'A'}});
//   }

//   deleteUserById(userDto){
//     return this.http.post<any>(environment.user_service_url + "/delete-user", userDto);
//   }

//   getAuthUserDetails(authCode){
//     return this.http.post<any>(environment.auth_service + "/get-usercradential", authCode);
//   }


 }
