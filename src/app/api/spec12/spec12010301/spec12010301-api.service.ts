/**
 * API:  SPEC12010301-未出帳消費查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC12010301Req } from './spec12010301-req';
// -- Other Library -- //

@Injectable()
export class SPEC12010301ApiService extends ApiBaseService {
    protected serviceId = 'SPEC12010301';

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC12010301Req, {
            'reqData': reqData
        });
        // 欄位檢核
        // let set_month = this._formateService.checkField(reqData, 'selectedMonth');
        // if (!this._checkService.checkEmpty(set_month, true)) {
        //     return this.returnError({}, 'REQ_ERROR');
        // }

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: [], // 本期繳款紀錄資料
                    consumeData: [], // 本期消費紀錄資料
                    cardData: [], // 信卡資料
                    cardSwiperData: [], // 滑動信卡切換資料用
                    totalInfo: {
                        cardata: false, // 有無卡片資料
                        stmbal: false, // 是否有應繳餘額
                        totalStmBal: '', // 應繳餘額
                        payment: false, // 繳款是否有資料
                        totalPayment: '', // 繳款金額小計
                        consume: false, // 未出帳是否有資料
                        totalConsume: '' // 未出帳消費金額小計(台幣)
                    }
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.infoData = resObj.getData();
                if (!output.status) {
                    // 查詢期間無交易資料(中台認定業務錯誤)
                    return this.returnError(output.error);
                }

                output.data = this._formateService.checkObjectList(output.infoData, 'payRow');
                output.consumeData = this._formateService.checkObjectList(output.infoData, 'consumeRow');
                output.cardData = this._formateService.checkObjectList(output.infoData, 'cardData');
                output.totalInfo.totalStmBal = this._formateService.checkField(output.infoData, 'totalStmBal');
                output.totalInfo.totalPayment = this._formateService.checkField(output.infoData, 'totalPayment');
                output.totalInfo.totalConsume = this._formateService.checkField(output.infoData, 'totalConsume');

                // 檢核有無資料
                output.totalInfo.stmbal = (this._checkService.checkEmpty(output.totalInfo.totalStmBal, true, false)) ? true : false;
                output.totalInfo.cardata = (this._checkService.checkEmpty(output.cardData, true)) ? true : false;
                output.totalInfo.payment = (this._checkService.checkEmpty(output.data, true)) ? true : false;
                if (!output.totalInfo.payment && this._checkService.checkEmpty(output.totalInfo.totalPayment, true, false)) {
                    output.totalInfo.consume = true; // 為0
                }
                output.totalInfo.consume = (this._checkService.checkEmpty(output.consumeData, true)) ? true : false;
                if (!output.totalInfo.consume && this._checkService.checkEmpty(output.totalInfo.totalConsume, true, false)) {
                    output.totalInfo.consume = true; // 為0
                }
                if (!output.totalInfo.stmbal &&
                    !output.totalInfo.cardata &&
                    !output.totalInfo.consume && !output.totalInfo.consume
                ) {
                    // 查詢期間無交易資料
                    return this.returnError({}, 'EMPTY_RANGE_API');
                }


                // 有資料再執行
                if (output.totalInfo.cardata) {
                    output.cardData.forEach(item => {
                        let cardLst = this._formateService.checkField(item, 'cardLst');
                        if (!!cardLst) {
                            output.cardSwiperData[cardLst] = this._formateService.checkObjectList(item, 'cardRow');
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
