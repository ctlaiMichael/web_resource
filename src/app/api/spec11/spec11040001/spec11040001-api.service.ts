/**
 * API: SPEC11040001-基金條款相關
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11040001Req } from './spec11040001-req';
// -- Other Library -- //

@Injectable()
export class SPEC11040001ApiService extends ApiBaseService {

    protected serviceId = 'SPEC11040001';

    /**
     * 取得列表資料
     * @param reqData 條件
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11040001Req, {
            'reqData': reqData
        });

        // 修改request
        let req = this._formateService.checkField(reqData, 'reqData');
        let update_req = {
            'fundCode': this._formateService.checkField(req, 'fundCode'),
            'fundCcy': this._formateService.checkField(req, 'fundCcy'),
            "accountID": this._formateService.checkField(req, 'investAccount'),
            'fundAmt': this._formateService.checkField(req, 'investMoney'),
            'hasProfit': this._formateService.checkField(req, 'hasProfit'),
            "profitAccountID": this._formateService.checkField(req, 'profitAccountID'),
            "accountCcy": this._formateService.checkField(req, 'accountCcy'),
            "investCcyType": this._formateService.checkField(req, 'investCcyType')
        };
        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    errorObj: {},
                    infoData: {},
                    termData: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.errorObj = resObj.getResMsg();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC11040001_SERVER_REP');
                }
                if(!this._checkService.checkEmpty(output.infoData, true)) {
                    // 查無資料
                    return this.returnError({}, 'EMPTY_RANGE_API');
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
