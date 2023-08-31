/**
 * API:  SPEC11020101-基金贖回編輯(台幣)
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11020101Req } from './spec11020101-req';
// -- Other Library -- //

@Injectable()
export class SPEC11020101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC11020101'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11020101Req, {
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
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                let acctList = this._formateService.checkObjectList(output.infoData, 'accountList');
                output.data = this.formateShowCcy(acctList);

                // 單位數分配中,無法進行贖回 中台回應resFlag:1 處理
                if (!output.status) {
                    return this.returnError({
                        content: output.msg
                    }, 'EMPTY');
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

    // 處理顯示幣別
    private formateShowCcy(accountList) {
        let output = [];
        if (accountList.length > 0) {
            accountList.forEach(item => {
                item['showCcy'] = 'N'; // 台幣於帳號選單不顯示幣別
                output.push(item);
            });
        }
        return output;
    }

}
