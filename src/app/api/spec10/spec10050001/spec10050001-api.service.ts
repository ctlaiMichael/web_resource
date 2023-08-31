/**
 * API: SPEC10050001-貸款試算
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC10050001Req } from './spec10050001-req';
// -- Other Library -- //

@Injectable()
export class SPEC10050001ApiService extends ApiBaseService {
    protected serviceId = 'SPEC10050001'; // API Name

    sendData(reqData: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC10050001Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let returnAmtType = this._formateService.checkField(reqData, 'returnAmtType');
        let duration = this._formateService.checkField(reqData, 'duration');
        let capitalAmt = this._formateService.checkField(reqData, 'capitalAmt');
        let rowData = this._formateService.checkObjectList(reqData, 'rowData');
        let totalMonth = this._formateService.checkField(reqData, 'totalMonth');

        if (!this._checkService.checkEmpty(returnAmtType, true)
            || !this._checkService.checkEmpty(duration, true)
            || !this._checkService.checkEmpty(capitalAmt, true)
            || !this._checkService.checkEmpty(rowData, true)
            || !this._checkService.checkEmpty(totalMonth, true)
        ) {
            return this.returnError({}, 'REQ_ERROR');
        }

        // let update_req = {
            
        // };

        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    responseTime: '', // 查詢回應時間
                    capitalAmt: '',
                    returnAmtType: '',
                    totalPayment: '',
                    totalInterestPayable: '',
                    data: [],
                    list: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();
                output.statusObj = {...output.statusObj, ...{
                    title_params: {
                        param: 'FINANCIAL.CALCULATE'
                    }
                }};
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.capitalAmt = this._formateService.checkField(resData, 'capitalAmt');
                output.returnAmtType = this._formateService.checkField(resData, 'returnAmtType');
                output.totalPayment = this._formateService.checkField(resData, 'totalPayment');
                output.totalInterestPayable = this._formateService.checkField(resData, 'totalInterestPayable');
                let modify_data = this._formateService.checkObjectList(resData, 'rowData');
                if (modify_data) {
                    output.data = modify_data;
                    output.data.forEach(item => {
                        // 需要資料整理
                        let sub_list = {
                            duration: this._formateService.checkField(item, 'duration'),
                            month: this._formateService.checkField(item, 'month'),
                            rate: this._formateService.checkField(item, 'rate'),
                            principal: this._formateService.checkField(item, 'principal'),
                            durationInterestPayable: this._formateService.checkField(item, 'durationInterestPayable'),
                            durationPayment: this._formateService.checkField(item, 'durationPayment'),
                            monthlyPayment: this._formateService.checkField(item, 'monthlyPayment')
                        };
                        output.list[sub_list.duration] = sub_list;
                    });
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

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}
