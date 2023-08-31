import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { AlertComponent } from './alert.component';
import { AlertOptions } from './alert-options';

@Injectable()
export class AlertService extends PopupBaseService<AlertComponent> {

  defaultOptions: AlertOptions;

  init() {
    this.defaultOptions = new AlertOptions();
  }

  show(content: string, options: AlertOptions = {}): Promise<boolean> {
    const component = this.createComponent(AlertComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.content = content;
    component.btnTitle = option.btnTitle;
    component.param = option.param;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
