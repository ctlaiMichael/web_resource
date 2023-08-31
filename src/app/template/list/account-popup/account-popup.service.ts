/**
 * 幣別選單
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { AccountPopupComponent } from './account-popup.component';
import { AccountPopupOptions } from './account-popup-options';

@Injectable()
export class AccountPopupService extends PopupBaseService<AccountPopupComponent> {

  defaultOptions: AccountPopupOptions;

  init() {
    this.defaultOptions = new AccountPopupOptions();
  }

  show(options: AccountPopupOptions = {}): Promise<boolean> {
    const component = this.createComponent(AccountPopupComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.data = option.data;
    component.select = option.select;
    component.type = option.type;
    component.currencyCode = option.currencyCode;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
