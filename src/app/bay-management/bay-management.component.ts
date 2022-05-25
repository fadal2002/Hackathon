import { Component, OnInit } from '@angular/core';
import { AddBayService } from '../services/add-bay.service';

@Component({
  selector: 'app-bay-management',
  templateUrl: './bay-management.component.html',
  styleUrls: ['./bay-management.component.css']
})
export class BayManagementComponent implements OnInit {
  public bays: string[] = []
  constructor(private addBayservice: AddBayService) { }

  ngOnInit(): void {
    this.addBayservice.getBayAdded().subscribe(() => {
      this.bays.push(`New Bay: ${this.bays.length}`);
    });
  }

}
