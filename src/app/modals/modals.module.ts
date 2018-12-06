import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';
import { ModalStudentInfoEditorComponent } from './modal-student-info-editor/modal-student-info-editor.component';
import { ModalLecturerInfoEditorComponent } from './modal-lecturer-info-editor/modal-lecturer-info-editor.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ModalStudentInfoEditorComponent,
    ModalLecturerInfoEditorComponent,
    ModalConfirmComponent
  ],
  providers: [
    BsModalRef,
    BsModalService,
    Subject
  ],
  entryComponents: [
    ModalStudentInfoEditorComponent,
    ModalLecturerInfoEditorComponent,
    ModalConfirmComponent
  ],
  exports: [
    ModalStudentInfoEditorComponent,
    ModalLecturerInfoEditorComponent,
    ModalConfirmComponent
  ]
})
export class ModalsModule { }
