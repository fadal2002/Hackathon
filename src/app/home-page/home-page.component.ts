import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public baysUsage: {key:string, value: number}[];
  public bayEvents: {key:string, value: number}[];
  constructor() {
    this.baysUsage = [{key: 'Used', value: 35}, {key: 'Available', value: 15}];
    this.bayEvents = [
      {key: 'Exit Event', value: 28}, 
      {key: 'Enter Event', value: 46},
      {key: 'Bay Change Event', value: 33}
    ];
   }

  ngOnInit(): void {
  }

}
