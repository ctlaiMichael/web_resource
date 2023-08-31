/**
 * 幣別換算
 */
import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '@pages/financial/shared/service/exchange-rate.service';
import { CurrencyFlagPopupService } from '@template/list/currency-flag/currency-flag-popup.service';
import { ReferenceExchangeRateService } from '@template/reference-exchange-rate/reference-exchange-rate.service';
import { LanguageChangeService } from '@systems/system/language/language-change.service';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { currency_converter_content } from '@pages/financial/shared/notePopup-content';
import { FieldUtil } from '@util/formate/modify/field-util';

@Component({
    selector: 'app-currency-converter-main',
    templateUrl: './currency-converter-main.component.html',
    styleUrls: []
})

export class CurrencyConverterMainComponent implements OnInit {
    notePopupOption = {}; // 注意事項設定
    haveData = true;
    dataTime: any; // 資料時間
    nonCashData = []; // 即期data
    cashData = []; // 現金data
    private currencyList: any; // 外幣list
    currencyData = []; // 幣別data
    private dfSellCurrency = ''; // 預設兌出幣別
    private selectSellCurrency = ''; // 已選兌出幣別
    private dfBuyCurrency = ''; // 預設兌入幣別
    private selectBuyCurrency = ''; // 已選兌入幣別
    is_zh_tw = true; // 語言是否中文
    referenceRate = ''; // 交叉匯率
    convertRate = '--'; // 轉換比值
    weightType = ''; // 1:權重大轉小 2:權重小轉大
    sellCurrencyAmount = ''; // 兌出幣別金額
    buyCurrencyAmount = ''; // 兌入幣別金額

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

    checkData = {
        status: true,
        errMsgObj: {
            sellCurrency: '',
            buyCurrency: '',
            currency: '',
            transOutAmount: '',
            transInAmount: '',
            referenceRate: ''
        }
    };

    constructor(
        private exchangeRateService: ExchangeRateService,
        private _currencyPop: CurrencyFlagPopupService,
        private language: LanguageChangeService,
        private logger: Logger,
        private _referenceRateService: ReferenceExchangeRateService,
        private navgator: NavgatorService
    ) { }

