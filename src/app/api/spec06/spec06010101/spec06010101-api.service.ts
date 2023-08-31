/**
 * API: SPEC06010101-國外匯入匯款查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC06010101Req } from './spec06010101-req';
// -- Other Library -- //

@Injectable()
export class SPEC06010101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC06010101'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC06010101Req, {
            'reqData': reqData
        });
        // 欄位檢核
        let start_date = this._formateService.checkField(reqData, 'startDate');
        let end_date = this._formateService.checkField(reqData, 'endDate');
        start_date = this._formateService.transDate(start_date, 'yyyy-MM-dd');
        end_date = this._formateService.transDate(end_date, 'yyyy-MM-dd');
        if (!this._checkService.checkEmpty(start_date, true) || !this._checkService.checkEmpty(end_date, true)) {
            return this.returnError({}, 'REQ_ERROR');
        }

        // 修改request
        let update_req = {
            start: start_date,
            end: end_date
        };
        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: []
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                output.data = this._formateService.checkObjectList(output.infoData, 'rowData');

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
