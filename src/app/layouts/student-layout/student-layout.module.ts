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

// import { DashboardComponent } from '../../dashboard/dashboard.component';
// import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
// import { StudentManagerComponent } from '../../student-manager/student-manager.component';
// import { SurveyManagerComponent } from '../../survey-manager/survey-manager.component';

import { StudentLayoutRoutes } from './student-layout.routing';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentLayoutRoutes),
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
    // DashboardComponent,
    // UserProfileComponent,
    IconsComponent,
    // StudentManagerComponent,
    // SurveyManagerComponent
  ]
})

export class StudentLayoutModule {}
