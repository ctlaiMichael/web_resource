/**
 * 登入前首頁
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// --- library --- //
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AppCtrlService } from '@systems/system/app-ctrl/app-ctrl.service';
import { FormateService } from '@template/formate/formate.service';
// --- data --- //
import { START_HOME_MENU, START_HOME_BTN } from '@conf/menu/home-menu';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: []
})
export class HomePageComponent implements OnInit {
  menuData: Array<any>; // 快捷選單
  // 主要選單
  mainData: any = {
    left: {
      id: '',
      name: '',
      url: ''
    },
    right: {
      id: '',
      name: '',
      url: ''
    }
  };
  haveAd = false; // 有無廣告

  constructor(
    private _logger: Logger,
    private navgator: NavgatorService,
    private appCtrl: AppCtrlService,
    private _formateService: FormateService,
    private errorHandler: HandleErrorService,
    private layoutCtrl: LayoutCtrlService
  ) { }

  ngOnInit() {
    this.getData();
  }

  /**
   * 轉址事件
   * @param menu 選單事件 
   */
  onGoEvent(menu) {
    let go_path = this._formateService.checkField(menu, 'url');
    if (!go_path) {
      this.errorHandler.handleError({}, 'EMPTY_PATH');
      return false;
    }
    if (go_path == 'menu') {
      this.layoutCtrl.openMenu();
      return false;
    }
    this.navgator.push(go_path);
  }

  /**
   * 廣告錯誤回傳
   */
  onAdBack(e) {
    this.haveAd = (!!e) ? true : false;
  }


  /**
   * 取資料
   */
  private getData() {
    // this._logger.log('menu is', this.menuData, START_HOME_MENU);
    this.menuData = this._formateService.transClone(START_HOME_MENU);
    let main_set = this._formateService.transClone(START_HOME_BTN);
    this.mainData = { ...this.mainData, ...main_set };
  }



}
