/**
 * }
 */
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, OnDestroy, SimpleChanges } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: [],
    providers: []
})
export class CountdownComponent implements OnChanges, OnDestroy {
    /**
     * 參數處理
     */
    @Input() leftTime: any;
    @Input() stopCountDown: any;
    @Output() countdownFinsh: EventEmitter<string> = new EventEmitter<string>();

    inComponentTime = 0;
    orgTime = 0;
    intvaleObj: any;


    constructor(
        private translate: TranslateService,
        private _formateService: FormateService,
    ) {

    }
    ngOnDestroy() {
        this.clearInterval(this.intvaleObj);
        this.countdownFinsh.emit('leave');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.stopCountDown == true) { this.clearInterval(this.intvaleObj); return; }
        if (this.leftTime && this.leftTime.time) {
            // console.log(changes);
            this.orgTime = this.leftTime.time;
            this.inComponentTime = this.getNowTime();
            this.leftTime.time = this._formateService.transNumber(this.leftTime.time, 'int');
            if (this.leftTime.time && typeof this.leftTime.time == 'number') {
                this.intvaleObj = setInterval(() => { this.leftTime.time = this.docCountTime(this.orgTime); }, 400);
            }
        }

    }

    getNowTime() {
        let time = Date.now();
        time = Math.floor(time / 1000);
        return time;
    }

    docCountTime(time) {
        if (this.leftTime.time > 0) {
            let nowtime = this.getNowTime();
            time = time - (nowtime - this.inComponentTime);
        } else {
            time = 0;
            this.clearInterval(this.intvaleObj);
            this.countdownFinsh.emit(time);
        }
        return time;
    }

    clearInterval(obj) {
        this.stopCountDown = false;
        clearInterval(obj);
    }


    // --------------------------------------------------------------------------------------------
    //  _      _____ _      ____  ____  _____ _
    // / \  /|/  __// \__/|/  _ \/  _ \/  __// \
    // | |\ ||| |  _| |\/||| / \|| | \||  \  | |
    // | | \||| |_//| |  ||| \_/|| |_/||  /_ | |_/\
    // \_/  \|\____\\_/  \|\____/\____/\____\\____/
    // --------------------------------------------------------------------------------------------


}

