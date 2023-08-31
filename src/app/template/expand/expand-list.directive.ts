/**
 * 展開列表處理
 * [output] N/A
 * 
 * 
 * 注意: .data_open .sub_open_info_frame 透過js控制，不寫在css設定 display
 */
import {
    Directive, ElementRef, Input, Output, OnDestroy
    , HostListener, EventEmitter, Renderer2, OnChanges, OnInit
} from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
declare var $: any;

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[expandList]'
})
export class ExpandListDirective implements OnInit, OnChanges, OnDestroy {
    /**
     * 參數處理
     */
    isOpen = false; // 狀態控制
    @Input() openFlag; // 展開收和控制
    @Input() waitClickFlag; // 是否啟用等候模式(點擊先發api再顯示資料)，預設不啟用
    @Input() showData; // 是否啟用等候模式(有資料)，預設有資料
    @Input() special; // 特殊功能,不做全部展開, ex: 國外匯率匯款查詢
    public clickOutside = new EventEmitter<MouseEvent>();
    private isFirstInit = true; // true為第一次進入
    private allOpenFlag = false; // true 全展開

    constructor(
        private _logger: Logger,
        private el: ElementRef,
        private renderer: Renderer2
    ) {

    }

    // directive init不會進ngOnChanges
    ngOnInit() {
        this._logger.step('ExpandList', 'init', this.isFirstInit, this.waitClickFlag);
        this._init();
    }

    ngOnChanges() {
        this._logger.step('ExpandList', 'change', this.isFirstInit, this.waitClickFlag, this.showData);
        if (!this.isFirstInit) {
            // 非init才作業
            // let doSpecial = false;
            let checkOpen = (this.openFlag) ? true : false;
            if (checkOpen != this.allOpenFlag) {
                this.allOpenFlag = checkOpen;
                // doSpecial = true;
            }
            this.doExpand();
        } else {
            this._init();
        }
    }

    ngOnDestroy() {
    }



    @HostListener('click') expandEvent() {
        this._logger.step('ExpandList', 'click', this.waitClickFlag, this.showData);
        this.doExpand('clickAlone');
    }

    /**
     * 控制初始化事件
     */
    private _init() {
        if (this.isFirstInit) {
            if (typeof this.waitClickFlag == 'undefined') {
                this.waitClickFlag = false;
                if (typeof this.showData == 'undefined') {
                    this.showData = true;
                }
            }
            if (typeof this.openFlag == 'undefined') {
                this.allOpenFlag = false;
            }
            if(typeof this.special == 'undefined') {
                this.special = false;
            }
            this.isFirstInit = false;
        }
    }


    /**
     * 
     * @param type 是否為單獨點擊
     *    click
     */
    private doExpand(type?) {
        this._logger.step('ExpandList');
        if (this.waitClickFlag && !this.showData) {
            this._logger.step('ExpandList', 'now allow show', this.showData);
            return false;
        }
        this._logger.step('ExpandList', 'all open', this.allOpenFlag, this.openFlag, this.isOpen);
        let nowElement = this.el.nativeElement;
        let nextElement = this.el.nativeElement.nextElementSibling;
        let parentElement = this.el.nativeElement.parentNode;
        let parentElement_parent = this.el.nativeElement.parentNode.parentNode; //比對最新template，data_open加入層次有誤，文字顏色不改變
        if (!nowElement || !nextElement || !parentElement || !parentElement_parent) {
            this._logger.step('ExpandList', 'miss element (now/next)', typeof nowElement, typeof nextElement, typeof parentElement , typeof parentElement_parent);
            return false;
        }
        // 確認next element class正確
        let subinfoElement = parentElement.querySelector('.sub_open_info_frame');
        if (!subinfoElement) {
            this._logger.step('ExpandList', 'miss class (sub_open_info_frame)', typeof subinfoElement);
            return false;
        }
        // if (typeof nextElement.classList === 'undefined' || !nextElement.classList.contains('sub_open_info_frame')) {
        //   this._logger.step('ExpandList', 'miss class (now/next)'
        //     , nextElement.classList
        //     , nextElement.classList.contains('sub_open_info_frame'));
        //   return false;
        // }
        // 確認有list_icon按鈕
        let expandBtnElement = this.el.nativeElement.querySelector('.list_icon');
        if (!expandBtnElement) {
            this._logger.step('ExpandList', 'miss element (list_icon)', typeof expandBtnElement);
            return false;
        }

        this._logger.step('ExpandList', 'isOpen in', this.isOpen);

        // 判斷是否要執行(全展全收合)
        // 若為特殊功能或為單獨點擊
        if(type != 'clickAlone' && this.special == false) {
            if (this.allOpenFlag == this.isOpen) {
                return false; // 目前狀態一致
            }
        }
        let openFlag = (this.isOpen) ? false : true;
        this.isOpen = openFlag;
        this._logger.step('ExpandList', 'isOpen out', this.isOpen);
        if (openFlag === true) {
            // 列表
            this.renderer.addClass(parentElement_parent, 'data_open');
            this.renderer.addClass(expandBtnElement, 'active');
            // 內容
            $(nextElement).slideToggle(200);
            // this.renderer.setElementStyle(nextElement, 'display', 'block');
        } else {
            // 列表
            this.renderer.removeClass(parentElement_parent, 'data_open');
            this.renderer.removeClass(expandBtnElement, 'active');
            // 內容
            $(nextElement).slideToggle(200);
            // this.renderer.setElementStyle(nextElement, 'display', 'none');
        }

    }


}
