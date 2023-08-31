/**
 * API連線 基本class
 */
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
// -- Options -- //
import { TelegramOption } from './options/telegram-option';
import { ApiRequestOption } from './options/api-request-option';
import { ApiResponseOption } from './options/api-response-option';
import { HandleErrorOptions } from '@systems/handle-error/handlerror-options';
import { ERROR_CODE_LIST } from '@conf/error/error_code';
import { CACHE_TRANS_GROUP } from '@conf/cache_set';
// -- Service -- //
import { TelegramService } from './telegram.service';
import { AppCtrlService } from '@systems/system/app-ctrl/app-ctrl.service';
// -- Other Library -- //
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { LoadingService } from '@pages/layout/loading/loading.service';
import { DeviceService } from '@lib/device/device.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';

@Injectable()
export class ApiBaseService {
    protected serviceId: string; // API Name: optimization 模式的className會被改變
    private errorCodeList: object;
    protected isTransFlag = false;

    /**
     * 建構
     */
    constructor(
        protected _logger: Logger,
        protected telegram: TelegramService,
        protected errorHandler: HandleErrorService,
        // protected auth: AuthService,
        protected appCtrl: AppCtrlService,
        protected loading: LoadingService,
        protected _formateService: FormateService,
        protected _checkService: CheckService,
        protected _cacheService: CacheService,
        protected device: DeviceService,
        protected localStorageService: LocalStorageService
    ) {
        // 設定API名稱
        this.setApiName();
    }

    /**
     * 傳送資料
     * @param set_data 
     * @param option 
     */
    protected async send(set_data: ApiRequestOption, set_option?: object): Promise<any> {
        this._logger.step('Telegram', 'ApiBase', 'Send Start', set_data, set_option, this.isTransFlag);
        let option = new TelegramOption();
        option = { ...option, ...set_option };
        if (this.isTransFlag) {
            option.isTransFlag = true;
        }

        // loading 
        this.ctrlLoading(true, option.background);
        // 載入cache
        let cache_index = '';
        if (!!option.useCache) {
            let set_req = set_data.getRequest();
            let cache_index_list = [this.serviceId, JSON.stringify(set_data.getData()), JSON.stringify(set_data.getPaginator())];
            cache_index = cache_index_list.join(':');
            const cache_data = this._cacheService.load(cache_index);
            if (!!cache_data) {
                return Promise.resolve(cache_data);
            }
        }
        this.appCtrl.maintainConnectTimer(); // 維持local連線
        if (this.isTransFlag) {
            // 交易API無論是否送出成功都要清除cache!!!
            this.removeCache();
        }

        try {
            let returnDataDecryptRes: ApiResponseOption = await this.telegram.send(this.serviceId, set_data, option);
            
            this._logger.step('Telegram', 'ApiBase', 'Send End Res', this._formateService.transClone(returnDataDecryptRes));
            this.ctrlLoading(false, option.background);
            // 強制登出檢核
            let resMsg = returnDataDecryptRes.getResMsg();
            const checkLoginAllow = await this.checkLoginStatus(resMsg);
            const checkSecurityAllow = await this.checkSecurityStatus(resMsg);

            // 儲存cache
            if (!!option.useCache) {
                let res_data = returnDataDecryptRes.getAllData();
                let cacheOption = this._formateService.checkObjectList(option, 'cacheOption');
                this._cacheService.save(cache_index, res_data, cacheOption);
            }
            return Promise.resolve(returnDataDecryptRes);

        } catch (errorObj) {
            // this._logger.step('Telegram', 'ApiBase', 'Send End Error start', this._formateService.transClone(errorObj));
            this.ctrlLoading(false, option.background);
            let errorOption: HandleErrorOptions;
            if (errorObj instanceof HandleErrorOptions) {
                errorOption = errorObj;
            } else {
                errorOption = this.errorHandler.getErrorObj(errorObj);
            }
            // 強制登出檢核
            const checkLoginAllow = await this.checkLoginStatus(errorOption);
            const checkSecurityAllow = await this.checkSecurityStatus(errorOption);

            if (errorOption.resultType == '') {
                errorOption.resultType = 'server';
            }
            this._logger.step('Telegram', 'ApiBase', 'Send End Error', this._formateService.transClone(errorOption));
            return Promise.reject(errorOption);

        }
    }

    /**
     * 回傳錯誤事件
     * @param set_data 
     */
    protected returnError(set_data: object, errorCode?: string): Promise<HandleErrorOptions> {
        return this.errorHandler.returnError(set_data, errorCode);
    }

