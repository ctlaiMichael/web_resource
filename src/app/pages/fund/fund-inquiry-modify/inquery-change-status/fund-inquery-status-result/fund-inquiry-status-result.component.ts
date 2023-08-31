/**
 * 定期定額修改-修改扣款狀態(確認,結果頁)
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { FormateService } from '@template/formate/formate.service';
import { FundInquiryModifyService } from '@pages/fund/shared/fund-inquiry-modify.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Component({
    selector: 'app-fund-inquiry-status-result',
    templateUrl: './fund-inquiry-status-result.component.html',
    styleUrls: []
})

export class FundInquiryStatusResultComponent implements OnInit {
    @Input() showData: any; // 顯示畫面資料
    @Input() queryData: any; // 查詢頁資料
    @Input() resultReq: any; // 交易api
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    nowPage = ''; // 當前頁面
    nowStep = 'confirm'; // 當前步驟
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
    currency = ''; // 幣別
    statusType = ''; // '1': 恢復扣款, '2': 暫停扣款
    resultData: any; // 中台回應結果頁資料
    showIsForeignOldID = false; // 是否顯示舊外國人ID提示
    //------ 安控相關 ------
    // 安控設定檔
    setSecurity = {
        transServiceId: '', // 交易結果電文
        nameOfSecurity: 'INQUIRYCHANGESTATUS', // 交易權限設定 (輸入,快速登入)
        signText: {},
        inAccount: '', // 轉入帳號
        outAccount: '', // 轉出帳號
        currency: '', // 幣別
        amount: '', // 轉帳金額
    };
    setSecurityError: any = {}; // 安控錯誤變數
    // 控制安控送出的變數
    securityAction: any = { method: 'init' };
    // 目前安控方法的物件 { name: '手機確認碼認證', id: '2', checkList: [ 'otp'], inputValue: true  },
    securityObj: any; // 安控回傳物件
    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj

    constructor(
        private _logger: Logger,
        private _headerCtrl: HeaderCtrlService,
        private _formateService: FormateService,
        private _mainService: FundInquiryModifyService,
        private handleError: HandleErrorService
    ) { }

    ngOnInit() {
        this._logger.log("into FundInquiryConfirmResultComponent, showData:", this.showData);
        this._logger.log("into FundInquiryConfirmResultComponent, queryData:", this.queryData);
        this._logger.log("into FundInquiryConfirmResultComponent, resultReq:", this.resultReq);
        this._initEvent();
    }

    private _initEvent() {
        // 設定左側按鈕
        this._headerCtrl.setLeftBtnClick(() => {
            this.onBackPageData(this.showData, 'confirm', 'back');
        });
        this.currency = this._formateService.checkField(this.queryData, 'engCcy');
        // 設定安控
        this.setSecurity = {
            transServiceId: (this.currency != 'TWD' && this.currency != 'NTD') ? 'SPEC11050402' : 'SPEC11050401', // 交易結果電文
            nameOfSecurity: 'INQUIRYCHANGESTATUS', // 交易權限設定 (輸入,快速登入)
            signText: {},
            inAccount: '', // 轉入帳號
            outAccount: this._formateService.checkField(this.resultReq, 'accountID'), // 轉出帳號
            currency: this.currency, // 幣別
            amount: this._formateService.checkField(this.resultReq, 'newPayAmount'), // 轉帳金額
        };
        this._logger.log("_initEvent, setSecurity:", this.setSecurity);
        this.nowPage = 'confirm'; // 設定完值再顯示畫面
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

    // 接收安控返回
    submitSecurity(bakSecurityObj?) {
        if (!bakSecurityObj) {
            this._logger.log("!bakSecurityObj");
            // 送出按鈕
            let securityReq: any;
            if (this.currency != 'TWD' && this.currency != 'NTD') {
                securityReq = this._mainService.modifyResultForeign(this.resultReq);
            } else {
                securityReq = this._mainService.modifyResultTwd(this.resultReq);
            }
            this.resultData = securityReq;
            this.securityAction = { method: 'submit', signText: securityReq };
            this._logger.log("submitSecurity, securityAction:", this.securityAction);
        } else {
            this._logger.log("security back, bakSecurityObj:", bakSecurityObj);
            // // 送出後回傳安控物件一路帶回 (待之後開啟, 安控回傳完成會走進else)
            this.securityObj = bakSecurityObj;
            if (this.currency != 'TWD' && this.currency != 'NTD') {
                this.sendResultForeign(); // 發送交易api 外幣
            } else {
                this.sendResultTwd(); // 發送交易api 台幣
            }
        }
    }

    // 點擊 取消
    onCancel() {
        this._logger.log("into onCancel");
        this.onBackPageData({}, 'change-status', 'home');
    }

    // 點擊 結果頁按鈕
    onResultBtn() {
        this._logger.log("into onResultBtn");
        this.onBackPageData(this.queryData, 'change-status-special', 'retry');
    }

    /**
     * 送出變更結果 台幣
     */
    private sendResultTwd() {
        this._logger.log("into sendResultTwd, resultReq:", this.resultReq);
        this._mainService.sendResultTwd(this.resultReq, { security: this.securityObj }).then(
            (result) => {
                this._logger.log("sendResultTwd, result:", result);
                this.resultData = result.infoData;
                let isForeignOldID = this._formateService.checkField(this.resultData, 'isForeignOldID');
                this.showIsForeignOldID = isForeignOldID == 'Y' ? true : false;
                this.nowPage = 'result';
                this.resStatus = result.status;
                this.statusObj = result.statusObj;
            },
            (errorObj) => {
                this._logger.log("sendResultTwd, errorObj:", errorObj);
                let error_type = this._formateService.checkField(errorObj, 'resultType');
                if (error_type == 'security' || error_type == 'check') {
                    this.securityAction = { method: 'error' };
                    this.setSecurityError = errorObj;
                } else {
                    this.nowPage = 'result';
                    this.resStatus = false;
                    this.statusObj = errorObj;
                }
            }
        );
    }

    /**
     * 送出變更結果 台幣
     */
    private sendResultForeign() {
        this._logger.log("into sendResultTwd, resultReq:", this.resultReq);
        this._mainService.sendResultForeign(this.resultReq, { security: this.securityObj }).then(
            (result) => {
                this._logger.log("sendResultTwd, result:", result);
                this.resultData = result.infoData;
                let isForeignOldID = this._formateService.checkField(this.resultData, 'isForeignOldID');
                this.showIsForeignOldID = isForeignOldID == 'Y' ? true : false;
                this.nowPage = 'result';
                this.resStatus = result.status;
                this.statusObj = result.statusObj;
            },
            (errorObj) => {
                this._logger.log("sendResultTwd, errorObj:", errorObj);
                let error_type = this._formateService.checkField(errorObj, 'resultType');
                if (error_type == 'security' || error_type == 'check') {
                    this.securityAction = { method: 'error' };
                    this.setSecurityError = errorObj;
                } else {
                    this.nowPage = 'result';
                    this.resStatus = false;
                    this.statusObj = errorObj;
                }
            }
        );
    }
}