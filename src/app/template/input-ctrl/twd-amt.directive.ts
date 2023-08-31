/**
 * 只能輸入整數金額、開頭去零 directive
 */

import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appTwdAmt]'
})
export class TwdAmtDirective {

    @Output() outputMethod: EventEmitter<any> = new EventEmitter();

    uploadComplete(select: any) {
        // 回傳物件
        this.outputMethod.emit(select);
    }

    constructor(
        private _el: ElementRef
    ) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        let newValue = this._el.nativeElement.value;
        let now_positon = this.getCursorPosition(this._el.nativeElement); // 當前游標位置
        let str_len = newValue.length; // 當前輸入值長度
        let temp = newValue;

        temp = temp.replace(' ', '');
        temp = temp.replace(/[^0-9]/g, '');

        let intAry = Array.from(temp);
        let i = 0;
        for (i = 0; i < intAry.length; i++) { // 刪除整數前面多餘的0
            if (intAry[i] != '0') {
                break;
            }
            if (i < intAry.length - 1) {
                intAry[i] = '';
            }
        }
        temp = intAry.join('');

        this._el.nativeElement.value = temp;

        let set_position = (temp.length - str_len) + now_positon;
        // 改定位點
        this.getCursorPosition(this._el.nativeElement, set_position);

        // 回傳物件
        this.uploadComplete({
            "value": temp // 明碼值
        });
    }

    // 取得和設定input游標位置
    private getCursorPosition(obj, set?: any) {
        let input = obj;
        if (!input) {
            return; // No (input) element found
        }
        if ('selectionStart' in input) {
            if (set) {
                if (input.setSelectionRange) {
                    input.setSelectionRange(set, set);
                }
            }
            return input.selectionStart;
        }
    }

}
