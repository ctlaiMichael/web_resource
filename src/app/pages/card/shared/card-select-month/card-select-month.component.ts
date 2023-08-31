/**
 * 信卡月份查詢
 */
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CardSelectMonthService } from './card-select-month.service';
import { CardMonthPopupService } from '@template/list/card-month-popup/card-month-popup.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { CheckService } from '@template/check/check.service';

@Component({
    selector: 'app-card-select-month',
    templateUrl: './card-select-month.component.html',
    styleUrls: [],

})
export class CardSelectMonthComponent implements OnChanges {
    @Input() defaultMonth: any; // 預設帶進來之月份
    @Input() type: string; // 類別， unPaid: 未出帳消費, detail:各期帳單 
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    popupOption = {
        data: [],
        select: '', // 選擇之帳號，帳號打勾使用
        type: ''
    };
    private unPaidStr = { 'selectedMonth': 'unPaid', 'selectedMonthDesc': '未出帳消費' };
    private firstMonth: any; // 第一個月份 
    private nowType = '';

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private mainService: CardSelectMonthService,
        private popupService: CardMonthPopupService,
        private handleError: HandleErrorService,
        protected _checkService: CheckService,
    ) {
    }


    // ngOnInit() {
    // }

    ngOnChanges() {
        this._logger.log("CardSelectMonthComponent, type:", this.type, this.nowType);

        if (this.type != this.nowType) {
            this._logger.log("type different");
            this.nowType = this.type;
            if (this.type == 'unPaid') {
                // 未出帳消費
                let monthInfo = this._formateService.transClone(this.unPaidStr);
                this.onBackPageData(monthInfo); // 回傳至父層
            } else if (this.popupOption.data.length <= 0 && !!this.firstMonth) {
                // 各期帳單(有月份)
                this.onBackPageData(this.firstMonth); // 回傳至父層
            } else {
                // 各期帳單(無月份)
                this.getData(false).then(
                    (monthInfo) => {
                        this.onBackPageData(monthInfo); // 回傳至父層
                    },
                    (errorObj) => {
                        this._logger.log("getBillMonthData error, errorObj:", errorObj);
                        this.onErrorPageData(errorObj);
                        // errorObj['type'] = 'message';
                        // this._handleError.handleError(errorObj);
                    }
                );
            }

        }

    }

    /**
     * 取月份
     * @param background boolean 背景發送
     */
    private getData(background: boolean): Promise<any> {
        return this.mainService.getBillMonthData({}, {'background': background}).then(
            (result) => {
                // 回傳至父層
                let monthInfo = {
                    selectedMonth: '',
                    selectedMonthDesc: ''
                };
                // 若沒預設月份，將api回傳第一筆帳號帶入預設
                if (this.defaultMonth == '' || typeof this.defaultMonth == 'undefined' || this.defaultMonth == null) {
                    this._logger.log("has not defaultMonth");
                    let checkMonth = this._checkService.checkEmpty(result.rangeData, true);
                    if (checkMonth == false){
                        monthInfo.selectedMonth = this.unPaidStr.selectedMonth;
                        monthInfo.selectedMonthDesc = this.unPaidStr.selectedMonthDesc;
                        return Promise.resolve(monthInfo);
                    }
                    monthInfo.selectedMonth = result.rangeData[0]['selectedMonth']; // 帶回父層，發send05030102 request
                    monthInfo.selectedMonthDesc = result.rangeData[0]['selectedMonthDesc'];
                    this.defaultMonth = result.rangeData[0]['selectedMonth']; // 此頁顯示
                    this.popupOption.select = result.rangeData[0]['selectedMonth']; // 紀錄選擇之帳號，popup打勾
                    this.firstMonth = this._formateService.transClone(result.rangeData [0]);
                    this._logger.log("this.defaultMonth empty, defaultMonth:", this.defaultMonth);
                } else {
                    // 若有選定預設帳號，帶入popup預設帳號
                    this._logger.log("has defaultMonth");
                    let temp = this.mainService.setDefaultInfo(result.rangeData, this.defaultMonth);
                    monthInfo.selectedMonth = temp['selectedMonth'];
                    monthInfo.selectedMonthDesc = temp['selectedMonthDesc'];
                    this.popupOption.select = this.defaultMonth; // 紀錄選擇之帳號，popup打勾
                }
                // 預設帶完後，將未出帳消費帶入第一筆
                let monthList = this._formateService.transClone(result.rangeData);
                monthList.splice(0, 0, this.unPaidStr);
                this.popupOption.data = monthList;
                // 塞完未出帳至第一筆後,再判斷預設是否為未出帳, 是,就改變返回顯示預設
                if (this.defaultMonth == 'unPaid') {
                    monthInfo.selectedMonth = this.unPaidStr.selectedMonth;
                    monthInfo.selectedMonthDesc = this.unPaidStr.selectedMonthDesc;
                }
                return Promise.resolve(monthInfo);
                // this.onBackPageData(monthInfo); // 回傳至父層
            },
            (errorObj) => {
                return Promise.reject(errorObj);
            }
        );

    }

    /**
     * 點擊帳號
     */
    async onSelect() {
        this._logger.log("into onSelect");

        try {
            if (this.popupOption.data.length <= 0) {
                this._logger.log("onSelect, popupOption.data.length <= 0");
                const monthInfo = await this.getData(false);
            }
            // 回傳使用者選擇之帳號
            this.popupService.show(this.popupOption).then(
                (result) => {
                    this._logger.log("result:", result);
                    this.defaultMonth = result['selectedMonth'];
                    // 回來將預設帳號帶入，顯示下次開啟視窗之選擇帳號
                    this.popupOption.select = this.defaultMonth;
                    this._logger.log("onSelect success, defaultMonth:", this.defaultMonth);
                    this.onBackPageData(result);
                },
                (cancel) => {
                    this._logger.log("into cancel");
                }
            );
        } catch (errorMonth) {
            // [TODO: onSelect]
            this._logger.log("onSelect error, errorObj:", errorMonth);
            this.onErrorPageData(errorMonth);

        }

    }

    /**
     * 重新設定page data 子層返回事件
     * @param setData
     */
    onBackPageData(setData) {
        let output = {
            'page': 'acct-page',
            'type': 'back',
            'data': setData,
            'lastMonth': ''
        };
        output.lastMonth = this._formateService.checkField(this.firstMonth, 'selectedMonth');
        this._logger.step('onBackPageData, setData', setData);
        this._logger.log("into onBackPageData, output:", output);
        this.backPageEmit.emit(output);
    }


    onErrorPageData(errorObj?: any) {
        // 返回最新消息選單
        let output = {
            'page': 'acct-page',
            'type': 'back',
            'data': errorObj
        };
        this.errorPageEmit.emit(output);
    }
}