    /**
     * 交易類api異常特殊處理 (各api reject使用)
     * @param errorObj 
     */
    protected returnTransError(errorObj: HandleErrorOptions) {
        let errorCode = this._formateService.checkField(errorObj, 'errorCode');
        let errorMsg = this._formateService.checkField(errorObj, 'errorMsg');
        let temp = '';
        if (errorCode != '') {
            temp = '(' + errorCode + ')';
        }
        if (errorMsg != '') {
            temp = temp + errorMsg;
        }
        errorObj = {...errorObj, ...{
            'status': false,
            'title_trans': 'ERROR.API.WARNING_PARAMS',
            'classType': 'warning', // success, error, warning
            'msg': temp
            // statusObj: {
            //     status: false,
            //     responseTime: '',
            //     title: '',
            //     msg: '',
            //     classType: 'warning', // success, error, warning
            //     errorCode: '',
            //     errorMsg: '',
            //     error_list: []
            // }
        }};

        return errorObj;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 不能透過className設定API的serviceId名稱！
     * optimization 模式的className會被改變
     */
    private setApiName(): void {
        if (!this.serviceId) {
            this._logger.error('Telegram', 'ApiBase setApiName', 'ignor serviceId!!', this.serviceId);
            this.serviceId = '';
        }
        const output = this.serviceId.toLocaleUpperCase();
        this.serviceId = output;
        this._logger.step('Telegram', 'ApiBase setApiName', output, this.serviceId);
    }

    /**
     * 控制loading頁面
     * @param open true 開啟, false 關閉
     * @param background true:背景發送, false:啟動loading
     */
    private ctrlLoading(open: boolean, background?: boolean) {
        this._logger.step('TelegramBase', 'ctrlLoading', open, this.serviceId, background);
        if (!!background) {
            // 背景模式不處理
            return false;
        }
        if (open) {
            this.loading.show(this.serviceId);
        } else {
            this.loading.hide(this.serviceId);
        }

    }

    /**
     * 刪除指定類別的cache，確保存款餘額資料有更新
     */
    private removeCache() {
        let group_list = CACHE_TRANS_GROUP;
        if (!!group_list && (group_list instanceof Array)) {
            group_list.forEach((cache_name) => {
                this._cacheService.removeGroup(cache_name);
            });
        }
    }

    /**
     * 檢核是否要強制登出
     * 檢核失敗 強制停止後續所有promise
     * @param returnDataDecryptRes 
     */
    private checkLoginStatus(resMsg): Promise<any> {
        // 強制登出檢核
        let security_error = this._formateService.checkObjectList(resMsg, 'specialDoEvent');
        let need_logout = '';
        if (!!security_error) {
            let error_type = this._formateService.checkField(security_error, 'type');
            if (error_type == 'NEED_LOGOUT') {
                let error_msg = this._formateService.checkField(security_error, 'error');
                need_logout = error_msg;
            }
        }
        if (!!need_logout && need_logout != '') {
            this.appCtrl.logout(true); // 強制登出
            let error_msg = this._formateService.checkObjectList(resMsg, 'msg');
            let errorOption = this.errorHandler.getErrorObj({
                type: 'dialog',
                content: error_msg,
                button: 'BTN.CHECK'
            }, need_logout);
            // 強制中斷後續所有promise
            return this.errorHandler.handleErrorAndStopPromise(errorOption);
        } else {
            return Promise.resolve(true);
        }
    }

    /**
     * 檢核是否為安控驗證失敗
     * 檢核失敗 強制停止後續所有promise
     * @param returnDataDecryptRes 
     */
    private checkSecurityStatus(resMsg): Promise<any> {
        // 安控檢核
        let security_error = this._formateService.checkObjectList(resMsg, 'specialDoEvent');
        let need_return = '';
        if (!!security_error) {
            let error_type = this._formateService.checkField(security_error, 'type');
            if (error_type == 'NEED_SECURITY_REINPUT') {
                let error_msg = this._formateService.checkField(security_error, 'error');
                need_return = error_msg;
            }
        }
        // this._logger.step('Telegram', 'ApiBase', 'Security Check is ', need_return);
        if (!!need_return && need_return != '') {
            let error_msg = this._formateService.checkObjectList(resMsg, 'msg');
            let errorOption = this.errorHandler.getErrorObj({
                content: error_msg
            }, need_return);
            errorOption.resultType = 'security';
            this._logger.step('Telegram', 'ApiBase', 'Security Check Error', errorOption);
            return Promise.reject(errorOption);
        } else {
            return Promise.resolve(true);
        }
    }


}
