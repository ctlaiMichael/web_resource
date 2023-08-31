/**
 * app控制 pause、resume事件
 */
import { Injectable, NgZone } from '@angular/core';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { Logger } from '@systems/system/logger/logger.service';
// --- lib --- //
import { Timer } from '@lib/timer/timer.class';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AutoLogoutService } from '@template/msg/auto-logout/auto-logout.service';
import { SessionStorageService } from '@lib/storage/session-storage.service';
import { FormateService } from '@template/formate/formate.service';
import { ExitAppService } from '@lib/exit-app/exit-app.service';
import { CacheService } from '../cache/cache.service';
// --- show --- //
import { AlertService } from '@template/msg/alert/alert.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class AppCtrlService {
    onPause: Subject<any> = new Subject<any>();
    onResume: Subject<any> = new Subject<any>();

    private loginPrePath: any; // 登入前資訊暫存
    private autoLogoutTimer: Timer; // 自動登出timer
    private pauseTime: number; // 移入背景時間
    private timeOut: number;
    private subscriptDisableNativeReturn: any; // android實體返回控制
    private disableNativeReturn = false;
    private hasAndroidBackDialog = false;

    logoutEventSubject: Subject<any> = new Subject<any>();
    changeLogin: Subject<any> = new Subject<any>();
    changeLogout: Subject<any> = new Subject<any>();
    // --  telegram timeer --- //
    telegramSubject: Subject<any> = new Subject<any>(); // 維持連線時間控制
    // --- challenge response --- //
    private crTimer: Timer; // challenge response timer
    private crTimeOut: number;
    changeCrStart: Subject<any> = new Subject<any>();
    changeCrStop: Subject<any> = new Subject<any>();

    constructor(
        private zone: NgZone,
        private _logger: Logger,
        // --- lib --- //
        private auth: AuthService,
        private autoLogoutTimeBomb: AutoLogoutService,
        private session: SessionStorageService,
        private navgator: NavgatorService,
        private layoutCtrl: LayoutCtrlService,
        private _formateService: FormateService,
        private exitApp: ExitAppService,
        private cache: CacheService,
        // --- show --- //
        private alert: AlertService,
        private confirm: ConfirmService
    ) {
        document.addEventListener('pause', () => {
            this._logger.log('[STEP] APP on pause');
            this.onPauseHandler();
        }, false);

        document.addEventListener('resume', () => {
            this._logger.log('[STEP] APP on resume');
            this.onResumeHandler();
        }, false);

        this.telegramSubject.subscribe(() => { this.resetTimer(); });

        this.subscriptDisableNativeReturn = this.layoutCtrl.disableNativeReturnSubject.subscribe((disable: boolean) => {
            this.disableNativeReturn = disable;
        });
    }

    /**
     * 保存登入前路徑資訊
     */
    keepLoginPrePath(url) {
        let now_path = this.layoutCtrl.getLastPath();
        this.loginPrePath = {
            'url': url,
            'path': '',
            'navParams': {},
            'otherParams': {}
        };
        // 對應navgator和layout資料
        if (!!now_path) {
            this.loginPrePath.path = now_path;
            this.loginPrePath.navParams = this.layoutCtrl.getParams();
            this.loginPrePath.otherParams = this.layoutCtrl.getOtherParams();
        }
    }

    /**
     * 清除登入前路徑資訊
     */
    clearLoginPrePath() {
        // reset
        this.loginPrePath = {
            'url': '',
            'path': '',
            'navParams': {},
            'otherParams': {}
        };
    }

    /**
     * 通知登入成功
     */
    changeToLogin() {
        this.initTimer();
        this.changeLogin.next();
    }

    /**
     * 通知登出成功
     */
    changeToLogout() {
        this.changeLogout.next();
    }

    clearAutoLogout() {
        if (this.autoLogoutTimeBomb.isOpened()) {
            this.autoLogoutTimeBomb.destroy();
        }
    }

    /**
     * 初始化登出倒數
     */
    private initTimer() {
        const self = this;
        this.timeOut = (!this.auth.getTimeOut()) ? environment.AUTOLOGOUT_TIME : parseFloat(this.auth.getTimeOut()) * 60;
        const deadline = this.timeOut - environment.WARNING_BEFORE_LOGOUT_TIME;
        if (!this.autoLogoutTimer) {
            this.autoLogoutTimer = new Timer(deadline, () => {
                self.ctrlWarningIdle(environment.WARNING_BEFORE_LOGOUT_TIME);
            });
        }
    }

    /**
     * 背景事件控制
     */
    private onPauseHandler() {
        this.clearAutoLogout();
        this.zone.run(() => {
            this.pauseTime = new Date().getTime();
            if (this.auth.checkIsLoggedIn()) {
                this.autoLogoutTimer.stop();
            }
            this.crTimer.stop();
            this.onPause.next(this.pauseTime);
        });


    }

    private onResumeHandler() {
        this.zone.run(() => {
            const now = new Date().getTime();
            this.onResume.next(now);
            const backgroundTime = Math.round((now - this.pauseTime) / 1000);
            if (this.auth.checkIsLoggedIn()) {
                const deadline = this.timeOut;
                const warningTime = environment.WARNING_BEFORE_LOGOUT_TIME;
                if (!!this.autoLogoutTimer) {
                    const t = this.autoLogoutTimer.getTime();
                    const idleTime = t + backgroundTime;
                    // 更新閒置時間
                    this.autoLogoutTimer.setTime(idleTime);
                    this.autoLogoutTimer.resume();
                    const remainingTime = deadline - idleTime;  // 剩餘時間
                    if (remainingTime <= 0) {
                        // 已超過時間登出提示，發登出電文
                        this.ctrlLogoutPop('auto');
                    } else if (remainingTime <= warningTime) {
                        // 已到了要提示登出的時間
                        this.ctrlWarningIdle(remainingTime);
                    }
                    //  else {
                    //   // 還在有效時間內
                    // }
                } else {
                    // 已登入但無計時? 此狀態不該出現
                    // 提示已超過時間登出，發登出電文
                    this.ctrlLogoutPop('auto');
                }
            }

            this.checkCrTimerAllow(backgroundTime);
        });
    }

    /**
     * 登出提示
     */
    ctrlWarningIdle(deadline: number) {
        if (this.auth.checkIsLoggedIn()) {
            this.ctrlAutoLogout().then((isOpened) => {
                if (!isOpened) {
                    this.autoLogoutTimeBomb.show(deadline)
                        .then(() => this.keepLogin())
                        .catch((type) => this.ctrlLogoutPop(type));
                }
            });
        }
    }

    /**
     * 登出提示: 自動登出
     */
    private ctrlLogoutPop(type) {
        if (type == 'auto') {
            this.alert.show('POPUP.AUTO_LOGOUT.AUTOLOGOUT').then(() => {
                this.logout();
            });
        } else if (type == 'click') {
            this.logout();
        }

    }

    /**
     * 登出提示控制
     */
    private ctrlAutoLogout(deadline?: number): Promise<any> {
        let isOpened = (this.autoLogoutTimeBomb.isOpened()) ? true : false;
        if (isOpened) {
            this.autoLogoutTimeBomb.destroy();
        }
        return Promise.resolve(isOpened);
    }

    /**
     * 保持登入
     */
    keepLogin() {
        // this.f1000103.send({}, { background: true });
        // 請求api

        this.resetTimer();
    }

    /**
     * 登出
     */
    logout(tologin?: boolean) {
        this.logoutEventSubject.next(tologin);
    }

    /**
     * 登出清除暫存
     */
    logoutClear() {
        this.layoutCtrl.closePopup();
        this.changeToLogout();
        this.auth.logoutClearAuthData();
        this.stopTimer();
        this.clearAutoLogout();
        this.cache.clear('login');
        this.navgator.home();
    }

    /**
     * 登入後導頁
     */
    redirectAfterLogin() {
        let navParams = {};
        let otherParams = {};
        let path = this._formateService.checkField(this.loginPrePath, 'path');
        let redirectUrl = this._formateService.checkField(this.loginPrePath, 'url');
        if (!!path) {
            navParams = this._formateService.checkObjectList(this.loginPrePath, 'navParams');
            otherParams = this._formateService.checkObjectList(this.loginPrePath, 'otherParams');
        } else if (!!redirectUrl && typeof redirectUrl == 'string') {
            path = '';
            const args = redirectUrl.split('?');
            if (!!args[0]) {
                path = args[0];
            }
        }
        if (!path) {
            // 預設
            path = 'user-home';
        }

        // 導頁要reset
        this.loginPrePath = {
            'url': '',
            'path': '',
            'navParams': {},
            'otherParams': {}
        };
        // 導頁
        this.navgator.push(path, navParams, { 'otherParams': otherParams });
    }

    /**
     * Android返回鍵動作
     * _render.listen 不能執行
     */
    onReturnBtn() {
        if (!!this.disableNativeReturn || !!sessionStorage.disableNativeReturn) {
            return;
            // } else if (!!sessionStorage.scanCameraOn) {
            //   // 掃描相機開啟時只關掉相機
            //   this.navgator.displayScanBox(false);
            //   return;
        } else {
            this.zone.run(() => {
                const path = this.navgator.getLastPath();
                if (!path || path === '' || path === 'home') {
                    if (!!this.hasAndroidBackDialog) {
                        return;
                    }
                    this.hasAndroidBackDialog = true;
                    this.confirm.show('POPUP.RETURN.EXIT_APP', { title: 'POPUP.RETURN.EXIT_APP_TITLE' }).then(() => {
                        this.exitApp.exit();
                        this.hasAndroidBackDialog = false;
                    }).catch(() => this.hasAndroidBackDialog = false);
                } else if (path === 'user-home') {
                    if (!!this.hasAndroidBackDialog) {
                        return;
                    }
                    this.hasAndroidBackDialog = true;
                    this.confirm.show('POPUP.RETURN.LOGOUT', { title: 'POPUP.RETURN.LOGOUT_TITLE' }).then(() => {
                        this.logout();
                        this.hasAndroidBackDialog = false;
                    }).catch(() => this.hasAndroidBackDialog = false);
                } else {
                    // 點左側選單
                    this.layoutCtrl.onHeaderClick('left');
                }
            });
        }
    }


    /**
     * [Challenge Response] 通知CR成功
     * 初始化challenge response倒數
     */
    changeToCrStart() {
        const self = this;
        this.crTimeOut = environment.AUTH_TIME;
        const deadline = environment.AUTH_TIME - environment.WARNING_BEFORE_AUTH_TIME;
        this._logger.step('Mscale', 'challenge response timer start');
        if (!!this.crTimer) {
            this.stopCrTimer();
        }
        this.crTimer = new Timer(deadline, () => {
            this.zone.run(() => {
                this.changeToCrStop();
            });
        });
        this.changeCrStart.next();
    }

    /**
     * [Challenge Response] 通知CR停止
     */
    changeToCrStop() {
        this._logger.step('Mscale', 'challenge response timer stop');
        this.changeCrStop.next();
    }

    /**
     * [Challenge Response] 檢查CR token是否過期
     * @param backgroundTime 設定的時間，預設為0
     */
    checkCrTimerAllow(backgroundTime?: number) {
        let output = true; // allow
        if (!environment.AUTH_CHECK_TIMEOUT) {
            // 不檢核請忽略
            return output;
        }
        if (!backgroundTime) {
            backgroundTime = 0;
        }


        const deadlineCr = this.crTimeOut;
        const warningTimeCr = environment.WARNING_BEFORE_AUTH_TIME;
        if (!!this.crTimer) {
            const tCr = this.crTimer.getTime();
            const idleTimeCr = tCr + backgroundTime;
            // 更新閒置時間
            this.crTimer.setTime(idleTimeCr);
            this.crTimer.resume();
            const remainingTimeCr = deadlineCr - idleTimeCr; // 剩餘時間
            if (remainingTimeCr <= 0) {
                // 已超過時間登出提示，強制停止
                this.changeToCrStop();
                output = false;
            } else if (remainingTimeCr <= warningTimeCr) {
                // 已到了要提示登出的時間
                this.changeToCrStop();
                output = false;
            }
        } else {
            // CR無計時? 此狀態不該出現
            this.changeToCrStop();
            output = false;
        }

        return output;
    }

    // --------------------------------------------------------------------------------------------
    // ___________.__                              
    // \__    ___/|__| _____   _____   ___________ 
    //   |    |   |  |/     \ /     \_/ __ \_  __ \
    //   |    |   |  |  Y Y  \  Y Y  \  ___/|  | \/
    //   |____|   |__|__|_|  /__|_|  /\___  >__|   
    //                     \/      \/     \/     
    // --------------------------------------------------------------------------------------------

    /**
     * 維持連線計時器
     */
    maintainConnectTimer() {
        this.telegramSubject.next();
    }

    /**
     * 重設計時
     */
    resetTimer() {
        if (!!this.autoLogoutTimer) {
            this.autoLogoutTimer.restart();
        }
    }

    /**
     * 停止計時
     */
    stopTimer() {
        if (!!this.autoLogoutTimer) {
            this.autoLogoutTimer.stop();
            delete this.autoLogoutTimer;
        }
    }


    /**
     * [Challenge Response] Challenge Response重設計時
     */
    resetCrTimer() {
        if (!!this.crTimer) {
            this.crTimer.restart();
        }
    }


    /**
     * [Challenge Response] 停止計時
     */
    stopCrTimer() {
        if (!!this.crTimer) {
            this.crTimer.stop();
            delete this.crTimer;
        }
    }

}