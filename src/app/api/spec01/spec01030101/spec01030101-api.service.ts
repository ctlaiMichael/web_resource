/**
 * API: SPEC01030101Req-版本同步檢查
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC01030101Req } from './spec01030101-req';
// -- Other Library -- //

@Injectable()
export class SPEC01030101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC01030101'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 版本同步檢查
     */
    getData(reqData?: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC01030101Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {}
                };
                // logger.error('api resobj',resObj);
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                // if(resObj['error'] && resObj['error']['resFlag'] && resObj['error']['resFlag']=='1'){
                //     return Promise.reject(output);
                // }
                let jsonObj = resObj.getData();
                output.infoData = jsonObj;             

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
