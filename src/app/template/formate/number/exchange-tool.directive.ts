import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AlertService } from '@template/msg/alert/alert.service';

@Directive({
    selector: '[appAmount]'
})
export class AmountDirective {

    @Input()
    formDisplay;

    @Output()
    uploadSelected: EventEmitter<object> = new EventEmitter();
    uploadComplete(select: any) {
        this.uploadSelected.emit(select);
    }

    constructor(
        private elem: ElementRef,
        private alert: AlertService
    ) {
    }


    @HostListener('keyup', ['$event'])
    handleKeyboardEvent(keyobj: KeyboardEvent) {
        let newValue: string;
        newValue = this.elem.nativeElement.value;
        let now_positon = this.getCursorPosition(this.elem.nativeElement); // input定位
        let str_len = newValue.length; // 當前輸入值長度
        let point_position = newValue.indexOf('.'); // 小數點位置
        let tempNumber = newValue.replace(/\,/g, ''); // 刪除逗號
        tempNumber = tempNumber.replace(' ', ''); // 刪除空白
        tempNumber = tempNumber.replace(/[^0-9 | ^\.]/g, ''); // 只保留數字及小數點

        // 驗證是否為合法數字
        if (point_position == now_positon - 1) {
            if (isNaN(Number(tempNumber))) {
                let tempArray = Array.from(tempNumber);
                let temp = '';
                let i;
                let first_point = true;
                for (i = 0; i < tempArray.length; i++) {
                    if (tempArray[i] == '.' && first_point) {
                        first_point = false;
                        continue;
                    }
                    temp = temp + tempArray[i];
                }
                tempNumber = temp;
                // this.alert.show('ERROR.ERROR_AMOUNT');
            }
        }

        const NumArray = Array.from(tempNumber);

        // 處理小數點問題 超過兩個只留先的一個
        let pointcount = 0;
        const newArray = NumArray.filter(item => {
            if (item === '.') {
                pointcount++;
                return pointcount <= 1;
            } else {
                return (/\d/.test(item) || /\./.test(item));
            }
        });

        let IsNumber = newArray.join('');
        let value; // 無千分位的值
        
        // 若為合法數字則重新format
        if (!isNaN(Number(IsNumber))) {
            // 重新 format
            const reformat = IsNumber.split('.');

            let temp = Array.from(reformat[0]);
            let i = 0;
            for (i = 0; i < temp.length; i++) { // 刪除整數前面多餘的0
                if (temp[i] != '0') {
                    break;
                }
                if (i < temp.length - 1) {
                    temp[i] = '';
                }
            }
            reformat[0] = temp.join('');

            // 增加金額千分位逗號
            if (reformat.length === 1) {
                IsNumber = reformat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                value = reformat[0];
            } else if (reformat.length === 2) {
                if (reformat[0] == '') {
                    reformat[0] = '0';
                }
                let temp2 = Array.from(reformat[1]);
                while (temp2.length > 2) {
                    temp2.pop();
                }
                reformat[1] = temp2.join('');
                IsNumber = reformat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + reformat[1];
                value = reformat[0] + '.' + reformat[1];
            }

        } else {
            IsNumber = '';
            value = '';
        }

        let set_position = (IsNumber.length - str_len) + now_positon;
        // 改定位點
        if (IsNumber !== newValue) {
            this.elem.nativeElement.value = IsNumber;
            this.getCursorPosition(this.elem.nativeElement, set_position);
        }
        // == 繼續處理事情 == //
        this.uploadComplete({
            "value_show": IsNumber, // 有千分位的值
            "value": value, // 無千分位的值
            "position": now_positon,
            "set_position": set_position
        });
    }

    // --取得input位置 end-- //
    private getCursorPosition(obj, set?: any) {
        let input = obj;
        if (!input) {
            return; // No (input) element found
        }
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            if (set) {
                if (input.setSelectionRange) {
                    input.setSelectionRange(set, set);
                }
            }
            return input.selectionStart;
        }
    }

}
