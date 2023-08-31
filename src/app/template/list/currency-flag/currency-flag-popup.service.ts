/**
 * 幣別選單
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { CurrencyFlagPopupComponent } from './currency-flag-popup.component';
import { CurrencyFlagPopupOptions } from './currency-flag-popup-options';

@Injectable()
export class CurrencyFlagPopupService extends PopupBaseService<CurrencyFlagPopupComponent> {

  defaultOptions: CurrencyFlagPopupOptions;

  init() {
    this.defaultOptions = new CurrencyFlagPopupOptions();
  }

  show(options: CurrencyFlagPopupOptions = {}): Promise<boolean> {
    const component = this.createComponent(CurrencyFlagPopupComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.data = option.data;
    component.selectCurrency = option.selectCurrency;
    component.type = option.type;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
