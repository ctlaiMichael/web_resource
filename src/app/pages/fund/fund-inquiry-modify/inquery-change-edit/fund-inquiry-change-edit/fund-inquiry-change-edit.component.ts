/**
 * 定期定額修改-修改帳號,金額,日期
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { FormateService } from '@template/formate/formate.service';
import { FundInquiryModifyService } from '@pages/fund/shared/fund-inquiry-modify.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FundAcctPopupService } from '@template/list/fund-acct-popup/fund-acct-popup.service';
import { DateSelectService } from '@template/list/date-select-popup/date-select.service';

@Component({
    selector: 'app-fund-inquiry-change-edit',
    templateUrl: './fund-inquiry-change-edit.component.html',
    styleUrls: []
})

export class FundInquiryChangeEditComponent implements OnInit {
    @Input() setData: any;
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    nowPage = ''; // 當前頁面
    nowStep = 'edit'; // 當前步驟
    // 步驟列data
    stepMenuData = [
        {
            id: 'edit',
            name: 'FUND_INQUIRY_STATUS_CHANGE.stepMenuData.EDIT' // 輸入資料
        },
        {
            id: 'confirm',
            name: 'FUND_INQUIRY_STATUS_CHANGE.stepMenuData.CONFIRM' // 確認資料
        },
        {
            id: 'result',
            name: 'FUND_INQUIRY_STATUS_CHANGE.stepMenuData.RESULT', // 資料填寫
        }
    ];
    // 編輯頁request
    editReq = {
        investType: '', // 修改類別
        license: '', // 信託憑證
        fundCode: '', // 基金代號
        fundName: '' // 基金名稱
    };
    infoData: any; // 編輯頁資訊
    acctData: any = []; // 扣款帳號清單
    errorBoxMsg = ''; // 失敗錯誤訊息
    // 確認頁request, 此功能為「更改扣款狀態」,不會修改到其他資料,因此金額,日期,帳號...等欄位,直接帶查詢頁選擇的
    confirmReq = {
        license: '', // 信託憑證
        fundCode: '', // 基金代號
        fundName: '', // 基金名稱
        oldPayAmt: '', // 原投資金額
        oldPayDate: '', // 原扣款日期
        newPayAmount: '', // 投資金額
        newPayDate: '', // 扣款日期
        accountID: '' // 扣款帳號
    };
    confirmData: any; // 中台回應確認頁資料
    // 結果頁request
    resultReq = {
        license: '', // 信託憑證
        fundCode: '', // 基金代號
        investType: '', // 功能項目
        fundName: '', // 基金名稱
        oldPayAmt: '', // 原投資金額
        oldPayDate: '', // 原扣款日期
        newPayAmount: '', // 投資金額
        newPayDate: '', // 扣款日期
        accountID: '', // 扣款帳號
        isFullFund: '', // Fund已額滿(Y/N)
        isUnverifyFund: '', // Fund未核備(Y/N)
        status: '', // 扣款狀態, status1:恢復扣款投資, status4:終止扣款投資
        errorCount: '' // 扣款失敗次數
    };
    // 畫面顯示
    showData = {
        showFundName: '', // 投資標的formate過, 基金代號 + 基金名稱
        license: '', // 憑證號碼
        status: '', // 扣款狀態 中文
        amount: '', // 信託金額
        payDate: '', // 扣款日期
        payAccount: '', // 扣款帳號
        balance: '', // 可用餘額
        dateCount: '', // 日期天數
        oldStatus: '', // 舊狀態 中文
        changeStatus: '' // 改變狀態 中文
    };
    statusType = ''; // '1': 恢復扣款, '2': 暫停扣款
    resultData: any; // 中台回應結果頁資料
    showIsForeignOldID = false; // 是否顯示舊外國人ID提示
    // 扣款帳號下拉相關
    popupOption = {
        data: [],
        select: '', // 選擇之帳號，帳號打勾使用
        type: '5', // 定期定額修改
        currency: '' // 幣別
    };
    // 給popup顯示資訊(扣款日期)
    dateOption = {
        title: '',
        dateType: '1', // '1': 每月, '2': 每周
        dateArr: []
    };
    // 檢核錯誤訊息
    errorMsg = {
        newPayAmount: '', // 投資金額
        newPayDate: '', // 扣款日期
        accountID: '' // 扣款帳號
    };

    constructor(
        private _logger: Logger,
        private _headerCtrl: HeaderCtrlService,
        private _formateService: FormateService,
        private _mainService: FundInquiryModifyService,
        private handleError: HandleErrorService,
        private popupService: FundAcctPopupService,
        private _formateServcie: FormateService,
        private dateSelectService: DateSelectService
    ) { }

    ngOnInit() {
        this._logger.log("into FundInquiryChangeEditComponent, setData:", this.setData);
        this._initEvent();
    }

    private _initEvent() {
        // 設定左側按鈕
        this._headerCtrl.setLeftBtnClick(() => {
            this.onBackPageData(this.setData, 'change-status', 'back');
        });
        this.editReq = {
            investType: 'type1', // 金額,日期,帳號
            license: this._formateService.checkField(this.setData, 'license'),
            fundCode: this._formateService.checkField(this.setData, 'fundCode'),
            fundName: this._formateService.checkField(this.setData, 'fundName')
        };
        // 設定安控相關資訊
        let curency = this._formateService.checkField(this.setData, 'engCcy');
        this.popupOption.currency = curency;
        // 外幣
        if (curency != 'TWD' && curency != 'NTD') {
            this.getEditForeign();
            // 台幣
        } else {
            this.getEditTwd();
        }
    }

    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onBackPageData(item, page?: string, type?: string) {
        let output = {
            'page': 'list-page',
            'type': 'back',
            'data': item
        };
        if (typeof page != 'undefined') {
            output.page = page;
        }
        if (typeof type != 'undefined') {
            output.type = type;
        }
        this._logger.log("into onBackPageData, output:", output);
        this.backPageEmit.emit(output);
    }

    // 點擊 取消
    onCancel() {
        this._logger.log("into onCancel");
        this.onBackPageData({}, 'change-edit', 'home');
    }

    // 點擊 下一步
    onNext() {
        this._logger.log("into onNext");
        this.confirmReq = {
            license: this._formateServcie.checkField(this.showData, 'license'), // 信託憑證
            fundCode: this._formateServcie.checkField(this.setData, 'fundCode'), // 基金代號
            fundName: this._formateServcie.checkField(this.setData, 'fundName'), // 基金名稱
            oldPayAmt: this._formateServcie.checkField(this.infoData, 'amtm'), // 原投資金額
            oldPayDate: this._formateServcie.checkField(this.infoData, 'payDate'), // 原扣款日期
            newPayAmount: this._formateServcie.checkField(this.showData, 'amount'), // 投資金額
            newPayDate: this._formateServcie.checkField(this.showData, 'payDate'), // 扣款日期
            accountID: this._formateServcie.checkField(this.showData, 'payAccount') // 扣款帳號
        };
        this._logger.log("onNext, confirmReq:", this.confirmReq);
        let curency = this._formateService.checkField(this.setData, 'engCcy');
        let ruleData = { curency: curency, balance: this.showData.balance }; // 檢核業務邏輯規則物件
        let checkData = this._mainService.checkData(this.confirmReq, 'edit', ruleData);
        // 檢核失敗
        if (!checkData.status) {
            this._logger.log("checkData status false, checkData:", checkData);
            this.errorMsg.accountID = checkData.error_list.accountID;
            this.errorMsg.newPayAmount = checkData.error_list.newPayAmount;
            this.errorMsg.newPayDate = checkData.error_list.newPayDate;
            return false;
            // 檢核成功
        } else {
            this.errorMsg.accountID = '';
            this.errorMsg.newPayAmount = '';
            this.errorMsg.newPayDate = '';
            // 外幣
            if (curency != 'TWD' && curency != 'NTD') {
                this.getConfirmForeign(this.confirmReq)
                // 台幣
            } else {
                this.getConfirmTwd(this.confirmReq);
            }
        }
    }

    // 點擊 扣款帳號清單
    onSelectInAcct() {
        // 回傳使用者選擇之帳號
        this.popupService.show(this.popupOption).then(
            (result) => {
                this._logger.log("onSelectInAcct, result:", result);
                this.showData.payAccount = result['accountID'];
                this.showData.balance = result['amount'];
                // 回來將預設帳號帶入，顯示下次開啟視窗之選擇帳號
                this.popupOption.select = this.showData.payAccount;
            },
            (cancel) => {
                this._logger.log("into cancel");
            }
        );
    }

    // 點擊 扣款日期
    onInvestDate() {
        this._logger.log("into onInvestDate, dateOption:", this.dateOption);
        this.dateSelectService.show(this.dateOption).then(
            (result) => {
                this._logger.log("onInvestDate, result:", result);
                let investDate = this._formateServcie.checkObjectList(result, 'data');
                // 計算天數
                let formate = investDate.join();
                let formateCount = this._mainService.formatePaydateCount(formate);
                this.showData.dateCount = formateCount.show;
                // 因為套件回傳的值沒補0,這裡將個位數日期補0
                let formateZero = this._mainService.joinZeroDate(investDate);
                this.showData.payDate = formateZero.show;
                this.dateOption.dateArr = investDate; // 帶入下一次預設勾選日期
            },
            (cancel) => {
                this._logger.log("into cancel");
            }
        );
    }

    /**
     * 子層返回事件(分頁)
     * @param e
     */
    onPageBackEvent(e) {
        this._logger.log('Deposit', 'onPageBackEvent123', e);
        let page = 'list';
        let pageType = 'list';
        let tmp_data: any;
        if (typeof e === 'object') {
            if (e.hasOwnProperty('page')) {
                page = e.page;
            }
            if (e.hasOwnProperty('type')) {
                pageType = e.type;
            }
            if (e.hasOwnProperty('data')) {
                tmp_data = e.data;
            }
        }
        // 確認頁返回
        if (page == 'confirm' && pageType == 'back') {
            this.nowPage = 'edit'; // 顯示編輯頁
            // 設定返回事件
            this._headerCtrl.setLeftBtnClick(() => {
                this.onBackPageData(this.setData, 'change-status', 'back');
            });
            // 點擊取消
        } else if (pageType == 'home') {
            this.onCancel();
            // 修改金額日期帳號 結果頁點擊修改
        } else if (page == 'change-edit-special' && pageType == 'retry') {
            // 設定左側按鈕
            this._headerCtrl.setOption({ leftBtnIcon: 'edit-back', rightBtnIcon: '' });
            this._headerCtrl.setLeftBtnClick(() => {
                this.onBackPageData(this.setData, 'change-status', 'back');
            });
            this.doRetry(tmp_data);
        }
    }

    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onErrorPageData(item) {
        // let output = {
        //   'page': 'list-page',
        //   'type': 'back',
        //   'data': item
        // };
        // this._logger.step('Deposit', 'detail back', item);
        // this._logger.log("into onErrorPageData, output:", output);
        // this.errorPageEmit.emit(output);
    }

    /**
     * 取得定期定額編輯 台幣
     */
    private getEditTwd() {
        this._logger.log("into getEditTwd, editReq:", this.editReq);
        this._mainService.getEditTwd(this.editReq, {}).then(
            (result) => {
                this._logger.log("getEditTwd, result:", result);
                this.infoData = result.infoData;
                this.acctData = result.accountList; // 帳號清單
                // 以下處理顯示畫面資料
                let fundCode = this._formateService.checkField(this.infoData, 'fundCode');
                let fundName = this._formateService.checkField(this.infoData, 'fundName');
                let defaultAcct = this._formateService.checkField(result.defaultAcct, 'accountID');
                let defaultAmt = this._formateService.checkField(result.defaultAcct, 'amount');
                let dateTemp = this._formateServcie.checkField(this.infoData, 'payDate');
                let formateCount = this._mainService.formatePaydateCount(dateTemp); // 計算日期天數
                let count = formateCount.show;
                this.dateOption.dateArr = formateCount.array; // 點擊日期清單 顯示哪些勾選
                // 畫面顯示處理
                this.showData = {
                    showFundName: fundCode + ' ' + fundName, // 投資標的formate過, 基金代號 + 基金名稱
                    license: this._formateService.checkField(this.setData, 'license'), // 憑證號碼(編輯頁api沒回,帶查詢頁資料)
                    status: this._formateServcie.checkField(this.setData, 'status'), // 扣款狀態 中文
                    amount: this._formateService.checkField(this.infoData, 'amtm'), // 信託金額
                    payDate: this._formateService.checkField(this.infoData, 'payDate'), // 扣款日期
                    payAccount: defaultAcct, // 扣款帳號
                    balance: defaultAmt, // 可用餘額
                    dateCount: count, // 日期天數
                    oldStatus: this._formateServcie.checkField(this.setData, 'status'), // 舊狀態 中文
                    changeStatus: this._formateServcie.checkField(this.setData, 'status') // 改變狀態 中文
                };
                // 處理帳號popup清單
                this.popupOption.select = result.defaultAcct.accountID; // 下一次點開選擇之帳號
                this.popupOption.data = this.acctData;
                this.nowPage = 'edit';
            },
            (errorObj) => {
                this._logger.log("getEditTwd, errorObj:", errorObj);
                this.handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorBox'; // 錯誤頁面
            }
        );
    }

    /**
     * 取得確認頁 台幣
     */
    private getConfirmTwd(confirmReq) {
        this._logger.log("into getConfirmTwd");
        this._mainService.getConfirmTwd(confirmReq, {}).then(
            (result) => {
                this._logger.log("getConfirmTwd, result:", result);
                this.confirmData = result.infoData;
                this._logger.log("getConfirmTwd, confirmData:", this.confirmData);
                this.resultReq = {
                    license: this._formateServcie.checkField(this.confirmReq, 'license'), // 信託憑證
                    fundCode: this._formateServcie.checkField(this.confirmReq, 'fundCode'), // 基金代號
                    investType: 'type1', // 功能項目, 'type1': 修改帳號金額日期 
                    fundName: this._formateServcie.checkField(this.confirmReq, 'fundName'), // 基金名稱
                    oldPayAmt: this._formateServcie.checkField(this.confirmReq, 'oldPayAmt'), // 原投資金額
                    oldPayDate: this._formateServcie.checkField(this.confirmReq, 'oldPayDate'), // 原扣款日期
                    newPayAmount: this._formateServcie.checkField(this.confirmReq, 'newPayAmount'), // 投資金額
                    newPayDate: this._formateServcie.checkField(this.confirmReq, 'newPayDate'), // 扣款日期
                    accountID: this._formateServcie.checkField(this.confirmReq, 'accountID'), // 扣款帳號
                    isFullFund: this._formateServcie.checkField(this.confirmData, 'isFullFund'), // Fund已額滿(Y/N)
                    isUnverifyFund: this._formateServcie.checkField(this.confirmData, 'isUnverifyFund'), // Fund未核備(Y/N)
                    status: '', // 扣款狀態, status1:恢復扣款投資, status4:終止扣款投資 *待補)
                    errorCount: this._formateServcie.checkField(this.infoData, 'errorCount') // 扣款失敗次數
                };
                this.nowPage = 'confirm'; // 成功顯示確認頁
            },
            (errorObj) => {
                this._logger.log("getConfirmTwd, errorObj:", errorObj);
                this.handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorBox'; // 錯誤頁面
            }
        );
    }

    /**
     * 取得定期定額編輯 外幣
     */
    private getEditForeign() {
        this._logger.log("into getEditForeign, editReq:", this.editReq);
        this._mainService.getEditForeign(this.editReq, {}).then(
            (result) => {
                this._logger.log("getEditForeign, result:", result);
                this.infoData = result.infoData;
                this.acctData = result.accountList; // 帳號清單
                // 以下處理顯示畫面資料
                let fundCode = this._formateService.checkField(this.infoData, 'fundCode');
                let fundName = this._formateService.checkField(this.infoData, 'fundName');
                let defaultAcct = this._formateService.checkField(result.defaultAcct, 'accountID');
                let defaultAmt = this._formateService.checkField(result.defaultAcct, 'amount');
                let dateTemp = this._formateServcie.checkField(this.infoData, 'payDate');
                let formateCount = this._mainService.formatePaydateCount(dateTemp); // 計算日期天數
                let count = formateCount.show;
                this.dateOption.dateArr = formateCount.array; // 點擊日期清單 顯示哪些勾選
                // 畫面顯示處理
                this.showData = {
                    showFundName: fundCode + ' ' + fundName, // 投資標的formate過, 基金代號 + 基金名稱
                    license: this._formateService.checkField(this.setData, 'license'), // 憑證號碼(編輯頁api沒回,帶查詢頁資料)
                    status: this._formateServcie.checkField(this.setData, 'status'), // 扣款狀態 中文
                    amount: this._formateService.checkField(this.infoData, 'amtm'), // 信託金額
                    payDate: this._formateService.checkField(this.infoData, 'payDate'), // 扣款日期
                    payAccount: defaultAcct, // 扣款帳號
                    balance: defaultAmt, // 可用餘額
                    dateCount: count, // 日期天數
                    oldStatus: this._formateServcie.checkField(this.setData, 'status'), // 舊狀態 中文
                    changeStatus: this._formateServcie.checkField(this.setData, 'status') // 改變狀態 中文
                };
                // 處理帳號popup清單
                this.popupOption.select = result.defaultAcct.accountID; // 下一次點開選擇之帳號
                this.popupOption.data = this.acctData;
                this.nowPage = 'edit';
            },
            (errorObj) => {
                this._logger.log("getEditForeign, errorObj:", errorObj);
                this.handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorBox'; // 錯誤頁面
            }
        );
    }

    /**
     * 取得確認頁 外幣
     */
    private getConfirmForeign(confirmReq) {
        this._logger.log("into getConfirmForeign");
        this._mainService.getConfirmForeign(confirmReq, {}).then(
            (result) => {
                this._logger.log("getConfirmForeign, result:", result);
                this.confirmData = result.infoData;
                this._logger.log("getConfirmForeign, confirmData:", this.confirmData);
                this.resultReq = {
                    license: this._formateServcie.checkField(this.confirmReq, 'license'), // 信託憑證
                    fundCode: this._formateServcie.checkField(this.confirmReq, 'fundCode'), // 基金代號
                    investType: 'type1', // 功能項目, 'type1': 修改帳號金額日期 
                    fundName: this._formateServcie.checkField(this.confirmReq, 'fundName'), // 基金名稱
                    oldPayAmt: this._formateServcie.checkField(this.confirmReq, 'oldPayAmt'), // 原投資金額
                    oldPayDate: this._formateServcie.checkField(this.confirmReq, 'oldPayDate'), // 原扣款日期
                    newPayAmount: this._formateServcie.checkField(this.confirmReq, 'newPayAmount'), // 投資金額
                    newPayDate: this._formateServcie.checkField(this.confirmReq, 'newPayDate'), // 扣款日期
                    accountID: this._formateServcie.checkField(this.confirmReq, 'accountID'), // 扣款帳號
                    isFullFund: this._formateServcie.checkField(this.confirmData, 'isFullFund'), // Fund已額滿(Y/N)
                    isUnverifyFund: this._formateServcie.checkField(this.confirmData, 'isUnverifyFund'), // Fund未核備(Y/N)
                    status: '', // 扣款狀態, status1:恢復扣款投資, status4:終止扣款投資 *待補)
                    errorCount: this._formateServcie.checkField(this.infoData, 'errorCount') // 扣款失敗次數
                };
                this.nowPage = 'confirm'; // 成功顯示確認頁
            },
            (errorObj) => {
                this._logger.log("getConfirmForeign, errorObj:", errorObj);
                this.handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorBox'; // 錯誤頁面
            }
        );
    }

    /**
     * 
     * @param setData 查詢頁資料(結果頁返回_重做)
     */
    private doRetry(setData) {
        this.editReq = {
            investType: 'type1', // 金額,日期,帳號
            license: this._formateService.checkField(setData, 'license'),
            fundCode: this._formateService.checkField(setData, 'fundCode'),
            fundName: this._formateService.checkField(setData, 'fundName')
        };
        // 設定安控相關資訊
        let curency = this._formateService.checkField(setData, 'engCcy');
        this.popupOption.currency = curency;
        // 外幣
        if (curency != 'TWD' && curency != 'NTD') {
            this.getEditForeign();
            // 台幣
        } else {
            this.getEditTwd();
        }
    }
}