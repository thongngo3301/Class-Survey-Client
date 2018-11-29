import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class UserService implements OnInit {
  private loggedIn: boolean;
  private authToken: any;

  ngOnInit() {
    this.setAuthStatus(!!this.getAuthToken());
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

  getAuthToken() {
    return localStorage.getItem('auth_token');
  }

  removeAuthToken() {
    this.setAuthToken(null);
    localStorage.removeItem('auth_token');
  }

  login(authToken, callback) {
    this.setAuthToken(authToken);
    this.setAuthStatus(true);
    callback && callback();
  }

  logout(callback) {
    this.removeAuthToken();
    this.setAuthStatus(false);
    callback && callback();
  }
}