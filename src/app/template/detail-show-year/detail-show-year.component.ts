
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { TranslateService } from '@ngx-translate/core';
import { DepositAccountDetailService } from '@pages/deposit/shared/deposit-account-detail.service';
@Component({
    selector: 'app-detail-show-year',
    templateUrl: './detail-show-year.component.html',
})

// 列表顯示年月標題(跑迴圈顯示過不會在顯示)
export class DetailShowYearComponent implements OnInit {

    /**
     * 參數處理
     */
    @Input() setData; // 傳入當下那一筆資料
    showData = false; // 是否顯示資料
    formateDate = '';
    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private translate: TranslateService,
        private depositService: DepositAccountDetailService // 儲存年月,判斷該年分是否出現過(有此筆資料)
    ) { }

    ngOnInit() {
        // this._logger.log("ngOnInit, DetailShowYearComponent, setData:", this.setData);
        this._init();
    }

    /**
     * 控制初始化事件
     */
    private _init() {
        // 有txDate欄位做日期處理
        if (this.setData.hasOwnProperty('txDate') && typeof this.setData.txDate != 'undefined' &&
            this.setData.txDate != '') {
            this.formateDate = this.formateYear(this.setData.txDate); // 先將時間formate為 yyyy-MM
            // 無txDate欄位就不顯示
        } else {
            this.showData = false;
            return false;
        }
        this.doCheckYear(this.formateDate); // 檢查日期(yyyy-MM)有無出現過
    }

    /**
 * 將年月日formate為yyyy-MM
 * @param setData 
 */
    formateYear(setData) {
        let temp = ''; // 無'-'日期格式
        let formateDate = ''; // 回傳formate格式, yyyy-MM
        // 日期格式有'-', EX: 2020-07
        if (setData.indexOf('-') >= 0) {
            let splitData = setData.split('-');
            splitData.forEach(item => {
                temp += item;
            });
            // 日期格式有無'-', EX: 202007
        } else {
            temp = setData;
        }
        let year = temp.substring(0, 4);
        let month = temp.substring(4, 6);
        formateDate = year + '-' + month;
        return formateDate;
    }

    /**
 * 檢查日期(yyyy-MM)有無出現過
 * @param setData 
 */
    doCheckYear(setData) {
        let hasYearFlag = false; // 判斷是否儲存過(紀錄是否有其中一筆相同)
        // 沒存過,一定沒有值,直接顯示
        if (this.depositService.hasYearList.length == 0) {
            this.depositService.hasYearList.push(setData);
            this.showData = true;
        } else {
            this.depositService.hasYearList.forEach(item => {
                if (item == setData) {
                    hasYearFlag = true; // 只要有存過 flag: true
                }
            });
            // 跑完迴圈後,判斷是否有其中一筆相同,都沒有,塞值顯示
            if (hasYearFlag == false) {
                this.depositService.hasYearList.push(setData);
                this.showData = true;
            }
        }
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------


}
