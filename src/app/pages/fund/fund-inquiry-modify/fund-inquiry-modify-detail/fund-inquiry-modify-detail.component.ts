/**
 * 理財妙管家
 */
import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { DepositAccountDetailService } from '@pages/deposit/shared/deposit-account-detail.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { FundInquiryModifyService } from '@pages/fund/shared/fund-inquiry-modify.service';

@Component({
    selector: 'app-fund-inquiry-modify-detail',
    templateUrl: './fund-inquiry-modify-detail.component.html',
    styleUrls: []
})

export class FundInquiryModifyDetailComponent implements OnInit, OnChanges, OnDestroy {
    @Input() setData: any; // api 05030102 request
    @Input() sort: string; // 是否開啟排序 DESC遞減，ASC遞增，''不排序
    @Input() page: string | number = 1; // 當下頁數
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    infoData: any = {};
    listData: any = [];
    showData = false;
    private nowSort = '';
    private isFirstInit = true; // true 是第一次近來
    private nowSearch = '';
    private subjectObj: any;
    contentData = {}; // 選擇的明細資料


    constructor(
        private mainService: FundInquiryModifyService,
        // private _handleError: HandleErrorService,
        private _logger: Logger,
        // private _formateService: FormateService
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
        // this.godetail = true;
    }


    // 排序參數有改變，就觸發ngOnChanges去變更排序
    ngOnChanges() {
        this._logger.log("ngOnChanges into IrDetailComponent, setData/sort:", this.setData, this.sort);
        this.doInit();
    }

    ngOnDestroy() {
        // 刪除監聽物件
        // this.subjectObj.unsubscribe();
    }

    /**
     * 子層返回事件(接收第三層)
     * @param e
     */
    onPageBackEvent(e) {
        // this._headerCtrl.setLeftBtnClick(() => {
        //   this.navgator.pop();
        //   });
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
        this._logger.step('fund', 'detail back', item);
        this.errorPageEmit.emit(output);
    }


    // 初始化事件
    private doInit() {
        // this.isFirstInit = false;
        this._logger.log("ngOnInit into IrDetailComponent, setData:", this.setData);
        this._logger.log("ngOnInit into IrDetailComponent, sort:", this.sort);
        // //塞request
        let reqData = {
            //   'searchType': this._formateService.checkField(this.setData, 'id'), //ex: 7D
            //   'accountId': this._formateService.checkField(this.setData, 'accountId'),
            //   'currency': this._formateService.checkField(this.setData, 'currency'),
            //   'startDate': this._formateService.checkField(this.setData, 'startDate'),
            //   'endDate': this._formateService.checkField(this.setData, 'endDate'),
        };
        this.nowSort = (this.sort) ? this.sort : '';
        // //處理頁數
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
            // pageSize: '20',
            pageNumber: page.toString(),
            // sortColName: 'txDate',
            sortDirection: sort
        };
        let option = {};
        this.mainService.getListData(reqData, paginator, option).then(
            (result) => {
                this.infoData = result.infoData;
                this.listData = result.data;
                // this.totalData = result.totalData;
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
        if (new_search == this.nowSearch) {
            // 欄位相同不重查
            return false;
        }
        this.nowSearch = new_search;
        return true;
    }
}