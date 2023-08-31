/**
 * 貸款本息攤還試算
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { LoanCalculatorService } from '@pages/financial/shared/service/loan-calculator.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';

@Component({
    selector: 'app-loan-calculator-main',
    templateUrl: './loan-calculator-main.component.html',
    styleUrls: []
})

export class LoanCalculatorMainComponent implements OnInit {
    nowStep = 'edit'; // 當前步驟
    // 步驟列data
    stepMenuData = [
        {
            id: 'edit',
            name: 'STEP_BAR.COMMON.EDIT' // 輸入資料頁
        },
        {
            id: 'result',
            name: 'STEP_BAR.COMMON.RESULT', // 結果頁
            // 執行此步驟時是否隱藏步驟列
            hidden: true
        }
    ];

    notePopupOption = {}; // 注意事項設定
    returnAmtType = '1'; // 當前還款方式 1:本息 2:本金
    duration = '1'; // 當前段式 1:一段式 2:二段式 3:三段式
    capitalAmt = ''; // 貸款金額
    rate1 = ''; // 第一段貸款利率
    rate2 = ''; // 第二段貸款利率
    rate3 = ''; // 第三段貸款利率
    month1 = '0'; // 第一段月數
    month2 = '0'; // 第二段月數
    month3 = '0'; // 第三段月數
    totalMonth = '0'; // 總月數
    years = '0';
    months = '0';
    showResultPage = false; // 顯示結果頁

    // 輸出資料
    outputData = {
        returnAmtType: '',
        duration: '',
        capitalAmt: '',
        rate1: '',
        rate2: '',
        rate3: '',
        month1: '0',
        month2: '0',
        month3: '0',
        totalMonth: '0'
    };

    reqData = {
        returnAmtType: '',
        duration: '',
        capitalAmt: '',
        rowData: [],
        totalMonth: '0'
    };

    checkData = {
        status: false,
        errMsgObj: {}
    };

    resObj = { // 試算結果物件
        success: false,
        data: {}
    };

    constructor(
        private logger: Logger,
        private loanService: LoanCalculatorService,
        private headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private confirm: ConfirmService
    ) { }

    ngOnInit() {
        this.notePopupOption = {
            title: 'POPUP.NOTE.TITLE',
            content: 'POPUP.NOTE.LOAN_CALCULATOR',
        };

        this.headerCtrl.setLeftBtnClick(() => {
            this.onCancel();
        });

    }

    /**
     * [選擇還款方式]按鈕點擊事件
     */
    onSelectMethodClick(type) {
        this.returnAmtType = type;
    }

    /**
     * [選擇段式]按鈕點擊事件
     */
    onSelectDurationClick(duration) {
        this.duration = duration;
        if (duration == '1') {
            this.rate2 = '';
            this.month2 = '0';
            this.rate3 = '';
            this.month3 = '0';
        } else if (duration == '2') {
            this.rate3 = '';
            this.month3 = '0';
        }
        // 計算總期數
        this.totalMonth = (parseInt(this.month1) + parseInt(this.month2) + parseInt(this.month3)).toString();
        this.years = Math.floor(parseInt(this.totalMonth) / 12).toString();
        this.months = (parseInt(this.totalMonth) % 12).toString();
    }

    /**
     * [減號]按鈕點擊事件
     */
    onMinusBtnClick(period) {
        if (period == '1' && parseInt(this.month1) > 0) {
            this.month1 = (parseInt(this.month1) - 1).toString();
        } else if (period == '2' && parseInt(this.month2) > 0) {
            this.month2 = (parseInt(this.month2) - 1).toString();
        } else if (period == '3' && parseInt(this.month3) > 0) {
            this.month3 = (parseInt(this.month3) - 1).toString();
        }
        // 計算總期數
        this.totalMonth = (parseInt(this.month1) + parseInt(this.month2) + parseInt(this.month3)).toString();
        this.years = Math.floor(parseInt(this.totalMonth) / 12).toString();
        this.months = (parseInt(this.totalMonth) % 12).toString();
    }

    /**
     * [加號]按鈕點擊事件
     */
    onPlusBtnClick(period) {
        if (period == '1') {
            this.month1 = (parseInt(this.month1) + 1).toString();
        } else if (period == '2') {
            this.month2 = (parseInt(this.month2) + 1).toString();
        } else if (period == '3') {
            this.month3 = (parseInt(this.month3) + 1).toString();
        }
        // 計算總期數
        this.totalMonth = (parseInt(this.month1) + parseInt(this.month2) + parseInt(this.month3)).toString();
        this.years = Math.floor(parseInt(this.totalMonth) / 12).toString();
        this.months = (parseInt(this.totalMonth) % 12).toString();
    }

    /**
     * [送出]按鈕點擊事件
     */
    onSendBtnClick() {
        this.outputData.returnAmtType = this.returnAmtType;
        this.outputData.duration = this.duration;
        this.outputData.capitalAmt = this.capitalAmt;
        if (!!this.rate1) {
            this.outputData.rate1 = this.rate1.toString();
        }
        if (!!this.rate2) {
            this.outputData.rate2 = this.rate2.toString();
        }
        if (!!this.rate3) {
            this.outputData.rate3 = this.rate3.toString();
        }
        this.outputData.month1 = this.month1;
        this.outputData.month2 = this.month2;
        this.outputData.month3 = this.month3;
        this.outputData.totalMonth = this.totalMonth;
        
        this.checkData = this.loanService.checkData(this.outputData);

        this.reqData.returnAmtType = this.outputData.returnAmtType;
        this.reqData.duration = this.outputData.duration;
        this.reqData.capitalAmt = this.outputData.capitalAmt;
        this.reqData.rowData = [];
        let sub_list = {
            duration: '1',
            rate: this.outputData.rate1,
            month: this.outputData.month1
        };
        this.reqData.rowData.push(sub_list);
        if (this.outputData.duration == '2' || this.outputData.duration == '3') {
            sub_list = {
                duration: '2',
                rate: this.outputData.rate2,
                month: this.outputData.month2
            };
            this.reqData.rowData.push(sub_list);
        }
        if (this.outputData.duration == '3') {
            sub_list = {
                duration: '3',
                rate: this.outputData.rate3,
                month: this.outputData.month3
            };
            this.reqData.rowData.push(sub_list);
        }
        this.reqData.totalMonth = this.outputData.totalMonth;
        this.logger.error("reqData", this.reqData);
        if (this.checkData.status) {
            this.loanService.sendData(this.reqData).then(
                (res) => {
                    this.resObj.success = true;
                    this.resObj.data = res;
                    return Promise.resolve(); 
                },
                (errObj) => {
                    this.resObj.success = false;
                    this.resObj.data = errObj;
                    return Promise.resolve();
                }
            ).then(
                () => {
                    this.showResultPage = true;
                    this.headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                    this.headerCtrl.setRightBtnClick(() => {
                        this.navgator.editBack();
                    });
                }
            );
        }

    }

    /**
     * 子層返回事件
     * @param e
     */
    onBackPage(e) {
        this.showResultPage = false;
        this.returnAmtType = '1';
        this.duration = '1';
        this.capitalAmt = '';
        this.rate1 = '';
        this.rate2 = '';
        this.rate3 = '';
        this.month1 = '0';
        this.month2 = '0';
        this.month3 = '0';
        this.totalMonth = '0';

        this.headerCtrl.setOption({ leftBtnIcon: 'edit-back', rightBtnIcon: '' }); // 變更Header按鈕樣式
        this.headerCtrl.setLeftBtnClick(() => {
            this.onCancel();
        });
    }

    capitalAmtChange(output) {
        this.capitalAmt = output.value;
    }

    onCancel() {
        this.confirm.cancelEdit({type: 'edit'}).then(
            (res) => {
                this.navgator.editBack();
            },
            (errObj) => {

            }
        );
    }

    rate1Change(output) {
        this.rate1 = output.value;
    }

    rate2Change(output) {
        this.rate2 = output.value;
    }

    rate3Change(output) {
        this.rate3 = output.value;
    }

}
