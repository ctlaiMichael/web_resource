/**
 * API: SPEC02010101-一般登入
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC02010101Req } from './spec02010101-req';
import { AuthUserInfoOption } from '@systems/system/auth/auth-userinfo-option';
// -- Other Library -- //


// import { AuthService } from '@core/auth/auth.service';

@Injectable()
export class SPEC02010101ApiService extends ApiBaseService {
    protected serviceId = "SPEC02010101";

    login(reqData: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC02010101Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let custId = this._formateService.checkField(reqData, 'custId');
        let userId = this._formateService.checkObjectList(reqData, 'userId');
        let loginCheckStr = this._formateService.checkObjectList(reqData, 'pswd');
        let loginType = this._formateService.checkObjectList(reqData, 'loginType');

        if (!this._checkService.checkEmpty(custId, true) 
            || !this._checkService.checkEmpty(loginCheckStr, true)
            || !this._checkService.checkEmpty(loginType, true)
        ) {
            return this.returnError({}, 'REQ_ERROR');
        }

        if (loginType == '1') {
            if (!this._checkService.checkEmpty(userId, true)) {
                return this.returnError({}, 'REQ_ERROR');
            }
        }

        // 修改request
        let update_req = {
            "userId": custId,
            "loginUID": userId,
            "loginCheckStr": loginCheckStr,
            "encodeType": 'N',
            "loginType": loginType
        };
        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},    
                    responseTime: '', // 查詢回應時間
                    data: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();

                let key: any;
                let tempObj = new AuthUserInfoOption();
                for (key in resData) {
                    if (key == 'userId') {
                        tempObj['custId'] = resData[key];
                    } else if (key == 'loginUID') {
                        tempObj['userId'] = resData[key];
                    } else {
                        tempObj[key] = resData[key];
                    }
                }
                output.data = tempObj;

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC02010101_SERVER_REP');
                }

                if (!this._checkService.checkEmpty(output.data, true)) {
                    return this.returnError({
                        content: 'ERROR.EMPTY'
                    }, 'SPEC02010101_SERVER_REP');
                }

                if (output.data['isMobilebank'] != 'Y') {
                    return this.returnError({
                        content: 'ERROR.LOGIN.NEED_APPLY_MOBILE_BANK'
                    }, 'SPEC02010101_MOBILE_BANK');
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
