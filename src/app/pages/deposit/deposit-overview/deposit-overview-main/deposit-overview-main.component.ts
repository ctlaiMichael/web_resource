/**
 * 帳務總覽
 */
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { DepositOverviewService } from '@pages/deposit/shared/deposit-overview.service';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';

@Component({
    selector: 'app-deposit-overview-main',
    templateUrl: './deposit-overview-main.component.html',
    styleUrls: []
})

export class DepositOverviewMainComponent implements OnInit {
    private defaultHeaderSet = {};
    assetsType = ''; // 單一資產類別
    assetsTitle = ''; // 子資產功能標題
    noteInfo = ''; // 備註說明
    showData = false; // 顯示資料
    haveLoad = false;
    // 總資產資訊
    mainData: any = {
        positiveName: 'DEPOSIT_OVERVIEW.POSITIVE',
        positive: "",
        positivePercent: "- -",
        negativeName: 'DEPOSIT_OVERVIEW.NEGATIVE',
        negative: "",
        negativePercent: "- -"
    };
    mainChart: any = {}; // 圖例
    // 資產內容
    mainList: Array<any>;
    showErrorMsg = ''; // 整體錯誤訊息


    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _handleError: HandleErrorService,
        private mainService: DepositOverviewService,
        private layoutService: LayoutCtrlService
    ) { }

    ngOnInit() {
        this.defaultHeaderSet = this.layoutService.getHeader();
        this.mainService.removeAllCache();
        this.getData();
    }


    /**
     * 更多資訊
     * @param list 
     */
    onMore(list) {
        // this._logger.step('DeviceOverview', 'show Detail', list);
        let type = this._formateService.checkField(list, 'id');
        if (type && type != '') {
            // 切換資產項目
            this.assetsType = type;
            this.assetsTitle = this._formateService.checkField(list, 'title_header');
        }
    }

    /**
     * chart回傳
     * @param e 
     */
    onChartBackEvent(e) {
        this._logger.log('Chart Back', e);
    }


    /**
     * 子層返回事件(分頁)
     * @param e
     */
    onPageBackEvent(e) {
        this._logger.step('DeviceOverview', 'onPageBackEvent', e);
        this.assetsType = ''; // 返回主資產頁
        let page = '';
        let pageType = '';
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
        // 左側按鈕處理
        this.layoutService.setHeaderOption(this.defaultHeaderSet);
        this.layoutService.changeHeaderClick('left', 'back');
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    private getData() {
        this.mainService.getAllData().then(
            (resObj) => {
                this.haveLoad = true;
                let sumTotal = this._formateService.checkObjectList(resObj, 'sumTotal');
                if (!!sumTotal) {
                    this.mainData = this._formateService.checkObjectList(resObj, 'sumTotal');
                    this.mainChart = this._formateService.checkObjectList(resObj, 'sumTotal.chart');
                    this.mainList = this._formateService.checkObjectList(resObj, 'itemList');
                    this.noteInfo = this._formateService.checkField(resObj, 'memo');
                    let have_item = this._formateService.checkObjectList(resObj, 'itemHave');
                    this.showData = have_item;
                    if (!have_item) {
                        this.showErrorMsg = 'ERROR.EMPTY';
                    }
                } else {
                    // 發生異常
                    this.showData = false;
                    this.showErrorMsg = 'DEPOSIT_OVERVIEW.ERROR.SERVER_BUSINESS_ERROR';
                }
            },
            (errorObj) => {
                this._logger.error('DeviceOverview', 'getData Error', errorObj);
                // 取資料異常處理
                this.haveLoad = true;
                this.showData = false;
                let error_msg = this._formateService.checkField(errorObj, 'content');
                if (error_msg == '') {
                  error_msg = this._formateService.checkField(errorObj, 'msg');
                }
                this.showErrorMsg = error_msg;
            }
        );
    }


}
