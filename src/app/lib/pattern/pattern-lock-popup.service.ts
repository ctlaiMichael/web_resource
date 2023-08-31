import { Injectable } from '@angular/core';
import { PatternLockComponent } from './pattern-lock.component';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { PatternLockOptions } from './pattern-lock-options';
@Injectable()
export class PatternLockPopupService extends PopupBaseService<PatternLockComponent> {


  // constructor(
  // ) { }
  defaultOptions: PatternLockOptions = new PatternLockOptions();


  show(options: PatternLockOptions = {}): Promise<boolean> {
    const component = this.createComponent(PatternLockComponent);
    const option = { ...this.defaultOptions, ...options };
    component.title = option.title;
    component.content = option.content;
    component.type = option.type;
    if (option.hasOwnProperty('set_obj') && option['set_obj'].hasOwnProperty('min') && option['set_obj'].hasOwnProperty('max')
      && option['set_obj']['min'] && option['set_obj']['max']
    ){
      component.set_obj = option.set_obj;
    }
    if (option.hasOwnProperty('value') && option['value'] instanceof Array && option['value'].length == 9){
      component.patternValue = option.value;
    }

    component.promise.then(this.destroy, this.destroy);
    return component.promise;
  }



}
