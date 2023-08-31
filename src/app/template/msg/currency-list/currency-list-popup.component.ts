/**
 * 外幣資產總攬清單
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-currency-list-popup',
    templateUrl: './currency-list-popup.component.html'
})
export class CurrencyListPopupComponent implements OnInit {

    title?: string;     // 自定標題
    data?: Array<any> = [];  // 內容
    content_list?: Array<any>;  // 自定內容
    showNumber: boolean;

    promise: Promise<any>;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.onClickEvent = () => {
                resolve();
            };
            this.onCancleEvent = () => {
                reject();
            };

        });
    }

    ngOnInit() {
    }


    onClickEvent() {
    }

    onCancleEvent() {
    }

}
