import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { NgxfUploaderService } from 'ngxf-uploader';
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

const baseURL = "http://192.168.16.158:5000";

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

  uploadFiles(payload: any): Observable<any> {
    const formData: any = new FormData();
    const files: Array<File> = payload;
    files.forEach(f => formData.append('fileUpload', f));
    console.log('formData', formData.toString());
    // return this.httpClient.post(`${this.baseURL}/upload`, formData);
    return this.httpClient.post('https://us-central1-alanzouhome.cloudfunctions.net/api/file', formData);
    // return this.Upload.upload({
    //   url: 'https://us-central1-alanzouhome.cloudfunctions.net/api/file',
    //   // url: `${this.baseURL}/upload`,
    //   headers: {
    //     Authorization: localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
    //   },
    //   files: payload,
    //   process: true
    // });
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