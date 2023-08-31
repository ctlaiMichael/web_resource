/**
 * API:  SPEC00010101-查詢銀行代號
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC00010101Req } from './spec00010101-req';
// -- Other Library -- //

@Injectable()
export class SPEC00010101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC00010101'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC00010101Req, {
            'reqData': reqData
        });
        // 欄位檢核
        // 修改request
        // let update_req = {};
        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: []
                };
                this._logger.log("resObj:", resObj);
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                output.data = this._formateService.checkObjectList(output.infoData, 'rowData');

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     this._logger.log("into EMPTY");
                //     // 查詢期間無交易資料
                //     return this.returnError({}, 'EMPTY_RANGE_API');
                // }

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

    private formateDetail(setData) {
        let output = {
            currentData: [], // 帳戶明細...等(帳號資訊)
            timeDeposit: [] // 定存(帳號資訊)
        };
        if(setData.hasOwnProperty('resContent') && setData.resContent.length != 0) {
            this._logger.log("formateDetail, has resContent");
            setData.resContent.forEach(item => {
                // 帳戶明細...等(帳號資訊)
                if(item.title == 'current') {
                    output.currentData = item.rowData;
                } else {
                    output.timeDeposit = item.rowData;
                }
            });
        }
        this._logger.log("formateDetail, output:", output);
        return output;
    }


}
