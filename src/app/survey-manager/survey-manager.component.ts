import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataManagerComponent } from './../components/data-manager/data-manager.component';
import { ModalConfirmComponent } from './../modals/modal-confirm/modal-confirm.component';
import { ModalStudentInfoEditorComponent } from './../modals/modal-student-info-editor/modal-student-info-editor.component';

const modalOptions = {
  class: 'gray modal-lg',
  ignoreBackdropClick: true,
  keyboard: false
}

@Component({
  selector: 'app-survey-manager',
  templateUrl: './survey-manager.component.html',
  styleUrls: ['./survey-manager.component.scss']
})
export class SurveyManagerComponent implements OnInit, AfterViewInit {
  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private router: Router
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
  { "name": "Hatity", "createdAt": "4/7/2018", "modifiedAt": "8/16/2018" },
  { "name": "Lotlux", "createdAt": "10/16/2018", "modifiedAt": "3/25/2018" },
  { "name": "Sub-Ex", "createdAt": "6/24/2018", "modifiedAt": "1/4/2018" },
  { "name": "Andalax", "createdAt": "10/13/2018", "modifiedAt": "7/15/2018" },
  { "name": "Subin", "createdAt": "5/30/2018", "modifiedAt": "1/17/2018" },
  { "name": "Voyatouch", "createdAt": "10/6/2018", "modifiedAt": "12/19/2017" },
  { "name": "Subin", "createdAt": "1/13/2018", "modifiedAt": "6/15/2018" },
  { "name": "Sub-Ex", "createdAt": "5/23/2018", "modifiedAt": "8/28/2018" },
  { "name": "Y-find", "createdAt": "3/24/2018", "modifiedAt": "6/28/2018" },
  { "name": "Voyatouch", "createdAt": "6/10/2018", "modifiedAt": "2/26/2018" },
  { "name": "Pannier", "createdAt": "8/16/2018", "modifiedAt": "1/22/2018" },
  { "name": "It", "createdAt": "6/5/2018", "modifiedAt": "12/31/2017" },
  { "name": "Alpha", "createdAt": "3/16/2018", "modifiedAt": "6/25/2018" },
  { "name": "Zathin", "createdAt": "10/16/2018", "modifiedAt": "5/31/2018" },
  { "name": "Viva", "createdAt": "4/4/2018", "modifiedAt": "8/30/2018" },
  { "name": "Tres-Zap", "createdAt": "11/11/2018", "modifiedAt": "7/1/2018" },
  { "name": "Solarbreeze", "createdAt": "11/18/2018", "modifiedAt": "6/6/2018" },
  { "name": "Bitwolf", "createdAt": "2/4/2018", "modifiedAt": "5/11/2018" },
  { "name": "Y-find", "createdAt": "1/3/2018", "modifiedAt": "9/22/2018" },
  { "name": "Tampflex", "createdAt": "6/11/2018", "modifiedAt": "5/27/2018" },
  { "name": "Flowdesk", "createdAt": "9/13/2018", "modifiedAt": "2/6/2018" },
  { "name": "Zontrax", "createdAt": "2/2/2018", "modifiedAt": "4/29/2018" },
  { "name": "Lotlux", "createdAt": "8/21/2018", "modifiedAt": "7/12/2018" },
  { "name": "Tampflex", "createdAt": "3/31/2018", "modifiedAt": "3/5/2018" },
  { "name": "Stronghold", "createdAt": "4/28/2018", "modifiedAt": "6/30/2018" },
  { "name": "Daltfresh", "createdAt": "8/3/2018", "modifiedAt": "5/28/2018" },
  { "name": "Bigtax", "createdAt": "11/26/2018", "modifiedAt": "7/20/2018" },
  { "name": "Toughjoyfax", "createdAt": "11/2/2018", "modifiedAt": "9/23/2018" },
  { "name": "Aerified", "createdAt": "8/23/2018", "modifiedAt": "12/9/2017" },
  { "name": "Opela", "createdAt": "9/6/2018", "modifiedAt": "9/13/2018" },
  { "name": "Cardify", "createdAt": "9/27/2018", "modifiedAt": "10/12/2018" },
  { "name": "Toughjoyfax", "createdAt": "2/3/2018", "modifiedAt": "8/29/2018" },
  { "name": "Temp", "createdAt": "6/10/2018", "modifiedAt": "9/14/2018" },
  { "name": "Greenlam", "createdAt": "5/11/2018", "modifiedAt": "8/4/2018" },
  { "name": "Tampflex", "createdAt": "11/14/2018", "modifiedAt": "5/4/2018" },
  { "name": "Y-find", "createdAt": "6/6/2018", "modifiedAt": "12/31/2017" },
  { "name": "Keylex", "createdAt": "7/5/2018", "modifiedAt": "2/16/2018" },
  { "name": "Sub-Ex", "createdAt": "10/23/2018", "modifiedAt": "2/19/2018" },
  { "name": "Tresom", "createdAt": "8/29/2018", "modifiedAt": "11/23/2018" },
  { "name": "Tresom", "createdAt": "4/29/2018", "modifiedAt": "10/25/2018" },
  { "name": "Konklab", "createdAt": "6/24/2018", "modifiedAt": "8/16/2018" },
  { "name": "Voyatouch", "createdAt": "3/14/2018", "modifiedAt": "3/26/2018" },
  { "name": "Treeflex", "createdAt": "12/28/2017", "modifiedAt": "9/27/2018" },
  { "name": "Home Ing", "createdAt": "12/29/2017", "modifiedAt": "3/21/2018" },
  { "name": "Tresom", "createdAt": "12/4/2018", "modifiedAt": "2/27/2018" },
  { "name": "Flowdesk", "createdAt": "12/22/2017", "modifiedAt": "1/4/2018" },
  { "name": "Mat Lam Tam", "createdAt": "10/25/2018", "modifiedAt": "9/29/2018" },
  { "name": "Lotstring", "createdAt": "11/24/2018", "modifiedAt": "4/24/2018" },
  { "name": "Rank", "createdAt": "1/6/2018", "modifiedAt": "1/15/2018" },
  { "name": "Treeflex", "createdAt": "1/30/2018", "modifiedAt": "12/2/2018" },
  { "name": "Home Ing", "createdAt": "5/19/2018", "modifiedAt": "12/20/2017" },
  { "name": "Rank", "createdAt": "9/20/2018", "modifiedAt": "8/7/2018" },
  { "name": "Biodex", "createdAt": "3/3/2018", "modifiedAt": "7/16/2018" },
  { "name": "Transcof", "createdAt": "12/28/2017", "modifiedAt": "12/7/2017" },
  { "name": "Subin", "createdAt": "1/24/2018", "modifiedAt": "10/3/2018" },
  { "name": "Home Ing", "createdAt": "12/1/2018", "modifiedAt": "9/9/2018" },
  { "name": "Matsoft", "createdAt": "5/26/2018", "modifiedAt": "3/25/2018" },
  { "name": "Lotstring", "createdAt": "9/19/2018", "modifiedAt": "4/1/2018" },
  { "name": "Tempsoft", "createdAt": "4/27/2018", "modifiedAt": "11/25/2018" },
  { "name": "Ventosanzap", "createdAt": "9/11/2018", "modifiedAt": "7/16/2018" },
  { "name": "Andalax", "createdAt": "8/19/2018", "modifiedAt": "6/24/2018" },
  { "name": "Span", "createdAt": "6/9/2018", "modifiedAt": "12/6/2017" },
  { "name": "Matsoft", "createdAt": "12/25/2017", "modifiedAt": "10/12/2018" },
  { "name": "Latlux", "createdAt": "3/27/2018", "modifiedAt": "10/31/2018" },
  { "name": "Greenlam", "createdAt": "3/20/2018", "modifiedAt": "12/25/2017" },
  { "name": "Mat Lam Tam", "createdAt": "5/8/2018", "modifiedAt": "9/28/2018" },
  { "name": "Kanlam", "createdAt": "8/17/2018", "modifiedAt": "2/8/2018" },
  { "name": "Daltfresh", "createdAt": "9/17/2018", "modifiedAt": "3/31/2018" },
  { "name": "Treeflex", "createdAt": "1/10/2018", "modifiedAt": "7/18/2018" },
  { "name": "Namfix", "createdAt": "11/1/2018", "modifiedAt": "9/22/2018" },
  { "name": "Bigtax", "createdAt": "10/19/2018", "modifiedAt": "6/18/2018" },
  { "name": "Treeflex", "createdAt": "10/19/2018", "modifiedAt": "10/12/2018" },
  { "name": "Duobam", "createdAt": "5/11/2018", "modifiedAt": "11/5/2018" },
  { "name": "Home Ing", "createdAt": "5/7/2018", "modifiedAt": "3/3/2018" },
  { "name": "Konklab", "createdAt": "12/14/2017", "modifiedAt": "1/27/2018" },
  { "name": "Konklux", "createdAt": "1/18/2018", "modifiedAt": "2/9/2018" }]

  ngOnInit() { }

  ngAfterViewInit() {
    $(document).on('click','button.add-survey-btn', e => e.stopPropagation());
  }

  @ViewChild('surveyManager') _surveyManager: DataManagerComponent;

  private editSurveyInfo(data) {
    this.router.navigate(['/survey-manager/edit', data.row.name]);
  }

  private viewSurveyInfo(data) {
    const initialState = {
      list: [
        'Survey view'
      ],
      title: 'Survey info',
      data: data
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalStudentInfoEditorComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      console.log('view ret', ret);
    });
  }

  private removeSurveyInfo(data) {
    const initialState = {
      title: 'Remove survey',
      message: 'Are you sure to remove this survey?'
    }
    const config = Object.assign({ initialState }, modalOptions);
    this.modalRef = this.modalService.show(ModalConfirmComponent, config);
    this.modalRef.content.onClose.subscribe(ret => {
      if (ret) {
        this.data.splice(data.row.index, 1);
        this.rerenderSurveyManager();
      }
    });
  }

  private rerenderSurveyManager() {
    this._surveyManager.rerenderTable(this.data);
  }
}
