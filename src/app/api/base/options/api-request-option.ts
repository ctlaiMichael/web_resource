/**
 * 定義API Request物件
 * step 1~3: new ApiRequestOption()
 * step 4: (選擇流程) modifyRequest()
 * step 5以後為api底層使用功能
 * step 5: setTelegramObj 設定基本設定資料
 * step 6: 調整final request
 */
import { environment } from '@environments/environment';
import { logger } from '@util/log-util';
// --- util --- //
import { ObjectUtil } from '@util/formate/modify/object-util';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { FieldUtil } from '@util/formate/modify/field-util';
// --- conf/option --- //
import { API_REQUEST_FORMATE, API_TOKEN_REQUEST } from './api-formate';
import { PAGE_SETTING } from '@conf/page';
import { PaginatorOption } from './paginator-option';
import { TelegramOption } from './telegram-option';
import { ALLOW_IGNOR_SECURITY } from '@conf/security/secruity-setting-of-function';

/**
 * Request Base
 */
export class ApiRequestOption {
    /**
     * [核心使用] api request 設定 步驟記錄
     */
    private apiStepLogObj = {
        // step1: new object, in new ApiRequestOption()
        'init': false,
        // step2: set api formate, in new ApiRequestOption() 
        'formate': false,
        // step3: set api data, in new ApiRequestOption() 
        'data': false,
        // step4: modify api data, in xxxApiService
        'modify': false, // update object
        'modifyTimes': 0, // 修改測試
        // step5: do telegram start
        'telegram': false, // send telegram init
        // step6: modify request
        'request': false, // send telegram init
        'resend': 0 // 重送
    };
    
    /**
     * [核心使用] Api Content 規格定義 (各*-req.ts定義)
     * 每隻API自定義的reqContent Object格式(無值)
     */
    private apiReqContent: any = {};
    /**
     * [功能使用] API set 規格(傳入參數)
     * XXX-api.service設定準備傳送的object格式(與apiReqContent不相同)
     */
    private setReqObj: any = {};
    /**
     * [功能使用] API Response 伺服器規格
     * 實際要送出去的request object
     */
    private reqBody = ObjectUtil.clone(API_REQUEST_FORMATE);
    /**
     * [功能使用] 分頁物件
     */
    private paginatorObj: PaginatorOption;
    /**
     * [核心使用] Api底層通訊使用的物件(功能請忽略)
     * api底層使用物件，功能原則上不使用
     */
    private telegramBaseData: object;

    /**
     * init
     * @param apiFormate api resContent 格式定義
     * @param setObj 其他參數設定
     *      reqData : 設定的資料
     *      paginator : 分頁設定資料
     */
    constructor(
        protected apiFormate?: object,
        protected setObj?: object
    ) {
        this.apiStepLogObj.init = true;
        this.setApiFormate(apiFormate);
        let reqData = ObjectCheckUtil.checkObjectList(this.setObj, 'reqData');
        let paginator = ObjectCheckUtil.checkObjectList(this.setObj, 'paginator');
        this.setData(reqData, paginator);
    }

    /**
     * [功能使用] 取得setData設定的物件
     */
    public getSetData() {
        return this.setReqObj;
    }

    /**
     * 取得定義的api formate格式
     */
    public getApiFormate() {
        return ObjectUtil.clone(this.apiFormate);
    }

    /**
     * 取得全部api request
     */
    public getRequest() {
        let output = ObjectUtil.clone(this.reqBody);
        if (ObjectCheckUtil.checkObjectList(output, 'reqContent.paginator')) {
            output.reqContent.paginator = this.getPaginator();
        }
        return output;
    }

    /**
     * 取得main data物件
     */
    public getData() {
        let output = ObjectCheckUtil.checkObjectList(this.reqBody, 'reqContent');
        return ObjectUtil.clone(output);
    }

    /**
     * 分頁物件
     */
    public getPaginator(): object {
        let paginator = {
            pageSize: '',
            pageNumber: '',
            sortColName: '',
            sortDirection: '',
        };
        paginator['pageSize'] = this.paginatorObj['pageSize'].toString();
        paginator['pageNumber'] = this.paginatorObj['pageNumber'].toString();
        paginator['sortColName'] = this.paginatorObj['sortColName'];
        paginator['sortDirection'] = this.paginatorObj['sortDirection'];
        return paginator;
    }

