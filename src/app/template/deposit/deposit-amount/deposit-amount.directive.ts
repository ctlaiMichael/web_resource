/**
 * 交易明細 存入與支出
 * 當支出為負值(沖正) "不"需要特殊處理
 * 冲正交易状态主要有三种：成功、失败和不确定。=> 不需要沖正!以帳務主機資料為主
 * 
 * 啟動openRush，則會判斷支出與存入欄位，來決定金額是正還是負。
 * 否則主機給什麼就顯示什麼
 */
import {
    Directive, ElementRef, Input, Output, OnDestroy
    , HostListener, EventEmitter, OnInit

} from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[depositAmount]'
})
export class DepositAmountDirective implements OnInit, OnDestroy {
    /**
     * 參數處理
     */
    @Input() data;
    @Input() setCurrency;
    showContent = ''; // 是否顯示內容
    showAmount = ''; // 主要顯示金額
    showCurrency = ''; // 幣別
    private crAmt = '';
    private drAmt = '';
    private openRush = true; // 是否啟動沖正機制, true 啟動, false 關閉
    private textMaxLength = 14; // 9,999,999,999,999.99

    constructor(
        private _logger: Logger,
        private el: ElementRef,
        private _formateService: FormateService,
        private _checkService: CheckService
    ) {
    }


    ngOnDestroy() {
    }

    ngOnInit() {
        // 幣別欄位
        if (!this.setCurrency) {
            this.showCurrency = '';
        } else {
            this.showCurrency = this.setCurrency;
        }
        // 存入金額
        let crAmt = this._formateService.checkField(this.data, 'crAmt');
        // 支出金額
        let drAmt = this._formateService.checkField(this.data, 'drAmt');
        const check_crAmt = this._checkService.checkEmpty(crAmt, true, true);
        const check_drAmt = this._checkService.checkEmpty(drAmt, true, true);
        
        if (!check_crAmt && !check_drAmt) {
            // 都為0
            this.showContent = 'Empty';
            this.showAmount = '';
            this.crAmt = this._formateService.transMoney('0');
            this.drAmt = this._formateService.transMoney('0');
        } else {
            let crAmt2 = '';
            let drAmt2 = '';
            if (check_crAmt) {
                // 存入欄位處理
                let tmp_crdata = this.checkAmountType(crAmt, 'crAmt');
                this.showContent = tmp_crdata.show_type;
                this.showAmount = tmp_crdata.amount;
                crAmt2 = tmp_crdata.amount;
            }
            if (check_drAmt) {
                // 支出欄位處理
                let tmp_drdata = this.checkAmountType(drAmt, 'drAmt');
                this.showContent = tmp_drdata.show_type;
                this.showAmount = tmp_drdata.amount;
                drAmt2 = tmp_drdata.amount;
            }
            if (check_crAmt && check_drAmt) {
                // 都有資料(不太可能)
                this.showContent = 'All';
                this.showAmount = [crAmt2, drAmt2].join('/');
            }
        }

        this.showPage();
    }


    private showPage() {
        let text = '- -';
        let set_class = '';
        switch (this.showContent) {
            case 'crAmt':
                // 存入: d,ddd,ddd,ddd,ddd.dd
                text = this.showAmount;
                set_class = 'txt_num_reduce';
                break;
            case 'drAmt':
                // 支出:-d,ddd,ddd,ddd,ddd.dd
                text = this.showAmount;
                set_class = 'txt_num_add';
                break;
            case 'Empty':
                // empty: 0.00/0.00
                text = this.crAmt + '/' + this.drAmt;
                set_class = 'txt_gray';
                break;
            case 'Other':
                text = this.showAmount;
                set_class = 'txt_gray';
                break;
            case 'All':
                text = this.showAmount;
                set_class = 'txt_gray';
                break;
        }
        this.el.nativeElement.innerHTML = text;
        if (set_class !== '') {
            this.el.nativeElement.classList.add(set_class);
        }
        // 金額太長跑版
        if (this.textMaxLength > 0 && text.length > this.textMaxLength) {
            this.el.nativeElement.classList.add('over_amount');
        }
    }

    /**
     * 金額轉換處理
     * @param amount 
     */
    private checkAmountType(amount, type) {
        let output = {
            show_type: 'crAmt',
            amount: ''
        };
        let new_amount = amount;
        if (typeof new_amount == 'string') {
            new_amount = new_amount.replace(/,/g, '');
        }

        let number_obj = this._checkService.checkNumber(new_amount, 'number');
        if (!number_obj.status) {
            // 非數值
            output.show_type = 'Other';
            output.amount = amount;
            return output;
        }

        let number_data = parseFloat(number_obj.data);
        let isDrAmt = false; // 是支出
        let isNegative = (number_data < 0) ? true : false;
        if (isNegative) {
            isDrAmt = true;
        }
        // 支出<0 => 存入, 存入<0 => 支出
        if (this.openRush && type == 'drAmt') {
            isDrAmt = true;
            if (isNegative) {
                isDrAmt = false;
            }
        }

        if (isDrAmt) {
            // 支出
            output.show_type = 'drAmt';
            const tmp_drAmt = Math.abs(number_data);
            output.amount = '-' + this._formateService.transMoney(tmp_drAmt, this.showCurrency);
            this.drAmt = output.amount;
        } else {
            // 存入
            output.show_type = 'crAmt';
            const tmp_crAmt = Math.abs(number_data);
            output.amount = this._formateService.transMoney(tmp_crAmt, this.showCurrency);
            this.crAmt = output.amount;
        }



        return output;
    }


}

