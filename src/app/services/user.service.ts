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
  { path: '/student-manager', title: 'Student Manager', icon: 'business_badge', class: '' }
]

const lecturerRoutes = [
  { path: '/survey-manager', title: 'Survey Manager', icon: 'education_paper', class: '' },
  { path: '/lecturer-manager', title: 'Lecturer Manager', icon: 'business_briefcase-24', class: '' }
]

@Injectable()
export class UserService implements OnInit {
  private loggedIn: boolean;

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
    localStorage.setItem('auth_token', token);
  }
  setRoleId(roleId: any) {
    localStorage.setItem('role_id', roleId);
  }
  setUserId(userId: any) {
    localStorage.setItem('user_id', userId);
  }

  getAuthToken() {
    return localStorage.getItem('auth_token');
  }
  getRoleId() {
    return localStorage.getItem('role_id');
  }
  getUserId() {
    return localStorage.getItem('user_id');
  }

  removeAuthToken() {
    this.setAuthToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role_id');
    localStorage.removeItem('user_id');
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