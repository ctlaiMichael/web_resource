/**
 * API:  SPEC00040201-轉出帳號查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC00040201Req } from './spec00040201-req';
// -- Other Library -- //

@Injectable()
export class SPEC00040201ApiService extends ApiBaseService {
    protected serviceId = 'SPEC00040201'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object, type?: string): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC00040201Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    transOutData: [], // 轉出帳號資料
                    defaultAcct: {} // 預設第一筆轉出帳號
                };
                this._logger.log("resObj:", resObj);
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                output.transOutData = this._formateService.checkObjectList(output.infoData, 'transOutAcctData');
                output.defaultAcct = output.transOutData[0]; // 塞入預設第一筆
                this._logger.log("getData, output:", output);
                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(errorObj);
            }
        );
    }

    /**
     * 整理 可用餘額資料資料,對應轉出帳號, 回傳「轉出帳號資料」
     * EX: let aaa = { '7775565859':  '750000','7778556583': '1020000' };
     * @param transOutData 轉出帳號資料
     * @param balanceData 可用餘額資料
     */
    private formateTransData(transData, balanceData) {
        let output = [];
        let temp = {};
        balanceData.forEach(item => {
            temp[item.accountId] = item['balance']
        });
        this._logger.log("formateBalanceData, temp:", this._formateService.transClone(temp));
        transData.forEach(item => {
            if (typeof temp[item.accountId] != 'undefined') {
                item['balance'] = temp[item.accountId];
                // 無法對應, transOutData的balance欄位為空
            } else {
                item['balance'] = '';
            }
        });
        output = transData;
        this._logger.log("formateBalanceData, output:", this._formateService.transClone(output));
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
