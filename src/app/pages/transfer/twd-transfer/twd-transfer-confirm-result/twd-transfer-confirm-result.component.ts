/**
 * 台幣轉帳(確認,結果頁)
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { TwdTransferService } from '@pages/transfer/shared/twd-transfer.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { FormateService } from '@template/formate/formate.service';
import { SocialsharingPluginService } from '@lib/share/plugins/socialsharing/socialsharing-plugin.service';
import { TranslateService } from '@ngx-translate/core';
import { CheckService } from '@template/check/check.service';

@Component({
  selector: 'app-twd-transfer-confirm-result',
  templateUrl: './twd-transfer-confirm-result.component.html',
  styleUrls: []
})

export class TwdTransferConfirmResultComponent implements OnInit {
  @Input() setData: any; // 編輯頁資料
  @Input() eMailData: any; // email資料
  @Input() secutityNameType: string; // 轉帳類型, 'agreement': 約定, 'notAgreed': 非約定
  @Input() idFlag: string; // 轉入帳上餘額判斷(約定轉入的情況才判斷), 若為'Y'代表結果頁需顯示,轉入帳號餘額及可用餘額
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  reqData = {
    transType: '', // 交易類型, '1':約定轉帳, '2':非約定轉帳-自行輸入, '3':非約定轉帳-常用帳號
    transOutAcc: '', // 轉出帳號
    transInAcc: '', // 轉入帳號
    bankCode: '', // 銀行代號
    amount: '', // 轉帳金額
    transNo: '', // 交易序號
    fee: '', // 手續費
    remark: '', // 備註(給自己)
    comment: '', // 附言(給對方)
    email: '', // 本人郵件
    otherEmail: '', // 其他郵件
    crossTransPW: '', // 跨行交易驗證碼
    isOverTime: '', // 是否跨日交易
    idFlag: '' // 轉入帳號是否為本人 , Y or N
  };
  nowPage = 'confirm'; // 當前頁面, 'confirm': 確認頁, 'result': 結果頁
  resultData: any; // 結果頁資料
  // 控制結果頁欄位,眼睛
  showEye = {
    actBal: false, // 帳上餘額
    avlBal: false // 可用餘額
  };
  resStatus = false; // 交易結果 true: 成功
  statusObj = {}; // 交易結果Obj

  // ------ 安控相關 Start ------ //
  // 安控設定檔
  setSecurity = {
    transServiceId: '', // 交易結果電文
    nameOfSecurity: 'TWDTRANSFERNOAGGREMENT', // 交易權限設定
    signText: {},
    inAccount: '', // 轉入帳號
    inBankCode: '', // 銀行代號
    outAccount: '', // 轉出帳號
    currency: '', // 幣別
    amount: '', // 轉帳金額
  };
  setSecurityError: any = {}; // 安控錯誤變數
  // 控制安控送出的變數
  securityAction = { method: 'init' };
  // 目前安控方法的物件 { name: '手機確認碼認證', id: '2', checkList: [ 'otp'], inputValue: true  },
  securityObj: any; // 安控回傳物件
  // ------ 安控相關 End ------ //
  // 分享訊息資料
  sharingData = {
    amount: '', // 轉帳金額
    transoutMask: '', // 轉出帳號末五碼
    bankCode: '', // 銀行代碼
    bankName: '', // 轉入銀行
    transInMask: '' // 轉入帳號末五碼
  };
  isMainBank = false; // 是否為本行, 判斷條件：轉入行庫為011且交易序號為0000

  constructor(
    private _logger: Logger,
    private _mainService: TwdTransferService,
    private _handleError: HandleErrorService,
    private _headerCtrl: HeaderCtrlService,
    private _formateService: FormateService,
    private socialsharingService: SocialsharingPluginService,
    private translate: TranslateService,
    private navgator: NavgatorService,
    private confirm: ConfirmService,
    private _checkService: CheckService
  ) { }

  ngOnInit() {
    this._logger.log("into TwdTransferConfirmResultComponent", this.setData, this.eMailData);
    this._initEvent();
  }

  // 初始化事件
  private _initEvent() {
    this._headerCtrl.setLeftBtnClick(() => {
      this.onBack();
    });
    let memoInfo = this._formateService.checkField(this.setData, 'memoInfo');
    let checkMemoInfo = this._checkService.checkEmpty(memoInfo);
    // request處理
    this.reqData = {
      transType: this._formateService.checkField(this.setData, 'transType'), // 交易類型
      transOutAcc: this._formateService.checkField(this.setData, 'outAccount'), // 轉出帳號
      transInAcc: this._formateService.checkField(this.setData, 'inAccount'), // 轉入帳號
      bankCode: this._formateService.checkField(this.setData, 'bankCode'), // 銀行代號
      amount: this._formateService.checkField(this.setData, 'amount'), // 轉帳金額
      transNo: this._formateService.checkField(this.setData, 'transNo'), // 交易序號
      fee: this._formateService.checkField(this.setData, 'fee'), // 手續費
      remark: this._formateService.checkField(this.setData, 'remark'), // 備註(給自己)
      comment: this._formateService.checkField(this.setData, 'comment'), // 附言(給對方)
      email: this._formateService.checkField(this.setData, 'email'), // 本人郵件
      otherEmail: this._formateService.checkField(this.setData, 'otherEmail'), // 其他郵件
      crossTransPW: this._formateService.checkField(this.setData, 'crossTransPW'), // 跨行交易驗證碼
      isOverTime: !!checkMemoInfo.status ? 'Y' : 'N', // 是否跨日交易
      idFlag: this.idFlag == 'Y' ? 'Y': 'N' // 轉入帳號是否為本人 , Y or N
    };
    this.setSecurity.amount = this.reqData.amount;
    this.setSecurity.currency = 'TWD';
    this.setSecurity.inAccount = this.reqData.transInAcc;
    this.setSecurity.inBankCode = this.reqData.bankCode;
    this.setSecurity.outAccount = this.reqData.transOutAcc;
    if (this.secutityNameType == 'agreement') {
      this.setSecurity.nameOfSecurity = 'TWDTRANSAGGREMENT';
      this.setSecurity.transServiceId = 'SPEC09000306';
    } else {
      this.setSecurity.nameOfSecurity = 'TWDTRANSFERNOAGGREMENT';
      this.setSecurity.transServiceId = 'SPEC09000306';
    }
    // 處理安控signText與request, 資料出入口需為相同方法回傳
    let securityReq: any = this._mainService.modifyReq(this.reqData);
    this.reqData = securityReq;
    this.setSecurity.signText = securityReq; // 快速交易使用
    this._logger.log("_initEvent, reqData:", this.reqData);
  }

  /**
   * 回上一步
   */
  onBack() {
    this.onBackPageEvent('confirm', 'back', this.setData);
  }

  /**
   * 點擊 確認
   */
  onCommit() {
    this._logger.log("into onCommit");
    this.doSecurity(); // 安控相關處理,待補
    this.sendTransData(this.reqData);
  }

  /**
   * 取消
   */
  onCancel() {
    this._logger.log("into onCancel");
    this.onBackPageEvent('confirm', 'home', {});
  }

  /**
   * 安控相關處理(待補)
   */
  doSecurity() {
    this._logger.log("into doSecurity");
  }

  /**
   * 發送交易api
   * @param reqData 請求物件
   */
  sendTransData(reqData) {
    this._logger.log("into sendTransData, reqData:", reqData);
    let options: any = {
      security: this.securityObj
    };
    this._logger.log("options:", options);
    this._mainService.sendData(reqData, options).then(
      (result) => {
        this._logger.log("sendTransData, result:", result);
        this.resultData = result.infoData; // 帶入結果頁資料
        let bankCode = this._formateService.checkField(result.infoData, 'bankCode');
        let transNo = this._formateService.checkField(result.infoData, 'transNo');
        // 判斷是否為本行, 判斷條件：轉入行庫為011且交易序號為0000, 符合,交易序號顯示空白
        this.isMainBank = (bankCode == '011' && transNo == '00000') ? true : false;
        this.nowPage = 'result'; // 切換至結果頁
        this.resStatus = result.status;
        this.statusObj = result.statusObj;
        // 處理訊息分享資料
        this.sharingData.amount = result.sharingData.amount;
        this.sharingData.transoutMask = result.sharingData.transoutMask;
        this.sharingData.bankCode = result.sharingData.bankCode;
        this.sharingData.bankName = result.sharingData.bankName;
        this.sharingData.transInMask = result.sharingData.transInMask;
        // [TODO:] header返回及右上角icon事件
        this._headerCtrl.setOption({ rightBtnIcon: 'finish' }); // 變更Header右側按鈕樣式
        this.onFinish(); // 設定完成按鈕動作
      },
      (errorObj) => {
        this._logger.log("sendTransData, errorObj:", errorObj);
        this.resStatus = false;
        let error_type = this._formateService.checkField(errorObj, 'resultType');
        if (error_type == 'security' || error_type == 'check') {
          this.securityAction = { method: 'error' };
          this.setSecurityError = errorObj;
        } else {
          this.nowPage = 'result'; // 切換至結果頁
          this.resStatus = false;
          this.statusObj = errorObj;
          // this._handleError.handleError(errorObj);
          // this.statusObj = errorObj;
          // [TODO:] header返回及右上角icon事件
          this._headerCtrl.setOption({ rightBtnIcon: 'finish' }); // 變更Header右側按鈕樣式
          this.onFinish(); // 設定完成按鈕動作
        }

      }
    );
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

  // -------- 結果頁 --------

  /**
   * 再轉一筆
   */
  ondoMore() {
    this._logger.log("ondoMore");
    this.onBackPageEvent('result', 'doMore');
  }

  /**
   * 分享
   */
  onNoticePay() {
    this._logger.log("onNoticePay");
    let title_msg = 'TWD_TRANSFER.RESULT.SHARING_TITLE';
    let content_msg = 'TWD_TRANSFER.RESULT.SHARING_MESSAGE';
    this.translate.get(title_msg).subscribe((i18nval) => {
      title_msg = i18nval;
    });

    this.translate.get(content_msg,
      {
        amount: this.sharingData.amount,
        transoutMask: this.sharingData.transoutMask,
        bankCode: this.sharingData.bankCode,
        bankName: this.sharingData.bankName,
        transInMask: this.sharingData.transInMask
      }).subscribe((i18nval) => {
        content_msg = i18nval;
      });

    this.socialsharingService.shareMsg({
      subject: title_msg,
      message: content_msg,
      url: ''
    }).then(
      (success) => {

      },
      (failed) => {

      }
    );
  }

  /**
   * 加入常用
   */
  onAddOffen() {
    this._logger.log("onAddOffen");
  }

  /**
   * 控制開關眼睛
   * @param type 類型, 'actBal': 帳上餘額, 'avlBal': 可用餘額
   */
  onEye(type) {
    this._logger.log("into onEye, type:", type);
    this._logger.log("into onEye, showEye[type]:", this.showEye[type]);
    if (this.showEye[type] == false) {
      this.showEye[type] = true;
    } else {
      this.showEye[type] = false;
    }
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

  // 點擊右上方完成
  private onFinish() {
    this._headerCtrl.setRightBtnClick(() => {
      this.onBackPageEvent('result', 'finish');
    });
  }
}
