/**
 * 基金轉換(編輯頁)
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { FormateService } from '@template/formate/formate.service';
import { FundAcctPopupService } from '@template/list/fund-acct-popup/fund-acct-popup.service';
import { FundConvertService } from '@pages/fund/shared/fund-convert.service';

@Component({
  selector: 'app-fund-convert-main',
  templateUrl: './fund-convert-main.component.html',
  styleUrls: []
})

export class FundConvertMainComponent implements OnInit {
  @Input() setData: string; // 投資現值查詢帶入之基金標的資訊
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  nowPage = ''; // 目前頁面, 'edit': 編輯頁, 'confirm': 確認頁
  // SPEC11020101 基金回贖編輯(台幣)
  // reqData = {
  //   fundCcy: '', // 基金幣別
  //   license: '', // 信託憑證
  //   fundCode: '', // 基金代號
  //   fundName: '', // 基金名稱
  //   fundFlag: '' // 是否須繳回憑證
  // };
  // 基金贖回 確認頁request
  // confirmReq = {
  //   license: '', // 信託憑證
  //   fundCode: '', // 基金代號
  //   fundName: '', // 基金名稱
  //   fundCcy: '', // 基金幣別
  //   fundAmt: '', // 基金金額
  //   fundFlag: '', // 是否須繳回憑證
  //   accountID: '', // 回贖帳號
  //   fundUnitcnt: '', // 基金單位數
  //   higthRedeemAmt: '', // 最高回贖額
  //   lowestRedeemAmt: '', // 最低回贖額
  //   redeemRadio: '', // 回贖方式
  //   redeemAmt: '', // 回贖金額
  //   optRowcnt: '' // opt
  // };
  // infoData: any; // 編輯頁資料
  // acctData: any; // 帳號資料
  // errorBoxMsg = ''; // 白箱錯誤訊息
  // // 畫面欄位錯誤訊息
  // errorMsg = {
  //   amount: '', // 贖回金額
  //   accountID: '' // 帳號
  // };
  // showFundCode = ''; // 顯示用,基金標的(組合字串)
  // // 顯示帳號相關
  // showAcct = {
  //   accountID: '', // 帳號
  //   accountName: '' // 帳號名稱
  // };
  // showAmount = ''; // 贖回金額,自行輸入(部分贖回)
  // hasEditData = false; // 是否取得編輯頁資料
  // redeemType = 'all'; // 贖回方式, 'all':全部贖回, 'part':部分贖回
  // // 給popoup顯示資訊(轉出帳號)
  // acctOption = {
  //   data: [],
  //   select: '',
  //   type: '2' // '1':申購, '2':贖回, '3':轉換
  // };
  nowStep = 'edit'; // 當前步驟
  // 步驟列data
  stepMenuData = [
    {
      id: 'edit',
      name: 'STEP_BAR.EDIT', // 資料填寫
    },
    {
      id: 'term',
      name: 'STEP_BAR.TERM', // 確認條款
    },
    {
      id: 'confirm',
      name: 'STEP_BAR.CONFIRM', // 資料確認
    },
    {
      id: 'result',
      name: 'STEP_BAR.RESULT', // 結果頁
    }
  ];
  fundData = []; // 可轉換之基金標的清單
  acctList = []; // 帳號清單
  errorBoxMsg = ''; // 錯誤訊息
  // 給popoup顯示資訊(轉出帳號)
  acctOption = {
    data: [],
    select: '',
    type: '3' // '1':申購, '2':贖回, '3':轉換
  };
  // 畫面顯示用
  showData = {
    orgShowFund: '', // formate過的基金名稱, 基金名稱 + 代號 (舊)
    orgFundName: '', // 轉換基金名稱 (舊)
    orgFundId: '', // 轉換基金代號 (舊)
    orgCcy: '', // 轉換基金代號 (舊)
    orgAmt: '', // 轉換金額 (舊)
    showFundName: '', // formate過的基金名稱, 基金名稱 + 代號 (新)
    convertFundId: '', // 轉換基金代號 (新)
    convertFundName: '', // 轉換基金名稱 (新)
    convertCcy: '', // 轉換基金幣別 (新)
    partDownType: '', // 轉換方式, '1': 全部轉換, '2': 部分轉換
    totalAmt: '', // 轉換金額
    accountID: '', // 扣款帳號
    balance: '' // 帳號餘額
  };

  constructor(
    private _logger: Logger,
    private _mainService: FundConvertService,
    private _handleError: HandleErrorService,
    private _headerCtrl: HeaderCtrlService,
    private confirm: ConfirmService,
    private navgator: NavgatorService,
    private _formateService: FormateService,
    private fundPopupService: FundAcctPopupService
  ) { }

  ngOnInit() {
    this._logger.log("into FundConvertMainComponent, setData:", this.setData);
    this._initEvent();
  }

  // 初始動作
  private _initEvent() {
    this._logger.log("into goInit");
    //設定header
    this._headerCtrl.setOption({
      'leftBtnIcon': 'back',
      'title': 'FUNC.WEALTH_INVEST.CONVERT'
    });
    // 設定左側返回
    this._headerCtrl.setLeftBtnClick(() => {
      this.onBack();
    });
    // 發送編輯頁請求
    this.getEditData({});
  }

  /**
   * 回上一步
   */
  onBack() {
    this.onBackPageEvent('convert', 'back', this.setData);
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
    this._logger.log("into onNext, showData:", this.showData);
  }

  /**
   * 選擇帳號
   */
  onSelectAcct() {
    this._logger.log("into onSelectAcct");
    this.fundPopupService.show(this.acctOption).then(
      (result) => {
        this._logger.log("onSelectAcct, result:", result);
        this.acctOption.select = result['accountID']; // 記錄下次要顯示的帳號 
        // 畫面顯示用
        // this.showAcct = {
        //   accountID: result['accountID'],
        //   accountName: result['accountName']
        // };
      },
      (cancel) => {
        this._logger.log("into cancel");
      }
    );
  }

  /**
   * 
   * @param setType 轉換狀態, '1': 全部轉換 '2': 部分轉換
   */
  onSelectConvertType(setType) {
    this._logger.log("onSelectConvertType, setType:", setType);
    this.showData.partDownType = setType;
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
   * 子層返回事件
   * @param e 子層返回值
   */
  onPageBackEvent(e) {
    // this._logger.log('Deposit', 'onPageBackEvent', e);
    // let page = 'list';
    // let pageType = 'list';
    // let tmp_data: any;
    // if (typeof e === 'object') {
    //   if (e.hasOwnProperty('page')) {
    //     page = e.page;
    //   }
    //   if (e.hasOwnProperty('type')) {
    //     pageType = e.type;
    //   }
    //   if (e.hasOwnProperty('data')) {
    //     tmp_data = e.data;
    //   }
    // }
    // // 確認頁點擊左側返回
    // if (page == 'confirm' && pageType == 'back') {
    //   this._logger.log("page: confirm, pageType: back");
    //   this.nowPage = 'edit';
    //   // 設定左側返回
    //   this._headerCtrl.setLeftBtnClick(() => {
    //     this.onBack();
    //   });
    // } else if (page == 'confirm' && page == 'confirm') {
    //   this._logger.log("page: confirm, pageType: home");
    //   this.onCancel();
    //   // 結果頁點擊 再試一次
    // } else if (page == 'result' && pageType == 'retry') {
    //   this.onBackPageEvent('redeem', 'retry', {});
    // }

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

  /**
   * 發送編輯頁資訊
   */
  private getEditData(reqData) {
    this._logger.log("into getEditData, reqData:", reqData);
    this._mainService.getEditData(reqData).then(
      (result) => {
        this._logger.log("into getEditData, result:", result);
        this.fundData = result.fundData; // 可轉換之基金標的清單
        this.acctList = result.acctList; // 帳號清單
        let defAcct = result.defaultAcct.accountID;
        let balance = result.defaultAcct.balance;
        let orgFundId = this._formateService.checkField(this.setData, 'fundCode');
        let orgCcy = this._formateService.checkField(this.setData, 'viewCurrencyeng');
        let orgFundName = this._formateService.checkField(this.setData, 'fundName1');

        this.showData = {
          orgShowFund: orgCcy + ' ' + orgFundId + ' ' + orgFundName, // formate過的基金名稱, 基金名稱 + 代號 (舊)
          orgFundName: orgFundName, // 轉換基金名稱 (舊)
          orgFundId: orgFundId, // 轉換基金代號 (舊)
          orgCcy: orgCcy, // 轉換基金代號 (舊)
          orgAmt: this._formateService.checkField(this.setData, 'osAmt'), // 轉換金額 (舊)
          showFundName: '', // formate過的基金名稱, 基金名稱 + 代號
          convertFundId: '', // 轉換基金代號 (新)
          convertFundName: '', // 轉換基金名稱 (新)
          convertCcy: '', // 轉換基金幣別 (新)
          partDownType: '1', // 轉換方式, '1': 全部轉換, '2': 部分轉換
          totalAmt: '', // 轉換金額
          accountID: defAcct, // 扣款帳號
          balance: balance // 帳號餘額
        };
        this.nowPage = 'edit';
      },
      (errorObj) => {
        this._logger.log("into getEditData, errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.errorBoxMsg = errorObj.content;
        this.nowPage = 'errorBox'; // 錯誤頁面
      }
    );
  }

}
