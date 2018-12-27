import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute,
    private location: Location,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrNotificationService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  private action: string;
  private id: string;
  private isReady: boolean = false;
  private name: string;

  private sections: Array<any> = [];

  private isSubmitted: boolean = false;
  private activated: boolean = false;

  ngOnInit() {
    this.action = this.activatedRouter.snapshot.paramMap.get('action');
    if (this.action == 'edit') {
      this.id = this.activatedRouter.snapshot.paramMap.get('id');
      const payload = {
        templateId: this.id
      }
      this.spinner.show();
      this.apiService.getTemplateData(payload).subscribe(res => {
        this.spinner.hide();
        if (res && res.success) {
          this.activated = res.data.isUse;
          this.name = res.data.name;
          this.sections = res.data.group_fields;
          this.isReady = true;
        } else {
          this.toastr.error(res.message);
        }
      });
    } else {
      this.addSection();
      this.isReady = true;
    }
  }

  capitalize() {
    return this.action.charAt(0).toUpperCase() + this.action.slice(1);
  }

  addQuestion(idx: number) {
    this.sections[idx].fields.push({
      title: '',
      value: 0
    });
  }

  addSection() {
    this.sections.push({
      title: '',
      fields: [
        {
          title: '',
          value: 0
        }
      ]
    });
  }

  validateAllInputs() {
    for (let i = 0; i < this.sections.length; i++) {
      if (!this.sections[i].title.length) return false;
      let fields = this.sections[i].fields;
      for(let j = 0; j < fields.length; j++) {
        if (!fields[j].title.length) return false;
      }
    }
    return true;
  }

  stringifyDate(date: Date) {
    const dd = (date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate());
    const mm = (date.getMonth().toString().length > 1 || date.getMonth().toString() == '9') ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  activate() {
    const payload = {
      templateId: this.id
    }
    this.spinner.show();
    this.apiService.activateTemplate(payload).subscribe(res => {
      this.spinner.hide();
      if (res && res.success) {
        this.toastr.success('Activated successfully');
        this.activated = true;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  onSubmit() {
    if (this.action == 'edit') {
      const payload = {
        templateId: this.id,
        name: this.name,
        modify_at: this.stringifyDate(new Date()),
        group_fields: this.sections
      }
      this.spinner.show();
      this.apiService.editTemplateData(payload).subscribe(res => {
        this.spinner.hide();
        if (res && res.success) {
          this.toastr.success(`Update template "${this.name}" successfully`);
          this.router.navigate(['/template-manager']);
        } else {
          this.toastr.error(res.message);
        }
      });
    } else {
      const payload = {
        name: this.name,
        create_at: this.stringifyDate(new Date()),
        modify_at: this.stringifyDate(new Date()),
        group_fields: this.sections
      }
      this.spinner.show();
      this.apiService.addTemplateData(payload).subscribe(res => {
        this.spinner.hide();
        if (res && res.success) {
          this.toastr.success(`Add new template successfully"`);
          this.router.navigate(['/template-manager']);
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }

  onBackButtonClicked() {
    this.location.back();
  }

}
