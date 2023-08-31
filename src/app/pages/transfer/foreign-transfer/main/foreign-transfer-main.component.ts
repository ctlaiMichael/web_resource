/**
 * 外幣兌換
 */
import { Component, OnInit } from '@angular/core';
import { twdToForeign_content, foreignToTwd_content } from '@pages/transfer/shared/notePopup-content';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { ExchangeRateService } from '@pages/financial/shared/service/exchange-rate.service';
import { ReferenceExchangeRateService } from '@template/reference-exchange-rate/reference-exchange-rate.service';
import { CurrencyFlagPopupService } from '@template/list/currency-flag/currency-flag-popup.service';
import { ForeignTransferService } from '@pages/transfer/shared/service/foreign-transfer.service';
import { TransAcctPopupService } from '@template/list/trans-acct-popup/trans-acct-popup.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { FieldUtil } from '@util/formate/modify/field-util';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { RemitNaturePopupService } from '@template/list/remit-nature-popup/remit-nature-popup.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Component({
    selector: 'app-foreign-transfer-main',
    templateUrl: './foreign-transfer-main.component.html',
    styleUrls: []
})

export class ForeignTransferMainComponent implements OnInit {
    isCounting = false; // 是否在倒數計時
    isTimeOut = false;

    countDownOption = { // 倒數計時設定
        deadline: '100' // 100(秒)
    };

    nowPage = 'edit'; // 當前頁面

    // 注意事項設定
    notePopupOption = {
        title: 'POPUP.NOTE.TITLE',
        content: twdToForeign_content
    };

    nowBookMark = 'buy-foreign'; // 當前分頁

    // 頁籤data
    bookmarkData = [
        {
            id: 'buy-foreign',
            name: 'FOREIGN_TRANSFER.BUY_FOREIGN_CURRENCY',
            sort: 1
        },
        {
            id: 'sell-foreign',
            name: 'FOREIGN_TRANSFER.SELL_FOREIGN_CURRENCY',
            sort: 2
        }
    ];

    nowStep = 'edit'; // 當前步驟

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

    private currencyList: any; // 外幣list
    currencyData = []; // 幣別data
    haveData = true;
    private dfSellCurrency = ''; // 預設兌出幣別
    selectSellCurrency = ''; // 已選兌出幣別
    private dfBuyCurrency = ''; // 預設兌入幣別
    selectBuyCurrency = ''; // 已選兌入幣別
    weightType = ''; // 1:權重大轉小 2:權重小轉大 
    isEmployee = '0'; // 0:不是行員 1:是行員
    referenceRate = ''; // 一般參考匯率
    referenceCurrencyRate = ''; // 優惠參考匯率
    referenceCurrencyRate_bonus = ''; // 參考匯率bonus
    referenceCurrencyRate_customer = ''; // 參考匯率customer
    referenceCurrencyRate_employee = ''; // 參考匯率employee
    transOutAmount = ''; // 兌出金額
    transInAmount = ''; // 兌入金額
    extraAmount = ''; // 額外優惠兌換金額
    transOutAccount = []; // 轉出帳號Data
    transInAccount = []; // 轉入帳號Data
    remitNatureData = []; // 結匯性質Data
    selectTransOutAcc = ''; // 已選轉出帳號
    selectTransInAcc = ''; // 已選轉入帳號
    selectRemitNature = ''; // 已選結匯性質
    
    twdToForeignData = {
        transOutAmount: '', // 兌出金額
        transInAmount: '', // 兌入金額
        extraAmount: '', // 額外優惠兌換金額
        selectTransOutAcc: '', // 已選轉出帳號
        selectTransInAcc: '', // 已選轉入帳號
        selectRemitNature: '', // 已選結匯性質
        // 轉出帳號當前選擇物件
        chooseTransOutAccountObj: {
            accountId: '',
            nickName: '',
            currencyCode: '',
            balance: '',
            isEmployee: ''
        },
        // 轉入帳號當前選擇物件
        chooseTransInAccountObj: {
            accountId: '',
            nickName: '',
            isEmployee: ''
        },
        // 結匯性質當前選擇物件
        chooseRemitNatureObj: {
            groupId: '',
            groupName: '',
            code: '',
            name: ''
        }
    };

    foreignToTwdData = {
        transOutAmount: '', // 兌出金額
        transInAmount: '', // 兌入金額
        extraAmount: '', // 額外優惠兌換金額
        selectTransOutAcc: '', // 已選轉出帳號
        selectTransInAcc: '', // 已選轉入帳號
        selectRemitNature: '', // 已選結匯性質
        // 轉出帳號當前選擇物件
        chooseTransOutAccountObj: {
            accountId: '',
            nickName: '',
            currencyCode: '',
            balance: '',
            isEmployee: ''
        },
        // 轉入帳號當前選擇物件
        chooseTransInAccountObj: {
            accountId: '',
            nickName: '',
            isEmployee: ''
        },
        // 結匯性質當前選擇物件
        chooseRemitNatureObj: {
            groupId: '',
            groupName: '',
            code: '',
            name: ''
        }
    };
    

