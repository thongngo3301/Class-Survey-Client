import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2TableModule } from 'ng2-table';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { SurveyComponent } from './survey/survey.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    Ng2TableModule,
    SelectDropDownModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DataManagerComponent,
    SurveyComponent,
    StudentProfileComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DataManagerComponent,
    SurveyComponent,
    StudentProfileComponent
  ]
})
export class ComponentsModule { }
