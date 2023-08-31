/**
 * API: SPEC10090201-匯率到價通知新增、修改、刪除
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC10090201Req } from './spec10090201-req';
// -- Other Library -- //

@Injectable()
export class SPEC10090201ApiService extends ApiBaseService {
    protected serviceId = 'SPEC10090201'; // API Name

    addData(reqData: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC10090201Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let action = this._formateService.checkField(reqData, 'action');
        let settingTime = this._formateService.checkObjectList(reqData, 'record.settingTime');
        let email = this._formateService.checkObjectList(reqData, 'record.email');
        let transInCurrency = this._formateService.checkObjectList(reqData, 'record.transInCurrency');
        let transOutCurrency = this._formateService.checkObjectList(reqData, 'record.transOutCurrency');
        let referenceRate = this._formateService.checkObjectList(reqData, 'record.referenceRate');
        let expectedRate = this._formateService.checkObjectList(reqData, 'record.expectedRate');
        let noticeDateRange = this._formateService.checkObjectList(reqData, 'record.noticeDateRange');

        if (!this._checkService.checkEmpty(action, true)
            || !this._checkService.checkEmpty(settingTime, true)
            // || !this._checkService.checkEmpty(email, true)
            || !this._checkService.checkEmpty(transInCurrency, true)
            || !this._checkService.checkEmpty(transOutCurrency, true)
            || !this._checkService.checkEmpty(referenceRate, true)
            || !this._checkService.checkEmpty(expectedRate, true)
            || !this._checkService.checkEmpty(noticeDateRange, true)
        ) {
            return this.returnError({}, 'REQ_ERROR');
        }

        let update_req = {
            "action": "create",
            "record": {
                "settingTime": settingTime,
                "email": email,
                "transInCurrency": transInCurrency,
                "transOutCurrency": transOutCurrency,
                "referenceRate": referenceRate,
                "expectedRate": expectedRate,
                "noticeDateRange": noticeDateRange
            }
        };

        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    responseTime: '', // 查詢回應時間
                    data: {},
                    action: '',
                    settingTime: '',
                    email: '',
                    transInCurrency: {},
                    transOutCurrency: {},
                    referenceRate: '',
                    expectedRate: '',
                    startDate: '',
                    endDate: ''
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();
                output.statusObj = {...output.statusObj, ...{
                    title_params: {
                        param: 'FINANCIAL.ADD'
                    }
                }};
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.action = this._formateService.checkField(resData, 'action');
                let modify_data = this._formateService.checkObjectList(resData, 'settingRecord');
                if (modify_data) {
                    // 需要資料整理
                    output.data = modify_data;
                    output.settingTime = this._formateService.checkField(modify_data, 'settingTime');
                    output.email = this._formateService.checkField(modify_data, 'email');
                    output.transInCurrency = this._formateService.checkObjectList(modify_data, 'transInCurrency');
                    output.transOutCurrency = this._formateService.checkObjectList(modify_data, 'transOutCurrency');
                    output.referenceRate = this._formateService.checkField(modify_data, 'referenceRate');
                    output.expectedRate = this._formateService.checkField(modify_data, 'expectedRate');
                    output.startDate = this._formateService.checkObjectList(modify_data, 'noticeDateRange.start');
                    output.endDate = this._formateService.checkObjectList(modify_data, 'noticeDateRange.end');
                }

                // if (!output.status) {
                //     // 伺服器回傳錯誤
                //     return this.returnError({
                //         content: output.msg
                //     }, 'SPEC10090201_SERVER_REP');
                // }

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     return this.returnError({
                //         content: 'ERROR.EMPTY'
                //     }, 'SPEC10090201_SERVER_REP');
                // }

                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(this.returnTransError(errorObj));
                // return Promise.reject(errorObj);
            }
        );
    }

    updateData(reqData: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC10090201Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let action = this._formateService.checkField(reqData, 'action');
        let settingTime = this._formateService.checkObjectList(reqData, 'record.settingTime');
        let email = this._formateService.checkObjectList(reqData, 'record.email');
        let transInCurrency = this._formateService.checkObjectList(reqData, 'record.transInCurrency');
        let transOutCurrency = this._formateService.checkObjectList(reqData, 'record.transOutCurrency');
        let referenceRate = this._formateService.checkObjectList(reqData, 'record.referenceRate');
        let expectedRate = this._formateService.checkObjectList(reqData, 'record.expectedRate');
        let noticeDateRange = this._formateService.checkObjectList(reqData, 'record.noticeDateRange');

        if (!this._checkService.checkEmpty(action, true)
            || !this._checkService.checkEmpty(settingTime, true)
            // || !this._checkService.checkEmpty(email, true)
            || !this._checkService.checkEmpty(transInCurrency, true)
            || !this._checkService.checkEmpty(transOutCurrency, true)
            || !this._checkService.checkEmpty(referenceRate, true)
            || !this._checkService.checkEmpty(expectedRate, true)
            || !this._checkService.checkEmpty(noticeDateRange, true)
        ) {
            return this.returnError({}, 'REQ_ERROR');
        }

        let update_req = {
            "action": "update",
            "record": {
                "settingTime": settingTime,
                "email": email,
                "transInCurrency": transInCurrency,
                "transOutCurrency": transOutCurrency,
                "referenceRate": referenceRate,
                "expectedRate": expectedRate,
                "noticeDateRange": noticeDateRange
            }
        };

        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    responseTime: '', // 查詢回應時間
                    data: {},
                    action: '',
                    settingTime: '',
                    email: '',
                    transInCurrency: {},
                    transOutCurrency: {},
                    referenceRate: '',
                    expectedRate: '',
                    startDate: '',
                    endDate: ''
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();
                output.statusObj = {...output.statusObj, ...{
                    title_params: {
                        param: 'FINANCIAL.UPDATE'
                    }
                }};
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.action = this._formateService.checkField(resData, 'action');
                let modify_data = this._formateService.checkObjectList(resData, 'settingRecord');
                if (modify_data) {
                    // 需要資料整理
                    output.data = modify_data;
                    output.settingTime = this._formateService.checkField(modify_data, 'settingTime');
                    output.email = this._formateService.checkField(modify_data, 'email');
                    output.transInCurrency = this._formateService.checkObjectList(modify_data, 'transInCurrency');
                    output.transOutCurrency = this._formateService.checkObjectList(modify_data, 'transOutCurrency');
                    output.referenceRate = this._formateService.checkField(modify_data, 'referenceRate');
                    output.expectedRate = this._formateService.checkField(modify_data, 'expectedRate');
                    output.startDate = this._formateService.checkObjectList(modify_data, 'noticeDateRange.start');
                    output.endDate = this._formateService.checkObjectList(modify_data, 'noticeDateRange.end');
                }

                // if (!output.status) {
                //     // 伺服器回傳錯誤
                //     return this.returnError({
                //         content: output.msg
                //     }, 'SPEC10090201_SERVER_REP');
                // }

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     return this.returnError({
                //         content: 'ERROR.EMPTY'
                //     }, 'SPEC10090201_SERVER_REP');
                // }

                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(this.returnTransError(errorObj));
                // return Promise.reject(errorObj);
            }
        );
    }

    deleteData(reqData: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC10090201Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let action = this._formateService.checkField(reqData, 'action');
        let settingTime = this._formateService.checkObjectList(reqData, 'record.settingTime');

        if (!this._checkService.checkEmpty(action, true)
            || !this._checkService.checkEmpty(settingTime, true)
        ) {
            return this.returnError({}, 'REQ_ERROR');
        }

        let update_req = {
            "action": "delete",
            "record": {
                "settingTime": settingTime
            }
        };

        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    responseTime: '', // 查詢回應時間
                    // data: {},
                    // action: '',
                    // settingTime: '',
                    // email: '',
                    // transInCurrency: {},
                    // transOutCurrency: {},
                    // referenceRate: '',
                    // expectedRate: '',
                    // startDate: '',
                    // endDate: ''
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();
                output.statusObj = {...output.statusObj, ...{
                    title_params: {
                        param: 'FINANCIAL.DELETE'
                    }
                }};
                output.responseTime = resObj.getResponseTime();
                // let resData = resObj.getData();
                // output.action = this._formateService.checkField(resData, 'action');
                // let modify_data = this._formateService.checkObjectList(resData, 'settingRecord');
                // if (modify_data) {
                //     // 需要資料整理
                //     output.data = modify_data;
                //     output.settingTime = this._formateService.checkField(modify_data, 'settingTime');
                //     output.email = this._formateService.checkField(modify_data, 'email');
                //     output.transInCurrency = this._formateService.checkObjectList(modify_data, 'transInCurrency');
                //     output.transOutCurrency = this._formateService.checkObjectList(modify_data, 'transOutCurrency');
                //     output.referenceRate = this._formateService.checkField(modify_data, 'referenceRate');
                //     output.expectedRate = this._formateService.checkField(modify_data, 'expectedRate');
                //     output.startDate = this._formateService.checkObjectList(modify_data, 'noticeDateRange.start');
                //     output.endDate = this._formateService.checkObjectList(modify_data, 'noticeDateRange.end');
                // }

                // if (!output.status) {
                //     // 伺服器回傳錯誤
                //     return this.returnError({
                //         content: output.msg
                //     }, 'SPEC10090201_SERVER_REP');
                // }

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     return this.returnError({
                //         content: 'ERROR.EMPTY'
                //     }, 'SPEC10090201_SERVER_REP');
                // }

                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(this.returnTransError(errorObj));
                // return Promise.reject(errorObj);
            }
        );
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}
