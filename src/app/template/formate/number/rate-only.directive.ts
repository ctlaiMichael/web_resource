import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appRateOnly]'
})
export class RateOnlyDirective {

    @Output() outputMethod: EventEmitter<any> = new EventEmitter();

    uploadComplete(select: any) {
        // 回傳物件
        this.outputMethod.emit(select);
    }

    constructor(
        private _el: ElementRef
    ) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        let initalValue = this._el.nativeElement.value;
        let tempNumber = initalValue.replace(/\s/g, ''); // 刪除空白

        let intAry = Array.from(tempNumber);
        let i = 0;
        for (i = 0; i < intAry.length; i++) { // 刪除整數前面多餘的0
            if (intAry[i] != '0') {
                break;
            }
            if (i < intAry.length - 1 && intAry[i + 1] != '.') {
                intAry[i] = '';
            }
        }
        initalValue = intAry.join('');

        let temp = initalValue.replace(/[^0-9 | ^\.]/g, '');
        this._el.nativeElement.value = temp;

        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }

        // 回傳物件
        this.uploadComplete({
            "value": temp // 明碼值
        });
    }
}
