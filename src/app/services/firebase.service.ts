import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Scanner } from '../models/scanner';
// import { Scannw }

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private scannersListRef: AngularFireList<Scanner>;
  private scannerUidRef: AngularFireList<string>


  constructor(private db: AngularFireDatabase) {
    this.scannersListRef = db.list('/scanners');
    this.scannerUidRef = db.list('/scannerUids');
  }

  public getScanners(): AngularFireList<Scanner> {
    return this.scannersListRef;
  }

  public addScanners(scanObject: Scanner) {
    this.db.database.ref().child(`/scanners/${scanObject.uid}`).set(scanObject);
    this.scannerUidRef.push(scanObject.uid)
  }
}
