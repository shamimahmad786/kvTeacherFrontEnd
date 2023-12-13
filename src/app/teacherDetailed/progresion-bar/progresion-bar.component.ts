import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progresion-bar',
  templateUrl: './progresion-bar.component.html',
  styleUrls: ['./progresion-bar.component.css']
})
export class ProgresionBarComponent implements OnInit {
  currentUrl: any;
  profilePage: boolean = false;
  experiencePage: boolean = false;
  uploadPage: boolean = false;
  constructor(private route: ActivatedRoute ) { }

  ngOnInit(): void {
   
   this.route.url.subscribe(url =>{
    if(url[0].path=='teacherBasicProfile')
    {
    this.profilePage=true;
    this.experiencePage=false;
    this.uploadPage=false;
    }
    if(url[0].path=='teacherWorkExperience')
    {
    this.profilePage=true;
    this.experiencePage=true;
    this.uploadPage=false;
    }
    if(url[0].path=='teacherPreviewConfirm')
    {
    this.profilePage=true;
    this.experiencePage=true;
    this.uploadPage=true;
    }
    });
  }

}
