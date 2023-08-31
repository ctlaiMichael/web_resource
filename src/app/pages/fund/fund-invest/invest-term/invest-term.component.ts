/**
 * 基金申購-同意條款
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FundInvestService } from '@pages/fund/shared/fund-invest.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { TermPopupService } from '@template/list/term-popup/term-popup.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invest-term',
  templateUrl: './invest-term.component.html',
  styleUrls: []
})

export class InvestTermComponent implements OnInit {
  @Input() nextData: any;
  @Input() type: string; // 父層傳入,判斷 go or back
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  nowPage = '';
  hasTerm = false; // 是否取得條款資料
  nowStep = 'term'; // 當前步驟
  // 步驟列data
  stepMenuData = [
    {
      id: 'main',
      name: '選擇「投資方式」與「標的」' // 選擇「投資方式」與「標的」
    },
    {
      id: 'edit',
      name: '資料填寫', // 資料填寫
    },
    {
      id: 'term',
      name: '確認條款', // 確認條款
    },
    {
      id: 'confirm',
      name: '資料確認', // 資料確認
    },
    {
      id: 'result',
      name: '確認結果', // 結果頁
    }
  ];
  errorBoxMsg = ''; // 確認頁錯誤訊息
  hasUsaNote = false; // 是否顯示美國註冊基金
  /**
   * 判斷條款哪些要顯示(中台回應)
   * 固定顯示不需判斷的條款 以下：
   * 基金公開說明書 01, 基金各級別近五年費用率及報酬率揭露聲明書 02, 銷售基金通路報酬揭露表 06
   */
  sortedTerm = {
    term4: false, // 高收益配息風險預告書 04
    bShare: false, // 後收型基金 09
    usaSignNote: false, // 美國註冊 07
    showNotifiCation: false, // 瀚亞基金(已廢除) 08
    term10: false, // 境外基金手續費後收集別費用說明書 10
    term11: false, // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種) 11
    term12: false, // 信託資金集合管理運用帳戶信託管理說明書 12
    term13: false, // 金錢信託開戶及各項務務約定書 13
  };
  // 控制是否勾選
  checkedData = {
    self: false, // 基金公開說明書 01
    signAgr: false, // 基金各級別近五年費用率及報酬率揭露聲明書 02
    term4: false, // 高收益配息風險預告書 04
    fee: false, // 銷售基金通路報酬揭露表 06
    usaSignNote: false, // 美國註冊基金注意事項 07 
    hanYa: false, // 瀚亞基金(已廢除) 08
    bShare: false, // 後收型基金風險預告書 09 
    term10: false, // 境外基金手續費後收集別費用說明書 10
    term11: false, // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種) 11
    term12: false, // 信託資金集合管理運用帳戶信託管理說明書 12
    term13: false, // 金錢信託開戶及各項務務約定書 13
  };
  allChecked = false; // 全部已讀
  termData: any; // 條款資訊 spec11040107
  // 顯示條款內容(標題)
  contentData = {
    self: 'FUND_INVEST.TERM.TITLE.SELF', // 基金公開說明書 01
    signAgr: 'FUND_INVEST.TERM.TITLE.SIGN_AGR', // 基金各級別近五年費用率及報酬率揭露聲明書 02
    term4: 'FUND_INVEST.TERM.TITLE.TERM4', // 高收益配息風險預告書 04
    fee: 'FUND_INVEST.TERM.TITLE.FEE', // 銷售基金通路報酬揭露表 06
    usaSignNote: 'FUND_INVEST.TERM.TITLE.USA_SIGNNOTE', // 美國註冊基金注意事項 07  
    hanYa: 'FUND_INVEST.TERM.TITLE.HAN_YAN', // 瀚亞基金(已廢除) 08
    bShare: 'FUND_INVEST.TERM.TITLE.TERM9', // 後收型基金風險預告書 09
    term10: 'FUND_INVEST.TERM.TITLE.TERM10', // 境外基金手續費後收集別費用說明書 10
    term11: 'FUND_INVEST.TERM.TITLE.TERM11', // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種) 11 
    term12: 'FUND_INVEST.TERM.TITLE.TERM12', // 信託資金集合管理運用帳戶信託管理說明書 12
    term13: 'FUND_INVEST.TERM.TITLE.TERM13' // 金錢信託開戶及各項務務約定書 13
  };
  reqData = {
    fundCompId: '',
    fundCode: '',
    fundName: '',
    fundCcy: '',
    investAccount: '',
    investMoney: '',
    investType: '',
    investDate: '',
    hasProfit: '',
    profitAccountID: '', // 配息帳號
    avlBalance: '',
    accountCcy: '', // 帳號幣別
    investCcyType: '', // 投資幣別, '1':以台幣投資, '2':以外幣投資
    termData: {
      self: '', // 1.委託人已取得 2.委託人自行至受託人網站或境外基金資訊觀測站
      signAgr: '', // 同意簽署約定書
      term4: '', // A條款
      termB: '', // B條款
      termC: '', // C條款
      fee: '', // 通路服務費
      usaSignNote: '', // 同意簽署美國註冊基金 
      hanYa: '', // 瀚亞基金 
      typeInd: ''
    }
  };
  // 錯誤訊息
  errorMsg = {
    self: '', // 基金公開說明書 01
    signAgr: '', // 基金各級別近五年費用率及報酬率揭露聲明書 02
    term4: '', // 高收益配息風險預告書 04
    fee: '', // 銷售基金通路報酬揭露表 06
    bShare: '', // 後收型基金風險預告書 09
    term10: '', // 境外基金手續費後收集別費用說明書 10
    term11: '', // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種) 11
    term12: '', // 信託資金集合管理運用帳戶信託管理說明書 12
    term13: '', // 金錢信託開戶及各項務務約定書 13
    usaSignNote: '', // 美國註冊基金注意事項 07
  };
  signDate_usa = ''; // 美國註冊基金 同意日期(若有填寫過帶入條款日期顯示)

  constructor(
    private _mainService: FundInvestService,
    private _logger: Logger,
    private _formateServcie: FormateService,
    private _headerCtrl: HeaderCtrlService,
    private confirm: ConfirmService,
    private _handleError: HandleErrorService,
    private navgator: NavgatorService,
    private termpopupService: TermPopupService,
    private _cacheService: CacheService,
    private _investService: FundInvestService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this._logger.log("into InvestTermComponent, nextData:", this.nextData);
    this._logger.log("into InvestTermComponent, type:", this.type);
    this._initEvent();
  }

  // 初始化事件
  private _initEvent() {
    // 設定左側返回
    this._headerCtrl.setLeftBtnClick(() => {
      this.onBack();
    });
    this.removeAllCache(); // 沒次近來都先清除cache
    if (this.type == 'go') {
      this._logger.log("type go");
      this.getTermData(this.nextData);
    } else {
      this._logger.log("type back");
      this.setBackData(); // 做返回相關處理
    }
  }

  /**
   * 點擊 下一步
   */
  onNext() {
    this._logger.log("into onNext");
    // 檢核條款是否都勾選
    let checkTerm = this._mainService.checkTermData(this.checkedData, this.sortedTerm);
    // 檢核失敗
    if (!checkTerm.status) {
      this._handleError.handleError({
        title: 'POPUP.ALERT.TITLE',
        content: checkTerm.msg,
        backType: 'dialog'
      });
      this.errorMsg = {
        self: checkTerm.errorList.self, // 基金公開說明書 01
        signAgr: checkTerm.errorList.signAgr, // 基金各級別近五年費用率及報酬率揭露聲明書 02
        term4: checkTerm.errorList.term4, // 高收益配息風險預告書 04
        fee: checkTerm.errorList.fee, // 銷售基金通路報酬揭露表 06
        bShare: checkTerm.errorList.bShare, // 後收型基金風險預告書 09
        term10: checkTerm.errorList.term10, // 境外基金手續費後收集別費用說明書 10
        term11: checkTerm.errorList.term11, // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種) 11
        term12: checkTerm.errorList.term12, // 信託資金集合管理運用帳戶信託管理說明書 12
        term13: checkTerm.errorList.term13, // 金錢信託開戶及各項務務約定書 13
        usaSignNote: checkTerm.errorList.usaSignNote // 同意簽署美國註冊基金
      };
      this._logger.log("check failed");
      return false
    } else {
      // 成功清空error訊息
      this.errorMsg = {
        self: '', // 基金公開說明書 01
        signAgr: '', // 基金各級別近五年費用率及報酬率揭露聲明書 02
        term4: '', // 高收益配息風險預告書 04
        fee: '', // 銷售基金通路報酬揭露表 06
        bShare: '', // 後收型基金風險預告書 09
        term10: '', // 境外基金手續費後收集別費用說明書 10
        term11: '', // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種) 11
        term12: '', // 信託資金集合管理運用帳戶信託管理說明書 12
        term13: '', // 金錢信託開戶及各項務務約定書 13
        usaSignNote: '' // 同意簽署美國註冊基金
      };
      // 暫存那些條款需顯示
      this._mainService.setTermSaveData(this.termData);
      // 暫存條款資訊勾選
      this._mainService.setTermChecked(this.checkedData, this.allChecked);
      this._logger.log("check success ready go confirmPage");
      this.doReqData(this.checkedData); // 組裝request
      // 前往下一頁前再確認一次是否做過kyc(防呆)
      let kycStatus = this.checkKyc();
      if (kycStatus.status == true) {
        this.onBackPageEvent('term', 'go', this.reqData);
      }
    }
  }

  /**
   * 回上一步(左側返回)
   */
  onBack() {
    this.onBackPageEvent('invest-term', 'back', this.nextData);
  }

  /**
   * 取消
   */
  onCancel() {
    this._logger.log("into onCancel");
    this.onBackPageEvent('invest-term', 'home', {});
  }

  /**
   * 勾選條款
   * @param type 條款類型:
   * @param must 強制勾選(從視窗點擊確定) 'mustChecked 強制勾, 'mustNotChecked' 強制不勾
   * '1': 公開說明書
   * '2': 基金各級別近五年費用率及報酬率揭露聲明書)
   * '4': 高收益配息風險預告書
   * '6': 銷售基金通路報酬揭露表
   * '7': 美國註冊基金注意事項
   * '8': 瀚亞基金 （已廢除）
   * '9': 後收型風險預告書
   * '10': 境外基金手續費後收集別費用說明書
   * '11': 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種)
   * '12': 信託資金集合管理運用帳戶信託管理說明書
   * '13': 金錢信託開戶及各項務務約定書
   * 'all': 全部已讀
   */
  onCheckedTerm(type, must?) {
    switch (type) {
      // 基金公開說明書
      case '1':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.self = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.self = false;
        } else if (this.checkedData.self == false) {
          this.checkedData.self = true;
        } else {
          this.checkedData.self = false;
        }
        break;
      // 基金各級別近五年費用率及報酬率揭露聲明書
      case '2':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.signAgr = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.signAgr = false;
        } else if (this.checkedData.signAgr == false) {
          this.checkedData.signAgr = true;
        } else {
          this.checkedData.signAgr = false;
        }
        break;
      // 高收益配息風險預告書
      case '4':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.term4 = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.term4 = false;
        } else if (this.checkedData.term4 == false) {
          this.checkedData.term4 = true;
        } else {
          this.checkedData.term4 = false;
        }
        break;
      // 銷售基金通路報酬揭露表
      case '6':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.fee = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.fee = false;
        } else if (this.checkedData.fee == false) {
          this.checkedData.fee = true;
        } else {
          this.checkedData.fee = false;
        }
        break;
      // 美國註冊基金注意事項
      case '7':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.usaSignNote = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.usaSignNote = false;
        } else if (this.checkedData.usaSignNote == false) {
          this.checkedData.usaSignNote = true;
        } else {
          this.checkedData.usaSignNote = false;
        }
        break;
      // 瀚亞基金 （已廢除）
      case '8':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.hanYa = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.hanYa = false;
        } else if (this.checkedData.hanYa == false) {
          this.checkedData.hanYa = true;
        } else {
          this.checkedData.hanYa = false;
        }
        break;
      // 後收型風險預告書
      case '9':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.bShare = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.bShare = false;
        } else if (this.checkedData.bShare == false) {
          this.checkedData.bShare = true;
        } else {
          this.checkedData.bShare = false;
        }
        break;
      // 境外基金手續費後收集別費用說明書
      case '10':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.term10 = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.term10 = false;
        } else if (this.checkedData.term10 == false) {
          this.checkedData.term10 = true;
        } else {
          this.checkedData.term10 = false;
        }
        break;
      // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種)
      case '11':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.term11 = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.term11 = false;
        } else if (this.checkedData.term11 == false) {
          this.checkedData.term11 = true;
        } else {
          this.checkedData.term11 = false;
        }
        break;
      // 信託資金集合管理運用帳戶信託管理說明書
      case '12':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.term12 = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.term12 = false;
        } else if (this.checkedData.term12 == false) {
          this.checkedData.term12 = true;
        } else {
          this.checkedData.term12 = false;
        }
        break;
      // 金錢信託開戶及各項務務約定書
      case '13':
        if (must == 'mustChecked') { // 視窗確定勾選
          this.checkedData.term13 = true;
        } else if (must == 'mustNotChecked') { // 視窗確定取消勾選
          this.checkedData.term13 = false;
        } else if (this.checkedData.term13 == false) {
          this.checkedData.term13 = true;
        } else {
          this.checkedData.term13 = false;
        }
        break;
      // 全部已讀
      case 'all':
        if (this.allChecked == false) {
          this.allChecked = true;
          this.checkedData.self = true;
          this.checkedData.signAgr = true;
          this.checkedData.term4 = true;
          this.checkedData.fee = true;
          this.checkedData.usaSignNote = true;
          this.checkedData.hanYa = true;
          this.checkedData.bShare = true;
          this.checkedData.term10 = true;
          this.checkedData.term11 = true;
          this.checkedData.term12 = true;
          this.checkedData.term13 = true;
        } else {
          this.allChecked = false;
          this.checkedData.self = false;
          this.checkedData.signAgr = false;
          this.checkedData.term4 = false;
          this.checkedData.fee = false;
          this.checkedData.usaSignNote = false;
          this.checkedData.hanYa = false;
          this.checkedData.bShare = false;
          this.checkedData.term10 = false;
          this.checkedData.term11 = false;
          this.checkedData.term12 = false;
          this.checkedData.term13 = false;
        }
    }
  }

  /**
   * 點擊條款title, alert條款內容
   * @param type 條款類型:
   * '1': 公開說明書
   * '2': 基金各級別近五年費用率及報酬率揭露聲明書)
   * '4': 高收益配息風險預告書
   * '6': 銷售基金通路報酬揭露表
   * '7': 美國註冊基金注意事項
   * '8': 瀚亞基金 （已廢除）
   * '9': 後收型風險預告書
   * '10': 境外基金手續費後收集別費用說明書
   * '11': 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種)
   * '12': 信託資金集合管理運用帳戶信託管理說明書
   * '13': 金錢信託開戶及各項務務約定書
   */
  onShowContent(type) {
    let noteData = {
      title: '',
      content: '',
      type: '', // 類別, 用於判斷需不需要發api取得資料, EX: '1' 公開說明書(不發api)
      reqType: [] // request 條款api類別, EX: Fund_Terms04_A 高收益配息風險預告書-A
    };
    let checkedType = type;
    let usaSignNote = this._formateServcie.checkField(this.termData, 'usaSignNote');
    let infoData = this._formateServcie.checkField(this.nextData, 'reqData');
    let fundCode = this._formateServcie.checkField(infoData, 'fundCode');
    switch (type) {
      case '1':
        noteData.title = this.contentData.self;
        this.translate.get('FUND_INVEST.TERM.CONTENT.SELF', {
          fundCode: fundCode // 塞入基金標的至i18n字串取代
        }).subscribe((i18nval) => {
          noteData.content = i18nval; // 公開說明書 01
        });
        noteData.type = '1';
        break;
      case '2':
        noteData.title = this.contentData.signAgr;
        noteData.content = 'FUND_INVEST.TERM.CONTENT.ENOUGH_LEARN_MSG'; // 基金各級別近五年費用率及報酬率揭露聲明書 02
        noteData.type = '2';
        break;
      case '4':
        noteData.title = this.contentData.term4;
        noteData.content = 'FUND_INVEST.TERM.CONTENT.TERM4'; // 高收益配息風險預告書 04
        noteData.type = '4';
        noteData.reqType = this.doTermABC(); // 處理塞入abc條款array, 一次取得 
        break;
      case '6':
        noteData.title = this.contentData.fee;
        let feeHtml = this._formateServcie.checkField(this.termData, 'feeHtml');
        noteData.content = feeHtml; // 銷售基金通路報酬揭露表 06
        noteData.type = '6';
        break;
      case '7':
        // 美國註冊基金注意事項 07
        noteData.title = this.contentData.usaSignNote;
        if (usaSignNote == 'N') {
          noteData.content = 'FUND_INVEST.TERM.CONTENT.AMERICA_FUND_MSG'; // 未簽署過條款
        } else {
          this.translate.get('FUND_INVEST.TERM.CONTENT.AMERICA_FUND_MSG_1', { // 簽署過帶入同意日期顯示
            signDate: this.signDate_usa // 塞入基金標的至i18n字串取代
          }).subscribe((i18nval) => {
            noteData.content = i18nval; // 公開說明書 01
          });
        }
        noteData.type = '7';
        break;
      case '8':
        noteData.title = this.contentData.hanYa;
        noteData.content = 'FUND_INVEST.TERM.CONTENT.HANYA_FUND_MSG'; // 瀚亞基金 （已廢除） 08
        noteData.type = '8';
        break;
      case '9':
        noteData.title = this.contentData.bShare;
        // content內容 發api取得
        noteData.type = '9'; // 後收型風險預告書 09
        noteData.reqType.push('Fund_Terms09');
        break;
      case '10':
        noteData.title = this.contentData.term10;
        // content內容 發api取得
        noteData.type = '10'; // 境外基金手續費後收集別費用說明書 10
        noteData.reqType.push('Fund_Terms10');
        this.termPdf(noteData['reqType'], type);
        break;
      case '11':
        noteData.title = this.contentData.term11;
        // content內容 發api取得
        noteData.type = '11'; // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種版本) 11
        noteData.reqType.push('Fund_Terms11');
        break;
      case '12':
        noteData.title = this.contentData.term12;
        // content內容 發api取得
        noteData.type = '12'; // 上海商業儲蓄銀行信託資金集合管理運用帳戶信託管理說明書 12
        noteData.reqType.push('Fund_Terms12');
        break;
      case '13':
        noteData.title = this.contentData.term13;
        // content內容 發api取得
        noteData.type = '13'; // 金錢信託開戶及各項務務約定書 13
        noteData.reqType.push('Fund_Terms13');
        this.termPdf(noteData['reqType'], type);
        break;
      default:
        this._logger.log("has not data");
        break;
    }
    // 若不是需要外連,顯示popup
    // 10: 境外基金手續費後收集別費用說明書, 13: 金錢信託開戶及各項務務約定書
    if (type != '10' && type != '13') {
      this.termpopupService.show(noteData).then(
        (result) => {
          // 若為條款pdf直接外連
          if (typeof result == 'string' && result == 'isPdf') {
            this._logger.log("to do pdf webUrl");
          }
          this.onCheckedTerm(checkedType, result);
        },
        (cancel) => {
          if (cancel == 'mustNotChecked') {
            this.onCheckedTerm(checkedType, cancel);
          }
        }
      );
    }
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

  /**
   * 取得條款資料
   * @param setData 請求資料
   */
  private getTermData(setData) {
    this._mainService.getTermData(setData).then(
      (result) => {
        this._logger.log("into getTermData, result:", result);
        this.termData = result.infoData;
        this.signDate_usa = this._formateServcie.checkField(this.termData, 'signDate');
        let kycCheck = this.checkKyc(); // 判斷是否做過kyc
        // 判斷那些條款需顯示
        if (!!kycCheck['status']) {
          let doSortedTerm = this.doSortedTerm(this.termData);
          this._logger.log("doSortedTerm:", doSortedTerm);
          this.sortedTerm.term4 = doSortedTerm.riskDisclosure;
          this.sortedTerm.usaSignNote = doSortedTerm.usaSignNote;
          this.sortedTerm.showNotifiCation = doSortedTerm.showNotifiCation;
          this.sortedTerm.bShare = doSortedTerm.bShare;
          this.sortedTerm.term10 = doSortedTerm.term10;
          this.sortedTerm.term11 = doSortedTerm.term11;
          this.sortedTerm.term12 = doSortedTerm.term12;
          this.sortedTerm.term13 = doSortedTerm.term13;
          this.hasTerm = true; // 顯示條款資訊
          this.nowPage = 'term';
        }
      },
      (errorObj) => {
        this._logger.log("into getTermData, errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.errorBoxMsg = errorObj.content;
        this.nowPage = 'errorBox'; // 錯誤頁面
      }
    );
  }

  /**
   * 判斷A,B,C條款那些要顯示
   * 不需拆開判斷了 2020/11/15已改為全部顯示於一條
   * @param setData 
   */
  private doSortedTerm(setData) {
    let output = {
      bShare: false, // 後收型基金
      riskDisclosure: false,
      usaSignNote: false, // 美國註冊
      showNotifiCation: false, // 瀚亞基金
      term10: false, // 境外基金手續費後收級別費用結構聲明書
      term11: false, // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種）
      term12: false, // 信託資金集合管理運用帳戶信託管理說明書
      term13: false, // 金錢信託開戶及各項務務約定書
    };
    let riskDisclosure = this._formateServcie.checkField(setData, 'riskDisclosure');
    let usaSignNote = this._formateServcie.checkField(setData, 'usaSignNote');
    let showNotifiCation = this._formateServcie.checkField(setData, 'showNotifiCation');
    let bShare = this._formateServcie.checkField(setData, 'bShare');
    let term10 = this._formateServcie.checkField(setData, 'term10');
    let term11 = this._formateServcie.checkField(setData, 'term11');
    let term12 = this._formateServcie.checkField(setData, 'term12');
    let term13 = this._formateServcie.checkField(setData, 'term13');
    if (riskDisclosure != '' && typeof riskDisclosure != 'undefined') {
      output.riskDisclosure = true;
    } else {
      output.riskDisclosure = false;
    }
    // if (bShare != '' && typeof bShare != 'undefined') {
    //   output.bShare = true;
    // } else {
    //   output.bShare = false;
    // }
    output.bShare = bShare == 'Y' ? true : false;
    // output.usaSignNote = usaSignNote == 'Y' ? false : true;
    // 美國註冊 'Y': 顯示訊息1, 'N': 顯示訊息2
    if (usaSignNote == 'Y' || usaSignNote == 'N') {
      output.usaSignNote = true;
      // 空值不顯示 
    } else {
      output.usaSignNote = false;
    }
    output.showNotifiCation = showNotifiCation == 'Y' ? true : false;
    output.term10 = term10 == 'Y' ? true : false;
    output.term11 = term11 == 'Y' ? true : false;
    output.term12 = term12 == 'Y' ? true : false;
    output.term13 = term13 == 'Y' ? true : false;
    return output;
  }

  /**
   * 處理request資料
   * @param reqData 請求
   * @param termData 條款
   */
  private doReqData(termData) {
    this._logger.log("into doReqData, termData:", termData);
    this._logger.log("doReqData, nextData:", this.nextData);
    let req = this._formateServcie.checkField(this.nextData, 'reqData');
    this.reqData = {
      fundCompId: req['fundCompId'],
      fundCode: req['fundCode'],
      fundName: req['fundName'],
      fundCcy: req['fundCcy'],
      investAccount: req['investAccount'],
      investMoney: req['investMoney'],
      investType: this.nextData['investType'],
      investDate: this.nextData['investType'] == 'single' ? '' : req['investDate'],
      hasProfit: req['hasProfit'],
      profitAccountID: req['profitAccountID'],
      avlBalance: req['avlBalance'],
      accountCcy: req['accountCcy'],
      investCcyType: req['investCcyType'],
      termData: {
        self: '2', // '1': 受託人, '2':境外觀測站 (公開說明書固定帶:'2')
        signAgr: termData['signAgr'] == true ? 'Y' : 'N', // '1': 同意, '2': 不同意
        term4: termData['term4'] == true ? 'Y' : 'N',  // '1': 同意, '2': 不同意
        termB: termData['termB'] == true ? 'Y' : 'N',  // '1': 同意, '2': 不同意
        termC: termData['termC'] == true ? 'Y' : 'N',  // '1': 同意, '2': 不同意
        fee: termData['fee'] == true ? 'Y' : 'N',  // '1': 同意, '2': 不同意
        usaSignNote: termData['usaSignNote'] == true ? 'Y' : 'N',  // '1': 同意, '2': 不同意
        hanYa: termData['hanYa'] == true ? 'Y' : 'N',  // '1': 同意, '2': 不同意
        typeInd: this.termData['typeInd']
      }
    };
    this._logger.log("doReqData, this.reqData:", this.reqData);
  }

  /**
   * 將返回資料帶入畫面上
   */
  private setBackData() {
    this._logger.log("into setBackData");
    // 判斷申購方式
    let investType = this._formateServcie.checkField(this.nextData, 'investType');
    let setObj = investType == 'single' ? this._mainService.getSingleEdit() : this._mainService.getRegularEdit();
    let showData = this._mainService.getTermSaveData(); // 取得顯示那些條款
    let temp = {
      reqData: {},
      termData: {}, // 條款相關
      investType: '' // 申購類型
    };
    // request值帶入
    temp['reqData']['fundCode'] = this._formateServcie.checkField(setObj, 'fundCode');
    temp['reqData']['fundName'] = this._formateServcie.checkField(setObj, 'fundName');
    temp['reqData']['fundCcy'] = this._formateServcie.checkField(setObj, 'fundCcy');
    temp['reqData']['fundCompId'] = this._formateServcie.checkField(setObj, 'fundCompId');
    temp['reqData']['investAccount'] = this._formateServcie.checkField(setObj, 'investAccount');
    temp['reqData']['investMoney'] = this._formateServcie.checkField(setObj, 'investMoney');
    temp['reqData']['profitAccount'] = this._formateServcie.checkField(setObj, 'profitAccount');
    temp['reqData']['investDate'] = this._formateServcie.checkField(setObj, 'investDate');
    temp['investType'] = this._formateServcie.checkField(setObj, 'investType');
    temp['reqData']['hasProfit'] = this._formateServcie.checkField(setObj, 'hasProfit');
    temp['termData'] = showData;
    temp['termData']['typeInd'] = this._formateServcie.checkField(showData, 'typeInd');
    temp['reqData']['avlBalance'] = this._formateServcie.checkField(setObj, 'avlBalance');
    temp['reqData']['accountCcy'] = this._formateServcie.checkField(setObj, 'accountCcy');
    temp['reqData']['profitAccountID'] = this._formateServcie.checkField(setObj, 'profitAccountID');
    this.nextData = temp;
    // 判斷那些條款需顯示
    let doSortedTerm = this.doSortedTerm(showData);
    this._logger.log("doSortedTerm:", doSortedTerm);
    this.sortedTerm.term4 = doSortedTerm.riskDisclosure;
    this.sortedTerm.usaSignNote = doSortedTerm.usaSignNote;
    this.sortedTerm.showNotifiCation = doSortedTerm.showNotifiCation;
    this.sortedTerm.bShare = doSortedTerm.bShare;
    this.sortedTerm.term10 = doSortedTerm.term10;
    this.sortedTerm.term11 = doSortedTerm.term11;
    this.sortedTerm.term12 = doSortedTerm.term12;
    this.sortedTerm.term13 = doSortedTerm.term13;
    // 將畫面須勾選的打勾
    let checkedStatus = this._mainService.getTermChecked();
    this.checkedData = {
      self: this._formateServcie.checkObjectList(checkedStatus, 'self'), // 基金公開說明書
      signAgr: this._formateServcie.checkObjectList(checkedStatus, 'signAgr'), // 基金各級別近五年費用率及報酬率揭露聲明書
      term4: this._formateServcie.checkObjectList(checkedStatus, 'term4'), // 高收益配息風險預告書
      fee: this._formateServcie.checkObjectList(checkedStatus, 'fee'), // 銷售基金通路報酬揭露表
      usaSignNote: this._formateServcie.checkObjectList(checkedStatus, 'usaSignNote'), // 美國註冊基金
      hanYa: this._formateServcie.checkObjectList(checkedStatus, 'hanYa'), // 瀚亞
      bShare: this._formateServcie.checkObjectList(checkedStatus, 'bShare'), // 後收型基金風險預告書
      term10: this._formateServcie.checkObjectList(checkedStatus, 'term10'), // 境外基金手續費後收集別費用說明書
      term11: this._formateServcie.checkObjectList(checkedStatus, 'term11'), // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種)
      term12: this._formateServcie.checkObjectList(checkedStatus, 'term12'), // 信託資金集合管理運用帳戶信託管理說明書
      term13: this._formateServcie.checkObjectList(checkedStatus, 'term13') // 金錢信託開戶及各項務務約定書
    };
    this.allChecked = this._formateServcie.checkObjectList(checkedStatus, 'allChecked'); // 全部勾選
    this.termData = showData; // 帶入條款資料
    this.nowPage = 'term'; // 顯示條款頁面
    this.hasTerm = true; // 已取得條款
  }

  /**
   * 檢查是否做過kyc測驗
   */
  private checkKyc() {
    // 有進來代表不可繼續往後做申購流程
    let output = {
      status: false
    };
    // 判斷是否做過kyc
    let hasKyc = this._formateServcie.checkField(this.termData, 'kyc');
    if (hasKyc == 'N') {
      this.errorBoxMsg = 'FUND_INVEST.NOTE.HAS_NOTDO_KYC';
      this.hasTerm = false;
      this.nowPage = 'errorBox'; // 錯誤頁面
      this.confirm.show('FUND_INVEST.NOTE.HAS_NOTDO_KYC', {
        title: 'FUND_INVEST.NOTE.REMIND_TITLE',
      }).then(
        (check) => {
          this.navgator.push('fund-kyc'); // 未做過kyc導到外連
          return output;
        },
        (cancel) => {
          return output;
        });
    } else {
      output.status = true;
    }
    return output
  }

  private doTermABC() {
    let output = [];
    let riskDisclosure = this._formateServcie.checkField(this.termData, 'riskDisclosure');
    let temp = riskDisclosure.split('+');
    temp.forEach(item => {
      switch (item) {
        case 'A':
          output.push('Fund_Terms04_A');
          break;
        case 'B':
          output.push('Fund_Terms04_B');
          break;
        case 'C':
          output.push('Fund_Terms04_C');
          break;
        default:
          this._logger.log("term not ABC error");
      }
    });
    return output;
  }

  /**
   * 刪除cache
   * @param type 指定刪除類別
   *  deposit-demand: 活存
   *  alldetail: 所有明細
   * @param acctObj 指定刪除明細
   *  iron 指定刪除單一明細
   */
  removeAllCache(type?: string, acctObj?: object) {
    if (typeof type == 'undefined') {
      type = 'invest-term-html';
    }
    this._cacheService.removeGroup(type);
  }

  // 若為金錢信託開戶條款(13) , 境外基金手續費後收集別費用說明書(10)
  // 不跳popup, 直接另開pdf, 不進入
  private termPdf(setData, type) {
    let reqData = {
      termId: setData
    };
    this._investService.getTermHtml(reqData, {}).then(
      (result) => {
        this._logger.log("termPdf, result:", result);
        let rowData = this._formateServcie.checkField(result['infoData'], 'rowData');
        let termContent = type == '13' ? 'FUND_INVEST.TERM.MSG.TERM13' : 'FUND_INVEST.TERM.MSG.TERM10';
        let paramUrl = this._formateServcie.checkField(rowData[0], 'terms');
        this._logger.log("termPdf, paramUrl:", paramUrl);
        this.onCheckedTerm(type);
        this.confirm.show(termContent, { btnYesTitle: 'FUND_INVEST.TERM.BTN.GO_NOW' }).then(
          (confirm) => {
            if (type == '13') {
              this.checkedData.term13 = true;
            } else {
              this.checkedData.term10 = true;
            }
            this.navgator.push(paramUrl);
          },
          (cancel) => {
            // 使用者取消
            if (type == '13') {
              this.checkedData.term13 = false;
            } else {
              this.checkedData.term10 = false;
            }
          }
        );
      },
      (errorObj) => {
        this._logger.log("termPdf, errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.checkedData.term13 = false;
      }
    );
  }
}
