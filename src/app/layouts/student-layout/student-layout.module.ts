import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './../layout.module';

import { StudentLayoutRoutes } from './student-layout.routing';
@NgModule({
  imports: [
    RouterModule.forChild(StudentLayoutRoutes),
    LayoutModule
  ]
})

export class StudentLayoutModule {}
