/**
 * mScale plugin
 *  [plugin]: com-hitrust-plugin-mscale
 *  [version]: 1.0
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
// -- Other Library -- //
import { CordovaService } from '@conf/cordova/cordova.service';
// -- Reponse Options -- //
import { ErrorObjectOption } from '@systems/handle-error/error-object-option';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { FieldUtil } from '@util/formate/modify/field-util';

declare var MScaleClientSdk: any;

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class MscalePluginService extends CordovaService {
    private isInitFlag = false; // native new class
    private MSCALE_ID = ''; // mscale id
    private haveMscaleId = false; // 有無取得
    // Challenge Response Error
    private challengeErrorCodeList = {
        '0': '', // 成功
        '-1': 'MSCALE_CONNECT_ERROR', // 連線失敗
        '1001': 'MSCALE_UNKNOW_ERROR', // ERR_UNKNOWN 不明錯誤,未知的錯誤
        '1002': 'MSCALE_RES_FORMATE_ERROR', // ERR_JSON_TO_CONSTRUCT 回傳格式錯誤(JSON 解析錯誤)
        '1003': 'MSCALE_CONNECT_ERROR', // ERR_NETWORK 連線錯誤
        '1004': 'MSCALE_DOCHALLENGE_ERROR', // ERR_CHALLENGE_RESPONSE 伺服器解密錯誤
        '1005': 'MSCALE_PLUGIN_INIT_ERROR', // ERR_NOT_INITIALIZE 初始化錯誤
        '1006': 'MSCALE_PARAM_ERROR', // ERR_INVALID_ARGUMENT 參數錯誤
        '1007': 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR', // ERR_ENCRYPT 加密錯誤(client)
        '1008': 'CHALLENGE_RESPONSE_RES_DECODE_ERROR' // ERR_DECRYPT 解密錯誤(client)
    };
    // Encode/Decode Response Error
    private errorCodeList = {
        '0': '', // 成功
        '-1': 'MSCALE_GET_ID_ERROR', // 查無mscale id
        '-2': 'MSCALE_PARAM_ERROR', // 參數錯誤
        '-3': 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR', // 加密錯誤
        '-4': 'CHALLENGE_RESPONSE_RES_DECODE_ERROR', // 解密錯誤
        '1001': 'MSCALE_UNKNOW_ERROR', // ERR_UNKNOWN 不明錯誤
        '1002': 'MSCALE_RES_FORMATE_ERROR', // ERR_JSON_TO_CONSTRUCT 回傳格式錯誤(JSON 解析錯誤)
        '1003': 'MSCALE_CONNECT_ERROR', // ERR_NETWORK 連線錯誤(網路錯誤)
        '1004': 'MSCALE_DOCHALLENGE_ERROR', // ERR_CHALLENGE_RESPONSE 伺服器解密錯誤(Challenge-Response Server 回應 Response 錯誤)
        '1005': 'MSCALE_CR_SESSION_ERROR', // ERR_CR_GENERATE_SESSION_KEY Challenge-Response 產生 Session Key 失敗
        '1006': 'MSCALE_CR_CALCULATE_ERROR', // ERR_CR_CALCULATE_RESPONSE Challenge-Response 計算 Response 值錯誤
        '1007': 'MSCALE_CR_ANSWER_ERROR', // ERR_CR_WITHOUT_ANSWER Challenge-Response Server 沒有回應 Answer
        '1008': 'MSCALE_CR_DEANSWER_ERROR', // ERR_CR_DECRYPT Challenge-Response Server 回應的 Answer 解密失敗
        '1011': 'MSCALE_PLUGIN_INIT_ERROR', // ERR_NOT_INITIALIZE 初始化錯誤(尚未初始化)
        '1012': 'MSCALE_PARAM_ERROR', // ERR_INVALID_ARGUMENT 參數錯誤
        '1013': 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR', // ERR_ENCRYPT 加密錯誤(client)
        '1014': 'CHALLENGE_RESPONSE_RES_DECODE_ERROR' // ERR_DECRYPT 解密錯誤(client)
    };
    // mScale Response return code
    private mScaleErrorCodeList = {
        '0': '', // 成功
        'default': 'MSCALE_RES_ERROR_UNKNOW', // 不明錯誤
        '1': 'MSCALE_RES_ERROR_1',
        '10': 'MSCALE_RES_ERROR_10',
        '20': 'MSCALE_RES_ERROR_20',
        '21': 'MSCALE_RES_ERROR_21',
        '22': 'MSCALE_RES_ERROR_22'
    };

    constructor(
        private _logger: Logger
    ) {
        super();
    }


    /**
     * 取得mscale id
     */
    async getMscaleId(): Promise<any> {
        this._logger.step('Mscale', 'getMscaleId Start');
        if (!!this.MSCALE_ID && this.MSCALE_ID != '') {
            return Promise.resolve(this.MSCALE_ID);
        } else {
            let errorObj = this._setErrorObject.returnError({}, 'MSCALE_GET_ID_ERROR');
            this._logger.error('Mscale', 'getMscaleId Error', errorObj);
            return Promise.reject(errorObj);
        }
    }

    /**
     * 執行 challenge response
     * [NOTE] native會進行兩次連線請求
     * 每次呼叫都重取(不取記住的資料)
     */
    async challenge(): Promise<any> {
        this._logger.step('Mscale', 'challenge Start');
        try {
            if (!this.isInitFlag) {
                // 沒初始化要初始化
                let do_init = await this.doInitialize();
            }
            let resObj = await this.doChallengeResponse();
            this.MSCALE_ID = ObjectCheckUtil.checkObjectList(resObj, 'data');
            return Promise.resolve(resObj);
        } catch (errorChallenge) {
            let errorObj = this._setErrorObject.returnError(errorChallenge, 'MSCALE_CR_ERROR');
            this._logger.error('Mscale', 'challenge Error', errorObj);
            return Promise.reject(errorObj);
        }
    }

    /**
     * 加密字串
     * @param set_str 
     */
    async encrypt(set_str): Promise<any> {
        this._logger.step('Mscale', 'encrypt Start');
        let output: any = {};
        try {
            if (!this.isInitFlag) {
                // 沒初始化要初始化
                let do_init = await this.doInitialize();
            }
            let resStr = await this.doEncrypt(set_str);
            // 不為空
            output = {
                'communication': resStr
            };
            return Promise.resolve(output);
            // 站不檢核格式
            // if (typeof resStr == 'string' && ObjectCheckUtil.checkEmpty(resStr, true)) {
            // } else {
            //     // 格式錯誤
            //     let errorObj = this._setErrorObject.returnError({}, 'MSCALE_FORMATE_ERROR');
            //     this._logger.error('Mscale', 'challenge Error', errorObj);
            //     return Promise.reject(errorObj);
            // }
        } catch (errorChallenge) {
            let errorObj = this._setErrorObject.returnError(errorChallenge, 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR');
            this._logger.error('Mscale', 'challenge Error', errorObj);
            return Promise.reject(errorObj);
        }
    }


    /**
     * 解密字串
     * @param set_str 
     */
    async decrypt(set_str): Promise<any> {
        this._logger.step('Mscale', 'decrypt Start');
        let output: any;
        try {
            if (!this.isInitFlag) {
                // 沒初始化要初始化
                let do_init = await this.doInitialize();
            }
            let resObj = await this.doDecrypt(set_str);
            if (typeof resObj == 'object' && ObjectCheckUtil.checkEmpty(resObj, true)) {
                // 不為空
                output = resObj;
                return Promise.resolve(output);
            } else {
                // 格式錯誤
                let errorObj = this._setErrorObject.returnError({}, 'MSCALE_FORMATE_ERROR');
                this._logger.error('Mscale', 'challenge Error', errorObj);
                return Promise.reject(errorObj);
            }
        } catch (errorChallenge) {
            let errorObj = this._setErrorObject.returnError(errorChallenge, 'CHALLENGE_RESPONSE_RES_DECODE_ERROR');
            this._logger.error('Mscale', 'challenge Error', errorObj);
            return Promise.reject(errorObj);
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
     * 執行plugin initalize
     */
    private doInitialize(): Promise<any> {
        let output: any = {
            status: false,
            msg: '',
            error: {},
            data: ''
        };
        if (this.isInitFlag) {
            // 禁止重複執行
            output.status = true;
            return Promise.resolve(output);
        }
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                this._logger.step('Mscale', 'doInitialize success', res);
                output.status = true;
                this.isInitFlag = true;
                resolve(output);
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Mscale', 'doInitialize Error');
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'MSCALE_INIT_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let set_link = environment.SERVER_URL;
            set_link = set_link.replace(/^\/+|\/+$/gm, ''); // 去除頭尾/
            let check_method = false;
            if (typeof MScaleClientSdk == 'object' && typeof MScaleClientSdk.initialize === 'function') {
                check_method = true;
            }
            this._logger.step('Mscale', 'doInitialize check_method', check_method);
            if (environment.NATIVE) {
                if (check_method) {
                    MScaleClientSdk.initialize(successCallback, errorCallback, set_link);
                } else {
                    // miss
                    errorCallback({}, 'MSCALE_MISS_ERROR');
                }
            } else {
                // simulation(待測試)
                let tmp_data = null;
                successCallback(tmp_data);
                // errorCallback({});
            }
        }));
    }


    /**
     * 執行plugin challengeResponse
     */
    private doChallengeResponse(): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let output: any = {
                status: false,
                msg: '',
                error: {}
            };
            let saveFieldName = environment.AUTH_TOKEN_KEY;
            // let saveFieldName2 = environment.AUTHORIZATION_KEY; // 目前沒有(改放header)
            output[saveFieldName] = '';

            let successCallback = (res) => {
                let tmp_id = ObjectCheckUtil.checkObjectList(res, 'result');
                this._logger.step('Mscale', 'doChallengeResponse success', res, tmp_id);
                if (typeof tmp_id == 'string' && ObjectCheckUtil.checkEmpty(tmp_id, true)) {
                    // 不為空
                    output.status = true;
                    output[saveFieldName] = tmp_id;
                    resolve(output);
                } else {
                    // 格式錯誤
                    errorCallback({}, 'MSCALE_FORMATE_ERROR');
                }
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Mscale', 'doChallengeResponse Error');
                if (!!res) {
                    // challenge response error code
                    let plugin_code = FieldUtil.checkField(res, 'return_code', { to_string: true });
                    error_code = ObjectCheckUtil.checkObjectList(this.challengeErrorCodeList, plugin_code);
                }
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'MSCALE_CR_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof MScaleClientSdk == 'object' && typeof MScaleClientSdk.challengeResponse === 'function') {
                check_method = true;
            }
            this._logger.step('Mscale', 'doChallengeResponse check_method', check_method);
            if (environment.NATIVE) {
                if (check_method) {
                    MScaleClientSdk.challengeResponse(successCallback, errorCallback);
                } else {
                    // miss
                    errorCallback({}, 'MSCALE_MISS_ERROR');
                }
            } else {
                // simulation
                let tmp_data = { "result": "SESSION=abcd1234-1111-2222-aaaa-123456789012" };
                this._logger.step('Mscale', 'doChallengeResponse simula');
                // 連不到
                let tmp_error = { "return_code": -1 };
                // let tmp_error = { "return_code": -2 };
                // let tmp_error = { "return_code": -3 };
                // let tmp_error = { "return_code": -4 };

                setTimeout(() => {
                    successCallback(tmp_data);
                    // successCallback(tmp_error);
                    // errorCallback(tmp_error);
                }, 5000);
            }
        }));
    }


    /**
     * 執行plugin encrypt
     * @param set_str 
     */
    private doEncrypt(set_str): Promise<any> {
        let output = '';
        if (environment.NATIVE) {
            if (!set_str || typeof set_str != 'string') {
                let errorObj = this._setErrorObject.returnError({}, 'MSCALE_PARAM_ERROR');
                this._logger.error('Mscale', 'encrypt Error', errorObj, set_str);
                return Promise.reject(errorObj);
            }
        }
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                let plugin_code = FieldUtil.checkField(res, 'return_code', { to_string: true });
                let tmp_str = ObjectCheckUtil.checkObjectList(res, 'result');
                // 成功不會有return_code
                if (tmp_str != '' && plugin_code == '') {
                    output = tmp_str;
                    resolve(output);
                } else {
                    if (plugin_code != '0') {
                        errorCallback(res, 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR');
                    } else if (tmp_str == '') {
                        // 沒有加密資料
                        errorCallback(res, 'CHALLENGE_RESPONSE_REQ_ENCODE_EMPTY_ERROR');
                    } else {
                        // 其他錯誤
                        errorCallback(res, 'CHALLENGE_RESPONSE_REQ_ENCODE_OTHER_ERROR');
                    }
                }
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Mscale', 'encrypt Error doEncrypt', res);
                if (!!res) {
                    // challenge response error code
                    let plugin_code = FieldUtil.checkField(res, 'return_code', { to_string: true });
                    error_code = ObjectCheckUtil.checkObjectList(this.errorCodeList, plugin_code);
                }
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof MScaleClientSdk == 'object' && typeof MScaleClientSdk.encrypt === 'function') {
                check_method = true;
            }
            this._logger.step('Mscale', 'encrypt check_method', check_method);
            if (environment.NATIVE) {
                if (check_method) {
                    MScaleClientSdk.encrypt(successCallback, errorCallback, set_str);
                } else {
                    // miss
                    errorCallback({}, 'MSCALE_MISS_ERROR');
                }
            } else {
                // simulation
                let tmp_str = set_str;
                if (ObjectCheckUtil.checkIsJsonString(tmp_str)) {
                    // 讓模擬資料正常
                    tmp_str = JSON.parse(tmp_str);
                }
                let tmp_data = { "result": tmp_str };
                successCallback(tmp_data);
                // 連不
                let tmp_error = { "return_code": -1 };
                // errorCallback({});
            }

        }));
    }


    /**
     * 執行plugin decrypt
     * @param set_str 
     */
    private doDecrypt(set_str): Promise<any> {
        let output = '';
        if (!set_str || typeof set_str != 'object') {
            let errorObj = this._setErrorObject.returnError({}, 'MSCALE_PARAM_ERROR');
            this._logger.error('Mscale', 'decrypt Error', errorObj, set_str);
            return Promise.reject(errorObj);
        }
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                let plugin_code = FieldUtil.checkField(res, 'return_code', { to_string: true });
                let tmp_str = ObjectCheckUtil.checkObjectList(res, 'result');
                // 成功不會有return_code
                if (tmp_str != '' && plugin_code == '') {
                    output = tmp_str;
                    if (typeof tmp_str == 'string' && ObjectCheckUtil.checkIsJsonString(tmp_str)) {
                        output = JSON.parse(tmp_str);
                    } else {
                        output = tmp_str;
                    }
                    resolve(output);
                } else {
                    if (plugin_code != '0') {
                        errorCallback(res, 'CHALLENGE_RESPONSE_RES_DECODE_ERROR');
                    } else if (tmp_str == '') {
                        // 沒有解密資料
                        errorCallback(res, 'CHALLENGE_RESPONSE_REQ_DECODE_EMPTY_ERROR');
                    } else {
                        // 其他錯誤
                        errorCallback(res, 'CHALLENGE_RESPONSE_REQ_DECODE_OTHER_ERROR');
                    }
                }
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Mscale', 'decrypt Error');
                if (!!res) {
                    // challenge response error code
                    let plugin_code = FieldUtil.checkField(res, 'return_code', { to_string: true });
                    error_code = ObjectCheckUtil.checkObjectList(this.errorCodeList, plugin_code);
                }
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CHALLENGE_RESPONSE_RES_DECODE_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof MScaleClientSdk == 'object' && typeof MScaleClientSdk.decrypt === 'function') {
                check_method = true;
            }
            this._logger.step('Mscale', 'decrypt check_method', check_method);
            if (environment.NATIVE) {
                if (check_method) {
                    // 無論returnCode多少都會回傳
                    let mscaleCode = FieldUtil.checkField(set_str, 'return_code', { to_string: true });
                    this._logger.step('Mscale', 'mscale response code', mscaleCode);
                    if (mscaleCode != '' && mscaleCode != '0') {
                        let ms_error_code = ObjectCheckUtil.checkObjectList(this.mScaleErrorCodeList, mscaleCode);
                        if (!ms_error_code) {
                            ms_error_code = this.mScaleErrorCodeList['default'];
                        }
                        this._logger.error('Mscale', 'mscale response error', ms_error_code);
                        errorCallback({}, ms_error_code);
                        return false;
                    }
                    let decode_str = ObjectCheckUtil.checkObjectList(set_str, 'communication');
                    this._logger.step('Mscale', 'decrypt check_method', decode_str);
                    if (!decode_str) {
                        // response error
                        errorCallback({}, 'MSCALE_RES_ERROR');
                    } else {
                        MScaleClientSdk.decrypt(successCallback, errorCallback, decode_str);
                    }
                } else {
                    // miss
                    errorCallback({}, 'MSCALE_MISS_ERROR');
                }
            } else {
                // simulation
                let tmp_json = JSON.stringify(set_str);
                let tmp_data = { "result": tmp_json };
                successCallback(tmp_data);
                // 連不
                let tmp_error = { "return_code": -1 };
                // errorCallback({});
            }

        }));
    }


}
