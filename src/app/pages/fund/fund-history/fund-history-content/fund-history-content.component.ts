/**
 * 投資交易明細查詢(詳細內容)
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';

@Component({
    selector: 'app-fund-history-content',
    templateUrl: './fund-history-content.component.html',
    styleUrls: []
})

export class FundHistoryContnetComponent implements OnInit {
    @Input() setData: any; // 主層傳入 這一筆的詳細資料
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _logger: Logger,
        private _formateServcie: FormateService,
        private _handleError: HandleErrorService,
        private headerCtrl: HeaderCtrlService
    ) { }

    ngOnInit() {
        this._logger.log("into FundHistoryContnetComponent, setData:", this.setData);
        this.backEvent();
    }

    // 返回相關流程
    backEvent() {
        this.headerCtrl.setLeftBtnClick(() => {
            this._logger.log("into setLeftBtnClick");
            this.onBackPageData('content-page');
        });
    }
    // 返回事件
    onBackPageData(page) {
        this._logger.log("into onBackPageData, page:", page);
        let output = {
            'page': page,
            'type': 'back',
            'data': this.setData
        };
        this.backPageEmit.emit(output);
    }
}
