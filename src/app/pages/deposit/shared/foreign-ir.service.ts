/**
 * 國外匯入匯款查詢
 * [debug: ForeignIrDeposit]
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC06010101ApiService } from '@api/spec06/spec06010101/spec06010101-api.service';
import { SPEC06010102ApiService } from '@api/spec06/spec06010102/spec06010102-api.service';

@Injectable()

export class ForeignIrService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定
    private setCacheName = {
        'list': 'foreign-ir-deposit', // 列表
        'detail': 'foreign-ir-deposit-detail' // 明細
    };

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec06010101: SPEC06010101ApiService,
        private spec06010102: SPEC06010102ApiService
    ) {
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
        this._logger.step('ForeignIrDeposit', 'bookmark set', this.dateCheckList);
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
     *  foreign-ir-deposit: 國外匯入匯款列表+明細
     *  alldetail: 國外匯入匯款 所有明細 (foreign-ir-deposit-detail)
     * @param acctObj 指定刪除明細
     *  remitId 指定刪除單一明細
     */
    removeAllCache(type?: string, setObj?: object) {
        if (typeof type == 'undefined') {
            type = this.setCacheName.list;
        }
        if (type === 'alldetail') {
            type = this.setCacheName.detail + '@' + this._formateService.checkField(setObj, 'remitId');
        }
        this._cacheService.removeGroup(type);
    }

    /**
     * 取得自訂查詢區間資料
     * @param reqObj
     * @param page
     */
    getListData(reqData: object, option?: object): Promise<any> {
        this._logger.step('ForeignIrDeposit', "into getList, reqData:", reqData);
        let check_id = this._formateService.checkField(reqData, 'id');
        let start_date = this._formateService.checkField(reqData, 'startDate');
        let end_date = this._formateService.checkField(reqData, 'endDate');
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

        let cache_main_key = this.setCacheName.list;
        let cache_sub_key = [start_date, end_date];
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
        // this._logger.step('ForeignIrDeposit', "cache_option:", cache_option);

        // 送req物件
        // 轉為正確req格式
        return this.spec06010101.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.step('ForeignIrDeposit', "send api success, success:", sucessObj);
                this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.step('ForeignIrDeposit', "send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 取得詳細明細資料
     * @param reqObj
     * 
     */
    getDetailData(reqData, option?: object) {
        // cache後續加入
        this._logger.step('ForeignIrDeposit', "into getDetailData, reqData:", reqData);
        let check_id = this._formateService.checkField(reqData, 'remitId');

        let cache_main_key = this.setCacheName.detail;
        let cache_sub_key = [check_id];
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
            this._logger.log("cache_check.status true");
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);
        // this._logger.log("cache_option:", cache_option);

        // 送req物件
        return this.spec06010102.getData(reqData).then(
            (sucessObj) => {
                this._logger.step('ForeignIrDeposit', "send api sucessObj, sucessObj:", sucessObj);
                // this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.step('ForeignIrDeposit', "send api failedObj, failedObj:", failedObj);
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
            content: 'POPUP.NOTE.FOREIGN_DATE'
        };
        return noteData;
    }

    /**
     * 資料排序
     * @param setData 需處理的資料
     * @param formateObj 規格
     * formateObj: { sort: '_sort', reverse: 'DESC' }
     * => sort: 想排序之欄位，EX: remitId 帳戶編號
     * => reverse: 想排序之方式，EX: DESC 遞減  
     */
    formateSortData(setData, formateObj) {
        this._logger.step('ForeignIrDeposit', "setData/formateObj:", setData, formateObj);
        let output = this._formateService.transArraySort(setData, formateObj);
        this._logger.step('ForeignIrDeposit', output);
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
            baseDate: 'today', // 基礎日
            rangeType: 'M', // "查詢範圍類型" M OR D
            rangeNum: '1', // 查詢範圍限制
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
                set_obj['rangeNum'] = '1';
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
            date_data.rang = '1'; // 最大區間search(now=2019/10/23): 2019/08/24~2019/10/23
        } else {
            output.startDate = date_data.minDate;
            output.endDate = date_data.maxDate;
        }
        this.dateCheckList[set_key] = date_data;
        return output;
    }


}




