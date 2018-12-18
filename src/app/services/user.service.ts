import { Injectable, OnInit } from '@angular/core';

const adminRoutes = [
  { path: '/survey-manager', title: 'Survey Manager', icon: 'education_paper', class: '' },
  { path: '/template-manager', title: 'Template Manager', icon: 'design_bullet-list-67', class: '' },
  { path: '/student-manager', title: 'Student Manager', icon: 'business_badge', class: '' },
  { path: '/lecturer-manager', title: 'Lecturer Manager', icon: 'business_briefcase-24', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
  { path: '/typography', title: 'Typography', icon: 'text_caps-small', class: '' }
]

const studentRoutes = [
  { path: '/survey-manager', title: 'Survey Manager', icon: 'education_paper', class: '' },
  { path: '/icons', title: 'Icons', icon: 'education_atom', class: '' }
]

const lecturerRoutes = [
  { path: '/home', title: 'Home', icon: 'design_app', class: '' },
  { path: '/lecturer/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
  { path: '/lecturer/table-list', title: 'Table List', icon: 'design_bullet-list-67', class: '' },
  { path: '/lecturer/typography', title: 'Typography', icon: 'text_caps-small', class: '' }
]

@Injectable()
export class UserService implements OnInit {
  private loggedIn: boolean;
  private authToken: any;
  private roleId: any;

  constructor() {
    this.setAuthStatus(!!this.getAuthToken());
  }

  ngOnInit() {

  }

  setAuthStatus(status: boolean) {
    this.loggedIn = status;
  }

  getAuthStatus() {
    return this.loggedIn;
  }

  setAuthToken(token: any) {
    this.authToken = token;
    localStorage.setItem('auth_token', token);
  }
  setRoleId(roleId: any) {
    this.roleId = roleId;
    localStorage.setItem('role_id', roleId);
  }

  getAuthToken() {
    return localStorage.getItem('auth_token');
  }
  getRoleId() {
    return localStorage.getItem('role_id');
  }

  removeAuthToken() {
    this.setAuthToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role_id');
  }

  getUserRoutes() {
    const _role = this.getRoleId();
    switch (_role) {
      case '1':
        return adminRoutes;
      case '2':
        return lecturerRoutes;
      case '3':
        return studentRoutes;
    }
  }

  login(authData, callback) {
    this.setAuthToken(authData.token);
    this.setRoleId(authData.role_id);
    this.setAuthStatus(true);
    callback && callback();
  }

  logout(callback) {
    this.removeAuthToken();
    this.setAuthStatus(false);
    callback && callback();
  }
}