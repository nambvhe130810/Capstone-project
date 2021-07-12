import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { BaseApiService } from './base-api.service';


@Injectable({
  providedIn: 'root'
})
export class ProcessOrderService extends BaseApiService{
  private data = new BehaviorSubject<string>("default message");
  currentMessage = this.data.asObservable();

   constructor( db: AngularFireDatabase ) { 
    super(db);
  }
  collectionName() {
    return 'ProcessOrder'
  }
  changeMessage(message: string) {
    this.data.next(message);
  }
}

