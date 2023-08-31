/**
 * 日曆套件pipe
 */
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * 月份顯示
 * 例如： 2017 七月
 */
@Pipe({
    name: 'monthNameDatepicker'
})
export class MonthNameDatepickerPipe implements PipeTransform {

    constructor(
        private _translate: TranslateService
    ) { }

    transform(object: Date, monthList): string {
        let output = [];
        const year = object.getFullYear();
        const month = object.getMonth();
        output.push(object.getFullYear());
        if (typeof monthList[month] !== 'undefined' && !!monthList[month]) {
            output.push(monthList[month]);
        } else {
            output.push(month);
        }
        // 字串結合 "年"
        let joinYear = this._translate.instant('YEAR');
        return output.join(joinYear + ' ');
    }

}
