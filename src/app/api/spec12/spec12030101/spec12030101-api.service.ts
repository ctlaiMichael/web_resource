/**
 * API:  SPEC12030101-信用卡繳卡費(本期帳單資訊)
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC12030101Req } from './spec12030101-req';
// -- Other Library -- //

@Injectable()
export class SPEC12030101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC12030101';

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC12030101Req, {
            'reqData': reqData
        });
        this._logger.log("SPEC12010302, sendObj:", sendObj);
        this._logger.log("SPEC12010302, reqData:", reqData);
        // 欄位檢核
        // let year = reqData['selectedMonth'].substring(0,4);
        // let month = reqData['selectedMonth'].substring(4,8);
        // let selectedMonth = year + '-' + month;

        // 修改request
        // let update_req = {
        //     selectedMonth: selectedMonth
        // };
        // sendObj.modifyRequest(update_req);

        this._logger.log("modifyRequest, sendObj:", this._formateService.transClone(sendObj));
        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: [],
                    cardData: [],
                    swiperChangeData: {} // 滑動信卡切換資料用
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                output.data = this._formateService.checkObjectList(output.infoData, 'rowData');
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
