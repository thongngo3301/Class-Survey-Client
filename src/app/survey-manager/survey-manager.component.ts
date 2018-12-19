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

  public columns: Array<any> = [
    { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by name' } },
    { title: 'Created At', name: 'createdAt', filtering: { filterString: '', placeholder: 'Filter by created date' } },
    { title: 'Modified At', name: 'modifiedAt', filtering: { filterString: '', placeholder: 'Filter by modified date' } }
  ];

  private data: Array<any> = [];
  private isReady: boolean = false;

  ngOnInit() {
    this.apiService.getAllSurveyData().subscribe((result) => {
      if (result && result.success) {
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

  reconstructData(data: Array<any>) {
    let ret = new Array<any>();
    data.forEach(d => {
      const _id = d.survey_id || d.id;
      let _row = {
        name: d.name + ' ' + _id,
        createdAt: this.stringifyDate(new Date()),
        modifiedAt: this.stringifyDate(new Date()),
      }
      ret.push(_row);
    });
    return ret;
  }

  stringifyDate(date: Date) {
    return ((date.getMonth().toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }

  @ViewChild('surveyManager') _surveyManager: DataManagerComponent;

  private editSurveyInfo(data) {
    this.router.navigate(['/survey-manager', 'edit', data.row.name]);
  }

  private viewSurveyInfo(data) {
    const initialState = {
      list: [
        'Survey view'
      ],
      title: 'Survey info',
      data: data
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalStudentInfoEditorComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      console.log('view ret', ret);
    });
  }

  private removeSurveyInfo(data) {
    const initialState = {
      title: 'Remove survey',
      message: 'Are you sure to remove this survey?'
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalConfirmComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      if (ret) {
        this.data.splice(data.row.index, 1);
        this.rerenderSurveyManager();
      }
    });
  }

  private rerenderSurveyManager() {
    this._surveyManager.rerenderTable(this.data);
  }
}
