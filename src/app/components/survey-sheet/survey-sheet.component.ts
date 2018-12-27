import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';

@Component({
  selector: 'app-survey-sheet',
  templateUrl: './survey-sheet.component.html',
  styleUrls: ['./survey-sheet.component.scss']
})
export class SurveySheetComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private toastr: ToastrNotificationService
  ) { }

  private title: string;
  private action: string;
  private id: string;
  private isReady: boolean = false;
  private isSubmitted: boolean = false;
  private sections: Array<any> = [];
  private criterias: Array<any> = [];
  private cols: Array<any> = [];

  ngOnInit() {
    this.action = this.activatedRouter.snapshot.paramMap.get('action');
    // this.buildForm();
    if (this.action == 'answer') {
      this.title = this.activatedRouter.snapshot.paramMap.get('id');
      this.id = this.getSurveyIdFromTitle(this.title);
      this.title += ' - Answer Questionnaire';
      const payload = {
        studentId: this.userService.getUserId(),
        surveyId: this.id
      }
      this.apiService.getSurveyOfStudent(payload).subscribe((result) => {
        if (result && result.success) {
          const _data = result.data.survey;
          this.isSubmitted = this.wasSubmittedBefore(_data.create_at, _data.modify_at);
          this.sections = _data.group_fields;
          this.criterias = [1, 2, 3, 4, 5];
          if (this.isSubmitted) {
            this.cols = this.criterias;
          } else {
            this.cols = [0, ...this.criterias];
          }
          this.isReady = true;
        } else {
          this.toastr.error(result.message);
          this.isReady = true;
        }
      });
    } else if (this.action == 'result') {
      this.title = this.activatedRouter.snapshot.paramMap.get('id');
      this.id = this.getSurveyIdFromTitle(this.title);
      this.title += ' - Survey Result';
      const payload = {
        userId: this.userService.getUserId(),
        classId: this.id
      }
      this.apiService.getSurveyResult(payload).subscribe((result) => {
        if (result && result.success) {
          const _data = result.data;
          this.sections = _data.group_fields;
          this.criterias = ['M', 'M1', 'M2', 'STD', 'STD1', 'STD2'];
          this.cols = [0, 1, 2, 3, 4, 5];
          this.isReady = true;
        } else {
          this.toastr.error(result.message);
          this.isReady = true;
        }
      });
    } else {
      this.title = 'New Survey';
      this.isReady = true;
    }
  }

  getSurveyIdFromTitle(title: string) {
    return title.trim().split(' ').slice(-2).join(' ');
  }

  wasSubmittedBefore(created: string, modified: string) {
    return created != modified;
  }

  getAllFirstLetters(str: string) {
    return str.trim().split(' ').map(s => s.charAt(0)).join('');
  }

  getValueFromIdx(obj: Object, idx: number): number {
    return obj[Object.keys(obj)[idx]].toFixed(2);
  }

  submitSurvey() {
    const payload = {
      studentId: this.userService.getUserId(),
      surveyId: this.id,
      data: {
        survey: this.sections
      }
    }
    this.apiService.submitSurvey(payload).subscribe((result) => {
      if (result && result.success) {
        this.toastr.success('Submit survey successfully');
        this.router.navigate(['/survey-manager']);
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  validateAllInputs() {
    for (let i = 0; i < this.sections.length; i++) {
      let fields = this.sections[i].fields;
      for(let j = 0; j < fields.length; j++) {
        if (fields[j].value == 0) return false;
      }
    }
    return true;
  }

  print() {
    window.print();
  }

  onBackButtonClicked() {
    this.location.back();
  }

}
