/**
 * 注意資訊
 */
import { Injectable } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { NoteOptions } from '@template/msg/note-popup/note-options';
import { NotePopupComponent } from './note-popup.component';

@Injectable()

export class NotePopupService extends PopupBaseService<NotePopupComponent> {

  defaultOptions: NoteOptions;

  init() {
    this.defaultOptions = new NoteOptions();
  }

  show(options: NoteOptions = {}): Promise<boolean> {
    const component = this.createComponent(NotePopupComponent);
    const option = { ...this.defaultOptions, ...options };

    component.title = option.title;
    component.content = option.content;
    component.content_list = option.content_list;

    component.showNumber = (!!option.showNumber) ? true : false ;
    if (component.content_list.length > 0) {
      component.showNumber = true;
    }

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }
}
