/**
 * 台幣轉帳
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { TwdTransferService } from '@pages/transfer/shared/twd-transfer.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { BankCodePopupService } from '@template/list/bank-code-popup/bank-code-popup.service';
import { FormateService } from '@template/formate/formate.service';
import { TwdTransOutPopupService } from '@template/list/twd-transout-popup/twd-transout-popup.service';
import { TwdTransOutService } from '@template/list/twd-transout-popup/twd-transout.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { AccountMaskUtil } from '@util/formate/mask/account-mask-util';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';

@Component({
  selector: 'app-twd-transfer-main',
  templateUrl: './twd-transfer-main.component.html',
  styleUrls: []
})

export class TwdTransferMainComponent implements OnInit {
  nowPage = 'edit'; // 當前頁面, 'edit':編輯頁, 'confirm': '確認頁', 'tranint-popup':約定轉入帳號
  noteData: any; // 注意資訊
  payType = 'notAgreed'; // 'notAgreed': 非約轉, 'agreement': 約定
  // 錯誤訊息
  errorMsg = {
    outAccount: '', // 轉出帳號
    bankCode: '', // 銀行代號
    bankCode_not: '', // 銀行代號(非約)
    inAccount_not: '', // 轉入帳號(非約)
    inAccount: '', // 轉入帳號(約定)
    amount: '', // 轉帳金額
    myNote: '', // 存摺備註(給自己)
    forNote: '', // 轉存附言(給對方)
    eMail: '' // 電子信箱
  };
  // 給popoup顯示資訊(銀行代碼)
  popupOption = {
    data: [],
    select: '',
    type: ''
  };
  // 給popoup顯示資訊(轉出帳號)
  transOutOption = {
    data: [],
    select: '',
    type: '' // '2': 非約轉, '1': 約定
  };
  // 送交易使用
  reqData = {
    transType: '', // 交易類型, '1': 約定轉帳, '2': 非約定轉帳-自行輸入, '3': 非約定轉帳-常用帳號
    outAccount: '', // 轉出帳號
    bankCode: '', // 銀行代號
    inAccount: '', // 轉入帳號
    amount: '', // 轉帳金額
    myNote: '', // 存摺備註(給自己)
    forNote: '', // 轉存附言(給對方)
    otherMail: '', // 其他電子信箱
    myMail: '' // 電子信箱
  };
  // 判斷是否能使用 非約定轉帳, 若非約定註記為false or jb root註記為false,不可使用
  notAgreeStatus = {
    nonFlag: true, // 非約定註記
    deviceTrust: true // jb root
  };
  bookmarkData = []; // 頁籤設定
  bookDefault = 'notAgreed'; // 控制bookmark頁籤
  // 是否取得預設轉出帳號
  hasGetDefaultAcct = {
    notAgreed: false, // 非約轉
    agreement: false // 約定
  };
  // 儲存畫面資料(非約)
  saveNotAgreed = {
    accountId: '', // 轉出帳號
    avlAmount: '' // 可用餘額
  };
  // 儲存畫面資料(約定)
  saveAgreed = {
    accountId: '', // 轉出帳號
    avlAmount: '', // 可用餘額
    maxAmt: ''
  };
  private openActFlag = false; // 打開約定常用(有點擊過轉入帳號欄位會開啟true)
  // 選擇轉入帳號類型, 'offen': 常用, 'tranIn': 約定轉入
  chooseType = '';
  openMemo = false; // 判斷是否顯示「備註」「附言」相關欄位
  secutityNameType = ''; // 判斷安控使用種類(依照 非約,約定決定)

  // 顯示畫面用---------------------------------------------------------------------
  // 轉出帳號資料(2隻頁籤共用) => 切換頁籤時,透過暫存資料,切換顯示資料
  showOutData = {
    accountId: '',
    nickName: '',
    avlBal: '',
    amount: '',
    avlAmount: ''
  };
  // 非約定轉入帳號資料(2隻頁籤分開)
  inAcctNotAgreed = {
    showInAcct: '', // 轉入帳號(畫面顯示)
    bankCode: '', // 銀行代號(不含中文)
    showBankCode: '' // 銀行代號(畫面顯示, 含中文)
  };
  // 約定轉入帳號資料(2隻頁籤分開)
  inAcctAgreed = {
    showInAcct: '', // 轉入帳號(畫面顯示)
    bankCode: '', // 銀行代號(不含中文)
    showBankCode: '', // 銀行代號(畫面顯示, 含中文)
    nickName: '' // 帳戶名稱
  };
  showAmount = ''; // 轉帳金額(畫面顯示)
  showMyNote = ''; // 存摺備註(給自己, 畫面顯示) 
  showForNote = ''; // 轉存附言(給對方, 畫面顯示)
  showMaxAmt = '50000'; // 顯示最高金,畫面使用, EX: <= 50,000
  eMailData = {
    myMail: '', // 本人郵件
    otherMail: '' // 其他郵件 ngModel
  };
  tranInAcctImg = ''; // 轉入預設圖片
  confirmData: any; // 確認頁使用之資料
  errorBoxMsg = ''; // errorBox 例外處理msg
  allow_notAgree: boolean = true; // 是否可做非約轉帳
  showInAcctImg = false; // 是否顯示轉入帳號圖片, true: 顯示, false: 不顯示
  idFlag = ''; // 轉入帳上餘額判斷(約定轉入的情況才判斷), 若為'Y'代表結果頁需顯示,轉入帳號餘額及可用餘額

  constructor(
    private _logger: Logger,
    private _mainService: TwdTransferService,
    private _handleError: HandleErrorService,
    private _headerCtrl: HeaderCtrlService,
    private confirm: ConfirmService,
    private navgator: NavgatorService,
    private bankPopupService: BankCodePopupService,
    private twdTransOutPopService: TwdTransOutPopupService,
    private twdTranOutsService: TwdTransOutService,
    private _formateServcie: FormateService,
    private _authService: AuthService,
    private layoutCtrl: LayoutCtrlService
  ) { }

  ngOnInit() {
    this._logger.log("into TwdTransferMainComponent");
    this._initEvent();
  }

  // 初始化事件
  private _initEvent() {
    // 進功能清除cache
    this.twdTranOutsService.removeAllCache(); // 清除轉出帳號相關 
    // 點擊左側返回
    this.onChangePage('edit');
    // 取得注意資訊
    this.noteData = this._mainService.getNoteData();
    // this.notAgreeStatus.nonFlag = this._authService.checkAllowAuth('nonFlag'); // 取得非約轉註記
    // this.notAgreeStatus.deviceTrust = this._authService.getDeviceTrust(); // 取得jb root註記
    // if (this.notAgreeStatus.nonFlag == false || this.notAgreeStatus.deviceTrust == false) {
    //   this._logger.log("into notAgreeStatus false, notAgreeStatus:", this.notAgreeStatus);
    //   this.allow_notAgree = false; // 判斷是否能做非約轉交易
    //   this.bookDefault = 'agreement'; // 不可做非約定,頁籤切換為 約定
    // }
    this._logger.log("_initEvent, notAgreeStatus:", this.notAgreeStatus);
    // 設定頁籤選單
    this.bookmarkData = this._mainService.getBookmark(this.allow_notAgree);
    this.eMailData.myMail = this._authService.getEmail();
    this._logger.log("_initEvent, bookmarkData:", this.bookmarkData);
  }

  /**
   * 頁籤回傳
   * @param e
   */
  onBookMarkBack(e) {
    this._logger.log('Deposit', 'onBookMarkBack', e);
    this.resetEditError();
    this.layoutCtrl.scrollTop();
    
    let page = '';
    let set_data: any;
    let set_id: any;
    if (typeof e === 'object') {
      if (e.hasOwnProperty('page')) {
        page = this._formateServcie.transClone(e.page);
      }
      if (e.hasOwnProperty('data')) {
        set_data = this._formateServcie.transClone(e.data);
        if (set_data.hasOwnProperty('id')) {
          set_id = this._formateServcie.transClone(set_data.id);
        }
      }
    }
    this._logger.log("onBookMarkBack, set_id:", set_id);
    this.nowPage = 'edit'; // 編輯頁
    // 約定
    if (set_id === 'agreement') {
      this.payType = 'agreement';
      this.transOutOption.type = '1'; // 約定
      this.showMaxAmt = this.saveAgreed.maxAmt;
      // 是否取得「約定轉出」之預設帳號
      if (this.hasGetDefaultAcct.agreement == false) {
        this.getDefaultAcct('agreement');
        // 沒取過預設
      } else {
        this.doAgreement();
      }
      // 非約轉
    } else {
      // 若不可做非約轉(系統取得)
      // if (this.notAgreeStatus.deviceTrust == false || this.notAgreeStatus.nonFlag == false) {
      //   this._logger.log("into notAgreeStatus false");
      //   this.notAgreeStatusAlert(this.notAgreeStatus);
      //   // this.tagChange = 'N'; // 不可切換頁籤, bookmark input值
      //   return false;
      // }
      this.payType = 'notAgreed';
      this.transOutOption.type = '2'; // 非約轉
      this.showMaxAmt = '50000'; // 非約轉金額上限為50000
      // 是否取得「非約定轉出」之預設帳號
      if (this.hasGetDefaultAcct.notAgreed == false) {
        this.getDefaultAcct('notAgreed');
        // 沒取過預設
      } else {
        this.doNotAgreed();
      }
    }
  }

  /**
   * 
   * @param type 類型: 'notAgreed'非約轉, 'agreement'約定
   */
  private getDefaultAcct(type) {
    this._logger.log("into getDefaultAcct, type:", type);
    // 約定
    if (type == 'agreement') {
      this.twdTranOutsService.getTransOutDefault('agreement').then(
        (success) => {
          this.showOutData['accountId'] = success['defaultAcct'];
          this.showOutData['avlAmount'] = success['defaultAmount'];
          this.transOutOption['select'] = success['defaultAcct'];
          this.hasGetDefaultAcct.agreement = true;
          // 儲存轉出帳號資訊
          this.saveAgreed['accountId'] = success['defaultAcct'];
          this.saveAgreed['avlAmount'] = success['defaultAmount'];
        },
        (failed) => {
          this._logger.log('has not default, failed:', failed);
          this._logger.log('has not default, failed:', failed);
          this._handleError.handleError(failed);
          // 查無帳號可繼續操作,檢核會擋空帳號
          this.showOutData['accountId'] = '';
          this.showOutData['avlAmount'] = '';
          this.transOutOption['select'] = '';
          this.nowPage = 'edit'; // 錯誤頁面顯示
          this.hasGetDefaultAcct.agreement = true;
        }
      );
      // 非約轉
    } else {
      this.twdTranOutsService.getTransOutDefault('notAgreed').then(
        (success) => {
          this._logger.log('has not default, success:', success);
          this.showOutData['accountId'] = success['defaultAcct'];
          this.showOutData['avlAmount'] = success['defaultAmount'];
          this.transOutOption['select'] = success['defaultAcct'];
          this.hasGetDefaultAcct.notAgreed = true;
          // 儲存轉出帳號資訊
          this.saveNotAgreed['accountId'] = success['defaultAcct'];
          this.saveNotAgreed['avlAmount'] = success['defaultAmount'];
        },
        (failed) => {
          this._logger.log('has not default, failed:', failed);
          this._handleError.handleError(failed);
          // 查無帳號可繼續操作,檢核會擋空帳號
          this.showOutData['accountId'] = '';
          this.showOutData['avlAmount'] = '';
          this.transOutOption['select'] = '';
          this.nowPage = 'edit'; // 錯誤頁面顯示
          this.hasGetDefaultAcct.notAgreed = true;
        }
      );
    }
  }

  /**
   * 處理「非約轉」相關
   */
  private doNotAgreed() {
    this.openActFlag = false;
    this.twdTranOutsService.getNotTwdTransout().then(
      (result) => {
        this._logger.log("getNotAgreed, result:", result);
        // 將轉出帳號暫存資料帶入畫面顯示
        this.showOutData['accountId'] = this.saveNotAgreed['accountId'];
        this.showOutData['avlAmount'] = this.saveNotAgreed['avlAmount'];
        this.transOutOption['select'] = this.saveNotAgreed['accountId'];
      },
      (errorObj) => {
        this._logger.log("getNotAgreed, errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.showOutData['accountId'] = '';
        this.showOutData['avlAmount'] = '';
        this.transOutOption['select'] = '';
        this.nowPage = 'edit'; // 錯誤頁面顯示
        this.hasGetDefaultAcct.notAgreed = true;
      }
    );
  }

  /**
   * 處理「約定」相關
   */
  private doAgreement() {
    if (this.openActFlag) {
      this.openActFlag = false;
    } else {
      this.twdTranOutsService.getTwdTransout().then(
        (result) => {
          this._logger.log("doAgreement, result:", result);
          // 將轉出帳號暫存資料帶入畫面顯示
          this.showOutData['accountId'] = this.saveAgreed['accountId'];
          this.showOutData['avlAmount'] = this.saveAgreed['avlAmount'];
          this.transOutOption['select'] = this.saveAgreed['accountId'];
        },
        (errorObj) => {
          this._logger.log("doAgreement, errorObj:", errorObj);
          this._handleError.handleError(errorObj);
          this.showOutData['accountId'] = '';
          this.showOutData['avlAmount'] = '';
          this.transOutOption['select'] = '';
          this.nowPage = 'edit'; // 錯誤頁面顯示
          this.hasGetDefaultAcct.agreement = true;
        }
      );
    }
  }

  // 點擊 下一步
  onNext() {
    this.resetEditError();
    // 塞入request做檢核
    let checkRule = {
      showMaxAmt: this.showMaxAmt,
      avlAmount: this.showOutData.avlAmount,
      payType: this.payType
    };
    // 非約轉
    if (this.payType == 'notAgreed') {
      this.reqData = {
        transType: '2', // 2: 非約定自行輸入
        outAccount: this.showOutData.accountId, // 轉出帳號
        bankCode: this.inAcctNotAgreed.bankCode, // 銀行代號
        inAccount: this.inAcctNotAgreed.showInAcct, // 轉入帳號
        amount: this.showAmount, // 轉帳金額
        myNote: this.showMyNote, // 存摺備註(給自己)
        forNote: this.showForNote, // 轉存附言(給對方)
        otherMail: this.eMailData.otherMail, // 電子信箱
        myMail: this.eMailData.myMail
      };
      // 約轉
    } else {
      // 3: 非約常用(顯示再約定頁面), 1: 約定帳號
      let transType = this.chooseType == 'offen' ? '3' : '1';
      this.reqData = {
        'transType': transType,
        'outAccount': this.showOutData.accountId, // 轉出帳號
        'bankCode': this.inAcctAgreed.bankCode, // 銀行代號
        'inAccount': this.inAcctAgreed.showInAcct, // 轉入帳號
        'amount': this.showAmount, // 轉帳金額
        'myNote': this.showMyNote, // 存摺備註(給自己)
        'forNote': this.showForNote, // 轉存附言(給對方)
        'otherMail': this.eMailData.otherMail, // 電子信箱
        'myMail': this.eMailData.myMail
      };
    }

    this._logger.log("into onNext, ready to check, reqData:", this.reqData);
    // 檢核
    let check_data = this._mainService.checkData(this.reqData, checkRule);
    this._logger.log("onNext check_data:", check_data);
    // 檢核失敗
    if (!check_data.status) {
      // this._logger.log("onNext check_data:", check_data);
      this.errorMsg.outAccount = check_data.error_list.outAccount;
      // 轉入帳號依照轉帳類型,帶入不同欄位
      if (this.payType == 'agreement') {
        this.errorMsg.inAccount = check_data.error_list.inAccount;
        this.errorMsg.bankCode = check_data.error_list.bankCode;
      } else {
        this.errorMsg.inAccount_not = check_data.error_list.inAccount;
        this.errorMsg.bankCode_not = check_data.error_list.bankCode;
      }
      this.errorMsg.amount = check_data.error_list.amount;
      this.errorMsg.myNote = check_data.error_list.myNote;
      this.errorMsg.forNote = check_data.error_list.forNote;
      this.errorMsg.eMail = check_data.error_list.eMail;
      this._handleError.handleError({
        type: 'dialog',
        title: 'ERROR.TITLE',
        content: 'ERROR.EDIT_INPUT_ERROR'
      });
      return false;
      // 檢核成功
    } else {
      this.resetEditError();
      // 檢核成功發送確認頁api
      this.sendConfirmApi(this.reqData);
    }
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
   * 點擊 轉出帳號
   */
  onSelectTransOut() {
    this._logger.log("into onSelectTransOut, ready to alert popup, transOutOption:", this.transOutOption);
    this.twdTransOutPopService.show(this.transOutOption, this.chooseType, this.allow_notAgree).then(
      (result) => {
        this._logger.log("result:", result);
        this.transOutOption.select = result['accountId']; // 記錄下次要顯示之轉出帳號
        // 畫面顯示用
        this.showOutData = {
          accountId: result['accountId'],
          nickName: result['nickName'],
          avlBal: result['avlBal'],
          amount: result['amount'],
          avlAmount: result['avlAmount']
        };
        // 儲存轉出帳號資料
        if (this.payType == 'notAgreed') {
          this.saveNotAgreed['accountId'] = result['accountId'];
          this.saveNotAgreed['avlAmount'] = result['avlAmount'];
        } else {
          this.saveAgreed['accountId'] = result['accountId'];
          this.saveAgreed['avlAmount'] = result['avlAmount'];
        }
        this.reqData.outAccount = result['accountId']; // 回傳值帶入request
        // 檢核若為約定轉入時,轉入帳號不可與轉出帳號相同 (防呆)
        if (this.chooseType != 'offen') { // 約定轉入(不是常用)
          this.checkTranInAcctFilter(this.showOutData.accountId, this.inAcctAgreed.showInAcct);
        }
      },
      (cancel) => {
        this._logger.log("into cancel");
      }
    );
  }

  /**
   * 點擊 轉入帳號 (約定,常用才會跳popup)
   */
  onSelectTransIn() {
    this._logger.log("into onSelectTransIn, ready to alert popup");
    this.openActFlag = true;
    this.nowPage = 'tranint-popup'; // 切換至約定轉入帳號popup頁面
  }

  /**
   * 點擊 找銀行
   */
  onFindBank() {
    this._logger.log("into onFindBank, ready to alert popup");
    // 回傳使用者選擇之帳號
    this.bankPopupService.show(this.popupOption).then(
      (result) => {
        this._logger.log("result:", result);
        this.popupOption.select = result['bankCode']; // 記錄下次要顯示之銀行代號
        this.inAcctNotAgreed.showBankCode = result['bankCode'] + '-' + result['bankName']; // 畫面顯示用
        this.inAcctNotAgreed.bankCode = result['bankCode']; // 回傳值帶入request
      },
      (cancel) => {
        this._logger.log("into cancel");
      }
    );
  }

  /**
   * 點擊 「+ 填寫備註/通知 +」
   */
  onOpenMemo() {
    this._logger.log("into onOpenMemo before change, openMemo:", this.openMemo);
    if (!this.openMemo) {
      this.openMemo = true;
    } else {
      this.openMemo = false;
    }
    this._logger.log("into onOpenMemo after change, openMemo:", this.openMemo);
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
      this.secutityNameType = (this.payType == 'notAgreed' || this.chooseType == 'offen') ? 'notAgreed' : 'agreement';
      this.nowPage = 'confirm'; // 前往確認頁
    } else {
      // 編輯頁
      this.nowPage = 'edit';
      // 設定header樣式
      this._headerCtrl.setOption({
        leftBtnIcon: 'back',
        rightBtnIcon: ''
      });
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
      // 判斷返回後顯示哪種 帳號模式(約定,非約轉)
      if (this.payType == 'agreement') {
        this.bookDefault = 'agreement'; // bookmark頁籤顯示
        this.payType = 'agreement'; // 開啟約定轉帳畫面
      } else {
        this.bookDefault = 'notAgreed'; // bookmark頁籤顯示
        this.payType = 'notAgreed'; // 開啟非約定轉帳畫面
      }
      // 若點擊取消, 返回首頁
    } else if (page == 'confirm' && pageType == 'home') {
      this._logger.log("into back home");
      // confirm頁 按取消
      this.onCancel();
      // 若點擊 再做一筆
    } else if (page == 'result' && pageType == 'doMore') {
      this._logger.log("into page result doMore");
      this.doMore(); // 清空主層資料
      this._initEvent(); // 再做一次初始化動作
    } else if (page == 'tranint-popup') {
      this._logger.log("into tranint-popup back, tmp_data:", tmp_data);
      this.onChangePage('edit'); // 轉入帳號返回後,設定左側返回
      let maxAmt = this._formateServcie.checkField(tmp_data, 'showMaxAmt');
      if (maxAmt != '' && typeof maxAmt != 'undefined') {
        this.showMaxAmt = maxAmt; // 最高金額限制
        this.saveAgreed.maxAmt = this.showMaxAmt; // 暫存金額限制
      }
      this.nowPage = 'edit'; // 開啟編輯頁
      this.bookDefault = 'agreement'; // bookmark頁籤切換至「約定」
      this.payType = 'agreement'; // 開啟轉入帳號畫面

      // 若為約定轉入popup點擊左側返回
      if (pageType == 'back') {
        this._logger.log("into tranint-popup left back");
        // 返回時將轉出帳號暫存資料,帶入畫面顯示
        this.showOutData['accountId'] = this.saveAgreed['accountId'];
        this.showOutData['avlAmount'] = this.saveAgreed['avlAmount'];

        // 點擊其中一筆帳號回傳至主控 (go)
      } else {
        this._logger.log("into tranint-popup select acct back, tmp_data:", tmp_data);
        let image = this._formateServcie.checkField(tmp_data, 'image');
        this.showInAcctImg = (image == '' || typeof image == 'undefined') ? false : true;
        this.inAcctAgreed['showInAcct'] = tmp_data['accountId'];
        this.inAcctAgreed['bankCode'] = tmp_data['bankCode'];
        // this.inAcctAgreed['showBankCode'] = tmp_data['bankCode'] + '-' + tmp_data['bankName'];
        this.inAcctAgreed['showBankCode'] = tmp_data['showBankName'];
        this.inAcctAgreed['nickName'] = tmp_data['nickName'];
        this.tranInAcctImg = tmp_data['image']; // 將選擇之帳號圖片帶入顯示
        // chooseType: 選擇轉入帳號類型, 'offen': 常用, 'tranIn': 約定轉入
        this.chooseType = this._formateServcie.checkField(tmp_data, 'chooseType');
        this._logger.log("chooseType:", this.chooseType);
        // 轉入帳上餘額顯示判斷(約定轉入的情況才判斷), 若為'Y'代表結果頁需顯示,轉入帳號餘額及可用餘額
        this.idFlag = this.chooseType != 'offen' ? tmp_data['idFlag'] : '';

        // 要比對之帳號, notAgreed: 對應「非約定轉出帳號清單」,  agreement: 對應「約定轉出帳號清單」
        let compareType = (this.chooseType == 'offen' || this.payType == 'notAgreed') ? 'notAgreed' : 'agreement';
        this._logger.log("tranint-popup go, compareType:", compareType);

        /* 情況一：
         * 若當下「轉出帳號」為「約定」轉出帳號(「約定」頁籤),轉入帳號卻選擇「常用帳號(非約轉)」
         * 必須將畫面的「約定轉出帳號」改為「非約定轉出帳號」,帳號對應不到就清空當下的轉出帳號
         * 總結：依照選擇之轉入帳號來比對 畫面上的轉出帳號,是否在對應的轉出帳號list有
         * 常用轉入 => 非約轉出list, 約定轉入 => 約定轉出list
         */
        if(this.showOutData.accountId != '') { // 若有選擇轉出帳號(不為空),才去檢核 帳戶是否對應的到
          this.checkTransOutAcctMapping(this.showOutData, compareType, this.allow_notAgree);
        }
        // 檢核若為約定轉入時,轉入帳號不可與轉出帳號相同 (防呆)
        if (this.chooseType != 'offen') { // 約定轉入(不是常用)
          this.checkTranInAcctFilter(this.showOutData.accountId, this.inAcctAgreed.showInAcct);
        }
      }
      // 完成返回首頁
    } else if (pageType == 'finish') {
      this._logger.log("into finish back to home");
      this.navgator.push('home');
    }
  }

  /**
   * 判斷「約定」轉帳時,轉出帳號,是否在「非約定轉出帳號」能夠對應,找不到清空,且error提示
   * @param showOutData // 當下頁面轉出帳號
   * @param type // 要對應的轉出帳號資料, 固定帶notAgreed(對應「非約轉」轉出帳號資料), 只有約轉才有這狀況
   * @param allow_notAgree // 是否能進行非約轉交易, true: 可以, false: 不行
   */
  private checkTransOutAcctMapping(showOutData, type, allow_notAgree) {
    this.twdTranOutsService.checkTransOut(showOutData, type).then(
      (turnAcctData) => {
        this._logger.log("turnAcctData:", turnAcctData);
        // 若「約定轉出」與「非約定轉出」帳號對應不起來，或不可做非約轉交易
        if (turnAcctData['status'] == false || turnAcctData['list'].length <= 0
          || (allow_notAgree == false && this.chooseType == 'offen')) {
          this._logger.log("into no mapping transOutAcct data");
          this.openActFlag = false;
          // 錯誤提示,並且將轉出帳號,餘額清空
          this.saveAgreed.accountId = ''; // 約定轉出帳號暫存清空
          this.saveAgreed.avlAmount = '';
          this.showOutData.accountId = this.saveAgreed.accountId; // 暫存資料塞入畫面
          this.showOutData.avlAmount = this.saveAgreed.avlAmount;
          this.transOutOption.select = ''; // 帳號對應不到,因此下一次開啟popup無選擇(打勾)
          this._handleError.handleError({
            type: 'dialog',
            title: 'POPUP.ALERT.TITLE',
            content: "ERROR.ACCOUNT_NO_MAPPING"
          });
          return false;
          // 有對應資料,塞入畫面
        } else {
          this._logger.log("into has mapping transOutAcct data");
          this.openActFlag = true;
          let temp = this._formateServcie.checkField(turnAcctData, 'data');
          this.showOutData.accountId = temp['accountId'];
          this.showOutData.avlAmount = temp['avlAmount'];
        }
      },
      (errorObj) => {
        this._logger.log("errorObj:", errorObj);
        this._handleError.handleError(errorObj);
      }
    );
  }


  /**
   * 檢核若為約定轉入時,轉入帳號不可與轉出帳號相同 (防呆)
   * @param outAcct 
   * @param inAcct 
   */
  private checkTranInAcctFilter(outAcct: string, inAcct: string) {
    this._logger.log("into checkTranInAcctFilter, outAcct:", outAcct);
    this._logger.log("into checkTranInAcctFilter, inAcct:", inAcct);
    let zeroOutAcct = AccountMaskUtil.accountAllNoFormate(outAcct); // 強制16位轉出帳號
    let zeroInAcct = AccountMaskUtil.accountAllNoFormate(inAcct); // 強制16位轉入帳號
    if (zeroOutAcct == zeroInAcct) {
      this._handleError.handleError({
        type: 'dialog',
        title: 'POPUP.ALERT.TITLE',
        content: 'TWD_TRANSFER.MSG.TRANINACCT_NOT_SAME'
      });
      // 有錯誤,轉入帳號畫面清空
      this.inAcctAgreed.showInAcct = '';
      this.inAcctAgreed.showBankCode = '';
      this.inAcctAgreed.nickName = '';
      return false;
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

  /**
   * 發送確認頁資料
   * @param reqData 請求資料
   */
  // reqData個欄位名稱,api service會再轉一次
  private sendConfirmApi(reqData) {
    this._logger.log("into sendConfirmApi, reqData:", reqData);
    this._mainService.sendConfirm(reqData, {}).then(
      (result) => {
        this._logger.log("sendConfirmApi, result:", result);
        this.confirmData = result.infoData; // 確認頁顯示用
        this.confirmData['transType'] = this.reqData['transType']; // 設定交易類型給確認頁
        // 檢核成功發送 確認頁api
        this.onChangePage('confirm', this.confirmData);
      },
      (errorObj) => {
        this._logger.log("sendConfirmApi, errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.errorBoxMsg = errorObj['content'];
        this.nowPage = 'errorBox'; // 錯誤頁面顯示
      }
    );
  }

  /**
   * 若不可做非約定交易, 依照狀態提示對應訊息
   * @param status deviceTrust: jb root, nonFlag: 非約轉註記
   */
  private notAgreeStatusAlert(status) {
    let jbRootError = 'TWD_TRANSFER.MSG.JB_ROOT_ERROR';
    let nonFlagError = 'TWD_TRANSFER.MSG.NON_FLAG_ERROR';
    let errorMsg = '';
    if (status.deviceTrust == false && status.nonFlag == true) {
      this._logger.log("jbRootError error");
      errorMsg = jbRootError;
    } else if (status.nonFlag == false && status.deviceTrust == true) {
      this._logger.log("nonFlag error");
      errorMsg = nonFlagError;
    } else if (status.deviceTrust == false && status.nonFlag == false) {
      this._logger.log(" all error");
      errorMsg = 'TWD_TRANSFER.MSG.ALL_JB_ROOT_FLAG_ERROR';
    }
    this._handleError.handleError({
      type: 'dialog',
      title: 'POPUP.ALERT.TITLE',
      content: errorMsg
    });
  }

  /**
   * 結果頁點擊 再做一筆,清空主頁畫面上之資料 
   */
  private doMore() {
    this._logger.log("into doMore");
    // 清空編輯頁所有資訊
    this.popupOption.select = '';
    this.transOutOption.select = '';
    // 送交易使用
    this.reqData = {
      transType: '', // 交易類型, '1': 約定轉帳, '2': 非約定轉帳-自行輸入, '3': 非約定轉帳-常用帳號
      outAccount: '', // 轉出帳號
      bankCode: '', // 銀行代號
      inAccount: '', // 轉入帳號
      amount: '', // 轉帳金額
      myNote: '', // 存摺備註(給自己)
      forNote: '', // 轉存附言(給對方)
      otherMail: '', // 其他電子信箱
      myMail: '' // 電子信箱
    };
    // 儲存畫面資料(非約)
    this.saveNotAgreed = {
      accountId: '', // 轉出帳號
      avlAmount: '' // 可用餘額
    };
    // 儲存畫面資料(約定)
    this.saveAgreed = {
      accountId: '', // 轉出帳號
      avlAmount: '', // 可用餘額
      maxAmt: ''
    };
    // 轉出帳號資料(2隻頁籤共用) => 切換頁籤時,透過暫存資料,切換顯示資料
    this.showOutData = {
      accountId: '',
      nickName: '',
      avlBal: '',
      amount: '',
      avlAmount: ''
    };
    // 非約定轉入帳號資料(2隻頁籤分開)
    this.inAcctNotAgreed = {
      showInAcct: '', // 轉入帳號(畫面顯示)
      bankCode: '', // 銀行代號(不含中文)
      showBankCode: '' // 銀行代號(畫面顯示, 含中文)
    };
    // 約定轉入帳號資料(2隻頁籤分開)
    this.inAcctAgreed = {
      showInAcct: '', // 轉入帳號(畫面顯示)
      bankCode: '', // 銀行代號(不含中文)
      showBankCode: '', // 銀行代號(畫面顯示, 含中文)
      nickName: '' // 帳戶名稱
    };
    this.showAmount = ''; // 轉帳金額(畫面顯示)
    this.showMyNote = ''; // 存摺備註(給自己, 畫面顯示) 
    this.showForNote = ''; // 轉存附言(給對方, 畫面顯示)
    this.eMailData = {
      myMail: '', // 本人郵件
      otherMail: '' // 其他郵件 ngModel
    };
    this.tranInAcctImg = ''; // 轉入帳號圖片清空
    this.hasGetDefaultAcct.agreement = false;
    this.hasGetDefaultAcct.notAgreed = false;
    // this._headerCtrl.setOption({ rightBtnIcon: '' }, true); // 變更Header右側按鈕樣式
    this.nowPage = 'edit'; // 切換至編輯頁
  }

  /**
   * 清空
   */
  private resetEditError() {
    this.errorMsg.outAccount = '';
    this.errorMsg.inAccount = '';
    this.errorMsg.bankCode = '';
    this.errorMsg.inAccount_not = '';
    this.errorMsg.bankCode_not = '';
    this.errorMsg.amount = '';
    this.errorMsg.myNote = '';
    this.errorMsg.forNote = '';
    this.errorMsg.eMail = '';
  }

}
