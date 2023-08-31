/**
 * 外幣利率
 */
import { Component, OnInit } from '@angular/core';
import { ForeignCurrencyService } from '@pages/financial/shared/service/foreign-currency.service';
import { CurrencyFlagPopupService } from '@template/list/currency-flag/currency-flag-popup.service';

@Component({
  selector: 'app-foreign-currency-rate-main',
  templateUrl: './foreign-currency-rate-main.component.html',
  styleUrls: [],
  providers: [ForeignCurrencyService]
})

export class ForeignCurrencyRateMainComponent implements OnInit {
  dataTime: any; // 資料時間
  private currencyList: any; // 外幣list
  currencyData = []; // 幣別data
  haveData = true;
  private dfCurrency = 'USD'; // 預設幣別
  private selectCurrency = ''; // 已選幣別
  errorMsg = '';
  
  // 當前選擇物件
  chooseCurrencyObj = {
    currencyCode: '',
    currencyName: '',
    data: []
  };

  constructor(
    private mainService: ForeignCurrencyService,
    private _currencyPop: CurrencyFlagPopupService
  ) { }

  ngOnInit() {
    // 取得外幣利率data
    this.mainService.getData().then(
      (res) => {
        this.haveData = true;
        this.dataTime = res.dataTime;
        this.currencyList = res.list;
        this.currencyData = res.currencyData;
        if (typeof this.currencyList[this.dfCurrency] != 'undefined') {
          this.onCurrencyChange(this.currencyList[this.dfCurrency]);
        }
        else {
          this.chooseCurrencyObj = {
            currencyCode: '',
            currencyName: '',
            data: []
          };
        }
      },
      (errObj) => {
        this.haveData = false;
        this.errorMsg = errObj.content;
        // Error
      }
    );
  }

  /**
   * 打開幣別選單popup
   */
  popOpen() {
    this._currencyPop.show({
      // title: '',
      data: this.currencyData,
      selectCurrency: this.selectCurrency
    }).then(
        (currencyItem) => {
          this.onCurrencyChange(currencyItem);
        },
        () => {
          // 使用者取消

        }
      );
  }

  /**
   * Popup幣別選擇完
   * @param item 
   */
  onCurrencyChange(item) {
    this.selectCurrency = item.currencyCode;
    this.chooseCurrencyObj = {
      currencyCode: item.currencyCode,
      currencyName: item.currencyName,
      data: item.data
    };
  }

}
