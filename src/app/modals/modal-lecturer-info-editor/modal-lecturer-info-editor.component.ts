import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-lecturer-info-editor',
  templateUrl: './modal-lecturer-info-editor.component.html',
  styleUrls: ['./modal-lecturer-info-editor.component.scss']
})
export class ModalLecturerInfoEditorComponent implements OnInit {
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
