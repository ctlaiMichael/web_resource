/**
 * 基金申購
 */
import { Component, OnInit } from '@angular/core';
import { FundInvestService } from '@pages/fund/shared/fund-invest.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { FundCodePopupService } from '@template/list/fund-code-popup/fund-code-popup.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { CacheService } from '@systems/system/cache/cache.service';

@Component({
  selector: 'app-fund-invest-main',
  templateUrl: './fund-invest-main.component.html',
  styleUrls: []
})

export class FundInvestMainComponent implements OnInit {
  nowPage = 'main-page'; // 目前頁面
  type = ''; // 傳入子層使用, 判斷 go or back
  errorBoxMsg = ''; // 錯誤訊息
  bookmarkData = []; // 頁籤設定
  investType = ''; // 申購方式 
  bookDefault = 'single'; // 控制bookmark頁籤
  noteData: any; // 注意資訊
  currencyType = 'twd'; // 以哪種幣別申購, 'twd': 台幣, 'foreign': 外幣
  hasAcct = false; // 是否取得帳號,餘額資料
  nowStep = 'main'; // 當前步驟
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
  // 顯示畫面上錯誤訊息(紅框)
  errorMsg = {
    fundCode: '' // 基金標的
  };
  // 畫面顯示使用 or 下一頁需要之欄位
  showData = {
    fundCompID: '', // 基金公司代碼
    fundCode: '', // 基金代碼
    fundCcy: '', // 基金幣別
    fundName: '', // 基金名稱
    formateName: '', // 整理過, 基金代碼+基金名稱
    riskName: '', // 風險等級
    fundRiskName: '', // 基金風險等級
    investType: '', // 申購方式
    currencyType: '',
    hasProfit: '' // 是否有配息
  };
  // 給popoup顯示資訊(投資標的)
  fundOption = {
    data: [],
    selectComp: '', // 選擇之基金公司
    selectFund: '', // 選擇之基金標的
    type: '',
    investType: '' // 申購方式, '1': 台幣, '2': 外幣
  };
  nextData: any; // 條款頁,後續頁面需用到
  backData: any; //返回時帶入之資料

  constructor(
    private _mainService: FundInvestService,
    private _logger: Logger,
    private _formateServcie: FormateService,
    private confirm: ConfirmService,
    private navgator: NavgatorService,
    private fundCodeService: FundCodePopupService,
    private _headerCtrl: HeaderCtrlService,
    private _cacheService: CacheService
  ) { }

  ngOnInit() {
    this._logger.log("into FundInvestMainComponent");
    this._initEvent();
  }

  // 初始化事件
  private _initEvent() {
    this.removeAllCache();
    this._mainService.resetEdit(); // 清空暫存
    // 設定頁籤選單
    this.bookmarkData = this._mainService.getBookmark();
    // 取得注意資訊
    this.noteData = this._mainService.getNoteData();
    this._headerCtrl.setLeftBtnClick(() => {
      this.onCancel();
    });
  }

  /**
   * 點擊 選擇投資幣別
   * @param type 以哪種幣別申購, 'twd': 台幣, 'foreign': 外幣
   */
  onSelectCurrency(type) {
    // 若有切換投資幣別清空 標的資訊
    if (type != this.currencyType) {
      this.showData.fundCompID = '';
      this.showData.fundCode = '';
      this.showData.fundCcy = '';
      this.showData.fundName = '';
      this.showData.formateName = '';
      this.showData.hasProfit = '';
      // 清空選擇之標的資料,popup下次顯示用
      this.fundOption.selectComp = '';
      this.fundOption.selectFund = '';
      this.showData.riskName = '';
      this.showData.fundRiskName = '';
    }
    this.currencyType = type;
  }

  /**
   * 點擊 選擇投資標的
   */
  onSelectFundCode() {
    this._logger.log("into onSelectFundCode, open fundcode popup");
    this.fundOption.investType = this.currencyType == 'twd' ? '1' : '2';
    this.fundCodeService.show(this.fundOption).then(
      (result) => {
        this._logger.log("onSelectFundCode, result:", result);
        this.showData.fundCcy = result['fundEngCcy'];
        this.showData.fundCode = result['fundId'];
        this.showData.fundName = result['fundName'];
        this.showData.formateName = result['fundEngCcy'] + ' ' + result['fundId'] + ' ' + result['fundName'];
        this.showData.riskName = result['custIdRiskName'];
        this.showData.fundRiskName = result['riskName'];
        this.showData.fundCompID = result['groupId'];
        this.showData.hasProfit = result['hasProfit'];
        // 紀錄選擇之標的資料,popup下次顯示用
        this.fundOption.selectComp = result['groupId'];
        this.fundOption.selectFund = result['fundId'];
      },
      (cancel) => {
        this._logger.log("onSelectFundCode, into cancel");
      }
    );
  }

