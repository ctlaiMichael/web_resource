/**
 * 結匯性質選單
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';

@Component({
    selector: 'app-remit-nature-popup',
    templateUrl: './remit-nature-popup.component.html',
    styleUrls: [],
    providers: []
})

export class RemitNaturePopupComponent implements OnInit {
    /**
     * 參數處理
     */
    nowPage = 'menu';
    title: string; // popup標題
    data?: Array<any> = []; // 傳入之顯示資料
    promise: Promise<any>;
    select: any = {
        groupId: '',
        groupName: '',
        code: '',
        name: ''
    };
    groupId: string;
    groupName: string;
    subData?: Array<any> = []; // 子選單資料 

    constructor(
        private logger: Logger
    ) {

        this.promise = new Promise((resolve, reject) => {
            this.chooseOver = (item) => {
                item = {...item, ...{
                    groupId: this.groupId,
                    groupName: this.groupName
                }};
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

    toSubClick(mainItem) {
        this.subData = mainItem.item;
        this.groupId = mainItem.groupId;
        this.groupName = mainItem.groupName;
        this.nowPage = 'sub-menu';
    }

    backClick() {
        this.nowPage = 'menu';
    }

}
