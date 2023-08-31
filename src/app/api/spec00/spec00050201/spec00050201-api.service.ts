/**
 * API: SPEC00050201Req-條款查詢 html範本
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC00050201Req } from './spec00050201-req';
// -- Other Library -- //

@Injectable()
export class SPEC00050201ApiService extends ApiBaseService {
    protected serviceId = 'SPEC00050201'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 其他連線參數控制
     */
    getData(reqData?: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC00050201Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: []
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;          
                output.data = this._formateService.checkObjectList(jsonObj, 'rowData');
                if(!this._checkService.checkEmpty(output.data, true)) {
                    // 查無資料
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
