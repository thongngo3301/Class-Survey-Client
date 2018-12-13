import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrNotificationService
  ) { }

  private isReady: boolean = false;

  private studentData: any;
  private title: string;
  private fullName: string;
  private studentId: string;
  private dob: Date;
  private baseClass: string;
  private selectedSubjectClasses: any;
  private subjectClassOptions: Array<any>;

  ngOnInit() {
    const _id = this.activatedRouter.snapshot.paramMap.get('id');
    this.apiService.getStudentData(_id).subscribe((result) => {
      if (result && result.success) {
        const _data = result.data;
        this.title = 'Edit Student';
        this.fullName = _data.name;
        this.studentId = _data._id;
        this.dob = _data.date_of_birth;
        this.baseClass = _data.base_class;
        this.selectedSubjectClasses = _data.class.map(c => c.name);
        this.subjectClassOptions = _data.class.map(c => c.name);
        this.isReady = true;
      } else {
        this.toastr.error(result.message);
      }
    });
  }
}
