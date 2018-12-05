import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

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

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.list.push('PROFIT!!!');
    console.log('in modal', this.data);
  }
}
