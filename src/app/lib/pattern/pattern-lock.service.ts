import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Logger } from '@systems/system/logger/logger.service';
@Injectable()
export class PatternLockService {

    resetPatternSubject: Subject<any> = new Subject<any>();
    enablePatternSubject: Subject<any> = new Subject<any>();
    disablePatternSubject: Subject<any> = new Subject<any>();
    onDrawSubject: Subject<any> = new Subject<any>();
    contentSubject: Subject<any> = new Subject<any>();
    closePatternSubject: Subject<any> = new Subject<any>();
    patternPwd = ''; // 圖形鎖密碼 ex:123654

    constructor(
        private _logger: Logger
    ) { }


    /**
     * 清空圖形密碼圖案
     */
    resetPattern() {
        this.resetPatternSubject.next();
        this.setPatternPwd('');
        this._logger.error('resetPattern');
    }

    /**
     * 設置圖形密碼
     */
    setPatternPwd(patternPwd: string) {
        this.patternPwd = patternPwd;
        this._logger.error('setPatternPwd', this.patternPwd);
    }

    /**
     * 取得圖形密碼
     */
    getPatternPwd(): string {
        return this.patternPwd;
    }

    /**
     * 開啟圖形密碼(可以畫圖)
     */
    enablePattern() {
        this.enablePatternSubject.next();
    }

    /**
     * 鎖住圖形密碼(無法畫圖)
     */
    disablePattern() {
        this.disablePatternSubject.next();
    }

    /**
     * 畫完做的事
     * 僅供pattern-lock.component呼叫
     */
    onDraw() {
        if (this.getPatternPwd().length == 1) {
            this.resetPattern();
            this._logger.error('onDraw reset length==1');
        } else {
            this._logger.error('onDraw');
            this.resetErrorWord();  // 先清空error訊息
            this.onDrawSubject.next();
        }
    }

    /**
     * 關閉popup
     */
    closePattern() {
        this.closePatternSubject.next();
    }
    /**
     * 重置error訊息
     */
    resetErrorWord() {
        this.contentSubject.next({
            'error': ''
        });
    }

    /**
     * 傳入物件，更新popup
     * title標題
     * content內容
     * error訊息
     */
    setContent(content?) {
        this.contentSubject.next(content);
    }


}
