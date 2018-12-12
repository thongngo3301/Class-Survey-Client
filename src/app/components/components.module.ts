import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2TableModule } from 'ng2-table';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { SurveyComponent } from './survey/survey.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    Ng2TableModule,
    SelectDropDownModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DataManagerComponent,
    SurveyComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DataManagerComponent,
    SurveyComponent
  ]
})
export class ComponentsModule { }
