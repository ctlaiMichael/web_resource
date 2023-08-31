/**
 * 畫面控制
 * 所有框架資料暫存位置(header、footer)
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs';
// --- config --- //
import { ROUTING_PATH, ROUTING_DEFAULT_PATH } from '@conf/menu/routing-path';
import { HeaderOptions } from '@systems/route/layout/header/header-options';
import { FooterOptions } from '@systems/route/layout/footer/footer-options';
// --- library --- //
import { SessionStorageService } from '@lib/storage/session-storage.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { HeaderCtrlService } from './header/header-ctrl.service';
import { FooterCtrlService } from './footer/footer-ctrl.service';
import { UiContentService } from '@systems/route/layout/ui-content/ui-content.service';
// --- page ctrl --- //

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class LayoutCtrlService {

    authErrorSubject: Subject<boolean> = new Subject<boolean>(); // 權限錯誤物件
    routeChangeSubject: Subject<any> = new Subject<any>(); // 路徑變換偵測
    closePopupSubject: Subject<any> = new Subject<any>();
    openMenuChange: Subject<any> = new Subject<any>(); // Menu控制

    // -- 實體返回控制 -- //
    disableNativeReturnSubject: Subject<boolean> = new Subject<boolean>();
    private disableReturnCount: number;

    private haveLoad = false;
    // -- route路徑資料 -- //
    private routeParams: any = {}; // route params參數設定
    private history = []; // route history with path string
    private historyObj = []; // route history with obj
    private historyNext = []; // route history with path string
    private historyNextObj = []; // route history Next with obj
    private nowPageData: any = {}; // 當前頁參數設定值
    private prePageData: any = {}; // 前一頁參數設定值

    private headerOption: any; // header option當前/上一個設定
    private footerOption: any; // footer option當前/上一個設定
    private menuOption: any; // footer option當前/上一個設定

    constructor(
        private router: Router,
        private _logger: Logger,
        // --- library --- //
        private _checkService: CheckService,
        private _formateService: FormateService,
        private session: SessionStorageService,
        // --- page ctrl --- //
        private headerCtrl: HeaderCtrlService,
        private footerCtrl: FooterCtrlService,
        private unContent: UiContentService
    ) {
        this.init();
    }

    // --------------------------------------------------------------------------------------------
    //                                       __          __   
    // ___________     ____   ____     _____/  |________|  |  
    // \____ \__  \   / ___\_/ __ \  _/ ___\   __\_  __ \  |  
    // |  |_> > __ \_/ /_/  >  ___/  \  \___|  |  |  | \/  |__
    // |   __(____  /\___  / \___  >  \___  >__|  |__|  |____/
    // |__|       \//_____/      \/       \/                     PART_BOX: pate ctrl 頁面控制
    // --------------------------------------------------------------------------------------------

    /**
     * init event
     * router subscribe全APP僅能一個
     */
    private init() {
        if (this.haveLoad) {
            return false;
        }
        this.disableReturnCount = 0;
        this.initHistory();
        this.router.events.subscribe((val) => {
            // 轉址結束事件
            this._setRouteChange(val);
        });

        // -- header 事件改變 -- //
        this.headerCtrl.updateOptionSubject.subscribe((value: any) => {
            // 修改header設定
            let headerOption = this.getHeader();
            let options = { ...headerOption, ...value };
            // this._logger.step('HeaderCtrl', 'update option in layout', headerOption, value);
            this.headerOption.pre = headerOption;
            this.headerOption.last = options;
            this.nowPageData.header = options;
        });
        // -- footer 事件改變 -- //
        this.footerCtrl.changeFooterOption.subscribe((value: any) => {
            const footerOption = this.getFooter();
            let options = { ...footerOption, ...value };
            this._logger.step('FooterCtrl', 'update option in layout', footerOption, value);
            this.footerOption.pre = footerOption;
            this.footerOption.last = options;
            this.nowPageData.footer = options;
        });
        // -- menu -- //
        this.menuOption = {
            open: false
        };

        this.haveLoad = true;
    }


    /**
     * route 轉址結束事件
     * 執行router.navigate必觸發
     * @param val 
     */
    private _setRouteChange(val) {
        if (val instanceof NavigationStart) {
            // this._logger.step('path', 'NavigationStart', val);
            let urlAfterRedirects = this._formateService.checkField(val, 'url');
            // this._logger.log('path', 'NavigationEnd lastpath', val, urlAfterRedirects);
            let last_path = this.getLastPath();
            if (last_path == '' && urlAfterRedirects != ROUTING_DEFAULT_PATH) {
                this.resetPage(urlAfterRedirects);
            }
        } else if (val instanceof NavigationEnd) {
            this._logger.step('path', 'NavigationEnd', val);
            let urlAfterRedirects = this._formateService.checkField(val, 'urlAfterRedirects');
            if (typeof urlAfterRedirects != 'string') {
                urlAfterRedirects = '';
            }
            urlAfterRedirects = urlAfterRedirects.replace('/', '');
            let last_path = this.getLastPath(); // 因為已經做changePath, 當前path急為目前路徑的設定
            this._logger.log('path', 'NavigationEnd lastpath', last_path);

            let set_header = this.getHeader();
            let set_footer = this.getFooter();

            // this._logger.step('HeaderCtrl', 'set header in layout');
            this.headerCtrl.setOption(set_header, true);
            this.footerCtrl.setFooterOption(set_footer);
            this.routeChangeSubject.next(last_path); // 路徑變換
        }
    }

    /**
     * popup控制
     */
    closePopup() {
        this.closePopupSubject.next();
    }

    /**
     * android實體返回按鈕控制
     */
    disableNativeReturn(disable: boolean) {
        if (disable) {
            this.disableReturnCount += 1;
            this.disableNativeReturnSubject.next(true);
        } else {
            this.disableReturnCount -= 1;
            if (this.disableReturnCount <= 0) {
                this.disableReturnCount = 0;
                this.disableNativeReturnSubject.next(false);
            }
        }

    }

    // --------------------------------------------------------------------------------------------
    //  _                    _                
    // | |                  | |               
    // | |__   ___  __ _  __| | ___  ___ _ __ 
    // | '_ \ / _ \/ _` |/ _` |/ _ \/ _ \ '__|
    // | | | |  __/ (_| | (_| |  __/  __/ |   
    // |_| |_|\___|\__,_|\__,_|\___|\___|_|     PART_BOX: header ctrl 頁面控制
    // --------------------------------------------------------------------------------------------


    /**
     * 設定header
     */
    setHeaderOption(option) {
        this.headerCtrl.setOption(option, false);
    }

    /**
     * 控制header的按鈕點擊事件
     * @param btn_type 
     */
    changeHeaderClick(btn_type: string, e: any) {
        switch (btn_type) {
            case 'left':
                this.headerCtrl.setLeftBtnClick(e);
                break;
            case 'right':
                this.headerCtrl.setRightBtnClick(e);
                break;
            default:
                // no click
                break;
        }

    }

    /**
     * 控制header的按鈕點擊觸發事件
     * @param btn_type 
     */
    onHeaderClick(btn_type: string, e?: any) {
        switch (btn_type) {
            case 'left':
                this.headerCtrl.onLeftClickEvent(e);
                break;
            case 'right':
                this.headerCtrl.onRightClickEvent(e);
                break;
            default:
                // no click
                break;
        }
    }

    // --------------------------------------------------------------------------------------------
    //      __            _            
    //     / _|          | |           
    //    | |_ ___   ___ | |_ ___ _ __ 
    //    |  _/ _ \ / _ \| __/ _ \ '__|
    //    | || (_) | (_) | ||  __/ |   
    //    |_| \___/ \___/ \__\___|_|   PART_BOX: footer ctrl 頁面控制
    // --------------------------------------------------------------------------------------------

    /**
     * 開啟footer
     */
    openFooter() {
        this.footerCtrl.openFooter();
    }

    /**
     * 關閉footer
     */
    closeFooter() {
        this.footerCtrl.closeFooter();
    }



    // --------------------------------------------------------------------------------------------    
    //   _ __ ___   ___ _ __  _   _ 
    //  | '_ ` _ \ / _ \ '_ \| | | |
    //  | | | | | |  __/ | | | |_| |
    //  |_| |_| |_|\___|_| |_|\__,_|   PART_BOX: menu ctrl 頁面控制
    // --------------------------------------------------------------------------------------------

    /**
     * 取得menu 開啟狀態
     */
    getMenuStatus() {
        return (!!this.menuOption.open) ? true : false;
    }

    /**
     * 開啟menu選單
     */
    openMenu() {
        this.menuOption.open = true;
        this.openFooter();
        this.openMenuChange.next(true);
    }

    /**
     * 關閉menu選單
     */
    closeMenu() {
        this.menuOption.open = false;
        // header set 要還原原頁面設定
        let pre_header = this._formateService.checkObjectList(this.headerOption, 'pre');
        if (!!pre_header) {
            this.headerCtrl.setOption(pre_header);
        }
        // 幫忙關footer
        let footer_status = this._formateService.checkObjectList(this.footerOption, 'pre.displayFooter');
        if (typeof footer_status != 'undefined' && footer_status == false) {
            this.closeFooter();
        }
        this.openMenuChange.next(false);
    }


    // --------------------------------------------------------------------------------------------
    //                               _________   __         .__   
    //   ___________     ____   ____ \_   ___ \_/  |________|  |  
    //   \____ \__  \   / ___\_/ __ \/    \  \/\   __\_  __ \  |  
    //   |  |_> > __ \_/ /_/  >  ___/\     \____|  |  |  | \/  |__
    //   |   __(____  /\___  / \___  >\______  /|__|  |__|  |____/
    //   |__|       \//_____/      \/        \/                   
    // --------------------------------------------------------------------------------------------

    /**
     * 找outlet為primary的route的data
     * @param route_obj 要找的物件
     * @param key_name 要找的資料
     */
    scrollTop(obj?: any) {
        if (typeof obj === 'undefined') {
            const bodyScrollTop: any = document.getElementsByTagName('section');
            if (bodyScrollTop.length > 0) {
                obj = bodyScrollTop[0];
            }
        }
        if (typeof obj !== 'undefined') {
            obj.scrollTop = 0;
        }
    }


    // --------------------------------------------------------------------------------------------
    //     ________        __    ________          __          
    //     /  _____/  _____/  |_  \______ \ _____ _/  |______   
    //    /   \  ____/ __ \   __\  |    |  \\__  \\   __\__  \  
    //    \    \_\  \  ___/|  |    |    `   \/ __ \|  |  / __ \_
    //     \______  /\___  >__|   /_______  (____  /__| (____  /
    //            \/     \/               \/     \/          \/  PART_BOX: get data 取資料
    // --------------------------------------------------------------------------------------------

    /**
     * 取得route設定資料
     * @param path 
     */
    getRouteSet(path: string, subindex?: string) {
        let search = path;
        if (typeof subindex != 'undefined' && !!subindex) {
            search += '.' + subindex;
        }
        let output = this._formateService.checkObjectList(ROUTING_PATH, search);
        return output;
    }

    /**
     * 取得最後一頁路徑
     */
    getLastPath(): string {
        let path = '';
        path = this._formateService.checkField(this.nowPageData, 'path');
        return path;
    }

    /**
     * 取得當前頁面資料
     */
    getNowPageSet() {
        let output = this._formateService.transClone(this.nowPageData);
        return output;
    }

    /**
     * 取得前一頁頁面資料
     */
    getPrePageSet() {
        let output = this._formateService.transClone(this.prePageData);
        return output;
    }

    /**
     * 取得目前Header設定
     */
    getHeader(type?: string) {
        this._logger.step('path', 'getHeader', this.headerOption);
        // let output = this._formateService.checkObjectList(this.nowPageData, 'header');
        let output = {};
        if (!type) {
            type = 'last';
        }
        switch (type) {
            case 'base':
                output = this._formateService.checkObjectList(this.headerOption, 'base');
                break;
            case 'pre':
                output = this._formateService.checkObjectList(this.headerOption, 'pre');
                break;
            case 'last':
            default:
                // 同nowPageData.header
                output = this._formateService.checkObjectList(this.headerOption, 'last');
                break;
        }
        return (!!output) ? output : {};
    }


    /**
     * 取得目前Footer設定
     */
    getFooter(type?: string) {
        this._logger.step('path', 'getHeader', this.footerOption);
        // let output = this._formateService.checkObjectList(this.nowPageData, 'footer');
        let output = {};
        if (!type) {
            type = 'last';
        }
        switch (type) {
            case 'base':
                output = this._formateService.checkObjectList(this.footerOption, 'base');
                break;
            case 'pre':
                output = this._formateService.checkObjectList(this.footerOption, 'pre');
                break;
            case 'last':
            default:
                // 同nowPageData.footer
                output = this._formateService.checkObjectList(this.footerOption, 'last');
                break;
        }
        return (!!output) ? output : {};
    }

    /**
     * 取得傳入參數
     */
    getParams(path?: string) {
        this._logger.step('path', 'getParams');
        let output = null;
        if (this._checkService.checkEmpty(path)) {
            output = this._formateService.checkObjectList(this.nowPageData, 'params');
        } else {
            output = this._formateService.checkObjectList(this.routeParams, path + '.params');
        }
        // this._logger.step('path', 'getParams data', this.routeParams, path);
        return output;
    }

    /**
     * 取得傳入參數(非route設定的參數，而是暫存起來的變數)
     */
    getOtherParams(path?: string) {
        this._logger.step('path', 'getOtherParams');
        let output = null;
        if (!this._checkService.checkEmpty(path)) {
            output = this._formateService.checkObjectList(this.nowPageData, 'otherParams');
        } else {
            output = this._formateService.checkObjectList(this.routeParams, path + '.otherParams');
        }
        // this._logger.step('path', 'getParams data', this.routeParams, path);
        return output;
    }


    // /**
    //  * 取得操作頁面記錄 => 不提供此介面
    //  */
    // getHistory(): string[] {
    //     return this.history;
    // }

    // /**
    //  * 取得操作記錄長度 => 不提供此介面
    //  */
    // getHistoryLength(): number {
    //     return this.history.length;
    // }


    // --------------------------------------------------------------------------------------------
    //     _____ _               _    ______               _   
    //     / ____| |             | |  |  ____|             | |  
    //    | |    | |__   ___  ___| | _| |____   _____ _ __ | |_ 
    //    | |    | '_ \ / _ \/ __| |/ /  __\ \ / / _ \ '_ \| __|
    //    | |____| | | |  __/ (__|   <| |___\ V /  __/ | | | |_ 
    //     \_____|_| |_|\___|\___|_|\_\______\_/ \___|_| |_|\__   PART_BOX: check evnet 檢核資料
    // --------------------------------------------------------------------------------------------

    /**
     * 檢核是否有前一頁
     */
    checkHaveHistory() {
        return (this.history.length > 0) ? true : false;
    }


    // --------------------------------------------------------------------------------------------
    //     _____                 ______               _   
    //     / ____|               |  ____|             | |  
    //    | (___   __ ___   _____| |____   _____ _ __ | |_ 
    //     \___ \ / _` \ \ / / _ \  __\ \ / / _ \ '_ \| __|
    //     ____) | (_| |\ V /  __/ |___\ V /  __/ | | | |_ 
    //    |_____/ \__,_| \_/ \___|______\_/ \___|_| |_|\__  PART_BOX: save event 儲存資料
    // --------------------------------------------------------------------------------------------

    /**
     * 錯誤權限控制subobject
     */
    authError() {
        this.authErrorSubject.next();
    }

    /**
     * 切換頁面並清空記錄
     * @param path 路徑
     */
    setRoot(path: string) {
        this.history = [];
    }


    /**
     * 設定route參數
     * (對應routing-path.ts 只保留最後異動的參數設定)
     */
    setParams(data: any, path?: string) {
        if (!this._checkService.checkEmpty(path)) {
            path = this.getLastPath();
        }
        // 只保留最後異動的參數設定
        this.routeParams[path] = data;
    }

    /**
     * 刪除參數
     */
    deleteParams(path?: string) {
        if (!this._checkService.checkEmpty(path)) {
            path = this.getLastPath();
        }
        let searchParams = this.getParams(path);
        if (!!searchParams) {
            delete this.routeParams[path];
        }
    }

    /**
     * 改變路徑與記錄歷史 (old name: pushHistory)
     * @param path 
     */
    changePath(path, othreSet?: object) {
        if (this.getMenuStatus()) {
            // 沒關menu要關閉 (不設定再功能選單上，因為路徑不存在時功能選單不關閉)
            this.closeMenu();
        }
        this._logger.log('path', 'changePath');
        let prePageData = this.savePrePageSet(); // 暫存當前頁面資訊
        this.history.push(path);
        // history set
        let output: any = {
            'path': path,
            'params': {},
            'otherParams': {}, // 其他非params的參數
            'header': {},
            'footer': {}
        };
        this._logger.log('changePath output', othreSet);
        output.params = this._formateService.checkObjectList(othreSet, 'params');
        output.otherParams = this._formateService.checkObjectList(othreSet, 'otherParams');
        let headerOption = this._formateService.checkObjectList(othreSet, 'routingPathSet.header');
        let footerOption = this._formateService.checkObjectList(othreSet, 'routingPathSet.footer');
        output.header = { ...new HeaderOptions(), ...headerOption };
        output.footer = { ...new FooterOptions(), ...footerOption };
        this._logger.log('changePath output', output);
        this.historyObj.push(output);
        this.setParams(output, path);
        this.saveHistory();

        this.prePageData = prePageData;
        this.nowPageData = output;
        this.headerOption = {
            'base': output.header, // 初始值
            'pre': output.header, // 前一個
            'last': output.header // 最新值
        };
        this.footerOption = {
            'base': output.footer, // 初始值
            'pre': output.footer, // 前一個
            'last': output.footer // 最新值
        };
        return {
            'nowPage': output,
            'prePageData': prePageData
        };
    }

    /**
     * 回前一歷史頁面
     * 
     */
    popHistory() {
        // 刪除最近的一個物件
        const remove_path = this.history.pop();
        const remove_obj = this.historyObj.pop();
        this.historyNext = [remove_obj.path];
        this.historyNextObj = [remove_obj];
        // 當前頁面
        if (this.historyObj.length > 0) {
            const pathIndex = this.historyObj.length - 1;
            this.nowPageData = this.historyObj[pathIndex];
        } else {
            this.nowPageData = {};
        }
        // 前一頁面
        if (this.historyObj.length > 1) {
            const prepathIndex = this.historyObj.length - 2;
            this.prePageData = this.historyObj[prepathIndex];
        } else {
            this.prePageData = {};
        }
        this.saveHistory();
        this.deleteParams(remove_path);
        return {
            'remove': remove_obj,
            'now': this.nowPageData,
            'pre': this.prePageData
        };
    }

    /**
     * 回到前一頁指定頁面
     */
    popToHistory(path?: string) {
        if (!this._checkService.checkEmpty(path, true)) {
            return this.popHistory();
        }
        // 指定頁面
        const remove_path = this.history.pop();
        const remove_obj = this.historyObj.pop();
        let lastPath = this.getLastPath();
        let goToPath = lastPath;

        let slice_index = -1;
        this.historyObj.some((item, item_index) => {
            let item_path = this._formateService.checkField(item, 'path');
            if (item_path == path) {
                slice_index = item_index + 1;
                return true; // is same break;
            } else {
                return false; // is same continue;
            }
        });
        let pre_path = this.history;
        let pre_list = this.historyObj;
        let next_path = this.historyNext;
        let next_list = this.historyNextObj;
        if (slice_index > -1) {
            pre_path = this.history.slice(0, slice_index);
            pre_list = this.historyObj.slice(0, slice_index);
            next_path = this.historyNext.slice(slice_index);
            next_list = this.historyNextObj.slice(slice_index);
        }
        this.history = pre_path;
        this.historyObj = pre_list;
        this.historyNext = next_path;
        this.historyNextObj = next_list;

        // 當前頁面
        if (this.historyObj.length > 0) {
            const pathIndex = this.historyObj.length - 1;
            this.nowPageData = this.historyObj[pathIndex];
        } else {
            this.nowPageData = {};
        }
        // 前一頁面
        if (this.historyObj.length > 1) {
            const prepathIndex = this.historyObj.length - 2;
            this.prePageData = this.historyObj[prepathIndex];
        } else {
            this.prePageData = {};
        }

        return {
            'remove': {},
            'now': this.nowPageData,
            'pre': this.prePageData
        };
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------



    /**
     * 歷史紀錄清空
     */
    private initHistory() {
        this.history = [];
        this.historyObj = [];
        this.historyNext = [];
        this.historyNextObj = [];
        this.routeParams = {};
        this.nowPageData = {};
        this.prePageData = {};
        // 若有多個index.html才需要以下寫法(現行無)
        // this.history = this.session.getObj('history') || [];
    }

    /**
     * 同步session
     */
    private saveHistory() {
        this.session.setObj('history', this.history);
        this.session.setObj('historyObj', this.historyObj);
    }


    /**
     * 將當前資訊暫存為前頁資訊
     * 透過push到指定頁面後，history都會被改變，prePageData就會是前一頁了
     */
    private savePrePageSet() {
        this._logger.log('path', 'savePrePageSet');
        let output: any = {
            path: '',
            params: {},
            otherParams: {},
            header: {},
            footer: {}
        };
        let lastPath = this.getLastPath();
        // path
        output.path = lastPath;
        // params
        let pre_params = this.getParams();
        if (!!pre_params) {
            output.params = pre_params;
        }
        let pre_other_params = this.getOtherParams();
        if (!!pre_other_params) {
            output.otherParams = pre_other_params;
        }
        // header
        output.header = this.getHeader();
        // footer
        output.footer = this.getFooter();
        return output;
    }


    /**
     * 首次進入檢核(沒有執行navgator.service::push)
     */
    private resetPage(url?: string) {
        this._logger.step('path', 'reset Page start', url);
        let path = '';
        // route 啟動事件
        if (path == '') {
            // 從ROUTING_PATH慢慢找...
            let tk: any;
            for (tk in ROUTING_PATH) {
                if (typeof ROUTING_PATH[tk] != 'object' || !ROUTING_PATH[tk]) {
                    continue;
                }
                let tmp_route = ROUTING_PATH[tk];
                let tmp_route_url = this._formateService.checkObjectList(tmp_route, 'url');
                let url_nomain = url.replace(/\/main$/g, '');
                if (tmp_route_url == url) {
                    path = tk;
                    break;
                }
                if (tmp_route_url == url_nomain) {
                    path = tk;
                    break;
                }
            }
            if (path == '/') {
                path = '';
            }
        }
        if (path == '') {
            path = 'home';
        }
        let routingPath = this._formateService.checkObjectList(ROUTING_PATH, path);
        let navParams = {};
        let otherParams = {};
        if (!!routingPath['urlParams'] && typeof routingPath['urlParams'] === 'object') {
            navParams = { ...navParams, ...routingPath['urlParams'] }; // 採用部份取代方式
        }

        this._logger.step('path', 'reset Page', path);
        this.changePath(path, {
            'params': navParams,
            'routingPathSet': routingPath,
            'otherParams': otherParams
        });

    }



}