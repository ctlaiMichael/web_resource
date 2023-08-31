/**
 * 帳戶資訊
 * TW: 台幣
 * FOREX: 外幣
 * GOLD: 黃金存摺
 */
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { FooterCtrlService } from '@systems/route/layout/footer/footer-ctrl.service';


@Component({
    selector: 'app-date-range-search',
    templateUrl: './date-range-search.component.html',
    styleUrls: [],

})
export class DateRangeSearchComponent implements OnInit, OnChanges, OnDestroy {
    /**
     * 參數處理
     */
    @Input() show;
    @Input() dateObj;
    @Input() infoData: Array<any>;
    @Input() noteData;
    // 0:國外匯率匯款套用 class: section_tabL1, 1:單層頁籤 class: section_tabL1_select1, 2:雙層頁籤 class: section_tabL1_select1_time
    @Input() doubleTag: string;
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    // @Input() timeType: string; //套件是否只顯示年， year:顯示年套件， 其他:顯日正常 月、日
    showInfo = false;
    showInfoData: Array<any>;
    startDate = {
        default: '',
        min: '',
        max: '',
        data: '',
        error: ''
    };
    endDate = {
        default: '',
        min: '',
        max: '',
        data: '',
        error: ''
    };
    showError = {
        error: false,
        msg: ''
    };
    timeSetData = {
        timeType: ''
    };

    constructor(
        private _logger: Logger
        , private _formateService: FormateService
        , private _checkService: CheckService
        , private translate: TranslateService
        , private footer: FooterCtrlService
    ) {
    }


    ngOnInit() {
        // this.footer.closeFooter();
        // 不是年
        if (this.dateObj['type'] == 'Y') {
            this.timeSetData.timeType = 'year';
        }
        // if (this.timeType != 'year') {
        //     this.timeType = this.dateObj['type'];
        // }
        this._modifyInfo().then((data) => {
            this.showInfoData = data;
            this.showInfo = true;
        });
        this._modifyDate();
    }

    ngOnChanges() {
        // if (this.startDate.data !== '' && this.endDate.data !== '') {
        //     this.showInfo = false;
        // }
    }


    /**
     * 查詢
     */
    onSearch() {
        let output = {
            startDate: '',
            endDate: ''
        };
        let check_data = this._checkService.checkDateRange([this.startDate.data, this.endDate.data], this.dateObj);
        if (!check_data.status) {
            this._logger.error(check_data);
            this.showError.error = true;
            this.showError.msg = check_data.msg;
            this.onErrorPageData(check_data); // 錯誤回傳至父層
            return false;
        }
        this.showError.error = false;
        this.showError.msg = '';
        output.startDate = this._formateService.transDate(this.startDate.data, 'date');
        output.endDate = this._formateService.transDate(this.endDate.data, 'date');
        this.onBackPageData(output);
    }

    /**
     * 清除
     */
    onClear() {
        this.startDate.data = this.startDate.default; // 將預設帶入
        this.endDate.data = this.endDate.default;
    }

    /**
     * 返回上一層
     * @param item
     */
    onBackPageData(item?: any) {
        // 返回最新消息選單
        let output = {
            'page': 'search-box',
            'type': 'back',
            'data': item
        };
        this._logger.log("date-range-search onBackPageData, output:", output);
        this.backPageEmit.emit(output);
    }

    onErrorPageData(item?: any) {
        // 返回最新消息選單
        let output = {
            'page': 'search-box',
            'type': 'back',
            'data': item
        };
        this.errorPageEmit.emit(output);
    }

    /**
     * 日期設定
     */
    private _modifyDate() {
        this._logger.step('DateRangeSearch', this.dateObj);
        const dateType = this._formateService.checkField(this.dateObj, 'check_type');
        const dateTypeSet = this._formateService.checkField(this.dateObj, 'check_set');
        const min_date = this._formateService.checkField(this.dateObj, 'minDate');
        const max_date = this._formateService.checkField(this.dateObj, 'maxDate');
        const default_date = this._formateService.checkField(this.dateObj, 'baseDate');
        let tmp_date = '';
        if (min_date !== '') {
            tmp_date = this._formateService.transDate(min_date, 'yyyy-MM-dd');
            this.startDate.min = tmp_date;
            this.endDate.min = tmp_date;
        }
        if (max_date !== '') {
            tmp_date = this._formateService.transDate(max_date, 'yyyy-MM-dd');
            this.startDate.max = tmp_date;
            this.endDate.max = tmp_date;
        }
        if (default_date !== '') {
            tmp_date = this._formateService.transDate(default_date, 'yyyy-MM-dd');
            this.startDate.default = tmp_date;
            this.endDate.default = tmp_date;
            this.startDate.data = tmp_date;
            this.endDate.data = tmp_date;
        }

        this._logger.step('DateRangeSearch', this.startDate, this.endDate);
    }

    /**
     * info Data整理
     */
    private _modifyInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            let data: Array<any> = [];
            if (typeof this.infoData !== 'undefined' && (this.infoData instanceof Array) && this.infoData.length > 0) {
                let arrayLength = this.infoData.length - 1;
                this.infoData.forEach((item, item_key) => {
                    this.translate.get(item).subscribe((val) => {
                        let text = (item_key + 1) + '.&nbsp;';
                        text += val;
                        data.push(text);
                        if (item_key === arrayLength) {
                            // This is the last one.
                            resolve(data);
                        }
                    });
                });
            } else {
                resolve(data);
            }
        });

    }

    ngOnDestroy() {
        // 自訂頁籤不避特別關，讓功能自己控制
        // this.footer.openFooter();
    }

}

