/**
 * 貸款服務_基本資料查詢
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { LoanBasicService } from '@pages/loan/shared/loan-basic.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

@Component({
  selector: 'app-loan-main-basic',
  templateUrl: './loan-main-basic.component.html',
  styleUrls: []
})

export class LoanMainBasicComponent implements OnInit {
  // 儲存帳號資訊(用來發spec08010002)
  account = '';
  // 基本資料
  basicData = {};
  autoPayAccount = {}; // 自動扣繳帳號相關
  // defaultAcct = ''; // 預設帳號(不一定有)
  // 指定搜尋的帳號(不一定有) => router傳入
  defaultAcct = {
    account: '',
    currencyCode: ''
  };
  showData = '';
  errorMsg = ''; // 錯誤訊息(白箱)
  hasAcct = false; // 是否查到帳號資料

  constructor(
    private _logger: Logger,
    private _formateServcie: FormateService,
    private _mainService: LoanBasicService,
    private _handleError: HandleErrorService,
    private navgator: NavgatorService
  ) { }

  ngOnInit() {
    this._logger.log("into LoanMainBasicComponent");
    this._mainService.removeAllCache();
  }

  // 前往 本金利息明細查詢
  onGoDetail() {
    let url_params = { accountId: this.account };
    this._logger.log("into onGoDetail");
    this.navgator.push('loan-detail', url_params);
  }

  /**
   * 帳號回傳(準備查詢交易明細)
   * @param e
   */
  onAcctBackEvent(e) {
    this._logger.log('Deposit', 'onAcctBackEvent', e);
    if (e.hasOwnProperty('data')) {
      // 紀錄帳號回傳資訊(發送spec05030102使用)
      let change_act = this._formateServcie.checkObjectList(e, 'data.account');
      // let change_currency = this._formateServcie.checkObjectList(e, 'data.currency');
      if (change_act == this.account) {
        return false;
      }
      // 帳號欄位回來先清空資料(畫面重製顯示),有可能選不同帳號
      this.showData = '';
      this.account = change_act; // 取得帳號資料
      this.hasAcct = true; // 帳號查詢成功
    }
    let reqData = {
      "accountId": this.account
    };
    this.getBasic(reqData);
    // this.onChangePage(this.reqData.id, pageData);
  }

  /**
   * 帳號錯誤回傳
   * @param e
   */
  onAcctErrorEvent(e) {
    this._logger.log('Deposit', 'onAcctErrorEvent', e);
    let errorObj = {};
    if (e.hasOwnProperty('data')) {
      errorObj = e.data;
      errorObj['type'] = 'message';
      errorObj['title'] = 'ERROR.TITLE';
      this._handleError.handleError(errorObj);
      this.errorMsg = errorObj['content'];
      this.showData = 'errorBox';
    }
  }

  // 取得基本資料資訊
  getBasic(setData) {
    this._logger.log("into getBasic, setData:", setData);
    this._mainService.getBasicData(setData).then(
      (result) => {
        this._logger.log("getBasic ,result:", result);
        this.basicData = result.infoData;
        this.autoPayAccount = this.basicData['autoPayAccount'];
        this.showData = 'basic'; // 顯示資訊
        this._logger.log("getBasic ,showData:", this.showData);
      },
      (errorObj) => {
        this._logger.log("getBasic, errorObj:", errorObj);
        errorObj['type'] = 'dialog';
        this._handleError.handleError(errorObj);
        this.showData = 'errorBox';
        this.errorMsg = errorObj.content; // 給錯誤訊息
      }
    );
  }

  /**
   * 失敗回傳(分頁)
   * @param error_obj 失敗物件
   */
  onErrorBackEvent(e) {
    this._logger.log('Deposit', 'onErrorBackEvent', e);
    let page = 'list';
    let pageType = 'list';
    let errorObj: any;
    if (typeof e === 'object') {
      if (e.hasOwnProperty('page')) {
        page = e.page;
      }
      if (e.hasOwnProperty('type')) {
        pageType = e.type;
      }
      if (e.hasOwnProperty('data')) {
        errorObj = e.data;
      }
    }

  }

}
