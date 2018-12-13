import { Component, OnInit } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { ToastrNotificationService } from '../services/toastr-notification.service';

const URL = 'http://192.168.16.158:5000/admins/students';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  constructor(private toastr: ToastrNotificationService) { }

  public uploader: FileUploader = new FileUploader({ url: URL });
  public uploaderOptions: FileUploaderOptions = {};
  public hasBaseDropZoneOver: boolean = false;

  ngOnInit() {
    this.uploaderOptions.headers = [{ name: 'access_token', value : localStorage.getItem("auth_token") }];
    this.uploader.setOptions(this.uploaderOptions);
    // this.uploader.onBuildItemForm = (item, form) => {
    //   form.append('xlsx', item._file);
    // }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
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
}
