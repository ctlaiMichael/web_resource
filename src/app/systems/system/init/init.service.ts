/**
 * 啟動流程
 * 1.  取得UDID
 * 2.  檢查網路->無網路提示->關閉APP
 * 3.  檢查版本: 啟動才檢查(api)
 * 3.1 store 強制、柔性 => 檢查->app更新提示(Native)->前往Store->閉閉APP
 * 3.2 同步資料 強制、柔性 => DirectUpdate檢查->更新->RedirectToUpdate
 * 4.  JB/Root檢查
 * 5.  首次啟用檢查
 * 5.1 Android 防毒提示
 * 5.2 上銀APP使用權限說明 => 引導去同意條款功能page (強制) 影響後續流程導頁
 * 6.  提醒(整合4,5)
 * 7.  檢查scheme: 影響後續流程導頁
 * 8.  導頁
 * 
 * [非同步流程]
 * A. 發電文取得系統參數
 * B. 發電文取得裝置綁定資訊
 * C. push註冊
 * D. 重要公告
 */
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Logger } from '@systems/system/logger/logger.service';

// -- Storage -- //
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { SessionStorageService } from '@lib/storage/session-storage.service';
import { SystemParameterService } from '@systems/system/system-parameter/system-parameter.service';
import { AuthService } from '@systems/system/auth/auth.service';

// -- Error Ctrl -- //
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { HandleErrorOptions } from '@systems/handle-error/handlerror-options';

// -- Other Library -- //
import { TranslateService } from '@ngx-translate/core'; // i18n
import { CryptoService } from '@lib/crypto/crypto.service';
// step 1 library
import { DeviceService } from '@lib/device/device.service';
// step 2 library
import { CheckNetworkService } from '@lib/network/check-network.service';
// step 3: library
import { CheckVersionService } from './check-version.service';
import { FormateService } from '@template/formate/formate.service';
// step 4: library
import { TrustedDeviceService } from '@lib/security/trusted-device/trusted-device.service';
// step B: library
import { CheckDeviceBindService } from './check-device-bind.service';
import { UrlSchemeHandlerService } from './url-scheme-handler.service';
import { DeviceListService } from '@pages/setting/shared/service/device-list.service';
import { BiometricInterfaceService } from '@lib/biometric/biometric-interface.service';

