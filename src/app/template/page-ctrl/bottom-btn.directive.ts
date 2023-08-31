/**
 * 按鈕處理
 */
import {
    Directive, ElementRef, Input, Output, OnInit
    , EventEmitter, Renderer2, 
} from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';


@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[bottomBtn]'
})
export class BottomBtnDirective implements OnInit {
    /**
     * 參數處理
     */
    constructor(
        private _logger: Logger,
        private el: ElementRef,
        private renderer: Renderer2
    ) {

    }

    ngOnInit() {
        let nowElement = this.el.nativeElement;
        if (!!nowElement) {
            this.renderer.addClass(nowElement, 'zIndex_level_7_1');
        }
    }

}
