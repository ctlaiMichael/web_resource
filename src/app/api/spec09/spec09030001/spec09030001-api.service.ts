/**
 * API: SPEC09030001-外幣兌換取得帳號資料
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC09030001Req } from './spec09030001-req';
// -- Other Library -- //

@Injectable()
export class SPEC09030001ApiService extends ApiBaseService {
    protected serviceId = 'SPEC09030001'; // API Name

    getData(reqData: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC09030001Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let transType = this._formateService.checkField(reqData, 'transType');

        if (!this._checkService.checkEmpty(transType, true)) {
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
                    error: {},
                    responseTime: '', // 查詢回應時間
                    data: {},
                    transOutAccount: [],
                    transInAccount: [],
                    remitNatureData: [],
                    liveNo: '',
                    permitDateRange: {
                        start: '',
                        end: ''
                    },
                    birthday: '',
                    isEmployee: ''
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.data = resData;
                output.transOutAccount = this._formateService.checkField(resData, 'transOutAccount');
                output.transInAccount = this._formateService.checkField(resData, 'transInAccount');
                output.remitNatureData = this._formateService.checkField(resData, 'remitNature');
                output.liveNo = this._formateService.checkField(resData, 'liveNo');
                output.permitDateRange = this._formateService.checkObjectList(resData, 'permitDateRange');
                output.birthday = this._formateService.checkField(resData, 'birthday');
                output.isEmployee = this._formateService.checkField(resData, 'isEmployee');

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

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC09030001_SERVER_REP');
                }

                if (!this._checkService.checkEmpty(output.data, true)) {
                    return this.returnError({
                        content: 'ERROR.EMPTY'
                    }, 'SPEC09030001_SERVER_REP');
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
