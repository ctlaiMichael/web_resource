/**
 * API: SPEC07030001-綜定存自動轉期約定取得帳號資料
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC07030001Req } from './spec07030001-req';
// -- Other Library -- //

@Injectable()
export class SPEC07030001ApiService extends ApiBaseService {
    protected serviceId = 'SPEC07030001'; // API Name

    getData(reqData?: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC07030001Req, {
            'reqData': reqData
        });

        // 欄位檢核
        // let transType = this._formateService.checkField(reqData, 'transType');

        // if (!this._checkService.checkEmpty(transType, true)) {
        //     return this.returnError({}, 'REQ_ERROR');
        // }

        // 修改request
        // let update_req = {
            
        // };

        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    responseTime: '', // 查詢回應時間
                    data: {},
                    timeDepositAccount: [],
                    interestAccount: []
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.data = resData;
                output.timeDepositAccount = this._formateService.checkField(resData, 'timeDepositAccount');
                output.interestAccount = this._formateService.checkField(resData, 'interestAccount');

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC07030001_SERVER_REP');
                }

                if (!this._checkService.checkEmpty(output.data, true)) {
                    return this.returnError({
                        content: 'ERROR.EMPTY'
                    }, 'SPEC07030001_SERVER_REP');
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
