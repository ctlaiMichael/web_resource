/**
 * 幣別選單service
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-currency-flag-popup',
    templateUrl: './currency-flag-popup.component.html',
    styleUrls: [],
    providers: []
})

export class CurrencyFlagPopupComponent implements OnInit {
    /**
     * 參數處理
     */
    title: string; // popup標題
    data?: Array<any> = [];
    promise: Promise<any>;
    selectCurrency: string; // 當前幣別
    type: string;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.chooseOver = (item) => {
                let output = {
                    currencyCode: item.currencyCode,
                    currencyName: item.currencyName,
                    data: item.data
                };
                this.selectCurrency = item.currencyCode;
                resolve(output);
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

}
