/**
 * 理財妙管家
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

@Component({
    selector: 'app-fund-inquiry-modify-content',
    templateUrl: './fund-inquiry-modify-content.component.html',
    styleUrls: []
})

export class FundInquiryModifyContentComponent implements OnInit {
    @Input() setData: any; // api 05030102 request
    @Input() outData: any;
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    showData = false;
    expandFlag: boolean; // 是否全部展開
    nowPage = 'content'; // 當下頁面


    constructor(
        private _logger: Logger,
        private _headerCtrl: HeaderCtrlService,
        private confirm: ConfirmService,
        private navgator: NavgatorService
    ) { }

    ngOnInit() {
        this._logger.log("FundInquiryModifyContentComponent, setData:", this.setData);
        this._headerCtrl.setLeftBtnClick(() => {
            this.onLeftBtnClick();
        });
    }

    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onBackPageData(item) {
        let output = {
            'page': 'list-page',
            'type': 'back',
            'data': item
        };
        this._logger.log("into onBackPageData, output:", output);
        this.backPageEmit.emit(output);
    }

    /**
     * 子層返回事件(分頁)
     * @param e
     */
    onPageBackEvent(e) {
        this._logger.log('Deposit', 'onPageBackEvent123', e);
        let page = 'list';
        let pageType = 'list';
        let tmp_data: any;
        if (typeof e === 'object') {
            if (e.hasOwnProperty('page')) {
                page = e.page;
            }
            if (e.hasOwnProperty('type')) {
                pageType = e.type;
            }
            if (e.hasOwnProperty('data')) {
                tmp_data = e.data;
            }
        }
        // 修改扣款狀態頁 返回
        if (page == 'change-status' && pageType == 'back') {
            this._logger.log("into change-status back content");
            this.nowPage = 'content';
            this._headerCtrl.setLeftBtnClick(() => {
                this.onLeftBtnClick();
            });
        } else if (pageType == 'home') {
            this._logger.log("into onCancel");
            // 是否放棄交易提示
            this.confirm.cancelEdit().then(
                () => {
                    this.navgator.editBack();
                },
                () => {
                    // no do
                }
            );
        }
    }

    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onErrorPageData(item) {
        // let output = {
        //   'page': 'list-page',
        //   'type': 'back',
        //   'data': item
        // };
        // this._logger.step('Deposit', 'detail back', item);
        // this._logger.log("into onErrorPageData, output:", output);
        // this.errorPageEmit.emit(output);
    }


    /**
     * Header左側按鈕點擊事件
     */
    onLeftBtnClick() {
        let output = {
            'page': 'content',
            'type': 'back',
            'data': this.setData,
            'nodetail': true
        };
        this._logger.log("into onBackPageData2222222, output:", output);
        this.backPageEmit.emit(output);
    }

    /**
     * 點擊 暫停,恢復扣款
     */
    onChangeStatus() {
        this._logger.log("into onChangeStatus");
        this.nowPage = 'changeStatus';
    }

    /**
     * 點擊 修改
     */
    onModify() {
        this._logger.log("into onModify");
        this.nowPage = 'changeEdit';
    }
}