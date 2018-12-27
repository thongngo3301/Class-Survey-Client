import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lecturer-profile',
  templateUrl: './lecturer-profile.component.html',
  styleUrls: ['./lecturer-profile.component.scss']
})
export class LecturerProfileComponent implements OnInit, AfterViewInit {
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
  private lecturerId: string;
  private dob: Date;
  private email: string;

  private selectedSubjectClasses: any;
  private subjectClassOptions: Array<any>;
  private reservedArr: Array<any>;

  private lecturerProfileForm: FormGroup;
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
      this.title = 'Edit Lecturer';
      this.spinner.show();
      this.apiService.getLecturerData(this.id).subscribe((result) => {
        this.spinner.hide();
        if (result && result.success) {
          const _data = result.data;
          this.fullName = _data.name;
          this.lecturerId = _data._id;
          this.dob = _data.date_of_birth || '';
          this.email = _data.email;
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
      this.title = 'New Lecturer';
      this.isReady = true;
    }
  }

  ngAfterViewInit() {
    $('ngx-select-dropdown button.ngx-dropdown-button').css('border-radius', '30px');
  }

  stringifyDate(date: Date) {
    const dd = (date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate());
    const mm = (date.getMonth().toString().length > 1 || date.getMonth().toString() == '9') ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  buildForm() {
    this.lecturerProfileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      lecturerId: ['', Validators.required],
      email: ['', Validators.required],
      dob: []
    });
  }

  get formCtrl() { return this.lecturerProfileForm.controls; }

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
        message: `Are you sure to remove lecturer "${this.fullName}" from class "${diffClass[0]}"?`
      }
      const config = Object.assign({ initialState }, modalOptions);
      this.modalRef = this.modalService.show(ModalConfirmComponent, config);
      this.modalRef.content.onClose.subscribe(ret => {
        if (ret) {
          const payload = {
            lecturerId: this.lecturerId,
            classId: diffClass[0].split(' ').slice(-2).join(' ')
          }
          this.spinner.show();
          this.apiService.removeLecturerClass(payload).subscribe(res => {
            this.spinner.hide();
            if (res && res.success) {
              this.toastr.success(`Lecturer "${this.fullName}" is no longer teaching class "${diffClass[0]}"`);
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
        message: `Are you sure to add lecturer "${this.fullName}" to class "${diffClass[0]}"?`
      }
      const config = Object.assign({ initialState }, modalOptions);
      this.modalRef = this.modalService.show(ModalConfirmComponent, config);
      this.modalRef.content.onClose.subscribe(ret => {
        if (ret) {
          const payload = {
            lecturerId: this.lecturerId,
            classId: diffClass[0].split(' ').slice(-2).join(' ')
          }
          this.spinner.show();
          this.apiService.addLecturerClass(payload).subscribe(res => {
            this.spinner.hide();
            if (res && res.success) {
              this.toastr.success(`Lecturer "${this.fullName}" is successfully added to class "${diffClass[0]}"`);
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

  onSubmit() {
    this.isSubmitted = true;

    if (!this.dob) {
      this.toastr.error('Lecturer DoB is required!');
      return;
    }

    if (!this.selectedSubjectClasses && this.action == 'edit') {
      this.toastr.error('Please select at least one subject class!');
      return;
    }

    if (this.lecturerProfileForm.invalid) return;

    if (this.action == 'edit') {
      const payload = {
        teacherId: this.lecturerId,
        data: {
          name: this.fullName,
          date_of_birth: (typeof this.dob == 'string' ? this.dob : this.stringifyDate(this.dob)) || '',
          email: this.email
        }
      }
      this.spinner.show();
      this.apiService.editLecturerData(payload).subscribe(result => {
        this.spinner.hide();
        if (result && result.success) {
          this.toastr.success('Update lecturer successfully');
          this.router.navigate(['lecturer-manager']);
        } else {
          this.toastr.error(result.message);
        }
      });
    } else {
      const payload = {
        data: {
          id: this.lecturerId,
          name: this.fullName,
          date_of_birth: (typeof this.dob == 'string' ? this.dob : this.stringifyDate(this.dob)) || '',
          email: this.email
        }
      }
      this.spinner.show();
      this.apiService.addLecturerData(payload).subscribe(result => {
        this.spinner.hide();
        if (result && result.success) {
          this.toastr.success('Add lecturer successfully');
          this.router.navigate(['lecturer-manager']);
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
