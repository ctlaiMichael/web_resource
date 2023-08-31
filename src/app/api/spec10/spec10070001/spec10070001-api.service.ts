/**
 * API: SPEC10070001-外幣歷史匯率查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC10070001Req } from './spec10070001-req';
// -- Other Library -- //

@Injectable()
export class SPEC10070001ApiService extends ApiBaseService {
    protected serviceId = 'SPEC10070001'; // API Name

    getData(reqData: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC10070001Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let currencyCode = this._formateService.checkField(reqData, 'currencyCode');
        let start_date = this._formateService.checkObjectList(reqData, 'dateRange.start');
        let end_date = this._formateService.checkObjectList(reqData, 'dateRange.end');
        
        if (!this._checkService.checkEmpty(currencyCode, true) 
            || !this._checkService.checkEmpty(start_date, true)
            || !this._checkService.checkEmpty(end_date, true)
        ) {
            return this.returnError({}, 'REQ_ERROR');
        }

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
                    currencyName: '',
                    currencyCode: '',
                    dateRange: {}, // 資料時間
                    data: [],
                    list: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.currencyName = this._formateService.checkField(resData, 'currencyName');
                output.currencyCode = this._formateService.checkField(resData, 'currencyCode');
                output.dateRange = this._formateService.checkObjectList(resData, 'dateRange');
                let modify_data = this._formateService.checkObjectList(resData, 'rowData');
                if (modify_data) {
                    output.data = modify_data;
                    output.data.forEach(item => {
                        // 需要資料整理
                        let sub_list = {
                            rateDate: this._formateService.checkField(item, 'rateDate'),
                            buyRate: this._formateService.checkField(item, 'buyRate'),
                            sellRate: this._formateService.checkObjectList(item, 'sellRate')
                        };
                        output.list[sub_list.rateDate] = sub_list;
                    });
                }

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC10070001_SERVER_REP');
                }

                if (!this._checkService.checkEmpty(output.data, true)) {
                    return this.returnError({
                        content: 'ERROR.EMPTY'
                    }, 'SPEC10070001_SERVER_REP');
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
