/**
 * 台幣轉出帳號popup
 */
import { Component, OnInit } from '@angular/core';
import { TwdTransOutService } from './twd-transout.service';
import { FieldUtil } from '@util/formate/modify/field-util';
import { AccountMaskUtil } from '@util/formate/mask/account-mask-util';

@Component({
    selector: 'app-twd-transout-popup',
    templateUrl: './twd-transout-popup.component.html',
    styleUrls: [],
    providers: []
})

export class TwdTransOutPopupComponent implements OnInit {
    /**
     * 參數處理
     */
    title: string; // popup標題
    data?: Array<any> = [];
    promise: Promise<any>;
    select: string;
    type: string; // '2': 非約定, '1': 約定
    info: any; // 資訊
    nowPage = 'acctPage';
    errorBoxMsg = ''; // 錯誤訊息
    // 轉入帳號選擇哪種, 轉出帳號依據轉入帳號選擇「常用」or「約定」切換, 「常用」: 非約轉出清單, 「約定」: 約定轉出清單
    chooseType: string;
    allow_notAgree: boolean;  // 是否可做非約轉, true: 可以, false: 不行
    // offenAcctData: any; // 常用帳號(非約定api回傳),取得後與約定帳號清單mapping

    constructor(
        private mainService: TwdTransOutService,

    ) {
        this.promise = this.doPromise();
    }

    ngOnInit() {
        // 發api
        // 非約定轉出帳號 (非約轉頁籤 or 轉入選擇常用帳號)
        if (this.type == '2' || this.chooseType == 'offen') {
            this.mainService.getNotTwdTransout().then(
                (result) => {
                    // 若不可做非約轉, 轉出帳號清單顯示錯誤訊息
                    if (this.allow_notAgree == false) {
                        this.nowPage = 'errorBox';
                        // 不可進行非約轉交易,查無「非約定轉出帳號」
                        this.errorBoxMsg = 'TWD_TRANSFER.MSG.NOT_NOTAGREED_LIST';
                    } else {
                        this.data = result.transOutAcctData;
                        this.info = result.infoData;
                        this.nowPage = 'acctPage';
                    }
                },
                (errorObj) => {
                    this.nowPage = 'errorBox';
                    this.errorBoxMsg = errorObj['content'];
                }
            );
            // 約定轉出帳號 (約轉頁籤 or 轉入選擇約定帳號)
        } else {
            this.mainService.getTwdTransout().then(
                (result) => {
                    this.data = result.transOutAcctData;
                    this.nowPage = 'acctPage';
                },
                (errorObj) => {
                    this.nowPage = 'errorBox';
                    this.errorBoxMsg = errorObj['content'];
                }
            );
        }
    }

    chooseOver(item) {
    }

    cancelClick() {
    }

    private doPromise(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.chooseOver = (item) => {
                resolve(item);
            };

            this.cancelClick = () => {
                reject();
            };

        });
    }

    checkSelect(item) {
        let acct = FieldUtil.checkField(item, '_checkAcct');
        let zeroOutAcct = AccountMaskUtil.accountAllNoFormate(this.select);
        let zeroItemAcct = '';
        if (!acct || acct == '') {
            zeroItemAcct = AccountMaskUtil.accountAllNoFormate(item['accountId']);
            item['_checkAcct'] = zeroItemAcct;
        }
        return (zeroOutAcct == item['_checkAcct']) ? true : false;
    }

}
