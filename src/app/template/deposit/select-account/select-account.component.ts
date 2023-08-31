/**
 * 
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { SelectAccountService } from './select-account.service';
import { AccountPopupService } from '@template/list/account-popup/account-popup.service';
import { CheckService } from '@template/check/check.service';

@Component({
    selector: 'app-select-account',
    templateUrl: './select-account.component.html',
    styleUrls: [],

})
export class SelectAccountComponent implements OnInit {
    @Input() setCloseBg: any; // 關閉背景   
    @Input() defaultAcct: any; // 預設帶進來之帳號
    @Input() type: string; // 帳號類別， 1: 帳戶明細...等其他, 2:貸款服務 
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    popupOption = {
        data: [],
        select: '', // 選擇之帳號，帳號打勾使用
        type: '',
        currencyCode: ''
    };
    // 回傳至父層
    acctInfo = {
        account: '',
        currencyCode: ''
    };
    showAcct = '';
    showCcy = '';ˇ
    closeBg = false; // 關閉背景樣式

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private mainService: SelectAccountService,
        private popupService: AccountPopupService,
        private _checkService: CheckService
    ) {
    }


    ngOnInit() {
        this._logger.log("SelectAccountComponent, type:", this.type);
        this.closeBg = (!!this.setCloseBg) ? true : false;
        this.popupOption.type = this.type;
        this.showAcct = this.defaultAcct.account;
        // getAcctData取得帳號 => type: 1: 帳戶明細...等其他, 2:貸款服務
        this.mainService.getAcctData({}, this.type).then(
            (result) => {
                // 貸款帳戶
                if (this.type == 'loan') {
                    this.popupOption.data = result.data;
                    this.doLoan(result); // 處理 貸款資料
                    // 回傳至父層
                    let loanInfo = {
                        account: ''
                    };
                    loanInfo.account = this.acctInfo.account;
                    this.onBackPageData(loanInfo);
                    // 帳戶明細...等
                } else if (this.type == 'current') {
                    // console.log("type:current, result:", result);
                    this.popupOption.data = result.currentData;
                    this.doCurrentData(result); // 處理 帳戶明細資料
                    // 帳戶資料回傳(正常流程) 
                    this.onBackPageData(this.acctInfo);
                } else if (this.type == 'timeDeposit') {
                    this.popupOption.data = result.timeDeposit;
                    this.doTimeDeposit(result); // 處理 帳戶明細資料
                    // 帳戶資料回傳(正常流程) 
                    this.onBackPageData(this.acctInfo);
                }
            },
            (errorObj) => {
                this._logger.log("getAcctData error, errorObj:", errorObj);
                this.onErrorPageData(errorObj);
                errorObj['type'] = 'message';
                // this._handleError.handleError(errorObj);
            }
        );
    }

    // 點擊帳號
    onSelect() {
        this._logger.log("into onSelect");
        // 回傳使用者選擇之帳號
        this.popupService.show(this.popupOption).then(
            (result) => {
                this._logger.log("result:", result);
                this.showAcct = result['account'];
                this.showCcy = result['currencyCode'];
                // 回來將預設帳號帶入，顯示下次開啟視窗之選擇帳號
                if (this.type != 'loan') {
                    this.popupOption.select = this.showAcct + '' + this.showCcy;
                } else {
                    this.popupOption.select = this.showAcct;
                }
                this.popupOption.currencyCode = result['currencyCode'];
                this.onBackPageData(result);
            },
            (cancel) => {
                this._logger.log("into cancel");
            }
        );
    }

    /**
     * 重新設定page data 子層返回事件
     * @param setData
     */
    onBackPageData(setData) {
        let output = {
            'page': 'acct-page',
            'type': 'back',
            'data': setData
        };
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


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------



    /**
     * 處理 帳戶明細資料
     * @param result 中台回傳結果
     */
    private doCurrentData(result) {
        // 若沒預設帳號，將api回傳第一筆帳號帶入預設
        let dfAct = this.mainService.getDefaultAcct(this.defaultAcct);
        let listdata = this._formateService.checkObjectList(result, 'currentData');
        if (dfAct.account == '') {
            this._logger.log("has not defaultAcct");
            // 第一筆例外判斷
            let tmp_data = this.mainService.getFirstData(listdata);
            if (!!tmp_data) {
                this.acctInfo.account = tmp_data['accountId']; // 帶回父層，發send05030102 request
                this.acctInfo.currencyCode = tmp_data['currencyCode'];
                this.showAcct = tmp_data['accountId']; // 此頁顯示
                this.popupOption.select = tmp_data['accountId'] + '' + tmp_data['currencyCode']; // 紀錄選擇之帳號，popup打勾
            } else {
                // 不顯示任何帳號
            }
        } else {
            // 若有選定預設帳號，帶入popup預設帳號
            let temp = this.mainService.setDefaultInfo(listdata, dfAct, true);
            this._logger.log("has defaultAcct", temp);
            this.acctInfo.account = temp.accountId;
            this.acctInfo.currencyCode = temp.currencyCode;
            this.popupOption.select = temp.accountId + '' + temp.currencyCode; // 紀錄選擇之帳號，popup打勾
        }
    }

    /**
     * 處理 定存資料
     * @param result 中台回傳結果
     */
    private doTimeDeposit(result) {
        // 若沒預設帳號，將api回傳第一筆帳號帶入預設
        let dfAct = this.mainService.getDefaultAcct(this.defaultAcct);
        let listdata = this._formateService.checkObjectList(result, 'timeDeposit');
        if (dfAct.account == '') {
            this._logger.log("has not defaultAcct");
            // 第一筆例外判斷
            let tmp_data = this.mainService.getFirstData(listdata);
            if (!!tmp_data) {
                this.acctInfo.account = tmp_data['accountId']; // 帶回父層，發send05030102 request
                this.acctInfo.currencyCode = tmp_data['currencyCode'];
                this.showAcct = tmp_data['accountId']; // 此頁顯示
                this.popupOption.select = tmp_data['accountId'] + '' + tmp_data['currencyCode']; // 紀錄選擇之帳號，popup打勾
            } else {
                // 不顯示任何帳號
            }
        } else {
            // 若有選定預設帳號，帶入popup預設帳號
            this._logger.log("has defaultAcct");
            let temp = this.mainService.setDefaultInfo(listdata, dfAct, true);
            this.acctInfo.account = temp.accountId;
            this.acctInfo.currencyCode = temp.currencyCode;
            this.popupOption.select = temp.accountId + '' + temp.currencyCode; // 紀錄選擇之帳號，popup打勾
        }
    }

    /**
     * 處理 貸款資料
     * @param result 中台回傳結果
     */
    private doLoan(result) {
        // 若沒預設帳號，將api回傳第一筆帳號帶入預設
        let dfAct = this.mainService.getDefaultAcct(this.defaultAcct);
        let listdata = this._formateService.checkObjectList(result, 'data');
        if (dfAct.account == '') {
            this._logger.log("has not defaultAcct");
            // 第一筆例外判斷
            let tmp_data = this.mainService.getFirstData(listdata);
            if (!!tmp_data) {
                this.acctInfo.account = tmp_data['accountId']; // 帶回父層，發send05030102 request
                this.acctInfo.currencyCode = tmp_data['currencyCode'];
                this.showAcct = tmp_data['accountId']; // 此頁顯示
                this.popupOption.select = tmp_data['accountId']; // 紀錄選擇之帳號，popup打勾
            } else {
                // 不顯示任何帳號
            }
        } else {
            // 若有選定預設帳號，帶入popup預設帳號
            this._logger.log("has defaultAcct");
            let temp = this.mainService.setDefaultInfo(listdata, dfAct, false); // 貸款不比對幣別
            this.showAcct = dfAct.account; // 畫面顯示
            this.acctInfo.account = temp.accountId;
            this.acctInfo.currencyCode = temp.currencyCode;
            this.popupOption.select = temp.accountId; // 紀錄選擇之帳號，popup打勾
        }
    }

}

