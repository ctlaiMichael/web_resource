/**
 * 信卡月份查詢
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { LanguageChangeService } from '@systems/system/language/language-change.service';

@Component({
    selector: 'app-card-notice',
    templateUrl: './card-notice.component.html',
    styleUrls: [],

})
export class CardNoticeComponent implements OnInit {
    nowLang: string; // 當前語系


    constructor(
        private _logger: Logger,
        private languageService: LanguageChangeService
    ) {
    }


    ngOnInit() {
        // 抓預設語系顯示
        let dfLang = this.languageService.getNowLanguage();
        this.nowLang = dfLang.lang;
        // this._logger.log('lang:', this.nowLang);
    }
}

