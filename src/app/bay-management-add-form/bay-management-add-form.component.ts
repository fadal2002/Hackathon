import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { textChangeRangeIsUnchanged } from 'typescript';
import { BayRecord } from '../models/bay-record';
import { AddBayService } from '../services/add-bay.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-bay-management-add-form',
  templateUrl: './bay-management-add-form.component.html',
  styleUrls: ['./bay-management-add-form.component.css']
})
export class BayManagementAddFormComponent {
  public dropdownOpened = false
  public bays: BayRecord[] = []
  public addBayGroup = new FormGroup({
    BayName: new FormControl(''),
    ScannerId: new FormControl('')
  })
  public bayValue: BayRecord = {} as BayRecord

  constructor(private offcanvasService: NgbOffcanvas,
    private addBayService: AddBayService,
    private firebaseService: FirebaseService) {
      this.firebaseService.getBayRecords().valueChanges().subscribe((data) => {
        this.bays = data
      })
    }

  open(content: any) {
    this.offcanvasService.open(content, { position: 'end' });
  }
  
  changed(bay: any): void {
    this.addBayGroup.controls['BayName'].setValue(bay)
  }

  addBay(): void {
    console.log(`Bay Name: ${this.addBayGroup.controls['BayName'].value}`)
    this.addBayService.newBayAdded(this.addBayGroup.controls['BayName'].value);
  }

  public itemClicked(e: any): void {
    this.bayValue = e.itemData
    this.dropdownOpened = false;
  } 
}
