/**
 * API:  SPEC11050202-定期定額編輯(外幣)
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11050202Req } from './spec11050202-req';
// -- Other Library -- //

@Injectable()
export class SPEC11050202ApiService extends ApiBaseService {
    protected serviceId = 'SPEC11050202'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object, type?: string): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11050202Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    accountList: [],
                    defaultAcct: { // 預設帳號
                        accountID: '',
                        amount: ''
                    }
                };
                this._logger.log("resObj:", resObj);
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                output.accountList = this._formateService.checkObjectList(output.infoData, 'accountList');
                if (typeof output.accountList == 'object' && output.accountList.length > 0) {
                    let defaultData = this.formateDefaultAcct(output.infoData, output.accountList);
                    output.defaultAcct.accountID = defaultData.accountID;
                    output.defaultAcct.amount = defaultData.amount;
                }
                this._logger.log("getData, output:", output);
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

    private formateDefaultAcct(infoData, accountList) {
        let output = {
            accountID: '',
            amount: ''
        };
        let defaultAcct = this._formateService.checkField(infoData, 'payAccount');
        if (defaultAcct != '') {
            accountList.forEach(item => {
                if (defaultAcct == item['accountID']) {
                    output.accountID = item['accountID'];
                    output.amount = item['amount'];
                }
            });
        }
        // 若無預設(帳號對應不到列表清單)
        if (accountList.length > 0 && output.accountID == '' && output.amount == '') {
            let accountID = this._formateService.checkField(accountList[0], 'accountID');
            let amount = this._formateService.checkField(accountList[0], 'amount');
            output.accountID = accountID;
            output.amount = amount;
        }
        return output;
    }
}
