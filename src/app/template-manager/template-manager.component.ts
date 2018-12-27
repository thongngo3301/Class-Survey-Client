import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataManagerComponent } from './../components/data-manager/data-manager.component';
import { ModalConfirmComponent } from './../modals/modal-confirm/modal-confirm.component';
import { ModalStudentInfoEditorComponent } from './../modals/modal-student-info-editor/modal-student-info-editor.component';

import { ApiService } from './../services/api.service';
import { ToastrNotificationService } from './../services/toastr-notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

const modalOptions = {
  class: 'gray modal-lg',
  ignoreBackdropClick: true,
  keyboard: false
}

@Component({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
  styleUrls: ['./template-manager.component.scss']
})
export class TemplateManagerComponent implements OnInit, AfterViewInit {

  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrNotificationService,
    private spinner: NgxSpinnerService
  ) { }

  private isReady: boolean = false;

  public columns: Array<any> = [
    { title: 'ID', name: '_id', filtering: { filterString: '', placeholder: 'Filter by ID' } },
    { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by Name' } },
    { title: 'Created At', name: 'create_at', filtering: { filterString: '', placeholder: 'Filter by Created date' } },
    { title: 'Modified At', name: 'modify_at', filtering: { filterString: '', placeholder: 'Filter by Modified date' } }
  ];

  public data: Array<any> = [];

  ngOnInit() {
    this.spinner.show();
    this.apiService.getAllTemplates().subscribe((result) => {
      this.spinner.hide();
      if (result && result.success) {
        this.data = result.data;
        this.isReady = true;
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  ngAfterViewInit() {
    $(document).on('click','button.new-template-btn', e => e.stopPropagation());
  }

  @ViewChild('templateManager') _templateManager: DataManagerComponent;

  private editTemplate(data) {
    this.router.navigate(['/template-manager', 'edit', data.row._id]);
  }

  private viewTemplate(data) {
    const initialState = {
      list: [
        'Template view'
      ],
      title: 'Template info',
      data: data
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalStudentInfoEditorComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      console.log('view ret', ret);
    });
  }

  private removeTemplate(data) {
    const initialState = {
      title: 'Remove template',
      message: 'Are you sure to remove this template?'
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalConfirmComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      if (ret) {
        this.data.splice(data.row.index, 1);
        this.rerenderTemplateManager();
      }
    });
  }

  private rerenderTemplateManager() {
    this._templateManager.rerenderTable(this.data);
  }

}