    // 轉出帳號當前選擇物件
    chooseTransOutAccountObj = {
        accountId: '',
        nickName: '',
        currencyCode: '',
        balance: '',
        isEmployee: ''
    };

    // 轉入帳號當前選擇物件
    chooseTransInAccountObj = {
        accountId: '',
        nickName: '',
        isEmployee: ''
    };

    // 兌出幣別當前選擇物件
    chooseSellCurrencyObj = {
        currencyCode: '',
        currencyCodeShow: '',
        currencyName: '',
        currencyNameShow: '',
        buyRate: '',
        sellRate: '',
        weight: 0,
        bonus: '',
        customerDiscountRate: '',
        employeeDiscountRate: ''
    };

    // 兌入幣別當前選擇物件
    chooseBuyCurrencyObj = {
        currencyCode: '',
        currencyCodeShow: '',
        currencyName: '',
        currencyNameShow: '',
        buyRate: '',
        sellRate: '',
        weight: 0,
        bonus: '',
        customerDiscountRate: '',
        employeeDiscountRate: ''
    };

    // 結匯性質當前選擇物件
    chooseRemitNatureObj = {
        groupId: '',
        groupName: '',
        code: '',
        name: ''
    };

    outputData = {
        liveNo: '',
        permitDateRange: {
            start: '',
            end: ''
        },
        birthday: '',
        transType: '',
        transOutAccountObj: {
            accountId: '',
            nickName: '',
            currencyCode: ''
        },
        transInAccountObj: {
            accountId: '',
            nickName: '',
            currencyCode: ''
        },
        chooseSellCurrencyObj: {},
        chooseBuyCurrencyObj: {},
        transOutAmount: '',
        transInAmount: '',
        extraAmount: '',
        referenceRate: '',
        chooseRemitNatureObj: {
            code: '',
            name: ''
        },
        usdRate: ''
    };

    checkData = {
        status: false,
        errMsgObj: {}
    };

    backData = {
        backPage: 'foreignTransfer'
    };

    constructor(
        private _logger: Logger,
        private navgator: NavgatorService,
        private exchangeRateService: ExchangeRateService,
        private referenceRateService: ReferenceExchangeRateService,
        private currencyPop: CurrencyFlagPopupService,
        private foreignTransferService: ForeignTransferService,
        private transAccPop: TransAcctPopupService,
        private headerCtrl: HeaderCtrlService,
        private confirm: ConfirmService,
        private remitNaturePop: RemitNaturePopupService,
        private alert: AlertService,
        private handleError: HandleErrorService
    ) { }

    ngOnInit() {
        this.headerCtrl.setLeftBtnClick(() => {
            this.onCancel();
        });

        this.initBuyForeignEvent();
    }

    /**
     * 頁籤選擇完返回事件
     */
    onBookMarkBack(e) {
        if (this.nowBookMark == e.data.id) {
            return false;
        }
        
        this.nowBookMark = e.data.id;
        this.notePopupOption.content = (this.nowBookMark == 'buy-foreign') ? twdToForeign_content : foreignToTwd_content;

        if (this.nowBookMark == 'buy-foreign') {
            this.initBuyForeignEvent();
        } else if (this.nowBookMark == 'sell-foreign') {
            this.initSellForeignEvent();
        }

        // this.confirm.show('FOREIGN_TRANSFER.CONFIRM_CONTENT').then(
        //     () => {
        //         if (!!this.countDownTimer) {
        //             this.countDownTimer.stop();
        //             delete this.countDownTimer;
        //         }
                
        //         this.nowBookMark = e.data.id;
        //         this.notePopupOption.content = (this.nowBookMark == 'buy-foreign') ? twdToForeign_content : foreignToTwd_content;
        
        //         if (this.nowBookMark == 'buy-foreign') {
        //             this.initBuyForeignEvent();
        //         } else if (this.nowBookMark == 'sell-foreign') {
        //             this.initSellForeignEvent();
        //         }
        //     },
        //     () => {
        //         return false;
        //     }
        // );

    }

    /**
     * 打開轉出帳號選單popup
     */
    transOutAccPopOpen() {
        this.transAccPop.show({
            title: 'FOREIGN_TRANSFER.SELECT_TRANS_OUT_ACC',
            data: this.transOutAccount,
            select: this.chooseTransOutAccountObj.accountId + '' + this.chooseTransOutAccountObj.currencyCode,
            type: '3',
            special: true
        }).then(
            (accountItem) => {
                this.onTransAccChange(accountItem, 'transOut');
            },
            () => {
                // 使用者取消

            }
        );
    }

