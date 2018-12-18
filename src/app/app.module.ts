import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ModalsModule } from './modals/modals.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { LecturerLayoutComponent } from './layouts/lecturer-layout/lecturer-layout.component';

import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { ToastrNotificationService } from './services/toastr-notification.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    ModalsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      autoDismiss: true,
      newestOnTop: true,
      resetTimeoutOnDuplicate: true
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    StudentLayoutComponent,
    LecturerLayoutComponent,
    LoginComponent,
    ChangePasswordComponent,
    NotFoundComponent
  ],
  providers: [UserService, ApiService, ToastrNotificationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
