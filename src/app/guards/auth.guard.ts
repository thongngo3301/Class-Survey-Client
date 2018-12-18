import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user.getAuthStatus() && this.user.getRoleId()) {
      return true;
      // const _allow = next.data.allow;
      // const _role = this.user.getRoleId();
      // // return true;
      // if (!_allow && _role) {
      //   switch (_role) {
      //     case '1':
      //       this.router.navigateByUrl('/admin/survey-manager');
      //       return true;
      //     case '2':
      //       this.router.navigateByUrl('/home');
      //       return true;
      //     case '3':
      //       this.router.navigateByUrl('/student/icons');
      //       return true;
      //   }
      // }
      // return _allow instanceof Array && _allow.includes(_role);
    }
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user.getAuthStatus() && this.user.getRoleId()) {
      return true;
      // const _allow = next.data.allow;
      // const _role = this.user.getRoleId();
      // // return true;
      // if (!_allow && _role) {
      //   switch (_role) {
      //     case '1':
      //       this.router.navigateByUrl('/admin/survey-manager');
      //       return true;
      //     case '2':
      //       this.router.navigateByUrl('/home');
      //       return true;
      //     case '3':
      //       this.router.navigateByUrl('/student/icons');
      //       return true;
      //   }
      // }
      // return _allow instanceof Array && _allow.includes(_role);
    }
    this.router.navigate(['/login']);
    return false;
  }
}
