/**
 *  問候語
 *  凌晨Early       00:00 ~ 03:00
 *   拂曉dawn        03:00 ~ 06:00
 *   早晨morning     06:00 ~ 09:00
 *   午前forenoon	09:00 ~ 12:00
 *   午後Afternoon	12:00 ~ 15:00
 *   傍晚Evening     15:00 ~ 18:00
 *   薄暮dusk        18:00 ~ 21:00
 *   深夜night       21:00 ~ 24:00
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- 設定值 -- //
import { GREETINGS_SETTING } from '@conf/greeting-word';
// -- Other Lib -- //
import { FormateService } from '@template/formate/formate.service';
import { LanguageChangeService } from '@systems/system/language/language-change.service';

@Component({
    selector: 'app-greetings',
    templateUrl: './greetings.component.html',
    styleUrls: [],
    providers: []
})
export class GreetingsComponent implements OnInit {
    @Input() templateType = ''; // 顯示樣版
    showType = false;  // 是否顯示
    word = '';    // 顯示語句

    private configData = this._formateService.transClone(GREETINGS_SETTING);


    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private language: LanguageChangeService
    ) { 
    }

    ngOnInit() {
        this._modifyData();
    }

    private _modifyData() {
        let date = new Date().getHours();
        let type = '';
        if (date >= 0 && date < 3) {
            type = 'early';
        } else if (date >= 3 && date < 6) {
            type = 'dawn';
        } else if (date >= 6 && date < 9) {
            type = 'morning';
        } else if (date >= 9 && date < 12) {
            type = 'forenoon';
        } else if (date >= 12 && date < 15) {
            type = 'afternoon';
        } else if (date >= 15 && date < 18) {
            type = 'evening';
        } else if (date >= 18 && date < 21) {
            type = 'dusk';
        } else if (date >= 21 && date < 24) {
            type = 'night';
        }

        let languageWord = 'zword';
        const nowLang = this.language.getNowLanguage();
        if (this._formateService.checkField(nowLang, 'lang') == 'zh-tw') {   
            // 中語系
            languageWord = 'zword';
        } else {  
            // 英語系
            languageWord = 'eword';
        }

        const index_name = [type, languageWord].join('.');
        const showObj = this._formateService.checkObjectList(this.configData, index_name, 'array');
        if (!!showObj && showObj.length > 0) {
            let random = this._formateService.getRandomInt(showObj.length);
            let show_word = (!!showObj[random]) ? showObj[random] : '';
            if (this.templateType == 'user-home') {
                show_word = show_word.toString().replace(/[\!|！]$/g, '<span class="home_greeint_ending">!</span');
            }
            this.word = show_word;
            this.showType = true;
        } else {
            // 拿不到資料不顯示
            this.showType = false;
        }

    }



}
