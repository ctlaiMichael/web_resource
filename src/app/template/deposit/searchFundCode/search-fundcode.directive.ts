import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AlertService } from '@template/msg/alert/alert.service';

@Directive({
    selector: '[searchFundCode]'
})
export class SearchFundCodeDirective {

    @Input()
    searchData;

    @Output()
    searchBack: EventEmitter<object> = new EventEmitter();
    searchEventBack() {
        this.searchBack.emit(this.searchData);
    }

    constructor(
        private elem: ElementRef,
        private alert: AlertService
    ) {
    }


    @HostListener('keyup', ['$event'])
    backEvent(keyobj: KeyboardEvent) {
        this.searchEventBack();
    }
}
