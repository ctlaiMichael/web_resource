/**
 * API: SPEC11050101-定期定額
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11050101Req } from './spec11050101-req';
// -- Other Library -- //

@Injectable()
export class SPEC11050101ApiService extends ApiBaseService {

    protected serviceId = 'SPEC11050101';


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
        let sendObj = new ApiRequestOption(SPEC11050101Req, {
            'reqData': reqData,
            'paginator': paginator,
        });

        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: [], // 資訊(detail)
                    page_info: {} // 分頁相關
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                // 頁數整理
                output.page_info = resObj.getPagecounter();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                // let temp = {};
                // if(jsonObj.hasOwnProperty('outputData')) {
                //     temp = jsonObj['outputData'];
                // }
                // //   現職查詢(detail)
                let rowData = this._formateService.checkObjectList(jsonObj, 'rowData');
                output.data = this.formateDate(rowData);
                // output.data = test.roiData;

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

    /**
     * 將日期處理為 ,空格 EX: '01, 02, 15'
     * @param setData 中台回傳之rowData
     */
    private formateDate(setData) {
        let output = [];
        if (setData.length > 0) {
            setData.forEach(item => {
                let date = '';
                let chgDate = this._formateService.checkField(item, 'chgDate');
                // '02,14'
                if (chgDate.indexOf(',') > 0) {
                    let temp = chgDate.split(',');
                    temp.forEach((tempItem, index) => {
                        date += index < (temp.length - 1) ? tempItem + ', ' : tempItem;
                    });
                } else {
                    date = chgDate;
                }
                item['formateDate'] = date;
                output.push(item);
            });
        }
        return output;
    }

}
