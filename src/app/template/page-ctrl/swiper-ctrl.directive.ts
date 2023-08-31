/**
 * 控制swpier
 * [output] N/A
 */
import {
  Directive, ElementRef, Input, OnDestroy, OnChanges, Output, EventEmitter
} from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
declare var $: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[swiperCtrl]'
})
export class SwiperCtrlDirective implements OnChanges, OnDestroy {
  /**
   * 參數處理
   */
  @Input() lastFlag;
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _logger: Logger,
    private el: ElementRef
  ) {

  }


  ngOnChanges() {
    this.doEvent();
  }

  ngOnDestroy() {
  }


  private doEvent() {
    if (this.lastFlag) {
      this._logger.log('Swiper doEvent', this.lastFlag);
      this.backPageEmit.emit(true);
      // test simulation
      // output
      // setTimeout(() => {
      //   this.backPageEmit.emit(true);
      // }, 500);
    }
  }


}
