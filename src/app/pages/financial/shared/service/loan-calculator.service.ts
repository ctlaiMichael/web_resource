/**
 * 貸款本息攤還試算Service
 */
import { Injectable } from '@angular/core';
import { SPEC10050001ApiService } from '@api/spec10/spec10050001/spec10050001-api.service';

@Injectable()

export class LoanCalculatorService {
    /**
     * 參數處理
     */

    constructor(
        private spec10050001: SPEC10050001ApiService
    ) {

    }

    /**
     * 貸款本息攤還試算
     * 發電文取得資料
     */
    public sendData(reqData: object, option?: object): Promise<any> {
        
        return this.spec10050001.sendData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    // 檢核欄位
    checkData(data) {
        let output = {
            status: true,
            errMsgObj: {
                capitalAmt: '',
                rate1: '',
                rate2: '',
                rate3: '',
                month1: '',
                month2: '',
                month3: ''
            }
        };

        // 檢核貸款金額
        if (!data.capitalAmt) {
            output.status = false;
            output.errMsgObj.capitalAmt = 'FINANCIAL.ERR.ENTER_LOAN_AMOUNT';
        } else {
            // 貸款金額格式(整數10位)
            let reg = /^[1-9]\d{0,9}$/;
            if (!reg.test(data.capitalAmt) || parseInt(data.capitalAmt) == 0) {
                output.status = false;
                output.errMsgObj.capitalAmt = 'FINANCIAL.ERR.INVALID_LOAN_AMOUNT';
            }
        }

        // 貸款利率格式(整數2位、小數3位)
        let reg = /^[1-9]\d{0,1}(\.\d{1,3})?$|^0(\.\d{1,4})?$/;

        // 檢核貸款利率及期數第一段
        if (!data.rate1) {
            output.status = false;
            output.errMsgObj.rate1 = 'FINANCIAL.ERR.ENTER_LOAN_RATE';
        } else {
            if (!reg.test(data.rate1) || parseFloat(data.rate1) == 0) {
                output.status = false;
                output.errMsgObj.rate1 = 'FINANCIAL.ERR.INVALID_LOAN_RATE';
            }
        }

        if (data.month1 == 0) {
            output.status = false;
            output.errMsgObj.month1 = 'FINANCIAL.ERR.ENTER_LOAN_TERM';
        }

        // 檢核貸款利率第二段
        if (data.duration == '2' || data.duration == '3') {
            if (!data.rate2) {
                output.status = false;
                output.errMsgObj.rate2 = 'FINANCIAL.ERR.ENTER_LOAN_RATE';
            } else {
                if (!reg.test(data.rate2) || parseFloat(data.rate2) == 0) {
                    output.status = false;
                    output.errMsgObj.rate2 = 'FINANCIAL.ERR.INVALID_LOAN_RATE';
                }
            }

            if (data.month2 == 0) {
                output.status = false;
                output.errMsgObj.month2 = 'FINANCIAL.ERR.ENTER_LOAN_TERM';
            }
        }

        // 檢核貸款利率第三段
        if (data.duration == '3') {
            if (!data.rate3) {
                output.status = false;
                output.errMsgObj.rate3 = 'FINANCIAL.ERR.ENTER_LOAN_RATE';
            } else {
                if (!reg.test(data.rate3) || parseFloat(data.rate3) == 0) {
                    output.status = false;
                    output.errMsgObj.rate3 = 'FINANCIAL.ERR.INVALID_LOAN_RATE';
                }
            }

            if (data.month3 == 0) {
                output.status = false;
                output.errMsgObj.month3 = 'FINANCIAL.ERR.ENTER_LOAN_TERM';
            }
        }

        return output;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}