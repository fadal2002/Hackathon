import { Component, OnInit } from '@angular/core';
import { BayRecord } from '../models/bay-record';
import { AddBayService } from '../services/add-bay.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-bay-management',
  templateUrl: './bay-management.component.html',
  styleUrls: ['./bay-management.component.css']
})
export class BayManagementComponent implements OnInit {
  public bays: BayRecord[] = []
  constructor(private addBayservice: AddBayService,
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getBayRecords().valueChanges().subscribe((bayRecords: BayRecord[]) => {
      bayRecords.forEach((bayRecord) => {
        if(bayRecord.mapped){
          this.bays.push(bayRecord)
        }
      })
    })
    this.addBayservice.getBayAdded().subscribe((bayRecord: BayRecord) => {
      this.bays.push(bayRecord);
    });
  }
}
