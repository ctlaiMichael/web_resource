/**
 * 繳信用卡款
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC00040201ApiService } from '@api/spec00/spec00040201/spec00040201-api.service';
import { SPEC12030101ApiService } from '@api/spec12/spec12030101/spec12030101-api.service';
import { SPEC12030102ApiService } from '@api/spec12/spec12030102/spec12030102-api.service';
import { CheckService } from '@template/check/check.service';

@Injectable()

export class PayCreditPayableService {
    /**
     * 參數處理
     */
    private setCachePayBill = {
        'all': 'card-payable', // 全部
        // 各期帳單查詢
        'list': 'card-payable-bill',
        // 轉出帳號
        'account': 'card-payable-transOutAcct'
    };

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,
        private _checkService: CheckService,
        private spec00040201: SPEC00040201ApiService,
        private spec12030101: SPEC12030101ApiService,
        private spec12030102: SPEC12030102ApiService
    ) {
    }

    /**
     * 取得注意資訊
     */
    getNoteData() {
        let noteData = {
            title: 'POPUP.CANCEL_EDIT.TITLE',
            // content: 'POPUP.NOTE.FOREIGN_DATE'
            content: 'POPUP.NOTE.PAY_CREDIT_PAYABLE'
        };
        return noteData;
    }

    /**
     * 取得轉出帳號
     * @param reqData
     */
    getAcctData(reqData?: object, option?: object): Promise<any> {
        this._logger.log("into getAcctData, reqData:", reqData);
        // 紀錄cache
        let cache_main_key = this.setCachePayBill.account;
        let cache_sub_key = [];
        // tslint:disable-next-line:radix
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'paginator': {
                pageNumber: 1
            },
            'option': option,
            'sub_key': cache_sub_key
        });
        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);
        this._logger.log("cache_option:", cache_option);
        this._logger.log("ready to send account api");

        return this.spec00040201.getData({}).then(
            (sucessObj) => {
                this._logger.log("send 00040201 api success, success:", sucessObj);
                this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send 00040201 api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 各期帳單查詢 spec12010501
     * @param reqData 請求資料
     * @param paginator  分頁
     * @param option 模式設定
     */
    getBillData(reqData?, option?: object) {
        this._logger.log("into getBillData, reqData:", reqData);
        let cache_main_key = this.setCachePayBill.list;
        let cache_sub_key = [];
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'paginator': {
                pageNumber: 1
            },
            'option': option,
            'sub_key': cache_sub_key
        });
        // const cache_check = this._cacheService.checkPaginatorOldCach(cache_main_key, 1, [], option, null, { sub_key: cache_sub_key });
        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);
        this._logger.log("cache_option:", cache_option);

        // 信卡繳卡費(本期帳單資訊)
        return this.spec12030101.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     *
     * @param reqData 請求資料
     * @param option 模式設定
     */
    sendData(reqData?, option?: object) {
        this._logger.log("into sendBillData, reqData:", reqData);
        // 之後待補[TODO:]
        let check_data = this.checkData(reqData);
        if (!check_data.status) {
            // 檢核錯誤
            this._logger.log("sendData check_data error, check_data:", check_data);
            return Promise.reject(check_data);
        }

        // 信用卡繳卡費(交易)
        return this.spec12030102.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                // this._cacheService.save(cache_key, sucessObj, cache_option);
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
        this._logger.log("into checkData, req:", req);
        let output = {
            status: false,
            msg: 'CHECK.EMPTY', // 候補i18n請輸入正確資料
            data: {
                accountId: '',
                payAmount: ''
            },
            error_data: [], // 有錯誤將訊息塞入 (判斷欄位檢核是否全過)
            error_list: {
                accountId: '',
                payAmount: ''
            }
        };
        // 轉出帳號
        let accountId_msg = '';
        output.data.accountId = this._formateService.checkField(req, 'accountId');
        let check_accountId = this._checkService.checkEmpty(req.accountId);
        if (check_accountId.status == false) {
            accountId_msg = check_accountId.msg;
            output.error_list.accountId = accountId_msg;
            output.error_data.push(output.error_list.accountId);
        }

        // 繳款金額
        let payAmount_msg = '';
        output.data.payAmount = this._formateService.checkField(req, 'payAmount');
        let check_payAmount = this._checkService.checkMoney(req.payAmount, {
            currency: 'TWD',
            not_zero: true
        });
        if (check_payAmount.status == false) {
            payAmount_msg = check_payAmount.msg;
            output.error_list.payAmount = payAmount_msg;
            output.error_data.push(output.error_list.payAmount);
        }
        // 若無錯誤
        if (output.error_data.length == 0) {
            output.status = true;
            output.msg = '';
        }
        return output;
    }

    /**
     * 刪除cache
     * @param type 指定刪除類別
     *  card-pay: 繳費相關
     *  interest: 利息明細查詢
     * @param acctObj 指定刪除明細
     *  iron 指定刪除單一明細
     */
    removeAllCache(type?: string, acctObj?: object) {
        if (typeof type == 'undefined' || type == 'all') {
            type = this.setCachePayBill.all;
        }
        this._cacheService.removeGroup(type);
    }

    /**
     * 發送交易api前 request處理 (單筆外幣)
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    modifyCreditPay(reqData?, option?: object) {
        return this.spec12030101.modifyData(reqData, option);
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}




