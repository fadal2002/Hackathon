import { Component, OnInit } from '@angular/core';
import { Scanner } from '../models/scanner';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-scanner-registration',
  templateUrl: './scanner-registration.component.html',
  styleUrls: ['./scanner-registration.component.css']
})
export class ScannerRegistrationComponent implements OnInit {
  public uid: string
  public bayID: string
  public isEnabled: boolean

  public scanObject: Scanner

  public constructor(
    private firebaseService: FirebaseService 
    ) 
    {
    this.uid = "";
    this.bayID = "";
    this.isEnabled = false;

    this.scanObject = {
      uid: this.uid,
      bayID: this.bayID,
      isEnabled: this.isEnabled
    }
  }

  ngOnInit(): void {
  }

  public addClick(){ 
    this.scanObject = {
      uid: this.uid,
      bayID: this.bayID,
      isEnabled: this.isEnabled
    }

    this.firebaseService.addScanners(this.scanObject);
  }

  public testFunction(event:any){
    // console.log(this.uid);
    console.log(this.scanObject);
    this.scanObject.uid = "";
  }
}