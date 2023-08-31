/**
 * API: SPEC08020101-貸款服務-本金利息明細查詢(本金)
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC08020101Req } from './spec08020101-req';
// -- Other Library -- //

@Injectable()
export class SPEC08020101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC08020101'; // API Name

    /**
     * 取得列表資料
     * @param reqData 條件
     *      type 類別
     *      accountId 帳號
     *      startDate 起始日
     *      endDate 結束日
     * @param option 其他連線參數控制
     * @param paginator 分頁物件
     */
    getPageData(reqData: object, option?: object, paginator?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC08020101Req, {
            'reqData': reqData,
            'paginator': paginator
        });
        // 欄位檢核
        let start_date = this._formateService.checkField(reqData, 'startDate');
        let end_date = this._formateService.checkField(reqData, 'endDate');
        let type = this._formateService.checkField(reqData, 'type');
        let accountId = this._formateService.checkField(reqData, 'accountId');
        // start_date = this._formateService.transDate(start_date, 'yyyy-MM-dd');
        // end_date = this._formateService.transDate(end_date, 'yyyy-MM-dd');
        // 起訖日因需忽略檢核，因此改為送出api前改為固定日期，起日:01-01,迄日:12-31
        start_date = start_date.substring(0,4) + '-01-01';
        end_date = end_date.substring(0,4) + '-12-31';

        if (!this._checkService.checkEmpty(start_date, true)
            || !this._checkService.checkEmpty(end_date, true)
            || !this._checkService.checkEmpty(type, true)
            || !this._checkService.checkEmpty(accountId, true)
        ) {
            return this.returnError({}, 'REQ_ERROR');
        }

        // 修改request
        let update_req = {
            'accountId': accountId,
            'dateRange': {
                'start': start_date,
                'end': end_date
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
                    data: [], // 本金
                    page_info: {} // 分頁相關
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                // 頁數整理
                output.page_info = resObj.getPagecounter();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                // 本金明細資訊
                output.data = this._formateService.checkObjectList(jsonObj, 'rowData');
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
