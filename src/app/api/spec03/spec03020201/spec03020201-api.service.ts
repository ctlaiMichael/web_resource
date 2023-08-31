/**
 * API: SPEC03020201-修改裝置綁定
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC03020201Req } from './spec03020201-req';
// -- Other Library -- //

@Injectable()
export class SPEC03020201ApiService extends ApiBaseService {
    protected serviceId = 'SPEC03020201'; // API Name

    updateData(reqData?: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC03020201Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let uuid = this._formateService.checkField(reqData, 'uuid');
        let deviceName = this._formateService.checkField(reqData, 'deviceName');

        if (!this._checkService.checkEmpty(uuid, true)
            || !this._checkService.checkEmpty(deviceName, true)
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
                    statusObj: {},    
                    responseTime: '', // 查詢回應時間
                    data: []
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();
                output.statusObj = {...output.statusObj, ...{
                    title_params: {
                        param: 'SETTING.FAST_SETTING.UPDATE'
                    }
                }};
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();

                // if (!output.status) {
                //     // 伺服器回傳錯誤
                //     return this.returnError({
                //         content: output.msg
                //     }, 'SPEC03020201_SERVER_REP');
                // }

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     return this.returnError({
                //         content: 'ERROR.EMPTY'
                //     }, 'SPEC03020201_SERVER_REP');
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
