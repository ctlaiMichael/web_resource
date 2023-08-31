/**
 * 外幣歷史匯率Service
 */
import { Injectable } from '@angular/core';
import { CacheService } from '@systems/system/cache/cache.service';
import { FormateService } from '@template/formate/formate.service';
import { SPEC10070001ApiService } from '@api/spec10/spec10070001/spec10070001-api.service';

@Injectable()

export class ExchangeRateHistoryService {
    /**
     * 參數處理
     */

    constructor(
        private _cacheService: CacheService,
        private _formateService: FormateService,
        private spec10070001: SPEC10070001ApiService
    ) {

    }

    /**
     * 外幣歷史匯率
     * 發電文取得資料
     */
    public getData(reqData, option?: object): Promise<any> {

        let start_date = this._formateService.checkField(reqData.dateRange, 'start');
        let end_date = this._formateService.checkField(reqData.dateRange, 'end');
        let ccy = this._formateService.checkField(reqData, 'currencyCode');

        const cache_main_key = 'exchange-history-rate';
        let cache_sub_key = [start_date, end_date, ccy];
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'option': option,
            'sub_key': cache_sub_key
        });
        const cache_key = cache_check.cache_key;

        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        if (cache_data) {
            return Promise.resolve(cache_data);
        }
        return this.spec10070001.getData(reqData).then(
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

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}