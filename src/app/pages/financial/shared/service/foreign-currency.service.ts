/**
 * 外幣利率Service
 */
import { Injectable } from '@angular/core';
import { CacheService } from '@systems/system/cache/cache.service';
import { FormateService } from '@template/formate/formate.service';
import { SPEC10020001ApiService } from '@api/spec10/spec10020001/spec10020001-api.service';

@Injectable()

export class ForeignCurrencyService {
    /**
     * 參數處理
     */

    constructor(
        private _cacheService: CacheService,
        private _formateService: FormateService,
        private spec10020001: SPEC10020001ApiService
    ) {

    }

    /**
     * 外幣利率
     * 發電文取得資料
     */
    public getData(option?: object): Promise<any> {
        const cache_key = 'foreign-currency-rate';
        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        if (cache_data) {
            return Promise.resolve(cache_data);
        }
        
        return this.spec10020001.getData().then(
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