/**
 * 繳信用卡款
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { PayCreditPayableService } from '@pages/card/shared/pay-credit-payable.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { TransAcctPopupService } from '@template/list/trans-acct-popup/trans-acct-popup.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { FormateService } from '@template/formate/formate.service';
import { AuthService } from '@systems/system/auth/auth.service';

@Component({
  selector: 'app-pay-credit-payable',
  templateUrl: './pay-credit-payable-main.component.html',
  styleUrls: []
})

export class PayCreditPayableMainComponent implements OnInit {
  nowStep = 'edit'; // 當前步驟
  // 步驟列data
  stepMenuData = [
    {
      id: 'edit',
      name: 'PAYABLE.PAGE.ENTERDATA' // 輸入資料
    },
    {
      id: 'confirm',
      name: 'PAYABLE.PAGE.CONFIRMDATA', // 付款資訊
    },
    {
      id: 'result',
      name: 'PAYABLE.PAGE.RESULT', // 結果
      // 執行此步驟時是否隱藏步驟列
      hidden: true
    }
  ];
  nowPage = 'edit'; // 當前頁面, 'edit':編輯頁, 'confirm': '確認頁'
  noteData: any; // 注意資訊
  private transOutData: any; // 轉出帳號資料
  showAcct = ''; // 轉出帳號(畫面顯示)
  showBalance = ''; // 可用餘額(畫面顯示)
  // 錯誤訊息
  errorMsg = {
    accountId: '',
    payAmount: ''
  };
  errorBoxMsg = '';

  // 給popoup顯示資訊
  popupOption = {
    data: [],
    select: '', // 選擇之帳號，帳號打勾使用
    type: '' // '2': 信用卡繳費
  };
  payType = 'all'; // 繳款金額方式, 'all': 全額, 'lowest': 最低, 'custom': 自訂
  payBillInfo: any; // 帳單相關資訊 12010501取得
  payAmount = ''; // 繳款金額 (ngModel)
  // 送交易使用
  reqData = {
    accountId: '', // 轉出帳號
    custId: '', // 本人Id
    aRrears: '', // 現欠金額
    payAmount: '' // 繳納金額
  };
  hasCardData = false; // 是否取得信卡資訊

  constructor(
    private _logger: Logger,
    private _mainService: PayCreditPayableService,
    private _handleError: HandleErrorService,
    private popupService: TransAcctPopupService,
    private navgator: NavgatorService,
    private confirm: ConfirmService,
    private _headerCtrl: HeaderCtrlService,
    private _formateService: FormateService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this._logger.log("into PayCreditPayableMainComponent");
    this._initEvent();
  }

  // 初始化事件
  private _initEvent() {
    // 進功能清除cache
    this._mainService.removeAllCache('all');
    // 點擊左側返回
    this.onChangePage('edit');
    // 取得注意資訊
    this.noteData = this._mainService.getNoteData();
    // 改為背景發送 
    this.getAcctData();
    this.getEditData({}).then(
      (result) => {
        this._logger.step('PayCreditEdit', 'success getEditData', result);
        // 顯示頁面
        this.hasCardData = true; // 取得信卡資訊
      },
      (errorObj) => {
        this._logger.step('PayCreditEdit', 'error getEditData', errorObj);
        this._logger.log("sendConfirmApi, errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.errorBoxMsg = errorObj['content'];
        this.nowPage = 'errorBox'; // 錯誤頁面顯示
      }
    );
  }


  // 點擊 下一步
  onNext() {
    this._logger.log("into onNext, ready to check");
    this.reqData = {
      accountId: this.showAcct, // 轉出帳號
      custId: '', // 本人Id
      aRrears: this.payBillInfo.aRrears, // 現欠金額
      payAmount: this.payAmount // 繳納金額
    };
    this._logger.log("onNext, reqData:", this.reqData);
    this.reqData.custId = this.authService.getCustId();
    // ***補檢核

    let check_data = this._mainService.checkData(this.reqData);
    // 檢核失敗
    if (!check_data.status) {
      this._logger.log("onNext check_data:", check_data);
      this.errorMsg.accountId = check_data.error_list.accountId; // 帳號錯誤訊息
      this.errorMsg.payAmount = check_data.error_list.payAmount; // 繳款金額錯誤訊息
      return false;
      // 檢核成功
    } else {
      this.errorMsg.accountId = ''; // 清空錯誤訊息 
      this.errorMsg.payAmount = ''; 
    }

    this.onChangePage('confirm', this.reqData);
  }

  // 點擊 取消
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
   * 查詢轉出帳號
   */
  getAcctData() {
    this._mainService.getAcctData({}, { background: true }).then(
      (result) => {
        this._logger.log("result:", result);
        this.transOutData = result.transOutData;
        this.showAcct = result['defaultAcct']['accountId']; // 信卡轉出帳號沒有預設帳號,預設顯示第一筆
        this.showBalance = result['defaultAcct']['avlAmount']; // 顯示對應之可用餘額
        // 傳給popoup資訊
        this.popupOption = {
          data: this._formateService.transClone(this.transOutData),
          select: this._formateService.transClone(this.showAcct), // 選擇之帳號，帳號打勾使用
          type: '2' // '2': 信用卡繳費
        };
        this._logger.log("getAcctData, showAcct:", this.showAcct);
        this._logger.log("getAcctData, showBalance:", this.showBalance);
        this._logger.log("getAcctData, popupOption:", this.popupOption);
      },
      (errorObj) => {
        this._logger.log("errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.errorBoxMsg = errorObj['content'];
        this.nowPage = 'errorBox'; // 錯誤頁面顯示
      }
    );
  }

  // 取得繳卡費(本期帳單資訊) spec12010501
  private getEditData(setData): Promise<any> {
    return new Promise((resolve, reject) => {
      this._logger.log("into getBillData");
      this._mainService.getBillData(setData).then(
        (result) => {
          this._logger.log("getBillData, result:", result);
          this.payBillInfo = result.infoData; // 帳單相關資訊
          this.payAmount = this.payBillInfo.curBal; // 繳款金額塞入預設顯示(本期應繳總額)
          resolve(true);
        },
        (errorObj) => {
          this._logger.log("getBillData, errorObj:", errorObj);
          this._handleError.handleError(errorObj);
          this.errorBoxMsg = errorObj['content'];
          this.nowPage = 'errorBox'; // 錯誤頁面顯示
          reject(errorObj);
        }
      );

    });
  }

  /**
   * 點擊轉出帳號
   * @param selectData 選擇之帳號
   */
  onSelectAcct(selectData) {
    this._logger.log("onSelectAcct, selectData:", selectData);
    // 回傳使用者選擇之帳號
    this.popupService.show(this.popupOption).then(
      (result) => {
        this._logger.log("result:", result);
        this.showAcct = result['accountId']; // 帶入popup回傳帳號顯示
        this.showBalance = result['avlAmount']; // 帶入對應之可用餘額
        // 回來將預設帳號帶入，顯示下次開啟視窗之選擇帳號
        this.popupOption.select = this.showAcct;
      },
      (cancel) => {
        this._logger.log("into cancel");
      }
    );
  }



  /**
   * 切換頁面
   * @param pageType 
   *    edit
   *    confirm
   * @param pageData 
   */
  onChangePage(pageType?: string, pageData?: any) {
    this._logger.log("into onChangePage, pageType:", pageType);
    this._logger.log("into onChangePage, pageData:", pageData);
    if (pageType === 'confirm') {
      // 確認頁
      this.nowPage = 'confirm'; // 前往確認頁
    } else {
      // 編輯頁
      this.nowPage = 'edit';
      this._headerCtrl.setLeftBtnClick(() => {
        this.onCancel();
      });
    }
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
    // 確認頁返回
    // 若點擊左側, 顯示編輯頁
    if (page == 'confirm' && pageType == 'back') {
      this._logger.log("into back edit");
      this.onChangePage('edit');
      // 若點擊取消, 返回首頁
    } else if (page == 'confirm' && pageType == 'home') {
      // confirm 按取消
      this.onCancel();
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


  // --------------------------------------- [特定功能] --------------------------------------- //
  // 點擊 全額
  onAll() {
    this._logger.log("into onAll");
    this.payType = 'all';
    this.payAmount = this.payBillInfo.curBal; // 本期應繳總額
  }

  // 點擊 最低
  onLowest() {
    this._logger.log("into onLowest");
    this.payType = 'lowest';
    this.payAmount = this.payBillInfo.minPay; // 本期最低應繳總額
  }

  // 點擊 自訂
  onCustom() {
    this._logger.log("into onCustom");
    this.payType = 'custom';
    this.payAmount = '';
  }

  // 點擊 全國繳費網
  onEbill() {
    this._logger.log("into onEbill");
    this.navgator.push("ebill");
  }
  // --------------------------------------- [特定功能 End] --------------------------------------- //



}
