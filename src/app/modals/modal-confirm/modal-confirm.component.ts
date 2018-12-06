import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
  @Input() message: string;
  @Input() title: string;

  constructor(private modalRef: BsModalRef, private onClose: Subject<boolean>) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  onYesButtonClicked() {
    this.onClose.next(true);
    this.modalRef.hide();
  }
  onNoButtonClicked() {
    this.onClose.next(false);
    this.modalRef.hide();
  }
}
