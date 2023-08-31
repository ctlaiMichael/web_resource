/**
 * API:  SPEC09000305-台幣轉帳確認
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC09000305Req } from './spec09000305-req';
// -- Other Library -- //

@Injectable()
export class SPEC09000305ApiService extends ApiBaseService {
    protected serviceId = 'SPEC09000305'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    sendData(reqData: object, option?: object, type?: string): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC09000305Req, {
            'reqData': reqData
        });
        // logger.log("SPEC09000305ApiService sendData, reqData:", reqData);

        // 修改request
        let update_req = {
            'transType': reqData['transType'],
            'transOutAcc': reqData['outAccount'],
            'transInAcc': reqData['inAccount'],
            'bankCode': reqData['bankCode'],
            'amount': reqData['amount'],
            'remark': reqData['myNote'],
            'comment': reqData['forNote'],
            'email': reqData['myMail'],
            'otherEmail': reqData['otherMail']
        };
        sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {}
                };
                this._logger.log("resObj:", resObj);
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     this._logger.log("into EMPTY");
                //     // 查詢期間無交易資料
                //     return this.returnError({}, 'EMPTY_RANGE_API');
                // }

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
