/**
 * 外幣兌換Service
 */
import { Injectable } from '@angular/core';
import { SPEC09030001ApiService } from '@api/spec09/spec09030001/spec09030001-api.service';
import { SPEC09030101ApiService } from '@api/spec09/spec09030101/spec09030101-api.service';
import { SPEC09030201ApiService } from '@api/spec09/spec09030201/spec09030201-api.service';
import { Logger } from '@systems/system/logger/logger.service';

@Injectable()

export class ForeignTransferService {
    /**
     * 參數處理
     */

    constructor(
        private spec09030001: SPEC09030001ApiService,
        private spec09030101: SPEC09030101ApiService,
        private spec09030201: SPEC09030201ApiService,
        private logger: Logger
    ) {

    }

    /**
     * 取得外幣兌換轉出、轉入帳號
     * 發電文取得資料
     */
    public getData(reqData, option?: object): Promise<any> {
        return this.spec09030001.getData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    /**
     * 外幣兌換-台轉外交易
     * 發電文送出交易
     */
    public sendData_twdToForeign(reqData, option?: object): Promise<any> {
        return this.spec09030101.sendData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    /**
     * 外幣兌換-外轉台交易
     * 發電文送出交易
     */
    public sendData_foreignToTwd(reqData, option?: object): Promise<any> {
        return this.spec09030201.sendData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    /**
     * 檢核欄位
     */
    public checkData(data) {
        let output = {
            status: true,
            errMsgObj: {
                transOutAcc: '',
                transInAcc: '',
                sellCurrency: '',
                buyCurrency: '',
                transOutAmount: '',
                transInAmount: '',
                extraAmount: '',
                referenceRate: '',
                remitNature: '',
                usdRate: ''
            }
        };

        // 檢核轉出帳號資料
        if (!data.transOutAccountObj.accountId) {
            output.status = false;
            output.errMsgObj.transOutAcc = 'FOREIGN_TRANSFER.ERROR';
        }

        // 檢核轉入帳號資料
        if (!data.transInAccountObj.accountId) {
            output.status = false;
            output.errMsgObj.transInAcc = 'FOREIGN_TRANSFER.ERROR';
        }

        // 檢核兌出幣別資料
        if (!data.chooseSellCurrencyObj.currencyCode) {
            output.status = false;
            output.errMsgObj.sellCurrency = 'FOREIGN_TRANSFER.EMPTY_CERRENCY';
        }

        // 檢核兌入幣別資料
        if (!data.chooseBuyCurrencyObj.currencyCode) {
            output.status = false;
            output.errMsgObj.buyCurrency = 'FOREIGN_TRANSFER.EMPTY_CERRENCY';
        }

        // 檢核轉出金額
        if (!data.transOutAmount) {
            output.status = false;
            output.errMsgObj.transOutAmount = 'FOREIGN_TRANSFER.EMPTY_AMOUNT';
        } else {
            data.transOutAmount = data.transOutAmount.replace(/\,/g, '').trim();
            if (data.chooseSellCurrencyObj.currencyCode == 'TWD' || data.chooseSellCurrencyObj.currencyCode == 'NTD') {
                if (parseFloat(data.transOutAmount) < 1000 || parseFloat(data.transOutAmount) >= 500000) {
                    output.status = false;
                    output.errMsgObj.transOutAmount = 'FOREIGN_TRANSFER.ERROR_AMOUNT';
                }
            }
            // // 金額格式(整數13位、小數2位)
            // let reg = /^[1-9]\d{0,12}(\.\d{1,2})?$|^0(\.\d{1,2})?$/;
            // if (!reg.test(data.transOutAmount) || parseFloat(data.transOutAmount) == 0) {
            //     output.status = false;
            //     output.errMsgObj.transOutAmount = 'FOREIGN_TRANSFER.ERROR_AMOUNT';
            // }
        }

        // 檢核轉入金額
        if (!data.transInAmount) {
            output.status = false;
            output.errMsgObj.transInAmount = 'FOREIGN_TRANSFER.EMPTY_AMOUNT';
        } else {
            data.transInAmount = data.transInAmount.replace(/\,/g, '').trim();
            if (data.chooseBuyCurrencyObj.currencyCode == 'TWD' || data.chooseBuyCurrencyObj.currencyCode == 'NTD') {
                if (parseFloat(data.transInAmount) < 1000 || parseFloat(data.transInAmount) >= 500000) {
                    output.status = false;
                    output.errMsgObj.transInAmount = 'FOREIGN_TRANSFER.ERROR_AMOUNT';
                }
            }
            // // 金額格式(整數13位、小數2位)
            // let reg = /^[1-9]\d{0,12}(\.\d{1,2})?$|^0(\.\d{1,2})?$/;
            // if (!reg.test(data.transInAmount) || parseFloat(data.transInAmount) == 0) {
            //     output.status = false;
            //     output.errMsgObj.transInAmount = 'FOREIGN_TRANSFER.ERROR_AMOUNT';
            // }
        }

        if (!!data.transOutAmount && !!data.transOutAccountObj.balance) {
            data.transOutAmount = data.transOutAmount.replace(/\,/g, '').trim();
            data.transOutAccountObj.balance = data.transOutAccountObj.balance.replace(/\,/g, '').trim();
            if (parseFloat(data.transOutAmount) > parseFloat(data.transOutAccountObj.balance)) {
                output.status = false;
                if (data.transType == 'buy-foreign') {
                    output.errMsgObj.transOutAmount = 'FOREIGN_TRANSFER.OVER_BALANCE';
                } else if (data.transType == 'sell-foreign') {
                    output.errMsgObj.transOutAmount = 'FOREIGN_TRANSFER.OVER_BALANCE';
                    output.errMsgObj.transInAmount = 'FOREIGN_TRANSFER.OVER_BALANCE';
                }
            }
        }

        // 檢核優惠金額
        if (!data.extraAmount) {
            output.status = false;
            output.errMsgObj.extraAmount = 'FOREIGN_TRANSFER.ERROR';
        }

        
        // 檢核參考匯率
        if (!data.referenceRate) {
            output.status = false;
            output.errMsgObj.referenceRate = 'FOREIGN_TRANSFER.ERROR';
        }

        // 檢核結匯性質
        if (!data.chooseRemitNatureObj.code) {
            output.status = false;
            output.errMsgObj.remitNature = 'FOREIGN_TRANSFER.ERROR';
        }

        // 檢核美金匯率
        if (!data.usdRate) {
            output.status = false;
            output.errMsgObj.usdRate = 'FOREIGN_TRANSFER.ERROR';
        }

        return output;
    }

    public modifyReqData(reqData) {
        return reqData;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}