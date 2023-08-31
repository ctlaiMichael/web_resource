/**
 * API: SPEC09030101-外幣兌換-台轉外交易
 */
import { Injectable } from '@angular/core';
import { ApiTransBaseService } from '@api/base/api-trans-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC09030101Req } from './spec09030101-req';
// -- Other Library -- //

@Injectable()
export class SPEC09030101ApiService extends ApiTransBaseService {
    protected serviceId = 'SPEC09030101'; // API Name

    sendData(reqData: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC09030101Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let transOutAccount = this._formateService.checkObjectList(reqData, 'transOutAccount');
        let transInAccount = this._formateService.checkObjectList(reqData, 'transInAccount');
        let remitNature = this._formateService.checkObjectList(reqData, 'remitNature');
        let exchangeRate = this._formateService.checkField(reqData, 'exchangeRate');
        let usdRate = this._formateService.checkField(reqData, 'usdRate');
        let transOutAmt = this._formateService.checkField(reqData, 'transOutAmt');
        let transInAmt = this._formateService.checkField(reqData, 'transInAmt');

        if (!this._checkService.checkEmpty(transOutAccount, true)
            && !this._checkService.checkEmpty(transInAccount, true)
            && !this._checkService.checkEmpty(remitNature, true)
            && !this._checkService.checkEmpty(exchangeRate, true)
            && !this._checkService.checkEmpty(usdRate, true)
            && !this._checkService.checkEmpty(transOutAmt, true)
            && !this._checkService.checkEmpty(transInAmt, true)
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
                    data: {},
                    // transOutAccount: [],
                    // transInAccount: [],
                    // transTypeData: []
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.data = resData;
                // output.transOutAccount = this._formateService.checkField(resData, 'transOutAccount');
                // output.transInAccount = this._formateService.checkField(resData, 'transInAccount');
                // output.transTypeData = this._formateService.checkField(resData, 'transTypeData');
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
                //     }, 'SPEC09030201_SERVER_REP');
                // }

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     return this.returnError({
                //         content: 'ERROR.EMPTY'
                //     }, 'SPEC09030201_SERVER_REP');
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
