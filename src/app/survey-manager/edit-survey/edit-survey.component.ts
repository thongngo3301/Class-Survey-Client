import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit {
  constructor(private activatedRouter: ActivatedRoute) { }

  private surveyData: any;
  private type: string;
  private title: string;
  private subjectName: string;
  private subjectId: string;
  private subjectClassId: number;
  private selectedSemester: string;
  private semesterOptions: Array<string>;
  private selectedTemplate: any;
  private templateOptions: Array<any>;

  ngOnInit() {
    // this.surveyData = JSON.parse(this.activatedRouter.snapshot.paramMap.get('data'));
    this.surveyData = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.surveyData);
    this.type = 'edit';
    this.title = 'Edit Survey';
    this.semesterOptions = ['HK1-2018', 'HK2-2018'];
    this.templateOptions = ['Template1', 'Template2'];
  }
}
