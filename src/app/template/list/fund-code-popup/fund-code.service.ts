/**
 * 投資標的
 * 
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC11040101ApiService } from '@api/spec11/spec11040101/spec11040101-api.service';

@Injectable()

export class FundCodeService {

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,
        private spec11040101: SPEC11040101ApiService
    ) {
    }

    // 非約定
    private setCacheFundCode = {
        'list': 'fund-code'
    };

    /**
     * 刪除基金標的
     */
    removeAllCache() {
        let type = 'fund-code';
        this._cacheService.removeGroup(type);
    }

    /**
     * 發送 基金標的
     */
    getFundCode(): Promise<any> {
        // 紀錄cache
        let cache_main_key = this.setCacheFundCode.list;
        let cache_sub_key = [];
        // tslint:disable-next-line:radix
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'paginator': {
              pageNumber: 1
            },
            'option': {},
            'sub_key': cache_sub_key
          });
        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);

        return this.spec11040101.getData({}).then(
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
