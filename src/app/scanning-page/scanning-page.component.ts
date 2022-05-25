import { Component, OnInit } from '@angular/core';
import { BayRecord } from '../models/bay-record';
import { Scanner } from '../models/scanner';
import { NotificationData } from '../notification-system/notification-system.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-scanning-page',
  templateUrl: './scanning-page.component.html',
  styleUrls: ['./scanning-page.component.css']
})
export class ScanningPageComponent implements OnInit {

  public previousScannedResult: string;
  public scannerId: string;
  public isValidScanner: boolean;
  public beep: HTMLAudioElement;
  public isScannerEnabled: boolean;
  public showInvalidId: boolean;

  private scannerUids: string[] = [];
  private scannersList: Scanner[] = [];
  private currentScanner: Scanner | undefined;
  private hasScanned: boolean;

  constructor(private firebaseService: FirebaseService) { 
    this.previousScannedResult = "";
    this.scannerId = "";
    this.isValidScanner = false;
    this.beep = new Audio("./../../assets/mixkit-censorship-beep-1082.wav");
    this.beep.load();
    this.isScannerEnabled = true;
    this.showInvalidId = false;
    this.currentScanner = {uid: "", bayID: "", isEnabled: false};
    this.hasScanned = false;

    this.firebaseService.getScannerUids().valueChanges().subscribe((data: any) => {
      this.scannerUids = data;
    });

    this.firebaseService.getScanners().valueChanges().subscribe((data: any) => {
      this.scannersList = data;
    });
  }

  ngOnInit(): void {
    this.enableScannerFrequently();
  }

  public scanSuccessHandler(event: any) {
    this.beep.play();
    this.hasScanned = true;
    if (event === this.previousScannedResult){
      this.isScannerEnabled = false;
      return;
    }
    this.previousScannedResult = event;
    const bayRecord: BayRecord = {trailerId: event, bayId: this.currentScanner?.bayID,
       parkDate: Date.now()};
    this.firebaseService.addBayRecord(bayRecord);
    const notification: NotificationData = {Header: "Bay Update", Body: `Trailer ID (${event}) has parked
     in Bay ID (${this.currentScanner?.bayID}).`};
    this.firebaseService.addNotification(notification);
    this.isScannerEnabled = false;
  }

  private enableScannerFrequently(){
    this.isScannerEnabled = true;
    this.hasScanned = false;
    setTimeout(() =>{ 
      this.isScannerEnabled = false;
      if (!this.hasScanned) {
        this.previousScannedResult = "";
        const bayRecord: BayRecord = {trailerId: "", bayId: this.currentScanner?.bayID,
          parkDate: Date.now()};
        this.firebaseService.addBayRecord(bayRecord);
        const notification: NotificationData = {Header: "Bay Update", Body: `Bay ID (${this.currentScanner?.bayID}) is now available.`};
       this.firebaseService.addNotification(notification);
      }
      setTimeout(() =>{ this.enableScannerFrequently(); }, 10000);
    }, 20000);
  }

  public verifyScannerId() {
    if (this.scannerUids.includes(this.scannerId))
    {
      this.currentScanner = this.scannersList.find(i => i.uid === this.scannerId);
      this.isValidScanner = true;
    }
    else{
      this.showInvalidId = true;
    }
  }
}
