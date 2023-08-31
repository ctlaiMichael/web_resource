/**
 * header功能選單
 */
import { Component, NgZone, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
import { Subscription } from 'rxjs';
// == library == //
import { FormateService } from '@template/formate/formate.service';
import { LogoutService } from '@pages/login/shared/logout.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { CheckService } from '@template/check/check.service';
// import { ExitAppService } from '@lib/plugins/exit-app.service';

// == show == //
import { ConfirmService } from '@template/msg/confirm/confirm.service';

// == data == //
import { AppCtrlService } from '@systems/system/app-ctrl/app-ctrl.service';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { HeaderOptions } from '@systems/route/layout/header/header-options';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [],
})
export class HeaderComponent implements OnInit {
    options: HeaderOptions;
    title: string;
    headerType: string; // header 類型
    leftIcon: string;
    leftBtnClass: string;
    leftBtnText: string;
    rightBtnText: string;
    rightBtnClass: string;
    rightIcon: string;
    is_login = false;
    // ==== 其他顯示資料 object ==== //
    headerOtherClass = '';
    headerShowLogo = false;

    // ==== subscript object ==== //
    private subscriptionLeftBtnClickChange: any;
    private subscriptionRightBtnClickChange: any;
    private subscriptOption: any;
    private subscriptUpdateOption: any;
    // subscriptCloseMenu: any;
    // private subscriptDisableNativeReturn: any;
    private subscriptSwipeLeft: Subscription;
    private subscriptSwipeRight: Subscription;
    private subscriptionLogin: any;
    private subscriptionLogout: any;

    // ==== 其他資料設定 object ==== //
    private disableNativeReturn = false;
    private hasDialog = false;

    // ==== 按鈕事件 ==== //
    /**
     * 左側按鈕事件
     * 後續被subscribe複寫
     */
    leftBtnClick = (...arg) => { };

    /**
     * 右側按鈕事件
     * 後續被subscribe複寫
     */
    rightBtnClick = (...arg) => { };

    constructor(
        private zone: NgZone,
        private _logger: Logger,
        private el: ElementRef,
        private _render: Renderer2,

        // == library == //
        private appCtrl: AppCtrlService,
        private layoutCtrl: LayoutCtrlService,
        private headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private logoutService: LogoutService,
        // == show == //
        // private exitApp: ExitAppService,
        private confirm: ConfirmService
    ) {
        this.androidBackCtrl();
        this.options = new HeaderOptions();
        this.options.style = 'header_start_home';
        // if (!environment.NATIVE) {
        //   this.options.style = 'normal';
        // }
        this.setHeaderClass();
        this.modifyLeftEvent('ignor');
        this.modifyRightEvent('ignor');

    }


    ngOnInit() {
        this.subscriptionLogin = this.appCtrl.changeLogin.subscribe((value: any) => {
            // 登入
            this.is_login = true;
        });
        this.subscriptionLogout = this.appCtrl.changeLogout.subscribe((value: any) => {
            // 登出
            this.is_login = false;
        });
        this.subscriptOption = this.headerCtrl.changeOption.subscribe((value: any) => {
            // 重新設定header
            this._logger.step('HeaderCtrl', 'reset option', value);
            this.options = value;
            this._modifyHeaderOptions();
        });
        this.subscriptUpdateOption = this.headerCtrl.updateOptionSubject.subscribe((value: any) => {
            // 修改header設定
            let headerOption = this.layoutCtrl.getHeader();
            this.options = { ...headerOption, ...value };
            this._logger.step('HeaderCtrl', 'update option', headerOption, value);
            this._modifyHeaderOptions();
        });
        this.subscriptionLeftBtnClickChange = this.headerCtrl.changeLeftBtnClick.subscribe((value: any) => {
            // 左側事件設定
            this.modifyLeftEvent(value);
        });
        this.subscriptionRightBtnClickChange = this.headerCtrl.changeRightBtnClick.subscribe((value: any) => {
            // 右側事件設定
            this.modifyRightEvent(value);
        });
        // -- event -- //
        this.headerCtrl.onLeftEventClickSubject.subscribe((value: any) => {
            // 左側按鈕點選事件
            this.leftBtnClick(value);
        });
        this.headerCtrl.onRightEventClickSubject.subscribe((value: any) => {
            // 左側按鈕點選事件
            this.rightBtnClick(value);
        });



    }

    /**
     * 登出按鈕點擊
     */
    onLogoutBtnClick() {
        // this._logger.log('HeaderCtrl', 'dologin btn');
        if (this.is_login) {
            this.confirm.show('POPUP.RETURN.LOGOUT').then(
                () => {
                    this.logoutService.logout();
                },
                () => {
                    // 使用者取消登出
                }
            );
        } else {
            this.navgator.push('login');
        }
    }

    /**
     * 參數整理
     * [事件]
     * 回首頁事件: this.backToHome
     * 回前一功能(history): this.back
     */
    private _modifyHeaderOptions() {
        // 左側按鈕樣式
        this.modifyLeftEvent(this.leftBtnClick, this.options.leftBtnIcon);

        // 右側按鈕樣式
        if (!!this.options.rightBtnIcon) {
            this.modifyRightEvent(this.rightBtnClick, this.options.rightBtnIcon);
        }

        this.setHeaderClass();

    }

