/**
 * 條款清單
 */
import { Component, Input, OnInit } from '@angular/core';
import { FundInvestService } from '@pages/fund/shared/fund-invest.service';
import { Logger } from '@systems/system/logger/logger.service';

@Component({
    selector: 'app-term-popup',
    templateUrl: './term-popup.component.html'
})
export class TermPopupComponent implements OnInit {
    @Input() option: any;
    title?: string;     // 自定標題
    content?: string;  // 自定內容
    content_list?: Array<any>;  // 自定內容
    type?: string;  // 類別, 用於判斷需不需要發api取得資料, EX: '1' 公開說明書(不發api)
    reqType?: any; // request 條款api類別(array), EX: Fund_Terms04_A 高收益配息風險預告書-A
    nowPage = ''; // 目前頁面
    errorBoxMsg = ''; // 錯誤訊息
    data: any; // 顯示條款內容
    hasSend = false; // 條款是否為發送api取得, false代表此條款為app寫死, true發送api取得(html跑foreach)
    // showNumber: boolean;

    promise: Promise<any>;

    constructor(
        private _investService: FundInvestService,
        private _logger: Logger
    ) {
        let type = ''; // 回傳判斷是否強制打勾或取消打勾
        this.promise = new Promise((resolve, reject) => {
            this.onClickEvent = () => {
                type = 'mustChecked';
                resolve(type);
            };
            this.onCancleEvent = () => {
                type = 'cancel';
                reject(type);
            };
            this.onNotAgree = () => {
                type = 'mustNotChecked';
                reject(type);
            };
        });
    }

    ngOnInit() {
        /**
         * 若為以下幾種情況需發送api :
         * 高收益配息風險預告書 04
         * 後收型風險預告書 09
         * 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種版本) 10
         * 上海商業儲蓄銀行信託資金集合管理運用帳戶信託管理說明書 11
         * 金錢信託開戶及各項務務約定書 12
         * 金錢信託開戶及各項務務約定書 13
         */
        if (this.type == '4' || this.type == '9' || this.type == '10'
            || this.type == '11' || this.type == '12' || this.type == '13') {
            this.hasSend = true; // 條款需發送api取得 (html跑foreach)
            // 取得條款html範本
            this.getTermHtml(this.reqType);
        // 不需發api查詢條款的其他幾種條款, 直接顯示
        } else {
            this.nowPage = 'termPage';
        }
    }

    onClickEvent() {
    }

    onNotAgree() {
    }

    onCancleEvent() {
    }

    /**
     * 取得條款html範本
     * @param reqData 請求
     */
    private getTermHtml(reqData_type) {
        this._logger.log("getTermHtml, reqData_type:", reqData_type);
        let reqData = {
            termId: reqData_type
        };
        // reqData.termId.push(reqData_type);
        this._investService.getTermHtml(reqData, {}).then(
            (result) => {
                this._logger.log("getTermHtml, result:", result);
                this.data = result.data;
                this.nowPage = 'termPage'; // 條款頁面
            },
            (errorObj) => {
                this._logger.log("getTermHtml, errorObj:", errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorBox'; // 錯誤頁面
            }
        );
    }

}
