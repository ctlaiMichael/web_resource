/**
 * 結匯性質選單service
 */
import { Injectable } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { RemitNaturePopupOptions } from './remit-nature-popup-options';
import { RemitNaturePopupComponent } from './remit-nature-popup.component';

@Injectable()
export class RemitNaturePopupService extends PopupBaseService<RemitNaturePopupOptions> {

  defaultOptions: RemitNaturePopupOptions;

  init() {
    this.defaultOptions = new RemitNaturePopupOptions();
  }

  show(options: RemitNaturePopupOptions = {}): Promise<boolean> {
    const component = this.createComponent(RemitNaturePopupComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.data = option.data;
    component.select = option.select;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
