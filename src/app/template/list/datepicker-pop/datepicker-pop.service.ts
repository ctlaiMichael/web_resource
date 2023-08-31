/**
 * 日歷popup
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { DatepickerPopComponent } from './datepicker-pop.component';
import { DatepickerPopOptions } from './datepicker-pop-options';
import { PopupBaseConfig } from '@conf/popup/popup-base-config';
import { DateUtil } from '@util/formate/date/date-util';

@Injectable()
export class DatepickerPopService extends PopupBaseService<DatepickerPopComponent> {

  defaultOptions: DatepickerPopOptions;

  init() {
    this.defaultOptions = new DatepickerPopOptions();
  }

  /**
   * 顯示日期選單
   * @param set_data
   *  date: 當前選擇的日期
   *  min: 最小日期
   *  max: 最大日期
   */
  show(set_data: object): Promise<boolean> {
    let config: PopupBaseConfig = new PopupBaseConfig();
    config.panelClass = ['popup_content', 'no_padding'];
    const component = this.createComponent(DatepickerPopComponent, config);
    const option = { ...this.defaultOptions, ...set_data };

    if (option.title && typeof option.title === 'string') {
      component.title = option.title;
    }

    // new date 日期帶入的格式時間HH:mm:ss沒有帶入的情竟會是 08:00:00 強制轉為 00:00:00
    let dateobj = DateUtil.transDate(option.date, 'object');
    if (!!dateobj && !!dateobj.data) {
      component.Date_Defalult = dateobj.data.year + '/' + dateobj.data.month + '/' + dateobj.data.day + ' 00:00:00';
    } else {
      component.Date_Defalult = new Date();
    }

    
    if (option.min && option.min !== '') {
      component.min = option.min.replace(/\-/g, '/');
    }
    if (option.max && option.max !== '') {
      component.max = option.max.replace(/\-/g, '/');
    }
    if (option.timeType && option.timeType !== '') {
      component.timeType = option.timeType;
    }
    component.popOpen(); // 執行開啟事件

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
