import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BaseApiService } from './base-api.service';


@Injectable({
  providedIn: 'root'
})
export class BuffetService extends BaseApiService {
  constructor(db: AngularFireDatabase) {
    super(db);
  }
  collectionName() {
    return 'Buffets'
  }
  getAllListDetail(id): AngularFireList<any> {
    return this.db.list("/"+this.collectionName() + "/" + id + "/list");
  }
  // getAll(): AngularFireList<any> {
  //   return this.items;
  // }
}
