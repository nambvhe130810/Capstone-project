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
  set(key, value):Promise<any>{
    return this.db.list(this.collectionName()).set(key, value);
  }
  delete(item):Promise<any> {
    return this.db.list(`${this.collectionName()}`).remove(item);
  }
  getBySource(source): Observable<any> {
    return this.db.list(`${this.collectionName()}/${source}`).valueChanges();
  }
  setBySource(key, value, source):Promise<any> {
    return this.db.list(`${this.collectionName()}/${source}`).set(key, value);
  }
  createBySource(item, source):Promise<any> {
    return this.db.list(`${this.collectionName()}/${source}`).push(item);
  }
  deleteBySource(item, source):Promise<any> {
    return this.db.list(`${this.collectionName()}/${source}`).remove(item);
  }
}
