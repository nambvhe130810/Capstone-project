import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseApiService{
  private data = new BehaviorSubject<string>("default message");
  currentMessage = this.data.asObservable();
  collectionName() {
    return 'Bill';
  }

  constructor(db:AngularFireDatabase) { 
    super(db);
  }
  changeMessage(message: string) {
    this.data.next(message);
  }
}
