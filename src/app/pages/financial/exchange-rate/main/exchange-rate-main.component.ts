/**
 * 外幣匯率
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExchangeRateService } from '@pages/financial/shared/service/exchange-rate.service';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';

@Component({
  selector: 'app-exchange-rate-main',
  templateUrl: './exchange-rate-main.component.html',
  styleUrls: []
})

export class ExchangeRateMainComponent implements OnInit {

  @Input() inputData: any;
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();

  dataTime: any; // 資料時間
  nonCashData = []; // 即期data
  cashData = []; // 現金data
  haveData = true;
  nowBookMark = 'spot-rate'; // 現在分頁
  errorMsg = '';

  // 頁籤data
  bookmarkData = [
    {
      id: 'spot-rate',
      name: 'FINANCIAL.SPOT_RATE',
      sort: 1
    },
    {
      id: 'cash-rate',
      name: 'FINANCIAL.CASH_RATE',
      sort: 2
    }
  ];

  refreshing = false; // 是否正在重新發電文取資料
  lockDoubleClick = false;

  constructor(
    private mainService: ExchangeRateService,
    private navgator: NavgatorService,
    private _logger: Logger,
    private headerCtrl: HeaderCtrlService
  ) { }

  ngOnInit() {
    if (!!this.inputData && this.inputData != 'undefined') {
      if (!!this.inputData.backPage && this.inputData.backPage == 'foreignTransfer') {
        this.headerCtrl.setOption({
          leftBtnIcon: 'back',
          rightBtnIcon: '',
          title: 'FUNC.RATES.EXCHANGE_RATES'
        }); // 變更Header按鈕樣式

        this.headerCtrl.setLeftBtnClick(() => {
          this.onLeftBtnClick();
        });
      }
    }

    this.getData();
  }

  /**
   * 返回編輯頁
   */
  onLeftBtnClick() {
    let output = {
      page: 'exchangeRate'
    };
    this.backPageEmit.emit(output);
  }

  /**
   * 頁籤選擇完返回事件
   */
  onBookMarkBack(e) {
    this.nowBookMark = e.data.id;
  }

  /**
   * 重新取得資料
   */
  onRefresh() {
    if (this.refreshing || this.lockDoubleClick) {
      return;
    }

    this.lockDoubleClick = true;
    this.getData();
    
    setTimeout(() => {
      this.lockDoubleClick = false;
    }, 3000);
  }

  /**
   * navgator push to 歷史匯率走勢圖頁面
   */
  onHistory(item) {
    let params = {
      dfCurrency: item.currencyCode
    };
    this.navgator.push('exchangeRateHistory', params);
  }

  /**
   * 取得外幣匯率data
   */
  getData() {
    this.refreshing = true;
    this.mainService.getData().then(
      (res) => {
        this.haveData = true;
        this.dataTime = res.dataTime;
        this.nonCashData = res.nonCashData;
        this.cashData = res.cashData;
        this.refreshing = false;
      },
      (errObj) => {
        this.haveData = false;
        this.errorMsg = errObj.content;
        this.refreshing = false;
        // Error
      }
    );
  }

  /**
   * [外幣轉帳]按鈕點擊事件
   */
  onForeignTransferBtnClick() {
    this.navgator.push('foreignTransfer');
  }

  /**
   * [設定到價通知]按鈕點擊事件
   */
  onExchangeRateNoticeBtnClick() {
    this.navgator.push('exchangeRateNotice');
  }

  /**
   * [幣別換算]按鈕點擊事件
   */
  onCurrencyConverterBtnClick() {
    this.navgator.push('currencyConverter');
  }

}
