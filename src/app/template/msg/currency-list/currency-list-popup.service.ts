/**
 * 外幣資產總攬清單
 */
import { Injectable } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { CurrencyListOptions } from '@template/msg/currency-list/currency-list-options';
import { CurrencyListPopupComponent } from './currency-list-popup.component';

@Injectable()

export class CurrencyListPopupService extends PopupBaseService<CurrencyListPopupComponent> {

  defaultOptions: CurrencyListOptions;

  init() {
    this.defaultOptions = new CurrencyListOptions();
  }

  show(options: CurrencyListOptions = {}): Promise<boolean> {
    const component = this.createComponent(CurrencyListPopupComponent);
    const option = { ...this.defaultOptions, ...options };

    component.title = option.title;
    component.data = option.data;
    component.content_list = option.content_list;

    component.showNumber = (!!option.showNumber) ? true : false ;
    if (component.content_list.length > 0) {
      component.showNumber = true;
    }

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
