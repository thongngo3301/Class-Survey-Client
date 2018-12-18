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
    if (this.user.getAuthStatus()) {
      const _allow = next.data.allow;
      const _role = this.user.getRoleId();
      return _allow instanceof Array && _allow.includes(_role);
    }
    this.router.navigate(['/login']);
    return false;
  }
}
