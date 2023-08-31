/**
 * 基金贖回
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs/internal/Subject';
// -- library -- //
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC11020101ApiService } from '@api/spec11/spec11020101/spec11020101-api.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { SPEC11020102ApiService } from '@api/spec11/spec11020102/spec11020102-api.service';
import { SPEC11020201ApiService } from '@api/spec11/spec11020201/spec11020201-api.service';
import { SPEC11020202ApiService } from '@api/spec11/spec11020202/spec11020202-api.service';
import { SPEC11020301ApiService } from '@api/spec11/spec11020301/spec11020301-api.service';
import { SPEC11020302ApiService } from '@api/spec11/spec11020302/spec11020302-api.service';
import { TranslateService } from '@ngx-translate/core';
// -- api -- //
// import { SPEC11010301ApiService } from '@api/spec11/spec11010301/spec11010301-api.service';

@Injectable()

export class FundRedeemService {
    /**
     * 參數處理
     */
    private setCacheName = {
        // 基金贖回扣款帳號
        account: ''
    };

    expandSubject: Subject<any> = new Subject<any>();

    constructor(
        private _logger: Logger,
        private _cacheService: CacheService,
        private spec11020101: SPEC11020101ApiService,
        private spec11020102: SPEC11020102ApiService,
        private spec11020201: SPEC11020201ApiService,
        private spec11020202: SPEC11020202ApiService,
        private spec11020301: SPEC11020301ApiService,
        private spec11020302: SPEC11020302ApiService,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private translate: TranslateService
    ) {
    }

    /**
     * 刪除cache
     * @param type 指定刪除類別
     *  deposit-demand: 活存
     *  alldetail: 所有明細
     * @param acctObj 指定刪除明細
     *  iron 指定刪除單一明細
     */
    removeAllCache(type?: string, acctObj?: object) {
        if (typeof type == 'undefined') {
            type = 'redeem-edit';
        }
        this._cacheService.removeGroup(type);
    }

    /**
     * 發送交易api前 request處理
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     * @param isTwdFlag 是否為台幣
     */
    modifyReq(reqData?, option?: object, isTwdFlag?: boolean) {
        if (!!isTwdFlag) {
            return this.spec11020301.modifyApiReq(reqData, option);
        } else {
            return this.spec11020302.modifyApiReq(reqData, option);
        }
    }


    // 取得 基金贖回編輯(台幣)
    getEditTwd(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getEditTwd, reqData:", reqData);
        let check_fundCcy = this._formateService.checkField(reqData, 'fundCcy');
        let check_license = this._formateService.checkField(reqData, 'license');
        let check_fundCode = this._formateService.checkField(reqData, 'fundCode');
        let check_fundFlag = this._formateService.checkField(reqData, 'fundFlag');
        // 基金贖回編輯(台幣)
        return this.spec11020101.getData(reqData).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    // 取得 基金贖回確認(台幣)
    getConfirmTwd(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getEditTwd, reqData:", reqData);
        // 交易不做cache
        return this.spec11020201.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }


    // 取得 基金贖回結果(台幣)
    getResultTwd(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getResultTwd, reqData:", reqData);
        // 交易不做cache
        return this.spec11020301.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    // 取得 基金贖回編輯(外幣)
    getEditForeign(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getEditTwd, reqData:", reqData);
        let check_fundCcy = this._formateService.checkField(reqData, 'fundCcy');
        let check_license = this._formateService.checkField(reqData, 'license');
        let check_fundCode = this._formateService.checkField(reqData, 'fundCode');
        let check_fundFlag = this._formateService.checkField(reqData, 'fundFlag');
        // 基金贖回編輯(外幣)
        return this.spec11020102.getData(reqData).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    // 取得 基金贖回確認(外幣)
    getConfirmForeign(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getEditForeign, reqData:", reqData);
        // 交易不做cache
        return this.spec11020202.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    // 取得 基金贖回結果(外幣)
    getResultForeign(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getResultForeign, reqData:", reqData);
        // 交易不做cache
        return this.spec11020302.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    // 檢核畫面資料
    checkData(req) {
        let output = {
            status: false,
            msg: 'FUND_REDEEM.CHECK.DEFAULT_MSG', // 後補i18n
            data: {
                accountID: '' // 基金帳號 
            },
            error_data: [],
            error_list: {
                accountID: '' // 基金帳號
            }
        };
        // 基金帳號
        let account_msg = '';
        output.data.accountID = this._formateService.checkField(req, 'accountID');
        let check_account = this._checkService.checkEmpty(req.accountID);
        if (check_account.status == false) {
            account_msg = check_account.msg;
            output.error_list.accountID = account_msg;
            output.error_data.push(output.error_list.accountID);
        }

        // 若無錯誤
        if (output.error_data.length == 0) {
            output.status = true;
            output.msg = '';
        }
        return output;
    }

    /**
     * 檢核金額欄位規則
     * @param checkObj 
     */
    checkRedeemAmt(checkObj) {
        let output = {
            status: false,
            msg: '',
            data: checkObj,
            viewError: '' // 顯示錯誤方式, 'alert': alert視窗提示, 'remind': 金額欄位紅框
        };

        // tslint:disable-next-line:radix
        let fundAmt = parseInt(checkObj['fundAmt']); // 投資金額(本金)
        let reg = new RegExp(/[',"#$%^*]/, 'g'); // 金額皆需過慮特殊符號
        let checkAmount = checkObj['amount'].replace(reg, '');
        // tslint:disable-next-line:radix
        let amount = (!checkAmount) ? 0 : parseInt(checkAmount); // 贖回金額
        // tslint:disable-next-line:radix
        let lowestAmt = parseInt(checkObj['lowestAmt'].replace(reg, '')); // 最低贖回金額
        // tslint:disable-next-line:radix
        let highAmt = parseInt(checkObj['highAmt'].replace(reg, '')); // 最高贖回金額
        let currencyCode = checkObj['currencyCode']; // 幣別
        let redeemType = checkObj['redeemType']; // 贖回方式: all, part 
        // 金種類名稱, 海外單筆 ETF/海外定期 ETF/國內單筆 ETF/國內定期 ETF/海外單筆產品/海外定期產品/國內單筆產品/國內定期產品
        let fundType = checkObj['fundType'];
        // 先檢核共同規則
        // 1. 贖回金額，僅能為數字
        if (checkObj.amount.indexOf('.') > 0) {
            output.msg = 'FUND_REDEEM.CHECK.INPUT_INTEGER'; // 請輸入正整數
            output.viewError = 'remind';
            return output;
        }
        let check_Amount = this._checkService.checkMoney(checkObj.amount, {
            currency: 'POSITIVE', // 基金交易只允許輸入正整數
            not_zero: true
        });
        if (check_Amount['status'] == false) {
            // this._logger.log("1111111111111111111check_Amount error");
            output.msg = check_Amount.msg;
            output.viewError = 'remind'; // 紅框錯誤
            return output;
            // 2. 投資金額 < 最低投資金額 => 禁止贖回功能
        } else if (fundAmt < lowestAmt) {
            // 您的「投資金額」低於「最低投資金額」，無法進行贖回動作。
            output.msg = 'FUND_REDEEM.CHECK.FUNDAMOUNT_LESS_TO_LOWEAMOUNT';
            output.viewError = 'alert';
            return output;
            // 3. (投資金額 - 贖回金額) < 最低投資金額 => 禁止贖回功能 (全部贖回不套用,金額相減一定 == 0)
        } else if (redeemType == 'part' && ((fundAmt - amount) < lowestAmt)) {
            // 您的餘額低於「最低投資金額」，無法進行贖回動作
            output.msg = 'FUND_REDEEM.CHECK.BALANCE_LESS_TO_LOWEAMOUNT';
            output.viewError = 'alert';
            return output;
        } else if (redeemType == 'part' && amount < lowestAmt) {
            // 「贖回金額」不可低於「最低投資金額」
            output.msg = 'FUND_REDEEM.CHECK.AMOUNT_LESS_TO_LOWEAMOUNT';
            output.viewError = 'alert';
            return output;
        } else if (redeemType == 'part' && amount > highAmt) {
            // 「贖回金額」不可高於「最高投資金額」
            output.msg = 'FUND_REDEEM.CHECK.AMOUNT_HIGHER_TO_HIGHAMOUNT';
            output.viewError = 'alert';
            return output;
        }
        // 級距規則 (贖回不檢核級距)
        // let range = 0;
        // // 此基金為單筆贖回
        // if (fundType == 'single') {
        //     range = 1;  // 單筆台幣：正整數，且必須為「1」的倍數
        //     // 此基金為定期贖回
        // } else {
        //     // 定期外幣
        //     if (currencyCode != 'NTD' && currencyCode != 'TWD') {
        //         range = 10; // 定期外幣:正整數，且必須為「10」的倍數
        //         // 定期台幣 
        //     } else {
        //         range = 1000;
        //     }
        // }
        // this._logger.log("33333333333333 amount:", amount);
        // this._logger.log("33333333333333 range:", range);
        // 檢核級距
        // let checkRange = this.checkRange(amount, range);
        // if (checkRange.status == false) {
        //     this._logger.log("2222222222222222222222222 checkRange");
        //     output.msg = checkRange['msg'];
        //     output.viewError = 'alert';
        //     return output;
        // } else {
        output.status = true;
        output.msg = '';
        // }
        return output;
    }

    /**
     * 
     * @param amount 贖回金額
     * @param range  級距
     */
    checkRange(amount, range) {
        let output = {
            status: false,
            msg: '',
            data: amount
        };
        if (amount % range != 0) {
            this.translate.get('FUND_REDEEM.CHECK.AMOUNT_RANGE', {
                'range': range
            }).subscribe((i18nval) => {
                output.msg = i18nval;
            });
            // output.msg = '輸入金額須符合' + range + '的倍數';
        } else {
            output.status = true;
        }
        return output;
    }

    /**
     * 檢核禁止贖回功能相關
     * @param fundAmt 投資金額
     * @param amount 贖回金額
     * @param lowestAmt 最低投資金額
     */
    checkCantRedeem(fundAmt, amount, lowestAmt) {
        let output = {
            status: false,
            msg: '',
            viewError: ''
        };

        // 2. 投資金額 < 最低投資金額 => 禁止贖回功能
        if (fundAmt < lowestAmt) {
            // output.msg = '您的「投資金額」低於「最低投資金額」，無法進行贖回動作。';
            output.msg = 'FUND_REDEEM.CHECK.FUNDAMOUNT_LESS_TO_LOWEAMOUNT';
            output.viewError = 'alert';
            return output;
            // 3. (投資金額 - 贖回金額) < 最低投資金額 => 禁止贖回功能
        } else if ((fundAmt - amount) < lowestAmt) {
            // output.msg = '您的「投資金額」-「贖回金額」，低於「最低投資金額」，無法進行贖回動作';
            output.msg = 'FUND_REDEEM.CHECK.AMOUNT_MINSS';
            output.viewError = 'alert';
            return output;
        }
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------


    // =====================================================================API End
}




