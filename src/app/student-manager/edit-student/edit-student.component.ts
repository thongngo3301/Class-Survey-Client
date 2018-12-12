import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  constructor(private activatedRouter: ActivatedRoute) { }

  private studentData: any;
  private title: string;
  private firstName: string;
  private lastName: string;
  private studentId: string;
  private dob: Date;
  private baseClass: string;
  private selectedSubjectClasses: any;
  private subjectClassOptions: Array<any>;

  ngOnInit() {
    // this.surveyData = JSON.parse(this.activatedRouter.snapshot.paramMap.get('data'));
    this.studentData = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.studentData);
    this.title = 'Edit Survey';
    this.firstName = "Thong";
    this.lastName = "Ngo";
    this.studentId = "16022451";
    this.dob = new Date("Fri Dec 11 1998 00:00:00 GMT+0700 (Indochina Time)");
    this.baseClass = "K61N";
    this.selectedSubjectClasses = ['INT3304'];
    this.subjectClassOptions = ['INT3304', 'INT3306 3'];
  }
}
