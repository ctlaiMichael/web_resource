/**
 * 國外匯入匯款查詢
 */
import { Component, OnInit } from '@angular/core';
import { FormateService } from '@template/formate/formate.service';
import { Logger } from '@systems/system/logger/logger.service';
import { ForeignIrService } from '@pages/deposit/shared/foreign-ir.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Component({
    selector: 'app-ir-main',
    templateUrl: './ir-main.component.html',
    styleUrls: []
})

export class IrMainComponent implements OnInit {
    bookmarkData = []; // 頁籤設定
    searchBoxRule: any;
    searchInfoData: Array<any>;
    nowPageType = ''; // 現在頁面切換
    // request
    reqData = {
        id: '',
        show: 'resultBox', // 顯示查詢結果, 'resultBox':成功, 'customBox':自訂清單, 'errorBox':錯誤畫面(白箱)
        startDate: '',
        endDate: ''
    };
    showSearchBox = false; // 是否顯示自訂查詢
    customReqObj = {
        startDate: '',
        endDate: '',
        bookmark: {}
    };
    sort = 'DESC'; // 是否開啟排序 DESC遞減，ASC遞增，''不排序
    noteData: any; // 注意資訊
    // 錯誤處理相關
    errorMsg = ''; // 顯示白箱(錯誤訊息)
    private customIsError = false; // 自訂查詢結果是否異常

    constructor(
        private _mainService: ForeignIrService,
        private _formateServcie: FormateService,
        private _logger: Logger,
        private _formateService: FormateService,
        private _handleError: HandleErrorService
    ) { }

    ngOnInit() {
        // this._logger.step('ForeignIrDeposit', "into IrMainComponent");
        this._initEvent();
        this.noteData = this._mainService.getNoteData();
    }

    private _initEvent() {
        this._mainService.removeAllCache();
        // this._logger.log("into _initEvent");
        this.bookmarkData = this._mainService.getBookmark();
        // this._logger.log("_initEvent, bookmarkData:", this.bookmarkData);
        // // 查詢頁面條件
        this.searchBoxRule = this._mainService.getDateSet('custom');
        // 查詢頁面說明事項
        this.searchInfoData = [
            // 輸入查詢之起始日期及終止日期，新臺幣活期性存款可查詢本月及前兩個月內資料。
            'PG_DEPOSIT.OVERVIEW.SEARCH_INFO.INFO1'
        ];
    }

    /**
     * 排序
     */
    onSort() {
        this._logger.step('ForeignIrDeposit', "into onSort, nowPageType:", this.nowPageType);
        this.reqData.show = 'resultBox';
        this.errorMsg = ''; // 錯誤訊息清掉
        if (this.sort == 'DESC') {
            this.sort = 'ASC';
        } else {
            this.sort = 'DESC';
        }
    }

    /**
     * 頁籤回傳
     * @param e
     */
    onBookMarkBack(e) {
        this._logger.step('ForeignIrDeposit', 'onBookMarkBack', e);
        let page = '';
        let set_data: any;
        let set_id: any;
        if (typeof e === 'object') {
            if (e.hasOwnProperty('page')) {
                page = e.page;
            }
            if (e.hasOwnProperty('data')) {
                set_data = e.data;
                if (set_data.hasOwnProperty('id')) {
                    set_id = set_data.id;
                }
            }
        }

        if (set_id === 'custom') {
            this.nowPageType = 'custom'; // 切換自訂頁面
            this.showSearchBox = true; // 顯示自訂box
            this.customReqObj.bookmark = set_data;
            this.sort = 'DESC'; // 判斷點擊排序，切換頁籤時，代表沒有按下排序
            // this._logger.log("into custom, set_data:", this._formateServcie.transClone(set_data));
            // this._logger.log("into custom, customReqObj:", this._formateServcie.transClone(this.customReqObj));
            this.onChangePage('custom', this._formateServcie.transClone(set_data));
        } else {
            // this._logger.step('ForeignIrDeposit', "into another search");
            this.sort = 'DESC'; // 判斷點擊排序，切換頁籤時，代表沒有按下排序
            this.nowPageType = 'search'; // 查詢區塊頁面
            this.onChangePage(set_id, set_data);
        }
    }

