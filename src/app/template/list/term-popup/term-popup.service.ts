/**
 * 注意資訊
 */
import { Injectable } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
// import { NoteOptions } from '@template/msg/note-popup/note-options';
import { TermPopupOptions } from './term-popup-options';
import { TermPopupComponent } from './term-popup.component';

@Injectable()

export class TermPopupService extends PopupBaseService<TermPopupComponent> {

  defaultOptions: TermPopupOptions;

  init() {
    this.defaultOptions = new TermPopupOptions();
  }

  show(options: TermPopupOptions = {}): Promise<boolean> {
    const component = this.createComponent(TermPopupComponent);
    const option = { ...this.defaultOptions, ...options };

    component.title = option.title;
    component.content = option.content;
    component.content_list = option.content_list;
    component.type = option.type;
    component.reqType = option.reqType;

    // component.showNumber = (!!option.showNumber) ? true : false ;
    // if (component.content_list.length > 0) {
    //   component.showNumber = true;
    // }

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
  
}
