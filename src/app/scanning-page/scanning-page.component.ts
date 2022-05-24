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

  constructor() { 
    this.scannedResult = "";
    this.scannerId = "";
    this.isValidScanner = false;
  }

  ngOnInit(): void {
  }

  public scanSuccessHandler(event: any) {
    console.log(event);
    this.scannedResult = event;
  }

  public verifyScannerId() {
    this.isValidScanner = true;
  }
}
