/**
 * 排序按鈕處理
 * [output] N/A
 */
import {
  Directive, ElementRef, Input, OnDestroy
  , EventEmitter, Renderer2, OnInit, OnChanges
} from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
declare var $: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[sortBtn]'
})
export class SortBtnDirective implements OnInit, OnChanges, OnDestroy {
  /**
   * 參數處理
   */
  @Input() sort;
  public clickOutside = new EventEmitter<MouseEvent>();
  constructor(
    private _logger: Logger
    , private el: ElementRef
    , private renderer: Renderer2
  ) {

  }

  ngOnInit() {
    this.doEvent();
  }

  ngOnChanges() {
    this.doEvent();
  }

  ngOnDestroy() {
  }

  private doEvent() {
    let nowElement = this.el.nativeElement;
    if (this.sort == 'DESC') {
      this.renderer.addClass(nowElement, 'sort_test');
    } else {
      this.renderer.removeClass(nowElement, 'sort_test');
    }
  }


}
