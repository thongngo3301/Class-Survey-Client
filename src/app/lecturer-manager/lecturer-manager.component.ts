import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataManagerComponent } from './../components/data-manager/data-manager.component';
import { ModalConfirmComponent } from './../modals/modal-confirm/modal-confirm.component';
import { ModalLecturerInfoEditorComponent } from './../modals/modal-lecturer-info-editor/modal-lecturer-info-editor.component';
import { ApiService } from './../services/api.service';
import { UserService } from './../services/user.service';
import { ToastrNotificationService } from './../services/toastr-notification.service';

const modalOptions = {
  class: 'gray modal-lg',
  ignoreBackdropClick: true,
  keyboard: false
}

@Component({
  selector: 'app-lecturer-manager',
  templateUrl: './lecturer-manager.component.html',
  styleUrls: ['./lecturer-manager.component.scss']
})
export class LecturerManagerComponent implements OnInit, AfterViewInit {
  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private apiService: ApiService,
    private userService: UserService,
    private toastr: ToastrNotificationService,
    private router: Router
  ) { }

  private columns: Array<any>;

  private data: Array<any> = [];
  private isReady: boolean = false;

  ngOnInit() {
    const role_id = this.userService.getRoleId();
    this.columns = this.getDataColumns(role_id);
    this.apiService.getAllLecturerData().subscribe((result) => {
      if (result && result.success) {
        this.data = this.reconstructData(result.data);
        this.isReady = true;
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  ngAfterViewInit() {
    $(document).on('click','button.add-lecturer-btn', e => e.stopPropagation());
  }

  getDataColumns(role_id: string) {
    switch (role_id) {
      case '1':
        return [
          { title: 'Lecturer ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by LID' } },
          { title: 'Lecturer Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by LN' } },
          { title: 'Username', name: 'username', filtering: { filterString: '', placeholder: 'Filter by Username' } },
          { title: 'Email', name: 'email', filtering: { filterString: '', placeholder: 'Filter by Email' } }
        ]
      case '3':
        return [
          { title: 'Lecturer ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by LID' } },
          { title: 'Lecturer Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by LN' } },
          { title: 'Username', name: 'username', filtering: { filterString: '', placeholder: 'Filter by Username' } },
          { title: 'Email', name: 'email', filtering: { filterString: '', placeholder: 'Filter by Email' } }
        ]
    }
  }

  reconstructData(data: Array<any>) {
    let ret = new Array<any>();
    data.forEach(d => {
      let _row = {
        id: d._id,
        name: d.name,
        username: d._id || '',
        email: d.email || ''
      }
      ret.push(_row);
    });
    return ret;
  }

  @ViewChild('lecturerManager') _lecturerManager: DataManagerComponent;

  private editLecturerInfo(data) {
    this.router.navigate(['/lecturer-manager', 'edit', data.row.id]);
  }

  private viewLecturerInfo(data) {
    const initialState = {
      list: [
        'Lecturer view'
      ],
      title: 'Lecturer info',
      data: data
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalLecturerInfoEditorComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      console.log('view ret', ret);
    });
  }

  private removeLecturerInfo(data) {
    const initialState = {
      title: 'Remove lecturer',
      message: 'Are you sure to remove this lecturer?'
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalConfirmComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      if (ret) {
        this.data.splice(data.row.index, 1);
        this.rerenderLecturerManager()
      }
    });
  }

  private rerenderLecturerManager() {
    this._lecturerManager.rerenderTable(this.data);
  }
}