    ngOnInit() {
        this.is_zh_tw = this.language.getNowLanguage().lang == 'zh-tw' ? true : false;

        this.notePopupOption = {
            title: 'POPUP.NOTE.TITLE',
            content: currency_converter_content,
        };

        // // 兌出金額欄位監聽onchange事件
        // let sellAmount = document.getElementById("sellAmount");
        // sellAmount.addEventListener("change", () => {
        //   this.onAmountChange('sell');
        // });

        // // 兌入金額欄位監聽onchange事件
        // let buyAmount = document.getElementById("buyAmount");
        // buyAmount.addEventListener("change", () => {
        //   this.onAmountChange('buy');
        // });

        // 取得幣別data
        this.exchangeRateService.getData().then(
            (res) => {
                this.haveData = true;
                this.dataTime = res.dataTime;
                this.currencyList = res.currencyConverterList;
                this.currencyData = res.currencyConverterData;
                if (typeof this.currencyList[this.dfSellCurrency] != 'undefined') {
                    this.onCurrencyChange(this.currencyList[this.dfSellCurrency], 'sell');
                }
                else {
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
                }
                else {
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
            },
            (errObj) => {
                this.haveData = false;
                // Error
            }
        );

    }

    /**
     * 打開幣別選單popup
     */
    currencyPopOpen(type) {
        this._currencyPop.show({
            // title: '',
            data: this.currencyData,
            selectCurrency: (type == 'sell' ? this.selectSellCurrency : this.selectBuyCurrency)
        }).then(
            (currencyItem) => {
                this.onCurrencyChange(currencyItem, type);
            },
            () => {
                // 使用者取消

            }
        );
    }

    /**
     * Popup幣別選擇完
     * @param item
     * @param type 'sell':兌出幣別 'buy':兌入幣別
     */
    onCurrencyChange(item, type) {
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

            let ccy = ['TWD', 'NTD', 'NT$'];
            let isCCY_sell = (ccy.indexOf(this.selectSellCurrency) > -1) ? true : false;
            if (isCCY_sell || this.selectSellCurrency.indexOf('JPY') > -1) {
                if (!!this.sellCurrencyAmount) {
                    let tempOutAmount = this.sellCurrencyAmount.replace(/\,/g, '').trim();
                    tempOutAmount = Math.floor(parseFloat(tempOutAmount)).toString();
                    this.sellCurrencyAmount = this.formatAmount(tempOutAmount);
                }
            }

            if ((this.selectSellCurrency.indexOf('CASH') > -1)) {
                this.onCurrencyChange(this.currencyList['TWD'], 'buy');
            } else if (!isCCY_sell) {
                if (this.selectBuyCurrency.indexOf('CASH') > -1) {
                    this.checkData.errMsgObj.currency = 'FINANCIAL.ERR.INVALID_CURRENCY';
                    this.clearCurrencyObj('buy');
                }
            }
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

            let ccy = ['TWD', 'NTD', 'NT$'];
            let isCCY_buy = (ccy.indexOf(this.selectBuyCurrency) > -1) ? true : false;
            if (isCCY_buy || this.selectBuyCurrency.indexOf('JPY') > -1) {
                if (!!this.buyCurrencyAmount) {
                    let tempInAmount = this.buyCurrencyAmount.replace(/\,/g, '').trim();
                    tempInAmount = Math.floor(parseFloat(tempInAmount)).toString();
                    this.buyCurrencyAmount = this.formatAmount(tempInAmount);
                }
            }

            if ((this.selectBuyCurrency.indexOf('CASH') > -1)) {
                this.onCurrencyChange(this.currencyList['TWD'], 'sell');
            } else if (!isCCY_buy) {
                if (this.selectSellCurrency.indexOf('CASH') > -1) {
                    this.checkData.errMsgObj.currency = 'FINANCIAL.ERR.INVALID_CURRENCY';
                    this.clearCurrencyObj('sell');
                }
            }
        }
        this.getReferenceRate(type);
    }

    /**
     * [匯率表]按鈕點擊事件
     */
    onExchangeRateTableBtnClick() {
        this.navgator.push('exchangeRate');
    }

    /**
     * [幣別交換]按鈕點擊事件
     */
    onCurrencySwapBtnClick() {
        let temp = this.selectSellCurrency;
        this.selectSellCurrency = this.selectBuyCurrency;
        this.selectBuyCurrency = temp;
        let tempObj = this.chooseSellCurrencyObj;
        this.chooseSellCurrencyObj = this.chooseBuyCurrencyObj;
        this.chooseBuyCurrencyObj = tempObj;
        this.getReferenceRate();
        let ccy = ['TWD', 'NTD', 'NT$'];
        let isCCY_sell = (ccy.indexOf(this.selectSellCurrency) > -1) ? true : false;
        if (isCCY_sell || this.selectSellCurrency.indexOf('JPY') > -1) {
            if (!!this.sellCurrencyAmount) {
                let tempOutAmount = this.sellCurrencyAmount.replace(/\,/g, '').trim();
                tempOutAmount = Math.floor(parseFloat(tempOutAmount)).toString();
                this.sellCurrencyAmount = this.formatAmount(tempOutAmount);
            }
        }
        let isCCY_buy = (ccy.indexOf(this.selectBuyCurrency) > -1) ? true : false;
        if (isCCY_buy || this.selectBuyCurrency.indexOf('JPY') > -1) {
            if (!!this.buyCurrencyAmount) {
                let tempInAmount = this.buyCurrencyAmount.replace(/\,/g, '').trim();
                tempInAmount = Math.floor(parseFloat(tempInAmount)).toString();
                this.buyCurrencyAmount = this.formatAmount(tempInAmount);
            }
        }
    }

