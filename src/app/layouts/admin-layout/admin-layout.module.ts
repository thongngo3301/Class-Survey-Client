import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './../layout.module';

import { AdminLayoutRoutes } from './admin-layout.routing';
@NgModule({
  imports: [
    RouterModule.forChild(AdminLayoutRoutes),
    LayoutModule
  ]
})

export class AdminLayoutModule {}
