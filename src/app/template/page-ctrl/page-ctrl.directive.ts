/**
 * display none
 * ngShow實作
 */
import {
    Directive, ElementRef, Input, OnInit, OnChanges, Renderer2
} from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[htShow]'
})
export class HtShowDirective implements OnInit, OnChanges {
    /**
     * 參數處理
     */
    @Input() htShow; // 展開收和控制

    constructor(
        private _logger: Logger,
        private el: ElementRef,
        private renderer: Renderer2
    ) {

    }

    // directive init不會進ngOnChanges
    ngOnInit() {
    }

    ngOnChanges() {
        let nowElement = this.el.nativeElement;
        if (!!this.htShow) {
            this.renderer.removeClass(nowElement, 'pageCtrlHiddenBox');
        } else {
            this.renderer.addClass(nowElement, 'pageCtrlHiddenBox');
        }
    }



}
