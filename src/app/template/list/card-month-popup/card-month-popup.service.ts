/**
 * 信卡月份選單
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { CardMonthPopupComponent } from './card-month-popup.component';
import { CardMonthPopupOptions } from './card-month-popup-options';

@Injectable()
export class CardMonthPopupService extends PopupBaseService<CardMonthPopupComponent> {

  defaultOptions: CardMonthPopupOptions;

  init() {
    this.defaultOptions = new CardMonthPopupOptions();
  }

  show(options: CardMonthPopupOptions = {}): Promise<boolean> {
    const component = this.createComponent(CardMonthPopupComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.data = option.data;
    component.select = option.select;
    component.type = option.type;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