    /**
     * 打開轉入帳號選單popup
     */
    transInAccPopOpen() {
        this.transAccPop.show({
            title: 'FOREIGN_TRANSFER.SELECT_TRANS_IN_ACC',
            data: this.transInAccount,
            select: this.selectTransInAcc,
            type: '4'
        }).then(
            (accountItem) => {
                this.onTransAccChange(accountItem, 'transIn');
            },
            () => {
                // 使用者取消

            }
        );
    }

    /**
     * 打開結匯性質選單popup
     */
    remitNatureDataPopOpen() {
        this.remitNaturePop.show({
            title: 'FOREIGN_TRANSFER.SELECT_TRANS_TYPE',
            data: this.remitNatureData,
            select: this.chooseRemitNatureObj
        }).then(
            (remitNatureItem) => {
                this.onRemitNatureChange(remitNatureItem);
            },
            () => {
                // 使用者取消

            }
        );
    }

    /**
     * [匯率表]按鈕點擊事件
     */
    onExchangeRateTableBtnClick() {
        this.nowPage = 'exchangeRate';
    }

    /**
     * 打開幣別選單popup
     */
    currencyPopOpen(type) {
        if (this.nowBookMark == 'sell-foreign' || (this.nowBookMark == 'buy-foreign' && type == 'sell')) {
            return false;
        }

        this.currencyPop.show({
            // title: '',
            data: this.currencyData,
            selectCurrency: this.selectBuyCurrency,
            type: 'foreignTrans'
        }).then(
            (currencyItem) => {
                this.dfBuyCurrency = currencyItem['currencyCode'];
                this.onCurrencyChange(currencyItem, type);
            },
            () => {
                // 使用者取消

            }
        );
    }

    /**
     * [取消]按鈕點擊事件
     */
    onCancel() {
        this.confirm.cancelEdit({type: 'edit'}).then(
            (res) => {
                this.navgator.editBack();
            },
            (errObj) => {

            }
        );
    }

    /**
     * [下一步]按鈕點擊事件
     */
    onNext() {
        if (this.isTimeOut) {
            this.checkData = {
                status: false,
                errMsgObj: {}
            };
            this.timeOut();
            return;
        }

        this.outputData.transType = this.nowBookMark;
        this.outputData.transOutAccountObj.accountId = this.chooseTransOutAccountObj.accountId;
        this.outputData.transOutAccountObj.nickName = this.chooseTransOutAccountObj.nickName;
        this.outputData.transOutAccountObj.currencyCode = this.chooseTransOutAccountObj.currencyCode;
        this.outputData.transInAccountObj.accountId = this.chooseTransInAccountObj.accountId;
        this.outputData.transInAccountObj.nickName = this.chooseTransInAccountObj.nickName;
        this.outputData.transInAccountObj['currencyCode'] = this.chooseBuyCurrencyObj.currencyCode;
        this.outputData.chooseSellCurrencyObj = this.chooseSellCurrencyObj;
        this.outputData.chooseBuyCurrencyObj = this.chooseBuyCurrencyObj;
        let tempOutAmount = this.transOutAmount.replace(/\,/g, '').trim();
        if (!!tempOutAmount) {
            tempOutAmount = parseFloat(tempOutAmount).toString();
        }
        this.outputData.transOutAmount = tempOutAmount;
        let tempInAmount = this.transInAmount.replace(/\,/g, '').trim();
        if (!!tempInAmount) {
            tempInAmount = parseFloat(tempInAmount).toString();
        }
        this.outputData.transInAmount = tempInAmount;
        this.outputData.extraAmount = this.extraAmount;
        this.outputData.referenceRate = this.referenceCurrencyRate;
        this.outputData.chooseRemitNatureObj.code = this.chooseRemitNatureObj.code;
        this.outputData.chooseRemitNatureObj.name = this.chooseRemitNatureObj.name;
        if (this.nowBookMark == 'buy-foreign') {
            this.outputData.usdRate = ObjectCheckUtil.checkObjectList(this.currencyList, 'USD.sellRate');
        } else if (this.nowBookMark == 'sell-foreign') {
            this.outputData.usdRate = ObjectCheckUtil.checkObjectList(this.currencyList, 'USD.buyRate');
        }
        
        this.checkData = this.foreignTransferService.checkData(this.outputData);

        if (this.checkData.status) {
            this.confirm.show('FOREIGN_TRANSFER.WARNING', {btnYesTitle: 'FOREIGN_TRANSFER.BTN.NEXT_STEP', btnNoTitle: 'FOREIGN_TRANSFER.BTN.CANCEL'}).then(
                () => {
                    this.nowPage = 'confirm';
                },
                () => {
                    // cancel
                }
            );
        } else {
            this.alert.show('ERROR.DATA_FORMAT_ERROR');
        }
        
    }

