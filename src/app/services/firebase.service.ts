import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { BayRecord } from '../models/bay-record';
import { Scanner } from '../models/scanner';
import { NotificationData } from '../notification-system/notification-system.component';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private scannersListRef: AngularFireList<Scanner>;
  private scannerUidsRef: AngularFireList<string>;
  private bayRecordsRef: AngularFireList<BayRecord>;
  private notificationsRef: AngularFireList<NotificationData>;


  constructor(private db: AngularFireDatabase) {
    this.scannersListRef = db.list('/scanners');
    this.scannerUidsRef = db.list('/scannerUids');
    this.bayRecordsRef = db.list('/bayRecords');
    this.notificationsRef = db.list('/notifications');
  }

  public getScanners(): AngularFireList<Scanner> {
    return this.scannersListRef;
  }

  public getScannerUids(): AngularFireList<string> {
    return this.scannerUidsRef;
  }

  public getBayRecords(): AngularFireList<BayRecord> {
    return this.bayRecordsRef;
  }

  public getNotifications(): AngularFireList<NotificationData> {
    return this.notificationsRef;
  }

  public addBayRecord(bayRecord: BayRecord) {
    this.db.database.ref().child(`/bayRecords/${bayRecord.bayId}`).set(bayRecord);
  }

  public addNotification(notification: NotificationData) {
    this.notificationsRef.push(notification);
  }

  public addScanners(scanObject: Scanner) {
    this.db.database.ref().child(`/scanners/${scanObject.uid}`).set(scanObject);
    this.scannerUidsRef.push(scanObject.uid)
  }
}
