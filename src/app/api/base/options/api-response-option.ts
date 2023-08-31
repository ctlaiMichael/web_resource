/**
 * 定義APP使用的response物件
 * 將Server的API整理成APP使用的固定格式
 */
import { environment } from '@environments/environment';
import { logger } from '@util/log-util';
import { API_RESPONSE_FORMATE, API_RESPONSE_EXCEPTION } from './api-formate';
import { API_LOGIN_ERRORCODE, API_SECURITY_ERRORCODE, API_ERROR_TYPE_LIST, API_GATEWAY_ERRORCODE } from './api-errorcode';
// --- util --- //
import { ObjectUtil } from '@util/formate/modify/object-util';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { FieldUtil } from '@util/formate/modify/field-util';

export class ApiResponseOption {
    /**
     * API Response 伺服器規格
     */
    private resBody = ObjectUtil.clone(API_RESPONSE_FORMATE);
    /**
     * API Response 伺服器規格
     */
    private resRealBody; // 伺服器時寄回傳物件
    /**
     * appId
     */
    private serviceId: string;
    /**
     * api response 非正常格式
     * true 表示非正常格式
     */
    private unknowResponse: boolean;
    /**
     * api response system status (系統)
     * true 表示業務功能正常(業務狀態詳見resStatus)
     */
    private systemSatus: boolean;
    /**
     * api response status (業務)
     * true表示業務功能狀態
     */
    private resStatus: boolean;
    /**
     * API Res Token Info 固定內容
     */
    private infoData: object;
    /**
     * API Msg Data 資訊或錯誤內容
     */
    private resMsg: object;
    /**
     * API Exception 主要內容 (當systemSatus=true才有資料)
     */
    private resException: object;
    /**
     * API Exception 發生異常的系統 (當systemSatus=true才有資料)
     */
    private resExceptionSystem: string; // 發生異常的系統
    /**
     * API Main Data 主要內容
     */
    private resContent: object;
    /**
     * paginatorObj 分頁物件
     */
    private paginatorObj: object;

    constructor(
        // response obj
        protected apiResJsonObj: object,
        // 來源request的serviceId
        protected reqServiceId: string
    ) {
        this.setResData(apiResJsonObj);
    }

    /**
     * 取得server儲存物件
     */
    public getAllData() {
        return ObjectUtil.clone(this.resBody);
    }

    /**
     * 取得 response api id
     */
    public getServiceId() {
        return this.serviceId;
    }

    /**
     * 取得結果訊息
     */
    public getResMsg() {
        return this.resMsg;
    }

    /**
     * 取得主要資訊
     */
    public getInfoData() {
        return this.infoData;
    }

    /**
     * 取得內容
     */
    public getData() {
        return this.resContent;
    }

    /**
     * 取得回應時間
     */
    public getResponseTime() {
        let output = FieldUtil.checkField(this.infoData, 'responseTime');
        return output;
    }

    /**
     * 取得request id
     */
    public getRequestId() {
        let output = FieldUtil.checkField(this.infoData, 'requestId');
        return output;
    }

    /**
     * 取得系統語系
     */
    public getLanguage() {
        let output = FieldUtil.checkField(this.infoData, 'lang');
        return output;
    }

    /**
     * 檢查api system結果
     */
    public getSystemStatus(): boolean {
        return (this.systemSatus) ? true : false;
    }

    /**
     * 檢查api結果
     */
    public getStatus(): boolean {
        return (this.resStatus) ? true : false;
    }

    /**
     * 回傳server提供的錯誤訊息
     */
    public getErrorMsg(): string {
        let output = FieldUtil.checkField(this.resMsg, 'msg');
        return output;
    }

    /**
     * 回傳server提供的錯誤物件
     */
    public getException() {
        let output: any = this.resException;
        output['specialDoEvent'] = ObjectCheckUtil.checkObjectList(this.resMsg, 'specialDoEvent');
        return output;
    }

    /**
     * 檢查是否為response格式錯誤
     * true表示為系統錯誤且為格式不明
     */
    public getUnknowFormate() {
        // 若為系統錯誤，檢核是否為格式不明
        if (!this.getSystemStatus()) {
            return (this.unknowResponse) ? true : false;
        } else {
            // 系統狀態正常
            return false;
        }
    }


