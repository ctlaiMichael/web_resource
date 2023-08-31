/**
 * 交易明細 存入與支出
 * 當支出為負值(沖正) 需要特殊處理
 * 當存入為正值() 需要特殊處理
 * 冲正交易状态主要有三种：成功、失败和不确定。
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
    selector: '[depositAmountResult]'
})
export class DepositAmountResultDirective implements OnInit, OnDestroy {
    /**
     * 參數處理
     */
    @Input() data;
    @Input() currency;
    showContent = ''; // 是否顯示內容
    crAmt = '';
    drAmt = '';


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
        let currency = (this.currency == 'TWD' || this.currency == 'NTD') ? 'NT$' : this.currency;
        let crAmt = '';
        let drAmt = '';
        // 正數
        if (typeof this.data == 'string' && this.data.indexOf('-') < 0
            && this.data != '') {
            drAmt = this.data;
            this.drAmt = this._formateService.transMoney(drAmt, currency);
            if (this.drAmt.indexOf('+') >= 0) {
                let n = this.drAmt.indexOf('+');
                let postive = this.drAmt.substring(n + 1, this.drAmt.length);
                this.drAmt = currency + postive;
            } else {
                this.drAmt = currency + this.drAmt;
            }
            this.showContent = 'drAmt';
            // 負數
        } else if (typeof this.data == 'string' && this.data.indexOf('-') >= 0
            && this.data != '') {
            crAmt = this.data;
            this.crAmt = currency + (this._formateService.transMoney(crAmt, currency));
            this.showContent = 'crAmt';
        } else {
            this.showContent = 'Empty';
        }
        this.showPage();
    }


    private showPage() {
        let text = '- -';
        let set_class = '';
        switch (this.showContent) {
            case 'crAmt':
                // 負數:-d,ddd,ddd,ddd,ddd.dd
                text = this.crAmt;
                set_class = 'txt_num_reduce';
                break;
            case 'drAmt':
                // 正數: d,ddd,ddd,ddd,ddd.dd
                text = this.drAmt;
                set_class = 'txt_num_add';
                break;
            case 'Empty':
                // empty: 0.00/0.00
                text = '--';
                set_class = 'txt_gray';
                break;
            // case 'reverse':
            //     break;
        }
        this.el.nativeElement.innerHTML = text;
        if (set_class !== '') {
            this.el.nativeElement.classList.add(set_class);
        }
        // 目前先不處理
        // if (text.length > 8) {
        //     // 金額太長跑版
        //     this.el.nativeElement.classList.add('over_amount');
        // }
    }


}

