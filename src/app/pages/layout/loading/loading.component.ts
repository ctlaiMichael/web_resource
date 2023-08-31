
/**
 * @description
 * @author Amit Mahida , Wei 20200820
 * @export
 */
import { Component, OnInit, OnDestroy, Input, ViewEncapsulation, NgZone } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '@pages/layout/loading/loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css', './loading.v3.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoadingComponent implements OnDestroy {
    loadingText = 'Loading';
    textZindex = 0;
    showSpinner = false; // 顯示

    private subscription: Subscription;
    private timeout = 0;
    private threshold = 500; // loading出現時間

    private thresholdTimer: any;
    private thresHideTimer: any;
    private timeoutTimer: any;

    constructor(
        private _logger: Logger,
        private zone: NgZone,
        private loadingService: LoadingService
    ) {
        this.createServiceSubscription();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.clearThresholdTimer();
        this.clearTimeoutTimer();
        this.clearThresHideTimer();
    }


    createServiceSubscription() {
        this.subscription = this.loadingService.loadingSubject.subscribe(show => {
            if (show) {
                // loading 顯示事件
                this.doLoadingShow();
            } else {
                // loading 隱藏事件
                this.doLoadingHide();
            }
        });
    }

    /**
     * loading 顯示事件
     */
    private doLoadingShow() {
        this._logger.step('Loading', 'show in component');
        if (this.thresholdTimer) {
            // 已經開loading
            return;
        }
        if (this.thresHideTimer) {
            // 準備關loading
            this.clearThresHideTimer();
            return;
        }
        this.thresholdTimer = setTimeout(() => {
            this.thresholdTimer = null;
            this.zone.run(() => {
                this.showSpinner = true;
            });

            // 目前無作用，不提供
            // if (this.timeout !== 0) {
            //     this.timeoutTimer = setTimeout(() => {
            //         this.timeoutTimer = null;
            //         this.showSpinner = false;
            //     }, this.timeout);
            // }
        }, this.threshold);

    }

    /**
     * loading 隱藏事件
     */
    private doLoadingHide() {
        this._logger.step('Loading', 'close in component');
        if (this.thresholdTimer) {
            // loading 還沒產生
            this.clearThresholdTimer();
            this.clearTimeoutTimer();
            this.thresHideTimer = setTimeout(() => {
                this.thresHideTimer = null;
                this.zone.run(() => {
                    this.showSpinner = false;
                });
            }, this.threshold);
        } else {
            this.clearThresholdTimer();
            this.clearTimeoutTimer();
            this.zone.run(() => {
                this.showSpinner = false;
            });
        }
    }

    /**
     * loading出現時機
     */
    private clearThresholdTimer() {
        if (this.thresholdTimer) {
            this.thresholdTimer = null;
            clearTimeout(this.thresholdTimer);
        }
    }

    /**
     * loading出現時機
     */
    private clearTimeoutTimer() {
        // if (this.timeoutTimer) {
        //     this.timeoutTimer = null;
        //     clearTimeout(this.timeoutTimer);
        // }
    }

    
    /**
     * loading關閉時機
     */
    private clearThresHideTimer() {
        if (this.thresHideTimer) {
            this.thresHideTimer = null;
            clearTimeout(this.thresHideTimer);
        }
    }

}