    /**
     *  分頁資料整理
     * @param set_data
     */
    public getPagecounter() {
        let totalPages;
        let output_data = {
            pageSize: 0,
            totalPages: 1
        };
        let set_data = this.paginatorObj;
        // logger.error('paginatorObj', this.paginatorObj);
        if (ObjectCheckUtil.checkObject(set_data)
            && ObjectCheckUtil.checkObject(set_data, 'totalCount')
            && ObjectCheckUtil.checkObject(set_data, 'pageSize')
        ) {

            totalPages = Math.ceil(set_data['totalCount'] / (set_data['pageSize']));
            // tslint:disable-next-line: radix
            output_data.pageSize = parseInt(set_data['pageSize']);
            output_data.totalPages = totalPages;
        }

        // logger.error('paginatorObj getPagecounter', output_data);
        return output_data;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 依照API回傳的內容整理資料
     */
    private setResData(resData: any): void {
        this.resRealBody = resData;
        if (ObjectCheckUtil.checkObject(resData)) {
            // logger.step('Telegram', 'ResBase', 'setResData set', ObjectUtil.clone(resData));
            this.resBody = { ...this.resBody, ...resData };

            this.serviceId = ObjectCheckUtil.checkObjectList(this.resBody, 'apiId');
            this.infoData = ObjectCheckUtil.checkObjectList(this.resBody, 'token');
            this.resContent = ObjectCheckUtil.checkObjectList(this.resBody, 'resContent');
            this.paginatorObj = ObjectCheckUtil.checkObjectList(this.resBody, 'resContent.paginator');
            this.setResMsg();
            this.showResponseLog(); // 顯示設定資訊
            logger.step('TelegramBase', 'ApiResOption', 'setResData output', ObjectUtil.clone(this.resBody));
            // logger.log('Telegram', 'ResBase', 'setResData output', this.getServiceId());
        } else {
            logger.step('TelegramBase', 'ApiResOption', 'setResData error (not object)', typeof resData, resData);
        }
    }

    /**
     * 設定結果判斷物件
     */
    private setResMsg() {
        let output: any = {
            status: false,
            responseTime: '',
            title: '',
            title_trans: '',
            msg: '',
            classType: 'warning', // success, error, warning
            errorCode: '',
            errorMsg: '',
            // 特殊執行作業
            specialDoEvent: {
                type: '',
                code: '',
                error: ''
            },
            error_list: []
        };
        let errorObj = ObjectCheckUtil.checkObjectList(this.resBody, 'resMessage');
        output = { ...output, ...errorObj };
        output.responseTime = this.getResponseTime();
        output['resFlag'] = ObjectCheckUtil.checkObjectList(this.resBody, 'resFlag');

        let checkIsException = this.setException();
        if (!checkIsException) {
            // 非格式錯誤或系統錯誤(業務功能正常)
            if (output['resFlag'] == '0') {
                output.status = true;
                output.title = 'ERROR.API.SUCCESS';
                output.title_trans = 'ERROR.API.SUCCESS_PARAMS';
                output.classType = 'success';
            } else if (output['resFlag'] == '1') {
                output.title = 'ERROR.API.ERROR';
                output.title_trans = 'ERROR.API.ERROR_PARAMS';
                output.classType = 'error';
            } else {
                output.title = 'ERROR.API.WARNING';
                // output.title = 'ERROR.API.UNKNOWN';
                output.title_trans = 'ERROR.API.WARNING_PARAMS';
                output.classType = 'warning';
            }
        } else {
            // 格式錯誤或系統錯誤
            output = { ...output, ...this.resException };
            output['resFlag'] = false;
            output.title = 'ERROR.API.WARNING';
            // output.title = 'ERROR.API.UNKNOWN';
            output.title_trans = 'ERROR.API.WARNING_PARAMS';
            output.classType = 'warning';
        }

        output.specialDoEvent = this.setSpecialErrorEvent(output.errorCode, output.errorMsg);

        // 暫時關閉(中台的errorCode不好看，先不顯示) 2020/11/13 by weiwei
        // if (output.errorCode != '') {
        //     output.error_list.push('(' + output.errorCode + ')');
        // }
        if (output.errorMsg != '') {
            output.error_list.push(output.errorMsg);
        }
        if (output.error_list.length > 0) {
            output.msg = output.error_list.join('');
        } else {
            output.msg = output.title; // 有些功能不一定會顯示title，但會顯示msg，所以msg不可為空
        }

        logger.step('TelegramBase', 'ApiRes setMsg', ObjectUtil.clone(output));
        this.resMsg = output;
        this.resStatus = output['status'];
    }

    /**
     * 設定特殊錯誤處理code
     * @param errorCode 
     */
    private setSpecialErrorEvent(errorCode, errorMsg) {
        let specialDoEvent = {
            type: '',
            code: '',
            error: ''
        };
        if (!errorCode) {
            return specialDoEvent;
        }
        let search_code = errorCode.toString();

        // gateway error
        if (this.resExceptionSystem == 'Gateway') {
            let gateway_check_error = FieldUtil.checkField(API_GATEWAY_ERRORCODE, search_code);
            if (!!gateway_check_error) {
                specialDoEvent.type = API_ERROR_TYPE_LIST.gateway;
                specialDoEvent.code = errorCode;
                specialDoEvent.error = gateway_check_error;
                return specialDoEvent;
            }
        } else {
            // login
            let has_need_logout = FieldUtil.checkField(API_LOGIN_ERRORCODE, search_code);
            if (!!has_need_logout) {
                specialDoEvent.type = API_ERROR_TYPE_LIST.login;
                specialDoEvent.code = errorCode;
                specialDoEvent.error = has_need_logout;
                return specialDoEvent;
            }

            // security
            let security_check_error = FieldUtil.checkField(API_SECURITY_ERRORCODE, search_code);
            if (!!security_check_error) {
                specialDoEvent.type = API_ERROR_TYPE_LIST.security;
                specialDoEvent.code = errorCode;
                specialDoEvent.error = security_check_error;
                return specialDoEvent;
            }
        }
        // 其他預設處理
        specialDoEvent.type = 'server';
        specialDoEvent.code = errorCode;
        if (!!errorMsg) {
            specialDoEvent.error = errorMsg;
        }


        return specialDoEvent;
    }

    /**
     * 系統異常處理
     */
    private setException() {
        let is_exception = true;
        // 檢合格式是否正確
        // [檢核] 有無內容: true 有內容
        let tmpResContent = ObjectCheckUtil.checkObjectList(this.resRealBody, 'resContent');
        let haveContent = (ObjectCheckUtil.checkEmpty(tmpResContent, true)) ? true : false;
        // [檢核] 有無resMsg: true 有此物件
        let tmpResMsg = ObjectCheckUtil.checkObjectList(this.resRealBody, 'resMessage');
        let haveResMsg = (ObjectCheckUtil.checkEmpty(tmpResMsg, true)) ? true : false;
        // [檢核] 有無resFlag: true 有此物件
        let tmpResFlag = ObjectCheckUtil.checkObjectList(this.resRealBody, 'resFlag');
        let haveResFlag = (!!tmpResFlag || tmpResFlag == '0' || tmpResFlag == false) ? true : false;

        this.unknowResponse = false;
        // logger.error(haveResMsg, haveResFlag, this.serviceId, this.resRealBody);
        if (!haveResMsg && !haveResFlag) {
            // 格式錯誤或系統錯誤
            // 不是業務成功回傳的內容
            this.resException = {...API_RESPONSE_EXCEPTION, ...this.resRealBody };
            this.resExceptionSystem = 'MobileServer';
            is_exception = true;
            logger.step('TelegramBase', 'ApiResOption', 'api Exception');
            // 檢核如果格式完全認不得
            let haveErrCode = ObjectCheckUtil.checkObjectList(this.resRealBody, 'errorCode');
            let haveErrMsg = ObjectCheckUtil.checkObjectList(this.resRealBody, 'errorMsg');
            if (!haveErrCode && !haveErrMsg) {
                // 格式完全認不得
                this.unknowResponse = true;
            }

            // Gateway exception 處理
            if (this.unknowResponse) {
                let gateway_code = ObjectCheckUtil.checkObjectList(this.resRealBody, 'return_code');
                let gateway_msg = ObjectCheckUtil.checkObjectList(this.resRealBody, 'return_message');
                if (!!gateway_code) {
                    this.resException = {...this.resException, ...{
                        errorCode: gateway_code,
                        errorMsg: gateway_msg
                    }};
                    this.resExceptionSystem = 'Gateway';
                    this.unknowResponse = false;
                }
            }

        } else {
            // 可能是業務成功回傳的內容 (無論resFlag)
            // 非格式錯誤或系統錯誤(業務功能正常)
            is_exception = false;
            this.resException = {};
            logger.step('TelegramBase', 'ApiResOption', 'api 業務正常');
        }

        // 不是exception時，systemSatus=true
        this.systemSatus = (is_exception) ? false : true;
        return is_exception;
    }


    /**
     * 顯示response資訊（ development 使用）
     */
    private showResponseLog() {
        if (environment.PRODUCTION) {
            return false;
        }
        logger.log('====API Response Object Start====');
        logger.log('API Object', 'serviceId:(req/res)', this.reqServiceId, this.getServiceId());
        logger.log('API Object', 'api request id:', this.getRequestId());
        logger.log('API Object', 'response time:', this.getResponseTime());
        logger.log('API Object', 'server language:', this.getLanguage());
        logger.log('API Object', 'server msg:', this.getResMsg());
        logger.log('API Object', 'info data:', this.getInfoData());
        logger.log('API Object', 'main data:', this.getData());
        logger.log('====API Response Object End====');
    }

}
