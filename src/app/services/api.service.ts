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
// const baseURL = "http://192.168.16.158:5000";

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

  addStudentData(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.post(`${this.baseURL}/admins/students`, payload, httpOptions);
  }

  editStudentData(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.put(`${this.baseURL}/admins/students/${payload.studentId}`, payload, httpOptions);
  }

  removeStudentData(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.delete(`${this.baseURL}/admins/students/${payload.studentId}`, httpOptions);
  }

  removeStudentClass(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.delete(`${this.baseURL}/students/${payload.studentId}/classes/${payload.classId}`, httpOptions);
  }

  addStudentClass(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.post(`${this.baseURL}/students/${payload.studentId}/classes`, { classId: payload.classId }, httpOptions);
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

  addLecturerData(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.post(`${this.baseURL}/admins/teachers`, payload, httpOptions);
  }

  editLecturerData(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.put(`${this.baseURL}/admins/teachers/${payload.teacherId}`, payload, httpOptions);
  }

  removeLecturerData(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.delete(`${this.baseURL}/admins/teachers/${payload.lecturerId}`, httpOptions);
  }

  removeLecturerClass(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.delete(`${this.baseURL}/teachers/${payload.lecturerId}/classes/${payload.classId}`, httpOptions);
  }

  addLecturerClass(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.post(`${this.baseURL}/teachers/${payload.lecturerId}/classes`, { classId: payload.classId }, httpOptions);
  }

  getSurveyOfStudent(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.get(`${this.baseURL}/students/${payload.studentId}/classes/${payload.surveyId}/survey`, httpOptions);
  }

  submitSurvey(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.put(`${this.baseURL}/students/${payload.studentId}/classes/${payload.surveyId}/survey`, payload.data, httpOptions);
  }

  getStudentsInClass(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.get(`${this.baseURL}/teachers/${payload.userId}/classes/${payload.classId}/students`, httpOptions);
  }

  getSurveyResult(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    const role_id = this.userService.getRoleId();
    switch (role_id) {
      case '1':
        return this.httpClient.get(`${this.baseURL}/admins/classes/${payload.classId}/survey`, httpOptions);
      case '2':
        return this.httpClient.get(`${this.baseURL}/teachers/${payload.userId}/classes/${payload.classId}/survey`, httpOptions);
    }
  }

  getAllTemplates(): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.get(`${this.baseURL}/admins/templates`, httpOptions);
  }

  getTemplateData(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.get(`${this.baseURL}/admins/templates/${payload.templateId}`, httpOptions);
  }

  addTemplateData(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.post(`${this.baseURL}/admins/templates`, payload, httpOptions);
  }

  editTemplateData(payload: any): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.put(`${this.baseURL}/admins/templates/${payload.templateId}`, payload, httpOptions);
  }

  activateTemplate(payload): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.put(`${this.baseURL}/admins/templates/${payload.templateId}/toUse`, '', httpOptions);
  }

  reset(): Observable<any> {
    const httpOptions = this.getHeaderOptions();
    return this.httpClient.put(`${this.baseURL}/admins/reset`, '', httpOptions);
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