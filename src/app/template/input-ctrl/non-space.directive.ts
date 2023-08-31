/**
 * 禁止輸入空白directive
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNonSpace]'
})
export class NonSpaceDirective {
  constructor(
    private _el: ElementRef
  ) { }
  @HostListener('input', ['$event']) onInputChange(event) {
    let initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.trim();
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
