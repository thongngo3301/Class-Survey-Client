import { Injectable, OnInit } from '@angular/core';

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