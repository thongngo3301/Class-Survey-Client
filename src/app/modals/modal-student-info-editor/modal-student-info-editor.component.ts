import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-modal-student-info-editor',
  templateUrl: './modal-student-info-editor.component.html',
  styleUrls: ['./modal-student-info-editor.component.scss']
})
export class ModalStudentInfoEditorComponent implements OnInit {
  @Input() data: any;
  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(private modalRef: BsModalRef, private onClose: Subject<boolean>) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.list.push('PROFIT!!!');
    console.log('in modal', this.data);
  }

  onOkButtonClicked() {
    const ret = this.data;
    this.onClose.next(ret);
    this.modalRef.hide();
  }
  onApplyButtonClicked() {
    const ret = this.data;
    this.onClose.next(ret);
  }
  onCancelButtonClicked() {
    this.modalRef.hide();
  }
}
