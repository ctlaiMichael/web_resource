/**
 * 信用卡總覽
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- library -- //
import { CacheService } from '@systems/system/cache/cache.service';
import { FormateService } from '@template/formate/formate.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';
// -- api -- //
// -- data -- //
import { CARD_HOME_BTN, CARD_HOME_MENU } from '@conf/menu/home-menu';
import { LOCAL_STORAGE_NAME_LIST } from '@conf/security/storage-name';
// -- other service -- //
import { HistoryBillService } from '@pages/card/shared/history-bill-main.service';
import { CardPersonalProfileService } from '@pages/card/shared/card-personal-profile.service';
import { BonusConvertHistoryService } from '@pages/card/shared/bonus-convert-history.service';

@Injectable()

export class CardOverviewService {
    /**
     * 參數處理
     */
    private setCacheName = {
        'all': 'card-overview' // 總覽相關
    };
    private acctShowStatusName = LOCAL_STORAGE_NAME_LIST.ACCT_SHOW_STATUS;


    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,        
        private _localStorage: LocalStorageService,
        private historyBill: HistoryBillService, // 近期帳單,未出帳,各期帳單
        private cardBonus: BonusConvertHistoryService, // 紅利點數
        private cardProfile: CardPersonalProfileService // 信卡現況查詢
    ) {
    }


    /**
     * 信用卡首頁 選單資料
     */
    getMenuList() {
        return {
            quick: this._formateService.transClone(CARD_HOME_BTN),
            menu: this._formateService.transClone(CARD_HOME_MENU)
        };
    }

    /**
     * 刪除cache
     * @param type 指定刪除類別
     *  deposit-demand: 活存
     *  alldetail: 所有明細
     * @param acctObj 指定刪除明細
     *  iron 指定刪除單一明細
     */
    removeAllCache(type?: string, acctObj?: object) {
        if (typeof type == 'undefined') {
            type = this.setCacheName.all;
        }
        this._cacheService.removeGroup(type);
    }


    /**
     * 資產是否隱藏判斷
     * @returns true 隱藏, false 顯示
     */
    getHiddenAcct(): boolean {
        let acctShowStatus: any = this._localStorage.getObj(this.acctShowStatusName);
        if (!acctShowStatus) {
            acctShowStatus = {};
        }
        let save_str = this._formateService.checkField(acctShowStatus, 'CARD');
        if (!save_str) {
            save_str = 'Y';
        }
        let hidden = (save_str == 'Y') ? false : true;
        return hidden;
    }

    /**
     * 資產狀態儲存
     */
    saveHiddenAcct(hidden: boolean) {
        let save_str = (!!hidden) ? 'N' : 'Y';
        let set_name = this.acctShowStatusName;
        let acctShowStatus: any = this._localStorage.getObj(set_name);
        if (!acctShowStatus) {
            acctShowStatus = {};
        }
        acctShowStatus['CARD'] = save_str;
        this._localStorage.setObj(set_name, acctShowStatus);
    }


    /**
     * 取得近一期帳單
     * @param reqData 
     * @param option 
     */
    getNowBillData(reqData?, option?: object): Promise<any> {
        if (!option) {
            option = {
                background: true
            };
        }
        return this.historyBill.getNowBillData(reqData, option);
    }

    /**
     * 未出帳消費查詢
     * @param reqData 
     * @param paginator 
     * @param option 
     */
    getUnpaidData(reqData?, option?: object): Promise<any> {
        if (!option) {
            option = {
                background: true
            };
        }
        return this.historyBill.getUnpaidData(reqData, option);
    }

    // /**
    //  * 信用卡現況資料
    //  * @param reqData 
    //  * @param option 
    //  */
    // getCardProfile(reqData?, option?: object): Promise<any> {
    //     if (!option) {
    //         option = {
    //             background: true
    //         };
    //     }
    //     return this.cardProfile.getCardProfile(reqData, option);
    // }

    // /**
    //  * 紅利點數資料
    //  * @param reqData 
    //  * @param option 
    //  */
    // getBonusCount(reqData?, option?: object): Promise<any> {
    //     if (!option) {
    //         option = {
    //             background: true
    //         };
    //     }
    //     return this.cardBonus.getBonusCount(reqData, option);
    // }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}