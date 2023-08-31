/**
 * 帳務總覽-單一資產項目-單一帳號
 * [assetsType]: 由assetsType決定
 *      partTwd 台幣帳戶資產
 *      partForeign 外幣帳戶資產
 *      partInvest 投資理財資產
 *      partNegative 負資產
 * [itemType]: 由setData的id決定
 *      checkingAcctInfoData 支存帳號
 *      savingsAcctInfoData 活存帳號
 *      timeAcctInfoData 定存帳號
 *      otherAcctInfoData 其他帳號
 *      fundInfoData 基金 (目前不顯示單一資料)
 *      goldInfoData 黃金
 *      loansInfoData 貸款
 *      cardsInfoData 信用卡 (目前不顯示單一資料)
 * 
 */
import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { DepositOverviewService } from '@pages/deposit/shared/deposit-overview.service';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
import { MenuPopupService } from '@template/list/menu-popup/menu-popup.service';

@Component({
    selector: 'app-deposit-overview-account',
    templateUrl: './deposit-overview-account.component.html',
    styleUrls: []
})

export class DepositOverviewAccountComponent implements OnInit {
    @Input() assetsType = ''; // 資產項目
    @Input() itemType = ''; // 內容類別
    @Input() setData: any; // 資產項目
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>(); // 返回
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>(); // 錯誤返回

    showData = false; // 顯示資料
    showErrorMsg = ''; // 整體錯誤訊息
    mainData: any = {};
    currencyCode = ''; // 幣別
    showNickName = '';
    showAccount = '';
    showMenu = false;
    private menuData: any = []; // 單一項目選單功能


    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _handleError: HandleErrorService,
        private mainService: DepositOverviewService,
        private layoutService: LayoutCtrlService,
        private _menuPop: MenuPopupService
    ) { }

    ngOnInit() {
        // 內容的返回按鈕
        this.getData();
        this.menuData = this.mainService.getMenu(this.itemType, this.setData, this.assetsType);
        if (this.menuData.length > 0) {
            this.showMenu = true;
        }
    }


    /**
     * 更多資訊-單一帳號
     * @param list 
     */
    onMore() {
        if (!this.showMenu) {
            return false;
        }
        this._logger.log('more', this.menuData, this.mainData);
        let options = {
            menu: this.menuData
        };
        let accountId = this._formateService.checkField(this.mainData, 'accountId'); // 帳號
        let currencyCode = this._formateService.checkField(this.mainData, 'currencyCode'); // 幣別
        if (!currencyCode || currencyCode == '') {
            currencyCode = 'NTD';
        }
        this._menuPop.show(options).then(
            (menu) => {
                let go_path = this._formateService.checkField(menu, 'url');
                let url_params = {
                    'accountId': accountId,
                    'currencyCode': currencyCode
                };
                this.mainService.onGoEvent(go_path, url_params);
            },
            () => {
                // no do
            }
        );
    }

    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onBackPageData(item) {
        let output = {
            'page': 'list-page-subitem',
            'type': 'back',
            'data': item
        };
        this._logger.step('DeviceOverview', 'detail back', output);
        this.backPageEmit.emit(output);
    }


    /**
     * 重新設定page data 子層返回事件
     * @param item
     */
    onErrorPageData(item) {
        let output = {
            'page': 'list-page-subitem',
            'type': 'back',
            'data': item
        };
        this._logger.log("into onErrorPageData, output:", output);
        this.errorPageEmit.emit(output);
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    private getData() {
        if (!this.setData) {
            return false;
        }
        this.mainData = this.setData;
        this.currencyCode = this._formateService.checkField(this.setData, 'currencyCode');
        this.showNickName = this._formateService.checkField(this.setData, 'nickName');
        this.showAccount = this._formateService.checkField(this.setData, 'accountId');
        if (this.showAccount == '') {
            this.showAccount = '- -';
        }
    }


}
