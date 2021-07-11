import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
 items: AngularFireList<any> = null;
  constructor(private db: AngularFireDatabase) { 
    this.items = db.list('Buffet');
  }
  getAll(): AngularFireList<any> {
    return this.items;
  }
}
