/**
 * API:  SPEC12010201-信用卡帳單期間查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC12010201Req } from './spec12010201-req';
import { DateUtil } from '@util/formate/date/date-util';
// -- Other Library -- //

@Injectable()
export class SPEC12010201ApiService extends ApiBaseService {
    protected serviceId = 'SPEC12010201';

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC12010201Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: [],
                    rangeData: []
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                let modifyData = this.modifyRowData(output.infoData);
                output.data = modifyData.data;
                output.rangeData = modifyData.rangeData;

                this._logger.log("SPEC12010201ApiService, output.rangeData:", output.rangeData);
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

    private modifyRowData(jsonObj: any) {
        let output = {
            data: [],
            rangeData: []
        };
        let rowData = this._formateService.checkObjectList(jsonObj, 'rowData', 'array');
        if (!rowData || rowData.length <= 0) {
            // 查無物件存在
            return output;
        }
        rowData.forEach(item => {
            let tmp_data = item;
            let selectedMonth = this._formateService.checkField(item, 'selectedMonth');
            let tmp_dateobj = DateUtil.getDateObj(selectedMonth + '-01', false);
            if (!!tmp_dateobj && typeof tmp_dateobj == 'object') {
                tmp_data['month'] = this._formateService.checkField(tmp_dateobj, 'month');
            } else {
                tmp_data['month'] = '';
            }
            output.data.push(tmp_data);
        });
        
        let formateObj = { sort: 'selectedMonth', reverse: 'DESC' };
        output.rangeData = this._formateService.transArraySort(output.data, formateObj);

        return output;
    }

}
