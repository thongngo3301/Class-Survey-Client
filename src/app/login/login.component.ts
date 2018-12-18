import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private toastr: ToastrNotificationService
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
    this.apiService.login(payload).subscribe((result) => {
      if (result && result.success) {
        this.userService.login(result.data, () => {
          this.toastr.success('Login successfully!');
          this.router.navigate(['/survey-manager']);
          // switch (this.userService.getRoleId()) {
          //   case '1':
          //     this.router.navigate(['/survey-manager']);
          //     break;
          //   case '2':
          //     this.router.navigate(['/home']);
          //     break;
          //   case '3':
          //     this.router.navigate(['/survey-manager']);
          //     break;
          // }
        });
      } else {
        this.toastr.error('Incorrect username or password!');
      }
    });
  }
}
