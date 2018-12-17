import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, AfterViewInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrNotificationService,
    private location: Location
  ) { }

  @Input() title: string;
  @Input() fullName: string;
  @Input() studentId: string;
  @Input() dob: Date;
  @Input() baseClass: string;
  @Input() selectedSubjectClasses: any;
  @Input() subjectClassOptions: Array<any>;

  private studentProfileForm: FormGroup;
  private config: object = {
    search: true,
    placeholder: 'Select...',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search...'
  };
  private isSubmitted = false;

  ngOnInit() {
    this.studentProfileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      studentId: ['', Validators.required],
      baseClass: ['', Validators.required],
      dob: []
    });
  }

  ngAfterViewInit() {
    $('ngx-select-dropdown button.ngx-dropdown-button').css('border-radius', '30px');
  }

  get formCtrl() { return this.studentProfileForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    console.log(this.selectedSubjectClasses);

    if (!this.dob) {
      this.toastr.error('Student DoB is required!');
      return;
    }
    if (!this.selectedSubjectClasses) {
      this.toastr.error('Please select at least one subject class!');
      return;
    }

    if (this.studentProfileForm.invalid) return;

    // TODO: call apiService to create/edit student then navigate to student manager
    this.router.navigate(['student-manager']);
  }

  onBackButtonClicked() {
    this.location.back();
  }
}
