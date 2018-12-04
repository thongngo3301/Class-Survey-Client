import { Component } from '@angular/core';
import { FileError, NgxfUploaderService, UploadEvent, UploadStatus } from 'ngxf-uploader';

import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  progress = 0;
  isUploading = false;

  constructor(private Upload: NgxfUploaderService, private apiService: ApiService) { }

  uploadFiles(files: File[] | FileError): void {
    console.log('selected files', files);
    this.isUploading = true;
    if (!(files instanceof Array)) {
      this.alertError(files);
      this.isUploading = false;
      return;
    }
    this.apiService.uploadFiles(files).subscribe(res => {
      console.log(res);
    });
    // this.apiService.uploadFiles(files).subscribe(
    //   (event: UploadEvent) => {
    //     console.log('upload evt', event);
    //     this.progress = event.percent;
    //     if (event.status === UploadStatus.Completed) {
    //       console.info(`This file upload success! File name: ${event.data.obj.file.originalname}`);
    //     }
    //   },
    //   (err) => {
    //     console.error(err);
    //   },
    //   () => {
    //     this.isUploading = false;
    //     this.progress = 0;
    //     console.log('complete');
    //   }
    // );
  }

  uploadFiles1(files: File[] | FileError): void {
    console.log('selected files', files);
    this.isUploading = true;
    if (!(files instanceof Array)) {
      this.alertError(files);
      this.isUploading = false;
      return;
    }
    this.Upload.upload({
      url: 'https://us-central1-alanzouhome.cloudfunctions.net/api/file',
      headers: {
        Authorization: 'token'
      }, // Option
      params: {
        test: '123'
      }, // Option
      fields: { // Option
        toUrl: 'device'
      },
      filesKey: 'fileKey', // Option
      files: files,
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        console.log('upload evt', event);
        this.progress = event.percent;
        if (event.status === UploadStatus.Completed) {
          console.info(`This file upload success! File name: ${event.data.obj.file.originalname}`);
        }
      },
      (err) => {
        console.error(err);
      },
      () => {
        this.isUploading = false;
        this.progress = 0;
        console.log('complete');
      });
  }

  // Do something you want when file error occur.
  alertError(msg: FileError) {
    switch (msg) {
      case FileError.NumError:
        alert('Number Error');
        break;
      case FileError.SizeError:
        alert('Size Error');
        break;
      case FileError.TypeError:
        alert('Type Error');
        break;
    }
  }
}
