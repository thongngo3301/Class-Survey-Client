import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
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
  @Input() subjectClassId: number;
  @Input() selectedSemester: string;
  @Input() semesterOptions: Array<string>;
  @Input() selectedTemplate: any;
  @Input() templateOptions: Array<any>;

  private surveyForm: FormGroup;
  private config: object = {
    search: true,
    placeholder: 'Select...',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search...'
  };
  private isSubmitted = false;
  private areSelectionsValid = false;

  ngOnInit() {
    this.surveyForm = this.formBuilder.group({
      subjectName: ['', Validators.required],
      subjectId: ['', Validators.required],
      subjectClassId: []
    });
  }

  get formCtrl() { return this.surveyForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    console.log(this.subjectName);

    if (!this.selectedSemester) {
      this.toastr.error('Please select a semester!');
      this.areSelectionsValid = false;
    } else {
      this.areSelectionsValid = true;
    }
    if (!this.selectedTemplate) {
      this.toastr.error('Please select a survey template!');
      this.areSelectionsValid = false;
    } else {
      this.areSelectionsValid = true;
    }

    if (this.surveyForm.invalid || !this.areSelectionsValid) return;

    // TODO: call apiService to create/edit survey then navigate to survey manager
    this.router.navigate(['survey-manager']);
  }
}
