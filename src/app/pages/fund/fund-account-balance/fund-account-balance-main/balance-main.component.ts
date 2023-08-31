/**
 * 現值查詢
 */
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormateService } from '@template/formate/formate.service';
import { Logger } from '@systems/system/logger/logger.service';
import { PaginatorCtrlService } from '@template/paginator/paginator-ctrl.srevice';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { BalanceDetailComponent } from '../fund-account-balance-detail/balance-detail.component';
import { FundAccountBalanceService } from '@pages/fund/shared/fund-account-balance.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

@Component({
    selector: 'app-balance-main',
    templateUrl: './balance-main.component.html',
    styleUrls: []
})

export class BalanceMainComponent implements OnInit {
    // bookmarkData = []; // 頁籤設定
    // searchBoxRule: any;
    // searchInfoData: Array<any>;
    nowPageType = ''; // 現在頁面切換
    dataTime: string; // 查詢時間
    // request
    reqData = {
        id: '',
        show: 'resultBox', // 顯示查詢結果, 'resultBox':成功, 'customBox':自訂清單, 'errorBox':錯誤畫面(白箱)
    };
    sort = 'DESC'; // 是否開啟排序 DESC遞減，ASC遞增，''不排序
    retry = 0;
    noteData: any; // 注意資訊
    expandFlag = false; // 是否全部展開
    expandStr = 'BTN.UNFOLD';

    // 分頁機制相關 Start
    pageCounter = 1; // 當前頁次
    totalPages = 0; // 全部頁面
    // 搬過來的
    infoData: any = {}; // SPEC05030102 存款帳戶明細查詢(資訊)
    listData: any = []; // SPEC05030102 存款帳戶明細查詢(明細)
    contentData = {}; // 選擇的明細資料



    @ViewChild('pageBox', { read: ViewContainerRef }) pageBox: ViewContainerRef; // 動態生成(自訂)
    private nowAppendBox: any;
    // 錯誤處理相關
    errorMsg = ''; // 顯示白箱(錯誤訊息)
    defaultAcct = ''; // 取得預設帳號(不一定有)
    hasInit = false; // 是否初始化
    godetail = false; // 控制頁面顯示
    errorboxFlag = false; // 控制白箱

    constructor(
        private _mainService: FundAccountBalanceService,
        private _formateServcie: FormateService,
        private _logger: Logger,
        private paginatorCtrl: PaginatorCtrlService,
        private _handleError: HandleErrorService,
        private _headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService
    ) { }

    ngOnInit() {
        this._logger.log("godetail:", this.godetail);
        this._logger.log("into AccountMainComponent");
        this._initEvent();
        this._logger.log("godetail:", this.godetail);
    }

    private _initEvent() {
        this._mainService.removeAllCache();
        this.hasInit = true;
        this._logger.log("godetail:", this.godetail);
    }

    /**
     * 排序
     */
    onSort() {
        this._logger.log("into onSort, nowPageType:", this.nowPageType);
        this.reqData.show = 'resultBox';
        this.errorMsg = ''; // 錯誤訊息清掉
        this._resetPage();
        if (this.sort == 'DESC') {
            this.sort = 'ASC';
        } else {
            this.sort = 'DESC';
        }
    }

    /**
     * 展開
     */
    onOpen() {
        if (!!this.expandFlag) {
            this.expandStr = 'BTN.UNFOLD';
            this.expandFlag = false;
        } else {
            this.expandStr = 'BTN.COLLAPSE';
            this.expandFlag = true;
        }
        this._mainService.changeExpandSubject(this.expandFlag);
    }

    /**
     * Scroll Event
     * @param next_page
     */
    onScrollEvent(next_page) {
        this._logger.log("into onScrollEvent, this.reqData:", this.reqData);
        let appendBox: any;
        appendBox = this.pageBox;
        if (!appendBox && this.reqData.show != 'resultBox') {
            this._logger.log('Deposit', 'stop scroll');
            return false;
        }
        this.nowAppendBox = appendBox;
        this._logger.log('Deposit', 'onScrollEvent', this.pageCounter, 'totalPages', this.totalPages, 'next_page', next_page);
        this.pageCounter = next_page;
        let componentRef: any = this.paginatorCtrl.addPages(this.nowAppendBox, BalanceDetailComponent);
        componentRef.instance.setData = this.reqData;
        componentRef.instance.page = next_page;
        componentRef.instance.sort = this.sort;
        componentRef.instance.retry = this.retry;
        componentRef.instance.backPageEmit.subscribe(event => this.onPageBackEvent(event));
        componentRef.instance.errorPageEmit.subscribe(event => this.onErrorBackEvent(event));
    }

    /**
     * 子層返回事件(分頁)
     * @param e
     */
    onPageBackEvent(e) {
        this._logger.log('Deposit', 'onPageBackEvent123', e);
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
            if (e.hasOwnProperty('infoData')) {
                this.infoData = e.infoData;
            }
            if (e.hasOwnProperty('listData')) {
                this.listData = e.listData;
            }
            if (e.hasOwnProperty('contentData')) {
                this.contentData = e.contentData;
            }
            if (e.hasOwnProperty('godetail')) {
                this.godetail = true;

            }
            if (e.hasOwnProperty('nodetail')) {
                this.godetail = false;
                // this.pageCounter = 1;
                this._headerCtrl.setLeftBtnClick(() => {
                    this.navgator.editBack();
                });
            }
        }

        // 重做一筆
        if (page == 'content' && pageType == 'retry') {
            this._mainService.removeAllCache();
            this.sort = 'DESC';
            this.pageCounter = 1;
            this.retry = this.retry + 1;
            this._resetPage();
        }

        // 列表頁返回
        if (page === 'list-page' && pageType == 'back') {
            this._logger.log("onPageBackEvent back, tmp_data:", tmp_data);
            let infoData = this._formateServcie.checkObjectList(tmp_data, 'infoData');
            // 設定頁面資料，若為第一頁
            if (this.pageCounter == 1) {
                this._logger.log("onPageBackEvent back, pageCounter == 1");
                if (tmp_data.hasOwnProperty('dataTime')) {
                    this.dataTime = tmp_data['dataTime'];
                }
                // 之後須改版為下方註解
                if (tmp_data.hasOwnProperty('page_info')) {
                    this.totalPages = tmp_data['page_info']['totalPages']; // 總頁數只拿一次
                    this._logger.log("totalPages:", this.totalPages, tmp_data);
                }
            }
            return false;
        }
    }

    /**
     * 失敗回傳(分頁)
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
        this._logger.log("errorObj:", errorObj);
        // 下方顯示白箱
        // this.reqData.show = 'errorBox';
        this.errorMsg = errorObj.content; // 給錯誤訊息
        this.errorboxFlag = true;
        this.hasInit = false;
        this._logger.log("onErrorBackEvent, pageCounter:", this.pageCounter);
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 重設頁面
     */
    private _resetPage() {
        this._logger.log("into _resetPage");
        this.pageCounter = 1;
        this.totalPages = 0;
        this.dataTime = '';
        if (this.nowAppendBox) {
            this.nowAppendBox.clear();
        }
    }

}
