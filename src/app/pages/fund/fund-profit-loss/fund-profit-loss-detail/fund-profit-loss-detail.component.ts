/**
 * 已實現損益查詢(明細頁)
 */
import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    OnInit
} from '@angular/core';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { FundProfitLossService } from '@pages/fund/shared/fund-profit-loss.service';

@Component({
    selector: 'app-fund-profit-loss-detail',
    templateUrl: './fund-profit-loss-detail.component.html',
    styleUrls: []
})
export class FundProfitLossDetailComponent implements OnInit, OnChanges {
    @Input() setData: any; // api 05030102 request
    @Input() sort: string; // 是否開啟排序 DESC遞減，ASC遞增，''不排序
    @Input() page: string | number = 1; // 當下頁數
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    infoData: any = {}; // SPEC05030102 存款帳戶明細查詢(資訊)
    listData: any = []; // SPEC05030102 存款帳戶明細查詢(明細)
    totalData: any = {}; // SPEC05030102 存款帳戶明細查詢(總計相關)
    showData = false;
    // expandFlag: boolean; // 是否全部展開
    private nowSort = '';
    private isFirstInit = true; // true 是第一次近來
    private nowSearch = '';
    private subjectObj: any;
    contentData = {}; // 選擇的明細資料

    constructor(
        private _mainService: FundProfitLossService,
        private _handleError: HandleErrorService,
        private _logger: Logger,
        private _formateService: FormateService
    ) {}

    ngOnInit() {
        // 控制展開監聽
        // this.subjectObj = this._mainService.expandSubject.subscribe((value: any) => {
        //     this.expandFlag = value;
        // });

        this.doInit();
    }

    // 排序參數有改變，就觸發ngOnChanges去變更排序
    ngOnChanges() {
        this._logger.log(
            'ngOnChanges into FundHistoryDetailComponent, setData:',
            this.setData
        );
        this._logger.log(
            'ngOnChanges into FundHistoryDetailComponent, sort:',
            this.sort
        );
        // this._logger.log("ngOnChanges into IrDetailComponent, expandFlag:", this.expandFlag);
        this.doInit();
    }

    // 選擇其中一筆明細
    onSelectDetail(item) {
        this._logger.log('into onSelectDetail');
        this.onBackPageData(item, 'list-page', 'go');
    }

    // ngOnDestroy() {
    //     // 刪除監聽物件
    //     this.subjectObj.unsubscribe();
    // }
    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onBackPageData(item?, page?, type?) {
        this._logger.log('onBackPageData, item:', item);
        this._logger.log('onBackPageData, page:', page);
        this._logger.log('onBackPageData, type:', type);
        let output = {
            page: page,
            type: type,
            data: item
        };
        this._logger.log('into onBackPageData, output:', output);
        this.backPageEmit.emit(output);
    }

    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onErrorPageData(item) {
        let output = {
            page: 'list-page',
            type: 'back',
            data: item
        };
        this._logger.step('Deposit', 'detail back', item);
        this._logger.log('into onErrorPageData, output:', output);
        this.errorPageEmit.emit(output);
    }

    /**
     * 初始化事件
     */
    private doInit() {
        this.isFirstInit = false;
        this._logger.log(
            'ngOnInit into FundHistoryDetailComponent, setData:',
            this.setData
        );
        this._logger.log(
            'ngOnInit into FundHistoryDetailComponent, sort:',
            this.sort
        );
        // 塞request
        let reqData = {
            searchType: this._formateService.checkField(this.setData, 'id'), // ex: 7D
            accountId: this._formateService.checkField(
                this.setData,
                'accountId'
            ),
            currency: this._formateService.checkField(this.setData, 'currency'),
            startDate: this._formateService.checkField(
                this.setData,
                'startDate'
            ),
            endDate: this._formateService.checkField(this.setData, 'endDate')
        };
        this.nowSort = this.sort ? this.sort : '';
        // 處理頁數
        if (typeof this.page === 'undefined') {
            this.page = 1;
        } else {
            // tslint:disable-next-line: radix
            this.page = parseInt(this.page.toString());
        }

        // 檢核是否查資料
        let check_research = this.checkReSearch(reqData);
        if (!check_research) {
            this._logger.log('AccountDetail', 'no search');
            return false;
        }
        this._logger.log('ready to send api');
        this.showData = false;
        this.listData = [];
        // Api SPEC05030102-存款帳戶明細查詢(明細)
        this.getListData(reqData, this.page, this.sort);
    }

    /**
     * Api SPEC05030102-存款帳戶明細
     * @param reqData
     * @param page
     * @param sort
     */
    private getListData(reqData, page: number | string, sort?: string) {
        let paginator = {
            // pageSize: '20', // service控制
            pageNumber: page.toString(),
            // sortColName: 'txDate', // service控制
            sortDirection: sort
        };
        // reqData['accountId'] = ''; // 刪
        // reqData['currency'] = ''; // 刪
        let option = {};
        this._mainService.getListData(reqData, paginator, option).then(
            result => {
                this.infoData = result.infoData;
                this.listData = result.data;
                this.totalData = result.totalData;
                this.showData = true;
                this._logger.log(
                    'getListData success, infoData:',
                    this.infoData
                );
                this.onBackPageData(result, 'list-page', 'back'); // 回傳總計資訊給父層顯示
            },
            errorObj => {
                this._logger.log('getListData error, errorObj:', errorObj);
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
        // if (!reqData.accountId || !reqData.currency) {
        //     this._logger.log("AccountDetail", "no account");
        //     return false;
        // }
        let new_search = [reqData.startDate, reqData.endDate, this.sort].join(
            '_'
        );
        if (new_search == this.nowSearch) {
            // 欄位相同不重查
            return false;
        }
        this.nowSearch = new_search;
        return true;
    }
}
