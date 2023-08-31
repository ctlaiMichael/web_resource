/**
 * 已實現損益查詢(內容)
 */
import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';

@Component({
    selector: 'app-fund-profit-loss-content',
    templateUrl: './fund-profit-loss-content.component.html',
    styleUrls: []
})

export class FundProfitLossContentComponent implements OnInit, OnChanges, OnDestroy {
    @Input() setData: any; // api request
    @Input() outData: any;
    // @Input() sort: string; //是否開啟排序 DESC遞減，ASC遞增，''不排序
    // @Input() page: string | number = 1; //當下頁數
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    expandFlag: boolean; // 是否全部展開
    private nowSort = '';
    private isFirstInit = true; // true 是第一次近來
    private nowSearch = '';
    private subjectObj: any;


    constructor(
        // private _mainService: DepositAccountDetailService,
        // private _handleError: HandleErrorService,
        private _logger: Logger,
        // private _formateService: FormateService
        private _headerCtrl: HeaderCtrlService
    ) { }

    ngOnInit() {
        // test
        this._headerCtrl.setLeftBtnClick(() => {
            this.onLeftBtnClick();
        });
    }

    // 排序參數有改變，就觸發ngOnChanges去變更排序
    ngOnChanges() {
        // this._logger.log("ngOnChanges into IrDetailComponent, setData:", this.setData);
        // this._logger.log("ngOnChanges into IrDetailComponent, sort:", this.sort);
        // this._logger.log("ngOnChanges into IrDetailComponent, expandFlag:", this.expandFlag);
        // this.doInit();
    }

    ngOnDestroy() {
        // 刪除監聽物件
        // this.subjectObj.unsubscribe();
    }
    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onBackPageData(item) {
        let output = {
            'page': 'list-page',
            'type': 'back',
            'data': item
        };
        this._logger.log("into onBackPageData, output:", output);
        this.backPageEmit.emit(output);
    }

    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onErrorPageData(item) {
        // let output = {
        //   'page': 'list-page',
        //   'type': 'back',
        //   'data': item
        // };
        // this._logger.step('Deposit', 'detail back', item);
        // this._logger.log("into onErrorPageData, output:", output);
        // this.errorPageEmit.emit(output);
    }

    /**
     * 依功能調整檢核是否查資料
     * @param reqData 
     */
    private checkReSearch(reqData) {
        // if (!reqData.accountId || !reqData.currency) {
        //   this._logger.log("AccountDetail", "no account");
        //   return false;
        // }
        // let new_search = [reqData.accountId, reqData.currency, reqData.startDate, reqData.endDate, this.sort].join('_');
        // if (new_search == this.nowSearch) {
        //   // 欄位相同不重查
        //   return false;
        // }
        // this.nowSearch = new_search;
        // return true;
    }

    /**
     * Header左側按鈕點擊事件
     */
    onLeftBtnClick() {
        let output = {
            'page': 'content',
            'type': 'back',
            'data': this.setData,
        };
        this._logger.log("into onBackPageData2222222, output:", output);
        this.backPageEmit.emit(output);
    }
}