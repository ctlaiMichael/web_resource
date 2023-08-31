/**
 * API: SPEC11060201-理財妙管家修改
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11060201Req } from './spec11060201-req';
// -- Other Library -- //

@Injectable()
export class SPEC11060201ApiService extends ApiBaseService {

    protected serviceId = 'SPEC11060201';

    /**
     * 取得列表資料
     * @param reqData 條件
     */
    sendData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11060201Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    infoData: {},
                    faccountProfitData: [], // 帳號資料
                    defaultAcct: '' // 預設帳號
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                output.faccountProfitData = this._formateService.checkObjectList(jsonObj, 'faccountProfitData');
                let defaultAcct = this._formateService.checkField(jsonObj, 'selectedProfitAccountID');
                // 有預設帳號帶入
                if(typeof defaultAcct != 'undefined' && defaultAcct != '') {
                    output.defaultAcct = defaultAcct;
                // 沒預設帳號帶入第一筆
                } else {
                    if(typeof output.faccountProfitData != 'undefined' && output.faccountProfitData.length > 0) {
                        output.defaultAcct = output.faccountProfitData[0]['accno'];
                    }
                }
                let errorMsg = output.statusObj.errorMsg;
                if (output.statusObj.resFlag == '1') {
                    return Promise.reject({
                        title: 'ERROR.TITLE',
                        content: errorMsg
                    });
                }

                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(errorObj);
            }
        );
    }

    modifyData(reqData: object, option?: object) {
        return reqData;
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------


}
