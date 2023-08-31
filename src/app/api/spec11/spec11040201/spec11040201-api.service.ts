/**
 * API: SPEC11040201-台幣單筆申購-編輯頁
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11040201Req } from './spec11040201-req';
// -- Other Library -- //

@Injectable()
export class SPEC11040201ApiService extends ApiBaseService {

    protected serviceId = 'SPEC11040201';


    /**
     * 取得列表資料
     * @param reqData 條件
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11040201Req, {
            'reqData': reqData
        });

        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: [], // 扣款帳號資料
                    profitData: [], // 配息入帳帳號資料
                    // termData: {} // 條款相關資訊
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                output.data = this._formateService.checkObjectList(jsonObj, 'investAccountList');
                // let investAcct = this._formateService.checkObjectList(jsonObj, 'investAccountList');
                // output.data = this.formateAcct(jsonObj, investAcct);
                output.profitData = this._formateService.checkObjectList(jsonObj, 'profitAccountList');
                // output.termData = this._formateService.checkObjectList(jsonObj, 'term');

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC11040201_SERVER_REP');
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

    /**
     * 
     * @param infoData 查詢資訊, 儲存最低高金額
     * @param acct 扣款帳號清單
     */
    private formateAcct(infoData, acct) {
        let investAcct = [];
        let limitMaxAmt = this._formateService.checkField(infoData, 'limitMaxAmt');
        let limitMinAmt = this._formateService.checkField(infoData, 'limitMinAmt');
        acct.forEach(item => {
            item['limitMaxAmt'] = limitMaxAmt;
            item['limitMinAmt'] = limitMinAmt;
            investAcct.push(item);
        });
        return investAcct;
    }

}
