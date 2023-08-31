/**
 * 控制image顯示
 * [output] N/A
 */
import {
    Directive, ElementRef, Input, OnDestroy, OnChanges, Output, EventEmitter
} from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
declare var $: any;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[imageCtrl]'
})
export class ImageCtrlDirective implements OnChanges, OnDestroy {
    /**
     * 參數處理
     */
    @Input() imageCtrl; // 圖片資料
    @Input() imageType; // 顯示形式
    private show_base64 = false;
    private show_image = '';

    constructor(
        private _logger: Logger,
        private el: ElementRef
    ) {

    }


    ngOnChanges() {
        this.checkImage();
        if (this.show_image != '') {
            this.doEvent();
        }
    }

    ngOnDestroy() {
    }


    private doEvent() {
        if (this.imageType == 'background-image') {
            // css:background-image
            this.el.nativeElement.style.backgroundImage = 'url(' + this.show_image + ')';
        } else {
            let html_text = '<img src="' + this.show_image + '" />';
            this.el.nativeElement.innerHTML = html_text;

        }
    }

    /**
     * 檢查圖片資料
     */
    private checkImage() {
        let output = '';
        let base64Flag = false;
        if (typeof this.imageCtrl == 'string' && !!this.imageCtrl) {
            output = this.imageCtrl;
            let reg = new RegExp(/^http|^((\.\/|\.\.\/|\/)assets\/images\/)/ , '');
            if (!reg.test(this.imageCtrl)) {
                // base64 圖片檔案
                this.show_base64 = true;
                output = 'data:image/jpeg;base64,' + output;
            }
        }
        this.show_image = output;
        this.show_base64 = base64Flag;
    }


}
