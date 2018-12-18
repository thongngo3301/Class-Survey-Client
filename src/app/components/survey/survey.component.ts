import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
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
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrNotificationService,
    private location: Location
  ) { }

  private action: string;
  private id: string;
  private isReady: boolean = false;

  private type: string;
  private title: string;
  private subjectName: string;
  private subjectId: string;
  private selectedSemester: string;
  private semesterOptions: Array<string>;
  private selectedTemplate: any;
  private templateOptions: Array<any>;
  private deadline: Date;

  private surveyForm: FormGroup;
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

      // TODO: call api to get survey data
      this.title = 'Edit Survey';
      this.semesterOptions = ['HK1-2018', 'HK2-2018'];
      this.templateOptions = ['Template1', 'Template2'];
      this.deadline = new Date("Tue Dec 25 2018 22:21:53 GMT+0700 (Indochina Time)");
      this.isReady = true;
      // this.apiService.getSurveyData(this.id).subscribe((result) => {
      //   if (result && result.success) {
      //     const _data = result.data;
      //   } else {
      //     this.toastr.error(result.message);
      //   }
      // });
    } else {
      this.title = 'New Survey';
      this.isReady = true;
    }
  }

  ngAfterViewInit() {
    $('ngx-select-dropdown button.ngx-dropdown-button').css('border-radius', '30px');
  }

  stringifyDate(date: Date) {
    return ((date.getMonth().toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }

  buildForm() {
    this.surveyForm = this.formBuilder.group({
      subjectName: ['', Validators.required],
      subjectId: ['', Validators.required],
      deadline: []
    });
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

  onBackButtonClicked() {
    this.location.back();
  }
}
