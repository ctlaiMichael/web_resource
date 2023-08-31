/**
 * 定期存款(基本資料)
 */
import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { TimeDepositMainService } from '@pages/time-deposit/shared/time-deposit-main.service';

@Component({
  selector: 'app-time-deposit-basic',
  templateUrl: './time-deposit-basic.component.html',
  styleUrls: []
})

export class TimeDepositBasicComponent implements OnChanges {
  @Input() setData: any; // api 07010101 request
  @Input() changAcct: string;
  @Input() setCurrency: string;
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  infoData: any = {}; // SPEC07010101 基本資料查詢(資訊)
  baseData: any = []; // SPEC07010101 基本資料
  showData = false;
  private nowSearch = '';

  constructor(
    private _mainService: TimeDepositMainService,
    private _logger: Logger
  ) { }

  // 帳號有改變，就觸發ngOnChanges去變更，及重發API
  ngOnChanges() {
    this._logger.log("ngOnChanges into TimeDepositBasicComponent, setData:", this.setData);
    this.doInit();
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
    let output = {
      'page': 'list-page',
      'type': 'back',
      'data': item
    };
    this._logger.step('Deposit', 'detail back', item);
    this._logger.log("into onErrorPageData, output:", output);
    this.errorPageEmit.emit(output);
  }

  // 初始化事件
  private doInit() {
    this._logger.log("ngOnInit into TimeDepositBasicComponent, setData:", this.setData);
    // 塞request
    let reqData = {
      'accountId': this.setData.accountId,
      'item': 'B',
      'currencyCode': this.setData.currencyCode
    };

    // 檢核是否查資料
    let check_research = this.checkReSearch(reqData);
    if (!check_research) {
      this._logger.log("AccountDetail", "no search");
      return false;
    }
    this._logger.log("ready to send api");
    this.showData = false;
    // Api SPEC07010101-定期存款(基本資料)
    this.getBasicData(reqData);
  }

  // Api SPEC07010101-定期存款(基本資料)
  private getBasicData(reqData, page?, sort?: string) {
    let option = {};
    this._mainService.getBasicData(reqData, option).then(
      (result) => {
        this.baseData = result.data;
        this.showData = true;
        this._logger.log("getBasicData success, infoData:", this.infoData);
        this._logger.log("getBasicData success, baseData:", this.baseData);
        this.onBackPageData(result); // 回傳總計資訊給父層顯示
      },
      (errorObj) => {
        this._logger.log("getBasicData error, errorObj:", errorObj);
        errorObj['type'] = 'message';
        this.showData = false;
        this.onErrorPageData(errorObj); // 將錯誤資訊給父層
      }
    );
  }


  /**
   * 依功能調整檢核是否查資料
   * @param reqData 
   */
  private checkReSearch(reqData) {
    if (!reqData.accountId) {
      this._logger.log("AccountDetail", "no account");
      return false;
    }
    let new_search = [reqData.accountId, reqData.currencyCode, reqData.item].join('_');
    if (new_search == this.nowSearch) {
      // 欄位相同不重查
      return false;
    }
    this.nowSearch = new_search;
    return true;
  }
}