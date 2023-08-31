/**
 * footer功能選單
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// == library == //
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
// == data == //
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
import { FooterCtrlService } from '@systems/route/layout/footer/footer-ctrl.service';
import { FooterOptions } from '@systems/route/layout/footer/footer-options';
import { FOOTER_MENU, FOOTER_ACTIVE_SET } from '@conf/menu/footer-menu';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: []
})
export class FooterComponent implements OnInit {
    options: FooterOptions;
    footer_menu = FOOTER_MENU;
    is_open = false;
    showFooter = false;
    showActive = ''; // 當前選擇
    private active_list = FOOTER_ACTIVE_SET;
    // 路徑暫存
    private path_history = {
        pre: '',
        now: ''
    };

    private footerChangeSubscript: any; // footer設定偵聽
    private routeChangeSubscript: any; // route改變偵聽
    private subscriptionOpenMenuChange: any; // menu開啟偵聽

    constructor(
        private layoutCtrl: LayoutCtrlService,
        private footerCtrl: FooterCtrlService,
        private logger: Logger,
        private navgator: NavgatorService,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private errorHandler: HandleErrorService
    ) {
        this.options = new FooterOptions();
        this.options.displayFooter = false;
    }

    ngOnInit() {
        // footer顯示隱藏控制
        this.footerChangeSubscript = this.footerCtrl.changeFooterOption.subscribe((value: any) => {
            const defaultOption = this.layoutCtrl.getFooter();
            this.options = { ...defaultOption, ...value };
            this._modifyFooterOptions();
        });
        // footer按鈕切換樣式控制
        this.routeChangeSubscript = this.layoutCtrl.routeChangeSubject.subscribe((path: any) => {
            this._modifyFooterActive(path);
        });
        // 當menu開啟關閉時
        this.subscriptionOpenMenuChange = this.layoutCtrl.openMenuChange.subscribe((value: any) => {
            let check_open = this.layoutCtrl.getMenuStatus();
            if (check_open) {
                this._modifyFooterActive('FOOTER_MORE');
            } else {
                this._modifyFooterActive(this.path_history.pre);
            }
        });
    }

    /**
     * [footer-menu選單]按鈕點擊事件
     * @param menu 選單
     */
    onMenuClick(menu) {
        if (typeof menu !== 'object' || !menu || !menu.hasOwnProperty('url')) {
            this.errorHandler.handleError({
                title: 'ERROR.TITLE',
                content: 'ERROR.DEFAULT'
            });
            return false;
        }
        let goto = this._formateService.checkField(menu, 'url');
        let menu_id = this._formateService.checkField(menu, 'id');


        if (menu_id == 'footer-more') {
            // 更多
            this.is_open = this.layoutCtrl.getMenuStatus();
            if (this.is_open) {
                this.is_open = false;
                this.layoutCtrl.closeMenu();
            } else {
                this.is_open = true;
                this.layoutCtrl.openMenu();
            }
            return false;
        }

        this.navgator.push(goto);
    }

    /**
     * 改變footer設定
     */
    private _modifyFooterOptions() {
        this.showFooter = this.options.displayFooter;
    }

    /**
     * 改變footer樣式
     * @param path 對應routing-path的id
     */
    private _modifyFooterActive(path) {
        if (!this._checkService.checkEmpty(path, true)) {
            path = 'home';
        }
        this.path_history.pre = this.path_history.now;
        this.path_history.now = path;

        let now_active = this._formateService.checkField(this.active_list, path);
        if (!this._checkService.checkEmpty(now_active, true)) {
            now_active = ''; // 非清單內預設空白
        }
        this.showActive = now_active;
    }

}
