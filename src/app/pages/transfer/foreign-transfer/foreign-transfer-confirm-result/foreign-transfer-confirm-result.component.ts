/**
 * 外幣兌換確認頁和結果頁
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { ForeignTransferService } from '@pages/transfer/shared/service/foreign-transfer.service';
import { CURRENCY_SETTING } from '@conf/currency';
import { FormateService } from '@template/formate/formate.service';

@Component({
    selector: 'app-foreign-transfer-confirm-result',
    templateUrl: './foreign-transfer-confirm-result.component.html',
    styleUrls: [],
    providers: []
})

export class ForeignTransferConfirmResultComponent implements OnInit {

    @Input() inputData;

    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();

    // ------ 安控相關 Start ------ //
    // 安控設定檔
    setSecurity = {
        transServiceId: '',
        nameOfSecurity: 'FOREIGNTRANSFER',
        signText: {}
    };
    setSecurityError: any = {}; // 安控錯誤變數
    // 控制安控送出的變數
    securityAction = {
        method: 'init' 
    };
    // 目前安控方法的物件 { name: '手機確認碼認證', id: '2', checkList: [ 'otp'], inputValue: true  },
    securityObj: any; // 安控回傳物件
    // ------ 安控相關 End ------ //

    // 看見我資訊
    seeObj = {
        see_amount1: false,
        see_amount2: false,
        see_amount3: false,
    };

    countDownOption = { // 倒數計時設定
        deadline: '100' // 100(秒)
    };
    isTimeOut = false;

    nowPage = 'check'; // 當前頁面
    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj

    nowStep = 'check'; // 當前步驟

    // 步驟列data
    stepMenuData = [
        {
            id: 'edit',
            name: 'STEP_BAR.COMMON.EDIT' // 輸入資料頁
        },
        {
            id: 'check',
            name: 'STEP_BAR.COMMON.CHECK', // 確認資料頁
        },
        {
            id: 'result',
            name: 'STEP_BAR.COMMON.RESULT', // 結果頁
            // 執行此步驟時是否隱藏步驟列
            hidden: true
        }
    ];

    requestData = {};

    reqData = {
        liveNo: '',
        permitDateRange: {
            start: '',
            end: ''
        },
        birthday: '',
        transOutAccount: {
            nickName: '',
            currencyCode: '',
            accountId: ''
        },
        transInAccount: {
            nickName: '',
            currencyCode: '',
            accountId: ''
        },
        // chooseSellCurrencyObj: {},
        // chooseBuyCurrencyObj: {},
        transOutAmt: '',
        transInAmt: '',
        // extraAmt: '',
        exchangeRate: '',
        remitNature: {
            groupId: '',
            groupName: '',
            code: '',
            name: ''
        },
        usdRate: ''
    };

    resData = {
        liveNo: '',
        permitDateRange: {
            start: '',
            end: ''
        },
        birthday: '',
        transOutAccount: {
            nickName: '',
            currencyCode: '',
            bookBalance: '',
            accountId: '',
            balance: '',
            currencyName: ''
        },
        transInAccount: {
            nickName: '',
            currencyCode: '',
            accountId: '',
            balance: '',
            currencyName: ''
        },
        transOutAmt: '',
        transInAmt: '',
        exchangeRate: '',
        usdRate: '',
        transDate: '',
        remitNature: {
            code: '',
            name: ''
        }
    };

    constructor(
        private headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private _logger: Logger,
        private confirm: ConfirmService,
        private foreignTransferService: ForeignTransferService,
        private _formateService: FormateService
    ) { }

    ngOnInit() {
        this.setSecurity.transServiceId = (this.inputData.transType == 'buy-foreign' ? 'SPEC09030101' : 'SPEC09030201');
        this.headerCtrl.setLeftBtnClick(() => {
            this.onLeftBtnClick();
        });

        this.reqData.liveNo = this.inputData.liveNo;
        this.reqData.permitDateRange = this.inputData.permitDateRange;
        this.reqData.birthday = this.inputData.birthday;
        this.reqData.transOutAccount = this.inputData.transOutAccountObj;
        this.reqData.transInAccount = this.inputData.transInAccountObj;
        // this.reqData.chooseSellCurrencyObj = this.inputData.chooseSellCurrencyObj;
        // this.reqData.chooseBuyCurrencyObj = this.inputData.chooseBuyCurrencyObj;
        this.reqData.transOutAmt = this.inputData.transOutAmount;
        this.reqData.transInAmt = this.inputData.transInAmount;
        this.reqData.exchangeRate = this.inputData.referenceRate;
        this.reqData.remitNature = this.inputData.chooseRemitNatureObj;
        this.reqData.usdRate = this.inputData.usdRate;

        this.requestData = this.foreignTransferService.modifyReqData(this.reqData);

        this.setSecurity.signText = this.requestData;
    }

    /**
     * Header左側按鈕點擊事件
     */
    onLeftBtnClick() {
        this.backToEdit();
    }

    /**
     * [取消]按鈕點擊事件
     */
    onCancelBtnClick() {
        this.confirm.cancelEdit().then(
            (res) => {
                this.navgator.editBack();
            },
            (errObj) => {

            }
        );
    }

    /**
     * 安控[確認]按鈕點擊事件
     */
    onSecurityClick() {
        if (this.isTimeOut) {
            this.timeOut();
            return;
        }

        this.securityAction = {
            method: 'submit'
        };
    }

    /**
     * 確認後發送電文
     */
    onConfirm() {
        if (this.inputData.transType == 'buy-foreign') {
            this.foreignTransferService.sendData_twdToForeign(this.requestData, {security: this.securityObj}).then(
                (res) => {
                    this.resStatus = res.status;
                    this.statusObj = res.statusObj;
                    this.resData = res.data;
                    this.resData.transOutAccount.currencyName = CURRENCY_SETTING[this.resData.transOutAccount.currencyCode]['name'];
                    this.resData.transInAccount.currencyName = CURRENCY_SETTING[this.resData.transInAccount.currencyCode]['name'];
                    return Promise.resolve();
                },
                (errorObj) => {
                    this.resStatus = false;
                    let error_type = this._formateService.checkField(errorObj, 'resultType');
                    if (error_type == 'security' || error_type == 'check') {
                        this.securityAction = { method: 'error' };
                        this.setSecurityError = errorObj;
                        return Promise.reject(errorObj);
                    } else {
                        // Error
                        this.statusObj = errorObj;
                        return Promise.resolve();
                    }
                }
            ).then(
                () => {
                    this.nowPage = 'result';
                    this.headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                    this.headerCtrl.setRightBtnClick(() => {
                        this.navgator.editBack();
                    });
                },
                () => {
                    // reject
                }
            );
        } else if (this.inputData.transType == 'sell-foreign') {
            this.foreignTransferService.sendData_foreignToTwd(this.requestData, {security: this.securityObj}).then(
                (res) => {
                    this.resStatus = res.status;
                    this.statusObj = res.statusObj;
                    this.resData = res.data;
                    this.resData.transOutAccount.currencyName = CURRENCY_SETTING[this.resData.transOutAccount.currencyCode]['name'];
                    this.resData.transInAccount.currencyName = CURRENCY_SETTING[this.resData.transInAccount.currencyCode]['name'];
                    return Promise.resolve();
                },
                (errorObj) => {
                    this.resStatus = false;
                    let error_type = this._formateService.checkField(errorObj, 'resultType');
                    if (error_type == 'security' || error_type == 'check') {
                        this.securityAction = { method: 'error' };
                        this.setSecurityError = errorObj;
                        return Promise.reject(errorObj);
                    } else {
                        // Error
                        this.statusObj = errorObj;
                        return Promise.resolve();
                    }
                }
            ).then(
                () => {
                    this.nowPage = 'result';
                    this.headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                    this.headerCtrl.setRightBtnClick(() => {
                        this.navgator.editBack();
                    });
                },
                () => {
                    // reject
                }
            );
        }
    }

    /**
     * 返回編輯頁
     */
    backToEdit() {
        let output = {
            page: 'check'
        };

        this.onBackPageEvent(output);
    }

    /**
     * 返回外幣兌換編輯頁面
     */
    onBackPageEvent(output) {
        this.backPageEmit.emit(output);
    }

    /**
     * [再做一筆]按鈕點擊事件
     */
    onAgainBtnClick() {
        let output = {
            page: 'result'
        };
        this.onBackPageEvent(output);
    }

    /**
     * 切換input 顯示
     * @param type 類別
     */
    switchSee(type) {
        switch (type) {
            case 'see_amount1':
                this.seeObj.see_amount1 = !this.seeObj.see_amount1;
                break;
            case 'see_amount2':
                this.seeObj.see_amount2 = !this.seeObj.see_amount2;
                break;
            case 'see_amount3':
                this.seeObj.see_amount3 = !this.seeObj.see_amount3;
                break;
        }
    }

    private timeOut() {
        this.confirm.show('FOREIGN_TRANSFER.BACK_TO_EDIT', { btnYesTitle: 'FOREIGN_TRANSFER.BTN.CONFIRM', btnNoTitle: 'FOREIGN_TRANSFER.BTN.LEAVE' }).then(
            () => {
                this.backToEdit();
            },
            () => {
                this.navgator.editBack();
            }
        );
    }

    /**
     * 倒數計時返回事件
     * @param e
     */
    onBackPage(e) {
        this.isTimeOut = true;
    }

    /**
     * 安控回傳選擇物件
     * @param data
     */
    currentType(data) {
        this.securityObj = {};
    }

    /**
     * 安控回傳驗證物件
     * @param data
     */
    bakSecurityObj(data) {
        this._logger.error("bakSecurityObj", data);
        if (!data) {
            return false;
        }
        this.securityObj = data;
        this.onConfirm();
    }

}
