/**
 * 信卡月份選單service
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-month-popup',
    templateUrl: './card-month-popup.component.html',
    styleUrls: [],
    providers: []
})

export class CardMonthPopupComponent implements OnInit {
    /**
     * 參數處理
     */
    title: string; // popup標題
    data?: Array<any> = [];
    promise: Promise<any>;
    select: string;
    type: string;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.chooseOver = (item) => {
                let output = {
                    selectedMonth: item.selectedMonth,
                    selectedMonthDesc: item.selectedMonthDesc
                };
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