    /**
     * 子層返回事件
     * @param e
     */
    onBackPage(e) {
        let page = '';
        if (typeof e === 'object') {
            if (e.hasOwnProperty('page')) {
                page = e.page;
            }
        }

        if (page == 'result') {
            this.twdToForeignData = {
                transOutAmount: '',
                transInAmount: '',
                extraAmount: '',
                selectTransOutAcc: '',
                selectTransInAcc: '',
                selectRemitNature: '',
                chooseTransOutAccountObj: {
                    accountId: '',
                    nickName: '',
                    currencyCode: '',
                    balance: '',
                    isEmployee: ''
                },
                chooseTransInAccountObj: {
                    accountId: '',
                    nickName: '',
                    isEmployee: ''
                },
                chooseRemitNatureObj: {
                    groupId: '',
                    groupName: '',
                    code: '',
                    name: ''
                }
            };
            this.foreignToTwdData = {
                transOutAmount: '',
                transInAmount: '',
                extraAmount: '',
                selectTransOutAcc: '',
                selectTransInAcc: '',
                selectRemitNature: '',
                chooseTransOutAccountObj: {
                    accountId: '',
                    nickName: '',
                    currencyCode: '',
                    balance: '',
                    isEmployee: ''
                },
                chooseTransInAccountObj: {
                    accountId: '',
                    nickName: '',
                    isEmployee: ''
                },
                chooseRemitNatureObj: {
                    groupId: '',
                    groupName: '',
                    code: '',
                    name: ''
                }
            };
            if (this.nowBookMark == 'buy-foreign') {
                this.initBuyForeignEvent();
            } else if (this.nowBookMark == 'sell-foreign') {
                this.initSellForeignEvent();
            }
        } else if (page == 'check') {
            this.getCurrencyData();
        }

        this.nowPage = 'edit';
        this.headerCtrl.setOption({ leftBtnIcon: 'edit-back', rightBtnIcon: '' }); // 變更Header按鈕樣式
        this.headerCtrl.setLeftBtnClick(() => {
            this.navgator.editBack();
        });
    }

    /**
     * 兌出金額輸入改變事件
     * @param value
     */
    transOutAmountChange(value) {
        this.transOutAmount = FieldUtil.checkField(value, 'value_show');
        if (!this.transOutAmount || this.transOutAmount == '') {
            this.transInAmount = '';
            return;
        }
        if (this.selectSellCurrency == 'TWD' || this.selectSellCurrency == 'NTD' || this.selectSellCurrency == 'JPY') {
            let tempOutAmount = this.transOutAmount.replace(/\,/g, '').trim();
            tempOutAmount = Math.floor(parseFloat(tempOutAmount)).toString();
            this.transOutAmount = this.formatAmount(tempOutAmount);
        }
        this.startConvert('SellToBuy');
    }

    /**
     * 兌入金額輸入改變事件
     * @param value
     */
    transInAmountChange(value) {
        this.transInAmount = FieldUtil.checkField(value, 'value_show');
        if (!this.transInAmount || this.transInAmount == '') {
            this.transOutAmount = '';
            return;
        }
        if (this.selectBuyCurrency == 'TWD' || this.selectBuyCurrency == 'NTD' || this.selectBuyCurrency == 'JPY') {
            let tempInAmount = this.transInAmount.replace(/\,/g, '').trim();
            tempInAmount = Math.floor(parseFloat(tempInAmount)).toString();
            this.transInAmount = this.formatAmount(tempInAmount);
        }
        this.startConvert('BuyToSell');
    }

    // --------------------------------------------------------------------------------------------
    //     ________        __    ________          __          
    //     /  _____/  _____/  |_  \______ \ _____ _/  |______   
    //    /   \  ____/ __ \   __\  |    |  \\__  \\   __\__  \  
    //    \    \_\  \  ___/|  |    |    `   \/ __ \|  |  / __ \_
    //     \______  /\___  >__|   /_______  (____  /__| (____  /
    //            \/     \/               \/     \/          \/
    // --------------------------------------------------------------------------------------------

