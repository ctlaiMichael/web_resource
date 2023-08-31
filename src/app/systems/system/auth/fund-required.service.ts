/**
 * 基金權限檢核
 */
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { AlertService } from '@template/msg/alert/alert.service';

@Injectable()
export class FundRequired implements CanActivate {
    history: string[];
    constructor(
        private authService: AuthService,
        private alert: AlertService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        let path = route.url.shift().path;
        const url: string = state.url;
        return this.checkAllow(path, url, route)
            .then(
                (haveDoAgree) => {
                    return Promise.resolve(haveDoAgree);
                },
                (errorObj) => {
                    return Promise.resolve(false);
                }
            )
            .catch(errorCatch => {
                return Promise.resolve(true);
            });
    }

    checkAllow(path: string, url: string, param?): Promise<any> {
        console.error('checkDeviceTrust set:', path, url, param);
        if (!this.authService.checkAllowAuth('fundService')) {
            this.alert.show(
                '很抱歉！您無法透過行動銀行，使用〔投資理財〕相關服務！'
            );
            return Promise.resolve(false);
        } else {
            return Promise.resolve(true);
        }
    }
}