    /**
     * 取得交叉匯率
     * @param type 'sell':兌出幣別 'buy':兌入幣別
     */
    getReferenceRate(type?) {
        this.referenceRate = '';
        this.convertRate = '--';
        this.checkData.status = true;
        if (!!this.selectSellCurrency) {
            this.checkData.errMsgObj.sellCurrency = '';
            
        } else {
            this.checkData.status = false;
            this.checkData.errMsgObj.sellCurrency = 'FINANCIAL.ERR.SELECT_CURRENCY';
        }

        if (!!this.selectBuyCurrency) {
            this.checkData.errMsgObj.buyCurrency = '';
        } else {
            this.checkData.status = false;
            this.checkData.errMsgObj.buyCurrency = 'FINANCIAL.ERR.SELECT_CURRENCY';
        }

        if (!!this.selectSellCurrency && !!this.selectBuyCurrency) {
            this.checkData.errMsgObj.currency = '';
            // 檢核兌入幣別及兌出幣別是否相同
            if (this.chooseSellCurrencyObj.weight == this.chooseBuyCurrencyObj.weight) {
                // this.clearCurrencyObj(type);
                this.checkData.status = false;
                this.checkData.errMsgObj.currency = 'FINANCIAL.ERR.SAME_CURRENCY';
                return;
            }

            let twd_ccy = ['TWD', 'NTD', 'NT$'];
            let isTwd_buy = (twd_ccy.indexOf(this.selectBuyCurrency) > -1) ? true : false;
            // 檢核現金僅支援台轉外或外轉台
            if ((this.selectSellCurrency.indexOf('CASH') > -1 && !isTwd_buy)
                || (this.selectBuyCurrency.indexOf('CASH') > -1 && this.selectSellCurrency != 'TWD')) {
                // this.clearCurrencyObj(type);
                this.checkData.status = false;
                this.checkData.errMsgObj.currency = 'FINANCIAL.ERR.INVALID_CURRENCY';
                return;
            }

            let isTwd_sell = (twd_ccy.indexOf(this.selectSellCurrency) > -1) ? true : false;
            // 檢核現金僅支援台轉外或外轉台
            if ((this.selectBuyCurrency.indexOf('CASH') > -1 && !isTwd_sell)) {
                // this.clearCurrencyObj(type);
                this.checkData.status = false;
                this.checkData.errMsgObj.currency = 'FINANCIAL.ERR.INVALID_CURRENCY';
                return;
            }

            this._referenceRateService.getReferenceRate(this.chooseSellCurrencyObj, this.chooseBuyCurrencyObj).then(
                (res) => {
                    this.referenceRate = res.referenceCurrencyRate;
                    this.weightType = res.weightType;
                    if (this.weightType == '1') {
                        this.convertRate = this.referenceRate;
                    } else if (this.weightType == '2') {
                        this.convertRate = (Math.round(1 / parseFloat(this.referenceRate) * 10000) / 10000).toString();
                    }
                    this.startConvert('SellToBuy');
                },
                (err) => {
                    this.referenceRate = '';
                    this.convertRate = '--';
                }
            );
        } else {
            this.checkData.errMsgObj.currency = 'FINANCIAL.ERR.SELECT_CURRENCY';
        }

    }

    // /**
    //  * 開始換匯試算金額
    //  */
    // startConvert(type) {
    //   // 檢核是否已選擇兌出及兌入幣別
    //   if (!this.selectSellCurrency || !this.selectBuyCurrency) {
    //     return;
    //   }

    //   // 檢核是否有交叉匯率
    //   if (!this.referenceRate) {
    //     return;
    //   }

