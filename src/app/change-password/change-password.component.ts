import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ToastrNotificationService } from '../services/toastr-notification.service';

import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private changePasswordForm: FormGroup;
  private isSubmitted = false;
  private oldPassword: string;
  private newPassword: string;
  private newPasswordRetype: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrNotificationService
  ) { }

  ngOnInit() {
    const authToken = localStorage.getItem('auth_token') || '';
    if (authToken && !jwtHelper.isTokenExpired(authToken)) {
      this.router.navigate(['']);
    } else {
      this.changePasswordForm = this.formBuilder.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPasswordRetype: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.changePasswordForm.invalid) return;

    this.changePassword();
  }

  get formCtrl() { return this.changePasswordForm.controls; }

  validatePassword() {
    if (this.newPassword != this.newPasswordRetype) {
      this.toastr.error("Password retype doesn't match!");
      return false;
    } else if (this.newPassword == this.oldPassword) {
      this.toastr.error("New password must be different from old password!");
      return false;
    }
    return true;
  }

  changePassword() {
    if (!this.validatePassword()) return;
    const payload = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }
    this.apiService.changePassword(payload).subscribe((result) => {
      if (result) {
        this.toastr.success('Change password successfully!');
        this.router.navigate(['']);
      } else {
        this.toastr.error('Change password unsuccessfully!');
      }
    });
  }

}
