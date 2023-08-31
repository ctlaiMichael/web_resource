/**
 * API: SPEC09020303-定存解除
 */
import { Injectable } from '@angular/core';
import { ApiTransBaseService } from '@api/base/api-trans-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC09020303Req } from './spec09020303-req';

// -- Other Library -- //

@Injectable()
export class SPEC09020303ApiService extends ApiTransBaseService {
    protected serviceId = 'SPEC09020303'; // API Name

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
        let sendObj = new ApiRequestOption(SPEC09020303Req, {
            'reqData': reqData,
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    infoData: {},
                    // data: [], // 資訊(detail)
                    // totalData: {}, // 總計算資訊
                    // accountData: {}, // 帳號相關資訊
                    // page_info: {} // 分頁相關
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();
                output.statusObj = {...output.statusObj, ...{
                    title_params: {
                        param: 'TIME_DEPOSIT.AUTO_CARRY_OVER.DELETE'
                    }
                }};
                // 頁數整理
                // output.page_info = resObj.getPagecounter();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                // 台幣資訊(detail)
                // output.data = this._formateService.checkObjectList(jsonObj, 'outPutData');

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     // 查詢期間無交易資料
                //     return this.returnError({}, 'EMPTY_RANGE_API');
                // }

                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(this.returnTransError(errorObj));
                // return Promise.reject(errorObj);
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