    //   // 計算金額
    //   if (type == 'SellToBuy' && !!this.sellCurrencyAmount) {
    //     if (this.weightType == '1') { // 權重大轉小
    //       this.buyCurrencyAmount = (Math.round(parseFloat(this.sellCurrencyAmount) * parseFloat(this.referenceRate) * 100) / 100).toString();
    //     } else if (this.weightType == '2') { // 權重小轉大
    //       this.buyCurrencyAmount = (Math.round(parseFloat(this.sellCurrencyAmount) / parseFloat(this.referenceRate) * 100) / 100).toString();
    //     }
    //   } else if (type == 'BuyToSell' && !!this.buyCurrencyAmount) {
    //     if (this.weightType == '1') { // 權重大轉小
    //       this.sellCurrencyAmount = (Math.round(parseFloat(this.buyCurrencyAmount) / parseFloat(this.referenceRate) * 100) / 100).toString();
    //     } else if (this.weightType == '2') { // 權重小轉大
    //       this.sellCurrencyAmount = (Math.round(parseFloat(this.buyCurrencyAmount) * parseFloat(this.referenceRate) * 100) / 100).toString();
    //     } 
    //   }

    // }

    /**
     * 開始換匯試算金額
     */
    private startConvert(type) {

        // 檢核兌出幣別資料
        if (!this.selectSellCurrency) {
            this.checkData.status = false;
            this.checkData.errMsgObj.sellCurrency = 'FINANCIAL.ERR.SELECT_CURRENCY';
            this.checkData.errMsgObj.currency = 'FINANCIAL.ERR.SELECT_CURRENCY';
        }

        // 檢核兌入幣別資料
        if (!this.selectBuyCurrency) {
            this.checkData.status = false;
            this.checkData.errMsgObj.buyCurrency = 'FINANCIAL.ERR.SELECT_CURRENCY';
            this.checkData.errMsgObj.currency = 'FINANCIAL.ERR.SELECT_CURRENCY';
        }

        // 檢核是否有交叉匯率
        if (!this.referenceRate) {
            this.checkData.status = false;
        }

        if (!this.checkData.status) {
            return;
        }

        // 計算金額
        if (type == 'SellToBuy' && !!this.sellCurrencyAmount) {
            let tempOutAmount = this.sellCurrencyAmount.replace(/\,/g, '').trim();
            if (this.weightType == '1') { // 權重大轉小
                if (this.selectBuyCurrency == 'TWD' || this.selectBuyCurrency == 'NTD' || this.selectBuyCurrency.indexOf('JPY') > -1) {
                    this.buyCurrencyAmount =
                        (Math.round(parseFloat(tempOutAmount) * parseFloat(this.referenceRate))).toString();
                } else {
                    this.buyCurrencyAmount =
                        (Math.round(parseFloat(tempOutAmount) * parseFloat(this.referenceRate) * 100) / 100).toString();
                }
            } else if (this.weightType == '2') { // 權重小轉大
                if (this.selectBuyCurrency == 'TWD' || this.selectBuyCurrency == 'NTD' || this.selectBuyCurrency.indexOf('JPY') > -1) {
                    this.buyCurrencyAmount =
                        (Math.round(parseFloat(tempOutAmount) / parseFloat(this.referenceRate))).toString();
                } else {
                    this.buyCurrencyAmount =
                        (Math.round(parseFloat(tempOutAmount) / parseFloat(this.referenceRate) * 100) / 100).toString();
                }
            }
            this.buyCurrencyAmount = this.formatAmount(this.buyCurrencyAmount);
        } else if (type == 'BuyToSell' && !!this.buyCurrencyAmount) {
            let tempInAmount = this.buyCurrencyAmount.replace(/\,/g, '').trim();
            if (this.weightType == '1') { // 權重大轉小
                if (this.selectSellCurrency == 'TWD' || this.selectSellCurrency == 'NTD' || this.selectSellCurrency.indexOf('JPY') > -1) {
                    this.sellCurrencyAmount =
                        (Math.round(parseFloat(tempInAmount) / parseFloat(this.referenceRate))).toString();
                } else {
                    this.sellCurrencyAmount =
                        (Math.round(parseFloat(tempInAmount) / parseFloat(this.referenceRate) * 100) / 100).toString();
                }
            } else if (this.weightType == '2') { // 權重小轉大
                if (this.selectSellCurrency == 'TWD' || this.selectSellCurrency == 'NTD' || this.selectSellCurrency.indexOf('JPY') > -1) {
                    this.sellCurrencyAmount =
                        (Math.round(parseFloat(tempInAmount) * parseFloat(this.referenceRate))).toString();
                } else {
                    this.sellCurrencyAmount =
                        (Math.round(parseFloat(tempInAmount) * parseFloat(this.referenceRate) * 100) / 100).toString();
                }
            }
            this.sellCurrencyAmount = this.formatAmount(this.sellCurrencyAmount);
        }

    }

