/**
 * 只能輸入數字、英文directive
 */

import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appNumEnOnly]'
})
export class NumEnOnlyDirective {

    @Input() upperCase; // [upperCase]="true" 英文字母轉大寫
    @Input() nonSpace; // [nonSpace]="true" 禁止輸入空白

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

        if (!!this.upperCase && this.upperCase == true) {
            temp = temp.toUpperCase();
        }

        if (!!this.nonSpace && this.nonSpace == true) {
            // initalValue = initalValue.trim();
            temp = temp.replace(' ', '');
        }

        temp = temp.replace(/[^0-9 | ^A-Za-z]/g, '');
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
