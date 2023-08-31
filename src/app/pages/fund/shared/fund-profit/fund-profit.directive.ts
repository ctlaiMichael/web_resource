/**
 * 投資參考報酬率
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
    selector: '[fundProfit]'
})
export class FundProfitDirective implements OnInit, OnDestroy {
    /**
     * 參數處理
     */
    @Input() data;
    @Input() type;
    showContent = ''; // 是否顯示內容
    checkRate = '';


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
        // this._logger.error('FundProfitDirective init', this.data);
        this.checkRate = this._formateService.checkField(this.data, this.type);
        const empty_rate = this._checkService.checkEmpty(this.checkRate, true, false);

        // this._logger.log('FundProfitDirective init', this.checkRate, empty_rate);
        let indxNum = this.checkRate.indexOf('.'); // 中台有可能回應 .12 小數點在第一位, 抓第一位為.來判斷
        if (!empty_rate) { // 空
            this.showContent = 'empty';
        } else if ((this.checkRate.indexOf('+') > -1 || parseFloat(this.checkRate) > 0)) { // 正利率
            this.checkRate = this.checkRate.replace("+", "");
            this.checkRate = this.checkRate.replace(" ", "");
            this.showContent = 'positive';
        } else if (this.checkRate.indexOf('-') > -1) {   // 負利率
            this.checkRate = this.checkRate.replace("-", "");
            this.checkRate = this.checkRate.replace(" ", "");
            this.showContent = 'negative';
        } else {    // 零
            this.showContent = 'ntchange';
        }
        this.showPage();
    }


    private showPage() {
        let text = '- -';
        let set_class = '';
        let show_rate = this._formateService.transFinancial(this.checkRate);
        switch (this.showContent) {
            case 'positive':
                // ▲ +6.65%
                text = '▲ ' + show_rate + ' %';
                set_class = 'txt_higher';
                break;
            case 'negative':
                // ▼ -1.09%
                text = '▼ ' + show_rate + ' %';
                set_class = 'txt_lower';
                break;
            case 'ntchange':
                // 0.00%
                text = show_rate + ' %';
                set_class = 'txt_gray';
                break;
            case 'empty':
                // empty: --
                text = '- -';
                set_class = 'txt_gray';
                break;
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