    /**
     * 取得幣別匯率data
     */
    private getCurrencyData() {
        this.currencyData = [];
        this.currencyList = {};
        this.selectSellCurrency = '';
        this.selectBuyCurrency = '';
        this.referenceRate = '';
        this.referenceCurrencyRate = '';
        this.referenceCurrencyRate_bonus = '';
        this.referenceCurrencyRate_customer = '';
        this.referenceCurrencyRate_employee = '';
        this.transOutAmount = '';
        this.transInAmount = '';
        this.extraAmount = '';
        this.exchangeRateService.getData().then(
            (res) => {
                this.currencyList = res.foreignTransCurrencyList;
                this.currencyData = res.foreignTransCurrencyData;
                if (typeof this.currencyList[this.dfSellCurrency] != 'undefined') {
                    this.onCurrencyChange(this.currencyList[this.dfSellCurrency], 'sell');
                } else if (!!this.selectTransOutAcc) {
                    this.onCurrencyChange(this.currencyList[this.chooseTransOutAccountObj.currencyCode], 'sell');
                } else {
                    this.chooseSellCurrencyObj = {
                        currencyCode: '',
                        currencyCodeShow: '',
                        currencyName: '',
                        currencyNameShow: '',
                        buyRate: '',
                        sellRate: '',
                        weight: 0,
                        bonus: '',
                        customerDiscountRate: '',
                        employeeDiscountRate: ''
                    };
                }
                if (typeof this.currencyList[this.dfBuyCurrency] != 'undefined') {
                    this.onCurrencyChange(this.currencyList[this.dfBuyCurrency], 'buy');
                } else {
                    this.chooseBuyCurrencyObj = {
                        currencyCode: '',
                        currencyCodeShow: '',
                        currencyName: '',
                        currencyNameShow: '',
                        buyRate: '',
                        sellRate: '',
                        weight: 0,
                        bonus: '',
                        customerDiscountRate: '',
                        employeeDiscountRate: ''
                    };
                }
                this.isCounting = true;
                this.isTimeOut = false;
            },
            (errObj) => {
                // Error
                this.isCounting = false;
                this.handleError.handleError(errObj);
            }
        );
    }

    /**
     * 取得帳號data
     */
    private getAccountData() {
        this.transOutAccount = [];
        this.transInAccount = [];
        this.remitNatureData = [];
        let req = {
            transType: ''
        };
        if (this.nowBookMark == 'buy-foreign') {
            req.transType = '1';
        } else if (this.nowBookMark == 'sell-foreign') {
            req.transType = '2';
        }
        this.foreignTransferService.getData(req).then(
            (res) => {
                this.transOutAccount = res.transOutAccount;
                this.transInAccount = res.transInAccount;
                this.remitNatureData = res.remitNatureData;
                this.outputData.liveNo = res.liveNo;
                this.outputData.permitDateRange = res.permitDateRange;
                this.outputData.birthday = res.birthday;
                this.isEmployee = res.isEmployee;
                if (this.nowBookMark == 'buy-foreign') {
                    this.initData('buy-foreign');
                } else if (this.nowBookMark == 'sell-foreign') {
                    this.initData('sell-foreign');
                }
            },
            (errObj) => {
                // Error
                this.handleError.handleError(errObj);
            }
        );
    }

