import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';

@Component({
  selector: 'app-lecturer-profile',
  templateUrl: './lecturer-profile.component.html',
  styleUrls: ['./lecturer-profile.component.scss']
})
export class LecturerProfileComponent implements OnInit, AfterViewInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrNotificationService,
    private location: Location
  ) { }

  private action: string;
  private id: string;

  private isReady: boolean = false;

  private title: string;
  private fullName: string;
  private lecturerId: string;
  private dob: Date;
  private username: string;
  private email: string;

  private lecturerProfileForm: FormGroup;
  private config: object = {
    search: true,
    placeholder: 'Select...',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search...'
  };
  private isSubmitted = false;

  ngOnInit() {
    this.action = this.activatedRouter.snapshot.paramMap.get('action');
    this.buildForm();
    if (this.action == 'edit') {
      this.id = this.activatedRouter.snapshot.paramMap.get('id');
      this.apiService.getLecturerData(this.id).subscribe((result) => {
        if (result && result.success) {
          const _data = result.data;
          this.title = 'Edit Lecturer';
          this.fullName = _data.name;
          this.lecturerId = _data._id;
          this.dob = _data.date_of_birth || '';
          this.username = _data._id;
          this.email = _data.email;
          this.isReady = true;
        } else {
          this.toastr.error(result.message);
        }
      });
    } else {
      this.title = 'New Lecturer';
      this.isReady = true;
    }
  }

  ngAfterViewInit() {
    $('ngx-select-dropdown button.ngx-dropdown-button').css('border-radius', '30px');
  }

  buildForm() {
    this.lecturerProfileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      lecturerId: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      dob: []
    });
  }

  get formCtrl() { return this.lecturerProfileForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.dob) {
      this.toastr.error('Lecturer DoB is required!');
      return;
    }

    if (this.lecturerProfileForm.invalid) return;

    // TODO: call apiService to create/edit lecturer then navigate to lecturer manager
    this.router.navigate(['lecturer-manager']);
  }

  onBackButtonClicked() {
    this.location.back();
  }
}
