import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataManagerComponent } from './../components/data-manager/data-manager.component';
import { ModalConfirmComponent } from './../modals/modal-confirm/modal-confirm.component';
import { ModalStudentInfoEditorComponent } from './../modals/modal-student-info-editor/modal-student-info-editor.component';

import { ApiService } from './../services/api.service';
import { UserService } from './../services/user.service';
import { ToastrNotificationService } from './../services/toastr-notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

const modalOptions = {
  class: 'gray modal-lg',
  ignoreBackdropClick: true,
  keyboard: false
}

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.scss']
})
export class StudentManagerComponent implements OnInit, AfterViewInit {
  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private router: Router,
    private apiService: ApiService,
    private userService: UserService,
    private toastr: ToastrNotificationService,
    private spinner: NgxSpinnerService
  ) { }

  public columns: Array<any>;

  public data: Array<any> = [];
  private isReady: boolean = false;

  ngOnInit() {
    const role_id = this.userService.getRoleId();
    this.columns = this.getDataColumns(role_id);
    this.spinner.show();
    this.apiService.getAllStudentData().subscribe((result) => {
      this.spinner.hide();
      if (result && result.success) {
        this.data = this.reconstructData(result.data, role_id);
        this.isReady = true;
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  ngAfterViewInit() {
    $(document).on('click','button.add-student-btn', e => e.stopPropagation());
  }

  getDataColumns(role_id: string) {
    switch (role_id) {
      case '1':
        return [
          { title: 'ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by ID' } },
          { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by Name' } },
          { title: 'Date of Birth', name: 'dob', filtering: { filterString: '', placeholder: 'Filter by DoB' } },
          { title: 'Base Class', name: 'base_class', filtering: { filterString: '', placeholder: 'Filter by BC' } }
        ]
      case '3':
        return [
          { title: 'ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by ID' } },
          { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by Name' } },
          { title: 'Date of Birth', name: 'dob', filtering: { filterString: '', placeholder: 'Filter by DoB' } },
          { title: 'Base Class', name: 'base_class', filtering: { filterString: '', placeholder: 'Filter by BC' } },
          { title: 'Class ID', name: 'class_id', filtering: { filterString: '', placeholder: 'Filter by CID' } },
          { title: 'Class Name', name: 'class_name', filtering: { filterString: '', placeholder: 'Filter by CN' } }
        ]
    }
  }

  reconstructData(data: Array<any>, role_id: string) {
    let ret = new Array<any>();
    switch (role_id) {
      case '1':
        data.forEach(d => {
          let _row = {
            id: d._id,
            name: d.name,
            dob: d.date_of_birth || '',
            base_class: d.base_class
          }
          ret.push(_row);
        });
        break;
      case '3':
        data.forEach(d => {
          if (d.class.length) {
            d.class.forEach(c => {
              let _row = {
                id: d._id,
                name: d.name,
                dob: d.date_of_birth || '',
                base_class: d.base_class,
                class_id: c.id || '',
                class_name: c.name || ''
              }
              ret.push(_row);
            });
          } else {
            let _row = {
              id: d._id,
              name: d.name,
              dob: d.date_of_birth || '',
              base_class: d.base_class,
              class_id: '',
              class_name: ''
            }
            ret.push(_row);
          }
        });
        break;
    }
    return ret;
  }

  @ViewChild('studentManager') _studentManager: DataManagerComponent;

  private editStudentInfo(data) {
    this.router.navigate(['/student-manager', 'edit', data.row.id]);
  }

  private viewStudentInfo(data) {
    const initialState = {
      list: [
        'Student view'
      ],
      title: 'Student info',
      data: data
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalStudentInfoEditorComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      console.log('view ret', ret);
    });
  }

  private removeStudentInfo(data) {
    const initialState = {
      title: 'Remove student',
      message: `Are you sure to remove student "${data.row.name} (${data.row.id})"?`
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalConfirmComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      if (ret) {
        const payload = {
          studentId: data.row.id
        }
        this.spinner.show();
        this.apiService.removeStudentData(payload).subscribe(res => {
          this.spinner.hide();
          if (res && res.success) {
            this.toastr.success(`Student "${data.row.name} (${data.row.id})" has been removed`);
            this.data.splice(data.row.index, 1);
            this.rerenderStudentManager();
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    });
  }

  private rerenderStudentManager() {
    this._studentManager.rerenderTable(this.data);
  }
}
