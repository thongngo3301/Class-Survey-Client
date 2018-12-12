import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {
  constructor() { }

  private title: string;
  private subjectClassOptions: Array<any>;

  ngOnInit() {
    this.title = 'New Student';
    this.subjectClassOptions = ['INT3304', 'INT3306 1'];
  }
}
