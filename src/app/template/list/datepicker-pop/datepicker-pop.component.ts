/**
 * 日歷
 */
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { DateUtil } from '@util/formate/date/date-util';
import { FormateService } from '@template/formate/formate.service';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'datepicker-pop',
    templateUrl: './datepicker-pop.component.html',
    styleUrls: ['./datepicker-pop.component.css']
})

export class DatepickerPopComponent implements OnInit, AfterViewInit {
    /**
     * 參數設定
     */
    title = '';
    promise: Promise<any>;

    Month_name = []; // 月份選單


    //  == private ==  //
    Date_now: Date; // 當前選擇的日期物件
    private Date_Year;
    private Date_Month;  //  js的月份為實際月份-1
    private firstDay;
    private lastDay;
    // IsOpen = false;
    date_area = true;
    private year_area = false;
    years_before = [];
    years_after = [];
    months_before = [];
    months_after = [];
    //  == public ==  //
    Date_Defalult = '';  //  預設值設定
    Month_Data = [];
    dateformat = '';
    datePipe = new DatePipe('tw');
    max = '';
    min = '';
    selectItem;
    //  IsOpen = false;
    datepicMax = '';
    datepicMin: any;
    datepicDefalult: any;
    IsNext = true;
    IsPre = true;
    IsNextYear = true;
    IsPreYear = true;
    timeType = '';

    //  區塊顯隱項目
    @ViewChild('scrollerBoardBox') scrollerBoardBox;  //  下拉選單;包括年，月選項
    @ViewChild('yearBoardBox') yearBoardBox;          //  scrollerBoardBox 內的年份選擇區域
    @ViewChild('monthBoardBox') monthBoardBox;        //  monthBoardBox 內的日期選擇區域
    @ViewChild('targetyear') targetyear;  //  預選項目(年)
    @ViewChild('targetmonth') targetmonth;  //  預選項目(年)

    //  向parent component傳遞參數
    // @Output()
    // uploadSelected: EventEmitter<object> = new EventEmitter();
    uploadComplete(select) {
        this.onSubmitEvent(DateUtil.transDate(select, 'date'));
        // this.uploadSelected.emit(select);
    }


    constructor(
        private _logger: Logger,
        private translate: TranslateService,
        private _formateService: FormateService
    ) {
        // == popup設定 == //
        this.promise = new Promise((resolve, reject) => {
            this.onSubmitEvent = (output) => {
                resolve(output);
            };
            this.onCancleEvent = () => {
                reject();
            };
        });
    }

    ngOnInit() {
        this._setDefault();
        this.Calendar_Render();
    }

    ngAfterViewInit() {
        if (this.timeType == 'year') {
            this.onYearOpen();
        } else {
            this.Calendar_Render();
        }
    }

    onSubmitEvent(output) { }

    onCancleEvent() { }

    /**
     * 啟動
     */
    popOpen(): void {
        if (this.timeType == 'year') {
            this.date_area = false;
        } else {
            this.date_area = true;
        }
        // this.date_area = true;
        this._logger.step('Date', 'datepicker open', {
            selectItem: this.selectItem,
            min: this.min,
            max: this.max,

            default: this.Date_Defalult
        });
        if (typeof (this.selectItem) != 'undefined') {
            //  開啟選單重繪畫面
            this.Date_now = this.selectItem;
            this._setDefault();
            this.Calendar_Render();
        }
        // this.IsOpen = true;
    }

    /**
     * 關閉
     */
    popClose(): void {
        // this.IsOpen = false;
        this.onCancleEvent();
    }


    /**
     * 月份選單開啟
     */
    onMonthOpen(): void {
        this.date_area = false;

        this.Date_now = this.selectItem;
        this._SetMonths();
        // 前端處理 version2
        this.scrollerBoardBox.nativeElement.style.display = 'block';  //  scrollerBoardBox顯示
        this.yearBoardBox.nativeElement.style.display = 'none';      //  年份選擇顯示
        this.monthBoardBox.nativeElement.style.display = 'block';      //  月份選擇隱藏
        // this.scrollerBoardBox.nativeElement.scrollTop = ((this.monthBoardBox.nativeElement.clientHeight / 2) - 155);  // 滑到中間
        this.targetmonth.nativeElement.scrollIntoView();
    }

