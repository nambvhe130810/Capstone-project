import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BaseApiService } from './base-api.service';


@Injectable({
  providedIn: 'root'
})
export class BuffetService extends BaseApiService  {
  items: AngularFireList<any> = null;
  constructor(db: AngularFireDatabase) { 
    super(db);
  }

  collectionName() {
    return '/Buffets'
  }
  // getAll(): AngularFireList<any> {
  //   return this.items;
  // }
}
