/**
 * 繳信用卡款(確認,結果頁)
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { PayCreditPayableService } from '@pages/card/shared/pay-credit-payable.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { FormateService } from '@template/formate/formate.service';

@Component({
  selector: 'app-payable-confirm-result',
  templateUrl: './payable-confirm-result.component.html',
  styleUrls: []
})

export class PayableConfirmResultComponent implements OnInit {
  @Input() setData: any; // 編輯頁資料
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  nowPage = 'confirm'; // 當前頁面, 'confirm': 確認頁, 'result': 結果頁
  nowStep = 'confirm'; // 當前步驟
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
  resultData: any; // 交易結果回傳
  resStatus = false; // 交易結果 true: 成功
  statusObj = {}; // 交易結果Obj

  //------ 安控相關 ------
  // 安控設定檔
  setSecurity = {
    transServiceId: 'SPEC12030101', // 交易結果電文
    nameOfSecurity: 'CARDS_PAY', // 交易權限設定
    inAccount: '', // 轉入帳號
    outAccount: '', // 轉出帳號
    currency: '', // 幣別
    amount: '', // 轉帳金額
  };
  setSecurityError: any = {}; // 安控錯誤變數
  // 控制安控送出的變數
  securityAction = { method: 'init' };
  securityObj: any; // 安控回傳物件

  constructor(
    private _logger: Logger,
    private _mainService: PayCreditPayableService,
    private _handleError: HandleErrorService,
    private _headerCtrl: HeaderCtrlService,
    private confirm: ConfirmService,
    private _formateService: FormateService
  ) { }

  ngOnInit() {
    this._logger.log("into PayCreditPayableMainComponent, setData:", this.setData);
    this._headerCtrl.setLeftBtnClick(() => {
      this.onBack();
    });
  }

  /**
   * 回上一步
   */
  onBack() {
    this.onBackPageEvent('confirm', 'back', this.setData);
  }

  /**
   * 取消
   */
  onCancel() {
    this.onBackPageEvent('confirm', 'home', {});
  }

  /**
   * 確認
   */
  onCommit() {
    this._logger.log("confirmpage onConfirm Btn, ready to send");
    this.sendData();
  }


  /**
   * 返回編輯頁
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

  // 發送 spec12030101 信用卡繳卡費(交易)
  sendData() {
    let options: any = {
      security: this.securityObj
    };
    let securityReq: any;
    securityReq = this._mainService.modifyCreditPay(this.setData);
    this.setData = securityReq;
    this._logger.log("options:", options);
    this._mainService.sendData(this.setData, options).then(
      (result) => {
        this._logger.log("sendBillData, result:", result);
        this.resultData = result.infoData;
        this.nowPage = 'result'; // 切換至結果頁
        this.resStatus = result.status;
        this.statusObj = result.statusObj;
      },
      (errorObj) => {
        this._logger.log("sendBillData, errorObj:", errorObj);
        let error_type = this._formateService.checkField(errorObj, 'resultType');
        if (error_type == 'security' || error_type == 'check') {
          this.securityAction = { method: 'error' };
          this.setSecurityError = errorObj;
        } else {
          this.resStatus = false;
          this.statusObj = errorObj;
          // this._handleError.handleError(errorObj);
        }
      }
    );
  }

  // 接收安控返回
  submitSecurity(bakSecurityObj?) {
    if (!bakSecurityObj) {
      this._logger.log("!bakSecurityObj");
      // 送出按鈕
      this.securityAction = { method: 'submit' };
    } else {
      this._logger.log("security back, bakSecurityObj:", bakSecurityObj);
      // // 送出後回傳安控物件一路帶回 (待之後開啟, 安控回傳完成會走進else)
      this.securityObj = bakSecurityObj;
      this.onCommit();
    }
  }

}
