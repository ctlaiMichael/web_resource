/**
 * 基金標的顯示
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
    selector: '[fundCodeShow]'
})
export class FundCodeDirective implements OnInit, OnDestroy {
    /**
     * 參數處理
     */
    @Input() data: any;
    @Input() fieldSet: any; // 欄位設定
    showContent = ''; // 是否顯示內容
    fieldIndex = {
        fundEngCcy: 'fundEngCcy',
        fundCode: 'fundCode',
        fundName: 'fundName',
        fundChiCcy: 'fundChiCcy'
    };
    fieldData = {
        fundEngCcy: '',
        fundCode: '',
        fundName: '',
        fundChiCcy: ''
    };


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
        this.fieldIndex = this._formateService.findIndexList(this.fieldIndex, this.fieldSet);

        this.fieldData.fundEngCcy = this._formateService.checkField(this.data, this.fieldIndex.fundEngCcy);
        this.fieldData.fundCode = this._formateService.checkField(this.data, this.fieldIndex.fundCode);
        this.fieldData.fundName = this._formateService.checkField(this.data, this.fieldIndex.fundName);
        this.fieldData.fundChiCcy = this._formateService.checkField(this.data, this.fieldIndex.fundChiCcy);

        this.showPage();
    }


    private showPage() {
        let empty_str = '- -';
        let text = '- -';
        let set_class = '';

        let tmp_data = [];
        // 幣別代碼
        // if (this.fieldData.fundEngCcy != '') {
        //     tmp_data.push(this.fieldData.fundEngCcy);
        // }
        if (this.fieldData.fundCode != '') {
            tmp_data.push(this.fieldData.fundCode);
        }
        if (this.fieldData.fundName != '') {
            tmp_data.push(this.fieldData.fundName);
        }
        // 中文幣別
        // if (this.fieldData.fundChiCcy != '') {
        //     tmp_data.push('(' + this.fieldData.fundChiCcy + ')');
        // }

        if (tmp_data.length > 0) {
            text = tmp_data.join(' ');
        }


        this.el.nativeElement.innerHTML = text;
        if (set_class !== '') {
            this.el.nativeElement.classList.add(set_class);
        }
    }


}

