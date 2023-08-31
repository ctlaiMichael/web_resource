/**
 * API:  SPEC12010202-信用卡帳單查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC12010202Req } from './spec12010202-req';
// -- Other Library -- //

@Injectable()
export class SPEC12010202ApiService extends ApiBaseService {
    protected serviceId = 'SPEC12010202';

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC12010202Req, {
            'reqData': reqData
        });
        // this._logger.log("SPEC12010302, sendObj:", sendObj);
        // this._logger.log("SPEC12010302, reqData:", reqData);
        // 欄位檢核
        let tmp_month = this._formateService.checkField(reqData, 'selectedMonth');
        // let year = tmp_month.substring(0, 4);
        // let month = tmp_month.substring(4, 8);
        // let selectedMonth = year + '-' + month;

        // 修改request
        let update_req = {
            'selectedMonth': tmp_month
        };
        sendObj.modifyRequest(update_req);

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
                output.infoData['printBarCode'] = (output.infoData['printBarCode'] == 'Y') ? true : false;
                if (!output.status) {
                    // 查詢期間無交易資料(中台認定業務錯誤)
                    return this.returnError(output.error, 'EMPTY_RANGE_API');
                }

                
                output.data = this._formateService.checkObjectList(output.infoData, 'rowData');
                output.cardData = this._formateService.checkObjectList(output.infoData, 'cardData');
                let have_cardata = (this._checkService.checkEmpty(output.cardData, true)) ? true : false;
                let have_rowdata = (this._checkService.checkEmpty(output.data, true)) ? true : false;
                if (!!have_cardata) {
                    output.cardData.forEach(item => {
                        let cardLst = this._formateService.checkField(item, 'cardLst');
                        if (!!cardLst) {
                            output.swiperChangeData[cardLst] = this._formateService.checkObjectList(item, 'cardRow');
                        }
                    });
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
