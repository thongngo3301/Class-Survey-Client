import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastrNotificationService {

  constructor(private toastr: ToastrService) { }

  info(message) {
    this.toastr.info(message, '', {
      progressBar: true
    });
  }
  success(message) {
    this.toastr.success(message, '', {
      progressBar: true
    });
  }
  warning(message) {
    this.toastr.warning(message, '', {
      progressBar: true
    });
  }
  error(message) {
    this.toastr.error(message, '', {
      progressBar: true
    });
  }
}
