/**
 * API: SPEC10090101-匯率到價通知查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC10090101Req } from './spec10090101-req';
// -- Other Library -- //

@Injectable()
export class SPEC10090101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC10090101'; // API Name

    getData(reqData?: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC10090101Req, {
            'reqData': reqData
        });
        // 欄位檢核
        

        // 修改request
        // let update_req = {};
        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},    
                    responseTime: '', // 查詢回應時間
                    data: [],
                    workingData: [],
                    notYetData: [],
                    expiredData: [],
                    email: ''
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                let modify_data = this._formateService.checkObjectList(resData, 'rowData');
                if (modify_data) {
                    output.data = modify_data;
                    output.data.forEach(item => {
                        // 需要資料整理
                        let sub_list = {
                            group: this._formateService.checkField(item, 'group'),
                            email: this._formateService.checkField(item, 'email'),
                            settingTime: this._formateService.checkField(item, 'settingTime'),
                            sellCurrencyObj: this._formateService.checkObjectList(item, 'transOutCurrency'),
                            buyCurrencyObj: this._formateService.checkObjectList(item, 'transInCurrency'),
                            referenceRate: this._formateService.checkField(item, 'referenceRate'),
                            expectedRate: this._formateService.checkField(item, 'expectedRate'),
                            startDate: this._formateService.checkObjectList(item, 'noticeDateRange.start'),
                            endDate: this._formateService.checkObjectList(item, 'noticeDateRange.end')
                        };
                        sub_list.sellCurrencyObj = {...sub_list.sellCurrencyObj, ...{
                            currencyCodeShow: sub_list.sellCurrencyObj.currencyCode,
                            currencyNameShow: sub_list.sellCurrencyObj.currencyName
                        }};
                        sub_list.buyCurrencyObj = {...sub_list.buyCurrencyObj, ...{
                            currencyCodeShow: sub_list.buyCurrencyObj.currencyCode,
                            currencyNameShow: sub_list.buyCurrencyObj.currencyName
                        }};
                        if (sub_list.group == '0') {
                            output.notYetData.push(sub_list);
                        } else if (sub_list.group == '1') {
                            output.workingData.push(sub_list);
                        } else if (sub_list.group == '2') {
                            output.expiredData.push(sub_list);
                        }
                        if (!output.email || output.email == '') {
                            output.email = sub_list.email;
                        }
                    });
                }
                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC10090101_SERVER_REP');
                }

                if (!this._checkService.checkEmpty(output.data, true)) {
                    return this.returnError({
                        content: 'ERROR.EMPTY'
                    }, 'SPEC10090101_SERVER_REP');
                }

                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(errorObj);
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
