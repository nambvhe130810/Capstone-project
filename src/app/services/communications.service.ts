import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService extends BaseApiService {

  private apiUrl: string = "http://202.92.4.184:8585/CapstoneApi/api/v1/communications";
  constructor(private http: HttpClient,db: AngularFireDatabase) {
    super(db);
  }

  collectionName() {
    return '/Communications'
  }

  getListQuestion(type): Observable<any> {
    return this.http.post(`${this.apiUrl}?type=${type}`,{});
  }

  reply(question): Observable<any> {
    return this.http.post(`${this.apiUrl}/manage-reply`,question);
  }
}
