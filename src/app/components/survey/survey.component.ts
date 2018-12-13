import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, AfterViewInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrNotificationService
  ) { }

  @Input() type: string;
  @Input() title: string;
  @Input() subjectName: string;
  @Input() subjectId: string;
  @Input() selectedSemester: string;
  @Input() semesterOptions: Array<string>;
  @Input() selectedTemplate: any;
  @Input() templateOptions: Array<any>;
  @Input() deadline: Date;

  private surveyForm: FormGroup;
  private config: object = {
    search: true,
    placeholder: 'Select...',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search...'
  };
  private isSubmitted = false;

  ngOnInit() {
    this.surveyForm = this.formBuilder.group({
      subjectName: ['', Validators.required],
      subjectId: ['', Validators.required],
      deadline: []
    });
  }

  ngAfterViewInit() {
    $('ngx-select-dropdown button.ngx-dropdown-button').css('border-radius', '30px');
  }

  stringifyDate(date: Date) {
    return ((date.getMonth().toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }

  get formCtrl() { return this.surveyForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    console.log(this.subjectName);

    if (!this.selectedSemester) {
      this.toastr.error('Please select a semester!');
      return;
    }
    if (!this.selectedTemplate) {
      this.toastr.error('Please select a survey template!');
      return;
    }

    if (this.surveyForm.invalid) return;

    // TODO: call apiService to create/edit survey then navigate to survey manager
    this.router.navigate(['survey-manager']);
  }
}