    /**
     * 年份選單開啟
     */
    onYearOpen(): void {

        this.Date_now = this.selectItem;
        this._SetYears();

        this.date_area = false;
        if (!!this.scrollerBoardBox) {
            this.scrollerBoardBox.nativeElement.style.display = 'block';  //  scrollerBoardBox顯示
        }
        if (!!this.yearBoardBox) {
            this.yearBoardBox.nativeElement.style.display = 'block';      //  年份選擇顯示
        }
        if (!!this.monthBoardBox) {
            this.monthBoardBox.nativeElement.style.display = 'none';      //  月份選擇隱藏
        }
        //  this.scrollerBoardBox.nativeElement.scrollTop = ((this.yearBoardBox.nativeElement.clientHeight / 2) - 155);  // 滑到中間
        if (!!this.targetmonth) {
            this.targetmonth.nativeElement.scrollIntoView();
        }
    }

    /**
     * 日期選擇事件
     * @param date
     */
    onSelect(date): void {
        if (this.Isvalid(date)) {
            this.selectItem = date;
        } else {
            return;
        }
    }

    /**
     * 年份選擇事件
     * @param year
     */
    yearOnSelect(year): void {
        let dateChange = this.SetDeteDedualt(year, (this.selectItem.getMonth() + 1), this.selectItem.getDate());
        this.Date_now = dateChange;

        if (this.Isvalid(dateChange)) {
            this.selectItem = dateChange;
        }

        this.Date_now = this.SetDeteDedualt(year, (this.Date_now.getMonth() + 1), this.Date_now.getDate());
        this.selectItem = this.SetDeteDedualt(year, (this.Date_now.getMonth() + 1), this.Date_now.getDate());
        this._SetYears();   //  設定年份
        this._SetMonths();  //  設定月份
        if (this.timeType == 'year') {
            this.onSubmit();
            // this.date_area = false;
            // this.year_area = true;
            // this.onYearOpen();
        } else {
            this.date_area = true;
            this.year_area = false;
        }
        // this.date_area = true;
        // this.year_area = false;
        this.scrollerBoardBox.nativeElement.style.display = 'none';
        //  重畫日曆
        this.Calendar_Render();
    }

    /**
     * 月份選擇事件
     * @param date
     */
    monthsOnSelect(date): void {
        let dateChange = this.SetDeteDedualt(date.getFullYear(), (date.getMonth() + 1), this.selectItem.getDate());
        this.Date_now = dateChange;

        if (this.Isvalid(dateChange)) {
            this.selectItem = dateChange;
        }
        this._SetYears();   //  設定年份
        this._SetMonths();  //  設定月份
        this.date_area = true;
        this.year_area = false;
        this.scrollerBoardBox.nativeElement.style.display = 'none';
        //  const mainboard = document.getElementById('mainboard');
        //   mainboard.style.display = 'none';
        //  重畫日曆
        this.Calendar_Render();
    }

    onSubmit(): void {
        // this.IsOpen = false;

        //  this._logger.log('this.selectItem' , this.selectItem);
        //  極值檢查　若輸入日期超出或是小於限制，取極值
        const dateMin = new Date(this.min);
        const dateMax = new Date(this.max);
        //  若max,min均有設定
        if (!isNaN(dateMin.getTime()) && this.selectItem < dateMin) {
            this.selectItem = dateMin;
        }
        if (!isNaN(dateMax.getTime()) && this.selectItem > dateMax) {
            this.selectItem = dateMax;
        }


        if (this.dateformat !== '') {
            this.Date_now = this.selectItem;
            this.uploadComplete(this.selectItem);
        } else {
            let y = this.selectItem.getFullYear();
            let m = ((this.selectItem.getMonth() + 1) < 10) ? '0' + (this.selectItem.getMonth() + 1) : (this.selectItem.getMonth() + 1);
            let d = (this.selectItem.getDate() < 10) ? '0' + this.selectItem.getDate() : this.selectItem.getDate();
            let datestr = y + '/' + m + '/' + d;

            this.uploadComplete(datestr);
        }
    }



    /**
     * 切換上一年
     */
    onChangePreYear(): void {
        const dateMin = new Date(this.min);
        let minY = dateMin.getFullYear();
        let minM = dateMin.getMonth();
        let preY: any;
        let selectY = this.Date_now.getFullYear();
        let selectM = this.Date_now.getMonth();
        let selectD = this.Date_now.getDate();

        if (selectY - 1 <= minY) {
            preY = minY;
            // 月份大於最大月份等於最大月份
            if (selectM <= minM) {
                selectM = minM;
            }

        } else {
            preY = selectY - 1;
        }

        let newdate = new Date(preY, selectM, selectD);
        this.Date_now = newdate;
        this.Calendar_Render();
    }

