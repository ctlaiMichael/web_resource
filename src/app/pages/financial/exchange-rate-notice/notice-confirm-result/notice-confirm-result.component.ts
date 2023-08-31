/**
 * 匯率到價通知設定確認頁和結果頁
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { ExchangeRateNoticeCUDService } from '@pages/financial/shared/service/exchange-rate-notice-CUD.service';
import { FormateService } from '@template/formate/formate.service';
import { PadUtil } from '@util/formate/string/pad-util';

@Component({
    selector: 'app-notice-confirm-result',
    templateUrl: './notice-confirm-result.component.html',
    styleUrls: [],
    providers: [ExchangeRateNoticeCUDService]
})

export class NoticeConfirmResultComponent implements OnInit {

    @Input() inputData;

    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();

    nowStep = 'check'; // 當前步驟
    // 步驟列data
    stepMenuData = [
        {
            id: 'edit',
            name: 'STEP_BAR.COMMON.EDIT' // 輸入資料頁
        },
        {
            id: 'check',
            name: 'STEP_BAR.COMMON.CHECK', // 確認資料頁
        },
        {
            id: 'result',
            name: 'STEP_BAR.COMMON.RESULT', // 結果頁
            // 執行此步驟時是否隱藏步驟列
            hidden: true
        }
    ];

    reqData = {
        action: '',
        record: {
            settingTime: '',
            email: '',
            transInCurrency: {
                currencyCode: '',
                currencyName: '',
                buyRate: '',
                sellRate: ''
            },
            transOutCurrency: {
                currencyCode: '',
                currencyName: '',
                buyRate: '',
                sellRate: ''
            },
            referenceRate: '',
            expectedRate: '',
            noticeDateRange: {
                start: '',
                end: ''
            }
        }
    };

    resData = {
        action: '',
        transInCurrency: {
            currencyCode: '',
            currencyName: ''
        },
        transOutCurrency: {
            currencyCode: '',
            currencyName: ''
        },
        expectedRate: '',
        startDate: '',
        endDate: ''
    };

    showResultPage = false; // 顯示結果頁
    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj

    constructor(
        private _headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private _logger: Logger,
        private confirm: ConfirmService,
        private exchangeRateCUD: ExchangeRateNoticeCUDService,
        private formateService: FormateService
    ) { }

    ngOnInit() {
        this._headerCtrl.setLeftBtnClick(() => {
            this.onLeftBtnClick();
        });

    }

    /**
     * Header左側按鈕點擊事件
     */
    onLeftBtnClick() {
        if (this.inputData.action == 'delete') {
            this.back();
        } else {
            let output = {
                page: 'confirm'
            };
            this.onBackPageEvent(output);
        }
    }

    /**
     * [取消]按鈕點擊事件
     */
    onCancelBtnClick() {
        this.back();
    }

    /**
     * [確認]按鈕點擊事件
     */
    onConfirmBtnClick() {
        this.reqData.action = this.inputData.action;
        this.reqData.record.email = this.inputData.email;
        this.reqData.record.transInCurrency = this.inputData.buyCurrencyObj;
        this.reqData.record.transOutCurrency = this.inputData.sellCurrencyObj;
        let temp = this.inputData.referenceRate.split('.');
        if (temp.length > 1) {
            temp[1] = PadUtil.pad(temp[1], 4, 'right');
            this.inputData.referenceRate = temp[0] + '.' + temp[1];
        } else {
            this.inputData.referenceRate = temp[0] + '0000';
        }
        this.reqData.record.referenceRate = this.inputData.referenceRate;
        this.reqData.record.expectedRate = this.inputData.expectedRate;
        this.reqData.record.noticeDateRange.start = this.inputData.startDate;
        this.reqData.record.noticeDateRange.end = this.inputData.endDate;
        if (this.inputData.action == 'create') {
            let settingTime = this.formateService.transDate('NOW_TIME');
            this.reqData.record.settingTime = settingTime;
            this.exchangeRateCUD.addData(this.reqData).then(
                (res) => {
                    this.resStatus = res.status;
                    this.statusObj = res.statusObj;
                    this.resData.action = res.action;
                    this.resData.transInCurrency = this.inputData.buyCurrencyObj;
                    this.resData.transOutCurrency = this.inputData.sellCurrencyObj;
                    this.resData.expectedRate = res.expectedRate;
                    this.resData.startDate = res.startDate;
                    this.resData.endDate = res.endDate;
                    return Promise.resolve();
                },
                (errObj) => {
                    // Error
                    this.resStatus = false;
                    this.statusObj = errObj;
                    return Promise.resolve();
                }
            ).then(
                () => {
                    this.showResultPage = true;
                    this._headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                    this._headerCtrl.setRightBtnClick(() => {
                        this.navgator.editBack();
                    });
                }
            );
        } else if (this.inputData.action == 'update') {
            this.reqData.record.settingTime = this.inputData.settingTime;
            this.exchangeRateCUD.updateData(this.reqData).then(
                (res) => {
                    this.resStatus = res.status;
                    this.statusObj = res.statusObj;
                    this.resData.action = res.action;
                    this.resData.transInCurrency = this.inputData.buyCurrencyObj;
                    this.resData.transOutCurrency = this.inputData.sellCurrencyObj;
                    this.resData.expectedRate = res.expectedRate;
                    this.resData.startDate = res.startDate;
                    this.resData.endDate = res.endDate;
                },
                (errObj) => {
                    // Error
                    this.resStatus = false;
                    this.statusObj = errObj;
                    return Promise.resolve();
                }
            ).then(
                () => {
                    this.showResultPage = true;
                    this._headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                    this._headerCtrl.setRightBtnClick(() => {
                        this.navgator.editBack();
                    });
                }
            );
        } else if (this.inputData.action == 'delete') {
            this.reqData.record.settingTime = this.inputData.settingTime;
            this.exchangeRateCUD.deleteData(this.reqData).then(
                (res) => {
                    this.resStatus = res.status;
                    this.statusObj = res.statusObj;
                    // this.resData.action = res.action;
                    this.resData.transInCurrency = this.inputData.buyCurrencyObj;
                    this.resData.transOutCurrency = this.inputData.sellCurrencyObj;
                    this.resData.expectedRate = this.inputData.expectedRate;
                    this.resData.startDate = this.inputData.startDate;
                    this.resData.endDate = this.inputData.endDate;
                },
                (errObj) => {
                    // Error
                    this.resStatus = false;
                    this.statusObj = errObj;
                    return Promise.resolve();
                }
            ).then(
                () => {
                    this.showResultPage = true;
                    this._headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                    this._headerCtrl.setRightBtnClick(() => {
                        this.navgator.editBack();
                    });
                }
            );
        }

    }

    /**
     * 返回匯率到價通知設定頁面
     */
    onBackPageEvent(output) {
        this.backPageEmit.emit(output);
    }

    /**
     * 返回首頁
     */
    back() {
        this.confirm.cancelEdit().then(
            (res) => {
                this.navgator.editBack();
            },
            (errObj) => {

            }
        );
    }

    /**
     * [再做一筆]按鈕點擊事件
     */
    onAgainBtnClick() {
        let output = {
            page: 'result'
        };
        this.onBackPageEvent(output);
    }

}
