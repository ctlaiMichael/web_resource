/**
 * API: SPEC05030101-帳戶明細查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC05030101Req } from './spec05030101-req';
// -- Other Library -- //

@Injectable()
export class SPEC05030101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC05030101'; // API Name

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
    getPageData(reqData: object, option?: object, paginator?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC05030101Req, {
            'reqData': reqData,
            'paginator': paginator
        });
        // 欄位檢核
        let start_date = this._formateService.checkField(reqData, 'startDate');
        let end_date = this._formateService.checkField(reqData, 'endDate');
        let currencyCode = this._formateService.checkField(reqData, 'currencyCode');
        if (!this._checkService.checkEmpty(currencyCode, true)) {
            currencyCode = this._formateService.checkField(reqData, 'currency'); // [TODO:] 之後調整
        }
        let accountId = this._formateService.checkField(reqData, 'accountId');
        start_date = this._formateService.transDate(start_date, 'yyyy-MM-dd');
        end_date = this._formateService.transDate(end_date, 'yyyy-MM-dd');

        if (!this._checkService.checkEmpty(start_date, true) 
            || !this._checkService.checkEmpty(end_date, true)
            || !this._checkService.checkEmpty(currencyCode, true)
            || !this._checkService.checkEmpty(accountId, true)
        ) {
            return this.returnError({}, 'REQ_ERROR');
        }

        // 修改request
        let update_req = {
            'account': {
                'accountId': accountId,
                'currencyCode': currencyCode
            },
            'dateRange': {
                start: start_date,
                end: end_date
            }
        };
        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: [], // 資訊(detail)
                    totalData: {}, // 總計算資訊
                    accountData: {}, // 帳號相關資訊
                    page_info: {} // 分頁相關
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                // 頁數整理
                output.page_info = resObj.getPagecounter();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                // 台幣資訊(detail)
                output.data = this._formateService.checkObjectList(jsonObj, 'rowData');
                // 台幣總計
                output.totalData = this._formateService.checkObjectList(jsonObj, 'totalData');
                // 帳號相關
                output.accountData = this._formateService.checkObjectList(jsonObj, 'account');

                if (!this._checkService.checkEmpty(output.data, true)) {
                    // 查詢期間無交易資料
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