    /**
     * 切換下一年
     */
    onChangeNextYear(): void {

        const dateMax = new Date(this.max);
        let maxY = dateMax.getFullYear();
        let maxM = dateMax.getMonth();

        let selectY = this.Date_now.getFullYear();
        let selectM = this.Date_now.getMonth();
        let selectD = this.Date_now.getDate();
        let nextY: any;

        // 判斷下一年是否超過最大年限
        if (selectY + 1 >= maxY) {
            nextY = maxY;
            // 月份大於最大月份等於最大月份
            if (selectM >= maxM) {
                selectM = maxM;
            }

        } else {
            nextY = selectY + 1;
        }

        let newdate = new Date(nextY, selectM, selectD);
        this.Date_now = newdate;
        this.Calendar_Render();

    }


    /**
     * 切換上一月份
     */
    onChangePreMonth(): void {

        let temp_start = new Date(this.min);

        let preMonthDate: Date;
        if (this.Date_now.getMonth() === 0) {
            preMonthDate = new Date(this.Date_now.getFullYear() - 1, 11, this.Date_now.getDate());
        } else {
            preMonthDate = new Date(this.Date_now.getFullYear(), (this.Date_now.getMonth() - 1), this.Date_now.getDate());
        }

        this.Calendar_Render();
        if (!isNaN(temp_start.getTime())) {
            if (preMonthDate.getFullYear() > temp_start.getFullYear()) {
                this.Date_now = preMonthDate;
                this.Calendar_Render();
            } else {
                if (preMonthDate.getFullYear() == temp_start.getFullYear() && preMonthDate.getMonth() >= temp_start.getMonth()) {
                    this.Date_now = preMonthDate;
                    this.Calendar_Render();
                }
            }
        } else {
            this.Date_now = preMonthDate;
            this.Calendar_Render();
        }
    }

    /**
     * 切換下一月份
     */
    onChangeNextMonth(): void {
        let temp_end = new Date(this.max);
        let nextMonthDate: Date;
        if (this.Date_now.getMonth() === 11) {
            nextMonthDate = new Date(this.Date_now.getFullYear() + 1, 0, this.Date_now.getDate());
            // 判斷當下日期為31天，new Date後日期跳為第一天，則日期需扣1回去上個月的最後一天
            if (this.Date_now.getDate() === 31 && nextMonthDate.getDate() === 1) {
                nextMonthDate = new Date(this.Date_now.getFullYear() + 1, 0, this.Date_now.getDate() - 1);
            }
        } else {
            nextMonthDate = new Date(this.Date_now.getFullYear(), this.Date_now.getMonth() + 1, this.Date_now.getDate());
            // 判斷當下日期為31天，new Date後日期跳為第一天，則日期需扣1回去上個月的最後一天
            if (this.Date_now.getDate() === 31 && nextMonthDate.getDate() === 1) {
                nextMonthDate = new Date(this.Date_now.getFullYear(), this.Date_now.getMonth() + 1, this.Date_now.getDate() - 1);
            }
        }

        if (!isNaN(temp_end.getTime())) {
            // max值最大當月天數
            if (nextMonthDate.getFullYear() < temp_end.getFullYear()) {
                this.Date_now = nextMonthDate;
                this.Calendar_Render();
            } else {
                if (nextMonthDate.getFullYear() == temp_end.getFullYear() && nextMonthDate.getMonth() <= temp_end.getMonth()) {
                    this.Date_now = nextMonthDate;
                    this.Calendar_Render();
                }
            }
        } else {
            this.Date_now = nextMonthDate;
            this.Calendar_Render();
        }
    }

    /**
     * 月份選擇檢查
     * @param day 日期
     */
    onCheckMonthFilter(day) {
        if (day.getMonth() !== this.Date_now.getMonth()) {
            return false;
        } else {
            return true;
        }
    }


    /**
     * 日期項目顯示
     */
    onCheckDayClass(date) {
        //  是否為選定日期
        if (!this.Isvalid(date)) {
            //  是否為不能選擇的日期
            return 'disable';
        } else if (
            this.selectItem.getFullYear() == date.getFullYear() &&
            this.selectItem.getMonth() == date.getMonth() &&
            this.selectItem.getDate() == date.getDate()
        ) {
            return 'selected';
        } else {
            return '';
        }
    }


