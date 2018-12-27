import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataManagerComponent } from './../components/data-manager/data-manager.component';
import { ModalConfirmComponent } from './../modals/modal-confirm/modal-confirm.component';
import { ModalStudentInfoEditorComponent } from './../modals/modal-student-info-editor/modal-student-info-editor.component';

import { ApiService } from './../services/api.service';
import { UserService } from './../services/user.service';
import { ToastrNotificationService } from './../services/toastr-notification.service';

const modalOptions = {
  class: 'gray modal-lg',
  ignoreBackdropClick: true,
  keyboard: false
}

@Component({
  selector: 'app-survey-manager',
  templateUrl: './survey-manager.component.html',
  styleUrls: ['./survey-manager.component.scss']
})
export class SurveyManagerComponent implements OnInit, AfterViewInit {
  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private router: Router,
    private apiService: ApiService,
    private userService: UserService,
    private toastr: ToastrNotificationService
  ) { }

  public columns: Array<any> = [];
  private data: Array<any> = [];
  private isReady: boolean = false;

  ngOnInit() {
    this.apiService.getAllSurveyData().subscribe((result) => {
      if (result && result.success) {
        this.columns = this.determineCols();
        this.data = this.reconstructData(result.data);
        this.isReady = true;
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  ngAfterViewInit() {
    $(document).on('click','button.add-survey-btn', e => e.stopPropagation());
  }

  determineCols() {
    const role_id = this.userService.getRoleId();
    switch (role_id) {
      case '1':
        return [
          { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by Name' } },
          { title: 'Created At', name: 'createdAt', filtering: { filterString: '', placeholder: 'Filter by Created date' } },
          { title: 'Modified At', name: 'modifiedAt', filtering: { filterString: '', placeholder: 'Filter by Modified date' } },
          { title: 'Deadline', name: 'deadline', filtering: { filterString: '', placeholder: 'Filter by Deadline' } }
        ]
      case '2':
      case '3':
        return [
          { title: 'ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by ID' } },
          { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by Name' } }
        ]
    }
  }

  reconstructData(data: Array<any>) {
    let ret = new Array<any>();
    const role_id = this.userService.getRoleId();
    data.forEach(d => {
      const _id = d.survey_id || d.id;
      let _row;
      switch (role_id) {
        case '1':
          _row = {
            name: d.name + ' ' + _id,
            createdAt: this.stringifyDate(new Date(parseInt(d.create_at))),
            modifiedAt: this.stringifyDate(new Date(parseInt(d.last_modify))),
            deadline: this.stringifyDate(new Date(parseInt(d.deadline)))
          }
          break;
        case '2':
        case '3':
          _row = {
            id: _id,
            name: d.name
          }
          break;
      }
      ret.push(_row);
    });
    return ret;
  }

  stringifyDate(date: Date) {
    const dd = (date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate());
    const mm = (date.getMonth().toString().length > 1 || date.getMonth().toString() == '9') ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  @ViewChild('surveyManager') _surveyManager: DataManagerComponent;

  private editSurveyInfo(data) {
    const role_id = this.userService.getRoleId();
    switch (role_id) {
      case '1':
        this.router.navigate(['/survey-manager', 'edit', data.row.name]);
        break;
      case '3':
        const _data = data.row.name + ' ' + data.row.id;
        this.router.navigate(['/survey-sheet', 'answer', _data]);
        break;
    }
  }

  private viewSurveyInfo(data) {
    const role_id = this.userService.getRoleId();
    switch (role_id) {
      case '2':
        const _data = data.row.name + ' ' + data.row.id;
        this.router.navigate(['/survey-manager', 'view', _data]);
        break;
    }
  }

  private resultSurveyInfo(data) {
    const role_id = this.userService.getRoleId();
    let _data;
    switch (role_id) {
      case '1':
        _data = data.row.name;
        break;
      case '2':
        _data = data.row.name + ' ' + data.row.id;
        break;
    }
    this.router.navigate(['/survey-sheet', 'result', _data]);
  }

  private removeSurveyInfo(data) {
    const initialState = {
      title: 'Remove survey',
      message: `Are you sure to remove survey/class "${data.row.name}"?`
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalConfirmComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      if (ret) {
        const payload = {
          classId: data.row.name.split(' ').slice(-2).join(' ')
        }
        this.apiService.removeSurveyData(payload).subscribe(res => {
          if (res && res.success) {
            this.toastr.success(`Survey/Class "${data.row.name}" has been removed`);
            this.data.splice(data.row.index, 1);
            this.rerenderSurveyManager();
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    });
  }

  private rerenderSurveyManager() {
    this._surveyManager.rerenderTable(this.data);
  }
}
