import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transfer-progresion-bar',
  templateUrl: './transfer-progresion-bar.component.html',
  styleUrls: ['./transfer-progresion-bar.component.css']
})
export class TransferProgresionBarComponent implements OnInit {
  currentUrl: any;
  profileVerifiation: boolean = false;
  miscellaneousPge: boolean = false;
  stationChoicepage: boolean = false;
  displacementCountPage: boolean = false;
  transferCountPage: boolean = false;
  previewAndUndertakingPage: boolean = false;
  constructor(private route: ActivatedRoute ) { }

  ngOnInit(): void {
   
   this.route.url.subscribe(url =>{
    debugger
    if(url[0].path=='profileVerifiation')
    {
    this.profileVerifiation=true;
    this.miscellaneousPge=false;
    this.stationChoicepage=false;
    this.displacementCountPage=false;
    this.transferCountPage=false;
    this.previewAndUndertakingPage=false;
    }
    if(url[0].path=='transferMiscellaneous')
    {
      this.profileVerifiation=true;
      this.miscellaneousPge=true;
      this.stationChoicepage=false;
      this.displacementCountPage=false;
      this.transferCountPage=false;
      this.previewAndUndertakingPage=false;
    }
    if(url[0].path=='transferStationChoice')
    {
      this.profileVerifiation=true;
      this.miscellaneousPge=true;
      this.stationChoicepage=true;
      this.displacementCountPage=false;
      this.transferCountPage=false;
      this.previewAndUndertakingPage=false;
    }
    if(url[0].path=='transferDcCount')
    {
      this.profileVerifiation=true;
      this.miscellaneousPge=true;
      this.stationChoicepage=true;
      this.displacementCountPage=true;
      this.transferCountPage=false;
      this.previewAndUndertakingPage=false;
    }
    if(url[0].path=='transferTcCount')
    {
      this.profileVerifiation=true;
      this.miscellaneousPge=true;
      this.stationChoicepage=true;
      this.displacementCountPage=true;
      this.transferCountPage=true;
      this.previewAndUndertakingPage=false;
    }
    if(url[0].path=='teacherPreviewConfirm')
    {
      this.profileVerifiation=true;
      this.miscellaneousPge=true;
      this.stationChoicepage=true;
      this.displacementCountPage=true;
      this.transferCountPage=true;
      this.previewAndUndertakingPage=true;
    }
    });
  }

}
