/**
 * 單筆申購-確認-結果頁
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FundInvestService } from '@pages/fund/shared/fund-invest.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Component({
  selector: 'app-single-confirm-result',
  templateUrl: './single-confirm-result.component.html',
  styleUrls: []
})

export class SingleConfirmResultComponent implements OnInit {
  @Input() nextData: any; // 帶入確認頁 request
  @Input() type: string; // 父層傳入,判斷 go or back
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  nowPage = ''; // 目前頁面
  confirmData: any; // 確認頁資料(中台回傳)
  errorBoxMsg = ''; // 確認頁錯誤訊息
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
  nowStep = 'confirm'; // 當前步驟
  showData = {
    fundCodeShow: '', // 基金標的確認頁(整理過), 代號 + 名稱 
    fundCodeShowResult: ''  // 基金標的確認頁(整理過), 代號 + 名稱 
  };
  // 結果頁 request
  resultReq: any = {
    fundCompId: '',
    fundCode: '',
    fundName: '',
    fundCcy: '',
    investAccount: '',
    profitAccount: '',
    investMoney: '',
    fee: '',
    hasProfit: '',
    totalInvestMoney: '',
    limitAmt: '',
    termData: {
      self: '', // 委託人已取得
      signAgr: '', // 同意簽署約定書
      termA: '', // A條款
      termB: '', // B條款
      termC: '', // C條款
      fee: '', // 通路服務費
      usaSignNote: '', // 同意簽署美國註冊基金 
      hanYa: '', // 瀚亞基金 
      typeInd: ''
    }
  };
  resultData: any; // 結果頁資料(中台回傳)
  resStatus = false; // 交易結果 true: 成功
  statusObj = {}; // 交易結果Obj

  //------ 安控相關 ------
  // 安控設定檔
  setSecurity = {
    transServiceId: '', // 交易結果電文
    nameOfSecurity: 'FUNDINVEST', // 交易權限設定
    signText: {},
    inAccount: '', // 轉入帳號
    outAccount: '', // 轉出帳號
    currency: '', // 幣別
    amount: '', // 轉帳金額
  };
  setSecurityError: any = {}; // 安控錯誤變數
  // 控制安控送出的變數
  securityAction: any = { method: 'init' };
  // 目前安控方法的物件 { name: '手機確認碼認證', id: '2', checkList: [ 'otp'], inputValue: true  },
  securityObj: any; // 安控回傳物件
  showProfitAccount = false;

  constructor(
    private _mainService: FundInvestService,
    private _logger: Logger,
    private _formateServcie: FormateService,
    private _headerCtrl: HeaderCtrlService,
    private _handleError: HandleErrorService
  ) { }

  ngOnInit() {
    this._logger.log("into SingleConfirmResultComponent, type:", this.type);
    this._logger.log("into SingleConfirmResultComponent, nextData:", this.nextData);
    this._initEvent();
  }

  // 初始化事件
  private _initEvent() {
    // 設定左側返回
    this._headerCtrl.setLeftBtnClick(() => {
      this.onBack();
    });
    this.sendConfirmData(this.nextData); // 發送確認頁資料
    let profitAccountID = this._formateServcie.checkField(this.nextData, 'profitAccountID');
    this.showProfitAccount = profitAccountID != '' ? true : false;
  }

  onCommit() {
    this._logger.log("into onConfirm");
    this.sendResultData(this.resultReq, {
      security: this.securityObj
    });
  }

  /**
   * 取消
   */
  onCancel() {
    this.onBackPageEvent('single-confirm', 'home', this.nextData);
  }

  /**
   * 回上一步(左側返回)
   */
  onBack() {
    this.onBackPageEvent('single-confirm', 'back', this.nextData);
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
   * 點擊 再做一筆
   */
  onDoMore() {
    this._logger.log("into onDoMore");
    this.onBackPageEvent('single-confirm', 'doMore');
  }

  /**
   * 發送確認頁資料
   * @param reqData 請求
   */
  private sendConfirmData(reqData) {
    this._logger.log("into sendConfirmData, reqData:", reqData);
    let investCcyType = this._formateServcie.checkField(reqData, 'investCcyType'); // '1':以台幣, '2':以外幣
    // 外幣
    if (investCcyType == '2') {
      this._mainService.sendSingleForeignConfirm(reqData, {}).then(
        (result) => {
          this._logger.log("getSingleForeignConfirm, result:", result);
          this.confirmData = result.infoData;
          // 基金標的formate顯示
          let fundCode = this._formateServcie.checkField(this.confirmData, 'fundCode');
          let fundName = this._formateServcie.checkField(this.confirmData, 'fundName');
          this.showData.fundCodeShow = fundCode + ' ' + fundName;
          this._logger.log("getSingleForeignConfirm, showData.fundCodeShow:", this.showData.fundCodeShow);
          this.setSecurityReq(); // 成功後,執行安控相關設定
          this.nowPage = 'confirm';
        },
        (errorObj) => {
          this._logger.log("sendSingleForeignConfirm, errorObj:", errorObj);
          this._handleError.handleError(errorObj);
          this.errorBoxMsg = errorObj.content;
          this.nowPage = 'errorBox'; // 錯誤頁面
        }
      );
      // 台幣
    } else {
      this._mainService.sendSingleTwdConfirm(reqData, {}).then(
        (result) => {
          this._logger.log("getSingleTwdConfirm, result:", result);
          this.confirmData = result.infoData;
          // 基金標的formate顯示
          let fundCode = this._formateServcie.checkField(this.confirmData, 'fundCode');
          let fundName = this._formateServcie.checkField(this.confirmData, 'fundName');
          this.showData.fundCodeShow = fundCode + ' ' + fundName;
          this._logger.log("getSingleTwdConfirm, showData.fundCodeShow:", this.showData.fundCodeShow);
          this.setSecurityReq(); // 成功後,執行安控相關設定
          this.nowPage = 'confirm';
        },
        (errorObj) => {
          this._logger.log("getSingleTwdConfirm, errorObj:", errorObj);
          this._handleError.handleError(errorObj);
          this.errorBoxMsg = errorObj.content;
          this.nowPage = 'errorBox'; // 錯誤頁面
        }
      );
    }
  }

  /**
   * 發送結果頁資料
   * @param reqData 請求
   */
  private sendResultData(reqData, option?: object) {
    this._logger.log("getResultData, reqData:", reqData);
    let investCcyType = this._formateServcie.checkField(this.nextData, 'investCcyType'); // '1': 以台幣, '2': 以外幣
    // 外幣
    if (investCcyType == '2') {
      this._mainService.sendSingleForeignResult(reqData, option).then(
        (result) => {
          this._logger.log("sendSingleForeignResult, result:", result);
          this.resultData = result.infoData;
          // 基金標的formate顯示
          let fundCode = this._formateServcie.checkField(this.nextData, 'fundCode');
          let fundName = this._formateServcie.checkField(this.nextData, 'fundName');
          this.showData.fundCodeShowResult = fundCode + ' ' + fundName;
          this.nowPage = 'result'; // 顯示結果頁
          this.resStatus = result.status;
          this.statusObj = result.statusObj;
        },
        (errorObj) => {
          this._logger.log("sendSingleForeignResult, errorObj:", errorObj);
          let error_type = this._formateServcie.checkField(errorObj, 'resultType');
          if (error_type == 'security' || error_type == 'check') {
            this.securityAction = { method: 'error' };
            this.setSecurityError = errorObj;
          } else {
            this.nowPage = 'result';
            this.resStatus = false;
            this.statusObj = errorObj;
          }
        }
      );
      // 台幣
    } else {
      this._mainService.sendSingleTwdResult(reqData, option).then(
        (result) => {
          this._logger.log("sendSingleTwdResult, result:", result);
          this.resultData = result.infoData;
          // 基金標的formate顯示
          let fundCode = this._formateServcie.checkField(this.nextData, 'fundCode');
          let fundName = this._formateServcie.checkField(this.nextData, 'fundName');
          this.showData.fundCodeShowResult = fundCode + ' ' + fundName;
          this.nowPage = 'result'; // 顯示結果頁
          this.resStatus = result.status;
          this.statusObj = result.statusObj;
        },
        (errorObj) => {
          this._logger.log("sendSingleTwdResult, errorObj:", errorObj);
          let error_type = this._formateServcie.checkField(errorObj, 'resultType');
          if (error_type == 'security' || error_type == 'check') {
            this.securityAction = { method: 'error' };
            this.setSecurityError = errorObj;
          } else {
            this.nowPage = 'result';
            this.resStatus = false;
            this.statusObj = errorObj;
          }
        }
      );
    }
  }

  // 執行安控相關設定
  private setSecurityReq() {
    // 設定交易電文 安控物件api編號
    let fundCcy = this._formateServcie.checkField(this.confirmData, 'fundCcy');
    this.setSecurity.transServiceId = (fundCcy != 'NTD' && fundCcy != 'TWD')
      ? 'SPEC11040402' : 'SPEC11040401';
    this.setSecurity.outAccount = this._formateServcie.checkField(this.confirmData, 'investAccount');
    this.setSecurity.currency = this._formateServcie.checkField(this.confirmData, 'fundCcy');
    this.setSecurity.amount = this._formateServcie.checkField(this.confirmData, 'investMoney');
    this.securityAction = { method: 'init' };
    this._logger.log("setSecurityReq, setSecurity:", this.setSecurity);
  }

  // 接收安控返回
  submitSecurity(bakSecurityObj?) {
    if (!bakSecurityObj) {
      this._logger.log("!bakSecurityObj:", bakSecurityObj);
      // 組request及安控
      let termData = this._formateServcie.checkObjectList(this.nextData, 'termData');
      this._logger.log("termData:", termData);
      let profitAccountID = this._formateServcie.checkField(this.nextData, 'profitAccountID');
      this.resultReq = {
        fundCompId: this._formateServcie.checkField(this.nextData, 'fundCompId'),
        fundCode: this._formateServcie.checkField(this.nextData, 'fundCode'),
        fundName: this._formateServcie.checkField(this.nextData, 'fundName'),
        fundCcy: this._formateServcie.checkField(this.nextData, 'fundCcy'),
        investAccount: this._formateServcie.checkField(this.nextData, 'investAccount'),
        profitAccount: profitAccountID,
        investMoney: this._formateServcie.checkField(this.nextData, 'investMoney'),
        fee: this._formateServcie.checkField(this.confirmData, 'fee'),
        hasProfit: this._formateServcie.checkField(this.nextData, 'hasProfit'),
        totalInvestMoney: this._formateServcie.checkField(this.confirmData, 'investTotalMoney'),
        limitAmt: this._formateServcie.checkField(this.confirmData, 'limitAmt'),
        termData: {
          self: this._formateServcie.checkField(termData, 'self'),
          signAgr: this._formateServcie.checkField(termData, 'signAgr'),
          termA: this._formateServcie.checkField(termData, 'termA'),
          termB: this._formateServcie.checkField(termData, 'termB'),
          termC: this._formateServcie.checkField(termData, 'termC'),
          fee: this._formateServcie.checkField(termData, 'fee'),
          usaSignNote: this._formateServcie.checkField(termData, 'usaSignNote'),
          hanYa: this._formateServcie.checkField(termData, 'hanYa'),
          typeInd: this._formateServcie.checkField(termData, 'typeInd')
        }
      };
      this.showProfitAccount = profitAccountID != '' ? true : false;
      // 處理安控request
      let securityReq: any;
      let fundCcy = this._formateServcie.checkField(this.confirmData, 'fundCcy');
      if (fundCcy != 'TWD' && fundCcy != 'NTD') {
        securityReq = this._mainService.modifySingleForeign(this.resultReq);
      } else {
        securityReq = this._mainService.modifySingleTwd(this.resultReq);
      }
      this.resultReq = securityReq;

      // 送出按鈕
      this.securityAction = { method: 'submit', signText: securityReq };
      this._logger.log("submitSecurity, securityAction:", this.securityAction);
    } else {
      this._logger.log("security back, bakSecurityObj:", bakSecurityObj);
      // // 送出後回傳安控物件一路帶回 (待之後開啟, 安控回傳完成會走進else)
      this.securityObj = bakSecurityObj;
      this.onCommit();
    }
  }
}
