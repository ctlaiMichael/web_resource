/**
 * [樣版] 啟動首頁廣告
 */
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// --- library --- //
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { AdvertService } from '@template/advert/advert.service';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';

@Component({
    selector: 'app-start-home-ad',
    templateUrl: './start-home-ad.component.html',
    styleUrls: [],
    providers: []
})
export class StartHomeAdComponent implements OnInit {
    /**
     * 參數處理
     */
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('mainAdBox') adBox: ElementRef;
    // @Input() setData: Array<object>; 
    showAd = false;
    advertData: Array<any>;
    openFlag = false;

    constructor(
        private _logger: Logger,
        private errorHandler: HandleErrorService,
        private _formateService: FormateService,
        private _mainService: AdvertService,
        private layoutCtrl: LayoutCtrlService
    ) { }

    ngOnInit() {
        this._mainService.getData().then(
            (outputData) => {
                this.showAd = true;
                this.advertData = outputData.data;
                this.showAdCtrl(true);
            },
            (errorAd) => {
                // 無廣告顯示預設廣告
                this._logger.error('Empty Ad in StartHome');
                this.showAd = false;
                this.showAdCtrl(false);
            }
        );
    }

    /**
     * 廣告列表顯示/隱藏事件
     * 動畫效果在css內: .beforeLogin_event_container的transition
     */
    onClick() {
        if (!this.openFlag) {
            // 關->開
            this.openFlag = true;
        } else {
            // 開->關
            this.openFlag = false;
        }
        this.layoutCtrl.scrollTop(this.adBox.nativeElement);
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    private showAdCtrl(haveAd: boolean) {
        this.backPageEmit.emit(haveAd);
    }

}
