import { Injectable } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { DateSelectComponent } from './date-select.component';
import { DateSelectOptions } from '@template/list/date-select-popup/date-select-options';

@Injectable()
export class DateSelectService extends PopupBaseService<DateSelectComponent> {
    defaultOptions: DateSelectOptions;

    init() {
        this.defaultOptions = new DateSelectOptions();
    }

    show(options: DateSelectOptions = {}): Promise<boolean> {
        const component = this.createComponent(DateSelectComponent);
        const option = { ...this.defaultOptions, ...options };
        // console.error(option);
        component.title = option.title;
        component.dateType = option.dateType;
        component.dateArr = option.dateArr;
        component.showPopupFlag = false;

        component.promise.then(this.destroy, this.destroy);
        return component.promise;
      }

}
