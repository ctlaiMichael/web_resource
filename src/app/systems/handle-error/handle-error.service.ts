/**
 * 錯誤控制處理
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- Options -- //
import { ERRORCODE_LIST_LOGOUT, ERRORCODE_LIST_APPVERSION } from '@conf/security/special-error-code-list';
import { HandleErrorOptions } from './handlerror-options';
import { ErrorObjectOption } from './error-object-option';
// -- Stroage -- //
// -- Service -- //
import { FormateService } from '@template/formate/formate.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { TranslateService } from '@ngx-translate/core';
import { CheckService } from '@template/check/check.service';
import { environment } from '@environments/environment';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
// import { StartAppService } from '@lib/plugins/start-app/start-app.service';

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class HandleErrorService {
    protected _setErrorObject = new ErrorObjectOption(); // 設定error obj

    private defaultOptions: HandleErrorOptions;
    private logoutErrorList = ERRORCODE_LIST_LOGOUT;
    private versionErrorList = ERRORCODE_LIST_APPVERSION.VERSION_UPDATE;
    constructor(
        private _logger: Logger,
        private layoutCtrl: LayoutCtrlService,
        private navgator: NavgatorService,
        private translate: TranslateService,
        private alert: AlertService,
        private confirm: ConfirmService,
        private _formateService: FormateService,
        private _checkService: CheckService
        // private startApp: StartAppService
    ) {
        this.defaultOptions = new HandleErrorOptions();
    }

    /**
     * 異常處理
     * 執行錯誤處理，alert、msg、confrim，有畫面控制的
     * 適用component、service
     * @param set_error 處理的error
     *          title dialog的default title
     *          content dialog的default content
     *          event 執行dialog的回傳evnet
     *          event_reset 是否強制取代dialog event (預設不取代)
     */
    async handleError(error: HandleErrorOptions = {}, errorCode?: string): Promise<any> {
        if (!!error['ERROR'] && !!error['sendInfo']) {
            // from select-security.component response
            error = error['ERROR'];
        }
        // this.defaultOptions = new HandleErrorOptions();
        // let option = { ...this.defaultOptions, ...error };
        let option = this._setErrorObject.returnError(error, errorCode);
        if (!error.content && !!error['msg']) {
            option.content = error['msg'];
        }

        try {
            // 版本檢核: 依照伺服器回應的特殊處理
            const check_version_allow = await this.checkAllowVersion(option);
            if (!check_version_allow) {
                this._logger.error('HandleError', 'check version not allow', option);
                return Promise.reject(option);
            }
            // 登入檢核: 依照伺服器回應的特殊處理
            const check_login_allow = await this.checkNeedLogout(option);
            if (!check_login_allow) {
                this._logger.error('HandleError', 'check need to logout', option);
                return Promise.reject(option);
            }

            // error code顯示處理
            if (environment.APP_ERROR_COSE_SHOW) {
                option = await this.modifyErrorMsg(option);
            }

            switch (option.type) {
                // (推頁) 倒轉特別頁
                case 'message':
                    return this.showAlertError(option);
                    // return this.showMessagePageError(option);
                // 重新導向指定頁面
                case 'redirect':
                    return this.showRedirectError(option);
                case 'confirm':
                    return this.showConfirmError(option);
                case 'alert':
                case 'dialog':
                default:
                    // == dialog == //
                    return this.showAlertError(option);
            }
        } catch (errorInTheEnd) {
            this._logger.error('HandleError', 'check error in end', option, errorInTheEnd);
        }

    }

    /**
     * 執行handleError，並且強制中斷後續所有promise
     * @param error 
     * @param errorCode 
     */
    handleErrorAndStopPromise(error: HandleErrorOptions = {}, errorCode?: string): Promise<any> {
        this.handleError(error, errorCode);
        
        return new Promise((resolve, reject) => {
            this._logger.log('STOP Promise of handleError');
        });
    }

    /**
     * 回傳錯誤事件(Promise reject)
     * 回傳錯誤的object，無畫面處理
     * 適用service
     * @param set_data 
     */
    returnError(set_data: object, errorCode?: string): Promise<HandleErrorOptions> {
        let output = this._setErrorObject.returnError(set_data, errorCode);
        this._logger.error('Telegram', 'Api Error', output, set_data);
        return Promise.reject(output);
    }

    /**
     * 取得錯誤物件
     * @param set_data 
     * @param errorCode 
     */
    getErrorObj(set_data: object, errorCode?: string): HandleErrorOptions {
        return this._setErrorObject.returnError(set_data, errorCode);
    }

    /**
     * 取得HandleErrorOptions物件
     * @param errorObj 
     */
    getHandleErrorOption(errorObj?: any): HandleErrorOptions {
        let output = new HandleErrorOptions(errorObj);
        return output;
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * show error in popup alert
     * @param option 
     */
    private showAlertError(option: HandleErrorOptions): Promise<any> {
        return new Promise((resolve) => {
            return this.alert.show(option.content, option);
        });
    }

    /**
     * show error in popup confirm
     * @param option 
     */
    private showConfirmError(option: HandleErrorOptions): Promise<any> {
        return this.confirm.show(option.content, option);
    }

    /**
     * show error in full page
     * @param option 
     */
    private showMessagePageError(option: HandleErrorOptions): Promise<any> {
        return new Promise((resolve) => {
            this.navgator.push('result', option); // message頁面 目前尚未設定
            resolve();
        });
    }

    /**
     * 轉址模式
     * @param option 
     */
    private showRedirectError(option: HandleErrorOptions): Promise<any> {
        return new Promise((resolve) => {
            // 預設回上一頁
            const redirect_back_type = (option.hasOwnProperty('backType')) ? option['backType'] : '1';
            const redirect_obj = {
                title: option.title,
                content: option.content,
                backType: redirect_back_type.trim()
            };
            switch (redirect_obj.backType) {
                case '0':
                    this.navgator.push('home');
                    break;
                case '1':
                case '':
                    this.navgator.pop();
                    break;
                default:
                    this.navgator.push(redirect_obj.backType);
                    break;
            }
            resolve();
        });
    }


    /**
     * 檢查是否版本正確 [TODO]
     * @param option 
     * @returns boolean: true allow, false is error 
     */
    private checkAllowVersion(option: HandleErrorOptions): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.versionErrorList.indexOf(option.resultCode) > -1) {
                this._logger.error('HandleError', 'check need to update', option);
                this.alert.show(option.content, { title: 'POPUP.NOTICE.TITLE', btnTitle: 'POPUP.NOTICE.UPDATE_BTN' })
                    .then(() => {
                        // this.startApp.startApp('scsb')
                        reject(false);
                    });
            } else {
                // allow to use
                resolve(true);
            }
        });
    }

    /**
     * 檢查是否要登出 [TODO]
     * @param option 
     * @returns boolean: true allow, false is error 
     */
    private checkNeedLogout(option: HandleErrorOptions): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.logoutErrorList.indexOf(option.resultCode) > -1) {
                this._logger.error('HandleError', 'check need to logout', option);
                // this.layoutCtrl.authError(); // [TODO] 要確認登出流程
                this.alert.show(option.content, option).then(() => {
                    this.layoutCtrl.authError();
                    reject(false);
                });
            } else {
                // allow to use
                resolve(true);
            }
        });
    }

    /**
     * 錯誤訊息處理
     * @param option 
     */
    private modifyErrorMsg(option: HandleErrorOptions): Promise<any> {
        return new Promise((resolve) => {
            if (!this._checkService.checkEmpty(option.app_error_code, true)
                || option.app_error_code_hide == true
            ) {
                // 不處理錯誤訊息code顯示
                resolve(option);
            } else {
                this.translate.get(option.content).subscribe((val) => {
                    let msg_list = [val];
                    msg_list.push('(' + option.app_error_code + ')');
                    option.content = msg_list.join(' ');
                    resolve(option);
                });
            }
        });
    }


}
