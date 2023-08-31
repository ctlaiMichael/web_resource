/**
 * API: SPEC11060301-理財妙管家修改-交易頁
 */
import { Injectable } from '@angular/core';
import { ApiTransBaseService } from '@api/base/api-trans-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11060301Req } from './spec11060301-req';
// -- Other Library -- //

@Injectable()
export class SPEC11060301ApiService extends ApiTransBaseService {

    protected serviceId = 'SPEC11060301';

    /**
     * 取得列表資料
     * @param reqData 條件
     */
    sendData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11060301Req, {
            'reqData': reqData
        });

        // 修改request
        // let termData = this._formateService.checkField(reqData, 'termData');
        let update_req = {
            'license': this._formateService.checkField(reqData, 'license'),
            'fundCode': this._formateService.checkField(reqData, 'fundCode'),
            'oldStopBene': this._formateService.checkField(reqData, 'oldStopBene'),
            'oldStopLoss': this._formateService.checkField(reqData, 'oldStopLoss'),
            'accountID': this._formateService.checkField(reqData, 'accountID'),
            'inputBene': this._formateService.checkField(reqData, 'inputBene'),
            'inputLoss': this._formateService.checkField(reqData, 'inputLoss')
        };
        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    infoData: {}
                    // termData: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.statusObj = resObj.getResMsg();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
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
