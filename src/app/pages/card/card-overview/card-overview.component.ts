/**
 * 信用卡總覽
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- lib -- //
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { FormateService } from '@template/formate/formate.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
// -- main -- //
import { CardOverviewService } from '@pages/card/shared/card-overview.service';

@Component({
    selector: 'app-card-overview',
    templateUrl: './card-overview.component.html',
    styleUrls: []
})

export class CardOverviewComponent implements OnInit {

    // 選單設定
    menuList = {
        quick: [], // 快捷
        menu: [] // 選單
    };
    haveCard = false; // 卡友判斷
    selectMonth = ''; // EX: 2020-07-28
    billData = {};  // 各期帳單查詢
    showData = {
        nowRange: '', // 目前可用額度
        show_pay: false, // 帳單顯示
        show_bill_status: false, // 顯示繳費狀態
        monthStr: '',
        curBal: '', // 本期應繳總額
        minPay: '', // 本期最低應繳金額
        dueDate: '', // 本期繳款截止日
        show_bonus: false, // 紅利
        bonusCount: '' // 信卡紅利點數
    };
    // cardProfileData: any; // 信卡現況查詢

    constructor(
        private _logger: Logger,
        private mainService: CardOverviewService,
        private navgator: NavgatorService,
        private auth: AuthService,
        private _formateService: FormateService,
        private _handleError: HandleErrorService
    ) { }

    ngOnInit() {
        this.menuList = this.mainService.getMenuList();
        if (this.auth.checkIsLoggedIn()) {
            this.haveCard = this.auth.checkAllowAuth('isCardUser');
            if (!!this.haveCard) {
                this.getData();
            } else {
                // 非卡友
                this.checkIsEmpty();
            }
        } else {
            // 沒登入
            this.haveCard = false;
            this.checkIsEmpty();
        }

    }

    /**
     * 轉址事件
     * @param menu 選單事件 
     */
    onGoEvent(menu) {
        let go_path = menu;
        if (typeof menu == 'object') {
            go_path = this._formateService.checkField(menu, 'url');
        } else if (typeof menu === 'string') {
            // 特定list
            switch (menu) {
                case 'unPaid': // 未出帳消費
                    go_path = 'history-bill-unPaid';
                    break;
                case 'bill': // 各期帳單查詢
                    go_path = 'history-bill-main';
                    break;
                case 'bonus': // 點擊紅利點數
                    go_path = '';
                    break;
                default:
                    break;
            }
        }
        if (!go_path) {
            this._handleError.handleError({}, 'EMPTY_PATH');
            return false;
        }
        this.navgator.push(go_path);
    }

    private getData() {
        // 近期帳單查詢
        this.mainService.getNowBillData().then(
            (result) => {
                this._logger.log("getNowBillData, result:", result);
                this.showData.show_pay = true;
                this.selectMonth = result.selectedMonth;
                this.showData.monthStr = result.monthStr;
                this.showData.curBal = result.curBal;
                this.showData.minPay = result.minPay;
                this.showData.dueDate = result.dueDate;
                this.billData = result.billData; // 計算繳費狀況顯示 使用
                // 若未取得帳單相關資訊, 就無法計算出 繳費狀況
                if (result.haveBill) {
                    this._logger.log("billData, object empty");
                    this.showData.show_bill_status = false;
                } else {
                    this.showData.show_bill_status = true;
                }
            },
            (errorObj) => {
                this._logger.log("getNowBillData, errorObj:", errorObj);
                this.showData.show_pay = false;
                this.showData.show_bill_status = false;
            }
        );

        // // 信用卡現況查詢: 暫時不取得，待二階確認來源
        // this.mainService.getCardProfile().then(
        //     (result) => {
        //         this._logger.log("getCardProfile, result:", result);
        //         this.cardProfileData = result.infoData;
        //         this.showData.nowRange = this.cardProfileData.currentBalance;
        //         this.showData.bonusCount = this.cardProfileData.bonus;
        //         this._logger.log("showData.nowRange:", this.showData.nowRange);
        //     },
        //     (errorObj) => {
        //         this._logger.log("getCardProfile, errorObj:", errorObj);
        //     }
        // );

    }


    /**
     * 檢核無資料
     */
    private checkIsEmpty() {
        if (!this.haveCard) {
            // 非卡友顯示
            this._logger.step('Home', 'HomeCards no Card');
            this.showData.show_pay = false;
            this.showData.show_bonus = false;
            // this.showData = false;
            // this.showErrorMsg = 'HOME.CARDS.NOCARD';
            return false;
        }
        // // 錯誤資料
        // if (!this.mainData.unPaid.show
        //     && !this.mainData.pay.show
        //     // && !this.mainData.bonus.show
        // ) {
        //     this.showData = false;
        //     this.showErrorMsg = 'HOME.CARDS.ERROR';
        // } else {
        //     this.showData = true;
        // }
        // this._logger.step('Home', 'HomeCards End', this.showData);
    }

}