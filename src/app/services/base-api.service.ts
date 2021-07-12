import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {
  protected get collection() {
    return this.collectionName();
  }

  abstract collectionName();

  constructor(private db: AngularFireDatabase) { 
  }
  getAll(): AngularFireList<any> {
    return this.db.list(this.collectionName());
  }
  create(order) {
    return this.db.list(this.collectionName()).push(order);
  }
  update(key, value): Promise<any> {
    return this.db.list(this.collectionName()).update(key, value);
  }
}
