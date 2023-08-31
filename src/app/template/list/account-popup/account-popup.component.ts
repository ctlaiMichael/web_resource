/**
 * 帳號選單service
 */
import { Component, OnInit } from '@angular/core';
import { FieldUtil } from '@util/formate/modify/field-util';

@Component({
    selector: 'app-account-popup',
    templateUrl: './account-popup.component.html',
    styleUrls: [],
    providers: []
})

export class AccountPopupComponent implements OnInit {
    /**
     * 參數處理
     */
    title: string; // popup標題
    data?: Array<any> = [];
    promise: Promise<any>;
    select: string;
    type: string;
    currencyCode: string;


    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.chooseOver = (item) => {
                let output = {
                    account: item.accountId,
                    nickName: item.nickName,
                    currencyCode: item.currencyCode
                };
                resolve(output);
            };

            this.cancleClick = () => {
                reject();
            };

        });
    }

    ngOnInit() {
        // console.log("currencyCode:", this.currencyCode);
    }

    chooseOver(item) {
    }

    cancleClick() {
    }

    checkSelect(item) {
        let acct = FieldUtil.checkField(item, 'accountId');
        let ccy = FieldUtil.checkField(item, 'currencyCode');
        const check_str = acct + '' + ccy;
        return (check_str == this.select) ? true : false;
    }

}
