/**
 * [樣版] 廣告輪播牆
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { AdvertService } from './advert.service';
declare var Swiper: any;

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: [],
    providers: []
})
export class AdvertComponent implements OnInit {
    /**
     * 參數處理
     */
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    private swiper: any;
    showAd = false;
    advertData = [];

    constructor(
        private _logger: Logger,
        private handleError: HandleErrorService,
        private _formateService: FormateService,
        private _mainService: AdvertService
    ) { }

    ngOnInit() {
        // this._logger.log("into AdvertComponent");
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
     * 選單事件(主頁籤)
     * @param menu 選單
     */
    onGoEvent(menu) {
        this._mainService.onGoEvent(menu);
    }


    /**
     * 接收card-swiper.directive.ts 返回
     * @param e 
     */
    onSwiperBackEvent(e) {
        this._logger.log("into onSwiperBackEvent AdvertComponent");
        this.doSwiper();
    }

    // swiper設定
    doSwiper() {
        this._logger.log("into doSwiper AdvertComponent");
        if (typeof Swiper != 'function') {
            this._logger.log("into swiper error");
            return false;
        }
        this._logger.log("into do swiper AdvertComponent");
        if (!(this.swiper instanceof Swiper)) {
            this._logger.log("Swiper doEvent new swiper");
            this.swiper = new Swiper('.swiper-container_ad', {
                slidesPerView: 'auto',  // 設置slider容器能同時顯示的slides數量
                centeredSlides: true,   // 設定為true時，活動塊會居中，而不是默認狀態下的居左
                spaceBetween: 20,       // 兩個區塊間距
                pagination: {
                    el: '.swiper-pagination_ad',
                    clickable: true,      // 設置為true時，點擊分頁的指示點會控制Swiper切換
                }
            });
        } else {
            this._logger.log("Swiper doEvent update");
            this.swiper.update(true);
        }
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
