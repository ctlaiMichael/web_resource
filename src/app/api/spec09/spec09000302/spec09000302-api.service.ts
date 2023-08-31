/**
 * API:  SPEC09000302-非約定轉出帳號查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC09000302Req } from './spec09000302-req';
// -- Other Library -- //

@Injectable()
export class SPEC09000302ApiService extends ApiBaseService {
    protected serviceId = 'SPEC09000302'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object, type?: string): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC09000302Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    transOutAcctData: [], // 轉出帳號資料
                    type: '2' // 非約定轉出帳號
                };
                this._logger.log("resObj:", resObj);
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                output.transOutAcctData = this._formateService.checkObjectList(output.infoData, 'transOutAcctData');

                if (!this._checkService.checkEmpty(output.transOutAcctData, true)) {
                    this._logger.log("into EMPTY");
                    // 查無帳戶資料
                    return Promise.reject({
                        title: 'ERROR.TITLE',
                        content: 'TWD_TRANSFER.MSG.NOT_AGREED_ERROR'
                      });
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

    private formateDetail(setData) {
        let output = {
            currentData: [], // 帳戶明細...等(帳號資訊)
            timeDeposit: [] // 定存(帳號資訊)
        };
        if (setData.hasOwnProperty('resContent') && setData.resContent.length != 0) {
            this._logger.log("formateDetail, has resContent");
            setData.resContent.forEach(item => {
                // 帳戶明細...等(帳號資訊)
                if (item.title == 'current') {
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
