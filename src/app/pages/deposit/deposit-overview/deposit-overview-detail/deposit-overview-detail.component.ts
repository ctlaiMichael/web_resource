/**
 * 帳務總覽-單一資產項目
 */
import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { DepositOverviewService } from '@pages/deposit/shared/deposit-overview.service';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
import { CurrencyListPopupService } from '@template/msg/currency-list/currency-list-popup.service';

@Component({
    selector: 'app-deposit-overview-detail',
    templateUrl: './deposit-overview-detail.component.html',
    styleUrls: []
})

export class DepositOverviewDetailComponent implements OnInit {
    @Input() showTitle = ''; // 功能標題
    @Input() assetsType = ''; // 資產項目
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>(); // 返回
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>(); // 錯誤返回

    titleName = '';
    noteInfo = ''; // 備註說明
    showData = false; // 顯示資料
    haveLoad = false;
    // 總資產資訊
    private allData: any;
    mainData: any = {
        'currency': '',
        'ccyAbout': '',
        'totalBalance': ''
    };
    showSubItemInfo = {
        showChartColor: false,
        showItemAmount: false
    };
    mainChart: any = {}; // 圖例
    mainChartItem: any = []; // 對應圖例的清單項目
    mainChartMaxItem = 6; // 圖例下方資訊最多呈現數量
    // 資產內容
    mainList: Array<any>;
    showErrorMsg = ''; // 整體錯誤訊息
    data = []; // 幣別清單

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _handleError: HandleErrorService,
        private mainService: DepositOverviewService,
        private layoutService: LayoutCtrlService,
        private currencyList: CurrencyListPopupService
    ) { }

    ngOnInit() {
        // 內容的返回按鈕
        this.layoutService.setHeaderOption({
            title: this.showTitle
        });
        this.layoutService.changeHeaderClick('left', () => {
            this.onBackPageData({});
        });
        this.getData();
    }


    /**
     * 更多資訊-單一群組
     * @param list 
     */
    onMore(list) {
        this._logger.log('more', list);
        let typeId = this._formateService.checkField(list, 'id');
        let go_path = this._formateService.checkField(list, 'pathUrl');
        this.mainService.onGoEvent(go_path);
    }

    /**
     * chart回傳
     * @param e 
     */
    onChartBackEvent(e) {
        this._logger.log('Chart Back', e);
        let chartItem = this._formateService.checkObjectList(e, 'list', 'array');
        if (!!chartItem) {
            this.mainChartItem = chartItem;
        }
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
        this._logger.step('DeviceOverview', 'detail back', output);
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
        this._logger.log("into onErrorPageData, output:", output);
        this.errorPageEmit.emit(output);
    }

    showCurrency() {
        this.currencyList.show({
            title: 'DEPOSIT_OVERVIEW.BTN.FOREIGN_ASSETS',
            data: this.data
        });
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    private getData() {
        this.mainService.getDetail(this.assetsType).then(
            (resObj) => {
                this.allData = resObj;
                this._logger.step('DeviceOverview', 'Detail', resObj);
                let ccyAbout = this._formateService.checkField(resObj, 'ccyAbout');
                if (ccyAbout == '') {
                    ccyAbout = 'DEPOSIT_OVERVIEW.TITLE.CURRENCY_TWD';
                }
                this.titleName = ccyAbout;
                this.mainData = {
                    'currency': this._formateService.checkField(resObj, 'currency'),
                    'ccyAbout': ccyAbout,
                    'totalBalance': this._formateService.checkField(resObj, 'totalBalance')
                };
                this.mainChart = this._formateService.checkObjectList(resObj, 'chart');
                this.mainChartItem = this.mainChart.list;
                this.showSubItemInfo = {
                    showChartColor: this._formateService.checkObjectList(resObj, 'showChartColor'),
                    showItemAmount: this._formateService.checkObjectList(resObj, 'showItemAmount')
                };
                this.mainList = this._formateService.checkObjectList(resObj, 'subItem');
                this.noteInfo = this._formateService.checkField(resObj, 'memo');
                let have_item = this._formateService.checkObjectList(resObj, 'itemHave');
                this.showData = have_item;
                if (!have_item) {
                    this.showErrorMsg = this.noteInfo;
                }
                this.data = this._formateService.checkObjectList(resObj, 'data.currencyList');
            },
            (errorObj) => {
                // 錯誤顯示錯誤訊息
                errorObj['type'] = 'alert';
                this._handleError.handleError(errorObj);
                this.onErrorPageData({});
            }
        );
    }


}
