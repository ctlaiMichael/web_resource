/**
 * API:  SPEC11030101-基金轉換編輯
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11030101Req } from './spec11030101-req';
// -- Other Library -- //

@Injectable()
export class SPEC11030101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC11030101'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11030101Req, {
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
                    statusObj: {},
                    infoData: {},
                    fundData: [],
                    acctList: [],
                    defaultAcct: {
                        accountID: '',
                        nickName: '',
                        balance: ''
                    }
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.statusObj = resObj.getResMsg();
                output.fundData = this._formateService.checkObjectList(output.infoData, 'fundData');
                output.acctList = this._formateService.checkObjectList(output.infoData, 'acctList');
                if(output.acctList.length > 0) {
                    let defaultAcct = this.formateDefaultAcct(output.acctList);
                    output.defaultAcct.accountID = defaultAcct.accountID;
                    output.defaultAcct.nickName = defaultAcct.nickName;
                    output.defaultAcct.balance = defaultAcct.balance;
                }

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC11030101_SERVER_REP');
                }
                if (!this._checkService.checkEmpty(output.infoData, true)) {
                    // 查無資料
                    return this.returnError({}, 'EMPTY_RANGE_API');
                }
                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(this.returnTransError(errorObj));
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

    // 處理預設帳號
    private formateDefaultAcct(acctList) {
        let output = {
            accountID: '',
            nickName: '',
            balance: ''
        };
        output.accountID = acctList[0]['accountID'];
        output.balance = acctList[0]['balance'];
        output.nickName = acctList[0]['nickName'];
        return output;
    }

}
