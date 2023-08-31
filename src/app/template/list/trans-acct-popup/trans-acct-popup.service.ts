/**
 * 帳號選單(交易類)
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { TransAcctPopupOptions } from './trans-acct-popup-options';
import { TransAcctPopupComponent } from './trans-acct-popup.component';

@Injectable()
export class TransAcctPopupService extends PopupBaseService<TransAcctPopupOptions> {

  defaultOptions: TransAcctPopupOptions;

  init() {
    this.defaultOptions = new TransAcctPopupOptions();
  }

  show(options: TransAcctPopupOptions = {}): Promise<boolean> {
    const component = this.createComponent(TransAcctPopupComponent);
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
