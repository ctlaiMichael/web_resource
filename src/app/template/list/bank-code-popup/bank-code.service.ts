/**
 * 銀行代碼
 * 
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC00010101ApiService } from '@api/spec00/spec00010101/spec00010101-api.service';

@Injectable()

export class BankCodeService {
    /**
     * 
     */

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,
        private spec00010101: SPEC00010101ApiService
    ) {
    }

    private setCacheBankCode = {
        'list': 'select-bank-code'
    };


    /**
     * 發送 取得銀行代號
     */
     getBankCode(option?: object): Promise<any> {
        // 紀錄cache
        let cache_main_key = this.setCacheBankCode.list;
        let cache_sub_key = [];
        // tslint:disable-next-line:radix
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'paginator': {
                pageNumber: 1
            },
            'option': option,
            'sub_key': cache_sub_key
        });
        // const cache_check = this._cacheService.checkPaginatorOldCach(cache_main_key, 1,
        //     [], {}, null, { sub_key: cache_sub_key });
        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);

        return this.spec00010101.getData({}, option).then(
            (sucessObj) => {
                this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                return Promise.reject(failedObj);
            }
        );
    }

}
