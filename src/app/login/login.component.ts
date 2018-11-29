import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ToastrNotificationService } from '../services/toastr-notification.service';

import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private username: string;
  private password: string;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrNotificationService
  ) { }

  ngOnInit() {
    const authToken = localStorage.getItem('auth_token') || '';
    if (authToken && !jwtHelper.isTokenExpired(authToken)) {
      this.router.navigate(['']);
    }
  }

  login() {
    const payload = {
      username: this.username,
      password: this.password
    }
    this.apiService.login(payload).subscribe((result) => {
      if (result) {
        this.userService.login(result.authToken, function () {
          this.toastr.success('Login successfully!');
          this.router.navigate(['']);
        });
      } else {
        this.toastr.error('Incorrect username or password!');
      }
    });
  }
}
