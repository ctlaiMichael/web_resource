import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { Logger } from '@systems/system/logger/logger.service';
import { LoginService } from '../shared/login.service';
import { environment } from '@environments/environment';
import { AlertService } from '@template/msg/alert/alert.service';
import { DeviceService } from '@lib/device/device.service';
import { CryptoService } from '@lib/crypto/crypto.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { AppCtrlService } from '@systems/system/app-ctrl/app-ctrl.service';
import { CheckNetworkService } from '@lib/network/check-network.service';
import { CheckMaintainService } from '@lib/network/check-maintain.service';
import { char_error_content } from '../shared/char-error-content';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckDeviceBindService } from '@systems/system/init/check-device-bind.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: []
})
export class LoginPageComponent implements OnInit, OnDestroy {
    // 登入資訊
    loginRemember = {
        userData: {
            custId: ''
        },
        rememberMe: { // 記住我 0 關閉 1 啟用
            remcust: '0'
        }
    };

    fastLogin = false; // 是否綁定快速登入
    
    // 快速登入資訊
    fastData = {
        fast_custId: '', // 快速登入綁定身分證字號
        fast_userId: '', // 快速登入綁定使用者代號
        bindStatus: '', // 快速登入綁定狀態 1:綁定 2:未綁定
        fastType: '', // 快速登入模式 1:圖形 2:生物辨識
        fastStatus: '', // 快速登入狀態 1:約轉 2:約轉及非約轉
        patternErrCount: '' // 圖形錯誤次數
    };

    // 看見我資訊
    seeObj = {
        seeuser: false,
        seepswd: false,
    };

    custId = '';
    userId_model = ''; // 顯示
    userId = ''; // 明碼值
    userId_mask = ''; // 遮碼值
    pswd_model = ''; // 顯示
    pswd = ''; // 明碼值
    pswd_mask = ''; // 遮碼值

    checkData = { // 檢核欄位Obj
        status: false,
        errMsgObj: {},
        isErrorChar: false
    };

    appversion: string;

    constructor(
        private localStorageService: LocalStorageService,
        private _logger: Logger,
        private loginService: LoginService,
        private errorHandler: HandleErrorService,
        private alert: AlertService,
        private device: DeviceService,
        private crypto: CryptoService,
        private navgator: NavgatorService,
        private headerCtrl: HeaderCtrlService,
        private appCtrl: AppCtrlService,
        private checkNetworkService: CheckNetworkService,
        private checkMaintainService: CheckMaintainService,
        private confirm: ConfirmService,
        private formateService: FormateService,
        private checkDeviceBind: CheckDeviceBindService
    ) {
        // 取用 登入資訊Storage
        const tempRem = this.localStorageService.getObj('Remember');
        if (tempRem !== null && tempRem.hasOwnProperty('userData') && tempRem.hasOwnProperty('rememberMe')) {
            if (environment.NATIVE) {
                this.crypto.AES_Decrypt('lb_scsb', tempRem.userData).then(
                    (res_Dncode) => {
                        tempRem.userData = JSON.parse(res_Dncode.value);
                        this.loginRemember = tempRem;
                        return Promise.resolve();
                    },
                    (error_Dncode) => {
                        this._logger.error('rememberData error_Dncode', error_Dncode);
                        return Promise.resolve();
                    }
                ).then(
                    () => {
                        // 取用 快速登入資訊Storage
                        const tempFtData = this.localStorageService.getObj('fastData');
                        if (tempFtData !== null && tempFtData.hasOwnProperty('fast_custId')
                            && tempFtData.hasOwnProperty('bindStatus') && tempFtData.bindStatus === '1') {

                            this.crypto.AES_Decrypt('lb_scsb', tempFtData.fast_custId).then(
                                (res_Dncode) => {
                                    this.fastLogin = true;
                                    tempFtData.fast_custId = res_Dncode.value;
                                    this.fastData = tempFtData;
                                    this.common();
                                },
                                (error_Dncode) => {
                                    this._logger.error('fastData error_Dncode', error_Dncode);
                                    this.common();
                                }
                            );
                        } else {
                            this.common();
                        }
                    },
                    (error_fast) => {
                        this._logger.debug('error_fast', error_fast);
                    }
                );
            } else {
                this.loginRemember = tempRem;
                const tempFtData = this.localStorageService.getObj('fastData');
                if (tempFtData !== null && tempFtData.hasOwnProperty('fast_custId')
                    && tempFtData.hasOwnProperty('bindStatus') && tempFtData.bindStatus === '1')
                {
                    this.fastLogin = true;
                    this.fastData = tempFtData;
                    this.common();
                } else {
                    this.common();
                }
            }
        } else {
            this.common();
        }

    }

