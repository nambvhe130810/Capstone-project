import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {

  private apiUrl: string = "http://202.92.4.184:8585/CapstoneApi/api/v1/communications";
  constructor(private http: HttpClient) { }


  getListQuestion(type): Observable<any> {
    return this.http.post(`${this.apiUrl}?type=${type}`,{});
  }

  reply(question): Observable<any> {
    return this.http.post(`${this.apiUrl}/manage-reply`,question);
  }
}
