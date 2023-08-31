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
export class CompositToTimeMainService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定
    private setCacheName = {
        'list': 'composit-deposit-agree', // 列表
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
            content: 'COMPOSIT_TO_TIME.REGIN_NOT'
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
        // this._logger.step(
        //     'Deposit',
        //     'into getList, reqData/paginator:',
        //     reqData
        // );
        // // 紀錄cache
        // let cache_main_key = this.setCacheName['open-acct'];
        // let cache_sub_key = [];
        // const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
        //     'paginator': {
        //         pageNumber: 1
        //     },
        //     'option': option,
        //     'sub_key': cache_sub_key
        // });
        // // tslint:disable-next-line:radix
        // // const cache_check = this._cacheService.checkPaginatorOldCach(
        // //     cache_main_key,
        // //     1,
        // //     [],
        // //     {},
        // //     null,
        // //     { sub_key: cache_sub_key }
        // // );
        // const cache_key = cache_check.cache_key;
        // if (cache_check.status) {
        //     return Promise.resolve(cache_check.data);
        // }
        // let cache_option = this._cacheService.getCacheSet(cache_key);
        // cache_option.groupList.push(cache_main_key);

        const cache_key = 'composit-deposit-account';
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
    checkData(req) {
        let output = {
            status: false,
            msg: 'CHECK.DEFAULT_MSG', // 後補i18n
            data: {
                transsaVeamt: '', // 轉存金額
                pageflowSaveType: '', // 轉存期間
                turnCount: '' // 轉期次數
            },
            error_data: [],
            error_list: {
                transsaVeamt: '', // 轉存金額
                pageflowSaveType: '', // 轉存期間
                turnCount: '' // 轉期次數
            }
        };
        // 轉存金額
        let transsaVeamt_msg = '';
        output.data.transsaVeamt = this._formateService.checkField(
            req,
            'transsaVeamt'
        );
        let check_transsaVeamt = this._checkService.checkMoney(
            req.transsaVeamt,
            {
                currency: 'TWD',
                not_zero: true
            }
        );
        if (check_transsaVeamt.status == false) {
            transsaVeamt_msg = check_transsaVeamt.msg;
            output.error_list.transsaVeamt = transsaVeamt_msg;
            output.error_data.push(output.error_list.transsaVeamt);
        } else {
            let checkMoneyrule = this.checkMoneyrule(req.transsaVeamt, req.avlAmount);
            if (!checkMoneyrule.status) {
                transsaVeamt_msg = checkMoneyrule.msg;
                output.error_list.transsaVeamt = transsaVeamt_msg;
                output.error_data.push(output.error_list.transsaVeamt);
            }
        }

        // 轉存期間
        let pageflowSaveType_msg = '';
        output.data.pageflowSaveType = this._formateService.checkField(
            req,
            'pageflowSaveType'
        );
        let check_pageflowSaveType = this._checkService.checkNumber(
            req.pageflowSaveType,
            'positive'
        );
        if (check_pageflowSaveType.status == false) {
            pageflowSaveType_msg = check_pageflowSaveType.msg;
            output.error_list.pageflowSaveType = pageflowSaveType_msg;
            output.error_data.push(output.error_list.pageflowSaveType);
        } else {
            let checkSaveTyperule = this.checkSaveTyperule(
                req.pageflowSaveType
            );
            if (!checkSaveTyperule.status) {
                pageflowSaveType_msg = checkSaveTyperule.msg;
                output.error_list.pageflowSaveType = pageflowSaveType_msg;
                output.error_data.push(output.error_list.pageflowSaveType);
            }
        }

        // 轉期次數
        let turnCount_msg = '';
        output.data.pageflowSaveType = this._formateService.checkField(
            req,
            'turnCount'
        );
        let check_turnCount = this._checkService.checkNumber(
            req.turnCount,
            'positive'
        );
        if (req.turnCount == '0') {
            check_turnCount.status = true;
        }
        if (check_turnCount.status == false) {
            turnCount_msg = check_turnCount.msg;
            output.error_list.turnCount = turnCount_msg;
            output.error_data.push(output.error_list.turnCount);
        } else {
            this.checkTurnCountrule(req.turnCount);
            let checkTurnCountrule = this.checkTurnCountrule(req.turnCount);
            if (!checkTurnCountrule.status) {
                turnCount_msg = checkTurnCountrule.msg;
                output.error_list.turnCount = turnCount_msg;
                output.error_data.push(output.error_list.turnCount);
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
    private checkMoneyrule(transsaVeamt, avlAmount) {
        let output = {
            status: false,
            msg: '',
            data: transsaVeamt
        };
        // tslint:disable-next-line:radix
        let transsaVeamtInt = parseInt(transsaVeamt);
        avlAmount = avlAmount.replace(/,/g, '');
        // tslint:disable-next-line: radix
        let avlAmountInt = parseInt(avlAmount);
        if (transsaVeamtInt > avlAmountInt) {
            output.msg = 'COMPOSIT_TO_TIME.OVER_BALANCE'; // 輸入金額超過可用餘額
            return output;
        } else if (transsaVeamtInt < 10000) {
            this._logger.log('是否有進特殊規則', transsaVeamt);
            output.msg = '輸入金額須大於10000'; // 輸入金額須大於10000
            return output;
        } else {
            output.status = true;
        }
        return output;
    }
    private checkSaveTyperule(pageflowSaveType) {
        let output = {
            status: false,
            msg: '',
            data: pageflowSaveType
        };
        // tslint:disable-next-line:radix
        let pageflowSaveTypeInt = parseInt(pageflowSaveType);
        if (pageflowSaveTypeInt > 36) {
            output.msg = '請輸入1-36個月';
            return output;
        } else {
            output.status = true;
        }
        return output;
    }
    private checkTurnCountrule(turnCount) {
        let output = {
            status: false,
            msg: '',
            data: turnCount
        };
        // tslint:disable-next-line:radix
        let turnCountInt = parseInt(turnCount);
        if (turnCountInt > 99 || turnCountInt < 0) {
            output.msg = '輸入次數請0-99';
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
