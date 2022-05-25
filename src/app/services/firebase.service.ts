import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { BayRecord } from '../models/bay-record';
import { Scanner } from '../models/scanner';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private scannersListRef: AngularFireList<Scanner>;
  private scannerUidsRef: AngularFireList<string>;
  private bayRecordsRef: AngularFireList<BayRecord>;


  constructor(private db: AngularFireDatabase) {
    this.scannersListRef = db.list('/scanners');
    this.scannerUidsRef = db.list('/scannerUids');
    this.bayRecordsRef = db.list('/bayRecords');
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

  public addBayRecord(bayRecord: BayRecord) {
    this.db.database.ref().child(`/bayRecords/${bayRecord.bayId}`).set(bayRecord);
  }

  public addScanners(scanObject: Scanner) {
    this.db.database.ref().child(`/scanners/${scanObject.uid}`).set(scanObject);
    this.scannerUidsRef.push(scanObject.uid)
  }
}
