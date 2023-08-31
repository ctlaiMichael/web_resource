/**
 * API: SPEC09020101-綜存開戶約定
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC09020201Req } from './spec09020201-req';

// -- Other Library -- //

@Injectable()
export class SPEC09020201ApiService extends ApiBaseService {
    protected serviceId = 'SPEC09020201'; // API Name

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
    getData(reqData: object, option?: object, paginator?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC09020201Req, {
            'reqData': reqData,
            'paginator': paginator
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: [], // 資訊(detail)
                    keyData: [] // 以帳號為key值對應
                    // totalData: {}, // 總計算資訊
                    // accountData: {}, // 帳號相關資訊
                    // page_info: {} // 分頁相關
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                // 頁數整理
                // output.page_info = resObj.getPagecounter();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                // 台幣資訊(detail)
                output.data = this._formateService.checkObjectList(jsonObj, 'outPutData');
                // if(output.data.length != 0) {
                //     output.keyData = this.doFormateAcct(output.data);
                // }
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

    private doFormateAcct(setData) {
        let output = {};
        setData.forEach(item => {
            output[item.accountId] = item;
        });
        return output;
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------


}
