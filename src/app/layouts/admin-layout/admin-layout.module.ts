import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { FileUploadModule } from 'ng2-file-upload';
import { ComponentsModule } from '../../components/components.module';
import { ModalsModule } from '../../modals/modals.module';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { StudentManagerComponent } from '../../student-manager/student-manager.component';
import { NewStudentComponent } from '../../student-manager/new-student/new-student.component';
import { EditStudentComponent } from '../../student-manager/edit-student/edit-student.component';
import { LecturerManagerComponent } from '../../lecturer-manager/lecturer-manager.component';
import { SurveyManagerComponent } from '../../survey-manager/survey-manager.component';
import { EditSurveyComponent } from '../../survey-manager/edit-survey/edit-survey.component';
import { TemplateManagerComponent } from '../../template-manager/template-manager.component';

import { AdminLayoutRoutes } from './admin-layout.routing';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    ChartsModule,
    HttpClientModule,
    NgxfUploaderModule,
    ProgressbarModule.forRoot(),
    FileUploadModule,
    ComponentsModule,
    ModalsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    FileUploaderComponent,
    StudentManagerComponent,
    NewStudentComponent,
    EditStudentComponent,
    LecturerManagerComponent,
    SurveyManagerComponent,
    EditSurveyComponent,
    TemplateManagerComponent
  ]
})

export class AdminLayoutModule {}
