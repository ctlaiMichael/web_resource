/**
 * 投資金額
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
    selector: '[fundAmount]'
})
export class FundAmountDirective implements OnInit, OnDestroy {
    /**
     * 參數處理
     */
    @Input() data;
    @Input() fieldSet; // 欄位設定
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
        let crAmtField = this._formateService.checkField(this.fieldSet, 'crAmt');
        let drAmtField = this._formateService.checkField(this.fieldSet, 'drAmt');
        let crAmt = this._formateService.checkField(this.data, crAmtField);
        let drAmt = this._formateService.checkField(this.data, drAmtField);
        const check_crAmt = this._checkService.checkEmpty(crAmt, true, true);
        const check_drAmt = this._checkService.checkEmpty(drAmt, true, true);

        if (!check_crAmt && !check_drAmt) {
            // 都為0
            this.showContent = 'Empty';
            this.crAmt = this._formateService.transMoney('0');
            this.drAmt = this._formateService.transMoney('0');
        } else if (check_crAmt) {
            this.showContent = 'crAmt';
            if (parseFloat(crAmt) < 0) {
                // 支出沖正
                this.showContent = 'drAmt';
                const tmp_drAmt = Math.abs(parseFloat(crAmt));
                this.drAmt = this._formateService.transMoney(tmp_drAmt);
            } else {
                this.crAmt = '-' + this._formateService.transMoney(crAmt);
            }
        } else {
            this.showContent = 'drAmt';
            if (parseFloat(drAmt) < 0) {
                // 存入沖正
                this.showContent = 'crAmt';
                const tmp_crAmt = Math.abs(parseFloat(drAmt));
                this.crAmt = '-' + this._formateService.transMoney(tmp_crAmt);
            } else {
                this.drAmt = this._formateService.transMoney(drAmt);
            }
        }
        // 沖正處理

        this.showPage();
    }


    private showPage() {
        let text = '- -';
        let set_class = '';
        switch (this.showContent) {
            case 'crAmt':
                // 支出:-d,ddd,ddd,ddd,ddd.dd
                text = this.crAmt;
                set_class = 'txt_num_reduce';
                break;
            case 'drAmt':
                // 存入: d,ddd,ddd,ddd,ddd.dd
                text = this.drAmt;
                set_class = 'txt_num_add';
                break;
            case 'Empty':
                // empty: 0.00/0.00
                text = this.crAmt + '/' + this.drAmt;
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

