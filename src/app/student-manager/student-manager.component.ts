import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataManagerComponent } from './../components/data-manager/data-manager.component';
import { ModalConfirmComponent } from './../modals/modal-confirm/modal-confirm.component';
import { ModalStudentInfoEditorComponent } from './../modals/modal-student-info-editor/modal-student-info-editor.component';

import { ApiService } from './../services/api.service';
import { ToastrNotificationService } from './../services/toastr-notification.service';

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
    private toastr: ToastrNotificationService
  ) { }

  public columns: Array<any> = [
    { title: 'Student ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by SID' } },
    { title: 'Student Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by SN' } },
    { title: 'Date of Birth', name: 'dob', filtering: { filterString: '', placeholder: 'Filter by DoB' } },
    { title: 'Base Class', name: 'base_class', filtering: { filterString: '', placeholder: 'Filter by BC' } },
    // { title: 'Class ID', name: 'class_id', filtering: { filterString: '', placeholder: 'Filter by CID' } },
    // { title: 'Class Name', name: 'class_name', filtering: { filterString: '', placeholder: 'Filter by CN' } }
  ];

  public data: Array<any>;
  private isReady: boolean = false;

  ngOnInit() {
    this.apiService.getAllStudentData().subscribe((result) => {
      if (result && result.success) {
        this.data = this.reconstructData(result.data);
        this.isReady = true;
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  ngAfterViewInit() {
    $(document).on('click','button.add-student-btn', e => e.stopPropagation());
  }

  reconstructData(data: Array<any>) {
    let ret = new Array<any>();
    data.forEach(d => {
      // if (d.class && d.class.length) {
        // d.class.forEach(c => {
          let _row = {
            id: d._id,
            name: d.name,
            dob: d.date_of_birth || '',
            base_class: d.base_class,
            // class_id: c.id,
            // class_name: c.name
          }
          ret.push(_row);
        // });
      // }
    });
    return ret;
  }

  @ViewChild('studentManager') _studentManager: DataManagerComponent;

  private editStudentInfo(data) {
    this.router.navigate(['/student-manager/edit', data.row.id]);
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
      message: 'Are you sure to remove this student?'
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalConfirmComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      if (ret) {
        this.data.splice(data.row.index, 1);
        this.rerenderStudentManager();
      }
    });
  }

  private rerenderStudentManager() {
    this._studentManager.rerenderTable(this.data);
  }
}
