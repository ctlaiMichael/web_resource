/**
 * 基金帳號選單service
 */
import { Component, OnInit } from '@angular/core';
import { FieldUtil } from '@util/formate/modify/field-util';

@Component({
    selector: 'app-fund-acct-popup',
    templateUrl: './fund-acct-popup.component.html',
    styleUrls: [],
    providers: []
})

export class FundAcctPopupComponent implements OnInit {
    /**
     * 參數處理
     */
    title: string; // popup標題
    data?: Array<any> = [];
    promise: Promise<any>;
    select: string;
    type: string; // '1':申購, '2':贖回, '3':轉換
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
            // 申購
            if (this.type == '1') {
                let acctNo = FieldUtil.checkField(item, 'accountNO');
                let currencyCode = FieldUtil.checkField(item, 'fundEngCcy');
                if (typeof currencyCode == 'undefined' || currencyCode == '') {
                    currencyCode = 'TWD';
                }
                acct = this.special == true ? acctNo + '' + currencyCode : acctNo;
                // 贖回
            } else if (this.type == '2') {
                let acctNo = FieldUtil.checkField(item, 'accountID');
                let currencyCode = FieldUtil.checkField(item, 'accountEngCcy');
                if(typeof currencyCode == 'undefined' || currencyCode == '') {
                    currencyCode = 'TWD';
                }
                acct = acctNo + '' + currencyCode; // 贖回都需判斷幣別(無配息帳號)
                // 理財妙管家修改
            } else if (this.type == '4') {
                acct = FieldUtil.checkField(item, 'accno');
                // 定期定額異動修改
            } else if (this.type == '5') {
                acct = FieldUtil.checkField(item, 'accountID');
            }
            item['_checkAcct'] = acct;
        }
        return (acct == this.select) ? true : false;
    }


}
