import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './../layout.module';

import { LecturerLayoutRoutes } from './lecturer-layout.routing';
@NgModule({
  imports: [
    RouterModule.forChild(LecturerLayoutRoutes),
    LayoutModule
  ]
})

export class LecturerLayoutModule {}
