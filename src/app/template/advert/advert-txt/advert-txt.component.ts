/**
 * 廣告內容處理
 */
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// --- library --- //
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { AdvertService } from '@template/advert/advert.service';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
import { CheckService } from '@template/check/check.service';

@Component({
    selector: 'app-advert-txt',
    templateUrl: './advert-txt.component.html',
    styleUrls: [],
    providers: []
})
export class AdvertTxtComponent implements OnInit {
    /**
     * 參數處理
     */
    @Input() showPageType;
    @Input() allow;
    @Input() data;
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    private adIndex = '';
    onlyImgPage = false; // 只顯示圖片
    showText = false; // 顯示內容
    showLink = false; // 顯示按鈕
    contentType = 'normal'; // 顯示內容展開收合效果
    isUnfold = false; // 展開收合, true 展開, false 收合
    title = ''; // 標題
    content = ''; // 內容
    imgSrc = ''; // 圖片
    btnTitle = ''; // 按鈕
    private maxLen = 100;

    constructor(
        private _logger: Logger,
        private errorHandler: HandleErrorService,
        private _formateService: FormateService,
        private _mainService: AdvertService,
        private layoutCtrl: LayoutCtrlService
    ) {
    }



    ngOnInit() {
        if (this.showPageType == 'onlyimg') {
            this.onlyImgPage = true;
        }
        this.adIndex = this._formateService.checkField(this.data, 'id');

        // 按鈕處理
        let tmpShowLink = this._formateService.checkObjectList(this.data, 'showLink');
        if (tmpShowLink) {
            this.showLink = true;
            this.btnTitle = this._formateService.checkObjectList(this.data, 'url_title');
        }

        // 內容處理
        let tmpShowText = this._formateService.checkObjectList(this.data, 'showText');
        if (tmpShowText) {
            // 有內容
            this.showText = true;
            this.title = this._formateService.checkField(this.data, 'title');
            this.content = this._formateService.checkField(this.data, 'content');
            if (this.content.length >= this.maxLen) {
                // 字有超過一定數量才處理
                this.isUnfold = false;
                this.contentType = 'close';
            } else {
                this.isUnfold = false;
                this.contentType = 'normal';
            }
        } else {
            this.showText = false;
        }

        // 圖片取得
        this._mainService.getAdvertImgData(this.adIndex).then(
            (res) => {
                this.imgSrc = this._formateService.checkField(res.infoData, 'imageSource');
            },
            (err) => {
                // hide img
                let source_img = this._formateService.checkField(this.data, 'img');
                if (source_img) {
                    this.imgSrc = source_img;
                } else {
                    this.imgSrc = '';
                }
            }
        );
    }


    /**
     * 選單事件(主頁籤)
     * @param menu 選單
     */
    onGoEvent() {
        if (!this.allow) {
            // mini狀態時不導頁，只開廣告區塊
            this.backPageEmit.emit();
            return false;
        }
        let menu = this.data;
        this._mainService.onGoEvent(menu);
    }

    /**
     * 展開收合內容
     */
    onOpenEvent() {
        if (!!this.isUnfold) {
            // open to close
            this.isUnfold = false;
            this.contentType = 'close';
        } else {
            // close to open
            this.isUnfold = true;
            this.contentType = 'open';
        }

    }


}

