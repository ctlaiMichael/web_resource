/**
 * API: SPEC05010201-台幣總覽
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC05010201Req } from './spec05010201-req';
// -- Other Library -- //

@Injectable()
export class SPEC05010201ApiService extends ApiBaseService {
    protected serviceId = 'SPEC05010201'; // API Name

    /**
     * 取得列表資料
     * @param reqData 條件
     *      accountId 帳號
     *      currency 幣別
     *      startDate 起始日
     *      endDate 結束日
     * @param option 其他連線參數控制
     * @param paginator 分頁物件
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC05010201Req, {
            'reqData': reqData
        });
        // 欄位檢核

        // 修改request
        // let update_req = {
        // };
        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    emptyAct: false, // 無帳戶資料
                    totalData: '', // 總計算資訊
                    accountInfo: [] // 帳戶別加總
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                // 頁數整理
                output.page_info = resObj.getPagecounter();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                // 台幣總計
                output.totalData = this._formateService.checkObjectList(jsonObj, 'totalBalance');
                // 帳戶別加總
                output.accountInfo = this._formateService.checkObjectList(jsonObj, 'accountInfo');
                // tslint:disable-next-line:radix
                if (!this._checkService.checkEmpty(output.totalData, true, true)) {
                    // 無資產
                    if (!output.accountInfo || !(output.accountInfo instanceof Array) || output.accountInfo.length < 1) {
                        output.emptyAct = true;
                    } else {
                        // 無資產
                        let total_act = 0;
                        output.accountInfo.forEach((item) => {
                            let tmp_act = this._formateService.checkObjectList(item, 'account', 'array');
                            if (!!tmp_act && tmp_act.length > 0) {
                                total_act += tmp_act.length;
                            }
                        });
                        if (total_act <= 0) {
                            output.emptyAct = true;
                        }
                    }
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
