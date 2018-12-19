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
        this.data = this.reconstructData(result.data, role_id);
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
          { title: 'ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by ID' } },
          { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by Name' } },
          { title: 'Username', name: 'username', filtering: { filterString: '', placeholder: 'Filter by Username' } },
          { title: 'Email', name: 'email', filtering: { filterString: '', placeholder: 'Filter by Email' } }
        ]
      case '2':
        return [
          { title: 'ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by ID' } },
          { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by Name' } },
          { title: 'Username', name: 'username', filtering: { filterString: '', placeholder: 'Filter by Username' } },
          { title: 'Email', name: 'email', filtering: { filterString: '', placeholder: 'Filter by Email' } },
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
            username: d._id || '',
            email: d.email || ''
          }
          ret.push(_row);
        });
        break;
      case '2':
        data.forEach(d => {
          if (d.class.length) {
            d.class.forEach(c => {
              let _row = {
                id: d._id,
                name: d.name,
                username: d._id || '',
                email: d.email || '',
                class_id: c.id || '',
                class_name: c.name || ''
              }
              ret.push(_row);
            });
          } else {
            let _row = {
              id: d._id,
              name: d.name,
              username: d._id || '',
              email: d.email || '',
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