    /**
     * 取得請求request唯一編號
     */
    public getRequestId() {
        return FieldUtil.checkField(this.reqBody.token, 'requestId');
    }

    // ------------------------ 以下方法為xxxx-api.service可使用 ------------------------ //

    /**
     * 更新request
     * step 4: update request in xxx-api.service
     * apiStepLogObj.modify = true
     */
    public modifyRequest(set_data: object) {
        if (!ObjectCheckUtil.checkEmpty(set_data, true)) {
            return false;
        }
        this.updateRequest(set_data);
    }

    // ------------------------ 以下方法為telegram底層使用 ------------------------ //

    /**
     * Api底層使用之物件設定處理(禁止其他功能使用)
     * @param serviceId 
     * @param options 
     */
    public setTelegramObj(set_data: object) {
        if (this.apiStepLogObj.resend > 0) {
            // 重送機制，忽略此步驟
            logger.error('TelegramBase', '重送機制，忽略此步驟(telegram is on)', '只有telegram可執行');
            return false;
        }
        if (this.apiStepLogObj.telegram || this.apiStepLogObj.request) {
            // 設定過的禁止設定！且禁止其他功能執行！！！
            logger.error('TelegramBase', 'Error in setTelegramObj retry!!!!!!!!', '只有telegram可執行');
            return false;
        }
        if (!this.apiStepLogObj.init || !this.apiStepLogObj.formate || !this.apiStepLogObj.data) {
            // 執行步驟錯誤，請確認
            logger.error('TelegramBase', 'Error in setTelegramObj step error', '執行步驟錯誤，請確認XXXApiService');
            return false;
        }
        this.apiStepLogObj.telegram = true;
        this.telegramBaseData = set_data;
    }

    /**
     * 設定final request data
     * step 6: update request in telegram.service
     * apiStepLogObj.request = true
     * @param set_data 
     */
    public modifyReqBody(set_data: object, security?: object, other_option?: object) {
        if (this.apiStepLogObj.resend > 0) {
            // 重送機制，忽略此步驟
            logger.error('TelegramBase', '重送機制，忽略此步驟(request is on)', '只有telegram可執行');
            return false;
        }
        if (this.apiStepLogObj.request) {
            // 設定過的禁止設定！且禁止其他功能執行！！！
            logger.error('TelegramBase', 'Error in modifyReqBody retry!!!!!!!!', '只有telegram可執行');
            return false;
        }
        this.apiStepLogObj.request = true;
        this.reqBody.apiId = this.getServiceId();
        let tmp_index: any;
        let send_data = ObjectUtil.clone(API_TOKEN_REQUEST);
        for (tmp_index in send_data) {
            if (!send_data.hasOwnProperty(tmp_index)) {
                continue;
            }
            // 定義有設定的request
            let tmp_data = ObjectCheckUtil.checkObjectList(set_data, tmp_index);
            if (typeof tmp_data != 'undefined') {
                send_data[tmp_index] = ObjectCheckUtil.checkObjectList(set_data, tmp_index);
            }
        }
        this.reqBody.token = send_data;
        if (!!security) {
            this.reqBody.security = security;
        }
        // mScale
        this.reqBody['_mscale_header']['_api_id'] = this.getServiceId();

        // 重送交易特殊處理(特定功能才可執行)
        let haveDoSecurity = ObjectCheckUtil.checkObjectList(other_option, 'haveDoSecurity');
        if (!!haveDoSecurity) {
            let allow_ignor = true;
            let now_security = ObjectCheckUtil.checkObjectList(security, 'securityType');
            let now_api = this.getServiceId();
            if (now_security != '3') {
                allow_ignor = false;
            }
            if (ALLOW_IGNOR_SECURITY.indexOf(now_api) <= -1) {
                allow_ignor = false;
            }
            if (allow_ignor) {
                this.reqBody.security.securityType = '4';
            }
        }

    }

    /**
     * 取得api物件編號
     */
    public getServiceId(): string {
        return ObjectCheckUtil.checkObjectList(this.telegramBaseData, 'serviceId');
    }

