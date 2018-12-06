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
import { NotificationsComponent } from '../../notifications/notifications.component';
import { FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { StudentManagerComponent } from '../../student-manager/student-manager.component';
import { LecturerManagerComponent } from '../../lecturer-manager/lecturer-manager.component';
import { SurveyManagerComponent } from '../../survey-manager/survey-manager.component';

import { AdminLayoutRoutes } from './admin-layout.routing';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
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
    NotificationsComponent,
    FileUploaderComponent,
    StudentManagerComponent,
    LecturerManagerComponent,
    SurveyManagerComponent
  ]
})

export class AdminLayoutModule {}
