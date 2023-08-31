/**
 * 綜定存結清Service
 */
import { Injectable } from '@angular/core';
import { SPEC07040001ApiService } from '@api/spec07/spec07040001/spec07040001-api.service';

@Injectable()

export class CloseTimeDepositService {
    /**
     * 參數處理
     */

    constructor(
        private spec07040001: SPEC07040001ApiService
    ) {

    }

    /**
     * 取得定存帳號
     * 發電文取得資料
     */
    public getData(option?: object): Promise<any> {
        return this.spec07040001.getData(option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    /**
     * 綜定存結清
     * 發電文送出交易
     */
    public sendData(reqData, option?: object): Promise<any> {
        // return this.spec07030101.sendData(reqData, option).then(
        //     (successObj) => {
        //         return Promise.resolve(successObj);
        //     },
        //     (errObj) => {
        //         return Promise.reject(errObj);
        //     }
        // );
        return Promise.resolve();
    }

    /**
     * 檢核欄位
     */
    public checkData(data) {
        let output = {
            status: true,
            errMsgObj: {
                accountId: '',
                turnCount: '',
                turnType: '',
                interestAcc: ''
            }
        };

        // 檢核定存帳號資料
        if (!data.accountId) {
            output.status = false;
            output.errMsgObj.accountId = 'TIME_DEPOSIT.AUTO_CARRY_OVER.PLEASE_SELECT';
        }

        // 檢核轉期次數
        if (!data.turnCount) {
            output.status = false;
            output.errMsgObj.turnCount = 'TIME_DEPOSIT.AUTO_CARRY_OVER.PLEASE_ENTER';
        } else {
            if (!isNaN(Number(data.turnCount))) {
                if (parseInt(data.turnCount) < 1 || parseInt(data.turnCount) > 99) {
                    output.status = false;
                    output.errMsgObj.turnCount = 'TIME_DEPOSIT.AUTO_CARRY_OVER.ERROR_TURNCOUNT';
                }
            } else {
                output.status = false;
                output.errMsgObj.turnCount = 'TIME_DEPOSIT.AUTO_CARRY_OVER.ERROR_TURNCOUNT';
            }
        }

        if (data.turnType == '1') {
            // 檢核利息轉入帳號資料
            if (!data.interestAcc) {
                output.status = false;
                output.errMsgObj.interestAcc = 'TIME_DEPOSIT.AUTO_CARRY_OVER.PLEASE_SELECT';
            }
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