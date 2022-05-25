import { AotCompiler } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-notification-system',
  templateUrl: './notification-system.component.html',
  styleUrls: ['./notification-system.component.css']
})
export class NotificationSystemComponent implements OnInit {
  constructor() { }
  public NotificationData: NotificationData[] = [];
  ngOnInit(): void {
    this.CheckDatesValid();
    this.CreateNotification("Account Update", "Your account has been updated!");
    this.CreateNotification("Alert!", "You need to check trailer bay 4.");
  }

  private CheckDatesValid() : void{
    var today = new Date();
    var inputMockData = { trailerId: 0,  bayId: 3, parkDate: new Date()}

    // Setting mock date REMOVE WHEN GETTING REAL DATA
    inputMockData.parkDate.setDate(today.getDate() - 8);
   

    today = new Date();
    // Setting today to 7 days from now
    today.setDate(today.getDate() - 7);

    if (inputMockData.parkDate.getDate() < today.getDate()) {
      const notificationTitle = "Trailer with ID: " + inputMockData.trailerId;
      const notificationMessage = " Return to trailer bay " + inputMockData.bayId;
      this.CreateNotification(notificationTitle, notificationMessage);
    }
    
  }

  public CreateNotification(SentHeader: string, SentBody: string) {
    this.NotificationData.push({Header:SentHeader, Body: SentBody})
  }
  
  public CreateHTML() {
    const app = document.getElementById("notificationSection");
    const header = "The header";
    const body = "The body"


     this.CreateNotification(header,body);
  }
}

export interface NotificationData {
  Header: string,
  Body: string
}
