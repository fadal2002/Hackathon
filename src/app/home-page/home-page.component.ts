import { Component, OnInit } from '@angular/core';
import { BayRecord } from '../models/bay-record';
import { Scanner } from '../models/scanner';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public baysUsage: {key:string, value: number}[];
  public bayEvents: {key:string, value: number}[];
  public scannerState: {key:string, value: number}[];

  public bays: BayRecord[] = [];
  public scanners: Scanner[] = [];

  constructor(private firebaseService: FirebaseService) {
    this.baysUsage = [{key: 'Used', value: 0}, {key: 'Available', value: 0}];
    this.bayEvents = [
      {key: 'Exit Event', value: 28}, 
      {key: 'Enter Event', value: 46},
      {key: 'Bay Change Event', value: 33}
    ];

    this.scannerState = [{key: 'Enabled', value: 0}, {key: 'Disabled', value: 0}];

    this.firebaseService.getBayRecords().valueChanges().subscribe((data:any) => {
      this.bays = data;
      this.calculateBayUsage();
    });

    this.firebaseService.getScanners().valueChanges().subscribe((data:any) => {
      this.scanners = data;
      this.calculateScannerStates();
    })
  }
  
    ngOnInit(): void {
    }

   private calculateBayUsage(){
     let usedCouter = 0;
     this.bays.forEach((data:BayRecord) => {
       if(data.trailerId !== "") {
         usedCouter++;
       }
     });
     const used = {key: 'Used', value: usedCouter};
     const available = {key: 'Available', value: this.bays.length - usedCouter};
     this.baysUsage[0] = used;
     this.baysUsage[1] = available;
   }

   private calculateScannerStates(){
     let enabledCouter = 0;
     this.scanners.forEach((data:Scanner) => {
       if(data.isEnabled) {
        enabledCouter++;
       }
     });
     const enabled = {key: 'Enabled', value: enabledCouter};
     const Disabled = {key: 'Disabled', value: this.scanners.length - enabledCouter};
     this.scannerState[0] = enabled;
     this.scannerState[1] = Disabled;
   }
}
