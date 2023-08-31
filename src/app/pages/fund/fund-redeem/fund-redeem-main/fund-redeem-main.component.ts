/**
 * 基金贖回(編輯頁)
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { FundRedeemService } from '@pages/fund/shared/fund-redeem.service';
import { FormateService } from '@template/formate/formate.service';
import { FundAcctPopupService } from '@template/list/fund-acct-popup/fund-acct-popup.service';

@Component({
  selector: 'app-fund-redeem-main',
  templateUrl: './fund-redeem-main.component.html',
  styleUrls: []
})

export class FundRedeemMainComponent implements OnInit {
  @Input() setData: string; // 投資現值查詢帶入之基金標的資訊
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  nowPage = 'edit'; // 目前頁面, 'edit': 編輯頁, 'confirm': 確認頁
  // SPEC11020101 基金回贖編輯(台幣)
  reqData = {
    fundCcy: '', // 基金幣別
    license: '', // 信託憑證
    fundCode: '', // 基金代號
    fundName: '', // 基金名稱
    fundFlag: '' // 是否須繳回憑證
  };
  // 基金贖回 確認頁request
  confirmReq = {
    license: '', // 信託憑證
    fundCode: '', // 基金代號
    fundName: '', // 基金名稱
    fundCcy: '', // 基金幣別
    oldFundAmt: '', // 信託金額
    fundAmt: '', // 基金金額(贖回)
    fundFlag: '', // 是否須繳回憑證 預設為N不顯示
    accountID: '', // 回贖帳號
    fundUnitcnt: '', // 基金單位數
    higthRedeemAmt: '', // 最高回贖額
    lowestRedeemAmt: '', // 最低回贖額
    redeemRadio: '', // 回贖方式
    redeemAmt: '', // 回贖金額
    optRowcnt: '' // opt
  };
  infoData: any; // 編輯頁資料
  acctData: any; // 帳號資料
  errorBoxMsg = ''; // 白箱錯誤訊息
  // 畫面欄位錯誤訊息
  errorMsg = {
    amount: '', // 贖回金額
    accountID: '' // 帳號
  };
  showFundCode = ''; // 顯示用,基金標的(組合字串)
  // 顯示帳號相關
  showAcct = {
    accountID: '', // 帳號
    accountName: '' // 帳號名稱
  };
  showAmount = ''; // 贖回金額,自行輸入(部分贖回)
  hasEditData = false; // 是否取得編輯頁資料
  redeemType = 'all'; // 贖回方式, 'all':全部贖回, 'part':部分贖回
  // 給popoup顯示資訊(轉出帳號)
  acctOption = {
    data: [],
    select: '',
    type: '2' // '1':申購, '2':贖回, '3':轉換
  };
  openOtpRadio = false; // 是否開啟 繳回憑證radio選項, 依據fundFlag為*且為全部贖回
  checkedOtpRadio = true; // true: 憑證將寄回, false: 憑證掛失
  openOtpRadioReq = 'N';

  constructor(
    private _logger: Logger,
    private _mainService: FundRedeemService,
    private _handleError: HandleErrorService,
    private _headerCtrl: HeaderCtrlService,
    private confirm: ConfirmService,
    private navgator: NavgatorService,
    private _formateService: FormateService,
    private fundPopupService: FundAcctPopupService
  ) { }

  ngOnInit() {
    this._logger.log("into FundRedeemMainComponent, setData:", this.setData);
    this._initEvent();
  }

  // 初始動作
  private _initEvent() {
    this._logger.log("into goInit");
    // 設定header
    this._headerCtrl.setOption({
      'leftBtnIcon': 'back',
      'title': 'FUNC.WEALTH_INVEST.REDEMPTION'
    });
    // 設定左側返回
    this._headerCtrl.setLeftBtnClick(() => {
      this.onBack();
    });
    this.checkShowLicense(); // 是否開啟 繳回憑證radio選項
    // 進功能清除cache
    this._mainService.removeAllCache(); // 清除基金贖回編輯相關 
    this.reqData = {
      fundCcy: this.setData['viewCurrencyeng'], // 基金幣別
      license: this.setData['licenno1'], // 信託憑證
      fundCode: this.setData['fundCode'], // 基金代號
      fundName: this.setData['fundName1'], // 基金名稱
      fundFlag: this.setData['fundFlag'] // ***是否須繳回憑證(待補)
    };
    if (this.setData['viewCurrencyeng'] != 'NTD' && this.setData['viewCurrencyeng'] != 'TWD') {
      this.getEditForeignData(this.reqData); // 外幣編輯api
    } else {
      this.getEditTwdData(this.reqData); // 台幣編輯api
    }
  }

  /**
   * 選擇贖回方式
   * @param type 贖回方式, 'all':全部贖回, 'part':部分贖回
   */
  onRedeemType(type) {
    let checkType = this.checkRedeemType(type); // 檢核可使用之贖回方式
    if (checkType['status'] == false) {
      this._handleError.handleError({
        title: 'POPUP.ALERT.TITLE',
        content: checkType.msg,
        backType: 'dialog'
      });
    } else {
      this.redeemType = type;
      this.checkShowLicense(); // 是否開啟 繳回憑證radio選項
    }
  }

  /**
   * 選擇帳號
   */
  onSelectAcct() {
    this._logger.log("into onSelectAcct");
    this.fundPopupService.show(this.acctOption).then(
      (result) => {
        this._logger.log("onSelectAcct, result:", result);
        let ccy = this._formateService.checkField(result, 'accountEngCcy');
        let acctCcy = ccy == '' ? 'TWD' : result['accountEngCcy']; // 記錄下次要顯示的帳號
        this.acctOption.select = result['accountID'] + '' + acctCcy;
        // 畫面顯示用
        this.showAcct = {
          accountID: result['accountID'],
          accountName: result['accountName']
        };
      },
      (cancel) => {
        this._logger.log("into cancel");
      }
    );
  }

  /**
   * 回上一步
   */
  onBack() {
    this.onBackPageEvent('redeem', 'back', this.setData);
  }

  /**
   * 點擊 取消
   */
  onCancel() {
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
  }

  /**
   * 點擊 下一步
   */
  onNext() {
    this._logger.log("into onNext");
    // 基金贖回 確認頁request
    let redeem_amt = (this.redeemType == 'all') ? this.infoData['fundAmt'] : this.showAmount;
    this.confirmReq = {
      license: this.infoData['license'], // 信託憑證
      fundCode: this.infoData['fundCode'], // 基金代號
      fundName: this.infoData['fundName'], // 基金名稱
      fundCcy: this.infoData['fundEngCcy'], // 基金幣別
      oldFundAmt: this.infoData['fundAmt'], // 信託金額
      fundAmt: redeem_amt, // 基金金額
      fundFlag: this.openOtpRadioReq, // 是否須繳回憑證
      accountID: this.showAcct['accountID'], // 回贖帳號
      fundUnitcnt: this.infoData['fundUnitcnt'], // 基金單位數
      higthRedeemAmt: this.infoData['highReedomAmt'], // 最高回贖額
      lowestRedeemAmt: this.infoData['lowestReedomAmt'], // 最低回贖額
      redeemRadio: this.redeemType == 'all' ? 'all' : 'part', // 回贖方式
      redeemAmt: redeem_amt, // 回贖單位數(配合中台帶入 贖回金額欄位)
      optRowcnt: this.infoData['optRowcnt'] // opt
    };
    let checkReq = this.checkData();
    // 畫面檢核成功
    if (!!checkReq['status']) {
      this._logger.log("check req success go confirm, confirmReq:", this.confirmReq);
      this.nowPage = 'confirm'; // 切換至確認頁
    } else {
      this._logger.log("check req error");
      return false;
    }
  }

  /**
   * 返回現值查詢
   */
  onBackPageEvent(page?, type?, data?) {
    this._logger.log("into onBackPageEvent, page type data", page, type, data);
    let output = {
      'page': page,
      'type': type,
      'data': data
    };
    this.backPageEmit.emit(output);
  }

  /**
   * 取得贖回資料(編輯頁,台幣)
   * @param setData req
   */
  private getEditTwdData(setData) {
    this._mainService.getEditTwd(setData, {}).then(
      (result) => {
        this._logger.log("getEditData, result:", result);
        this.infoData = result.infoData;
        let acctData = result.data; // 帳號資料
        if (acctData.length != 0) {
          // 帶入帳號popup物件
          this.acctOption.data = acctData;
          // 顯示帳號相關
          this.showAcct.accountID = acctData[0]['accountID']; // default 預設第一筆
          this.showAcct.accountName = acctData[0]['accountName'];
          this.acctOption.select = acctData[0]['accountID'] + '' + 'TWD'; // 台幣api回傳幣別統一用TWD
        }
        let fundEngCcy = this._formateService.checkField(this.infoData, 'fundEngCcy');
        let fundCode = this._formateService.checkField(this.infoData, 'fundCode');
        let fundName = this._formateService.checkField(this.infoData, 'fundName');
        let fundChiCcy = this._formateService.checkField(this.infoData, 'fundChiCcy');
        this.showFundCode = fundEngCcy + ' ' + fundCode + fundName + '(' + fundChiCcy + ')';
        this.hasEditData = true;
      },
      (errorObj) => {
        this._logger.log("getEditData, errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.errorBoxMsg = errorObj.content;
        this.nowPage = 'errorBox'; // 錯誤頁面
      }
    );
  }

  /**
   * 取得贖回資料(編輯頁,外幣)
   * @param setData req
   */
  private getEditForeignData(setData) {
    this._mainService.getEditForeign(setData, {}).then(
      (result) => {
        this._logger.log("getEditData, result:", result);
        this.infoData = result.infoData;
        let acctData = result.data; // 帳號資料
        if (acctData.length != 0) {
          // 帶入帳號popup物件
          this.acctOption.data = acctData;
          // 顯示帳號相關
          this.showAcct.accountID = acctData[0]['accountID']; // default 預設第一筆
          this.showAcct.accountName = acctData[0]['accountName'];
          this.acctOption.select = acctData[0]['accountID'] + '' + acctData[0]['accountEngCcy'];
        }

        let fundEngCcy = this._formateService.checkField(this.infoData, 'fundEngCcy');
        let fundCode = this._formateService.checkField(this.infoData, 'fundCode');
        let fundName = this._formateService.checkField(this.infoData, 'fundName');
        let fundChiCcy = this._formateService.checkField(this.infoData, 'fundChiCcy');
        this.showFundCode = fundEngCcy + fundCode + fundName + '(' + fundChiCcy + ')';
        this.hasEditData = true;
      },
      (errorObj) => {
        this._logger.log("getEditData, errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.errorBoxMsg = errorObj.content;
        this.nowPage = 'errorBox'; // 錯誤頁面
      }
    );
  }

  /**
   * 檢核能使用之贖回方式
   * redeemRadio 贖回方式：
   * 中台回傳part 表示可以做全部、部份回贖
   * 中台回傳all 表示可以做全部回贖
   * @param viewType 畫面上選擇之贖回方式, all:全部, part:部分
   */
  private checkRedeemType(viewType) {
    let output = {
      status: false,
      msg: '',
      data: viewType
    };
    let checkType = this.infoData.redeemRadio;
    // tslint:disable-next-line:radix
    let fundAmt = parseInt(this.infoData.fundAmt); // 信託金額
    // tslint:disable-next-line:radix
    let lowestAmtRule = (parseInt(this.infoData.lowestReedomAmt)) * 2;
    this._logger.log("checkRedeemType, checkType:", checkType);
    this._logger.log("checkRedeemType ,viewType:", viewType);
    this._logger.log("checkRedeemType, fundAmt:", fundAmt);
    this._logger.log("checkRedeemType ,lowestAmtRule:", lowestAmtRule);
    // 回傳all 表示只能做全部回贖, 不可做部分
    if (checkType == 'all' && viewType == 'part') {
      output.status = false;
      // 不可進行「部分贖回」
      output.msg = 'FUND_REDEEM.CHECK.HAS_NOT_PART';
      this._logger.log("not to do redeem part");
      // 投資金額 < (最低投資金額*2) => 僅能全部贖回
    } else if (checkType == 'part' && viewType == 'part'
      && fundAmt < lowestAmtRule) {
      output.status = false;
      // 您的投資未達各幣別最低申購金額之2倍以上，不可申請「部分贖回」
      output.msg = 'FUND_REDEEM.CHECK.FUNDAMOUNT_LESS_TO_DOUBLE';
      this._logger.log("just only redeem all");
    } else {
      output.status = true;
      output.msg = '';
    }
    return output;
  }

  /**
   * 欄位檢核
   */
  private checkData() {
    let output = {
      status: false,
      msg: ''
    };
    let checkReq = this._mainService.checkData(this.confirmReq); // 欄位檢核
    if (!checkReq['status']) {
      this.errorMsg.accountID = checkReq.error_list.accountID;
    } else {
      this.errorMsg.accountID = '';
    }
    // 全部贖回 不檢核金額 status直接為true
    let allTypeAmtStatus = { status: true };
    let checkAmount = this.redeemType == 'all' ? allTypeAmtStatus : this.checkAmount();
    if (!!checkReq['status'] && !!checkAmount['status']) {
      this._logger.log("check success");
      output.status = true;
    } else {
      output.status = false;
    }
    return output;
  }

  /**
   * 金額欄位檢核
   */
  private checkAmount() {
    let output = {
      status: false,
    };
    // 畫面上須檢核,金額相關的欄位,
    let checkObj = {
      redeemType: this.redeemType, // 贖回方式: all, part
      // 金種類名稱, 海外單筆 ETF/海外定期 ETF/國內單筆 ETF/國內定期 ETF/海外單筆產品/海外定期產品/國內單筆產品/國內定期產品
      fundType: this.infoData.fundType,
      currencyCode: this.infoData.fundEngCcy, // 幣別
      fundAmt: this.infoData.fundAmt, // 信託金額(本金)
      amount: this.redeemType == 'all' ? this.infoData.fundAmt : this.showAmount, // 贖回金額
      lowestAmt: this.infoData.lowestReedomAmt, // 最低贖回金額
      highAmt: this.infoData.highReedomAmt, // 最高贖回金額
    };
    this._logger.log("checkAmount, checkObj:", checkObj);
    let checkRedeemAmt = this._mainService.checkRedeemAmt(checkObj); // 檢核
    this._logger.log("checkRedeemAmt:", checkRedeemAmt);
    // 檢核失敗
    if (checkRedeemAmt['status'] == false) {
      // 顯示錯誤方式, 'alert': alert視窗提示, 'remind': 金額欄位紅框
      // alert
      if (checkRedeemAmt['viewError'] == 'alert') {
        this.errorMsg.amount = ''; // 紅框關閉, alert錯誤
        this._handleError.handleError({
          title: 'POPUP.ALERT.TITLE',
          content: checkRedeemAmt.msg,
          backType: 'dialog'
        });
        // 紅框
      } else {
        this.errorMsg.amount = checkRedeemAmt.msg;
      }
      return output;
      // 檢核成功
    } else {
      this.errorMsg.amount = ''; // 紅框關閉, 不會alert錯誤
      output.status = true;
      return output;
    }
  }

  // 判斷是否開啟繳回憑證radio選項,依據fundFlag為*且為全部贖回
  checkShowLicense() {
    if (this.setData['fundFlag'] == '*' && this.redeemType == 'all') {
      this.openOtpRadio = true;
      this.openOtpRadioReq = 'Y';
    } else {
      this.openOtpRadio = false;
      this.openOtpRadioReq = 'N';
    }
  }

  /**
   * 控制憑證勾選
   */
  checkedRadio() {
    if (this.checkedOtpRadio == false) {
      this.checkedOtpRadio = true;
      this.openOtpRadioReq = 'Y'; // 憑證將寄回
    } else {
      this.checkedOtpRadio = false;
      this.openOtpRadioReq = 'L'; // 憑證將掛失
    }
  }

  /**
   * 子層返回事件
   * @param e 子層返回值
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
    // 確認頁點擊左側返回
    if (page == 'confirm' && pageType == 'back') {
      this._logger.log("page: confirm, pageType: back");
      this.nowPage = 'edit';
      // 設定左側返回
      this._headerCtrl.setLeftBtnClick(() => {
        this.onBack();
      });
    } else if (page == 'confirm' && page == 'confirm') {
      this._logger.log("page: confirm, pageType: home");
      this.onCancel();
      // 結果頁點擊 再試一次
    } else if (page == 'result' && pageType == 'retry') {
      this.onBackPageEvent('redeem', 'retry', {});
    }

  }

  /**
   * 失敗回傳
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
