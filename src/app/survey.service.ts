import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {catchError} from "rxjs/internal/operators";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Surveyserv {
  // private apiBaseUrl = 'http://localhost:3000/api';  // URL to web api
  // private apiBaseUrl = 'http://127.0.0.1:3000';  // URL to web api
  private apiBaseUrl = 'http://localhost:3000';  // URL to web api
  constructor(private http: HttpClient) { }


  login(postData): Observable<any> {
    console.log("angular side ", postData)
    return this.http.get<any>(this.apiBaseUrl+'/api/login?email='+postData.email+'&password='+postData.password);
  }

  addnewrequest(postData): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl+'/api/addnewrequest?email='+localStorage.getItem('email')+'&productname='+postData.productname+'&productcode='+postData.productcode+'&description='+postData.description+'&returntype='+postData.returntype);
  }

  getuserdashlist(postData): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl+'/api/getuserdashlist');
  }


}
