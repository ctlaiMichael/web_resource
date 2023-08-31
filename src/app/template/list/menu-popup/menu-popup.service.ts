import { Injectable, Component, ComponentRef } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { MenuPopupComponent } from './menu-popup.component';

@Injectable()
export class MenuPopupService extends PopupBaseService<MenuPopupComponent> {

  defaultOptions = {
    title: 'POPUP.MENU.TITLE',
    menu: [],
    select: ''
  };

  init() {
  }

  show(options): Promise<boolean> {
    const component = this.createComponent(MenuPopupComponent);
    const option = { ...this.defaultOptions, ...options };
    // console.error(option);
    component.title = option.title;
    component.menu = option.menu;
    component.select = option.select;

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
