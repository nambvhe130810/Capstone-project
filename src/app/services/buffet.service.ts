import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class BuffetService {
  items: AngularFireList<any> = null;
  constructor(private db: AngularFireDatabase) { 
    this.items = db.list('Buffets');
  }
  getAll(): AngularFireList<any> {
    return this.items;
  }
}