    ngOnInit() {
        this.headerCtrl.setLeftBtnClick(() => {
            this.backToHome();
        });

        this.device.devicesInfo('appVersion').then((appVersion) => {
            this.appversion = appVersion;
        });
    }

    ngOnDestroy() {

    }

    /**
     * localStorage 一般流程合併
     */
    common() {
        // 一般登入是否有記住我
        if (this.loginRemember.rememberMe.remcust === '1' && this.loginRemember.userData.custId !== '') {
            this.custId = this.loginRemember.userData.custId;
        } else {
            this.loginRemember.rememberMe.remcust = '0';
        }
        this.checkFastLogin();
    }

    /**
     * 檢查快速登入方式
     */
    checkFastLogin() {
        if (this.fastLogin) { // 是否綁定快速登入
            // 檢查網路
            this.checkNetwork().then(
                (res) => {
                    // 快速登入開啟為圖形碼
                    if (this.fastData.fastType === '1') {
                        // this.patternLogin();
                    } else if (this.fastData.fastType === '2') { // 快速登入開啟為生物辨識
                        // let cancelFastLogin = this.localStorageService.get('cancelFastLogin'); // 生物辨識錯五次自動解除生物辨識與圖形鎖
                        // if (!!cancelFastLogin && cancelFastLogin == '1') {
                        //     return false; // 已lock不處理
                        // }

                        if (environment.NATIVE) {
                            this.bioLogin();
                        } else {
                            // 開發使用
                            this.errorHandler.handleError({
                                type: 'confirm',
                                title: 'ERROR.INFO_TITLE',
                                content: '[測試]確定要立即使用快速登入'
                            }).then(
                                () => {
                                    this.bioLogin();
                                },
                                () => {
                                    // no do
                                }
                            );
                        }
                    }
                },
                (err) => {
                    this.errorHandler.handleError(err);
                }
            );

        }
    }

    /**
     * 一般登入
     */
    async pswdLogin() {
        let output = {
            custId: this.custId,
            userId: this.userId,
            pswd: this.pswd,
            loginType: '1'
        };

        this.checkData = this.loginService.checkData(output);

        if (this.checkData.status) {
            this.loginService.login(output).then(
                (res) => {
                    this.loginRemember.userData.custId = this.custId;
                    this.saveRememberData();
                    this.loginService.doAfterLogin(res);
                },
                (err) => {
                    this.pswd_model = '';
                    this.pswd = '';
                    this.pswd_mask = '';
                    if (err.app_error_code == '0201002') {
                        this.confirm.show('ERROR.LOGIN.NEED_APPLY_MOBILE_BANK', {
                            title: 'ERROR.LOGIN.MOBILE_BANK_TITLE',
                            btnYesTitle: 'ERROR.LOGIN.MOBILE_BANK_YES',
                            btnNoTitle: 'ERROR.LOGIN.MOBILE_BANK_NO'
                        }).then(
                            (res) => {
                                window.open('https://mbank.scsb.com.tw/');
                            },
                            (error) => { });
                    } else {
                        this.errorHandler.handleError(err);
                    }
                }
            );
        } else {
            if (this.checkData.isErrorChar) {
                this.alert.show(char_error_content);
            }
        }

    }

    /**
     * 生物辨識登入
     */
    bioLogin() {
        // 生物辨識啟用狀態
        if (this.fastData.bindStatus === '1' && this.fastData.fastType === '2') {
            // 比對快速登入資訊 與 一般登入資訊 最後登入帳號是否相同
            if (this.custId != '' && this.fastData.fast_custId !== this.custId) {
                this.alert.show('您現在的ID與設定生物辨識的ID不同');
                return false;
            } else {
                // let cancelFastLogin = this.localStorageService.get('cancelFastLogin'); // 生物辨識錯五次自動解除生物辨識與圖形鎖
                // if (!!cancelFastLogin && cancelFastLogin == '1') {
                //     this.alert.show('生物辨識錯誤已達5次，請重新設定或改用密碼登入，系統已自動取消生物辨識快速登入').then(
                //         () => {
                //             // this.cancelPatternBioLogin();
                //             this.localStorageService.set('cancelFastLogin', '0'); // 要再錯五次快速登入，cancelFastLogin才會變成1
                //             return;
                //         }
                //     );
                //     return false;
                // }
                let userData = {
                    custId: this.fastData.fast_custId
                };
                this.loginService.requestBioService(userData).then(
                    (res) => {
                        this._logger.warn('requestBioService success', res);
                        this.loginRemember.userData.custId = this.custId;
                        this.saveRememberData();
                        this.loginService.doAfterLogin(res);
                    },
                    (error) => {
                        let check_code = this.formateService.checkField(error, 'app_error_code', {
                            to_string: true,
                            trim_flag: true
                        });
                
                        if (check_code != '10') { // 不是使用者取消才處理error
                            if (check_code == '3') { // 生物辨識有異動
                                this.deleteBio();
                            }
                            this.errorHandler.handleError(error);
                        }
                    }
                );
            }
        }

    }

