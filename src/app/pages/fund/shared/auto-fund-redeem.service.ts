/**
 * 理財妙管家
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs/internal/Subject';
// -- library -- //
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
// -- api -- //
import { SPEC11060101ApiService } from '@api/spec11/spec11060101/spec11060101-api.service';
import { SPEC11060201ApiService } from '@api/spec11/spec11060201/spec11060201-api.service';
import { SPEC11060301ApiService } from '@api/spec11/spec11060301/spec11060301-api.service';

@Injectable()

export class AutoFundRedeemService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定
    private setCacheName = {
        'list': 'fund-auto-reddem', // 列表
    };

    expandSubject: Subject<any> = new Subject<any>();

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec11060101: SPEC11060101ApiService,
        private spec11060201: SPEC11060201ApiService,
        private spec11060301: SPEC11060301ApiService
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
    getListData(reqData: object, paginator: object, option?: object): Promise<any> {
        this._logger.step('Deposit', "into getList, reqData/paginator:", reqData, paginator);
        // let check_id = this._formateService.checkField(reqData, 'searchType');
        // let start_date = this._formateService.checkField(reqData, 'startDate');
        // let end_date = this._formateService.checkField(reqData, 'endDate');
        // tslint:disable-next-line: radix
        // let page = parseInt(this._formateService.checkField(paginator, 'pageNumber'));
        // let sort = this._formateService.checkField(paginator, 'sortDirection');
        // if (check_id === '') {
        //     return Promise.reject({
        //         title: 'ERROR.TITLE',
        //         content: 'ERROR.DATA_FORMAT_ERROR'
        //     });
        // }

        let cache_main_key = this.setCacheName.list;
        let cache_sub_key = [];
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
        paginator['sortColName'] = 'fundCode';
        return this.spec11060101.getPageData(reqData, option, paginator).then(
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
            content: 'POPUP.NOTE.FOREIGN_DATE'
        };
        return noteData;
    }


    // 取得理財妙管家修改資料
    getModifyData(reqData: object, option?: object): Promise<any> {
        return this.spec11060201.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.step('Deposit', "send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.step('Deposit', "send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 發送交易api前 request處理 (單筆外幣)
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    modifyResult(reqData?, option?: object) {
        return this.spec11060301.modifyData(reqData, option);
    }

    /**
     * 
     * @param reqData 請求
     * @param option 模式帶入安控
     */
    sendResultData(reqData, option) {
        this._logger.log("into sendResultData, reqData:", reqData);
        return this.spec11060301.sendData(reqData, option).then(
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


    /**
     * 若中台停損停利值有回應 '+','-','%'就將它清除,轉為純數字
     */
    formateBeneLoss(value) {
        let output = value;
        if (typeof value == 'string' && value != '') {
            let reg = /[\-|\+|\%]/g;
            output = value.replace(reg, '');
        } else {
            output = 'AUTO_FUND_REDEEM.HAS_NOTSET';
        }
        return output;
    }

    /**
     * 檢核畫面資料
     * @param req 檢查請求物件, 目前只有檢查停損值
     */
    checkData(req) {
        this._logger.log("into checkData, req:", req);
        let output = {
            status: false,
            msg: '請輸入正確資料', // 候補i18n
            data: {
                inputLoss: '', // 停損點
                inputBene: '' // 停利點 
            },
            error_data: [], // 有錯誤將訊息塞入 (判斷欄位檢核是否全過)
            error_list: {
                inputLoss: '',
                inputBene: ''
            }
        };
        // 輸入之停損點
        let loss_msg = '';
        output.data.inputLoss = this._formateService.checkField(req, 'inputLoss');
            let loss = parseInt(output.data.inputLoss);
            if ((loss < 5 && loss != 0) || loss > 30) {
                loss_msg = 'AUTO_REDEEM_MODIFY.CHECK.LOSS_RANGE';
                output.error_list.inputLoss = loss_msg;
                output.error_data.push(output.error_list.inputLoss);
        }
        // 輸入之停利點
        let bene_msg = '';
        output.data.inputBene = this._formateService.checkField(req, 'inputBene');
            let bene = parseInt(output.data.inputBene);
            if((bene < 5 && bene != 0) || bene > 30) {
                bene_msg = 'AUTO_REDEEM_MODIFY.CHECK.BENE_RANGE';
                output.error_list.inputBene = bene_msg;
                output.error_data.push(output.error_list.inputBene);
        }
        // 若無錯誤
        if (output.error_data.length == 0) {
            output.status = true;
            output.msg = '';
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


    // =====================================================================API End
}




