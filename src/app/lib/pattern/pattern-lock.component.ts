import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
// import PatternLock from 'PatternLock';
import { PatternLockService } from './pattern-lock.service';
import { Logger } from '@systems/system/logger/logger.service';
import { AlertService } from '@template/msg/alert/alert.service';
declare var PatternLock: any; //  引用外部javascript
@Component({
    selector: 'app-pattern-lock',
    templateUrl: './pattern-lock.component.html',
    encapsulation: ViewEncapsulation.None, //  強制吃自己的CSS(關閉angular的class tag控制事件)
    styleUrls: ['./pattern-lock-popup.component.css']
})
export class PatternLockComponent implements OnInit, OnDestroy {
    title;  //  標題
    content; //  內容
    type; //  類別(註冊/登入交易)
    errMsg = '';  //  錯誤訊息
    patternValue: Array<any>; //  圖形密碼鎖之值
    subscriptionResetPattern: any;  //  reset
    subscriptionEnablePattern: any; //  enable
    subscriptionDisablePattern: any; // disable
    patternLock; //  圖形鎖
    patternLockControl: HTMLElement;
    pattern_pw = '';  // 紀錄第一次設定密碼
    resetFlag = false;  // 重新設定按鈕
    set_obj = { // 最大最小值
        min: 6,
        max: 12
    };
    range = ''; // error word
    constructor(
        private patternLockService: PatternLockService,
        private alert: AlertService,
        private _logger: Logger
    ) {
        this._logger.log('pattern constructor');
        this.promise = new Promise((resolve, reject) => {
            this.ok = (e) => {
                resolve(e);
            };
            this.cancel = () => {
                this._logger.log('user cancel()');
                reject();
            };
        });

    }
    //  參考 http://ignitersworld.com/lab/patternLock.html

    promise: Promise<any>;
    ngOnInit() {

        this._logger.log('pattern init', this.type);
        this.patternLockControl = document.getElementById('patternLock');
        let objValue = {};  // 設定圖形鎖值
        if (this.patternValue && this.patternValue instanceof Array && this.patternValue.length == 9) {
            this.patternValue.forEach((item, index) => {
                objValue[index + 1] = item;
            });
        } else {
            objValue = { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09' };
        }
        if (this.type && this.type == '2') { // 畫兩次
            this.checkTwo(objValue);
        } else {  // 畫一次
            this.checkOnce(objValue);
        }
        this.subscriptionResetPattern = this.patternLockService.resetPatternSubject.subscribe(() => { // 清空圖形密碼圖案
            this.patternLock.reset();
        });
        this.subscriptionEnablePattern = this.patternLockService.enablePatternSubject.subscribe(() => { //  開啟圖形密碼(可以畫圖)
            this.patternLock.enable();
        });
        this.subscriptionDisablePattern = this.patternLockService.disablePatternSubject.subscribe(() => { // 鎖住圖形密碼(無法畫圖)
            this.patternLock.disable();
        });
        this.patternLockService.closePatternSubject.subscribe(() => { // 可由外部關閉popup
            this.cancel();
        });
        this.patternLockService.contentSubject.subscribe((e) => { // 可由外部更改alert內容及錯誤訊息
            this._logger.error('contentSubject', e);
            if (e.hasOwnProperty('title') && e['title'] != null && e['title'] != undefined) {
                this.title = e['title'];
            }
            if (e.hasOwnProperty('error') && e['error'] != null && e['error'] != undefined) {
                this.errMsg = e['error'];
            }
            if (e.hasOwnProperty('content') && e['content'] != null && e['content'] != undefined) {
                this.content = e['content'];
            }
        });
    }

    ok(e) { }
    cancel() { }
    ngOnDestroy() {
        this.patternLockService.setPatternPwd('');
    }
    /**
     * 重新設定按鈕
     */
    resetClick() {
        this.pattern_pw = '';
        this.resetFlag = false;
        this.content = 'SECURITY.PATTERN.ATLEASTDOT'; // 請輸入至少6個點
        this.errMsg = '';
        this.patternLock.reset();
    }
    /**
     * 檢查長度
     */
    checkLength(pattern) {
        let check_length = pattern.length / 2;
        if (check_length == 1) { //  可能是不小心點到"一個點"(圖形鎖)
            this.patternLock.reset();
            return;
        }
        let successFlag = true;
        this.range = this.set_obj['min'] + '~' + this.set_obj['max'];


        if (check_length < this.set_obj['min'] || check_length > this.set_obj['max']) { // 不符
            successFlag = false;
            this.errMsg = 'SECURITY.PATTERN.RANGEDOT'; // 輸入的的圖形密碼須為'+range+'個點
        }
        return successFlag;
    }


    /**
     * 畫一次(登入、交易)
     * @param set_obj 
     */
    checkOnce(objValue) {
        this.patternLock = new PatternLock('#patternLock', {
            onDraw: (pattern) => { //  畫完圖形鎖自動呼叫
                let check_length = this.checkLength(pattern);
                if (check_length) {
                    this._logger.error('pattern onDraw:', pattern);
                    this.successPattern(pattern);
                } else {
                    this.patternLock.reset();
                }
            },
            mapper: objValue // value
            , allowRepeat: true
        });
    }
    /**
     * 畫兩次(註冊)
     * @param set_obj 
     */
    checkTwo(objValue) {
        this.patternLock = new PatternLock('#patternLock', {
            onDraw: (pattern) => { //  畫完圖形鎖自動呼叫
                this._logger.error('pattern onDraw: ', pattern);
                this.checkPattern(pattern);
            },
            mapper: objValue // value
            , allowRepeat: true
        });
    }
    /**
     * 重複檢查圖形值 checkTwo
     * @param pattern 
     */
    private checkPattern(pattern) {
        //  ==第一次畫圖== // 
        this._logger.log('checkPattern pattern_pw', this.pattern_pw);
        if (this.pattern_pw === '') {
            let check_length = this.checkLength(pattern);
            if (check_length) {
                this.resetFlag = true;
                this.pattern_pw = pattern;
                this.content = 'SECURITY.PATTERN.CHECKPATTERN'; // 請再次確認圖形密碼
                this.errMsg = '';
                this.patternLock.reset();
            } else {
                this.patternLock.reset();
            }
        } else {
            this.patternLock.checkForPattern(this.pattern_pw,
                () => {
                    //  ==第二次確認成功== // 
                    this.successPattern(pattern);
                    this.patternLock.checkForPattern(false);
                },
                () => {
                    //  ==第二次確認失敗== // 
                    //  this.pattern_pw = '';
                    this.errMsg = 'SECURITY.PATTERN.NOTSAME'; // 您輸入的圖形密碼與第一次不相同，請重新輸入
                    this.patternLock.checkForPattern(false);
                    this.patternLock.reset();
                });
        }
    }

    /**
     * 成功回傳圖形值
     * @param pattern 圖形值
     */
    private successPattern(pattern) {
        //  this.patternLockService.setPatternPwd(pattern);
        //  this.patternLockService.onDraw(); //  通知service畫完
        this.ok(pattern);
    }

}
