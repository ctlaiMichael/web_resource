/**
 * API: SPEC03030101-已綁定裝置清單查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC03030101Req } from './spec03030101-req';
// -- Other Library -- //

@Injectable()
export class SPEC03030101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC03030101'; // API Name

    getData(reqData?: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC03030101Req, {
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
                    statusObj: {},    
                    responseTime: '', // 查詢回應時間
                    dataTime: '', // 資料時間
                    data: [],
                    deviceData: [],
                    deviceList: {}, // 全部裝置object
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.dataTime = this._formateService.checkField(resData, 'dataTime');
                let modify_data = this._formateService.checkObjectList(resData, 'rowData');
                if (modify_data) {
                    let tempFastData = this.localStorageService.getObj('fastData');
                    let uuid = this.device.getDevicesInfo('uuid');
                    output.data = modify_data;
                    output.data.forEach(item => {
                        // 需要資料整理
                        let sub_list = {
                            uuid: this._formateService.checkField(item, 'uuid'),
                            deviceName: this._formateService.checkField(item, 'deviceName'),
                            platform: this._formateService.checkField(item, 'platform'),
                            checkPlatform: this._formateService.checkField(item, 'platform').toUpperCase()
                        };

                        // 防止中台資訊與App資訊不同步
                        // 如果App沒有裝置綁定資訊，排除中台回傳的此裝置的綁定資訊
                        if (sub_list.uuid == uuid) {
                            if (!!tempFastData && tempFastData != null) {
                                output.deviceList[sub_list.uuid] = sub_list;
                                output.deviceData.push(sub_list);
                            }
                        } else {
                            output.deviceList[sub_list.uuid] = sub_list;
                            output.deviceData.push(sub_list);
                        }
                        
                    });
                }

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC03030101_SERVER_REP');
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
