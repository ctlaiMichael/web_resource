/**
 * API: SPEC03010101-設備綁定
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC03010101Req } from './spec03010101-req';
// -- Other Library -- //

@Injectable()
export class SPEC03010101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC03010101'; // API Name

    sendData(reqData?: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC03010101Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let uuid = this._formateService.checkField(reqData, 'uuid');
        let deviceName = this._formateService.checkField(reqData, 'deviceName');
        let fastType = this._formateService.checkField(reqData, 'fastType');
        let fastStatus = this._formateService.checkField(reqData, 'fastStatus');
        // let fastMac = this._formateService.checkField(reqData, 'fastMac');
        let os = this._formateService.checkField(reqData, 'os');
        let platform = this._formateService.checkField(reqData, 'platform');
        // let otpNumber = this._formateService.checkField(reqData, 'otpNumber');

        if (!this._checkService.checkEmpty(uuid, true)
            || !this._checkService.checkEmpty(deviceName, true)
            || !this._checkService.checkEmpty(fastType, true)
            || !this._checkService.checkEmpty(fastStatus, true)
            // || !this._checkService.checkEmpty(fastMac, true)
            || !this._checkService.checkEmpty(os, true)
            || !this._checkService.checkEmpty(platform, true)
            // || !this._checkService.checkEmpty(otpNumber, true)
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
                    data: [],
                    custId: '',
                    bindStatus: '',
                    fastType: '',
                    fastStatus: '',
                    patternErrCount: ''
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();
                output.statusObj = {...output.statusObj, ...{
                    title_params: {
                        param: 'SETTING.FAST_SETTING.SETTING'
                    }
                }};
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.custId = this._formateService.checkField(resData, 'userId');
                output.bindStatus = this._formateService.checkField(resData, 'bindStatus');
                output.fastType = this._formateService.checkField(resData, 'fastType');
                output.fastStatus = this._formateService.checkField(resData, 'fastStatus');
                output.patternErrCount = this._formateService.checkField(resData, 'patternErrCount');

                // if (!output.status) {
                //     // 伺服器回傳錯誤
                //     return this.returnError({
                //         content: output.msg
                //     }, 'SPEC03020101_SERVER_REP');
                // }

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     return this.returnError({
                //         content: 'ERROR.EMPTY'
                //     }, 'SPEC03020101_SERVER_REP');
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
