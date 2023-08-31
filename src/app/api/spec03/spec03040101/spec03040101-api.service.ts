/**
 * API: SPEC03040101-檢查裝置是否綁定
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC03040101Req } from './spec03040101-req';
// -- Other Library -- //

@Injectable()
export class SPEC03040101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC03040101'; // API Name

    sendData(reqData?: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC03040101Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let uuid = this._formateService.checkField(reqData, 'uuid');

        if (!this._checkService.checkEmpty(uuid, true)
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
                    fastData: {
                        fast_custId: '',
                        fast_userId: '',
                        bindStatus: '',
                        fastType: '',
                        fastStatus: '',
                        patternErrCount: ''
                    }
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.fastData.fast_custId = this._formateService.checkField(resData, 'userId');
                output.fastData.fast_userId = this._formateService.checkField(resData, 'loginUID');
                output.fastData.bindStatus = this._formateService.checkField(resData, 'bindStatus');
                output.fastData.fastType = this._formateService.checkField(resData, 'fastType');
                output.fastData.fastStatus = this._formateService.checkField(resData, 'fastStatus');
                output.fastData.patternErrCount = this._formateService.checkField(resData, 'patternErrCount');

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC03040101_SERVER_REP');
                }

                if (!this._checkService.checkEmpty(output.fastData.fast_custId, true)
                    && !this._checkService.checkEmpty(output.fastData.fast_userId, true)
                    && !this._checkService.checkEmpty(output.fastData.bindStatus, true)
                    && !this._checkService.checkEmpty(output.fastData.fastType, true)
                    && !this._checkService.checkEmpty(output.fastData.fastStatus, true)
                    && !this._checkService.checkEmpty(output.fastData.patternErrCount, true)
                ) {
                    return this.returnError({
                        content: 'ERROR.EMPTY'
                    }, 'SPEC03040101_SERVER_REP');
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
