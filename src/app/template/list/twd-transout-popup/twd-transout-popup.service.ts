/**
 * 台幣轉出帳號popup
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';

import { TwdTransOutPopupComponent } from './twd-transout-popup.component';
import { TwdTransOutPopupOptions } from './twd-transout-popup-options';

@Injectable()
export class TwdTransOutPopupService extends PopupBaseService<TwdTransOutPopupOptions> {

  defaultOptions: TwdTransOutPopupOptions;

  init() {
    this.defaultOptions = new TwdTransOutPopupOptions();
  }

  show(options: TwdTransOutPopupOptions = {}, chooseType: string, allow_notAgree: boolean): Promise<boolean> {
    const component = this.createComponent(TwdTransOutPopupComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.data = option.data;
    component.select = option.select;
    component.type = option.type;
    component.chooseType = chooseType; // 轉入帳號類型, 常用 or 約定
    component.allow_notAgree = allow_notAgree; // 是否可作非約轉, true: 可以, false: 不行

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