    /**
     * 切換input 遮碼與明碼切換
     * @param type 類別
     */
    switchSee(type) {
        switch (type) {
            case 'seeuser':
                this.seeObj.seeuser = !this.seeObj.seeuser;
                this.userId_model = (this.seeObj.seeuser ? this.userId : this.userId_mask);
                break;
            case 'seepswd':
                this.seeObj.seepswd = !this.seeObj.seepswd;
                this.pswd_model = (this.seeObj.seepswd ? this.pswd : this.pswd_mask);
                break;
        }
    }

    /**
     * 記住我開關
     */
    remember() {
        if (this.loginRemember.rememberMe.remcust === '0') {
            this.loginRemember.rememberMe.remcust = '1';
        } else {
            this.loginRemember.rememberMe.remcust = '0';
        }
    }

    custIdChange(output) {
        this.custId = output.value;
    }

    userIdChange(output) {
        this.userId = output.value;
        this.userId_mask = output.value_mask;
        this.userId_model = (this.seeObj.seeuser ? this.userId : this.userId_mask);
    }

    pswdChange(output) {
        this.pswd = output.value;
        this.pswd_mask = output.value_mask;
        this.pswd_model = (this.seeObj.seepswd ? this.pswd : this.pswd_mask);
    }

    /**
     * 加密統一儲存
     */
    saveRememberData() {
        if (environment.NATIVE) {
            // 加密儲存到localStorage
            this.crypto.AES_Encrypt('lb_scsb', JSON.stringify(this.loginRemember.userData)).then(
                (res_Encode) => {
                    let copy = Object.assign({}, this.loginRemember);
                    copy.userData = res_Encode.value;
                    this.localStorageService.setObj('Remember', copy);
                },
                (error_Encode) => {
                    this._logger.error('error_Encode', error_Encode);
                }
            );
        } else {
            let copy = Object.assign({}, this.loginRemember);
            this.localStorageService.setObj('Remember', copy);
        }
    }

    /**
     * 返回home
     */
    private backToHome() {
        this.appCtrl.clearLoginPrePath(); // 清除登入前路徑資訊
        this.navgator.push('home');
    }

    /**
     * Step 1: 通訊檢核
     * 1.1 Client Network Check
     * 1.2 Server Allow Check (verifyServer)
     */
    private async checkNetwork(): Promise<any> {
        try {
            // check device network
            const check_client = await this.checkNetworkService.checkClient();
            const check_server = await this.checkNetworkService.checkServer()
                .catch((postError) => {
                    // 伺服器連線error 檢核停機狀態
                    return this.checkMaintain(postError);
                });
            // when client and server all resolve!!!
            return Promise.resolve();
        } catch (errorNetwork) {
            return Promise.reject(errorNetwork);
        }
    }

    /**
     * 停機公告檢核
     */
    private checkMaintain(err): Promise<any> {
        return this.checkMaintainService.checkIsMaintain('server', err).then(
            (checkIsMaintain_S) => {
                // is not maintain
                return this.errorHandler.returnError(checkIsMaintain_S, 'SERVER_MAINTAIN');
            },
            (checkIsMaintain_E) => {
                // is maintain
                return this.errorHandler.returnError(checkIsMaintain_E, 'SERVER_MAINTAIN');
            });
    }

    /**
     * 註銷生物辨識綁定，清除app快速綁定資訊，並通知中台解除綁定
     */
    private deleteBio() {
        // 清除本機裝置綁定資訊
        this.checkDeviceBind.clearLocalBindData();
        // 通知中台解除綁定
        this.checkDeviceBind.unBind();
    }

}
