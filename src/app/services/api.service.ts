import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { NgxfUploaderService } from 'ngxf-uploader';
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

const baseURL = "http://class-survey.herokuapp.com";
// const baseURL = "http://192.168.17.52:5000";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseURL: string;
  constructor(private httpClient: HttpClient, private Upload: NgxfUploaderService) {
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
    return this.httpClient.get(`${this.baseURL}/admins/classes`, httpOptions);
  }

  getAllStudentData(): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.get(`${this.baseURL}/admins/students`, httpOptions);
  }

  getStudentData(payload: string): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.get(`${this.baseURL}/admins/students/${payload}`, httpOptions);
  }

  getAllLecturerData(): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.get(`${this.baseURL}/admins/teachers`, httpOptions);
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