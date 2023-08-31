/**
 * API:  SPEC09000306-非約定轉出_交易
 */
import { Injectable } from '@angular/core';
import { ApiTransBaseService } from '@api/base/api-trans-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC09000306Req } from './spec09000306-req';
// -- Other Library -- //

@Injectable()
export class SPEC09000306ApiService extends ApiTransBaseService {
    protected serviceId = 'SPEC09000306'; // API Name

    /**
     * @param reqData 
     * @param option 
     */
    sendData(reqData: object, option?: object, type?: string): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC09000306Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    statusObj: {},
                    infoData: {},
                    sharingData: { // 訊息分享資料
                        amount: '', // 轉帳金額
                        transoutMask: '', // 轉出帳號末五碼
                        bankCode: '', // 銀行代碼
                        bankName: '', // 分行名稱
                        transInMask: '' // 轉入帳號末五碼
                    } 
                };
                this._logger.log("resObj:", resObj);
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.statusObj = resObj.getResMsg();
                // 處理訊息分享資料
                output.sharingData.amount = this._formateService.checkField(output.infoData, 'amount');
                let transOutAmt = this._formateService.checkField(output.infoData, 'outAccount');
                output.sharingData.transoutMask = transOutAmt.substr(-5);
                output.sharingData.bankCode = this._formateService.checkField(output.infoData, 'bankCode');
                output.sharingData.bankName = this._formateService.checkField(output.infoData, 'bankName');
                let transInAmt = this._formateService.checkField(output.infoData, 'inAccount');
                output.sharingData.transInMask = transInAmt.substr(-5);
                

                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     this._logger.log("into EMPTY");
                //     // 查詢期間無交易資料
                //     return this.returnError({}, 'EMPTY_RANGE_API');
                // }

                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(this.returnTransError(errorObj));
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
    // -------------------------------------------------------------------------------------------
}