    /**
     * 清空已選幣別物件、交叉匯率及轉換比值
     * @param type 'sell':兌出幣別 'buy':兌入幣別
     */
    clearCurrencyObj(type) {
        if (type == 'sell') {
            this.selectSellCurrency = '';
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
        } else {
            this.selectBuyCurrency = '';
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
        this.referenceRate = '';
        this.convertRate = '--';
    }

    // /**
    //  * 金額輸入改變事件
    //  * @param type 'sell':兌出金額 'buy':兌入金額
    //  */
    // onAmountChange(type) {
    //   // 幣別換算金額格式(整數13位、小數2位)
    //   let reg = /^[1-9]\d{0,12}(\.\d{1,2})?$|^0(\.\d{1,2})?$/;
    //   if (type == 'sell') {
    //     if (!reg.test(this.sellCurrencyAmount) || parseFloat(this.sellCurrencyAmount) == 0) {
    //       this.sellCurrencyAmount = '';
    //       this.errorHandler.handleError({
    //         title: 'ERROR.TITLE',
    //         content: 'FINANCIAL.ERR.INVALID_AMOUNT'
    //       });
    //       return;
    //     }
    //     this.startConvert('SellToBuy');
    //   } else {
    //     if (!reg.test(this.buyCurrencyAmount) || parseFloat(this.buyCurrencyAmount) == 0) {
    //       this.buyCurrencyAmount = '';
    //       this.errorHandler.handleError({
    //         title: 'ERROR.TITLE',
    //         content: 'FINANCIAL.ERR.INVALID_AMOUNT'
    //       });
    //       return;
    //     }
    //     this.startConvert('BuyToSell');
    //   }

    // }

    /**
     * 兌出金額輸入改變事件
     * @param value
     */
    transOutAmountChange(value) {
        this.sellCurrencyAmount = FieldUtil.checkField(value, 'value_show');
        if (!this.sellCurrencyAmount || this.sellCurrencyAmount == '') {
            this.buyCurrencyAmount = '';
            return;
        }
        if (this.selectSellCurrency == 'TWD' || this.selectSellCurrency == 'NTD' || this.selectSellCurrency.indexOf('JPY') > -1) {
            let tempOutAmount = this.sellCurrencyAmount.replace(/\,/g, '').trim();
            tempOutAmount = Math.floor(parseFloat(tempOutAmount)).toString();
            this.sellCurrencyAmount = this.formatAmount(tempOutAmount);
        }
        this.startConvert('SellToBuy');
    }

    /**
     * 兌入金額輸入改變事件
     * @param value
     */
    transInAmountChange(value) {
        this.buyCurrencyAmount = FieldUtil.checkField(value, 'value_show');
        if (!this.buyCurrencyAmount || this.buyCurrencyAmount == '') {
            this.sellCurrencyAmount = '';
            return;
        }
        if (this.selectBuyCurrency == 'TWD' || this.selectBuyCurrency == 'NTD' || this.selectBuyCurrency.indexOf('JPY') > -1) {
            let tempInAmount = this.buyCurrencyAmount.replace(/\,/g, '').trim();
            tempInAmount = Math.floor(parseFloat(tempInAmount)).toString();
            this.buyCurrencyAmount = this.formatAmount(tempInAmount);
        }
        this.startConvert('BuyToSell');
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

}