    // //  日期轉換名稱格式　ex:2017 七月
    // getMonthName(object: Date) {
    //     return object.getFullYear() + ' ' + this.Month_name[(object.getMonth())];
    // }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------


    /**
     * 判斷是否為可選日期
     * @param date
     */
    private Isvalid(date: Date) {
        let temp_start = new Date(this.min);
        let temp_end = new Date(this.max);
        //  若max,min均有設定
        if (
            !isNaN(temp_start.getTime()) &&
            !isNaN(temp_end.getTime())
        ) {
            return (date >= temp_start && date <= temp_end);
        } else if (!isNaN(temp_start.getTime())) {
            //  檢核該日是否超過最小日期
            return (date >= temp_start);
        } else if (!isNaN(temp_end.getTime())) {
            //  檢核該日是否大於最大日期
            return (date <= temp_end);
        } else {

            return true;
        }
    }


    /**
     * 預設值設定
     */
    private _setDefault() {
        this.Date_now = new Date();

        this.Date_Year = this.Date_now.getFullYear();
        this.Date_Month = this.Date_now.getMonth();  //  js的月份為實際月份-1
        this.firstDay = new Date(this.Date_now.getFullYear(), this.Date_now.getMonth(), 1);
        this.lastDay = new Date(this.Date_now.getFullYear(), this.Date_now.getMonth() + 1, 0);
        //  this.Month_name = ['一月', '二月', '三月', '四月', '五月', '六月','七月', '八月', '九月', '十月', '十一月', '十二月'];
        this.translate.get('MONTH').subscribe((val) => {
            if (typeof val === 'object') {
                this.Month_name = [
                    val['JAN'],
                    val['FEB'],
                    val['MAR'],
                    val['APR'],
                    val['MAY'],
                    val['JUN'],
                    val['JUL'],
                    val['AUG'],
                    val['SEP'],
                    val['OCT'],
                    val['NOV'],
                    val['DEC']
                ];
            }
        });

        this.Month_Data = [];
        this.dateformat = '';
        this.datePipe = new DatePipe('tw');

        //  寫入預設值
        if (this.Date_Defalult !== '') {
            this.Date_now = new Date(this.Date_Defalult);
            //  初始預設值是否與最大最小值相衝，若有預設值改為設定範圍
            if (!this.Isvalid(this.Date_now)) {
                let temp_start = new Date(this.min);
                let temp_end = new Date(this.max);
                //  若max,min均有設定
                if (
                    !isNaN(temp_start.getTime()) &&
                    !isNaN(temp_end.getTime())
                ) {
                    this.Date_now = temp_start;
                } else if (!isNaN(temp_start.getTime())) {
                    //  檢核該日是否超過最小日期
                    if (this.Date_now < temp_start) {
                        this.Date_now = temp_start;
                    }
                } else if (!isNaN(temp_end.getTime())) {
                    //  檢核該日是否大於最大日期
                    if (this.Date_now > temp_end) {
                        this.Date_now = temp_end;
                    }
                }
            }
        }

        this.selectItem = this.Date_now;

        this._SetYears();   //  設定年份
        this._SetMonths();  //  設定月份
    }

    /**
     * 建立年份資料集
     */
    private _SetYears() {
        let temp_start = new Date(this.min);
        let temp_end = new Date(this.max);
        this.years_before = [];
        this.years_after = [];

        if (!isNaN(temp_start.getTime())) {
            for (let i = temp_start.getFullYear(); i < this.Date_now.getFullYear(); i++) {
                this.years_before.push(i);
               
            }
            this.years_before.reverse();
        } else {
            for (let i = (this.Date_now.getFullYear() - 100); i < this.Date_now.getFullYear(); i++) {
                this.years_before.push(i);
                
            }
            this.years_before.reverse();
        }

        if (!isNaN(temp_end.getTime())) {
            for (let i = this.Date_now.getFullYear() + 1; i <= temp_end.getFullYear(); i++) {
                this.years_after.push(i);
                
            }
            this.years_after.reverse();
        } else {
            for (let i = this.Date_now.getFullYear() + 1; i < (this.Date_now.getFullYear() + 100); i++) {
                this.years_after.push(i);
                
            }
            this.years_after.reverse();
        }
    }

