import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl = 'http://localhost:3000';  // URL to web api
  constructor(private http: HttpClient) { }

  login(postData): Observable<any> {
    console.log("from servic")
    console.log(postData)
    return this.http.post<any>(this.apiBaseUrl+'/login',postData);
  }
}
