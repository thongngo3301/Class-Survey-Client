import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataManagerComponent } from './../components/data-manager/data-manager.component';
import { ModalConfirmComponent } from './../modals/modal-confirm/modal-confirm.component';
import { ModalLecturerInfoEditorComponent } from './../modals/modal-lecturer-info-editor/modal-lecturer-info-editor.component';
import { ApiService } from './../services/api.service';
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
    private toastr: ToastrNotificationService
  ) { }

  public _columns: Array<any> = [
    { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by name' } },
    { title: 'Position', name: 'position', filtering: { filterString: '', placeholder: 'Filter by position' } },
    { title: 'Office', className: ['office-header', 'text-success'], name: 'office', filtering: { filterString: '', placeholder: 'Filter by office' } },
    { title: 'Extn.', name: 'ext', filtering: { filterString: '', placeholder: 'Filter by extn.' } },
    { title: 'Start date', className: 'text-warning', name: 'startDate', filtering: { filterString: '', placeholder: 'Filter by start date' } },
    { title: 'Salary ($)', name: 'salary', filtering: { filterString: '', placeholder: 'Filter by salary' } }
  ];

  private columns: Array<any> = [
    { title: 'Lecturer ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by LID' } },
    { title: 'Lecturer Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by LN' } },
    { title: 'Username', name: 'username', filtering: { filterString: '', placeholder: 'Filter by Username' } },
    { title: 'Email', name: 'email', filtering: { filterString: '', placeholder: 'Filter by Email' } }
  ];

  private data: Array<any> = [];

  ngOnInit() {
    this.apiService.getAllLecturerData().subscribe((result) => {
      if (result && result.success) {
        // console.log(result.data);
        this.data = this.reconstructData(result.data);
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  ngAfterViewInit() {
    $(document).on('click','button.add-lecturer-btn', e => e.stopPropagation());
  }

  reconstructData(data: Array<any>) {
    let ret = new Array<any>();
    data.forEach(d => {
      // if (d.class && d.class.length) {
        // d.class.forEach(c => {
          let _row = {
            id: d._id,
            name: d.name,
            username: d._id || '',
            email: d.email || '',
            // class_id: c.id,
            // class_name: c.name
          }
          ret.push(_row);
        // });
      // }
    });
    return ret;
  }

  @ViewChild('lecturerManager') _lecturerManager: DataManagerComponent;

  private editLecturerInfo(data) {
    const initialState = {
      list: [
        'Lecturer edit'
      ],
      title: 'Edit lecturer',
      data: data
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalLecturerInfoEditorComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      console.log('edit ret', ret);
    });
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
