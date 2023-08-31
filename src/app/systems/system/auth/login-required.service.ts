import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { environment } from '@environments/environment';
import { AuthService } from './auth.service';
import { AppCtrlService } from '@systems/system/app-ctrl/app-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

@Injectable()
export class LoginRequired implements CanActivate {

  constructor(
    private authService: AuthService,
    private appCtrlService: AppCtrlService,
    private router: Router,
    private navigate: NavgatorService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.checkIsLoggedIn()) { return true; }

    if (!environment.PRODUCTION && !!environment['OPEN_LOGIN']) {
      // 暫不登入，方便開發重整
      return true;
    }
    // 儲存現在的 URL，這樣登入後可以直接回來這個頁面
    this.appCtrlService.keepLoginPrePath(url);
    // 導回登入頁面
    // this.router.navigate(['/login']);
    this.navigate.push('login');
    return false;
  }

}
