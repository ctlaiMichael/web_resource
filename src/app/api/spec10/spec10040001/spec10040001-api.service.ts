/**
 * API: SPEC10040001-OBU存款利率查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC10040001Req } from './spec10040001-req';
// -- Other Library -- //

@Injectable()
export class SPEC10040001ApiService extends ApiBaseService {
    protected serviceId = 'SPEC10040001'; // API Name

    getData(reqData?: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC10040001Req, {
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
                    responseTime: '', // 查詢回應時間
                    dataTime: '', // 資料時間
                    data: [],
                    currencyData: [],
                    list: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.dataTime = this._formateService.checkField(resData, 'dataTime');

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC10040001_SERVER_REP');
                }
                let modify_data = this._formateService.checkObjectList(resData, 'rowData');
                if (modify_data) {
                    output.data = modify_data;
                    output.data.forEach(item => {
                        // 需要資料整理
                        let sub_list = {
                            order: -1,
                            order_app: -1,
                            currencyCode: this._formateService.checkField(item, 'currencyCode'),
                            currencyCodeShow: this._formateService.checkField(item, 'currencyCode'),
                            currencyName: this._formateService.checkField(item, 'currencyName'),
                            currencyNameShow: this._formateService.checkField(item, 'currencyName'),
                            data: this._formateService.checkObjectList(item, 'data')
                        };
                        if (sub_list.currencyCode) {

                            // 排序處理
                            sub_list.order_app = this._formateService.getCurrencyOrder(sub_list.currencyCode, 'OBU');
                            let order_server = this._formateService.checkField(item, 'order');
                            if (!!order_server) {
                                // tslint:disable-next-line:radix
                                sub_list.order = parseInt(order_server);
                            }
                            item['order_app'] = sub_list.order_app;
                            item['order'] = sub_list.order;

                            output.list[sub_list.currencyCode] = sub_list;
                            output.currencyData.push(sub_list);
                        }
                    });

                    // 排序處理(目前以APP內設定為主,再以server為主)
                    output.currencyData = this._formateService.transArraySort(output.currencyData
                        , { sort: ['order_app', 'order'], reverse: 'ASC' });
                }

                if (!this._checkService.checkEmpty(output.data, true)) {
                    return this.returnError({
                        content: 'ERROR.EMPTY'
                    }, 'SPEC10040001_SERVER_REP');
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