// import { StartAppService } from '@lib/plugins/start-app/start-app.service';
// import { ExitAppService } from '@lib/plugins/exit-app.service';
// import { PushService } from '@lib/plugins/push.service';

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class InitService {
    // appMode = {isA11y: false};
    // isa11y = false;
    // logintopage = 'a11yhomekey';
    // doAlert: any;
    // doConfirm: any;

    uuid: string;

    constructor(
        // -- Error Ctrl -- //
        private _logger: Logger,
        private errorHandler: HandleErrorService,
        private confirm: ConfirmService,
        private alert: AlertService,
        // -- Storage -- //
        private systemParameter: SystemParameterService,
        private localStorage: LocalStorageService,
        private session: SessionStorageService,
        // -- Other Library -- //
        private translate: TranslateService,
        private auth: AuthService,
        protected _formateService: FormateService,
        private deviceListService: DeviceListService,
        private bioService: BiometricInterfaceService,
        // -- init Library -- //
        private device: DeviceService,
        private urlSchemeHandler: UrlSchemeHandlerService,
        private checkNetworkService: CheckNetworkService,
        // private exitApp: ExitAppService,
        private trustedDevice: TrustedDeviceService,
        // private startApp: StartAppService,
        // private push: PushService,
        private checkVersionService: CheckVersionService,
        private checkDeviceBind: CheckDeviceBindService,
        private crypto: CryptoService
    ) {
        // // 20200601 無障礙非約
        // let appMode = this.localStorage.getObj('appMode');
        // if (appMode) {
        //   this.appMode = appMode;
        // }

        // this.isa11y = this.appMode.isA11y;
        // if (this.isa11y) {
        //   this.doAlert = this.a11yAlert;
        //   this.doConfirm = this.a11yConfirm;
        // }else{
        //   this.doAlert = this.alert;
        //   this.doConfirm = this.confirm;
        // }
    }

    async init(): Promise<any> {
        // 裝置資訊初始化
        this._logger.step('Init', 'Step 0.: initPhoneData');
        this.initPhoneData().catch((err) => {
            let error = new HandleErrorOptions('ERROR.INIT_ERROR');
            error.resultCode = err.error;
            error.resultData = err;
            this.errorHandler.handleError(error);
        });
        // 控制大小寫
        this.device.getUsePreferredTextZoom();
        // 啟動流程
        try {
            // 1.取得UDID
            this._logger.step('Init', 'Step 1.: get UDID');
            this.uuid = await this.getUUID();
            // this._logger.error("UUID", checkUDID);
            // 修正裝置問題
            this.modifyPlatformError(); 

            // 2.檢查網路
            this._logger.step('Init', 'Step 2.: check Network');
            const checkNetwork = await this.checkNetwork();

            // 3.檢查版本
            this._logger.step('Init', 'Step 3.: check Version');
            const versionData = await this.checkVersionService.checkVersion();

            // 3.1檢查->app更新提示(Native)->前往Store->閉閉APP
            this._logger.step('Init', 'Step 3.1: check Store Update');
            // const checkStoreUpdate = await this.checkVersionService.remindUpdate(versionData);

            // 3.2.DirectUpdate檢查->更新->RedirectToUpdate
            this._logger.step('Init', 'Step 3.2: check Direct Update');
            // const checkDirectUpdate = await this.checkVersionService.checkDirectUpdate(versionData);

            // 4.JB/Root檢查
            this._logger.step('Init', 'Step 4.: check JB/Root');
            const showAlertMsg = await this.checkTrustDevice();

            // 5.首次啟用檢查->上銀APP使用權限說明->防毒提示
            this._logger.step('Init', 'Step 5.: check FirstStart');
            const showAntivirus = await this.checkFirstStart();

            // 6.顯示整合提醒(整合4,5)
            this._logger.step('Init', 'Step 6.: show Alert');
            await this.showAlert(showAlertMsg, showAntivirus);

            // A.發電文取得系統參數
            this._logger.step('Init', 'Step A.: get SystemParameter');
            this.getSystemParameter();
            // const systemParameter = await this.getSystemParameter();
            // this.saveSystemParameter(systemParameter);

            // B.發電文取得裝置綁定資訊
            this._logger.step('Init', 'Step B.: get DeviceBindInfo');
            this.getDeviceBindInfo();

            // C.push註冊
            this._logger.step('Init', 'Step C.: push init');
            this.pushInit();

            // D.重要公告
            this._logger.step('Init', 'Step D.: get Announce');
            this.getAnnounce();
            // const announceData = await this.getAnnounce();
            // await this.showAnnounce(announceData);

            // 7.檢查scheme->導頁
            this._logger.step('Init', 'Step 7.: check Scheme');
            this.checkScheme();

            return Promise.resolve();
        } catch (exceptionObj) {
            this._logger.step('Init', 'Error Final End', exceptionObj);
            this.errorHandler.handleError(exceptionObj);
            return Promise.reject(exceptionObj);
        }
    }

    /**
     * 關閉APP 一起動的畫面
     * (該區塊的id必須為initPageBox)
     * 其他css樣式在page_ctrl.css
     */
    hidenInitPateBox() {
        let body_list = document.body.classList;
        document.body.classList.add('initial_page');
        let startBox = document.getElementById('initPageBox');
        if (!!startBox) {
            startBox.classList.add('hiddenBox'); // 先隱藏
            setTimeout(() => {
                startBox.classList.add('removeBox'); // 再關閉
            }, 2000);
        }
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 修正platform Error
     */
    private modifyPlatformError() {

        if (this.device.checkPlatform('ios')) {
            this._logger.step('Init', 'Step 1.2: modify platform ios');
            // ios在13.3.X會出現鍵盤消失畫面跑位問題
            document.addEventListener("focusout", () => {
                document.body.style.top = "1px";
                setTimeout(() => {
                    document.body.style.top = "0px";
                }, 50);
            });
        }
    }

    /**
     * 取得UUID
     * 1.1 getUUID
     */
    private async getUUID(): Promise<any> {
        try {
            this._logger.step('Init', 'Step 1.1: getUUID start');
            const uuid = await this.device.initUuid();
            this._logger.step('Init', 'Step 1: getUUID success');
            return Promise.resolve(uuid);
        } catch (err) {
            this._logger.step('Init', 'Step 1: getUUID error end', err);
            return Promise.reject(err);
        }
    }

    /**
     * 檢查網路狀態
     * 2.1 Client Network Check
     */
    private async checkNetwork(): Promise<any> {
        try {
            // check device network
            this._logger.step('Init', 'Step 2.1: check client');
            const check_client = await this.checkNetworkService.checkClient();
            this._logger.step('Init', 'Step 2: checkNetwork success');
            return Promise.resolve(true);
        } catch (errorNetwork) {
            this._logger.step('Init', 'Step 2: checkNetwork error end', errorNetwork);
            return Promise.reject(errorNetwork);
        }
    }

    /**
     * JB/Root檢查
     */
    private async checkTrustDevice(): Promise<any> {
        let alertText = '';
        // 提示(JB/Root)
        // JB訊息檢查到破解會顯示
        return this.trustedDevice.detection()
            .then((trusted) => {
                if (trusted === false) {
                    this.auth.setDeviceTrust('N');
                    alertText = 'ERROR.TRUSTED_DEVICE.INIT';
                    this.translate.get(alertText).subscribe((val) => {
                        alertText = val;
                    });
                } else {
                    this.auth.setDeviceTrust('Y');
                }
                return Promise.resolve(alertText);
            })
            .catch((err) => {
                this.auth.setDeviceTrust('Y'); // 報錯視同無JB/Root
                // const error = new HandleErrorOptions('JB/Root檢查失敗', 'ERROR.TITLE');
                alertText = 'JB/Root檢查失敗';
                return Promise.resolve(alertText);
            });
    }

    /**
     * 首次啟用檢查->Android防毒提示
     */
    private async checkFirstStart(): Promise<any> {
        if (this.localStorage.get('first_use') === null) {
            let alertText = '';
            // iOS不顯示防毒軟體的提示;
            if (this.device.checkPlatform('android')) {
                alertText = 'ERROR.TRUSTED_DEVICE.ANTIVIRUS';
                this.translate.get(alertText).subscribe((val) => {
                    alertText = val;
                });
            }
            this.localStorage.set('first_use', 'used');
            return Promise.resolve(alertText);
        }
        return Promise.resolve('');
    }

    /**
     * 顯示整合提示(防毒+JB/Root)
     */
    private async showAlert(showAlertMsg, showAntivirus): Promise<any> {
        if (!showAlertMsg && !showAntivirus) {
            return Promise.resolve();
        }

        let content = '';
        if (!!showAlertMsg && !!showAntivirus) {
            content = showAntivirus + '\n' + showAlertMsg;
        } else {
            content = showAntivirus + showAlertMsg;
        }

        return this.alert.show(content).then(() => {
            return Promise.resolve();
        });
    }

    private checkScheme() {
        // logger.debug('checkScheme');
        this.session.set('init', 'Y');
        // check if app was opened by custom url scheme
        const lastUrl: string = (window as any).handleOpenURL_LastURL || ''; // 測試此行mark
        if (lastUrl && lastUrl !== '') {
            delete (window as any).handleOpenURL_LastURL;
            this.urlSchemeHandler.executeScheme(lastUrl);
        } else {
            const url = window.sessionStorage.getItem('UrlScheme');
            if (url) {
                this.urlSchemeHandler.executeScheme(url);
                delete sessionStorage['UrlScheme'];
            }
        }
    }

    /**
     * 發電文取得系統參數
     */
    private getSystemParameter(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.systemParameter.getData()
                .then(resObj => {
                    resolve();
                })
                .catch(err => {
                    resolve();
                });
        });
    }


    /**
     * 發電文取得裝置綁定資訊
     */
    private getDeviceBindInfo(): Promise<any> {
        let output = {
            uuid: ''
        };
        output.uuid = this.device.getDevicesInfo('uuid');
        return this.checkDeviceBind.checkBind(output, { background: true }).then(
            (res) => {
                let bindStatus = res.fastData.bindStatus;
                if (bindStatus != '1') { // 中台回未綁定
                    let fastData = this.localStorage.getObj('fastData');
                    // 裝置綁定已被解除提示
                    if (!!fastData || fastData != null) { // 本機有裝置綁定資訊
                        this.alert.show('SETTING.FAST_SETTING.MSG.DEVICE_UNBIND');
                    }
                    // 清除本機裝置綁定資訊
                    this.checkDeviceBind.clearLocalBindData();

                    // 註銷原有生物辨識
                    this.bioService.disableBioService().then(
                        (disableRes) => {
                        },
                        (disableErr) => {
                        }
                    );
                } else if (bindStatus == '1') { // 中台回綁定
                    // 取用 快速登入資訊Storage
                    const tempFtData = this.localStorage.getObj('fastData');
                    if (tempFtData == null) { // 本機沒有裝置綁定資訊
                        // 註銷原有生物辨識,並發解除綁定電文請中台解除綁定
                        this.checkDeviceBind.unBind();
                        // // 註銷原有生物辨識
                        // this.bioService.disableBioService().then(
                        //     (disableRes) => {
                        //     },
                        //     (disableErr) => {
                        //     }
                        // );

                        // let outputData = {
                        //     uuid: this.uuid,
                        //     type: '2'
                        // };
                        // // 發解除綁定電文請中台解除綁定
                        // this.deviceListService.deleteData(outputData, { background: true }).then(
                        //     (resObj) => {
                                
                        //     },
                        //     (errObj) => {
                                
                        //     }
                        // );
                    } else {
                        this.bioService.queryBioService().then(
                            (resObj) => {
                                if (resObj.bio_status === 9) {
                                    // 重啟生物辨識
                                    this.bioService.enableBioService().then(
                                        (result) => {
                                            
                                        },
                                        (err) => {
                                            
                                        }
                                    );
                                }
                            },
                            (errObj) => {
                                
                            }
                        );
                    }
                }

                if (!environment.NATIVE) {
                    if (bindStatus == '1') {
                        this.checkDeviceBind.saveLocalBindData(res.fastData);
                    }
                }
                return Promise.resolve();
            },
            (err) => {
                // to-do
                this._logger.error('getDeviceBindInfo', err);
                return Promise.resolve();
            }
        );

    }

    /**
     * push init
     */
    private pushInit() {
        // logger.debug('pushInit');
        return new Promise((resolve, reject) => {
            //   this.push.init()
            //     .then(res => {
            //       logger.log('push init res:' + JSON.stringify(res));
            //       resolve();
            //     })
            //     .catch(err => {
            //       logger.log('push init err:' + JSON.stringify(err));
            //       resolve();
            //     });
            resolve();
        });
    }

    /**
     * 重要公告: 目前沒有
     */
    private async getAnnounce() {
        try {
            let res = {};
            return Promise.resolve();
        } catch (errorAnnounce) {
            this._logger.error('getDeviceBindInfo', errorAnnounce);
            return Promise.resolve();
        }
    }

    /**
     * 裝置資訊初始化
     */
    private initPhoneData(): Promise<any> {
        if (environment.NATIVE) {
            return this.device.deviceGetInfo().then((devicesInfo) => {
                return this.crypto.InitPhoneData(devicesInfo).then(
                    (res) => {
                        this._logger.step('Init', 'Step 0.: initPhoneData Success');
                    }
                ).catch((err) => {
                    this._logger.step('Init', 'Step 0.: initPhoneData Fail');
                    return Promise.reject(err);
                });
            });
        } else {
            return Promise.resolve();
        }
        
    }


    // /**
    //  * only 測試環境使用
    //  */
    // private trustUnsecureCerts(): Promise<any> {
    //   logger.debug('trustUnsecureCerts');
    //   // return this.trustcerts.trustUnsecureCerts()
    //   //   .then(() => {
    //   //     return Promise.resolve();
    //   //   })
    //   //   .catch(() => {
    //   //     return Promise.resolve();
    //   //   });
    //   return Promise.resolve();
    // }

}
