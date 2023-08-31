/**
 * API:  SPEC12030102-信用卡繳卡費(交易)
 */
import { Injectable } from '@angular/core';
import { ApiTransBaseService } from '@api/base/api-trans-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC12030102Req } from './spec12030102-req';
// -- Other Library -- //

@Injectable()
export class SPEC12030102ApiService extends ApiTransBaseService {
    protected serviceId = 'SPEC12030102';

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    sendData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC12030102Req, {
            'reqData': reqData
        });
        this._logger.log("SPEC12030101, sendObj:", sendObj);
        this._logger.log("SPEC12030101, reqData:", reqData);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    infoData: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.statusObj = resObj.getResMsg();

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


}
