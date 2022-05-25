import { Component, OnInit } from '@angular/core';
import { Scanner } from '../models/scanner';
import { NotificationData } from '../notification-system/notification-system.component';
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

  public enabledSetting: string

  public constructor(
    private firebaseService: FirebaseService 
    ) 
    {
    this.uid = "";
    this.bayID = "";
    this.isEnabled = false;
    this.enabledSetting = ""

    this.scanObject = {
      uid: this.uid,
      bayID: this.bayID,
      isEnabled: this.isEnabled
    }
  }

  ngOnInit(): void {
  }
  

  public addClick(){
    var enabled = false;

    if(this.enabledSetting === "true"){
      enabled = true
      
    }else{
      enabled = false
    }

    this.scanObject = {
      uid: this.uid,
      bayID: this.bayID,
      isEnabled: enabled
    }
    this.firebaseService.addScanners(this.scanObject);
    const notification: NotificationData = {Header: "Scanner Registered", Body: `Scanner ID (${this.uid}) has been
     registered with Bay ID (${this.bayID}).`};
    this.firebaseService.addNotification(notification);

    this.uid = "";
    this.bayID = "";
    this.isEnabled = false;
  }
}
