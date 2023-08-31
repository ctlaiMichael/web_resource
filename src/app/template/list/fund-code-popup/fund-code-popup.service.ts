/**
 * 投資標的popup
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { FundCodePopupComponent } from './fund-code-popup.component';
import { FundCodePopupOptions } from './fund-code-popup-options';

@Injectable()
export class FundCodePopupService extends PopupBaseService<FundCodePopupOptions> {

  defaultOptions: FundCodePopupOptions;

  init() {
    this.defaultOptions = new FundCodePopupOptions();
  }

  show(options: FundCodePopupOptions = {}): Promise<boolean> {
    const component = this.createComponent(FundCodePopupComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.data = option.data;
    component.selectComp = option.selectComp;
    component.selectFund = option.selectFund;
    component.type = option.type;
    component.investType = option.investType;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
