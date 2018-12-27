import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ToastrNotificationService } from '../services/toastr-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private isSubmitted = false;
  private username: string;
  private password: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrNotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    const authToken = localStorage.getItem('auth_token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (authToken != "undefined") {
      this.router.navigate(['']);
      return;
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) return;

    this.login();
  }

  get formCtrl() { return this.loginForm.controls; }

  login() {
    const payload = {
      username: this.username,
      password: this.password
    }
    this.spinner.show();
    this.apiService.login(payload).subscribe((result) => {
      this.spinner.hide();
      if (result && result.success) {
        this.userService.setUserId(payload.username);
        this.userService.login(result.data, () => {
          this.toastr.success('Login successfully!');
          this.router.navigate(['/survey-manager']);
        });
      } else {
        this.toastr.error('Incorrect username or password!');
      }
    });
  }
}
