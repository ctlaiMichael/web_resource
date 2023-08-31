/**
 * 定期存款
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { Subject } from 'rxjs/internal/Subject';
import { SPEC07010101ApiService } from '@api/spec07/spec07010101/spec07010101-api.service';
import { SPEC07010201ApiService } from '@api/spec07/spec07010201/spec07010201-api.service';

@Injectable()

export class TimeDepositMainService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定

    expandSubject: Subject<any> = new Subject<any>();

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec07010101: SPEC07010101ApiService,
        private spec07010201: SPEC07010201ApiService
    ) {
    }

    /**
     * 控制展開收合事件
     * @param checkFinish 
     */
    changeExpandSubject(checkFinish: boolean) {
        this.expandSubject.next(checkFinish);
    }

    /**
     * 取得頁籤設定
     */
    getBookmark() {
        let output = [];
        let detail_data = [];
        this.dateCheckList = {};
        // == Level 2 (第二層) == //
        // --- [toyear] --- //
        detail_data.push({
            id: 'toyear',
            name: 'LOAN.DEFAULT_LONG_RANGE.toyear', // 今年
            sort: 1,
            search_data: this.setDateCheck('toyear')
        });
        // --- [1Y] --- //
        detail_data.push({
            id: '1Y',
            name: 'LOAN.DEFAULT_LONG_RANGE.1Y', // 前一年
            sort: 2,
            search_data: this.setDateCheck('1Y')
        });
        // --- [2Y] --- //
        detail_data.push({
            id: '2Y',
            name: 'LOAN.DEFAULT_LONG_RANGE.2Y', // 前兩年
            sort: 3,
            search_data: this.setDateCheck('2Y')
        });
        // --- [custom] --- //
        detail_data.push({
            id: 'custom',
            name: 'LOAN.DEFAULT_LONG_RANGE.CUSTOM', // 自訂
            sort: 4,
            search_data: this.setDateCheck('custom')
        });

        // == Level 1 (第一層 功能tag切換) == //
        output.push({
            id: 'basic', // 基本資料
            name: 'TIME_DEPOSIT.TIME_DEPOSIT_MAIN.TIME_DEPOSIT_BASIC',
            sort: 1,
        });
        output.push({
            id: 'interest', // 本金利息明細
            name: 'TIME_DEPOSIT.TIME_DEPOSIT_MAIN.TIME_DEPOSIT_DETAIL',
            sort: 2,
            default: 'toyear',
            data: detail_data
        });

        this._logger.step('Deposit', 'bookmark set', this.dateCheckList);
        return output;
    }

    /**
     * 取得日期設定條件
     * @param set_key 日期條件編號
     */
    getDateSet(set_key: string): object {
        if (this.dateCheckList.hasOwnProperty(set_key)) {
            return this._formateService.transClone(this.dateCheckList[set_key]);
        } else {
            return {};
        }
    }


    /**
     * 刪除cache
     * @param type 指定刪除類別
     *  foreign-ir-deposit: 國外匯入匯款
     *  alldetail: 國外匯入匯款 所有明細
     * @param acctObj 指定刪除明細
     *  iron 指定刪除單一明細
     */
    removeAllCache(type?: string, acctObj?: object) {
        if (type == 'basic') {
            type = 'time-deposit-basic';
        }
        if (type === 'detail') {
            type = 'time-deposit-interest';
        }
        this._cacheService.removeGroup(type);
    }

    /**
     * 取得定期存款_基本資料
     * @param reqObj 請求資料
     * @param option 模式設定
     */
    getBasicData(reqData, option?: object): Promise<any> {
        this._logger.log("into getBasicData, reqData:", reqData);
        let actId = this._formateService.checkField(reqData, 'accountId');
        let currencyCode = this._formateService.checkField(reqData, 'currencyCode');
        let cache_main_key = 'time-deposit-basic';
        let cache_sub_key = [actId, currencyCode];
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
        // 本金明細查詢
        return this.spec07010101.getData(reqData).then(
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
     * 取得自訂查詢區間資料(本金利息明細)
     * @param reqObj 請求資料
     * @param paginator 分頁物件
     * @param option 模式設定
     */
    getInterestData(reqData, paginator, option?: object): Promise<any> {
        this._logger.log("into getInterestData, reqData:", reqData);
        this._logger.log("into getInterestData, paginator:", paginator);
        let check_id = this._formateService.checkField(reqData, 'searchType');
        let start_date = this._formateService.checkField(reqData, 'startDate');
        let end_date = this._formateService.checkField(reqData, 'endDate');
        // tslint:disable-next-line:radix
        // let page = parseInt(this._formateService.checkField(paginator, 'pageNumber'));
        // let sort = this._formateService.checkField(paginator, 'sortDirection');
        if (check_id === '') {
            return Promise.reject({
                title: 'ERROR.TITLE',
                content: 'ERROR.DATA_FORMAT_ERROR'
            });
        }
        let check_date = this.getDateSet(check_id);
        let check_data = this._checkService.checkDateRange([start_date, end_date], check_date);
        if (!check_data.status) {
            return Promise.reject({
                title: 'ERROR.TITLE',
                content: check_data.errorMsg.join('')
            });
        }

        let actId = this._formateService.checkField(reqData, 'accountId');
        let currencyCode = this._formateService.checkField(reqData, 'currencyCode');
        let cache_main_key = 'time-deposit-interest';
        let cache_sub_key = [start_date, end_date, actId, currencyCode];
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'paginator': paginator,
            'option': option,
            'sub_key': cache_sub_key
        });
        // const cache_check = this._cacheService.checkPaginatorOldCach(cache_main_key, page, [], option, null, { sub_key: cache_sub_key });
        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);
        this._logger.log("cache_option:", cache_option);

        // 目前僅提供固定排序欄位
        paginator['sortColName'] = 'transDate';
        // 本金利息明細查詢
        return this.spec07010201.getPageData(reqData, option, paginator).then(
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

    // 取得注意資訊
    getNoteData() {
        let noteData = {
            title: 'POPUP.CANCEL_EDIT.TITLE',
            // content: 'POPUP.NOTE.FOREIGN_DATE'
            content: 'POPUP.NOTE.LOAN_AND_TIME_NOTICE'
        };
        return noteData;
    }


    /**資料排序
     * 
     * @param setData 需處理的資料
     * @param formateObj 規格
     * formateObj: { sort: '_sort', reverse: 'DESC' }
     * => sort: 想排序之欄位，EX: iron 帳戶編號
     * => reverse: 想排序之方式，EX: DESC 遞減  
     */
    formateSortData(setData, formateObj) {
        let output = this._formateService.transArraySort(setData, formateObj);
        this._logger.log("output:", output);
        return output;
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    private setDateCheck(set_key: string) {
        // 最多只可查詢本月與前2個月
        let set_obj: any = {
            baseDate: 'toyear', // 基礎日
            rangeType: 'Y', // "查詢範圍類型" M OR D
            rangeNum: '100', // 查詢範圍限制
            rangeDate: '', // 比較日
            rangeBaseDate: '01' // 當rangeType為自訂時，的基礎日期
        };
        switch (set_key) {
            case 'toyear': // 今年
                // search(now=2019/04/22): 2019/04/22~2019/04/22
                set_obj['rangeType'] = 'Y';
                set_obj['rangeNum'] = '0';
                set_obj['rangeBaseDate'] = '';
                break;
            case '1Y': // 前一年
                // search(now=2019/04/22): 2019/04/15~2019/04/22
                set_obj['rangeType'] = 'Y';
                set_obj['rangeNum'] = '1';
                set_obj['rangeBaseDate'] = '';
                break;
            case '2Y': // 前二年
                // search(now=2019/04/22): 2019/03/22~2019/04/22
                set_obj['rangeType'] = 'Y';
                set_obj['rangeNum'] = '2';
                set_obj['rangeBaseDate'] = '';
                break;
            case 'custom': // 自訂
            default:
                // search(now=2019/04/22): 2017/04/01~2019/04/22
                set_obj['rangeType'] = 'Y';
                set_obj['rangeNum'] = '100';
                set_obj['rangeBaseDate'] = '01';
                break;
        }

        const dateType = 'strict';
        let date_data = this._checkService.getDateSet(set_obj, dateType);

        let output = {
            startDate: '',
            endDate: ''
        };
        if (set_key == 'custom') {
            // 最大區間search(now=2019/10/23): 2019/08/24~2019/10/23
            date_data.rang = '100';
            // date_data.type = 'Y'; // 寫死 之後改getDateSet
        } else {
            output.startDate = date_data.minDate;
            output.endDate = date_data.maxDate;
        }
        this.dateCheckList[set_key] = date_data;
        return output;
    }
}




