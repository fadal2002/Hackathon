import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})


export class NotificationComponent implements OnInit {
  public showNotification = true;
  @Input() notificationMessage = 'Example Message';
  @Input() notificationTitle = 'Example Title';

  constructor() { }

  ngOnInit(): void {
  
  }

  public onClose() {
    this.showNotification = false;
  }
}
