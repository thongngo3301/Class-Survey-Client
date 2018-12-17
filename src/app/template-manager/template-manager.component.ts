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
    private toastr: ToastrNotificationService
  ) { }

  public columns: Array<any> = [
    { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by name' } },
    { title: 'Created At', name: 'createdAt', filtering: { filterString: '', placeholder: 'Filter by created date' } },
    { title: 'Modified At', name: 'modifiedAt', filtering: { filterString: '', placeholder: 'Filter by modified date' } }
  ];

  public data: Array<any> = [{ "name": "Asoka", "createdAt": "3/14/2018", "modifiedAt": "4/1/2018" },
  { "name": "Cardguard", "createdAt": "8/21/2018", "modifiedAt": "1/3/2018" },
  { "name": "Fix San", "createdAt": "11/27/2018", "modifiedAt": "5/20/2018" },
  { "name": "Trippledex", "createdAt": "10/23/2018", "modifiedAt": "8/10/2018" },
  { "name": "Zaam-Dox", "createdAt": "6/10/2018", "modifiedAt": "12/11/2017" },
  { "name": "Tempsoft", "createdAt": "8/6/2018", "modifiedAt": "5/18/2018" },
  { "name": "Ventosanzap", "createdAt": "6/8/2018", "modifiedAt": "6/9/2018" },
  { "name": "Trippledex", "createdAt": "2/5/2018", "modifiedAt": "11/11/2018" },
  { "name": "Trippledex", "createdAt": "10/13/2018", "modifiedAt": "5/15/2018" },
  { "name": "Sonsing", "createdAt": "2/27/2018", "modifiedAt": "10/12/2018" },
  { "name": "Voyatouch", "createdAt": "12/18/2017", "modifiedAt": "7/3/2018" },
  { "name": "Veribet", "createdAt": "3/3/2018", "modifiedAt": "4/23/2018" },
  { "name": "Tampflex", "createdAt": "4/29/2018", "modifiedAt": "10/23/2018" },
  { "name": "Sonair", "createdAt": "7/19/2018", "modifiedAt": "8/8/2018" },
  { "name": "Tresom", "createdAt": "1/22/2018", "modifiedAt": "3/22/2018" },
  { "name": "Zontrax", "createdAt": "4/2/2018", "modifiedAt": "4/29/2018" },
  { "name": "Prodder", "createdAt": "1/3/2018", "modifiedAt": "1/25/2018" },
  { "name": "Andalax", "createdAt": "9/1/2018", "modifiedAt": "9/22/2018" },
  { "name": "Matsoft", "createdAt": "4/21/2018", "modifiedAt": "6/4/2018" },
  { "name": "Pannier", "createdAt": "2/19/2018", "modifiedAt": "1/26/2018" },
  { "name": "Hatity", "createdAt": "7/27/2018", "modifiedAt": "3/14/2018" },
  { "name": "Fix San", "createdAt": "11/17/2018", "modifiedAt": "3/10/2018" },
  { "name": "Sub-Ex", "createdAt": "10/1/2018", "modifiedAt": "5/17/2018" },
  { "name": "Konklab", "createdAt": "10/27/2018", "modifiedAt": "11/15/2018" },
  { "name": "Hatity", "createdAt": "4/7/2018", "modifiedAt": "8/16/2018" }]

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).on('click','button.new-template-btn', e => e.stopPropagation());
  }

  @ViewChild('templateManager') _templateManager: DataManagerComponent;

  private editTemplate(data) {
    this.router.navigate(['/template-manager', 'edit', data.row.name]);
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
