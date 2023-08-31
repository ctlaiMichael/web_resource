/**
 * API: SPEC11040106-台幣定期定額-結果頁
 */
import { Injectable } from '@angular/core';
import { ApiTransBaseService } from '@api/base/api-trans-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11040106Req } from './spec11040106-req';
// -- Other Library -- //

@Injectable()
export class SPEC11040106ApiService extends ApiTransBaseService {

    protected serviceId = 'SPEC11040106';

    /**
     * 取得列表資料
     * @param reqData 條件
     */
    sendData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11040106Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    infoData: {},
                    termData: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                output.termData = this._formateService.checkObjectList(jsonObj, 'termData');
                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(errorObj);
            }
        );
    }

    modifyData(reqData: object, option?: object) {
        // 比照送出電文時處理
        // 修改request
        let securityReq = this.doReqData(reqData);
        return securityReq;
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    // 處理request
    private doReqData(reqData) {
        // 修改request
        let termData = this._formateService.checkField(reqData, 'termData');
        let update_req = {
            'fundCode': this._formateService.checkField(reqData, 'fundCode'),
            'fundName': this._formateService.checkField(reqData, 'fundName'),
            'fundCcy': this._formateService.checkField(reqData, 'fundCcy'),
            'accountID': this._formateService.checkField(reqData, 'investAccount'),
            'investAmt': this._formateService.checkField(reqData, 'investMoney'),
            'investDate': this._formateService.checkField(reqData, 'investDate'),
            'fee': this._formateService.checkField(reqData, 'fee'),
            'hasProfit': this._formateService.checkField(reqData, 'hasProfit'),
            'profitAccountID': this._formateService.checkField(reqData, 'profitAccount'),
            'investTotalMoney': this._formateService.checkField(reqData, 'totalInvestMoney'),
            'publicBook': this._formateService.checkField(termData, 'self'),
            'typeInd': this._formateService.checkField(termData, 'typeInd'),
            'usastaNote': this._formateService.checkField(termData, 'usaSignNote'),
            'signAgr': this._formateService.checkField(termData, 'signAgr')
        };
        return update_req;
    }

}
