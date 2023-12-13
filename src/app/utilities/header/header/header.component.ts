import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoutLink = environment.LOGOUT_URL
  
  constructor(private router:Router) { }

  public ngOnInit(): void {
    $(document).ready(function(){
      $(".dropdown").mouseenter(function(){
        $(".dropdown-menu").show(500);
      });
      $(".dropdown").mouseleave(function(){
        $(".dropdown-menu").hide(500);
      });
    });
  }

  authlogout(){

    
    if(sessionStorage.getItem("loginType")=="jwt"){
     // alert("in if");
      sessionStorage.clear();
      // this.logoutLink=environment.LANDING_PAGE_URL
     // window.location.href= "https://demopgi.udiseplus.gov.in/school";
      window.location.href= "https://kvsonlinetransfer.kvs.gov.in/school";
      // this.router.navigate(['/login']);
}else if(sessionStorage.getItem("loginType")=="auth"){
 // alert("in else");
  sessionStorage.clear();
  window.location.href=this.logoutLink;
}

  }

}
