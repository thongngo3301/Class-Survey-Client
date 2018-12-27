import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { NgxSpinnerService } from 'ngx-spinner';

import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ToastrNotificationService } from '../services/toastr-notification.service';

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
    private toastr: ToastrNotificationService,
    private location: Location,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordRetype: ['', Validators.required]
    });
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
    this.spinner.show();
    this.apiService.changePassword(payload).subscribe((result) => {
      this.spinner.hide();
      if (result && result.success) {
        this.toastr.success('Change password successfully!');
        this.router.navigate(['']);
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  onBackButtonClicked() {
    this.location.back();
  }

}
