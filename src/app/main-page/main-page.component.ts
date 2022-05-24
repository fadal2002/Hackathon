import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    // this.firebaseService.getTest().valueChanges().subscribe((data:any) => {
    //   console.log(data);
    // })
  }

}
