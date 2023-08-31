/**
 * API: SPEC11040301-台幣單筆申購-確認頁
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11040301Req } from './spec11040301-req';
// -- Other Library -- //

@Injectable()
export class SPEC11040301ApiService extends ApiBaseService {

    protected serviceId = 'SPEC11040301';


    /**
     * 取得列表資料
     * @param reqData 條件
     */
    sendData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11040301Req, {
            'reqData': reqData
        });

        // 修改request
        let termData = this._formateService.checkField(reqData, 'termData');
        let update_req = {
            'fundCode': this._formateService.checkField(reqData, 'fundCode'),
            'fundCcy': this._formateService.checkField(reqData, 'fundCcy'),
            'accountID': this._formateService.checkField(reqData, 'investAccount'),
            'investAmt': this._formateService.checkField(reqData, 'investMoney'),
            'hasProfit': this._formateService.checkField(reqData, 'hasProfit'),
            'profitAccountID': this._formateService.checkField(reqData, 'profitAccountID'),
            'accountCcy': this._formateService.checkField(reqData, 'accountCcy'),
            'publicBook': this._formateService.checkField(termData, 'self'),
            'typeInd': this._formateService.checkField(termData, 'typeInd'),
            'usaSignNote': this._formateService.checkField(termData, 'usaSignNote'),
            'signAgr': this._formateService.checkField(termData, 'signAgr')
        };
        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    termData: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                output.termData = this._formateService.checkObjectList(jsonObj, 'termData');
                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC11040301_SERVER_REP');
                }

                if (!this._checkService.checkEmpty(output.infoData, true)) {
                    // 查詢期間無交易資料
                    return this.returnError({}, 'EMPTY_RANGE_API');
                }
                return Promise.resolve(output)
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
