/**
 * 國外匯入匯款查詢(明細)
 */
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { ForeignIrService } from '@pages/deposit/shared/foreign-ir.service';

@Component({
    selector: 'app-ir-detail',
    templateUrl: './ir-detail.component.html',
    styleUrls: []
})

export class IrDetailComponent implements OnInit, OnChanges {
    @Input() setData: any; // api 0601010 request
    @Input() sort: string; // 是否開啟排序 DESC遞減，ASC遞增，''不排序
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    infoData: any = {}; // SPEC06010101 國外匯率匯款列表資訊
    listData: any = []; // SPEC06010101 國外匯率匯款列表
    detailData: any = {}; // SPEC06010102 國外匯率匯款明細
    constructor(
        private _mainService: ForeignIrService,
        private _handleError: HandleErrorService,
        private _logger: Logger,
        private _formateService: FormateService
    ) { }

    ngOnInit() {
        this._logger.step('ForeignIrDeposit', "ngOnInit into IrDetailComponent, setData/sort:", this.setData, this.sort);
        // 未取得料表資料(切換頁籤，沒點擊排序) 才執行發api動作
        if (this.listData.length == 0) {
            this._logger.log("sort is empty, ready to send api");
            // Api SPEC06010101-國外匯率匯款列表
            this.getListData(this.setData);
        } else {
            this._logger.log("sort not empty");
        }
    }

    // 排序參數有改變，就觸發ngOnChanges去變更排序
    ngOnChanges() {
        this._logger.step('ForeignIrDeposit', "ngOnChanges into IrDetailComponent, setData/sort:", this.setData, this.sort);
        // 有取得列表資料(代表點擊排序)，就做排序
        if (this.listData.length != 0) {
            // this._logger.log("ready to sort data, sort:", this.sort);
            let formateObj = { sort: 'remitId', reverse: this.sort };
            let sortData = this._mainService.formateSortData(this.listData, formateObj);
            this.listData = sortData;
            this._logger.step('ForeignIrDeposit', "after formate, listData:", this._formateService.transClone(this.listData));
        }
    }

    /**
     * 點擊其中一筆
     * @param e 
     */
    onClickDetial(e) {
        let reqData = {
            startDate: this.setData['startDate'],
            endDate: this.setData['endDate'],
            remitId: e['remitId'],
            id: this.setData['id']
        };
        let detail = this._formateService.checkObjectList(this.detailData, e.remitId);
        if (!!detail){
            return;
        }
        this._logger.step('ForeignIrDeposit', "page click reqData:", reqData);
        this._logger.error('ForeignIrDeposit', "page click reqData:", reqData, e);
        this.getDetailData(reqData, e);
    }

    /**
     * Api SPEC06010101-國外匯率匯款列表
     * @param reqData 
     */
    private getListData(reqData) {
        this._mainService.getListData(reqData).then(
            (result) => {
                this.infoData = result.infoData;
                this.listData = result.data;
                // this._logger.log("getListData success, infoData:", this.infoData);
                // this._logger.log("getListData success, listData:", this.listData);
                this.onBackPageData(result);
            },
            (errorObj) => {
                this._logger.error('ForeignIrDeposit', "getListData error, errorObj:", errorObj);
                this.onErrorPageData(errorObj, 'list'); // 錯誤訊息給父層
            }
        );
    }

    /**
     * Api SPEC06010102-國外匯率匯款明細
     * @param reqData 
     * @param e 
     */
    private getDetailData(reqData, e) {
        this._mainService.getDetailData(reqData).then(
            (result) => {
                this.detailData[e.remitId] = result.infoData;
                e._haveData = true;
                // this._logger.log("getDetailData success, detailData:", this.detailData);
                // this._logger.log("getDetailData success e", e);
            },
            (errorObj) => {
                this._logger.error('ForeignIrDeposit', "getDetailData error, errorObj:", errorObj);
                this.onErrorPageData(errorObj, 'detail');
            }
        );
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
        this._logger.step('ForeignIrDeposit', 'detail back', output);
        this.backPageEmit.emit(output);
    }

    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onErrorPageData(item, page?) {
        let output = {
            'page': 'list-page',
            'type': 'back',
            'data': item
        };
        if (typeof page != 'undefined') {
          output.page = page;
        }
        this._logger.log("into onErrorPageData, output:", output);
        this.errorPageEmit.emit(output);
    }
}