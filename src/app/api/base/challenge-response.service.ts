/**
 * Challenge Response 訊息傳輸處理
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { environment } from 'environments/environment';

// -- Config -- //
import { SESSION_STORAGE_NAME_LIST } from '@conf/security/storage-name';
// -- Options -- //
// -- storage Library -- //
import { SessionStorageService } from '@lib/storage/session-storage.service';
// -- Other Library -- //
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { MscalePluginService } from '@lib/security/mscale/mscale-plugin.service';
import { AppCtrlService } from '@systems/system/app-ctrl/app-ctrl.service';
import { ApiRequestOption } from '@api/base/options/api-request-option';

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class ChallengeResponseService {
    private isNeedHandshake: boolean;  // 判斷是否需要handshake
    private isDoingHandshake: boolean;  // 判斷是否已在執行handshake
    private _crName = SESSION_STORAGE_NAME_LIST.CHALLENGE;
    private doingCrList = {}; // 正在使用CR的請求
    // 依照各種設定檔，定義CR要使用的資料
    private _crTokenNameList = {
        send_auth1: environment.AUTH_TOKEN_KEY
        , save_auth1: SESSION_STORAGE_NAME_LIST.CHALLENGE_AUTH_1
        , send_auth2: environment.AUTHORIZATION_KEY
        , save_auth2: SESSION_STORAGE_NAME_LIST.CHALLENGE_AUTH_2
    };
    // private reqUrl: string;
    // private retry: number;

    constructor(
        private _logger: Logger,
        private errorHandler: HandleErrorService,
        private _formateService: FormateService,
        private sessionStorage: SessionStorageService,
        private mscaleService: MscalePluginService,
        private appCtrl: AppCtrlService
    ) {
        this._init();
        this.appCtrl.changeCrStart.subscribe((value: any) => {
            // 已經做challenge response
            this.isNeedHandshake = false;
            this._logger.step('Mscale', 'challenge response start timer');
        });
        this.appCtrl.changeCrStop.subscribe((value: any) => {
            this._logger.step('Mscale', 'challenge response reset');
            // 強制重作challenge response
            this.resetCrFlag();
            // this.reset(); // 不要強制清空，怕發生做一半的
        });
    }

    /**
     * 重新設定CR E2EE
     */
    async resetCrFlag(): Promise<any> {
        if (!environment.CHALLENGE_RESPONSE_FLAG) {
            this._logger.step('TelegramBase', 'Challenge Response close');
            return Promise.resolve(true);
        }
        try {
            const need_do_flag = await this.waitAllApiBack();
            if (!need_do_flag) {
                this._logger.step('TelegramBase', 'Challenge Response reset was finish');
                return Promise.resolve(false);
            } else {
                // repeat to do challenge response
                this._logger.step('Telegram', 'Challenge Response reset do start');
                this.isNeedHandshake = true;
                return Promise.resolve(true);
            }
        } catch (errorInResetCR) {
            this._logger.step('TelegramBase', 'Challenge Response reset error');
            return Promise.resolve(false);
        }
    }

    /**
     * 刪除CR Booking的紀錄
     */
    removeCrBooking(reqObj: ApiRequestOption) {
        if (!environment.CHALLENGE_RESPONSE_FLAG) {
            this._logger.step('TelegramBase', 'CR E2EE request close');
            return false;
        }
        let tmpRequestId = reqObj.getRequestId();
        if (typeof this.doingCrList[tmpRequestId] != 'undefined') {
            delete this.doingCrList[tmpRequestId];
        }
    }


    /**
     * 檢核challenge response是否正常
     * 若沒有做 會完成challenge response
     * @param serviceId api編號
     */
    async checkAllow(serviceId: string): Promise<any> {
        if (!environment.CHALLENGE_RESPONSE_FLAG) {
            this._logger.step('TelegramBase', 'Challenge Response close', serviceId);
            return Promise.resolve(true);
        }
        try {
            const need_do_flag = await this.waitHandshake(serviceId);
            if (!need_do_flag) {
                this._logger.step('TelegramBase', 'Challenge Response was finish', serviceId);
                return Promise.resolve(true);
            } else {
                // repeat to do challenge response
                this._logger.step('Telegram', 'Challenge Response do start', serviceId);
                const crData = await this.doChallenge(serviceId);
                this._logger.step('Mscale', 'Challenge Response finish', serviceId, crData);
                return Promise.resolve(true);
            }
        } catch (errorInCheckCR) {
            this._logger.step('TelegramBase', 'Challenge Response error', serviceId);
            return this.errorHandler.returnError(errorInCheckCR, 'CHALLENGE_RESPONSE_ERROR');
        }

    }

    /**
     * encode request
     * @param set_data 
     */
    async encodeReq(set_data: object, reqObj: ApiRequestOption): Promise<any> {
        let output: any = set_data;
        if (!environment.CHALLENGE_RESPONSE_FLAG) {
            this._logger.step('TelegramBase', 'CR E2EE request close');
            return Promise.resolve(output);
        }
        try {
            this._logger.step('TelegramBase', 'CR E2EE request', output);
            let tmpRequestId = reqObj.getRequestId();
            let tmpServiceId = reqObj.getServiceId();
            this.doingCrList[tmpRequestId] = tmpServiceId;
            let encode_str = JSON.stringify(output);
            let output_str = await this.mscaleService.encrypt(encode_str);
            if (!output_str || (typeof output_str != 'string' && typeof output_str != 'object')) {
                this._logger.error('TelegramBase', 'CR E2EE formate error', output_str, typeof output_str );
                return this.errorHandler.returnError({}, 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR');
            }
            output = output_str;
            return Promise.resolve(output);
        } catch (errorInCheckCR) {
            this._logger.step('TelegramBase', 'CR E2EE request error');
            return this.errorHandler.returnError(errorInCheckCR, 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR');
        }
    }

    /**
     * decode response
     * @param set_data 
     */
    async decodeRes(set_data, reqObj: ApiRequestOption): Promise<any> {
        let output: any = set_data;
        if (!environment.CHALLENGE_RESPONSE_FLAG) {
            this._logger.step('TelegramBase', 'CR E2EE response close');
            return Promise.resolve(output);
        }
        try {
            this._logger.step('TelegramBase', 'CR E2EE response', output);
            this.removeCrBooking(reqObj);
            // check gateway error
            let checkIsGateWayError = await this.checkGatewayErrorRes(output);
            if (checkIsGateWayError.status) {
                return Promise.resolve(output);
            }
            this._logger.error('TelegramBase', 'CR E2EE check gateway', checkIsGateWayError);
            let needResend = await this.checkNeedReTryCR(reqObj);
            if (needResend != false) {
                return this.errorHandler.returnError(needResend);
            }
            let output_obj = await this.mscaleService.decrypt(set_data);
            if (!output_obj) {
                this._logger.error('TelegramBase', 'CR E2EE formate error', output_obj);
                return this.errorHandler.returnError({}, 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR');
            }
            output = output_obj;
            return Promise.resolve(output);
        } catch (errorInCheckCR) {
            this._logger.step('TelegramBase', 'CR E2EE response error');
            let needResend = await this.checkNeedReTryCR(reqObj);
            if (needResend != false) {
                return this.errorHandler.returnError(needResend);
            } else {
                return this.errorHandler.returnError(errorInCheckCR, 'CHALLENGE_RESPONSE_RES_DECODE_ERROR');
            }
        }
    }

    /**
     * 取得challenge response token data
     * (set request header data)
     */
    getToken() {
        let cr_data = this.sessionStorage.getObj(this._crName);
        let output: any = {};
        let auth1 = this._formateService.checkObjectList(cr_data, this._crTokenNameList.save_auth1);
        if (!!auth1) {
            output[this._crTokenNameList.send_auth1] = auth1;
        }
        let auth2 = this._formateService.checkObjectList(cr_data, this._crTokenNameList.save_auth2);
        if (!!auth2) {
            output[this._crTokenNameList.send_auth2] = 'Bear ' + auth2;
        }
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
     * 啟動事件
     */
    private _init() {
        this.isDoingHandshake = false;
        this.isNeedHandshake = (!this.checkAuthData()); // true表示必須重做
        // this.reqUrl = '';
        // this.retry = 0;
    }


    /**
     * 設定需要重新handshake
     */
    private reset() {
        this.isNeedHandshake = true;
        this.isDoingHandshake = false;
        this.sessionStorage.remove(this._crName);
        // this.handshakeTelegram.reset();
    }

    /**
     * 設定challenge response server back token
     * @param data 
     */
    private setToken(data: any) {
        let output: any = {};
        // 這次只有一個
        output[this._crTokenNameList.save_auth1] = this._formateService.checkObjectList(data, this._crTokenNameList.send_auth1);
        // output[this._crTokenNameList.save_auth2] = this._formateService.checkObjectList(data, this._crTokenNameList.send_auth2);
        this.sessionStorage.setObj(this._crName, output);
        this.appCtrl.changeToCrStart(); // challenge response timer start
    }

    /**
     * 檢核challenge response data狀態
     * @returns 是否有設定 true 有設定, false 無設定
     */
    private checkAuthData(): boolean {
        let output = false;
        if (!environment.CHALLENGE_RESPONSE_FLAG) {
            // 關閉就不用做了
            output = true;
            return output;
        }
        const crData = this.sessionStorage.getObj(this._crName);
        const auth1 = this._formateService.checkObjectList(crData, this._crTokenNameList.save_auth1);
        if (auth1) {
            output = true;
        }
        // const auth2 = this._formateService.checkObjectList(crData, this._crTokenNameList.save_auth2);
        // if (auth1 && auth2) {
        //     output = true;
        // }
        return output;
    }

    /**
     * Challenge Response 獨佔處理
     * （禁止同時發送）
     * @param serviceId
     * @returns boolean: true 需要做cr, false 不用做
     */
    private waitHandshake(serviceId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let need_handshake = this.isNeedHandshake;
            let check_allow = this.appCtrl.checkCrTimerAllow(0);
            if (!this.checkAuthData()) {
                // 沒有cr data也是強制重作
                need_handshake = true;
            }
            if (!check_allow) {
                // 強制執行
                need_handshake = true;
            }

            if (!need_handshake) {
                this._logger.step('TelegramBase', 'waitHandshake not need do', need_handshake);
                resolve(false);
            } else if (need_handshake && !this.isDoingHandshake) {
                this._logger.step('TelegramBase', 'waitHandshake start lock', serviceId);
                // this.isDoingHandshake = true;
                resolve(true);
            } else {
                this._logger.step('TelegramBase', 'waitHandshake start wait', serviceId);
                let listem_times = 0;
                let listenEvent = setInterval(() => {
                    listem_times++;
                    if (!this.isNeedHandshake && !this.isDoingHandshake) {
                        this._logger.step('TelegramBase', 'waitHandshake end wait', serviceId);
                        clearInterval(listenEvent);
                        resolve(false);
                    } else if (this.isNeedHandshake && !this.isDoingHandshake) {
                        this._logger.step('TelegramBase', 'waitHandshake start stop', serviceId);
                        clearInterval(listenEvent);
                        resolve(true);
                    } else {
                        this._logger.step('TelegramBase', 'waitHandshake still wait', serviceId, listem_times);
                    }
                }, 1000);
            }
        });
    }

    /**
     * 等待全部API回來
     */
    private waitAllApiBack(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._logger.step('TelegramBase', 'waitAllApiBack start wait');
            let listem_times = 0;
            let listenEvent = setInterval(() => {
                listem_times++;
                let list = Object.keys(this.doingCrList);
                if (list.length <= 0) {
                    if (this.isNeedHandshake) {
                        // 已經再做了
                        this._logger.step('TelegramBase', 'waitAllApiBack start stop');
                        clearInterval(listenEvent);
                        resolve(false);
                    } else {
                        this._logger.step('TelegramBase', 'waitAllApiBack end wait');
                        clearInterval(listenEvent);
                        resolve(true);
                    }
                } else {
                    this._logger.step('TelegramBase', 'waitAllApiBack still wait', listem_times);
                }
            }, 1000);
        });
    }

    /**
     * 執行 challenge response
     * 儲存控制
     * @param serviceId 
     */
    private async doChallenge(serviceId: string): Promise<any> {
        try {
            this.isDoingHandshake = true; // lock
            const crData = await this.sendChallenge(serviceId);
            this.isDoingHandshake = false; // unlock
            this.setToken(crData); // save auth data
            return Promise.resolve(crData);
        } catch (errorChallenge) {
            this.isDoingHandshake = false;
            return Promise.reject(errorChallenge);
        }
    }

    /**
     * 請求進行 challenge response
     * @param serviceId 
     */
    private async sendChallenge(serviceId: string): Promise<any> {
        try {
            this._logger.step('TelegramBase', 'Do Challenge Response Start', serviceId);
            let set_data: any = await this.mscaleService.challenge();
            return Promise.resolve(set_data);
        } catch (errorSendChallenge) {
            this._logger.step('TelegramBase', 'Challenge Response error', serviceId);
            return this.errorHandler.returnError(errorSendChallenge, 'CHALLENGE_RESPONSE_CHANGE_ERROR');
        }
    }

    /**
     * 判斷是否需要retry CR
     */
    private checkNeedReTryCR(set_data): Promise<any> {
        let tmpServiceId = '';
        if (typeof set_data.getServiceId == 'function') {
            tmpServiceId = set_data.getServiceId();
        }
        if (!this.isNeedHandshake) {
            return Promise.resolve(false);
        } else {
            // 涉及CR已經變更，需要強制重作
            this._logger.step('TelegramBase', 'Challenge Response is Change', tmpServiceId);
            let errorOption = this.errorHandler.getErrorObj({}, 'NEED_CR_CHANGE_TO_RESEND');
            errorOption.resultType = 'cre2ee';
            return Promise.resolve(errorOption);
        }

    }

    /**
     * 檢查Gateway是否回傳錯誤代碼
     */
    private checkGatewayErrorRes(setData): Promise<any> {
        let output: any = {
            status: false,
            error: {}
        };
        if (!environment.CHALLENGE_RESPONSE_FLAG) {
            // 關閉就不用做了
            return Promise.resolve(output);
        }
        if (typeof setData != 'object') {
            return Promise.resolve(output);
        }
        let have_code = this._formateService.checkField(setData, 'return_code');
        // this._logger.step('TelegramBase', 'checkGatewayErrorRes return_code', have_code);
        if (have_code != '') {
            output.status = true;
        }
        return Promise.resolve(output);
    }

}