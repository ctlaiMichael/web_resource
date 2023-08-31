import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

@Injectable()
export class LogoutRequired implements CanActivate {

  constructor(
    private authService: AuthService,
    private navigator: NavgatorService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkNotLogin(url);
  }

  checkNotLogin(url: string): boolean {
    if (!this.authService.checkIsLoggedIn()) { return true; }

    // 導回登入頁面
    this.navigator.push('user-home');
    return false;
  }

}
