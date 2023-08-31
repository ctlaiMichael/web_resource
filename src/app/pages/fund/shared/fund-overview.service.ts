/**
 * 投資總覽
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs/internal/Subject';
// -- library -- //
import { CacheService } from '@systems/system/cache/cache.service';
import { FormateService } from '@template/formate/formate.service';
// -- api -- //
import { SPEC11010301ApiService } from '@api/spec11/spec11010301/spec11010301-api.service';
import { SPEC11010101ApiService } from '@api/spec11/spec11010101/spec11010101-api.service';
// -- data -- //
import { FUND_HOME_BTN, FUND_HOME_MENU } from '@conf/menu/home-menu';

@Injectable()

export class FundOverviewService {
    /**
     * 參數處理
     */
    private setCacheName = {
        'all': 'fund-overview', // 總覽相關
        'list': 'fund-invest-healthy', // 投資組合分析
        'overview': 'overview-fund' // 基金
    };

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,
        private spec11010101: SPEC11010101ApiService,
        private spec11010301: SPEC11010301ApiService
    ) {
    }

    /**
     * 投資理財首頁 選單資料
     */
    getMenuList() {
        return {
            quick: this._formateService.transClone(FUND_HOME_BTN),
            menu: this._formateService.transClone(FUND_HOME_MENU)
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
     * 基金資產資料
     * @param option 
     */
    getFundTotal(option?: object): Promise<any> {
        if (!option) {
            option = {
                background: true
            };
        }
        const cache_key = this.setCacheName.overview;
        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        if (cache_data) {
            return Promise.resolve(cache_data);
        }
        return this.spec11010101.getData({}, option).then(
            (successObj) => {
                let cache_option = this._cacheService.getCacheSet(cache_key);
                this._cacheService.save(cache_key, successObj, cache_option);
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );

    }


    // 取得投資合計和組合分析
    getInvestHealthy(reqData: object, option?: object) {
        this._logger.log("into getInvestHealthy, reqData:", reqData);
        let cache_key = this.setCacheName.list;
        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        if (cache_data) {
            return Promise.resolve(cache_data);
        }
        return this.spec11010301.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.step('Deposit', "send api success, success:", sucessObj);
                let cache_option = this._cacheService.getCacheSet(cache_key);
                this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.step('Deposit', "send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------


}




