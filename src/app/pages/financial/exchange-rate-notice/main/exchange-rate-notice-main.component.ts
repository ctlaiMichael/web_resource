/**
 * 匯率到價通知
 */
import { Component, OnInit } from '@angular/core';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { ExchangeRateNoticeService } from '@pages/financial/shared/service/exchange-rate-notice.service';
import { note_content } from '@pages/financial/shared/notePopup-content';
import { AuthService } from '@systems/system/auth/auth.service';
import { AlertService } from '@template/msg/alert/alert.service';

@Component({
  selector: 'app-exchange-rate-notice-main',
  templateUrl: './exchange-rate-notice-main.component.html',
  styleUrls: [],
  providers: [ExchangeRateNoticeService]
})

export class ExchangeRateNoticeMainComponent implements OnInit {

  showEditPage = false; // 顯示編輯頁
  haveData = true;
  notePopupOption = {}; // 注意事項設定
  isEditing = false; // 是否按下編輯按鈕
  email: string;
  noticeData = []; // 匯率到價通知data
  notYetData = []; // 尚未生效的到價通知
  workingData = []; // 通知中的到價通知
  expiredData = []; // 已到期的到價通知
  errorMsg = "";
  note_content = note_content;

  outputData = {
    action: '',
    item: {}
  };

  constructor(
    private _headerCtrl: HeaderCtrlService,
    private _logger: Logger,
    private navgator: NavgatorService,
    private mainService: ExchangeRateNoticeService,
    private auth: AuthService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.notePopupOption = {
      title: 'POPUP.NOTE.TITLE',
      content: this.note_content
    };

    this._headerCtrl.setRightBtnClick(() => {
      this.onRightBtnClick();
    });

    this.email = this.auth.getEmail();

    this.getData();

  }

  getData() {
    // 取得匯率到價通知data
    this.mainService.getData().then(
      (res) => {
        this.haveData = true;
        // this.email = res.email;
        this.noticeData = res.data;
        this.notYetData = res.notYetData;
        this.workingData = res.workingData;
        this.expiredData = res.expiredData;
      },
      (errObj) => {
        this.haveData = false;
        this.errorMsg = errObj.content;
        // Error
      }
    );
  }

  /**
   * Header右側按鈕點擊事件
   */
  onRightBtnClick(){
    if (this.isEditing) {
      this.isEditing = false;
      this._headerCtrl.setOption({rightBtnIcon: 'edit'}); // 變更Header右側按鈕樣式
    } else {
      this.isEditing = true;
      this._headerCtrl.setOption({rightBtnIcon: 'finish'}); // 變更Header右側按鈕樣式
    }
    
  }

  /**
   * [刪除]按鈕點擊事件
   */
  onDeleteBtnClick(item) {
    this.outputData.action = 'delete';
    this.outputData.item = item;
    this.showEditPage = true;
  }

  /**
   * [修改]按鈕點擊事件
   */
  onModifyBtnClick(item) {
    this.outputData.action = 'update';
    this.outputData.item = item;
    this.showEditPage = true;
  }

  /**
   * [設定e-mail]按鈕點擊事件
   */
  onEmailSettingBtnClick() {
    
  }

  /**
   * [新增到價通知]按鈕點擊事件
   */
  onAddNewNoticeBtnClick() {
    if (this.noticeData.length >= 6) {
      this.alert.show('FINANCIAL.ERR.NOTICE_FULL');
    } else {
      this.outputData.action = 'create';
      this.showEditPage = true;
    }
    
  }

  /**
   * 子層返回事件
   * @param e
   */
  onBackPage(e) {
    this._headerCtrl.setOption({ title: 'FUNC.RATES.EXCHANGE_RATE_NOTICE', leftBtnIcon: 'back', rightBtnIcon: 'edit' }); // 變更Header樣式
    this._headerCtrl.setLeftBtnClick(() => {
      this.navgator.editBack();
    });
    this._headerCtrl.setRightBtnClick(() => {
      this.onRightBtnClick();
    });
    
    this.isEditing = false;
    this.showEditPage = false;

    this.noticeData = [];
    this.notYetData = [];
    this.workingData = [];
    this.expiredData = [];
    this.getData();
  }

}
