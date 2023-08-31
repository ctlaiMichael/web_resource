/**
 * 定期定額修改-暫停,恢復扣款
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { FormateService } from '@template/formate/formate.service';
import { FundInquiryModifyService } from '@pages/fund/shared/fund-inquiry-modify.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Component({
    selector: 'app-fund-inquiry-change-status',
    templateUrl: './fund-inquiry-change-status.component.html',
    styleUrls: []
})

export class FundInquiryChangeStatusComponent implements OnInit {
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
    // 控制勾選狀態清單
    // checkedType = '';
    checkedData = {
        status01: false, // 恢復扣款
        status02: false, // 暫停扣款
        status03: false, // 延長扣款
        status04: false, // 終止扣款
        status05: false // 取消暫停扣款
    };
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
        checkedType: '', // 扣款狀態
        status: '', // 扣款狀態 中文
        // amount: '', // 信託金額
        // payDate: '', // 扣款日期
        // payAccount: '', // 扣款帳號
        oldStatus: '' // 舊狀態 中文
        // changeStatus: '' // 改變狀態 中文
    };
    // 檢核錯誤訊息
    errorMsg = {
        checkedType: '' // 扣款狀態
    };
    statusType = ''; // '1': 恢復扣款, '2': 暫停扣款
    resultData: any; // 中台回應結果頁資料
    showIsForeignOldID = false; // 是否顯示舊外國人ID提示
    //------ 安控相關 ------
    // 安控設定檔
    setSecurity = {
        transServiceId: '', // 交易結果電文
        nameOfSecurity: 'INQUIRYCHANGESTATUS', // 交易權限設定 (輸入,快速登入)
        inAccount: '', // 轉入帳號
        outAccount: '', // 轉出帳號
        currency: '', // 幣別
        amount: '', // 轉帳金額
    };
    // 控制安控送出的變數
    securityAction = { method: 'init' };
    // 目前安控方法的物件 { name: '手機確認碼認證', id: '2', checkList: [ 'otp'], inputValue: true  },
    securityObj: any; // 安控回傳物件
    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj

    constructor(
        private _logger: Logger,
        private _headerCtrl: HeaderCtrlService,
        private _formateService: FormateService,
        private _mainService: FundInquiryModifyService,
        private handleError: HandleErrorService,
        private _formateServcie: FormateService,
        private _handleError: HandleErrorService
    ) { }

    ngOnInit() {
        this._logger.log("into FundInquiryChangeStatusComponent, setData:", this.setData);
        this._initEvent();
    }

    private _initEvent() {
        // 設定左側按鈕
        this._headerCtrl.setLeftBtnClick(() => {
            this.onBackPageData(this.setData, 'change-status', 'back');
        });
        this.editReq = {
            investType: 'type2', // 恢復、暫停
            license: this._formateService.checkField(this.setData, 'license'),
            fundCode: this._formateService.checkField(this.setData, 'fundCode'),
            fundName: this._formateService.checkField(this.setData, 'fundName')
        };
        // 設定安控相關資訊
        let curency = this._formateService.checkField(this.setData, 'engCcy');
        this.setSecurity.currency = curency;
        // 台幣
        if (curency == 'TWD' || curency == 'NTD') {
            this.setSecurity.transServiceId = 'SPEC11050401';
            this.getEditTwd();
            // 外幣
        } else {
            this.setSecurity.transServiceId = 'SPEC11050402';
            this.getEditForeign();
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
        this.onBackPageData({}, 'change-status', 'home');
    }

    onNext() {
        this._logger.log("into onNext");
        this.confirmReq = {
            license: this._formateServcie.checkField(this.showData, 'license'), // 信託憑證
            fundCode: this._formateServcie.checkField(this.setData, 'fundCode'), // 基金代號
            fundName: this._formateServcie.checkField(this.setData, 'fundName'), // 基金名稱
            oldPayAmt: this._formateServcie.checkField(this.infoData, 'amtm'), // 原投資金額
            oldPayDate: this._formateServcie.checkField(this.infoData, 'payDate'), // 原扣款日期
            newPayAmount: this._formateServcie.checkField(this.infoData, 'amtm'), // 投資金額
            newPayDate: this._formateServcie.checkField(this.infoData, 'payDate'), // 扣款日期
            accountID: this._formateServcie.checkField(this.infoData, 'payAccount') // 扣款帳號
        };
        this._logger.log("onNext, confirmReq:", this.confirmReq);
        let curency = this._formateService.checkField(this.setData, 'engCcy');
        let checkData = this._mainService.checkData(this.showData, 'change-status');
        // 檢核失敗
        if (!checkData.status) {
            // 為勾選alert錯誤訊息
            this._handleError.handleError({
                title: 'POPUP.ALERT.TITLE',
                content: 'ERROR.SELECT_STATUSTYPE', // 請選擇扣款狀態
                backType: 'dialog'
            });
            return false;
            // 檢核成功
        } else {
            this.errorMsg.checkedType = '';
            // 外幣
            if (curency != 'TWD' && curency != 'NTD') {
                this.getConfirmForeign()
                // 台幣
            } else {
                this.getConfirmTwd();
            }
        }
    }

    /**
     * 勾選扣款狀態
     * @param setType 勾選狀態
     */
    onCheckStatus(setType) {
        this.showData.checkedType = setType;
        // 每次勾選先還原預設
        this.checkedData = {
            status01: false, // 恢復扣款
            status02: false, // 暫停扣款
            status03: false, // 延長扣款
            status04: false, // 終止扣款
            status05: false // 取消暫停扣款
        };
        this.checkedData[setType] = true;
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
                this.acctData = result.accountList;
                // 畫面顯示處理
                let fundCode = this._formateService.checkField(this.infoData, 'fundCode');
                let fundName = this._formateService.checkField(this.infoData, 'fundName');
                this.showData = {
                    showFundName: fundCode + ' ' + fundName, // 投資標的formate過, 基金代號 + 基金名稱
                    license: this._formateService.checkField(this.setData, 'license'), // 憑證號碼(編輯頁api沒回,帶查詢頁資料)
                    checkedType: '', // 扣款狀態
                    status: '', // 扣款狀態 中文
                    oldStatus: this._formateServcie.checkField(this.setData, 'status') // 舊狀態 中文
                };
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
    private getConfirmTwd() {
        this._logger.log("into getConfirmTwd");
        this.confirmReq = {
            license: this._formateService.checkField(this.setData, 'license'), // 信託憑證
            fundCode: this._formateService.checkField(this.setData, 'fundCode'), // 基金代號
            fundName: this._formateService.checkField(this.setData, 'fundName'), // 基金名稱
            oldPayAmt: this._formateService.checkField(this.setData, 'amt'), // 原投資金額
            oldPayDate: this._formateService.checkField(this.setData, 'chgDate'), // 原扣款日期
            newPayAmount: this._formateService.checkField(this.setData, 'amt'), // 投資金額
            newPayDate: this._formateService.checkField(this.setData, 'chgDate'), // 扣款日期
            accountID: this._formateService.checkField(this.setData, 'accountID') // 扣款帳號
        };
        this._mainService.getConfirmTwd(this.confirmReq, {}).then(
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
                    status: this._formateServcie.checkField(this.showData, 'checkedType'), // 扣款狀態, status1:恢復扣款投資, status4:終止扣款投資 *待補)
                    errorCount: this._formateServcie.checkField(this.infoData, 'errorCount') // 扣款失敗次數
                };
                this._logger.log("set resultReq:", this.resultReq);
                // 設定新扣款狀態 中文
                switch (this.showData.checkedType) {
                    case 'status01':
                        this.showData.status = 'STATUS_TYPE.STATUS01'; // 恢復扣款
                        break;
                    case 'status02':
                        this.showData.status = 'STATUS_TYPE.STATUS02'; // 暫停扣款
                        break;
                    case 'status03':
                        this.showData.status = 'STATUS_TYPE.STATUS03'; // 延長扣款投資期限至終止扣款為止
                        break;
                    case 'status04':
                        this.showData.status = 'STATUS_TYPE.STATUS04'; // 終止扣款
                        break;
                    case 'status05':
                        this.showData.status = 'STATUS_TYPE.STATUS05'; // 取消暫停扣款投資期限約定
                        break;
                    default:
                        this._logger.log("into default showData.status undefind");
                        break;
                }
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
                this.acctData = result.accountList;
                // 畫面顯示處理
                let fundCode = this._formateService.checkField(this.infoData, 'fundCode');
                let fundName = this._formateService.checkField(this.infoData, 'fundName');
                this.showData = {
                    showFundName: fundCode + ' ' + fundName, // 投資標的formate過, 基金代號 + 基金名稱
                    license: this._formateService.checkField(this.setData, 'license'), // 憑證號碼(編輯頁api沒回,帶查詢頁資料)
                    checkedType: '', // 扣款狀態
                    status: '', // 扣款狀態 中文
                    oldStatus: this._formateServcie.checkField(this.setData, 'status') // 舊狀態 中文
                };
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
    private getConfirmForeign() {
        this._logger.log("into getConfirmForeign");
        this.confirmReq = {
            license: this._formateService.checkField(this.setData, 'license'), // 信託憑證
            fundCode: this._formateService.checkField(this.setData, 'fundCode'), // 基金代號
            fundName: this._formateService.checkField(this.setData, 'fundName'), // 基金名稱
            oldPayAmt: this._formateService.checkField(this.setData, 'amt'), // 原投資金額
            oldPayDate: this._formateService.checkField(this.setData, 'chgDate'), // 原扣款日期
            newPayAmount: this._formateService.checkField(this.setData, 'amt'), // 投資金額
            newPayDate: this._formateService.checkField(this.setData, 'chgDate'), // 扣款日期
            accountID: this._formateService.checkField(this.setData, 'accountID') // 扣款帳號
        };
        this._mainService.getConfirmForeign(this.confirmReq, {}).then(
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
                    status: this._formateServcie.checkField(this.showData, 'checkedType'), // 扣款狀態, status1:恢復扣款投資, status4:終止扣款投資 *待補)
                    errorCount: this._formateServcie.checkField(this.infoData, 'errorCount') // 扣款失敗次數
                };
                this._logger.log("set resultReq:", this.resultReq);
                // 設定新扣款狀態 中文
                switch (this.showData.checkedType) {
                    case 'status01':
                        this.showData.status = 'STATUS_TYPE.STATUS01'; // 恢復扣款
                        break;
                    case 'status02':
                        this.showData.status = 'STATUS_TYPE.STATUS02'; // 暫停扣款
                        break;
                    case 'status03':
                        this.showData.status = 'STATUS_TYPE.STATUS03'; // 延長扣款投資期限至終止扣款為止
                        break;
                    case 'status04':
                        this.showData.status = 'STATUS_TYPE.STATUS04'; // 終止扣款
                        break;
                    case 'status05':
                        this.showData.status = 'STATUS_TYPE.STATUS05'; // 取消暫停扣款投資期限約定
                        break;
                    default:
                        this._logger.log("into default showData.status undefind");
                        break;
                }
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
            this.onCheckStatus(this.showData.checkedType);
            // 點擊取消
        } else if (pageType == 'home') {
            this.onCancel();
            // 修改狀態 結果頁點擊 變更扣款狀態
        } else if (page == 'change-status-special' && pageType == 'retry') {
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
 * 
 * @param setData 查詢頁資料(結果頁返回_重做)
 */
    private doRetry(setData) {
        this.editReq = {
            investType: 'type2', // 恢復、暫停
            license: this._formateService.checkField(setData, 'license'),
            fundCode: this._formateService.checkField(setData, 'fundCode'),
            fundName: this._formateService.checkField(setData, 'fundName')
        };
        // 每次勾選先還原預設
        this.checkedData = {
            status01: false, // 恢復扣款
            status02: false, // 暫停扣款
            status03: false, // 延長扣款
            status04: false, // 終止扣款
            status05: false // 取消暫停扣款
        };
        // 設定安控相關資訊
        let curency = this._formateService.checkField(setData, 'engCcy');
        this.setSecurity.currency = curency;
        // 台幣
        if (curency == 'TWD' || curency == 'NTD') {
            this.setSecurity.transServiceId = 'SPEC11050401';
            this.getEditTwd();
            // 外幣
        } else {
            this.setSecurity.transServiceId = 'SPEC11050402';
            this.getEditForeign();
        }
    }
}