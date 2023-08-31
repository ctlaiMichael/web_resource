/**
 * API Send: API的請求處理
 * 專門處理連線事項
 * api等畫面控制處理請在api-base.service.ts處理
 * 
 * [步驟]
 * 1. 通訊檢核
 * 1.1 Client Network Check
 * 1.2 Server Allow Check (verifyServer)
 * 
 * 2. Challange Response
 * 2.1 check is on Challange Response
 * 2.2 modify request object (with http header and data token modify)
 * (step 2 exception):
 * 2.E.1 do Challange Response (if not have, lock and do Challange Response!!)
 * 
 * 3. 傳送資料準備
 * 
 * 4. 資料傳送
 * 4.1 encode request
 * 4.2 post data (or simulation)
 * 4.3 decode response
 * 4.4 set response
 * (step 4 exception): 
 * 4.E.1. check is maintain time
 * 4.E.2. check post is not timeout!!!!!!!!!!!
 * 
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { environment } from 'environments/environment';
// -- angular lib -- //
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

// -- Request Options -- //
import { TelegramOption } from '@api/base/options/telegram-option';
import { ApiRequestOption } from './options/api-request-option';
// -- Reponse Options -- //
import { ApiResponseOption } from './options/api-response-option';
// -- connect Library -- //
import { CheckMaintainService } from '@lib/network/check-maintain.service';
import { CheckNetworkService } from '@lib/network/check-network.service';
import { ChallengeResponseService } from './challenge-response.service';
// import { HTTP_SERVER_STOP_LIST, HTTP_SERVER_TIMEOUT_LIST } from '@conf/http-status';
// -- Other Library -- //
import { FormateService } from '@template/formate/formate.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { SimulationService } from '@simulation/simulation.service';
import { LanguageChangeService } from '@systems/system/language/language-change.service';
import { DeviceService } from '@lib/device/device.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { ObjectCheckUtil } from '@util/check/object-check-util';

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class TelegramService {
    private resendAllowNum = 3; // 允許重送次數

    constructor(
        private _logger: Logger,
        private httpClient: HttpClient,
        private checkMaintainService: CheckMaintainService,
        private checkNetworkService: CheckNetworkService,
        private crService: ChallengeResponseService,
        protected errorHandler: HandleErrorService,
        private _formateService: FormateService,
        private _simulation: SimulationService,
        private auth: AuthService,
        // data
        private _language: LanguageChangeService,
        private _deviceInfo: DeviceService
    ) {

    }

    /**
     * 發送api (主要功能請求api)
     * @param serviceId 
     * @param data 
     * @param options 
     */
    async send(serviceId: string, data: ApiRequestOption, options: TelegramOption): Promise<any> {
        try {
            this._logger.step('TelegramBase', 'TelegramService start(id,req,option)', serviceId
                , this._formateService.transClone(data), this._formateService.transClone(options));
            // 暫存
            data.setTelegramObj({
                'serviceId': serviceId,
                'options': options
            });

            // [STEP 1] check network, 停機公告 => error will output to catch
            this._logger.step('TelegramBase', 'Step 1: do checkNetwork', serviceId);
            const check_network = await this.checkNetwork(serviceId);
            // [STEP 2] do chellenge response encode, 停機公告 => error will output to catch
            this._logger.step('TelegramBase', 'Step 2: do checkChallengeResponse', serviceId);
            const check_cr_allow = await this.checkChallengeResponse(data);
            // [STEP 3] post data modify
            this._logger.step('TelegramBase', 'Step 3: modify data', serviceId);
            const reqData = await this.modifyReqData(data);

            // [STEP 4] post data (encode > post > decode), 停機公告 => error will output to catch
            this._logger.step('TelegramBase', 'Step 4: do sendApi', serviceId);
            const resData = await this.sendApi(reqData);
            // [STEP 5] set response obje: when all step resolve
            this._logger.step('TelegramBase', 'TelegramService', 'Send End', this._formateService.transClone(resData));
            let resObj: ApiResponseOption = this.modifyResponse(resData, serviceId);
            let checkStatus = resObj.getStatus(); // resFlag為false時(業務錯誤)
            let checkSystemStatus = resObj.getSystemStatus(); // 系統是否錯誤
            let checkResUnknow = resObj.getUnknowFormate();
            if (checkResUnknow) {
                // 伺服器回傳不認識資料
                this._logger.step('Telegram', 'TelegramService', 'Error Unknow End');
                return this.errorHandler.returnError(resData, 'RSP_FORMATE_ERROR');
            } else if (!checkSystemStatus) {
                // 伺服器回傳系統錯誤
                let exceptionObj = resObj.getException();
                let error_list = [];
                let er_msg = this._formateService.checkField(exceptionObj, 'errorMsg');
                if (er_msg != '') {
                    error_list.push(er_msg);
                }
                let er_code = this._formateService.checkField(exceptionObj, 'errorCode');
                if (er_code != '') {
                    exceptionObj['resultCode'] = er_code;
                    // if (error_list.length > 0) {
                    //     error_list.push('(' + er_code + ')'); // 非中台的error顯示錯誤代碼(先不提供)
                    // }
                }

                if (error_list.length > 0) {
                    exceptionObj['content'] = error_list.join('');
                } else {
                    exceptionObj['content'] = 'ERROR.TELEGRAM_DEFAULT'; // 未預期
                }
                
                this._logger.step('Telegram', 'TelegramService', 'Error System End', this._formateService.transClone(exceptionObj));

                let checkCrAllow = await this.checkCrAllowUse(exceptionObj);

                let errorException = this.errorHandler.getHandleErrorOption(exceptionObj);
                return Promise.reject(errorException);
            } else {
                // 伺服器回傳系統正確 (業務錯誤請各功能自行判斷)
                return Promise.resolve(resObj);
            }
        } catch (exceptionObj) {
            this._logger.step('Telegram', 'TelegramService', 'Error Final End', this._formateService.transClone(exceptionObj));
            let returnType = this._formateService.checkField(exceptionObj, 'resultType');
            if (!!returnType && returnType != '' && returnType == 'cre2ee' && !options.isTransFlag) {
                // 無論如何，交易類禁止重複送!!!
                let allowSend = await this.crService.resetCrFlag();
                if (!!allowSend) {
                    // 重新執行Challenge Response and post
                    let resendNum = data.getResendNum();
                    if (resendNum < this.resendAllowNum) {
                        // 允許重送
                        return this.retryCrAndSend(serviceId, data, options);
                    }
                }
            }
            const errorException = this.errorHandler.getHandleErrorOption(exceptionObj);
            return Promise.reject(errorException);
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
     * Step 1: 通訊檢核
     * 1.1 Client Network Check
     * 1.2 Server Allow Check (verifyServer)
     */
    private async checkNetwork(serviceId: string): Promise<any> {
        // this._logger.step('TelegramBase', 'Step 1: checkNetwork start', serviceId);
        try {
            // check device network
            this._logger.step('TelegramBase', 'Step 1.1: check client', serviceId);
            const check_client = await this.checkNetworkService.checkClient();
            this._logger.step('TelegramBase', 'Step 1.2: check server', serviceId);
            const check_server = await this.checkNetworkService.checkServer()
                .catch((postError) => {
                    // 伺服器連線error 檢核停機狀態
                    this._logger.step('TelegramBase', 'Step 1.3: check server maintain', serviceId);
                    return this.checkMaintain(postError, serviceId);
                });
            // when client and server all resolve!!!
            this._logger.step('TelegramBase', 'Step 1: checkNetwork success', serviceId);
            return Promise.resolve();
        } catch (errorNetwork) {
            this._logger.step('TelegramBase', 'Step 1: checkNetwork error end', errorNetwork);
            return Promise.reject(errorNetwork);
        }
    }

    /**
     * Step 2: 傳送資料準備
     * 2.1 check is on Challange Response (if not have, lock and do Challange Response!!)
     * 2.2 modify request object (with http header and data token modify)
     * (step 2 exception):
     * 2.E.1 do Challange Response (if not have, lock and do Challange Response!!)
     */
    private async checkChallengeResponse(reqObj: ApiRequestOption): Promise<any> {
        let serviceId = reqObj.getServiceId();
        this._logger.step('TelegramBase', 'Step 2: checkChallengeResponse start', serviceId);
        if (!environment.CHALLENGE_RESPONSE_FLAG) {
            this._logger.step('TelegramBase', 'Step 2: checkChallengeResponse success(close)', serviceId);
            return Promise.resolve();
        }
        try {
            // check device network
            this._logger.step('TelegramBase', 'Step 2.1: check handshake', serviceId);
            const allow_check = await this.crService.checkAllow(serviceId)
                .catch((postError) => {
                    // 伺服器連線error 檢核停機狀態
                    this._logger.step('TelegramBase', 'Step 2.2: check server maintain', serviceId);
                    return this.checkMaintain(postError, serviceId);
                });
            // if (!allow_check) {

            // }
            // when all resolve!!!
            this._logger.step('TelegramBase', 'Step 2: checkChallengeResponse success', serviceId);
            return Promise.resolve();
        } catch (errorCR) {
            this._logger.step('TelegramBase', 'Step 2: checkChallengeResponse error end', errorCR);
            return Promise.reject(errorCR);
        }
    }


    /**
     * Step 3: 請求資料
     * 3.1 encode request
     * 3.2 post data (or simulation)
     * 3.3 decode response
     * 3.4 set response
     * 
     * (step 3 exception): 
     * 3.E.1. check is maintain time
     * 3.E.2. check post is not timeout!!!!!!!!!!!
     * @param serviceId 
     * @param reqObj 
     */
    private async modifyReqData(reqObj: ApiRequestOption): Promise<any> {
        try {
            let serviceId = reqObj.getServiceId();
            this._logger.step('TelegramBase', 'Step 3: modifyReqData start', serviceId);
            // const old_req = this._formateService.transClone(reqObj.getRequest());
            // this._logger.step('TelegramBase', 'Step 3: old req=>', old_req);
            let set_obj = {
                "requestId": "",
                "requestTime": "",
                "accessToken": "",
                "userId": "",
                "userName": "",
                "role": "",
                "userIp": "",
                "channel": "",
                "lang": "",
                "deviceId": "",
                "deviceOs": "",
                "deviceOsVer": "",
                "appMainVer": "",
                "appSubVer": ""
            };
            // 使用者資訊
            const auth_info = await this.getReqAuth();
            set_obj.accessToken = auth_info.accessToken;
            set_obj.userId = auth_info.userId;
            set_obj.userName = auth_info.userName;
            set_obj.role = auth_info.role;
            // 裝置&app資訊
            const device_info = await this.getReqDevice();
            set_obj.deviceId = device_info.deviceId;
            set_obj.deviceOs = device_info.deviceOs;
            set_obj.deviceOsVer = device_info.deviceOsVer;
            set_obj.appMainVer = device_info.appMainVer;
            set_obj.appSubVer = device_info.appSubVer;
            // 其他資訊
            set_obj.channel = 'MB'; // 固定（通路）
            // 自語系設定檔取得
            const lang_data = this._language.getNowLanguage();
            set_obj.lang = this._formateService.checkObjectList(lang_data, 'data.apiLang');
            // ip adress
            const ip_adree = await this.getReqUserIp();
            set_obj.userIp = ip_adree;
            // request unick number
            set_obj.requestId = this.getReqNumber(set_obj);
            // request time: yyyy-mm-dd HH:ii:ss
            set_obj.requestTime = this._formateService.transDate('NOW_TIME');

            // 安控part
            let security_obj = reqObj.getSetOption('security');
            let haveDoSecurity = reqObj.getSetOption('haveDoneSecurity');
            let other_option = { 'haveDoSecurity': haveDoSecurity };

            reqObj.modifyReqBody(set_obj, security_obj, other_option); // 設定進入req obj
            // this._logger.step('TelegramBase', 'Step 3: modify req=>', this._formateService.transClone(reqObj.getRequest()));
            return Promise.resolve(reqObj);
        } catch (errorInData) {
            this._logger.step('TelegramBase', 'Step 3: modifyReqData error end', errorInData);
            // return Promise.reject(errorInData);
            return this.errorHandler.returnError(errorInData, 'REQUEST_TOKEN_SET_ERROR');
        }
    }

    /**
     * Step 4: 請求資料
     * 4.1 encode request
     * 4.2 post data (or simulation)
     * 4.3 decode response
     * 4.4 set response
     * 
     * (step 3 exception): 
     * 4.E.1. check is maintain time
     * 4.E.2. check post is not timeout!!!!!!!!!!!
     * @param serviceId 
     * @param reqObj 
     */
    private async sendApi(reqObj: ApiRequestOption): Promise<any> {
        try {
            let serviceId = reqObj.getServiceId();
            this._logger.step('TelegramBase', 'Step 4: sendApi start', serviceId);
            const set_req = reqObj.getRequest();
            this._logger.step('Telegram', 'Step 4.1: Req Data=>', set_req);
            const encodeReq = await this.crService.encodeReq(set_req, reqObj);
            this._logger.step('Telegram', 'Step 4.2: Post Data=>', encodeReq);
            const postRes = await this.post(encodeReq, reqObj)
                .catch((postError) => {
                    // 伺服器連線error 檢核停機狀態
                    this._logger.step('TelegramBase', 'Step 4.2: check server maintain', serviceId);
                    this.crService.removeCrBooking(reqObj);
                    return this.checkMaintain(postError, serviceId);
                });
            this._logger.step('Telegram', 'Step 4.3: Res Data Decode=>', postRes);
            const decodeRes = await this.crService.decodeRes(postRes, reqObj);

            return Promise.resolve(decodeRes);
        } catch (errorInSend) {
            this._logger.step('TelegramBase', 'Step 4: sendApi error end', errorInSend);
            return this.errorHandler.returnError(errorInSend, 'API_SEND_ERROR');
        }
    }

    /**
     * Step 4.2 傳送資料
     * @param reqObj 
     */
    private async post(encodeReq, reqObj: ApiRequestOption): Promise<any> {
        try {
            let serviceId = reqObj.getServiceId();
            this._logger.step('TelegramBase', 'Step 4.2: post start', serviceId);
            let reqOptions = this.getReqConnectOption();

            const domain_url = environment.SERVER_URL;
            const api_url = environment.API_URL;
            let set_url = [domain_url, api_url];
            if (!environment.CHALLENGE_RESPONSE_FLAG) {
                // gayway沒有的暫時性處理
                set_url.push(serviceId.toLocaleUpperCase());
            }

            let reqUrl = this._formateService.mappingUrl(set_url);
            this._logger.step('TelegramBase', 'Step 4.2: post url', reqUrl, reqOptions);

            let timeout_data = environment.HTTP_TIMEOUT;
            // [TODO] timeout必須審視！！！！！
            if (environment.ONLINE) {
                return this.httpClient.post(
                    reqUrl,
                    encodeReq,
                    reqOptions
                ).pipe(timeout(timeout_data)).toPromise();
                // [TODO] 
                // 處理http status
                // HTTP_SERVER_STOP_LIST
            } else {
                return this.simulation(reqObj);
            }
        } catch (errorInPost) {
            this._logger.step('TelegramBase', 'Step 4.2: post error end', errorInPost);
            return this.errorHandler.returnError(errorInPost, 'API_POST_ERROR');
        }
    }

    /**
     * 停機公告檢核
     */
    private checkMaintain(err, serviceId): Promise<any> {
        this._logger.step('Telegram', 'checkMaintain', serviceId, this._formateService.transClone(err));
        return this.checkMaintainService.checkIsMaintain('server', err).then(
            (checkIsMaintain_S) => {
                // is not maintain
                this._logger.step('Telegram', 'Not Maintain', checkIsMaintain_S);
                // this._logger.log('Not Maintain', this._formateService.transClone(checkIsMaintain_S));
                return this.errorHandler.returnError(checkIsMaintain_S, 'SERVER_MAINTAIN');
            },
            (checkIsMaintain_E) => {
                // is maintain
                this._logger.step('Telegram', 'Is Maintain', checkIsMaintain_E);
                // this._logger.log('Is Maintain', this._formateService.transClone(checkIsMaintain_E));
                return this.errorHandler.returnError(checkIsMaintain_E, 'SERVER_MAINTAIN');
            });
    }

    /**
     * 產生request唯一序號
     * [TODO]
     */
    private getReqNumber(set_obj: object): string {
        let output = '';

        const s4 = () => {
            // len: 4
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        // random str len: 16
        output = s4() + s4() + s4() + s4();
        const now_time = new Date().getTime().toString();
        output += now_time; // len: 13
        // all len: 
        // this._logger.log(output.length);
        return output;
    }

    /**
     * 取得ip位置
     * [TODO]
     */
    private getReqUserIp(): Promise<string> {
        this._logger.step('TelegramBase', 'Step 3: get Ip adress');
        if (environment.ONLINE) {
            // [TODO] 不可對外連線取得，待中台確認是否要此欄位
            // cordova-plugin-networkinterface
            // cordova-plugin-android-wifi-manager
            // 每次載入還是變相載入
            return Promise.resolve('');
        } else {
            // [Development]:
            return Promise.resolve('127.0.0.1');
        }
    }

    /**
     * 取得裝置資訊
     * [TODO]
     */
    private async getReqDevice(): Promise<any> {
        this._logger.step('TelegramBase', 'Step 3: get device');
        let output: any = {
            "deviceId": "",
            "deviceOs": "",
            "deviceOsVer": "",
            "appMainVer": "",
            "appSubVer": ""
        };

        // 去 deviceService 取東西([TODO])
        try {
            let device_obj = this._deviceInfo.getDevicesInfo();
            if (!device_obj || !ObjectCheckUtil.checkEmpty(device_obj, true)) {
                device_obj = await this._deviceInfo.devicesInfo();
            }

            output.deviceId = device_obj.uuid; // 自device取得
            output.deviceOs = device_obj.platformLower; // 自device取得
            output.deviceOsVer = device_obj.osVersion; // 自device取得
            output.appMainVer = device_obj.appinfo.version; // 自device取得
            output.appSubVer = device_obj.appinfo.subVersion; // 自device取得
            return Promise.resolve(output);
        } catch (errorDevice) {
            return this.errorHandler.returnError(errorDevice, 'DEVICE_GET_ERROR');
        }

    }

    /**
     * 取得auth資料
     * [TODO]
     */
    private getReqAuth(): Promise<any> {
        this._logger.step('TelegramBase', 'Step 3: get auth');
        let output = {
            "accessToken": "",
            "userId": "",
            "userName": "",
            "role": ""
        };
        output.accessToken = this.auth.getAccessToken(); // 自auth取得
        output.userId = this.auth.getCustId(); // 自auth取得
        output.userName = this.auth.getUserName(); // 自auth取得
        output.role = this.auth.getRole(); // 自auth取得
        return Promise.resolve(output);
    }

    /**
     * 取得HTTP Request Header object
     */
    private getReqConnectOption() {
        let header_data = new HttpHeaders();
        header_data = header_data.set('Content-type', 'application/json; charset=UTF-8');
        const ch_header_data = this.crService.getToken();
        let tmp_index: any;
        for (tmp_index in ch_header_data) {
            if (!ch_header_data.hasOwnProperty(tmp_index) || !ch_header_data[tmp_index]) {
                continue;
            }
            // this._logger.step('TelegramBase', 'set header', tmp_index, ch_header_data[tmp_index]);
            header_data = header_data.set(tmp_index, ch_header_data[tmp_index]);
        }
        this._logger.step('TelegramBase', 'Header', header_data);
        let output = {
            headers: header_data
        };
        return output;
    }


    /**
     * 回傳物件資料格式整理
     * @param jsonObj Server回傳內容
     */
    private modifyResponse(jsonObj: object, serviceId: string): ApiResponseOption {
        let resObj = new ApiResponseOption(jsonObj, serviceId);
        return resObj;
    }

    /**
     * 判斷CR是否需要重做
     * 
     * @return 
     *      true: 要重執行CR E2EE
     *      false: 不用做
     */
    private checkCrAllowUse(resMsg): Promise<any> {
        let gateway_error = this._formateService.checkObjectList(resMsg, 'specialDoEvent');
        let need_return = '';
        if (!!gateway_error) {
            let error_type = this._formateService.checkField(gateway_error, 'type');
            if (error_type == 'GATEWAY_ERROR') {
                let error_msg = this._formateService.checkField(gateway_error, 'error');
                need_return = error_msg;
            }
        }
        if (!!need_return && need_return != '') {
            let error_msg = this._formateService.checkObjectList(resMsg, 'msg');
            let errorOption = this.errorHandler.getErrorObj({
                content: error_msg
            }, need_return);
            errorOption.resultType = 'gateway';
            if (need_return == 'NEED_CR_RETRY') {
                errorOption.resultType = 'cre2ee';
            }
            return Promise.reject(errorOption);
        } else {
            return Promise.resolve(false);
        }
    }

    /**
     * 重新執行CR E2EE並且送出交易
     * 不用裡是否還有資料再等候更新，因為失敗都會等待換CR重跑
     */
    private retryCrAndSend(serviceId: string, data: ApiRequestOption, options: TelegramOption): Promise<any> {
        this._logger.step('Telegram', 'TelegramService', 'API Resend', serviceId);
        data.setResend();
        return this.send(serviceId, data, options);
    }

    /**
     * 模擬程式載入
     * @param reqObj 
     */
    private simulation(reqObj: ApiRequestOption): Promise<any> {
        let serviceId = reqObj.getServiceId();
        return this._simulation.getResponse(serviceId, reqObj);
    }
}
