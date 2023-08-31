/**
 * 銀行代碼選單
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { BankCodePopupOptions } from './bank-code-popup-options';
import { BankCodePopupComponent } from './bank-code-popup.component';

@Injectable()
export class BankCodePopupService extends PopupBaseService<BankCodePopupComponent> {

  defaultOptions: BankCodePopupOptions;

  init() {
    this.defaultOptions = new BankCodePopupOptions();
  }

  show(options: BankCodePopupOptions = {}): Promise<boolean> {
    const component = this.createComponent(BankCodePopupComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.data = option.data;
    component.select = option.select;
    component.type = option.type;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }

}