    /**
     * 取得TelegramOption設定
     * @param params 其他參數 ex: 'background'
     */
    public getSetOption(params?: string): TelegramOption {
        let search_option = 'options';
        if (!!params && params != '') {
            search_option += '.' + params;
        }
        return ObjectCheckUtil.checkObjectList(this.telegramBaseData, search_option);
    }

    /**
     * 回傳重送次數
     */
    public getResendNum() {
        return this.apiStepLogObj.resend;
    }

    /**
     * 設定重送次數
     */
    public setResend() {
        this.apiStepLogObj.resend++;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 定義api Formate
     * step 2: new ApiRequestOption
     * apiStepLogObj.formate = true
     */
    private setApiFormate(apiFormate: object) {
        this.apiStepLogObj.formate = true;
        this.apiReqContent = {...{}, ...apiFormate}; // 定義request
        this.reqBody.reqContent = {...{}, ...this.apiReqContent};
    }

    /**
     * 依照API回傳的內容整理資料
     * step 3: new ApiRequestOption
     * apiStepLogObj.data = true
     */
    private setData(reqData: any, paginator: any): void {
        this.apiStepLogObj.data = true;
        if (ObjectCheckUtil.checkObject(reqData)) {
            logger.step('TelegramBase', 'ApiReqOption', 'setReqData set', ObjectUtil.clone(reqData), ObjectUtil.clone(paginator));
            logger.step('TelegramBase', 'ApiReqOption', 'default req', ObjectUtil.clone(this.setReqObj));
            this.setReqObj = { ...{}, ...reqData };
            // logger.warn('TelegramBase', 'setData', 'before', ObjectUtil.clone(this.reqBody), ObjectUtil.clone(this.setReqObj));
            this.setPageReq(paginator);
            this.setRequest(); // 設定request
            // logger.warn('TelegramBase', 'setData', 'after', ObjectUtil.clone(this.reqBody));
        } else {
            logger.step('TelegramBase', 'ApiReqOption', 'setReqData error (not object)', typeof reqData, reqData);
        }
    }


    /**
     * 分頁物件設定
     * pageSize: 1 第一頁
     *           2~N 第2~n頁
     */
    private setPageReq(data: object) {
        let output = new PaginatorOption();
        // tslint:disable-next-line:radix
        let page = parseInt(FieldUtil.checkField(data, 'pageNumber'));
        if (!page || page <= 0) {
            page = 1;
        }
        // tslint:disable-next-line:radix
        let page_size = parseInt(FieldUtil.checkField(data, 'pageSize'));
        if (!page_size || page_size <= 0) {
            page_size = PAGE_SETTING.PAGE_SIZE;
        }

        let sort = FieldUtil.checkField(data, 'sortColName');
        let sortDirection = FieldUtil.checkField(data, 'sortDirection');
        sortDirection = (sortDirection.toUpperCase() === 'DESC') ? 'DESC' : 'ASC';


        output['pageSize'] = page_size;
        output['pageNumber'] = page;
        output['sortColName'] = sort;
        output['sortDirection'] = sortDirection;
        // logger.error("pageCheck", data, JSON.parse(JSON.stringify(output)));
        this.paginatorObj = output;
    }


    /**
     * request設定
     */
    private setRequest() {
        let send_data = ObjectUtil.clone(this.apiReqContent);
        let set_data = this.getSetData();
        let tmp_index: any;
        for (tmp_index in send_data) {
            if (!send_data.hasOwnProperty(tmp_index)) {
                continue;
            }
            // 定義有設定的request
            let tmp_set = ObjectCheckUtil.checkObjectList(set_data, tmp_index);
            if (typeof tmp_set != 'undefined') {
                send_data[tmp_index] = ObjectCheckUtil.checkObjectList(set_data, tmp_index);
            }
        }
        this.reqBody.reqContent = send_data;
    }

    /**
     * 設定object
     * @param set_data
     */
    private updateRequest(set_data: object) {
        this.apiStepLogObj.modify = true;
        this.apiStepLogObj.modifyTimes++;
        this.reqBody.reqContent = {...this.reqBody.reqContent, ...set_data};      
    }

}

