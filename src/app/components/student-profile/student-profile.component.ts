import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import * as async from 'async';

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
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrNotificationService,
    private location: Location,
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) { }

  private action: string;
  private id: string;

  private isReady: boolean = false;

  private title: string;
  private fullName: string;
  private studentId: string;
  private dob: Date;
  private baseClass: string;
  private selectedSubjectClasses: any;
  private subjectClassOptions: Array<any>;

  private reservedArr: Array<any>;

  private studentProfileForm: FormGroup;
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
      this.title = 'Edit Student';
      this.spinner.show();
      this.apiService.getStudentData(this.id).subscribe((result) => {
        this.spinner.hide();
        if (result && result.success) {
          const _data = result.data;
          this.fullName = _data.name;
          this.studentId = _data._id;
          this.dob = _data.date_of_birth;
          this.baseClass = _data.base_class;
          this.selectedSubjectClasses = _data.class.map(c => c.name + ' ' + c.id);
          this.reservedArr = this.selectedSubjectClasses.slice();
          this.subjectClassOptions = this.selectedSubjectClasses.slice();
          this.spinner.show();
          this.apiService.getAllSurveyData().subscribe(res => {
            this.spinner.hide();
            if (res && res.success) {
              res.data.forEach(d => {
                const _name = d.name + ' ' + d._id;
                if (!this.subjectClassOptions.includes(_name)) {
                  this.subjectClassOptions.push(_name);
                }
              });
              this.isReady = true;
            } else {
              this.toastr.error(res.message);
            }
          });
        } else {
          this.toastr.error(result.message);
        }
      });
    } else {
      this.title = 'New Student';
      this.isReady = true;
    }
  }

  stringifyDate(date: Date) {
    const dd = (date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate());
    const mm = (date.getMonth().toString().length > 1 || date.getMonth().toString() == '9') ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  onChange(evt) {
    // remove case
    let currArr = evt.value;
    const modalOptions = {
      class: 'gray modal-lg',
      ignoreBackdropClick: true,
      keyboard: false
    }
    if (currArr.length < this.reservedArr.length) {
      const diffClass = this.reservedArr.filter(c => !currArr.includes(c));
      const initialState = {
        title: 'Remove class',
        message: `Are you sure to remove student "${this.fullName}" from class "${diffClass[0]}"?`
      }
      const config = Object.assign({ initialState }, modalOptions);
      this.modalRef = this.modalService.show(ModalConfirmComponent, config);
      this.modalRef.content.onClose.subscribe(ret => {
        if (ret) {
          const payload = {
            studentId: this.studentId,
            classId: diffClass[0].split(' ').slice(-2).join(' ')
          }
          this.spinner.show();
          this.apiService.removeStudentClass(payload).subscribe(res => {
            this.spinner.hide();
            if (res && res.success) {
              this.toastr.success(`Student "${this.fullName}" is no longer in class "${diffClass[0]}"`);
              this.reservedArr = this.selectedSubjectClasses.slice();
            } else {
              this.selectedSubjectClasses = this.reservedArr.slice();
              this.toastr.error(res.message);
            }
          });
        } else {
          this.selectedSubjectClasses = this.reservedArr.slice();
        }
      });
    }
    // add case
    else {
      const diffClass = currArr.filter(c => !this.reservedArr.includes(c));
      const initialState = {
        title: 'Add class',
        message: `Are you sure to add student "${this.fullName}" to class "${diffClass[0]}"?`
      }
      const config = Object.assign({ initialState }, modalOptions);
      this.modalRef = this.modalService.show(ModalConfirmComponent, config);
      this.modalRef.content.onClose.subscribe(ret => {
        if (ret) {
          const payload = {
            studentId: this.studentId,
            classId: diffClass[0].split(' ').slice(-2).join(' ')
          }
          this.spinner.show();
          this.apiService.addStudentClass(payload).subscribe(res => {
            this.spinner.hide();
            if (res && res.success) {
              this.toastr.success(`Student "${this.fullName}" is successfully added to class "${diffClass[0]}"`);
              this.reservedArr = this.selectedSubjectClasses.slice();
            } else {
              this.selectedSubjectClasses = this.reservedArr.slice();
              this.toastr.error(res.message);
            }
          });
        } else {
          this.selectedSubjectClasses = this.reservedArr.slice();
        }
      });
    }
  }

  ngAfterViewInit() {
    $('ngx-select-dropdown button.ngx-dropdown-button').css('border-radius', '30px');
  }

  buildForm() {
    this.studentProfileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      studentId: ['', Validators.required],
      baseClass: ['', Validators.required],
      dob: []
    });
  }

  get formCtrl() { return this.studentProfileForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.dob) {
      this.toastr.error('Student DoB is required!');
      return;
    }
    if (!this.selectedSubjectClasses && this.action == 'edit') {
      this.toastr.error('Please select at least one subject class!');
      return;
    }

    if (this.studentProfileForm.invalid) return;

    if (this.action == 'edit') {
      const payload = {
        studentId: this.studentId,
        data: {
          name: this.fullName,
          base_class: this.baseClass,
          date_of_birth: (typeof this.dob == 'string' ? this.dob : this.stringifyDate(this.dob)) || '',
          email: ''
        }
      }
      this.spinner.show();
      this.apiService.editStudentData(payload).subscribe(result => {
        this.spinner.hide();
        if (result && result.success) {
          this.toastr.success('Update student successfully');
          this.router.navigate(['student-manager']);
        } else {
          this.toastr.error(result.message);
        }
      });
    } else {
      const payload = {
        data: {
          id: this.studentId,
          name: this.fullName,
          base_class: this.baseClass,
          date_of_birth: (typeof this.dob == 'string' ? this.dob : this.stringifyDate(this.dob)) || '',
          email: ''
        }
      }
      this.spinner.show();
      this.apiService.addStudentData(payload).subscribe(result => {
        this.spinner.hide();
        if (result && result.success) {
          this.toastr.success('Add student successfully');
          this.router.navigate(['student-manager']);
        } else {
          this.toastr.error(result.message);
        }
      });
    }
  }

  onBackButtonClicked() {
    this.location.back();
  }
}
