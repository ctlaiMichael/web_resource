/**
 * 銀行代碼選單service
 */
import { Component, OnInit } from '@angular/core';
import { BankCodeService } from './bank-code.service';
import { FormateService } from '@template/formate/formate.service';

@Component({
    selector: 'app-bank-code-popup',
    templateUrl: './bank-code-popup.component.html',
    styleUrls: [],
    providers: [BankCodeService]
})

export class BankCodePopupComponent implements OnInit {
    /**
     * 參數處理
     */
    title: string; // popup標題
    data?: Array<any> = [];
    promise: Promise<any>;
    select: string;
    type: string;
    searchText = ''; // 搜尋文字 ngModel
    nowPage = ''; // 當下頁面
    errorBoxMsg = ''; // 條件查詢錯誤訊息
    searchData: any; // 查詢使用

    constructor(
        private mainService: BankCodeService,
        private _formateService: FormateService

    ) {
        this.promise = this.doPromise();
    }

    ngOnInit() {
        // 發api
        this.mainService.getBankCode().then(
            (result) => {
                this.data = result.data;
                this.searchData = result.data;
                this.nowPage = 'bankCode';
            },
            (errorObj) => {
                this.cancleClick = () => {
                    return Promise.reject(errorObj);
                };
            }
        );
    }

    chooseOver(item) {
    }

    cancleClick() {
    }

    private doPromise(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.chooseOver = (item) => {
                resolve(item);
            };

            this.cancleClick = () => {
                reject();
            };

        });
    }

    onSearch() {
        let checkCode = this.searchCode();
        if (checkCode.status) {
            this.data = checkCode.data;
            this.nowPage = 'bankCode';
        } else {
            // final show search error
            this.errorBoxMsg = 'FUND_INVEST.CODE_POPUP.HAS_NOT_QUERY';
            this.nowPage = 'errorBox'; // 查無(空箱)
        }
    }

    // 搜尋代號
    private searchCode() {
        let output = {
            status: false,
            data: []
        };

        this.searchData.forEach(item => {
            let reg = new RegExp(this.searchText, 'g');
            let bankCode = this._formateService.checkField(item, 'bankCode');
            if (reg.test(bankCode) == true) {
                output.data.push(item);
            }
        });
        if (output.data.length > 0) {
            output.status = true;
        }
        return output;
    }

    onBankChange() {
        this.onSearch();
    }

}
