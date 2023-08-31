import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Timer } from '@lib/timer/timer.class';
import { FieldUtil } from '@util/formate/modify/field-util';
import { AppCtrlService } from '@systems/system/app-ctrl/app-ctrl.service';
import { isNumber } from 'util';

@Component({
    selector: 'app-count-down',
    templateUrl: './count-down.component.html',
    styleUrls: []
})
export class CountDownComponent implements OnInit {
    @Input() countOption;

    @Output() timeOutCallBack: EventEmitter<any> = new EventEmitter<any>();

    private countDownTimer: Timer;
    private deadline = 0; // 總倒數秒數
    remainingTime = 0; // 剩餘秒數
    private pauseTime: number; // 移入背景時間

    private subscriptionOnPause: any;
    private subscriptionOnResume: any;

    constructor(
        private zone: NgZone,
        private appCtrl: AppCtrlService
    ) {

    }

    ngOnInit() {
        // 監聽appCtrlService裡的Pause Resume事件
        this.subscriptionOnPause = this.appCtrl.onPause.subscribe((pauseTime: any) => {
            this.onPauseHandler();
        });
        this.subscriptionOnResume = this.appCtrl.onResume.subscribe((nowTime: any) => {
            this.onResumeHandler();
        });

        let num = FieldUtil.checkField(this.countOption, 'deadline');
        if (!!num && !isNaN(Number(num))) {
            this.deadline = parseFloat(num);
            this.countDownStart();
        }

    }

    /**
     * 開始倒數
     */
    private countDownStart() {
        this.remainingTime = this.deadline;

        this.countDownTimer = new Timer(this.deadline,
            () => {
                this.timeOut();
            },
            (count) => {
                this.remainingTime = this.deadline - count;
            }
        );

    }

    /**
     * 倒數結束
     */
    private timeOut() {
        this.timeOutCallBack.emit();
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 背景事件控制
     */
    private onPauseHandler() {
        this.zone.run(() => {
            this.pauseTime = new Date().getTime();
            this.countDownTimer.stop();
        });
    }

    /**
     * 背景事件控制
     */
    private onResumeHandler() {
        this.zone.run(() => {
            const now = new Date().getTime();
            const backgroundTime = Math.round((now - this.pauseTime) / 1000);
            const deadline = this.deadline;
            if (!!this.countDownTimer) {
                const t = this.countDownTimer.getTime();
                const idleTime = t + backgroundTime;
                // 更新閒置時間
                this.countDownTimer.setTime(idleTime);
                this.countDownTimer.resume();
                const remainingTime = deadline - idleTime;  // 剩餘時間
                if (remainingTime <= 0) {
                    // 已超過時間
                    this.timeOut();
                }
            } else {
                // 提示已超過時間
                this.timeOut();
            }
        });
    }

}
