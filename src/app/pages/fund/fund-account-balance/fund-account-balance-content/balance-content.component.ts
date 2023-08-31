/**
 * 險值查詢第三層
 */
import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
// import { DepositAccountDetailService } from '@pages/deposit/shared/deposit-account-detail.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';

@Component({
  selector: 'app-balance-content',
  templateUrl: './balance-content.component.html',
  styleUrls: []
})

export class BalanceContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() setData: any; // api 05030102 request
  @Input() outData: any;
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  // 'content'：現值查詢內容頁, 'redeem':贖回頁, 'convert':轉換頁
  nowPage = {
    content: true, // 是否開啟此頁
    redeem: false,
    convert: false
  };
  infoData: any = {};
  listData: any = [];
  totalData: any = {};
  showData = false;
  expandFlag: boolean; // 是否全部展開


  constructor(
    // private _mainService: DepositAccountDetailService,
    // private _handleError: HandleErrorService,
    private _logger: Logger,
    // private _formateService: FormateService
    private _headerCtrl: HeaderCtrlService
  ) { }

  ngOnInit() {
    // test
    this._headerCtrl.setLeftBtnClick(() => {
      this.onLeftBtnClick('back');
    });
  }

  // 排序參數有改變，就觸發ngOnChanges去變更排序
  ngOnChanges() {
  }

  ngOnDestroy() {
  }

  /**
   * 子層返回事件
   * @param e
   */
  onPageBackEvent(e) {
    this._logger.log('Deposit', 'onPageBackEvent', e);
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
    // 贖回返回
    if (page == 'redeem') {
      this._logger.log("into page redeem");
      // 贖回點擊左側返回, 顯示現值查詢
      if (pageType == 'back') {
        this._logger.log("into pageType back");
        this.nowPage.redeem = false; // 關閉贖回頁
        this.nowPage.content = true;
        this.setHeaderTitle(); // 返回重新設定header title
        // 設定左側返回
        this._headerCtrl.setLeftBtnClick(() => {
          this.onLeftBtnClick('back');
        });
      } else if (pageType == 'home') {
        this._logger.log("into pageType home");
        // 贖回結果頁 點擊 再試一次
      } else if (pageType == 'retry') {
        this._logger.log("into pageType retry");
        this.setHeaderTitle(); // 返回重新設定header title
        this.onLeftBtnClick('retry');
        
      }
      // 轉換返回
    } else if (page == 'convert') {
      if (pageType == 'back') {
        this._logger.log("into pageType back");
        this.nowPage.convert = false; // 關閉轉換頁
        this.nowPage.content = true;
        this.setHeaderTitle(); // 返回重新設定header title
        // 設定左側返回
        this._headerCtrl.setLeftBtnClick(() => {
          this.onLeftBtnClick('back');
        });
      }
    }
  }

  onErrorBackEvent(e) {
    this._logger.log('Deposit', 'onErrorBackEvent', e);
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
  }


  /**
   * 重新設定page data 子層返回事件
   * @param item
   */
  onBackPageData(item) {
    let output = {
      'page': 'list-page',
      'type': 'back',
      'data': item
    };
    this._logger.log("into onBackPageData, output:", output);
    this.backPageEmit.emit(output);
  }

  /**
  * 重新設定page data 子層返回事件
  * @param item
  */
  onErrorPageData(item) {
  }


  //初始化事件
  private doInit() {
  }

  /**
* Header左側按鈕點擊事件
*/
  onLeftBtnClick(type) {
    this.nowPage.content = false; // 返回 關閉內容頁
    this._logger.log("into onLeftBtnClick, nowPage.content:", this.nowPage.content);
    let output = {
      'page': 'content',
      'type': type,
      'data': this.setData,
      'nodetail': true
    };
    this._logger.log("into onBackPageData2222222, output:", output);
    this.backPageEmit.emit(output);
  }

  //設定header
  private setHeaderTitle() {
    this._headerCtrl.setOption({
      'leftBtnIcon': 'back',
      'rightBtnIcon': '',
      'title': 'FUNC.WEALTH_INVEST.ASSET_ACCOUNT_INQUIRY'
    });
  }

  /**
   * 點擊贖回
   */
  onRedeem() {
    this._logger.log("into onRedeem");
    this.nowPage.redeem = true; // 開啟贖回頁
    this.nowPage.convert = false;
  }

  /**
   * 點擊轉換
   */
  onConvert() {
    this._logger.log("into onConvert");
    this.nowPage.redeem = false;
    this.nowPage.convert = true; // 開啟轉換頁
  }
}