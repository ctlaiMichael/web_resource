/**
 * API: SPEC11010101-投資理財總覽
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11010101Req } from './spec11010101-req';
// -- Other Library -- //

@Injectable()
export class SPEC11010101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC11010101';


    /**
     * 取得資料
     * @param reqData 條件
     * @param option 其他連線參數控制
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11010101Req, {
            'reqData': reqData
        });
        
        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    data: {
                        "totccy": "TWD", // 信託幣別
                        "haveFundAllow": true, // 有無信託開戶
                        "emptyFund": false, // 無基金資料
                        "totosamt": "", // 信託金額
                        "totPrice": "", // 參考現值
                        "noProc": "", // 未實現損益
                        "apdint": "", // 累計配息
                        "baoChou": "", // 報酬率
                        "intretn": "" // 含息報酬率
                    }
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                let jsonObj = resObj.getData();
                output.data.totccy = this._formateService.checkField(jsonObj, 'totccy');
                output.data.totosamt = this._formateService.checkField(jsonObj, 'totosamt');
                output.data.totPrice = this._formateService.checkField(jsonObj, 'totPrice');
                output.data.noProc = this._formateService.checkField(jsonObj, 'noProc');
                output.data.apdint = this._formateService.checkField(jsonObj, 'apdint');
                output.data.baoChou = this._formateService.checkField(jsonObj, 'baoChou');
                output.data.intretn = this._formateService.checkField(jsonObj, 'intretn');
                if (!output.status || (!output.data.totosamt && !output.data.totPrice)) {
                    output.data.emptyFund = true;
                }
                let tmp_fund_allow = this._formateService.checkField(jsonObj, 'haveFundAllow');
                if (tmp_fund_allow == 'N') {
                    output.data.haveFundAllow = false;
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
