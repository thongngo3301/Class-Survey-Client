import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss']
})
export class NewSurveyComponent implements OnInit {
  constructor() { }

  private type: string;
  private title: string;
  // private subjectName: string;
  // private subjectId: string;
  // private subjectClassId: number;
  // private selectedSemester: string;
  private semesterOptions: Array<string>;
  // private selectedTemplate: any;
  private templateOptions: Array<any>;
  private deadline: Date;

  ngOnInit() {
    this.type = 'new';
    this.title = 'New Survey';
    this.semesterOptions = ['HK1-2018', 'HK2-2018'];
    this.templateOptions = ['Template1', 'Template2'];
    this.deadline = new Date();
  }
}
