/**
 * 流程控制功能
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Logger } from '@systems/system/logger/logger.service';
// --- config --- //
import { ROUTING_PATH } from '@conf/menu/routing-path';
import { Sites } from '@conf/external-web';
// --- library --- //
import { SessionStorageService } from '@lib/storage/session-storage.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { Base64FileUtil } from '@util/formate/modify/base64-file-util';
// --- page ctrl --- //
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
import { InAppBrowserService } from '@lib/link/plugins/in-app-browser/in-app-browser.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { ErrorObjectOption } from '@systems/handle-error/error-object-option';
import { TranslateService } from '@ngx-translate/core';
// import { StartAppService } from '@lib/plugins/start-app/start-app.service';

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class NavgatorService {
    protected _setErrorObject = new ErrorObjectOption(); // 設定error obj
    private emptyPathError: any;

    constructor(
        private logger: Logger,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        // --- library --- //
        private session: SessionStorageService,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private translate: TranslateService,
        // --- page ctrl --- //
        // private startApp: StartAppService,
        private inAppBrowser: InAppBrowserService,
        private alert: AlertService,
        private layoutCtrl: LayoutCtrlService
    ) {
        let empty_path_obj = this._setErrorObject.returnError({}, 'EMPTY_PATH');
        this.emptyPathError = {
            title: empty_path_obj.title,
            content: empty_path_obj.content
        };
        let msg_list = [empty_path_obj.content];
        this.translate.get(empty_path_obj.content).subscribe((i18nval) => {
            msg_list = [i18nval];
        });
        if (!empty_path_obj.app_error_code_hide) {
            msg_list.push('(' + empty_path_obj.app_error_code + ')');
        }
        this.emptyPathError.content = msg_list.join(' ');
    }

    /**
     * 切換至頁面
     * @param path 路徑
     * @param navParams 傳入下一頁的參數
     * @param otherSet 
     *      saveParams 是否要存入參數，一般功能固定都是false,只有navgator的程式才會是false
     *      otherParams 指定要另外存的參數
     */
    push(path: string, navParams: any = {}, otherSet?: object) {
        this.logger.step('path', 'go path', path);
        if (!path) {
            // 路徑不得為空
            this.alert.show(this.emptyPathError.content, { title: this.emptyPathError.title });
            this.logger.step('path', 'ignor', path);
            return;
        }
        let isOtherLink = (path.indexOf(':') > 0 && path.indexOf('http') === 0) ? true : false;

        if (path == 'menu') {
            // 選單特規處理
            this.layoutCtrl.openMenu();
            return false;
        }

        let saveParams = true;
        let otherParams = {};
        if (typeof otherSet != 'undefined') {
            let set_saveParams = this._formateService.checkObjectList(otherSet, 'saveParams');
            saveParams = (set_saveParams === false) ? false : true;
            otherParams = this._formateService.checkObjectList(otherSet, 'otherParams');
        }

        if (!!saveParams) {
            let pre_path = this.getLastPath();
            if (path == pre_path) {
                // 路徑不得與前一頁相同
                this.logger.log('path', 'path is same pre pateh(now/pre)', path, pre_path);
                this.layoutCtrl.closeMenu();
                return;
            }
        }
        const routingPath = this._formateService.checkObjectList(ROUTING_PATH, path);
        if (!this._checkService.checkEmpty(routingPath, true) && !isOtherLink) {
            // 沒設定判斷處理
            // 不可在Navgator內引用HandleErrorService
            this.alert.show(this.emptyPathError.content, { title: this.emptyPathError.title });
            this.logger.step('path', 'ignor set', path, routingPath);
            return;
        }
        // --- params 處理 --- //
        if (!isOtherLink && !!routingPath['urlParams'] && typeof routingPath['urlParams'] === 'object') {
            navParams = { ...navParams, ...routingPath['urlParams'] }; // 採用部份取代方式
        }
        if (!this._checkService.checkEmpty(navParams, true)) {
            // 為空，設定預設值
            navParams = {}; // 採用部份取代方式
        }
        // --- params 處理 end --- //
        if (!!isOtherLink) {
            let target = this._formateService.checkField(navParams, 'target');
            if (!target) {
                target = '_system';
            }
            this.inAppBrowser.open(path, target);
            return;
        }

        let check_property = this._formateService.checkObjectList(routingPath, 'openType');
        let goto_url = this._formateService.checkObjectList(routingPath, 'url');
        if (!!check_property) {
            if (check_property == 'app') {
                this.logger.debug('app');
                // this.startApp.startApp(goto_url);
            } else if (check_property == 'web') {
                this.logger.debug('有進去瀏覽器');
                this.inAppBrowser.openWeb(goto_url, navParams).then(
                    (web) => {

                    },
                    (err) => {
                        if (err.loginRequired == true) {
                            this.session.set('redirect', path);
                            this.push('login');
                        } else {
                            this.alert.show(err.msg, { title: 'ERROR.TITLE' });
                        }
                    }
                );
            }
            // APP open & Web open Close
            return;
        }

        this.logger.step('path', 'push page');
        if (!!saveParams) {
            // 即將前往的路徑
            let path_set = this.layoutCtrl.changePath(path, {
                'params': navParams,
                'routingPathSet': routingPath,
                'otherParams': otherParams
            });
        }
        this.router.navigate([goto_url], { queryParams: navParams });
    }

    
    /**
     * 回前一頁
     */
    pop(returnData?: any) {
        let history = this.layoutCtrl.popHistory();
        const remove_path = this._formateService.checkObjectList(history, 'remove.path');
        const lastPath = this.getLastPath();
        let urlParams = this.layoutCtrl.getParams();
        let otherParams = this.layoutCtrl.getOtherParams();
        this.push(lastPath, urlParams, { 'saveParams': false, 'otherParams': otherParams });
    }

    /**
     * 回到前面某一頁
     * @param path 路徑
     */
    popTo(path: string) {
        let history = this.layoutCtrl.popToHistory(path);
        const lastPath = this.getLastPath();
        let urlParams = this.layoutCtrl.getParams();
        let otherParams = this.layoutCtrl.getOtherParams();
        this.push(lastPath, urlParams, { 'saveParams': false, 'otherParams': otherParams });
    }

    /**
     * 開啟PDF
     * @param pdfStr
     */
    openPDF(pdfStr: string) {
        let path = '';
        this.logger.log('pdf');
        if (pdfStr != '') {
            path = Base64FileUtil.base64ToPDF(pdfStr);
        }
        let web = this.inAppBrowser.outAppOpen(pdfStr);
        if (!web) {
            // 不可在Navgator內引用HandleErrorService
            this.alert.show(this.emptyPathError.content, { title: this.emptyPathError.title });
        }
    }

    // --------------------------------------------------------------------------------------------
    //     ________        __    ________          __          
    //     /  _____/  _____/  |_  \______ \ _____ _/  |______   
    //    /   \  ____/ __ \   __\  |    |  \\__  \\   __\__  \  
    //    \    \_\  \  ___/|  |    |    `   \/ __ \|  |  / __ \_
    //     \______  /\___  >__|   /_______  (____  /__| (____  /
    //            \/     \/               \/     \/          \/
    // --------------------------------------------------------------------------------------------

    /**
     * 取得最後一頁路徑
     * 已轉移layoutCtrl
     */
    getLastPath(): string {
        return this.layoutCtrl.getLastPath();
    }

    /**
     * 取得目前Header設定
     * 已轉移layoutCtrl
     */
    getHeader() {
        return this.layoutCtrl.getHeader();
    }

    /**
     * 取得目前Footer設定
     * 已轉移layoutCtrl
     */
    getFooter() {
        return this.layoutCtrl.getFooter();
    }


    /**
     * 取得傳入參數
     * 已轉移layoutCtrl
     */
    getParams() {
        return this.layoutCtrl.getParams();
    }

    /**
     * 取得由後一頁返回資料
     */
    getReturnData() {
        return this.layoutCtrl.getOtherParams();
    }

    /**
     * 取得由URL路徑傳入資料
     */
    getQueryParams(): Observable<Params> {
        return this.activatedRoute.queryParams;
    }


    /**
     * 回首頁
     */
    home() {
        this.push('home');
    }

    /**
     * 編輯返回事件 
     */
    editBack() {
        this.push('home');
    }

    /**
     * 返回動作
     */
    back(...args) {
        this.pop();
    }

    /**
     * 取得當前頁資訊
     */
    getNowPageSet() {
        return this.layoutCtrl.getNowPageSet();
    }

    /**
     * 取得前頁資訊
     */
    getPrePageSet() {
        return this.layoutCtrl.getPrePageSet();
    }

    // --------------------------------------------------------------------------------------------
    //     _____                 ______               _   
    //     / ____|               |  ____|             | |  
    //    | (___   __ ___   _____| |____   _____ _ __ | |_ 
    //     \___ \ / _` \ \ / / _ \  __\ \ / / _ \ '_ \| __|
    //     ____) | (_| |\ V /  __/ |___\ V /  __/ | | | |_ 
    //    |_____/ \__,_| \_/ \___|______\_/ \___|_| |_|\__
    // --------------------------------------------------------------------------------------------


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------


}
