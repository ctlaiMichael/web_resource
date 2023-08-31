/**
 * 理財妙管家
 */
import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AutoFundRedeemService } from '@pages/fund/shared/auto-fund-redeem.service';

@Component({
    selector: 'app-auto-fund-redeem-detail',
    templateUrl: './auto-fund-redeem-detail.component.html',
    styleUrls: []
})

export class FundRedeemDetailComponent implements OnInit, OnChanges, OnDestroy {
    @Input() setData: any; // api 05030102 request
    @Input() sort: string; // 是否開啟排序 DESC遞減，ASC遞增，''不排序
    @Input() page: string | number = 1; // 當下頁數
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    infoData: any = {}; // PEC05030102 存款帳戶明細查詢(資訊)
    listData: any = []; // SPEC05030102 存款帳戶明細查詢(明細)
    showData = false;
    private nowSort = '';
    private isFirstInit = true; // true 是第一次近來
    private nowSearch = '';

    contentData = {}; // 選擇的明細資料


    constructor(
        private mainService: AutoFundRedeemService,
        private _logger: Logger,
        private _headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService
    ) { }

    ngOnInit() {
        this.doInit();
    }

    // testgodetil
    clickdetail(item) {
        this._logger.log("into onGoDetail, item:", item);
        this.contentData = item;
        let output = {
            'infoData': this.infoData,
            'listData': this.listData,
            'contentData': this.contentData,
            'godetail': true
        };

        this.backPageEmit.emit(output);
    }


    // 排序參數有改變，就觸發ngOnChanges去變更排序
    ngOnChanges() {
        this.doInit();
    }

    ngOnDestroy() {
        // 刪除監聽物件
    }

    /**
     * 子層返回事件(接收第三層)
     * @param e
     */
    onPageBackEvent(e) {
        this._logger.log('Deposit', 'onPageBackEvent', e);
        this._logger.log('fund', 'onPageBackEvent, detail back', e);
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
    }


    /**
     * 重新設定page data 子層返回事件  (回傳第一層)
     * @param item
     */
    onBackPageData(item) {
        let output = {
            'page': 'list-page',
            'type': 'back',
            'data': item,
        };
        this._logger.log("intoooooooo onBackPageData, output:", output);
        this.backPageEmit.emit(output);
    }

    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onErrorPageData(item) {
        let output = {
            'page': 'list-page',
            'type': 'back',
            'data': item
        };
        this._logger.step('Deposit', 'detail back', item);
        this._logger.log("into onErrorPageData, output:", output);
        this.errorPageEmit.emit(output);
    }


    // 初始化事件
    private doInit() {
        this._logger.log("ngOnInit into IrDetailComponent, setData:", this.setData);
        this._logger.log("ngOnInit into IrDetailComponent, sort:", this.sort);
        let reqData = {
        };
        this.nowSort = (this.sort) ? this.sort : '';
        //處理頁數
        if (typeof this.page === 'undefined') {
            this.page = 1;
        } else {
            // tslint:disable-next-line:radix
            this.page = parseInt(this.page.toString());
        }

        // 檢核是否查資料
        let check_research = this.checkReSearch(reqData);
        if (!check_research) {
            this._logger.log("AccountDetail", "no search");
            return false;
        }
        this._logger.log("ready to send api");
        this.showData = false;
        this.listData = [];
        //   //Api SPEC05030102-存款帳戶明細查詢(明細)
        this.getListData(reqData, this.page, this.sort);
    }

    // Api SPEC05030102-存款帳戶明細
    private getListData(reqData, page, sort?: string) {
        let paginator = {
            pageNumber: page.toString(),
            sortDirection: sort
        };
        let option = {};
        this._logger.log("getListData, paginator:", paginator);
        this.mainService.getListData(reqData, paginator, option).then(
            (result) => {
                this.infoData = result.infoData;
                this.listData = result.data;
                this.showData = true;
                this._logger.log("getListData success, infoData:", this.infoData);
                this.onBackPageData(result); // 回傳總計資訊給父層顯示
            },
            (errorObj) => {
                this._logger.log("getListData error, errorObj:", errorObj);
                errorObj['type'] = 'message';
                this.showData = false;
                this.onErrorPageData(errorObj); // 將錯誤資訊給父層
            }
        );
    }


    /**
     * 依功能調整檢核是否查資料
     * @param reqData 
     */
    private checkReSearch(reqData) {
        let new_search = [this.sort, this.page].join('_');
        this._logger.log("new_search:", new_search);
        if (new_search == this.nowSearch) {
            this._logger.log("new_search == this.nowSearch");
            // 欄位相同不重查
            return false;
        }
        this.nowSearch = new_search;
        this._logger.log("new_search != this.nowSearch");
        return true;
    }

}