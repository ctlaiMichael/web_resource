import { Injectable } from '@angular/core';
import { SPEC02010201ApiService } from '@api/spec02/spec02010201/spec02010201-api.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { AppCtrlService } from '@systems/system/app-ctrl/app-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

@Injectable()
export class LogoutService {
    
    constructor(
        private spec02010201: SPEC02010201ApiService,
        private auth: AuthService,
        private appCtrl: AppCtrlService,
        private navgator: NavgatorService
    ) {
        this.appCtrl.logoutEventSubject.subscribe((tologin) => { 
            this.logout(tologin); 
        });
    }

    /**
     * 登出
     */
    logout(tologin?: boolean) {
        let custId = this.auth.getCustId();
        let output = {
            "custId": custId
        };
        this.appCtrl.logoutClear();

        this.spec02010201.logout(output, {background: true});
        if (!!tologin && tologin == true) {
            this.navgator.push('login');
        }
    }

}
