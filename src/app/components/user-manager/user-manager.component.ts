import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalStudentInfoEditorComponent } from '../../modals/modal-student-info-editor/modal-student-info-editor.component';
import { ModalLecturerInfoEditorComponent } from '../../modals/modal-lecturer-info-editor/modal-lecturer-info-editor.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit, OnChanges, AfterViewInit {
  public constructor(private modalRef: BsModalRef, private modalService: BsModalService) { }

  @Input() columns: Array<any>;
  @Input() data: Array<any>;

  private actionColumn = { title: 'Action', name: 'action', sort: false };
  private actionButtons = `
    <div style="display: flex">
      <button class="btn btn-info edit-user-btn" style="flex: 1; border-radius: 50%">
        <i class="fas fa-user-edit"></i>
      </button>
      <button class="btn btn-info remove-user-btn" style="flex: 1; border-radius: 50%">
        <i class="fas fa-user-slash"></i>
      </button>
    </div>
  `;
  private selectedData: any;

  public rows: Array<any> = [];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;
  public config: any;

  public ngOnInit() {
    this.prepareTable();
    this.config = {
      paging: true,
      sorting: { columns: this.columns },
      filtering: { filterString: '' },
      className: ['table-striped', 'table-bordered']
    };
    this.length = this.data.length;
    this.onChangeTable(this.config);
  }

  public ngOnChanges(changes: SimpleChanges) {
    const columns: SimpleChange = changes.columns;
    const data: SimpleChange = changes.data;
    this.columns = columns.currentValue;
    this.data = data.currentValue;
  }

  public ngAfterViewInit() {
    $(document).on('click','button.edit-user-btn', this.editUser);
    $(document).on('click','button.remove-user-btn', this.removeUser);
  }

  public prepareTable() {
    this.columns.unshift(this.actionColumn);
    this.data.forEach(d => d.action = this.actionButtons);
  }

  private setSelectedData(data: any) {
    this.selectedData = data;
  }
  private getSelectedData() {
    return this.selectedData;
  }

  public editUser = () => {
    let _selectedData = this.getSelectedData();
    console.log(_selectedData);
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component',
      data: _selectedData
    };
    this.modalRef = this.modalService.show(ModalStudentInfoEditorComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }

  public removeUser = () => {
    let _selectedData = this.getSelectedData();
    console.log(_selectedData);
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component',
      data: _selectedData
    };
    this.modalRef = this.modalService.show(ModalLecturerInfoEditorComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].toString().match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].toString().match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    this.setSelectedData(data);
  }
}
