/**
 * 定期定額-編輯頁
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FundInvestService } from '@pages/fund/shared/fund-invest.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { FundAcctPopupService } from '@template/list/fund-acct-popup/fund-acct-popup.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { DateSelectService } from '@template/list/date-select-popup/date-select.service';

@Component({
  selector: 'app-regular-invest-edit',
  templateUrl: './regular-invest-edit.component.html',
  styleUrls: []
})

export class RegularInvestEditComponent implements OnInit {
  @Input() type: string; // 父層傳入,判斷 go or back
  @Input() currencyType: string; // 判斷台,外幣(發送不同api)
  @Input() setData: any; // 主層傳入之基金標的資訊
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  errorBoxMsg = ''; // 錯誤訊息
  nowPage = ''; // 目前頁面 'edit': 編輯頁, 'errorBox': 錯誤頁面
  investType = 'regular'; // 申購方式 
  hasAcct = false; // 是否取得帳號,餘額資料
  infoData: any;
  acctData: any; // 扣款帳號清單
  profitData: any; // 配息帳號清單
  nowStep = 'edit'; // 當前步驟
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
  // 送交易使用
  reqData = {
    fundCode: '', // 基金代碼
    fundName: '', // 基金名稱 
    fundCcy: '', // 基金幣別
    fundCompId: '', // 公司代號
    investAccount: '', // 扣款帳號
    investMoney: '', // 投資金額
    investDate: '', // 每月投資日期
    hasProfit: '', // 配息與否 (結果頁api需帶入)
    profitAccountID: '', // 配息帳號
    avlBalance: '', // 餘額
    accountCcy: '', // 帳號幣別
    investCcyType: '' // 投資幣別, '1':以台幣投資, '2':以外幣投資
  };
  // termData: any; // 條款相關註記
  // ---------- 畫面顯示相關 ----------
  showData = {
    accountID: '', // 扣款帳號
    avlBalance: '', // 可用餘額
    fundEngCcy: '', // 投資幣別
    investMoney: '', // 投資金額
    profitAcct: '', // 配息帳號
    investDate: '', // 每月投資日期
    showDate: '', // 投資日期 formate顯示使用, EX: 每月2,12,15日
    limitMaxAmt: '', // 最高投資金額
    limitMinAmt: '' // 最低投資金額
  };
  // 給popoup顯示資訊(扣款帳號)
  acctOption = {
    data: [],
    select: '',
    type: '1', // '1':申購, '2':贖回, '3':轉換
    currency: '', // 幣別
    special: false // 是否需判斷幣別
  };
  // 給popup顯示資訊(配息帳號)
  profitOption = {
    data: [],
    select: '',
    type: '1', // '1':申購, '2':贖回, '3':轉換
    special: false // 是否需判斷幣別, 配息帳號固定為false不判斷
  };
  // 給popup顯示資訊(扣款日期)
  dateOption = {
    title: '',
    dateType: '1', // '1': 每月, '2': 每周
    dateArr: []
  };
  showProfit = false; // 是否顯示配息帳號
  // 錯誤訊息顯示
  errorMsg = {
    investAccount: '', // 扣款帳號
    investMoney: '', // 投資金額
    profitAccount: '', // 配息入帳帳號
    investDate: '' // 投資日期
  };
  acctCcy = ''; // 帳號幣別

  constructor(
    private _mainService: FundInvestService,
    private _logger: Logger,
    private _headerCtrl: HeaderCtrlService,
    private _formateServcie: FormateService,
    private fundPopupService: FundAcctPopupService,
    private _handleError: HandleErrorService,
    private dateSelectService: DateSelectService
  ) { }

  ngOnInit() {
    this._logger.log("into RegularInvestEditComponent, type:", this.type);
    this._logger.log("into RegularInvestEditComponent, setData:", this.setData);
    this._initEvent();
  }

  // 初始化事件
  private _initEvent() {
    // 設定左側返回
    this._headerCtrl.setLeftBtnClick(() => {
      this.onBack();
    });
    this.showData.fundEngCcy = this.setData['fundCcy'];
    // 若為 主頁 => 編輯頁 (go)
    if (this.type == 'go') {
      this.getFundAcctData(); //取得編輯頁帳號,餘額資訊
      // 若為 條款頁 => 編輯頁 (back)
    } else {
      this.setBackData(); // 返回取得暫存資料
    }

  }

  /**
   * 回上一步(左側返回)
   */
  onBack() {
    this.onBackPageEvent('regular-edit', 'back', {});
  }

  /**
   * 點擊 下一步
   */
  onNext() {
    this._logger.log("onNext");
    this.reqData = {
      fundCode: this.setData.fundCode, // 基金代碼
      fundName: this.setData.fundName, // 基金名稱 
      fundCcy: this.setData.fundCcy, // 基金幣別
      fundCompId: this.setData.fundCompID,
      investAccount: this.showData.accountID, // 扣款帳號
      investMoney: this.showData.investMoney, // 投資金額
      investDate: this.showData.investDate, // 每月投資日期
      hasProfit: this.setData.hasProfit,
      profitAccountID: this.showData.profitAcct != '' ? this.showData.profitAcct : '', // 配息入帳帳號
      avlBalance: this.showData.avlBalance,
      accountCcy: this.acctCcy,
      investCcyType: this.currencyType == 'twd' ? '1' : '2'
    };
    // 暫存資料
    let setObj = {
      fundCode: this.setData.fundCode,
      fundName: this.setData.fundName,
      fundCcy: this.setData.fundCcy,
      fundCompId: this.setData.fundCompID,
      investAccount: this.showData.accountID,
      investMoney: this.showData.investMoney,
      investDate: this.showData.investDate,
      showDate: this.showData.showDate,
      avlBalance: this.showData.avlBalance,
      limitMaxAmt: this.showData.limitMaxAmt,
      limitMinAmt: this.showData.limitMinAmt,
      accountCcy: this.acctCcy,
      investType: this.investType,
      acctData: this.acctData, // 扣款帳號
      profitData: this.profitData, // 配息帳號
      hasProfit: this.setData.hasProfit,
      profitAccountID: this.showData.profitAcct != '' ? this.showData.profitAcct : '',
      investCcyType: this.currencyType == 'twd' ? '1' : '2'
    };
    this._mainService.setRegularEdit(setObj); // 將畫面資料暫存
    this._logger.log("onNext, reqData.investDate:", this.reqData.investDate);
    // 檢核先關閉
    let checkData = this._mainService.checkData(this.reqData,
      {
        type: 'edit',
        limitMaxAmt: this.showData['limitMaxAmt'],
        limitMinAmt: this.showData['limitMinAmt'],
        fundCcy: this.showData['fundEngCcy'],
        investDate: this.showData['investDate'],
        avlBalance: this.showData['avlBalance']
      }, 'regular');
    // 檢核失敗
    if (checkData.status == false) {
      this._logger.log("checkData status false, checkData:", checkData);
      this.errorMsg.investAccount = checkData.error_list.investAccount;
      this.errorMsg.investMoney = checkData.error_list.investMoney;
      this.errorMsg.profitAccount = checkData.error_list.profitAccount;
      this.errorMsg.investDate = checkData.error_list.investDate;
      return false;
      // 檢核成功
    } else {
      this.errorMsg.investAccount = '';
      this.errorMsg.investMoney = '';
      this.errorMsg.profitAccount = '';
      this.errorMsg.investDate = '';
      // 組裝下一層需用到之資料
      let nextData = {
        reqData: {},
        // termData: {}, // 條款相關
        investType: this.investType // 申購類型
      };
      nextData.reqData = this.reqData;
      this._logger.log("onNext, nextData:", nextData);
      this.onBackPageEvent('invest-term', 'go', nextData);
    }
  }

  /**
   * 取消
   */
  onCancel() {
    this.onBackPageEvent('regular-edit', 'home', {});
  }

  /**
   * 選擇扣款帳號
   */
  onSelectAcct() {
    this._logger.log("into onSelectAcct, acctOption:", this.acctOption);
    this.fundPopupService.show(this.acctOption).then(
      (result) => {
        this._logger.log("onSelectAcct, result:", result);
        this.doAcctShow(this.acctData, '1', result);
      },
      (cancel) => {
        this._logger.log("into cancel");
      }
    );
  }

  /**
   * 選擇配息帳號
   */
  onSelectProfitAcct() {
    this._logger.log("into onSelectProfitAcct, profitOption:", this.profitOption);
    this.fundPopupService.show(this.profitOption).then(
      (result) => {
        this._logger.log("onSelectAcct, result:", result);
        this.doAcctShow(this.profitData, '2', result);
      },
      (cancel) => {
        this._logger.log("into cancel");
      }
    );
  }

  /**
   * 選擇扣款日期
   */
  onInvestDate() {
    this._logger.log("into onInvestDate, dateOption:", this.dateOption);
    this.dateSelectService.show(this.dateOption).then(
      (result) => {
        this._logger.log("onInvestDate, result:", result);
        let investDate = this._formateServcie.checkObjectList(result, 'data');
        let showDate = this._formateServcie.checkField(result, 'show');
        this.showData.investDate = investDate.join();
        this.showData.showDate = showDate;
        this.dateOption.dateArr = investDate; // 帶入下一次預設勾選日期
      },
      (cancel) => {
        this._logger.log("into cancel");
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

  // 取得編輯頁帳號,餘額資訊
  private getFundAcctData() {
    let reqData = {
      // fundCompID: this.setData['fundCompID'],
      fundCode: this.setData['fundCode'],
      fundCcy: this.setData['fundCcy'],
      hasProfit: this.setData['hasProfit']
    };
    this._logger.log("getFundAcctData, reqData:", reqData);
    // 單筆台幣-編輯 api
    if (this.currencyType == 'twd') {
      this._mainService.getReginTwdAcctData(reqData).then(
        (result) => {
          this._logger.log("getReginAcctData, result:", result);
          this.nowPage = 'edit'; // 顯示編輯頁
          this.infoData = result.infoData;
          this.acctData = result.data; // 扣款帳號清單
          this.showData.limitMaxAmt = this.infoData.limitMaxAmt;
          this.showData.limitMinAmt = this.infoData.limitMinAmt;
          this.hasAcct = true; // 取得帳號,餘額資料
          if (this.setData.hasProfit == 'Y') {
            this.showProfit = true; // 中台判定需顯示配息帳號
            this.profitData = result.profitData; // 配息帳號清單
            this.doAcctShow(this.profitData, '2'); // 處理配息帳號顯示
          }
          this.doAcctShow(this.acctData, '1'); // 處理扣款帳號顯示
        },
        (errorObj) => {
          this._logger.log("getReginAcctData, errorObj:", errorObj);
          this._handleError.handleError(errorObj);
          this.errorBoxMsg = errorObj.content;
          this.nowPage = 'errorBox'; // 錯誤頁面
        }
      );
      // 單筆外幣-編輯 api
    } else {
      this._mainService.getReginForeignAcctData(reqData).then(
        (result) => {
          this._logger.log("getSingleForeignAcctData, result:", result);
          this.nowPage = 'edit'; // 顯示編輯頁
          this.infoData = result.infoData;
          this.acctData = result.data; // 扣款帳號清單
          this.showData.limitMaxAmt = this.infoData.limitMaxAmt;
          this.showData.limitMinAmt = this.infoData.limitMinAmt;
          this.hasAcct = true; // 取得帳號,餘額資料
          if (this.setData.hasProfit == 'Y') {
            this.showProfit = true; // 中台判定需顯示配息帳號
            this.profitData = result.profitData; // 配息帳號清單
            this.doAcctShow(this.profitData, '2'); // 處理配息帳號顯示
          }
          this.doAcctShow(this.acctData, '1'); // 處理扣款帳號顯示  
        },
        (errorObj) => {
          this._logger.log("getSingleForeignAcctData, errorObj:", errorObj);
          this._handleError.handleError(errorObj);
          this.errorBoxMsg = errorObj.content;
          this.nowPage = 'errorBox'; // 錯誤頁面
        }
      );
    }
  }

  /**
   * 處理帳號顯示,popup相關
   * @param acctData 中台回傳之帳號清單
   * @param type 帳號種類, '1':扣款帳號 '2':配息帳號
   * @param select 上次選擇之帳號
   */
  private doAcctShow(acctData, type, select?) {
    // 帳號有資料才做整理
    if (acctData.length > 0) {
      let acctCcy = ''; // 回傳之帳號幣別
      // *若無選擇過帳號,預設第一筆(剛發完api時)
      if (typeof select == 'undefined') {
        this._logger.log("doAcctShow, select undefined");
        this._logger.log("doAcctShow, acctData:", acctData);
        // 扣款帳號 相關
        if (type == '1') {
          this.showData.accountID = acctData[0]['accountNO']; // 預設第一筆
          this.showData.avlBalance = acctData[0]['avlBalance'];
          if (typeof acctData[0]['fundEngCcy'] == 'undefined' ||
            acctData[0]['fundEngCcy'] == '') {
            acctCcy = 'TWD';
          } else {
            acctCcy = acctData[0]['fundEngCcy'];
          }
          this.showData.fundEngCcy = this.setData['fundCcy'];
          this.acctCcy = acctCcy;
          this.acctOption.select = this.showData.accountID + '' + acctCcy; // 紀錄選擇的那筆
          this.acctOption.data = acctData; // popup顯示清單
          this.acctOption.currency = this.showData.fundEngCcy; // 幣別欄位
          this.acctOption.special = true; // 扣款帳號需判斷幣別
          // 配息帳號 相關
        } else {
          this.showData.profitAcct = acctData[0]['accountNO']; // 預設第一筆
          this.profitOption.select = acctData[0]['accountNO']; // 紀錄選擇的那筆
          this.profitOption.data = acctData; // popup顯示清單
        }

        // *有選擇過帳號
      } else {
        // 扣款帳號 相關
        if (type == '1') {
          this.showData.accountID = select['accountNO'];
          this.showData.avlBalance = select['avlBalance'];
          if (typeof select['fundEngCcy'] == 'undefined' || select['fundEngCcy'] == '') {
            acctCcy = 'TWD';
          } else {
            acctCcy = select['fundEngCcy'];
          }
          this.showData.fundEngCcy = this.setData['fundCcy'];
          this.acctCcy = acctCcy;
          this.acctOption.select = this.showData.accountID + '' + acctCcy; // 記錄下次要顯示的帳號
          this.acctOption.special = true; // 扣款帳號需判斷幣別
          // 配息帳號 相關
        } else {
          this.showData.profitAcct = select['accountNO'];
          this.profitOption.select = select['accountNO']; // 記錄下次要顯示的帳號 
        }
      }
    }
  }

  /**
   * 將返回資料帶入畫面上
   */
  private setBackData() {
    this._logger.log("into setBackData");
    let setObj = this._mainService.getRegularEdit();
    let investAccount = this._formateServcie.checkField(setObj, 'investAccount');
    let investMoney = this._formateServcie.checkField(setObj, 'investMoney');
    let investDate = this._formateServcie.checkField(setObj, 'investDate');
    let showDate = this._formateServcie.checkField(setObj, 'showDate');
    let accountCcy = this._formateServcie.checkField(setObj, 'accountCcy');
    let avlBalance = this._formateServcie.checkField(setObj, 'avlBalance');
    let limitMinAmt = this._formateServcie.checkField(setObj, 'limitMinAmt');
    let limitMaxAmt = this._formateServcie.checkField(setObj, 'limitMaxAmt');
    let acctData = this._formateServcie.checkObjectList(setObj, 'acctData');
    let profitData = this._formateServcie.checkObjectList(setObj, 'profitData');
    let hasProfit = this._formateServcie.checkObjectList(setObj, 'hasProfit');
    let profitAccountID = this._formateServcie.checkField(setObj, 'profitAccountID');
    let fundCcy = this._formateServcie.checkField(setObj, 'fundCcy');
    let investCcyType = this._formateServcie.checkField(setObj, 'investCcyType');

    this.showData.accountID = investAccount; // 扣款帳號
    this.showData.investMoney = investMoney; // 扣款金額
    this.showData.investDate = investDate; // 扣款日期
    this.showData.showDate = showDate; // 投資日期 formate顯示使用, EX: 每月2,12,15日
    this.showData.fundEngCcy = fundCcy; // 幣別
    this.showData.avlBalance = avlBalance; // 餘額
    this.showData.limitMinAmt = limitMinAmt; // 最低金額
    this.showData.limitMaxAmt = limitMaxAmt; // 最高金額
    this.acctData = acctData; // 扣款帳號
    this.profitData = profitData; // 配息帳號
    this.reqData.hasProfit = hasProfit; // 配息與否
    this.showData.profitAcct = profitAccountID; // 配息帳號
    this.acctCcy = accountCcy; // 帳號幣別
    this.reqData.investCcyType = investCcyType; // 投資幣別, '1':以台幣投資, '2':以外幣投資

    // 判斷是否開啟顯示配息帳號
    this.showProfit = (profitAccountID != '' && typeof profitAccountID != 'undefined') ? true : false;
    // 將值帶入popup上顯示勾選
    this.acctOption.select = investAccount + '' + accountCcy; // 扣款帳號
    this.profitOption.select = profitAccountID; // 配息帳號
    this.acctOption.data = acctData; // 扣款帳號列表
    this.acctOption.special = true; // 扣款帳號需判斷幣別
    this.profitOption.data = profitData; // 配息帳號列表
    if (typeof investDate == 'string' && investDate.indexOf(',') > 0) {
      let dateArr = investDate.split(',');
      this.dateOption.dateArr = dateArr; // 帶入下一次預設勾選日期
    }
    this.nowPage = 'edit'; // 帶完資料後,顯示編輯頁
    this.hasAcct = true; // 下一頁返回, 代表有查詢成功過帳戶資料
    this._logger.log("nowPage:", this.nowPage);
  }
}
