/**
 * 帳號選單(交易類)service
 */
import { Component, OnInit } from '@angular/core';
import { FieldUtil } from '@util/formate/modify/field-util';

@Component({
    selector: 'app-trans-acct-popup',
    templateUrl: './trans-acct-popup.component.html',
    styleUrls: [],
    providers: []
})

export class TransAcctPopupComponent implements OnInit {
    /**
     * 參數處理
     */
    title: string; // popup標題
    data?: Array<any> = []; // 傳入之顯示資料
    promise: Promise<any>;
    select: string;
    // type => '1': '台幣轉帳', '2': 信卡繳卡費, 
    //         '3': 外幣兌換轉出帳號, '4': 外幣兌換轉入帳號
    //         '5': 外幣兌換結匯性質, '6': 立即轉定存
    type: string;
    currency: string; // 幣別
    special: boolean; // 是否需判斷幣別

    constructor() {

        this.promise = new Promise((resolve, reject) => {
            this.chooseOver = (item) => {
                resolve(item);
            };

            this.cancleClick = () => {
                reject();
            };

        });
    }

    ngOnInit() {
    }

    chooseOver(item) {
    }

    cancleClick() {
    }

    checkSelect(item) {
        let acct = FieldUtil.checkField(item, '_checkAcct');
        if (!acct || acct == '') {
            // 外幣兌換轉出帳號
            if (this.type == '3') {
                let acctNo = FieldUtil.checkField(item, 'accountId');
                let currencyCode = FieldUtil.checkField(item, 'currencyCode');
                if (typeof currencyCode == 'undefined' || currencyCode == '') {
                    currencyCode = 'TWD';
                }
                acct = this.special == true ? acctNo + '' + currencyCode : acctNo;
            }
            item['_checkAcct'] = acct;
        }
        return (acct == this.select) ? true : false;
    }

}
