/**
 * 現值查詢
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs/internal/Subject';
// -- library -- //
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
// -- api -- //
import { SPEC09020201ApiService } from '@api/spec09/spec09020201/spec09020201-api.service';

@Injectable()
export class AutoCompositToTimeMainService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定
    private setCacheName = {
        list: 'composit-deposit-agree', // 列表
        'open-acct': 'composit-deposit-openAcct' // 開戶註記 餘額
    };

    expandSubject: Subject<any> = new Subject<any>();

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec09020201: SPEC09020201ApiService
    ) {}

    /**
     * 取得注意資訊
     */
    getNoteInfo() {
        let noteData = {
            title: 'POPUP.NOTE.TITLE',
            content: 'COMPOSIT_TO_TIME.AUTO_COMPOSIT_TO_TIME.REGIN_NOTNEW'
        };
        return noteData;
    }

    /**
     * 控制展開收合事件 之後再刪除
     * @param checkFinish
     */
    changeExpandSubject(checkFinish: boolean) {
        this.expandSubject.next(checkFinish);
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
            type = this.setCacheName.list;
        }
        if (type === 'detail') {
            type =
                this.setCacheName.list +
                '@' +
                this._formateService.checkField(acctObj, 'iron');
        }
        this._cacheService.removeGroup(type);
    }

    /**
     * 取得自訂查詢區間資料
     * @param reqObj 請求資料
     * @param paginator 分頁物件
     * @param option 模式設定
     */
    getOpenAcctData(reqData: object, option?: object): Promise<any> {
        const cache_key = 'auto-composit-deposit-account';
        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        if (cache_data) {
            return Promise.resolve(cache_data);
        }

        // 目前僅提供固定排序欄位
        return this.spec09020201.getData(reqData, option).then(
            successObj => {
                // this._logger.log(
                //     'Deposit',
                //     'send api success, success:',
                //     sucessObj
                // );
                // this._cacheService.save(cache_key, sucessObj, cache_option);

                let cache_option = this._cacheService.getCacheSet(cache_key);
                this._cacheService.save(cache_key, successObj, cache_option);

                return Promise.resolve(successObj);
            },
            failedObj => {
                this._logger.log(
                    'Deposit',
                    'send api failed, failed:',
                    failedObj
                );
                return Promise.reject(failedObj);
            }
        );
    }
    // 檢核畫面資料
    checkData(req, range) {
        let output = {
            status: false,
            msg: 'CHECK.DEFAULT_MSG', // 後補i18n
            data: {
                transDepositAmt: '', // 轉存金額
                savingsRange: '' // 轉存期間
            },
            error_data: [],
            error_list: {
                transDepositAmt: '', // 轉存金額
                savingsRange: '' // 轉存期間
            }
        };
        // 轉存金額
        let transDepositAmt_msg = '';
        output.data.transDepositAmt = this._formateService.checkField(
            req,
            'transDepositAmt'
        );
        let check_transDepositAmt = this._checkService.checkMoney(
            req.transDepositAmt,
            {
                currency: 'TWD',
                not_zero: true
            }
        );
        if (check_transDepositAmt.status == false) {
            transDepositAmt_msg = check_transDepositAmt.msg;
            output.error_list.transDepositAmt = transDepositAmt_msg;
            output.error_data.push(output.error_list.transDepositAmt);
        } else {
            let checkMoneyrule = this.checkMoneyrule(
                req.transDepositAmt,
                range
            );
            if (!checkMoneyrule.status) {
                transDepositAmt_msg = checkMoneyrule.msg;
                output.error_list.transDepositAmt = transDepositAmt_msg;
                output.error_data.push(output.error_list.transDepositAmt);
            }
        }

        // 轉存期間
        let savingsRange_msg = '';
        output.data.savingsRange = this._formateService.checkField(
            req,
            'savingsRange'
        );
        let check_savingsRange = this._checkService.checkNumber(
            req.savingsRange,
            'positive'
        );
        if (check_savingsRange.status == false) {
            savingsRange_msg = check_savingsRange.msg;
            output.error_list.savingsRange = savingsRange_msg;
            output.error_data.push(output.error_list.savingsRange);
        } else {
            let checkSaveTyperule = this.checkSaveTyperule(req.savingsRange);
            if (!checkSaveTyperule.status) {
                savingsRange_msg = checkSaveTyperule.msg;
                output.error_list.savingsRange = savingsRange_msg;
                output.error_data.push(output.error_list.savingsRange);
            }
        }

        // 若無錯誤
        if (output.error_data.length == 0) {
            output.status = true;
            output.msg = '';
        }
        // output.status = true;
        return output;
    }

    /**
     * 取得注意資訊
     */
    getNoteData() {
        let noteData = {
            title: 'POPUP.CANCEL_EDIT.TITLE',
            // content: 'POPUP.NOTE.FOREIGN_DATE'
            content: 'POPUP.NOTE.FOREIGN_DATE'
        };
        return noteData;
    }
    // 以下是檢核特規
    private checkMoneyrule(transDepositAmt, range) {
        let output = {
            status: false,
            msg: '',
            data: transDepositAmt
        };
        let transDepositAmtInt = parseInt(transDepositAmt);
        if (transDepositAmtInt < range) {
            output.msg = '輸入金額須大於' + range;
            return output;
        }
        if (transDepositAmtInt % range != 0) {
            output.msg = '輸入金額須為' + range + '倍數';
            return output;
        }
        output.status = true;
        return output;
    }
    private checkSaveTyperule(savingsRange) {
        let output = {
            status: false,
            msg: '',
            data: savingsRange
        };
        let savingsRangeInt = parseInt(savingsRange);
        if (savingsRangeInt > 36) {
            output.msg = '請輸入1-36個月';
            return output;
        } else {
            output.status = true;
        }
        return output;
    }
    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    // --------------------------------------------------------------------------------------------
    // =====================================================================API End
}
