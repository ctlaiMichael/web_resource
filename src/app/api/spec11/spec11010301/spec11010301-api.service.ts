/**
 * API:  SPEC11010301-投資合計和組合分析
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11010301Req } from './spec11010301-req';
// -- Other Library -- //

@Injectable()
export class SPEC11010301ApiService extends ApiBaseService {
    protected serviceId = 'SPEC11010301'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11010301Req, {
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
                    riskData: [], // 風險的PIECHART數據資料
                    currencyData: [], // 幣別的PIECHAR數據資料
                    regionData: [], // 產品的PIECHAR數據資料
                    ccyList: [], // 各幣別匯率
                    sumupInfo: [], // 合計資料,與總覽(我的投資共用)
                    alShow: [] // 畫面顯示的投資組合分析查詢資料
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                // 中台資料結構有換, 不會包一層outputData
                // let temp = {};
                // if (jsonObj.hasOwnProperty('outputData')) {
                //     temp = jsonObj['outputData'];
                // }
                output.riskData = this._formateService.checkObjectList(jsonObj, 'riskData');
                output.currencyData = this._formateService.checkObjectList(jsonObj, 'currencyData');
                output.regionData = this._formateService.checkObjectList(jsonObj, 'regionData');
                output.ccyList = this._formateService.checkObjectList(jsonObj, 'ccyList');
                output.sumupInfo = this._formateService.checkObjectList(jsonObj, 'sumupInfo');
                output.alShow = this._formateService.checkObjectList(jsonObj, 'alShow');

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC11010301_SERVER_REP');
                }

                if (!this._checkService.checkEmpty(output.infoData, true)) {
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
