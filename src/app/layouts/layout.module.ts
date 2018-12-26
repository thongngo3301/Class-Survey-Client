import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { ComponentsModule } from './../components/components.module';
import { ModalsModule } from './../modals/modals.module';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { FileUploaderComponent } from './../file-uploader/file-uploader.component';
import { StudentManagerComponent } from './../student-manager/student-manager.component';
import { LecturerManagerComponent } from './../lecturer-manager/lecturer-manager.component';
import { SurveyManagerComponent } from './../survey-manager/survey-manager.component';
import { TemplateManagerComponent } from './../template-manager/template-manager.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    ChartsModule,
    HttpClientModule,
    ProgressbarModule.forRoot(),
    FileUploadModule,
    ComponentsModule,
    ModalsModule
  ],
  declarations: [
    FileUploaderComponent,
    StudentManagerComponent,
    LecturerManagerComponent,
    SurveyManagerComponent,
    TemplateManagerComponent
  ]
})
export class LayoutModule { }