  /**
   * 編輯頁1 點擊下一步
   */
  onNext() {
    this._logger.log("into onNext");
    let check = {
      fundCompID: this.showData.fundCompID, // 基金公司代碼
      fundCode: this.showData.fundCode, // 基金代碼
      fundCcy: this.showData.fundCcy,  // 基金幣別
    };
    let checkData = this._mainService.checkData(check, { type: 'main' });
    // 檢核失敗
    if (checkData.status == false) {
      this._logger.log("checkData error mainPage, checkData:", checkData);
      // 看標的錯誤為,公司代號錯誤 or 標的代號錯誤 or 標的幣別錯誤, 畫面就顯示哪個
      if (checkData.error_list.fundCompID != '') {
        this.errorMsg.fundCode = checkData.error_list.fundCompID;
      } else if (checkData.error_list.fundCode != '') {
        this.errorMsg.fundCode = checkData.error_list.fundCode;
      } else if (checkData.error_list.fundCcy != '') {
        this.errorMsg.fundCode = checkData.error_list.fundCcy;
      }
      // 成功
    } else {
      this._mainService.resetEdit(); // 清空暫存
      this.errorMsg.fundCode = ''; // 清空錯誤訊息
      this.showData.investType = this.investType; // 將申購方式帶入下一頁
      this.showData.currencyType = this.currencyType; // 將投資幣別帶入下一頁
      // this._mainService.setEdit();
      this.type = 'go'; // 紀錄流程方式
      if (this.investType == 'single') {
        this.nowPage = 'single-edit'; // 切換至單筆申購
      } else if (this.investType == 'regular') {
        this.nowPage = 'regular-edit'; // 切換至定期定額
      }
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
   * 頁籤回傳(申購方式)
   * @param e
   */
  onBookMarkBack(e) {
    this._logger.log('Deposit', 'onBookMarkBack', e);
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
    this.investType = set_id;
    this.nowPage = 'main-page'; // 主控頁
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
    this.type = pageType; // 傳入子層使用, 判斷 go or back
    this._logger.log("onPageBackEvent, type:", this.type);
    // *前往下一步驟
    if (pageType == 'go') {
      // 基金申購 編輯頁 => 同意條款
      if (page == 'invest-term') {
        this._logger.log("invest-term go");
        this.nextData = tmp_data; // 條款頁,後續頁面需用到
        this.nowPage = 'invest-term';
        // 條款頁 => 確認,結果頁
      } else if (page == 'term') {
        this._logger.log("go to confirm page");
        this.nextData = tmp_data; // 確認,結果頁面需用到
        let investType = this._formateServcie.checkField(tmp_data, 'investType');
        this._logger.log("investType:", investType);
        this.nowPage = investType == 'single' ? 'single-confirm' : 'regular-confirm';
      }

      // *點擊左側返回
    } else if (pageType == 'back') {
      // 單筆申購-編輯頁 => 主頁
      if (page == 'single-edit') {
        this._logger.log("single-edit back");
        this.nowPage = 'main-page';
        this.bookDefault = 'single';
        this._headerCtrl.setLeftBtnClick(() => {
          this.onCancel();
        });
        // 定期定額-編輯頁 => 主頁
      } else if (page == 'regular-edit') {
        this._logger.log("regular-edit back");
        this.nowPage = 'main-page';
        this.bookDefault = 'regular';
        this._headerCtrl.setLeftBtnClick(() => {
          this.onCancel();
        });
        // 條款頁回傳 => 編輯頁
      } else if (page == 'invest-term') {
        let investType = this._formateServcie.checkField(tmp_data, 'investType');
        this._logger.log("invest-term back, investType:", investType);
        // 返回至對應之編輯頁
        this._logger.log("invest-term back, tmp_data:", tmp_data);
        this.backData = tmp_data; // 帶入返回值
        this.nowPage = investType == 'single' ? 'single-edit' : 'regular-edit';
        // 確認頁回傳 => 條款
      } else if (page == 'single-confirm' || page == 'regular-confirm') {
        this._logger.log("confirm back, tmp_data:", tmp_data);
        this.nowPage = 'invest-term';
      }

      // *點擊取消
    } else if (pageType == 'home') {
      this.onCancel();
      // *點擊 再做一筆
    } else if (pageType == 'doMore') {
      this._logger.log("into doMore, pageType:", pageType);
      this._headerCtrl.setOption({ leftBtnIcon: 'edit-back', rightBtnIcon: '' });
      this.doMore(); // 再做一筆
      this._initEvent();
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
   * 結果頁點擊 再做一筆, 清除畫面上資料
   */
  private doMore() {
    this._logger.log("into doMore");
    // 畫面顯示使用 or 下一頁需要之欄位
    this.showData = {
      fundCompID: '', // 基金公司代碼
      fundCode: '', // 基金代碼
      fundCcy: '', // 基金幣別
      fundName: '', // 基金名稱
      formateName: '', // 整理過, 基金代碼+基金名稱
      riskName: '', // 風險等級
      fundRiskName: '', // 基金風險等級
      investType: '', // 申購方式
      currencyType: '',
      hasProfit: '' // 是否有配息
    };
    // 給popoup顯示資訊(投資標的)
    this.fundOption = {
      data: [],
      selectComp: '', // 選擇之基金公司
      selectFund: '', // 選擇之基金標的
      type: '',
      investType: '' // 申購方式, '1': 台幣, '2': 外幣
    };
    // 頁籤回到初始值
    this.bookDefault = 'single';
    this.currencyType = 'twd';
    this.nowPage = 'main-page'; // 切回主控頁(標的) 
    this._headerCtrl.setLeftBtnClick(() => {
      this.onCancel();
    });
  }

  removeAllCache() {
    let type = 'fund';
    this._cacheService.removeGroup(type);
  }
}
