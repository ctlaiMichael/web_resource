/**
 * API: SPEC07030201-綜定存自動轉期解除約定
 */
import { Injectable } from '@angular/core';
import { ApiTransBaseService } from '@api/base/api-trans-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC07030201Req } from './spec07030201-req';
// -- Other Library -- //

@Injectable()
export class SPEC07030201ApiService extends ApiTransBaseService {
    protected serviceId = 'SPEC07030201'; // API Name

    sendData(reqData: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC07030201Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let accountId = this._formateService.checkField(reqData, 'accountId');

        if (!this._checkService.checkEmpty(accountId, true)) {
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
                    data: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();
                output.statusObj = {...output.statusObj, ...{
                    title_params: {
                        param: 'TIME_DEPOSIT.AUTO_CARRY_OVER.DELETE'
                    }
                }};
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.data = resData;

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
