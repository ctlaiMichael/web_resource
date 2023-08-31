/**
 * API: SPEC02010201-登出
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC02010201Req } from './spec02010201-req';
// -- Other Library -- //


// import { AuthService } from '@core/auth/auth.service';

@Injectable()
export class SPEC02010201ApiService extends ApiBaseService {
    protected serviceId = "SPEC02010201";

    logout(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC02010201Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let custId = this._formateService.checkField(reqData, 'custId');

        if (!this._checkService.checkEmpty(custId, true)) {
            return this.returnError({}, 'REQ_ERROR');
        }

        // 修改request
        let update_req = {
            "userId": custId
        };
        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},    
                    responseTime: '' // 查詢回應時間
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC02010201_SERVER_REP');
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
