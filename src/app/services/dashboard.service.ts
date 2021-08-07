import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  host = 'http://localhost:3000/test';
  constructor(private httpClient: HttpClient) {
  }

  getQuestions(): Observable<any> {
    return this.httpClient.get(this.host);
  }
}
