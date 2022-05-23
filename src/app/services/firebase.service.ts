import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private testListRef: AngularFireList<string>;

  constructor(private db: AngularFireDatabase) {
    this.testListRef = db.list('/test');
  }

  public getTest(): AngularFireList<string> {
    return this.testListRef;
  }

  public addTest(text: string) {
    this.testListRef.push(text);
  }
}
