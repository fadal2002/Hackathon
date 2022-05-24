import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanning-page',
  templateUrl: './scanning-page.component.html',
  styleUrls: ['./scanning-page.component.css']
})
export class ScanningPageComponent implements OnInit {

  public scannedResult: string;
  public scannerId: string;
  public isValidScanner: boolean;
  public beep: HTMLAudioElement;
  public isScannerEnabled: boolean;

  constructor() { 
    this.scannedResult = "";
    this.scannerId = "";
    this.isValidScanner = false;
    this.beep = new Audio("./../../assets/mixkit-censorship-beep-1082.wav");
    this.beep.load();
    this.isScannerEnabled = true;
  }

  ngOnInit(): void {
  }

  public scanSuccessHandler(event: any) {
    this.beep.play();
    console.log(event);
    this.scannedResult = event;
    this.isScannerEnabled = false;
  }

  public verifyScannerId() {
    this.isValidScanner = true;
  }
}
