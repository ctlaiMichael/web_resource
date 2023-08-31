/**
 * 理財妙管家
 */
import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';

@Component({
  selector: 'app-auto-fund-redeem-content',
  templateUrl: './auto-fund-redeem-content.component.html',
  styleUrls: []
})

export class FundRedeemContentComponent implements OnInit {
  @Input() setData: any; //api 05030102 request
  @Input() outData: any;
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  infoData: any = {}; //SPEC05030102 存款帳戶明細查詢(資訊)
  listData: any = []; //SPEC05030102 存款帳戶明細查詢(明細)
  totalData: any = {}; //SPEC05030102 存款帳戶明細查詢(總計相關)
  showData = false;
  expandFlag: boolean; //是否全部展開
  // 編輯頁req
  modifyData: any;
  nowPage = 'query-content'; // 當前頁面

  constructor(
    private _logger: Logger,
    private _headerCtrl: HeaderCtrlService,
    private confirm: ConfirmService,
    private navgator: NavgatorService
  ) { }

  ngOnInit() {
    this._headerCtrl.setLeftBtnClick(() => {
      this.onLeftBtnClick();
    });
  }

  /**
   * 重新設定page data 子層返回事件
   * @param item
   */
  onBackPageData(item, page?) {
    let output = {
      'page': 'list-page',
      'type': 'back',
      'data': item
    };
    if (typeof page != 'undefined') {
      output.page = page;
    }
    this._logger.log("into onBackPageData, output:", output);
    this.backPageEmit.emit(output);
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

    // 修改頁返回
    if (page == 'modify-page' && pageType == 'back') {
      this._logger.log("into modify-page back");
      this.nowPage = 'query-content';
      // 設定左側返回
      this._headerCtrl.setLeftBtnClick(() => {
        this.onLeftBtnClick();
      });
      // 點擊取消
    } else if (pageType == 'home') {
      this._logger.log("into onCancel");
      // 是否放棄交易提示
      this.confirm.cancelEdit().then(
        () => {
          this.navgator.editBack();
        },
        () => {
          // no do
        }
      );
      // this.onBackPageData({}, 'home');
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
   * Header左側按鈕點擊事件
   */
  onLeftBtnClick() {
    let output = {
      'page': 'content',
      'type': 'back',
      'data': this.setData,
      'nodetail': true
    };
    this._logger.log("into onBackPageData2222222, output:", output);
    this.backPageEmit.emit(output);
  }

  /**
   * 點擊修改
   */
  onModify() {
    this._logger.log("into onModify");
    this.modifyData = this.setData;
    this.nowPage = 'modify-page';
    // this.onBackPageData(this.modifyData, 'modify-page');
  }
}