    /**
     * 切換頁面
     * @param pageType 
     * @param pageData 
     */
    onChangePage(pageType?: string, pageData?: any) {
        this._logger.step('ForeignIrDeposit', "into onChangePage, pageType/pageData:", pageType, pageData);
        if (pageType === 'search-box') {
            this._logger.log("into pageType == search-box");
            this.nowPageType = 'custom'; // 切換自訂頁面
            this.showSearchBox = true; // 顯示自訂box
            this.reqData.show = 'customBox'; // 是否顯示查詢結果區塊
            this.errorMsg = ''; // 錯誤訊息清掉
            this.customIsError = false;
            pageType = 'custom';
        } else if (pageData.hasOwnProperty('search_data')) {
            // this._logger.log("into pageData has search_data");
            let show_deatil = 'resultBox'; // 顯示查詢結果區塊
            if (pageType === 'custom') {
                // this._logger.log("into pageType == custom");
                // 例外處理
                if (this.customReqObj.startDate == '' || this.customReqObj.endDate == '') {
                    this._logger.error("into customReqObj startDate,endDate error");
                    // this.reqData.show = false; //是否顯示查詢結果區塊
                    this.onChangePage('search-box', pageData); // 畫面顯示搜尋頁
                    return false;
                }
                // 例外處理(自訂為異常)
                if (this.customIsError) {
                    // 自訂起訖設定錯誤
                    this._logger.log("into customReqObj error before");
                    this.onChangePage('search-box', pageData); // 畫面顯示搜尋頁
                    return false;
                }
                pageData['search_data']['startDate'] = this.customReqObj.startDate; // customReqObj有設定過，塞入原日期
                pageData['search_data']['endDate'] = this.customReqObj.endDate;
                this._logger.log("customReqObj not empty, push date, pageData:", pageData);
            } else {
                if (pageData['startDate'] == '' || pageData['endDate'] == '') {
                    this._logger.log("into pageData startDate,endDate error");
                    // 若無起迄日期時的例外處理
                    this.onChangePage('search-box', pageData); // 畫面顯示搜尋頁
                    return false;
                }
            }
            this.showSearchBox = false; // 準備開始查詢後，隱藏搜尋欄
            this.reqData = {
                id: pageType,
                show: show_deatil,
                startDate: pageData['search_data']['startDate'],
                endDate: pageData['search_data']['endDate']
            };
            this._logger.step('ForeignIrDeposit', "ready to send, reqData:", this.reqData);
        }
        this.nowPageType = pageType; // 依照條件切換查詢頁面
    }

    /**
     * 查詢返回事件
     * @param e
     */
    onSearchBack(e) {
        this._logger.step('ForeignIrDeposit', "into onSearchBack, e/customReqObj:", e, this.customReqObj);
        let set_data: any;
        if (typeof e === 'object' && e.hasOwnProperty('data')) {
            set_data = e.data;
        }
        // req有出來後處理
        let pageData = this._formateServcie.transClone(this.customReqObj.bookmark);
        this._logger.step('ForeignIrDeposit', "pageData:", pageData);
        if (set_data.startDate === this.customReqObj.startDate &&
            set_data.endDate === this.customReqObj.endDate
        ) {
            // 無改變處理
            pageData['search_data']['startDate'] = this.customReqObj.startDate;
            pageData['search_data']['endDate'] = this.customReqObj.endDate;
            // this._logger.log("startDate,endDate not change,  startDate", pageData['search_data']['startDate']);
            // this._logger.log("startDate,endDate not change,  endDate", pageData['search_data']['endDate']);
        } else {
            // 重新查詢
            pageData['search_data']['startDate'] = set_data.startDate;
            pageData['search_data']['endDate'] = set_data.endDate;
            this.customReqObj.startDate = set_data.startDate;
            this.customReqObj.endDate = set_data.endDate;
        }
        this.onChangePage('custom', pageData);
    }

    // 自訂查詢錯誤返回(接收)
    /**
     * 
     * @param e 
     */
    onSearchErrorBack(e) {
        this._logger.log("into onSearchErrorBack, e:", e);
        this._logger.log("into onSearchBack, customReqObj:", this.customReqObj);
        let error_data: any;
        if (typeof e === 'object' && e.hasOwnProperty('data')) {
            error_data = e.data;
        }
        if (e.page == 'search-box') {
            this._handleError.handleError({
                title: 'ERROR.TITLE',
                content: error_data.msg
            });
        }
    }

    /**
     * 重新查詢
     */
    onReStartQuery() {
        this._logger.step('ForeignIrDeposit', "into onReStartQuery");
        this.onChangePage("search-box");
    }

    /**
     * 子層返回事件(分頁)
     * @param e
     */
    onPageBackEvent(e) {
        this._logger.step('ForeignIrDeposit', 'onPageBackEvent', e);
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
        if (this.nowPageType == 'custom') {
            this.customIsError = false; // 自訂查詢成功
        }
    }

    /**
     * 失敗回傳(分頁)
     * @param error_obj 失敗物件
     */
    onErrorBackEvent(e) {
        this._logger.step('ForeignIrDeposit', 'onErrorBackEvent', e);
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
        // 下方顯示白箱
        if (page == 'list') { // 列表頁錯誤才顯示白箱
            this.reqData.show = 'errorBox';
            this.errorMsg = errorObj.content; // 給錯誤訊息
        }
        if (this.nowPageType == 'custom') {
            this.customIsError = true;
        }
        errorObj['type'] = 'dialog';
        this._handleError.handleError(errorObj);
    }

}