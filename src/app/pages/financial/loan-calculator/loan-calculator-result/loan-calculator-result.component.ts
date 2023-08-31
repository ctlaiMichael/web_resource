/**
 * 貸款本息攤還試算結果頁
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-loan-calculator-result',
    templateUrl: './loan-calculator-result.component.html',
    styleUrls: []
})

export class LoanCalculatorResultComponent implements OnInit {

    @Input() inputData;

    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();

    capitalAmt = ''; // 貸款金額
    returnAmtType = ''; // 還款方式 1:本息 2:本金
    totalPayment = ''; // 期間攤還本息
    totalInterestPayable = ''; // 期間應付利息
    loanData = []; // 貸款本息攤還試算data

    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj

    constructor(

    ) { }

    ngOnInit() {
        if (this.inputData.success) {
            this.resStatus = this.inputData.data.status;
            this.statusObj = this.inputData.data.statusObj;
            this.capitalAmt = this.inputData.data.capitalAmt;
            this.returnAmtType = this.inputData.data.returnAmtType;
            if (this.returnAmtType == '1') {
                this.returnAmtType = 'FINANCIAL.EQUAL_PAYMENTS';
            } else if (this.returnAmtType == '2') {
                this.returnAmtType = 'FINANCIAL.EQUAL_AMORTIZATION';
            } else {
                this.returnAmtType = '';
            }
            this.totalPayment = this.inputData.data.totalPayment;
            this.totalInterestPayable = this.inputData.data.totalInterestPayable;
            this.loanData = this.inputData.data.data;
        } else {
            this.resStatus = this.inputData.data.status;
            this.statusObj = this.inputData.data;
        }
        
    }

    /**
     * [重新試算]按鈕點擊事件
     */
    onAgainBtnClick() {
        this.onBackPageEvent();
    }

    /**
     * 返回事件
     */
    onBackPageEvent() {
        this.backPageEmit.emit();
    }

}
