import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { ToastrNotificationService } from '../services/toastr-notification.service';

const SURVEYS_URL = 'http://class-survey.herokuapp.com/admins/classes';
const STUDENTS_URL = 'http://class-survey.herokuapp.com/admins/students';
const LECTURERS_URL = 'http://class-survey.herokuapp.com/admins/teachers';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  constructor(
    private toastr: ToastrNotificationService,
    private location: Location,
    private activatedRouter: ActivatedRoute
  ) { }

  public uploader: FileUploader;
  public uploaderOptions: FileUploaderOptions = {};
  public hasBaseDropZoneOver: boolean = false;
  private URL: string;
  private type: string;
  private title: string;

  ngOnInit() {
    this.type = this.activatedRouter.snapshot.paramMap.get('type');
    this.URL = this.getUrlByType(this.type);
    this.title = 'Import ' + this.capitalize(this.type);
    this.uploader = new FileUploader({ url: this.URL });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderOptions.headers = [{ name: 'access_token', value : localStorage.getItem("auth_token") }];
    this.uploader.setOptions(this.uploaderOptions);
    // this.uploader.onBuildItemForm = (item, form) => {
    //   form.append('xlsx', item._file);
    // }
    this.uploader.onCompleteItem = (item, res) => {
      let _res = JSON.parse(res);
      if (_res.success) {
        this.toastr.success(`File ${item._file.name} is uploaded successfully`);
      } else {
        this.toastr.error(`File ${item._file.name} doesn't have correct format`);
      }
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getUrlByType(type) {
    switch (type) {
      case 'surveys':
        return SURVEYS_URL;
      case 'students':
        return STUDENTS_URL;
      case 'lecturers':
        return LECTURERS_URL;
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onBackButtonClicked() {
    this.location.back();
  }
}
