/**
 * 定期(不)定額查詢
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs/internal/Subject';
// -- library -- //
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
// -- api -- //
import { SPEC11050101ApiService } from '@api/spec11/spec11050101/spec11050101-api.service';
import { SPEC11050201ApiService } from '@api/spec11/spec11050201/spec11050201-api.service';
import { SPEC11050202ApiService } from '@api/spec11/spec11050202/spec11050202-api.service';
import { SPEC11050301ApiService } from '@api/spec11/spec11050301/spec11050301-api.service';
import { SPEC11050302ApiService } from '@api/spec11/spec11050302/spec11050302-api.service';
import { SPEC11050401ApiService } from '@api/spec11/spec11050401/spec11050401-api.service';
import { SPEC11050402ApiService } from '@api/spec11/spec11050402/spec11050402-api.service';

@Injectable()

export class FundInquiryModifyService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定
    private setCacheName = {
        'list': 'fund-inquiry-modify', // 列表
    };

    expandSubject: Subject<any> = new Subject<any>();

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec11050101: SPEC11050101ApiService,
        private spec11050201: SPEC11050201ApiService,
        private spec11050202: SPEC11050202ApiService,
        private spec11050301: SPEC11050301ApiService,
        private spec11050302: SPEC11050302ApiService,
        private spec11050401: SPEC11050401ApiService,
        private spec11050402: SPEC11050402ApiService
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
        return this.spec11050101.getPageData(reqData, option, paginator).then(
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

    /**
     * 
     * @param setStatus 扣款狀態 Y: 為此狀態, N: 不是此狀態
     * status01: 恢復扣款投資
     * status02: 暫停扣款投資
     * status03: 延長扣款投資期限至終止扣款為止
     * status04: 終止扣款投資
     * status05:取消暫停扣款投資期限約定
     * 若 status03, status04, status05: 需做額外顯示(再補), 先做暫停,恢復扣款顯示
     */
    formatePayStatus(setStatus) {
        this._logger.log("into formatePayStatus, setStatus:", setStatus);
        let output = {
            status: false,
            show: '--', // 顯示狀態 中文
            oldStatus: '--', // 舊狀態 中文
            changeStatus: '--', // 改變狀態 中文
            type: '', // '1': 恢復扣款, '2': 暫停扣款
            data: setStatus,
            msg: 'failed'
        };
        // 舊(恢復扣款) => 改(暫停扣款)
        if (setStatus.status01 == 'Y' && setStatus.status02 == 'N') {
            output.oldStatus = 'FUND_INQUIRY_STATUS_CHANGE.CONFIRM.RESTORE'; // 恢復扣款
            output.changeStatus = 'FUND_INQUIRY_STATUS_CHANGE.CONFIRM.PAUSE'; // 暫停扣款
            output.show = 'FUND_INQUIRY_STATUS_CHANGE.CONFIRM.PAUSE'; // 暫停扣款
            output.type = '2';
            // 舊(暫停扣款) => 改(恢復扣款)
        } else if (setStatus.status01 == 'N' && setStatus.status02 == 'Y') {
            output.oldStatus = 'FUND_INQUIRY_STATUS_CHANGE.CONFIRM.PAUSE'; // 暫停扣款
            output.changeStatus = 'FUND_INQUIRY_STATUS_CHANGE.CONFIRM.RESTORE'; // 恢復扣款
            output.show = 'FUND_INQUIRY_STATUS_CHANGE.CONFIRM.RESTORE'; // 恢復扣款
            output.type = '1';
            // 若都回N, 顯示錯誤
        } else if (setStatus.status01 == 'Y' && setStatus.status02 == 'Y') {
            return output;
            // 若都回Y, 顯示錯誤
        } else {
            return output;
        }
        output.status = true;
        output.msg = 'success';
        return output;
    }

    // 計算扣款日期天數
    formatePaydateCount(setData: string) {
        let output = {
            status: false,
            data: setData,
            array: [], // 字串轉成之陣列
            show: '' // 筆數, EX: 3
        };
        if (typeof setData == 'string') {
            let temp = setData.split(',');
            temp.forEach(item => {
                // 若為日期0~9去0, 選日期套件不支援含有0之天數
                if (parseInt(item) < 10) {
                    let count = item.replace('0', '');
                    output.array.push(count);
                } else {
                    output.array.push(item);
                }
            });
            output.show = (temp.length).toString();

        }
        return output;
    }

    /**
     * 日期個位數補0
     * @param setData 日期套件回傳的array, 每一筆都為數字number, 且個位數沒有補0
     */
    joinZeroDate(setData) {
        let output = {
            status: false,
            data: setData,
            array: [], // 字串轉成之陣列
            show: ''
        };
        if (setData.length > 0) {
            setData.forEach(item => {
                if (item < 10) {
                    let count = '0' + item.toString();
                    output.array.push(count);
                } else {
                    let count = item.toString();
                    output.array.push(count);
                }
            });
            output.show = (output.array).join();
        }
        return output;
    }

    /**
     * formate日期(顯示用) 中間有空格, EX: '01, 05, 14'
     * @param setDate 
     */
    formatePaydate(setDate: string) {
        let outStr = '';
        if (setDate.indexOf(',') > 0) {
            let temp = setDate.split(',');
            temp.forEach((tempItem, index) => {
                outStr += index < (temp.length - 1) ? tempItem + ', ' : tempItem;
            });
        } else {
            outStr = setDate;
        }
        return outStr;
    }

    /**
     * 檢核畫面資料(編輯頁)
     * @param req 檢查請求物件
     * @param type 功能類別, 'status': 修改扣款狀態, 'edit': 修改帳號日期金額
     */
    checkData(req, type, ruleData?) {
        this._logger.log("into checkData, req:", req);
        this._logger.log("into checkData,type:", type);
        let output = {
            status: false,
            msg: '請輸入正確資料', // 候補i18n
            data: {
                newPayAmount: '', // 投資金額
                newPayDate: '', // 扣款日期
                accountID: '', // 扣款帳號
                statusType: '' // 扣款狀態
            },
            error_data: [], // 有錯誤將訊息塞入 (判斷欄位檢核是否全過)
            error_list: {
                newPayAmount: '', // 投資金額
                newPayDate: '', // 扣款日期
                accountID: '', // 扣款帳號
                statusType: '' // 扣款狀態
            }
        };
        let setCurrency = this._formateService.checkField(ruleData, 'curency'); // 幣別
        let balance = this._formateService.checkField(ruleData, 'balance'); // 餘額
        // 修改帳號日期金額功能 檢核
        if (type == 'edit') {
            // 投資金額
            let newPayAmount_msg = '';
            output.data.newPayAmount = this._formateService.checkField(req, 'newPayAmount');
            let check_payAmt = this._checkService.checkMoney(req.newPayAmount, {
                currency: setCurrency, check_empty: true, not_zero: true
            });
            // 金額共同規則檢核失敗
            if (!check_payAmt.status) {
                newPayAmount_msg = check_payAmt.msg;
                output.error_list.newPayAmount = newPayAmount_msg;
                output.error_data.push(output.error_list.newPayAmount);
                // 金額共同規則檢核成功, 檢核業務邏輯規則
            } else {
                let amtRule = { balance: balance };
                let checkAmtRule = this.checkAmtRule(req.newPayAmount, amtRule);
                if (!checkAmtRule.status) {
                    newPayAmount_msg = checkAmtRule.msg;
                    output.error_list.newPayAmount = newPayAmount_msg;
                    output.error_data.push(output.error_list.newPayAmount);
                }
            }
            // 扣款日期
            let newPayDate_msg = '';
            output.data.newPayDate = this._formateService.checkField(req, 'newPayDate');
            let check_payDate = this._checkService.checkEmpty(req.newPayDate);
            if (!check_payDate.status) {
                newPayDate_msg = check_payDate.msg;
                output.error_list.newPayDate = newPayDate_msg;
                output.error_data.push(output.error_list.newPayDate);
            }
            // 扣款帳號
            let accountId_msg = '';
            output.data.accountID = this._formateService.checkField(req, 'accountID');
            let check_accountId = this._checkService.checkEmpty(req.accountID);
            if (!check_accountId.status) {
                accountId_msg = check_accountId.msg;
                output.error_list.accountID = accountId_msg;
                output.error_data.push(output.error_list.accountID);
            }
        }
        // 修改扣款狀態功能 檢核
        if (type == 'change-status') {
            let statusType_msg = '';
            output.data.statusType = this._formateService.checkField(req, 'checkedType');
            let check_statusType = this._checkService.checkEmpty(req.checkedType);
            if (!check_statusType.status) {
                statusType_msg = check_statusType.msg;
                output.error_list.statusType = statusType_msg;
                output.error_data.push(output.error_list.statusType);
            }
        }
        // 若無錯誤
        if (output.error_data.length == 0) {
            output.status = true;
            output.msg = '';
        }
        return output;
    }

    /**
     * 
     * @param setAmt 檢核畫面金額
     * @param amtRule 金額規則(需用到的欄位)
     */
    private checkAmtRule(setAmt, amtRule) {
        let output = {
            status: false,
            data: setAmt,
            msg: ''
        };
        let balance = this._formateService.checkField(amtRule, 'balance');
        // 金額不可輸入小數兩位
        if (setAmt.indexOf('.') > 0) {
            output.msg = 'CHECK.INPUT_INTEGER';
            return output;
        }
        // 扣款金額不可大於帳號餘額 2020/11/30 不檢核可用餘額
        // if (parseInt(setAmt) > parseInt(balance)) {
        //     output.msg = 'ERROR.BALANCE_NOTEOUUGH';
        //     return output;
        // }
        output.status = true;
        return output;
    }

    /**
     * 取得定期定額編輯(台幣)
     * @param reqData 
     * @param option 
     */
    getEditTwd(reqData, option): Promise<any> {
        this._logger.log("into getEditTwd, reqData:", reqData);
        return this.spec11050201.getData(reqData, option).then(
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
     * 取得定期定額確認(台幣)
     * @param reqData 
     * @param option 
     */
    getConfirmTwd(reqData, option): Promise<any> {
        this._logger.log("into getConfirmTwd, reqData:", reqData);
        return this.spec11050301.getData(reqData, option).then(
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
     * 送出變更結果(台幣)
     */
    sendResultTwd(reqData, option): Promise<any> {
        this._logger.log("into sendResultTwd, reqData:", reqData);
        return this.spec11050401.sendData(reqData, option).then(
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
     * 發送交易api前 request處理 (單筆外幣)
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    modifyResultTwd(reqData?, option?: object) {
        return this.spec11050401.modifyData(reqData, option);
    }

    /**
     * 取得定期定額編輯(外幣)
     * @param reqData 
     * @param option 
     */
    getEditForeign(reqData, option): Promise<any> {
        this._logger.log("into getEditForeign, reqData:", reqData);
        return this.spec11050202.getData(reqData, option).then(
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
     * 取得定期定額確認(外幣)
     * @param reqData 
     * @param option 
     */
    getConfirmForeign(reqData, option): Promise<any> {
        this._logger.log("into getConfirmForeign, reqData:", reqData);
        return this.spec11050302.getData(reqData, option).then(
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
     * 送出變更結果(台幣)
     */
    sendResultForeign(reqData, option): Promise<any> {
        this._logger.log("into sendResultTwd, reqData:", reqData);
        return this.spec11050402.sendData(reqData, option).then(
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
     * 發送交易api前 request處理 (單筆外幣)
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    modifyResultForeign(reqData?, option?: object) {
        return this.spec11050402.modifyData(reqData, option);
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

}




