/**
 * loading控制
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { DomUtil } from '@util/dom-util';
import { ObjectCheckUtil } from '@util/check/object-check-util';

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class LoadingService {
    loading = {};

    /**
     * @description spinners BehaviorSubject
     */
    public loadingSubject: Subject<any> = new Subject<any>();

    /**
     * Creates an instance of LoadingSpinnerService.
     */
    constructor(
        private _logger: Logger
    ) {

    }

    /**
     * To show spinner
     * @memberof HtLoadingSpinnerService
     */
    show(loadingId: string) {
        this._logger.step('Loading', 'show', loadingId);

        // loading 強制關閉滑動事件
        (document as any).addEventListener('touchmove', this.handler, {passive: false});
        this.loading[loadingId] = 'run';
        sessionStorage.disableNativeReturn = true; // 停用實體返回鍵(此service不可import headerCtrl service)
        this.onChangeLoading(true);
    }

    handler(e) {
        e.preventDefault();
    }

    /**
     * To hide spinner
     * @memberof HtLoadingSpinnerService
     */
    hide(loadingId: string) {
        this._logger.step('Loading', 'hide', loadingId);
        (document as any).removeEventListener('touchmove', this.handler, {
            passive: true
        });
        delete this.loading[loadingId];
        // loading 必須是空的才可以關掉
        if (typeof this.loading == 'object' && !ObjectCheckUtil.checkEmpty(this.loading, true)) {
            this.onChangeLoading(false);
            delete sessionStorage.disableNativeReturn; // 停用實體返回鍵(此service不可import headerCtrl service)
        }
    }

    /**
     * 設定section捲動
     */
    setSectionScroll(overflowY: string) {
        if (!DomUtil.isInitialPage()) {
            const sections = document.getElementsByTagName('section');
            let i: any;
            for (i = 0; i < sections.length; i++) {
                if (!!sections[i]) {
                    sections[i].style.overflowY = overflowY;
                }
            }
        }
    }

    
    /**
     * 維持連線計時器
     */
    private onChangeLoading(show) {
        this.loadingSubject.next(show);
    }

}
