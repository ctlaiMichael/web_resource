/**
 * 基金帳號選單
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { FundAcctPopupComponent } from './fund-acct-popup.component';
import { FundAcctPopupOptions } from './fund-acct-popup-options';

@Injectable()
export class FundAcctPopupService extends PopupBaseService<FundAcctPopupComponent> {

  defaultOptions: FundAcctPopupOptions;

  init() {
    this.defaultOptions = new FundAcctPopupOptions();
  }

  show(options: FundAcctPopupOptions = {}): Promise<boolean> {
    const component = this.createComponent(FundAcctPopupComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.data = option.data;
    component.select = option.select;
    component.type = option.type;
    component.currency = option.currency;
    component.special = option.special;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