    /**
     * 倒數計時返回事件
     * @param e
     */
    onBackPageTimer(e) {
        // this.isCounting = false;
        this.isTimeOut = true;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 買外幣頁面初始化
     */
    private initBuyForeignEvent() {
        this.notePopupOption.content = twdToForeign_content;
        this.dfSellCurrency = 'TWD';
        this.dfBuyCurrency = '';
        this.selectSellCurrency = '';
        this.selectBuyCurrency = '';
        this.referenceRate = '';
        this.referenceCurrencyRate = '';
        this.referenceCurrencyRate_bonus = '';
        this.referenceCurrencyRate_customer = '';
        this.referenceCurrencyRate_employee = '';
        this.transOutAmount = '';
        this.transInAmount = '';
        this.extraAmount = '';
        this.transOutAccount = [];
        this.transInAccount = [];
        this.remitNatureData = [];
        this.selectTransOutAcc = '';
        this.selectTransInAcc = '';
        this.chooseTransOutAccountObj = {
            accountId: '',
            nickName: '',
            currencyCode: '',
            balance: '',
            isEmployee: ''
        };
        this.chooseTransInAccountObj = {
            accountId: '',
            nickName: '',
            isEmployee: ''
        };
        this.selectRemitNature = '';
        this.chooseRemitNatureObj = {
            groupId: '',
            groupName: '',
            code: '',
            name: ''
        };
        this.getCurrencyData();
        this.getAccountData();
    }

    /**
     * 賣外幣頁面初始化
     */
    private initSellForeignEvent() {
        this.notePopupOption.content = foreignToTwd_content;
        this.dfSellCurrency = '';
        this.dfBuyCurrency = 'TWD';
        this.selectSellCurrency = '';
        this.selectBuyCurrency = '';
        this.referenceRate = '';
        this.referenceCurrencyRate = '';
        this.referenceCurrencyRate_bonus = '';
        this.referenceCurrencyRate_customer = '';
        this.referenceCurrencyRate_employee = '';
        this.transOutAmount = '';
        this.transInAmount = '';
        this.extraAmount = '';
        this.transOutAccount = [];
        this.transInAccount = [];
        this.remitNatureData = [];
        this.selectTransOutAcc = '';
        this.selectTransInAcc = '';
        this.chooseTransOutAccountObj = {
            accountId: '',
            nickName: '',
            currencyCode: '',
            balance: '',
            isEmployee: ''
        };
        this.chooseTransInAccountObj = {
            accountId: '',
            nickName: '',
            isEmployee: ''
        };
        this.selectRemitNature = '';
        this.chooseRemitNatureObj = {
            groupId: '',
            groupName: '',
            code: '',
            name: ''
        };
        this.getCurrencyData();
        this.getAccountData();
    }

    /**
     * 帶入資料
     */
    private initData(type) {
        if (type == 'buy-foreign') {
            this.selectTransOutAcc = this.twdToForeignData.selectTransOutAcc;
            this.selectTransInAcc = this.twdToForeignData.selectTransInAcc;
            this.chooseTransOutAccountObj = this.twdToForeignData.chooseTransOutAccountObj;
            this.chooseTransInAccountObj = this.twdToForeignData.chooseTransInAccountObj;
            this.selectRemitNature = this.twdToForeignData.selectRemitNature;
            this.chooseRemitNatureObj = this.twdToForeignData.chooseRemitNatureObj;
        } else if (type == 'sell-foreign') {
            this.selectTransOutAcc = this.foreignToTwdData.selectTransOutAcc;
            this.selectTransInAcc = this.foreignToTwdData.selectTransInAcc;
            this.chooseTransOutAccountObj = this.foreignToTwdData.chooseTransOutAccountObj;
            this.chooseTransInAccountObj = this.foreignToTwdData.chooseTransInAccountObj;
            this.selectRemitNature = this.foreignToTwdData.selectRemitNature;
            this.chooseRemitNatureObj = this.foreignToTwdData.chooseRemitNatureObj;
            if (!!this.selectTransOutAcc) {
                if (typeof this.currencyList[this.chooseTransOutAccountObj.currencyCode] != 'undefined') {
                    this.chooseSellCurrencyObj = this.currencyList[this.chooseTransOutAccountObj.currencyCode];
                    this.onCurrencyChange(this.chooseSellCurrencyObj, 'sell');
                }
            }
        }

    }

    /**
     * 變更成選擇完後的帳號物件
     * @param item popup選單返回的帳號物件
     * @param type transOut: 轉出帳號 transIn: 轉入帳號
     */
    private onTransAccChange(item, type) {
        if (type == 'transOut') {
            this.selectTransOutAcc = item.accountId;
            this.chooseTransOutAccountObj = {
                accountId: item.accountId,
                nickName: item.nickName,
                currencyCode: item.currencyCode,
                balance: item.balance,
                isEmployee: item.isEmployee
            };

            if (this.nowBookMark == 'buy-foreign') {
                this.twdToForeignData.selectTransOutAcc = this.selectTransOutAcc;
                this.twdToForeignData.chooseTransOutAccountObj = this.chooseTransOutAccountObj;
            } else if (this.nowBookMark == 'sell-foreign') {
                this.foreignToTwdData.selectTransOutAcc = this.selectTransOutAcc;
                this.foreignToTwdData.chooseTransOutAccountObj = this.chooseTransOutAccountObj;
            }

            if (!!this.selectTransOutAcc) {
                if (typeof this.currencyList[this.chooseTransOutAccountObj.currencyCode] != 'undefined') {
                    this.chooseSellCurrencyObj = this.currencyList[this.chooseTransOutAccountObj.currencyCode];
                    this.onCurrencyChange(this.chooseSellCurrencyObj, 'sell');
                }
            }
        } else if (type == 'transIn') {
            this.selectTransInAcc = item.accountId;
            this.chooseTransInAccountObj = {
                accountId: item.accountId,
                nickName: item.nickName,
                isEmployee: item.isEmployee
            };

            if (this.nowBookMark == 'buy-foreign') {
                this.twdToForeignData.selectTransInAcc = this.selectTransInAcc;
                this.twdToForeignData.chooseTransInAccountObj = this.chooseTransInAccountObj;
            } else if (this.nowBookMark == 'sell-foreign') {
                this.foreignToTwdData.selectTransInAcc = this.selectTransInAcc;
                this.foreignToTwdData.chooseTransInAccountObj = this.chooseTransInAccountObj;
            }
        }
        this.getReferenceRate();
    }

    /**
     * 變更成選擇完後的幣別物件
     * @param item popup選單返回的幣別物件
     * @param type sell: 兌出幣別 buy: 兌入幣別
     */
    private onCurrencyChange(item, type) {
        if (type == 'sell') {
            this.selectSellCurrency = item.currencyCode;
            this.chooseSellCurrencyObj = {
                currencyCode: item.currencyCode,
                currencyCodeShow: this.currencyList[this.selectSellCurrency].currencyCodeShow,
                currencyName: item.currencyName,
                currencyNameShow: this.currencyList[this.selectSellCurrency].currencyNameShow,
                buyRate: this.currencyList[this.selectSellCurrency].buyRate,
                sellRate: this.currencyList[this.selectSellCurrency].sellRate,
                weight: this.currencyList[this.selectSellCurrency].weight,
                bonus: this.currencyList[this.selectSellCurrency].bonus,
                customerDiscountRate: this.currencyList[this.selectSellCurrency].customerDiscountRate,
                employeeDiscountRate: this.currencyList[this.selectSellCurrency].employeeDiscountRate
            };
        } else {
            this.selectBuyCurrency = item.currencyCode;
            this.chooseBuyCurrencyObj = {
                currencyCode: item.currencyCode,
                currencyCodeShow: this.currencyList[this.selectBuyCurrency].currencyCodeShow,
                currencyName: item.currencyName,
                currencyNameShow: this.currencyList[this.selectBuyCurrency].currencyNameShow,
                buyRate: this.currencyList[this.selectBuyCurrency].buyRate,
                sellRate: this.currencyList[this.selectBuyCurrency].sellRate,
                weight: this.currencyList[this.selectBuyCurrency].weight,
                bonus: this.currencyList[this.selectBuyCurrency].bonus,
                customerDiscountRate: this.currencyList[this.selectBuyCurrency].customerDiscountRate,
                employeeDiscountRate: this.currencyList[this.selectBuyCurrency].employeeDiscountRate
            };
        }
        this.getReferenceRate();
    }

    private getReferenceRate() {
        if (this.chooseTransOutAccountObj.isEmployee == '1' || this.chooseTransInAccountObj.isEmployee == '1') {
            this.isEmployee = '1';
        } else {
            this.isEmployee = '0';
        }

        // 取得參考匯率
        if (!!this.selectSellCurrency && !!this.selectBuyCurrency) {
            this.referenceRateService.getReferenceRate(this.chooseSellCurrencyObj, this.chooseBuyCurrencyObj).then(
                (res) => {
                    this.referenceRate = res.referenceCurrencyRate;
                    this.referenceCurrencyRate_bonus = res.referenceCurrencyRate_bonus;
                    this.referenceCurrencyRate_customer = res.referenceCurrencyRate_customer;
                    this.referenceCurrencyRate_employee = res.referenceCurrencyRate_employee;
                    if (this.isEmployee == '1') {
                        this.referenceCurrencyRate = this.referenceCurrencyRate_employee;
                    } else {
                        this.referenceCurrencyRate = this.referenceCurrencyRate_bonus;
                    }
                    this.weightType = res.weightType;
                    this.startConvert('SellToBuy');
                },
                (err) => {
                    this.referenceRate = '';
                    this.referenceCurrencyRate = '';
                    this.referenceCurrencyRate_bonus = '';
                    this.referenceCurrencyRate_customer = '';
                    this.referenceCurrencyRate_employee = '';
                }
            );
        }
    }

    /**
     * 變更成選擇完後的結匯性質物件
     * @param item popup選單返回的帳號物件
     */
    private onRemitNatureChange(item) {
        this.selectRemitNature = item.name;
        this.chooseRemitNatureObj = {
            groupId: item.groupId,
            groupName: item.groupName,
            code: item.code,
            name: item.name
        };

        if (this.nowBookMark == 'buy-foreign') {
            this.twdToForeignData.selectRemitNature = this.selectRemitNature;
            this.twdToForeignData.chooseRemitNatureObj = this.chooseRemitNatureObj;
        } else if (this.nowBookMark == 'sell-foreign') {
            this.foreignToTwdData.selectRemitNature = this.selectRemitNature;
            this.foreignToTwdData.chooseRemitNatureObj = this.chooseRemitNatureObj;
        }
    }

    /**
     * 開始換匯試算金額
     */
    private startConvert(type) {
        // 檢核是否已選擇兌出及兌入幣別
        if (!this.selectSellCurrency || !this.selectBuyCurrency) {
            this.alert.show("FOREIGN_TRANSFER.EMPTY_CERRENCY");
            return;
        }

        // 檢核是否有交叉匯率
        if (!this.referenceRate && !this.referenceCurrencyRate) {
            return;
        }

        // 計算金額
        if (type == 'SellToBuy' && !!this.transOutAmount) {
            let tempOutAmount = this.transOutAmount.replace(/\,/g, '').trim();
            if (this.weightType == '1') { // 權重大轉小
                if (this.selectBuyCurrency == 'TWD' || this.selectBuyCurrency == 'NTD' || this.selectBuyCurrency == 'JPY') {
                    this.transInAmount =
                        (Math.round(parseFloat(tempOutAmount) * parseFloat(this.referenceCurrencyRate))).toString();
                    let bonus_amount = parseFloat(this.transInAmount);
                    let normal_amount = Math.round(parseFloat(tempOutAmount) * parseFloat(this.referenceRate));
                    this.extraAmount = Math.round(bonus_amount - normal_amount).toString();
                } else {
                    this.transInAmount = 
                        (Math.round(parseFloat(tempOutAmount) * parseFloat(this.referenceCurrencyRate) * 100) / 100).toString();
                    let bonus_amount = parseFloat(this.transInAmount);
                    let normal_amount = Math.round(parseFloat(tempOutAmount) * parseFloat(this.referenceRate) * 100) / 100;
                    this.extraAmount = (Math.round((bonus_amount - normal_amount) * 100) / 100).toString();
                }
            } else if (this.weightType == '2') { // 權重小轉大
                if (this.selectBuyCurrency == 'TWD' || this.selectBuyCurrency == 'NTD' || this.selectBuyCurrency == 'JPY') {
                    this.transInAmount =
                        (Math.round(parseFloat(tempOutAmount) / parseFloat(this.referenceCurrencyRate))).toString();
                    let bonus_amount = parseFloat(this.transInAmount);
                    let normal_amount = Math.round(parseFloat(tempOutAmount) / parseFloat(this.referenceRate));
                    this.extraAmount = (Math.round((bonus_amount - normal_amount))).toString();
                } else {
                    this.transInAmount =
                        (Math.round(parseFloat(tempOutAmount) / parseFloat(this.referenceCurrencyRate) * 100) / 100).toString();
                    let bonus_amount = parseFloat(this.transInAmount);
                    let normal_amount = Math.round(parseFloat(tempOutAmount) / parseFloat(this.referenceRate) * 100) / 100;
                    this.extraAmount = (Math.round((bonus_amount - normal_amount) * 100) / 100).toString();
                }
            }
            this.transInAmount = this.formatAmount(this.transInAmount);
            // this.extraAmount = this.formatAmount(this.extraAmount);
            this.extraAmount = (parseFloat(this.extraAmount) < 0 ? '0' : this.extraAmount);
        } else if (type == 'BuyToSell' && !!this.transInAmount) {
            let tempInAmount = this.transInAmount.replace(/\,/g, '').trim();
            if (this.weightType == '1') { // 權重大轉小
                if (this.selectSellCurrency == 'TWD' || this.selectSellCurrency == 'NTD' || this.selectSellCurrency == 'JPY') {
                    this.transOutAmount =
                        (Math.round(parseFloat(tempInAmount) / parseFloat(this.referenceCurrencyRate))).toString();
                    let bonus_amount = parseFloat(tempInAmount);
                    let normal_amount = Math.round(parseFloat(this.transOutAmount) * parseFloat(this.referenceRate));
                    this.extraAmount = Math.round(bonus_amount - normal_amount).toString();
                } else {
                    this.transOutAmount =
                        (Math.round(parseFloat(tempInAmount) / parseFloat(this.referenceCurrencyRate) * 100) / 100).toString();
                    let bonus_amount = parseFloat(tempInAmount);
                    let normal_amount = Math.round(parseFloat(this.transOutAmount) * parseFloat(this.referenceRate) * 100) / 100;
                    this.extraAmount = Math.round(bonus_amount - normal_amount).toString();
                }
            } else if (this.weightType == '2') { // 權重小轉大
                if (this.selectSellCurrency == 'TWD' || this.selectSellCurrency == 'NTD' || this.selectSellCurrency == 'JPY') {
                    this.transOutAmount = 
                        (Math.round(parseFloat(tempInAmount) * parseFloat(this.referenceCurrencyRate))).toString();
                    let bonus_amount = parseFloat(tempInAmount);
                    let normal_amount = Math.round(parseFloat(this.transOutAmount) / parseFloat(this.referenceRate) * 100) / 100;
                    this.extraAmount = (Math.round((bonus_amount - normal_amount) * 100) / 100).toString();
                } else {
                    this.transOutAmount = 
                        (Math.round(parseFloat(tempInAmount) * parseFloat(this.referenceCurrencyRate) * 100) / 100).toString();
                    let bonus_amount = parseFloat(tempInAmount);
                    let normal_amount = Math.round(parseFloat(this.transOutAmount) / parseFloat(this.referenceRate));
                    this.extraAmount = (Math.round((bonus_amount - normal_amount) * 100) / 100).toString();
                }
            }
            this.transOutAmount = this.formatAmount(this.transOutAmount);
            // this.extraAmount = this.formatAmount(this.extraAmount);
            this.extraAmount = (parseFloat(this.extraAmount) < 0 ? '0' : this.extraAmount);
        }

    }

    // 增加金額千分位逗號
    private formatAmount(amount) {
        let output;
        let reformat = amount.split('.');
        if (reformat.length === 1) {
            output = reformat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else if (reformat.length === 2) {
            output = reformat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + reformat[1];
        }
        return output;
    }

    private timeOut() {
        this.isCounting = false;
        this.confirm.show('FOREIGN_TRANSFER.REGET_EXCHANGE_RATE', { btnYesTitle: 'FOREIGN_TRANSFER.BTN.REGET', btnNoTitle: 'FOREIGN_TRANSFER.BTN.LEAVE' }).then(
            () => {
                this.getCurrencyData();
                this.transOutAmount = '';
                this.transInAmount = '';
            },
            () => {
                this.navgator.editBack();
            }
        );
    }
    
}