    /**
     * 修改左側選單事件
     * @param e 事件
     * @param left_icon 左側icon控制
     */
    private modifyLeftEvent(e?: any, left_icon?: string) {
        if (typeof e == 'string') {
            // 傳入字串，視為要設定left_icon
            left_icon = e;
        }
        // 左側按鈕樣式
        switch (left_icon) {
            case 'back':
                // 查詢、選單等返回按鈕
                this.leftBtnClick = this.backToHome; // 回首頁
                this.leftBtnClass = 'btn_back';
                this.leftBtnText = '';
                break;
            case 'edit-back':
                // 編輯交易等返回按鈕
                this.leftBtnClick = this.editBackEvent; // 編輯返回
                this.leftBtnClass = 'btn_back';
                this.leftBtnText = '';
                break;
            case 'ignor': // 關閉左側按鈕
                this.leftBtnClick = this.ignorEvent;
                this.leftBtnClass = '';
                this.leftBtnText = '';
                break;
            // case 'cancel':
            //   // 取消文字(目前不提供)
            //   // this.leftBtnClick = this.back;
            //   this.leftBtnClass = 'btn_txt';
            //   this.leftBtnText = 'BTN.CANCEL';
            //   break;
            // case 'menu':
            //   // 選單事件(目前沒有)
            //   break;
            default:
                // 其他類型: 不提供變動left icon!!!
                if (typeof e == 'function') {
                    this.leftBtnClick = e;
                } else {
                    this.leftBtnClick = this.backToHome; // 回首頁
                }
                if (typeof left_icon == 'string') {
                    // 有設定的才調整預設: 因為想改但不知道要改什麼
                    this.leftBtnClass = '';
                    this.leftBtnText = '';
                }
                break;
        }
    }

    /**
     * 修改右側選單事件
     * @param e 事件
     * @param right_icon 右側icon控制
     */
    private modifyRightEvent(e?: any, right_icon?: string) {
        if (typeof e == 'string') {
            // 傳入字串，視為要設定right_icon
            right_icon = e;
        }
        switch (right_icon) {
            case 'qrcode': // qrcode
                // this.rightBtnClick = this.back;
                this.rightBtnClass = 'btn_qrcode';
                this.rightBtnText = '';
                break;
            case 'setting': // 編輯
                // this.rightBtnClick = this.back;
                this.rightBtnClass = 'btn_app_setting';
                this.rightBtnText = '';
                break;
            case 'edit': // 編輯
                // this.rightBtnClick = this.back;
                this.rightBtnClass = 'btn_txt';
                this.rightBtnText = 'BTN.EDIT';
                break;
            case 'finish': // 完成
                // this.rightBtnClick = this.back;
                this.rightBtnClass = 'btn_txt';
                this.rightBtnText = 'BTN.FINISH';
                break;
            case 'customer_service': // 客服
                // this.rightBtnClick = this.back;
                this.rightBtnClass = 'btn_customer_service';
                this.rightBtnText = '';
                break;
            case 'ignor': // 不提供右側按鈕
                this.leftBtnClick = this.ignorEvent;
                this.rightBtnClass = '';
                this.rightBtnText = '';
                break;
            default:
                // 其他類型: 不提供變動right icon!!!
                if (typeof e == 'function') {
                    this.rightBtnClick = e;
                } else {
                    this.rightBtnClick = this.backToHome; // 回首頁
                }
                if (typeof right_icon == 'string') {
                    // 有設定的才調整預設: 因為想改但不知道要改什麼
                    this.rightBtnClass = '';
                    this.rightBtnText = '';
                }
                break;
        }
    }


    /**
     * 調整header Class設定
     */
    private setHeaderClass() {
        // header 樣式模組
        let set_class = this._formateService.checkField(this.options, 'style');
        if (set_class != '') {
            this.headerType = set_class;
        } else {
            this.headerType = 'normal';
        }
        // 顯示LOGO處理
        let header_title = this._formateService.checkField(this.options, 'title');
        if (header_title == 'header_logo') {
            this.headerShowLogo = true;
        } else if (!this._checkService.checkEmpty(header_title, true)) {
            // 標題為空
            this.headerShowLogo = true;
        } else {
            this.headerShowLogo = false;
        }
        // 其他樣式
        let header_set = this._formateService.checkField(this.options, 'header');
        if (this._checkService.checkEmpty(header_set, true)) {
            this.headerOtherClass = header_set;
        } else {
            this.headerOtherClass = '';
        }
        // this._logger.step('HeaderCtrl', 'set', this.headerType, set_class, this.options);
    }


    // ----------------------------- [指定動作控制 Start] ----------------------------- //

    /**
     * Android實體返回鍵控制
     */
    private androidBackCtrl() {
        this._render.listen('document', 'backbutton', () => {
            this.appCtrl.onReturnBtn();
        });
        document.addEventListener('backbutton', () => {
            this._logger.step('AndridBack', 'ignor event');
        }, false);
    }

    /**
     * 返回動作
     */
    private back() {
        if (!!this.options && !!this.options.backPath) {
            this.navgator.popTo(this.options.backPath);
        } else {
            this.navgator.pop();
        }
    }

    /**
     * eidt-back的控制事件
     */
    private editBackEvent() {
        this.navgator.editBack();
    }

    /**
     * 返回home
     */
    private backToHome() {
        this.navgator.push('home');
    }

    /**
     * 無事件
     */
    private ignorEvent() {
        this._logger.log('HeaderCtrl', 'ignor event');
    }

    // ----------------------------- [指定動作控制 End] ----------------------------- //

}
