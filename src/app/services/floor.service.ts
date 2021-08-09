import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BaseApiService } from './base-api.service';


@Injectable({
  providedIn: 'root'
})
export class FloorService extends BaseApiService{
   constructor( db: AngularFireDatabase ) { 
    super(db);
  }
  collectionName() {
    return 'Floors'
  }
}
