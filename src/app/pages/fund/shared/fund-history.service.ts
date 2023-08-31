/**
 * 投資交易明細(明細)
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs/internal/Subject';
// -- library -- //
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
// -- api -- //
import { SPEC11080101ApiService } from '@api/spec11/spec11080101/spec11080101-api.service';

@Injectable()

export class FundHistoryService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定
    private setCacheName = {
        'list': 'fund-history', // 列表
    };

    expandSubject: Subject<any> = new Subject<any>();

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec11080101: SPEC11080101ApiService
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
        this.dateCheckList = {};
        // == Level 1 == //
        // --- [today] --- //
        output.push({
            id: 'today',
            name: 'DEPOSIT.SEARCH.TODAY', // 今天
            sort: 1,
            search_data: this.setDateCheck('today')
        });
        // --- [7D] --- //
        output.push({
            id: '7D',
            name: 'DEPOSIT.SEARCH.WEEK', // 最近1週
            sort: 2,
            search_data: this.setDateCheck('7D')
        });

        // --- [1M] --- //
        output.push({
            id: '1M',
            name: 'DEPOSIT.SEARCH.MONTH', // 最近1個月
            sort: 3,
            search_data: this.setDateCheck('1M')
        });
        // --- [custom] --- //
        output.push({
            id: 'custom',
            name: 'DEPOSIT.SEARCH.CUSTOM', // 自訂
            sort: 4,
            search_data: this.setDateCheck('custom')
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
            type = this.setCacheName.list + '@' + this._formateService.checkField(acctObj, 'iron');
        }
        this._cacheService.removeGroup(type);
    }

    /**
     * 取得自訂查詢區間資料
     * @param reqObj 請求資料
     * @param paginator 分頁物件
     * @param option 模式設定
     */
    getListData(reqData: object, paginator: object, option?: object): Promise<any> {
        this._logger.step('Deposit', "into getList, reqData/paginator:", reqData, paginator);
        this._logger.log("getListData, reqData:", reqData);
        let check_id = this._formateService.checkField(reqData, 'searchType');
        let start_date = this._formateService.checkField(reqData, 'startDate');
        let end_date = this._formateService.checkField(reqData, 'endDate');
        // tslint:disable-next-line: radix
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

        // let actId = this._formateService.checkField(reqData, 'accountId');
        // let ccy = this._formateService.checkField(reqData, 'currency');

        let cache_main_key = this.setCacheName.list;
        let cache_sub_key = [start_date, end_date];
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
        // this._logger.log("cache_option:", cache_option);

        // 目前僅提供固定排序欄位
        paginator['sortColName'] = 'txDate';
        return this.spec11080101.getPageData(reqData, option, paginator).then(
            (sucessObj) => {
                this._logger.step('Deposit', "send api success, success:", sucessObj);
                this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.step('Deposit', "send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 取得注意資訊
     */
    getNoteData() {
        let noteData = {
            title: 'POPUP.CANCEL_EDIT.TITLE',
            // content: 'POPUP.NOTE.FOREIGN_DATE'
            content: 'POPUP.NOTE.FUND_HISTORY_NOTICE'
        };
        return noteData;
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
            baseDate: 'today', // 基礎日
            rangeType: 'M', // "查詢範圍類型" M OR D
            rangeNum: '12', // 查詢範圍限制
            rangeDate: '', // 比較日
            rangeBaseDate: '01' // 當rangeType為自訂時，的基礎日期
        };
        switch (set_key) {
            case '1D': // 前一日
                // search(now=2019/04/22): 2019/04/21~2019/04/21
                set_obj['rangeType'] = 'D';
                set_obj['rangeNum'] = '1';
                set_obj['rangeBaseDate'] = '';
                break;
            case 'today': // 本日
                // search(now=2019/04/22): 2019/04/22~2019/04/22
                set_obj['rangeType'] = 'D';
                set_obj['rangeNum'] = '0';
                set_obj['rangeBaseDate'] = '';
                break;
            case '7D': // 最近1周
                // search(now=2019/04/22): 2019/04/15~2019/04/22
                set_obj['rangeType'] = 'D';
                set_obj['rangeNum'] = '7';
                set_obj['rangeBaseDate'] = '';
                break;
            case '1M': // 最近1月
                // search(now=2019/04/22): 2019/03/22~2019/04/22
                set_obj['rangeType'] = 'M';
                set_obj['rangeNum'] = '1';
                set_obj['rangeBaseDate'] = '';
                break;
            case 'custom': // 自訂
            default:
                // search(now=2019/04/22): 2017/04/01~2019/04/22
                set_obj['rangeType'] = 'M';
                set_obj['rangeNum'] = '12';
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
            date_data.rang = '12'; // 最大區間search(now=2019/10/23): 2019/08/24~2019/10/23
        } else {
            output.startDate = date_data.minDate;
            output.endDate = date_data.maxDate;
        }
        this.dateCheckList[set_key] = date_data;
        return output;
    }

}