    /**
     * 建立月份資料集
     */
    private _SetMonths() {
        this.months_before = [];
        this.months_after = [];
        let temp_start = new Date(this.min);  // ex:2017/06/06
        let temp_end = new Date(this.max);    // ex:2009/03/23

        //   // 建立月份資料集
        let temp: Date;
        // 本月往前推12個月
        for (let i = 12; i > 0; i--) {
            let y = this.Date_now.getFullYear();
            let m = (this.Date_now.getMonth() + 1);
            if ((m - i) < 1) {
                m = (m - i) + 12;
                y = y - 1;
            } else {
                m = m - i;
            }
            temp = new Date(y + '/' + m + '/1');

            if (!isNaN(temp_start.getTime())) {

                if (temp.getFullYear() <= temp_start.getFullYear()) {

                    if (temp.getFullYear() == temp_start.getFullYear() &&
                        temp.getMonth() >= temp_start.getMonth()
                    ) {
                        this.months_before.push(temp);
                     
                    }
                } else {
                    this.months_before.push(temp);
                  
                }
            } else {
                this.months_before.push(temp);
                
            }

        }
        // 根據需求反轉順續20201017
        this.months_before.reverse();

        //   // 本月往後推12個月
        for (let i = 1; i < 13; i++) {
            let y = this.Date_now.getFullYear();
            let m = (this.Date_now.getMonth() + 1);
            if ((m + i) > 12) {
                m = (m + i) - 12;
                y = y + 1;
            } else {
                m = m + i;
            }
            temp = new Date(y + '/' + m + '/1');

            if (!isNaN(temp_end.getTime())) {
                if (temp.getFullYear() >= temp_end.getFullYear()) {
                    if (temp.getFullYear() == temp_end.getFullYear() &&
                        temp.getMonth() <= temp_end.getMonth()
                    ) {
                        this.months_after.push(temp);
                       
                    }
                } else {
                    this.months_after.push(temp);
                 
                }
            } else {
                this.months_after.push(temp);
       
            }

        }
        // 根據需求反轉順續20201017
        this.months_after.reverse();

    }

    /**
     * 日曆資料建立
     */
    private Calendar_Render(): void {
        let temp_start = new Date(this.min);
        let temp_end = new Date(this.max);

        if (!isNaN(temp_start.getTime())) {
            if (this.Date_now.getFullYear() == temp_start.getFullYear()) {
                this.IsPreYear = false;
            } else {
                this.IsPreYear = true;
            }
            if (!this.IsPreYear && this.Date_now.getMonth() == temp_start.getMonth()) {
                this.IsPre = false;
            } else {
                this.IsPre = true;
            }
        } else {
            this.IsPre = true;
            this.IsPreYear = true;
        }
        if (!isNaN(temp_end.getTime())) {
            if (this.Date_now.getFullYear() == temp_end.getFullYear()) {
                this.IsNextYear = false;
            } else {
                this.IsNextYear = true;
            }
            if (!this.IsNextYear && this.Date_now.getMonth() == temp_end.getMonth()) {
                this.IsNext = false;
            } else {
                this.IsNext = true;
            }
        } else {
            this.IsNext = true;
            this.IsNextYear = true;
        }

        this.firstDay = new Date(this.Date_now.getFullYear(), this.Date_now.getMonth(), 1);
        this.lastDay = new Date(this.Date_now.getFullYear(), (this.Date_now.getMonth() + 1), 0);

        const StartWeekDay = this.firstDay.getDay();  //  禮拜日至禮拜六 0-6
        const EndWeekDay = this.lastDay.getDay();  //  禮拜日至禮拜六 0-6

        if (StartWeekDay !== 0) {
            this.firstDay = new Date(this.Date_now.getFullYear(), this.Date_now.getMonth(), (0 - StartWeekDay + 1));
        }

        if (EndWeekDay !== 6) {
            this.lastDay = new Date(this.Date_now.getFullYear(), (this.Date_now.getMonth() + 1), (7 - EndWeekDay));
        } else {
            this.lastDay = new Date(this.Date_now.getFullYear(), (this.Date_now.getMonth() + 1), 1);
        }

        this.Month_Data = [];
        let a;

        for (a = this.firstDay; a < this.lastDay; a.setDate(a.getDate() + 1)) {

            this.Month_Data.push(new Date(a));


        }




    }

    /**
     * 處理年/月份轉換時日的尾數的問題
     * @param year
     * @param month
     * @param day
     */
    private SetDeteDedualt(year, month, day) {
        let date_str = year + '/' + month + '/' + day;
        let date_phrase = new Date(year + '/' + month + '/' + day);

        let date_max = new Date(year, month, 0);

        if (date_phrase > date_max) {
            return date_max;
        } else {
            return date_phrase;
        }
    }

}
