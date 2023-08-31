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
import { SPEC09020102ApiService } from '@api/spec09/spec09020102/spec09020102-api.service';

@Injectable()

export class CompositDepositAgreeContentService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定
    private setCacheName = {
        'list': 'composit-deposit-agree', // 列表
    };

    expandSubject: Subject<any> = new Subject<any>();

    reqData = {
        acno: '',
        choiseType: 'N'
    };

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec09020102: SPEC09020102ApiService
    ) {
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
    getListData(reqData: object,  option?: object): Promise<any> {
        this._logger.step('Deposit', "into getList, reqData/paginator:", reqData);
        // 目前僅提供固定排序欄位
        // paginator['sortColName'] = 'fund1';
        return this.spec09020102.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log('Deposit', "send api success, success:", sucessObj);
                // this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log('Deposit', "send api failed, failed:", failedObj);
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
            content: 'POPUP.NOTE.FOREIGN_DATE'
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
            rangeNum: '24', // 查詢範圍限制
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
                set_obj['rangeNum'] = '24';
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
            date_data.rang = '2'; // 最大區間search(now=2019/10/23): 2019/08/24~2019/10/23
        } else {
            output.startDate = date_data.minDate;
            output.endDate = date_data.maxDate;
        }
        this.dateCheckList[set_key] = date_data;
        return output;
    }


    //帳戶明細帳號資訊
    private send05030101() {
        let output = {
            'BS3515': {
                'rowData': [
                    { 'status': '正常戶', 'accType': '203', 'amount': '964949', 'type': '活儲存款', 'acno': '02203000541801', 'nickName': '測試#*@#940616test', 'cyy': 'TWD', 'branchName': '營業部' },
                    { 'status': '正常戶', 'accType': '204', 'amount': '964953', 'type': '活儲存款', 'acno': '02203000542265', 'nickName': '測試#*@#940618test', 'cyy': 'USD', 'branchName': '松山分行' },
                    { 'status': '正常戶', 'accType': '205', 'amount': '964951', 'type': '活儲存款', 'acno': '02203000547466', 'nickName': '測試#*@#940617test', 'cyy': 'EUR', 'branchName': '板橋分行' }
                ]
            },
            'FS12': {
                'rowData': [
                    { 'status': '正常戶', 'accType': '302', 'type': '活期存款', 'cyy': 'TWD', 'acno': '02203000544495', 'nickName': '測試#*@#940631test', 'balmat': '20000', 'branchName': '中山分行' },
                    { 'status': '正常戶', 'accType': '307', 'type': '活儲存款', 'cyy': 'EUR', 'acno': '02203000536522', 'nickName': '測試#*@#940638test', 'balmat': '18000', 'branchName': '蘆洲分行' },
                    { 'status': '正常戶', 'accType': '304', 'type': '活期存款', 'cyy': 'JPY', 'acno': '02203000579556', 'nickName': '測試#*@#940636test', 'balmat': '100000', 'branchName': '新莊分行' }
                ]
            }
        };
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(output);
            }, 5000);
        });
    }


    // =====================================================================API End
}




