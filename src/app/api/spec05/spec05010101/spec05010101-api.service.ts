/**
 * API: SPEC05010101--帳戶總覽
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC05010101Req } from './spec05010101-req';
// -- Other Library -- //

@Injectable()
export class SPEC05010101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC05010101'; // API Name

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
        let sendObj = new ApiRequestOption(SPEC05010101Req, {
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
                    allData: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                let jsonObj = resObj.getData();
                output.allData = jsonObj;
                if (!output.status) {
                    // 中台認定資料錯誤
                    this.errorHandler.returnError(output.error, 'SPEC05010101_SERVER_BUSINESS_ERROR');
                } else {
                    return Promise.resolve(output);
                }
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
