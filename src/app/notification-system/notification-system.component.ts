import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-notification-system',
  templateUrl: './notification-system.component.html',
  styleUrls: ['./notification-system.component.css']
})
export class NotificationSystemComponent implements OnInit {
  public NotificationData: NotificationData[] = [];

  constructor(private firebaseService: FirebaseService, private changeDetector: ChangeDetectorRef) { 
    this.firebaseService.getNotifications().valueChanges().subscribe((data:NotificationData[]) => {
      if (data.length == 0) {
        return;
      }
      this.NotificationData = data;
      this.changeDetector.detectChanges();
      this.firebaseService.getNotifications().remove();
    });
  }

  ngOnInit(): void {
  }
}

export interface NotificationData {
  Header: string,
  Body: string
}
