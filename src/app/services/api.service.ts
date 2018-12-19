import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { UserService } from './user.service';

const baseURL = "http://class-survey.herokuapp.com";
// const baseURL = "http://192.168.17.52:5000";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseURL: string;
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) {
    this.baseURL = baseURL;
  }

  getHeaderOptions() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "access_token":
          localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
      })
    }
  }

  login(payload: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/users/login`, payload);
  }

  changePassword(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.post(`${this.baseURL}/users/change-password`, payload, httpOptions);
  }

  getAllSurveyData(): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    const role_id = this.userService.getRoleId();
    const user_id = this.userService.getUserId();
    switch (role_id) {
      case '1':
        return this.httpClient.get(`${this.baseURL}/admins/classes`, httpOptions);
      case '2':
        return this.httpClient.get(`${this.baseURL}/teachers/${user_id}/classes`, httpOptions);
      case '3':
        return this.httpClient.get(`${this.baseURL}/students/${user_id}/classes`, httpOptions);
    }
  }

  getAllStudentData(): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    const role_id = this.userService.getRoleId();
    switch (role_id) {
      case '1':
        return this.httpClient.get(`${this.baseURL}/admins/students`, httpOptions);
      case '3':
        return this.httpClient.get(`${this.baseURL}/students`, httpOptions);
    }
  }

  getStudentData(payload: string): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.get(`${this.baseURL}/admins/students/${payload}`, httpOptions);
  }

  getAllLecturerData(): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    const role_id = this.userService.getRoleId();
    switch (role_id) {
      case '1':
        return this.httpClient.get(`${this.baseURL}/admins/teachers`, httpOptions);
      case '2':
        return this.httpClient.get(`${this.baseURL}/teachers`, httpOptions);
    }
  }

  getLecturerData(payload: string): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.get(`${this.baseURL}/admins/teachers/${payload}`, httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}