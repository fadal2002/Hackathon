import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bay-management-add-form',
  templateUrl: './bay-management-add-form.component.html',
  styleUrls: ['./bay-management-add-form.component.css']
})
export class BayManagementAddFormComponent {
  public addBayGroup = new FormGroup({
    BayName: new FormControl({}),
    ScannerId: new FormControl({})
  })
  constructor(private offcanvasService: NgbOffcanvas) {}

  open(content: any) {
    this.offcanvasService.open(content, { position: 'end' });
  }

}
