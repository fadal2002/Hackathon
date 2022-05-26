import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { BayRecord } from '../models/bay-record';

@Injectable({
  providedIn: 'root'
})
export class AddBayService {
  public bayAdded = new Subject<BayRecord>();
  constructor() { }

  public getBayAdded(): Observable<BayRecord> {
    return this.bayAdded.asObservable();
  }

  public newBayAdded(bayRecord: BayRecord): void {
    this.bayAdded.next(bayRecord)
  }
}
