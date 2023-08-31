import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { InfomationOptions } from '@template/msg/infomation/infomation-options';
import { InfomationComponent } from './infomation.component';

@Injectable()
export class InfomationService extends PopupBaseService<InfomationComponent> {

  defaultOptions: InfomationOptions;

  init() {
    this.defaultOptions = new InfomationOptions();
  }

  show(options: InfomationOptions = {}): Promise<boolean> {
    const component = this.createComponent(InfomationComponent);
    const option = { ...this.defaultOptions, ...options };
    // console.error(option);
    component.title = option.title;
    component.btnTitle = option.btnTitle;
    component.content = option.content;
    component.doubleButton = option.doubleButton;
    component.btnCancleTitle = option.btnCancleTitle;
    component.linkList = option.linkList;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
