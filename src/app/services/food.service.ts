import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService extends BaseApiService{
  constructor( db: AngularFireDatabase ) { 
   super(db);
 }
 collectionName() {
   return 'Tables'
 }
}
