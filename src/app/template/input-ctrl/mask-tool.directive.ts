/**
 * input輸入遮碼
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appMaskTool]'
})
export class MaskToolDirective {

    @Input() isMask; // [isMask]="false" 無遮碼 [isMask]="true" 有遮碼
    @Input() value; // 傳入前一次明碼值

    @Output() outputMethod: EventEmitter<any> = new EventEmitter();

    uploadComplete(select: any) {
        // 回傳物件
        this.outputMethod.emit(select);
    }

    constructor(
        private elem: ElementRef
    ) {
    }

    @HostListener('input', ['$event'])
    onInputChange(event) {
        let newValue: string;
        newValue = this.elem.nativeElement.value;
        let now_positon = this.getCursorPosition(this.elem.nativeElement); // 當前游標位置
        let str_len = newValue.length; // 當前輸入值長度
        let temp = ''; // 明碼值暫存

        // 當前輸入值長度 > 前一次明碼值長度 代表有輸入字元
        // 將輸入的字元加到明碼值
        if (newValue.length > this.value.length) {
            let newValueArray = newValue.split('');
            if (now_positon == newValue.length) {
                temp = this.value + newValueArray[now_positon - 1];
            } else {
                let valueArray = this.value.split('');
                let i;
                for (i = 0; i < valueArray.length; i++) {
                    if (i == now_positon - 1) {
                        temp = temp + newValueArray[now_positon - 1];
                    }
                    temp = temp + valueArray[i];
                }
            }
        // 當前輸入值長度 < 前一次明碼值長度 代表有刪除字元
        // 將刪除的字元從明碼值刪除
        } else if (newValue.length < this.value.length) {
            let valueArray = this.value.split('');
            let i;
            for (i = 0; i < valueArray.length; i++) {
                if (i == now_positon) {
                    continue;
                }
                temp = temp + valueArray[i];
            }
        } else {
            temp = this.value;
        }

        // 將明碼值去空白
        temp = temp.replace(/[\s]/g, '');

        // 將明碼值轉遮碼值
        let mask = temp.replace(/[\S]/g, '*');

        // 有遮碼顯示 mask遮碼值 無遮碼顯示 temp明碼值
        if (!!this.isMask && this.isMask == true) {
            this.elem.nativeElement.value = mask;
        } else {
            this.elem.nativeElement.value = temp;
        }

        let set_position = (temp.length - str_len) + now_positon;
        // 改定位點
        this.getCursorPosition(this.elem.nativeElement, set_position);

        // 回傳物件
        this.uploadComplete({
            "value_mask": mask, // 遮碼值
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
