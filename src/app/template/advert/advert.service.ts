/**
 * 廣告
 *
 *
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { SPEC01010101ApiService } from '@api/spec01/spec01010101/spec01010101-api.service';
import { SPEC01010102ApiService } from '@api/spec01/spec01010102/spec01010102-api.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Injectable()

export class AdvertService {
    /**
     * 參數
     */
    private setCacheName = {
        'list': 'advert',
        'detail': 'advert-detail'
    };

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,
        private spec01010101: SPEC01010101ApiService,
        private spec01010102: SPEC01010102ApiService,
        private navgator: NavgatorService,
        private errorHandler: HandleErrorService
    ) {
    }

    /**
     * 廣告取得
     */
    getData(): Promise<any> {
        return this.getAdvertData().then(
            (output) => {
                if (!!output.status) {
                    return Promise.resolve(output);
                } else {
                    return Promise.reject(output);
                }
            },
            (errorObj) => {
                return Promise.reject(errorObj);
            }
        );
    }

    // 目前先寫死假資料, 欄位也不一定下方
    getAdvertData(): Promise<any> {
        const cache_key = this.setCacheName.list;
        const cache_data = this._cacheService.checkCacheData(cache_key);
        if (cache_data) {
            return Promise.resolve(cache_data);
        }

        let options = {
            background: true
        };

        return this.spec01010101.getData({}, options).then(
            (successObj) => {
                let cache_option = this._cacheService.getCacheSet(cache_key);
                this._cacheService.save(cache_key, successObj, cache_option);
                return Promise.resolve(successObj);
            },
            (failedObj) => {
                return Promise.reject(failedObj);
            }
        );

    }

    

    // 目前先寫死假資料, 欄位也不一定下方
    getAdvertImgData(id): Promise<any> {
        if (!id) {
            return this.errorHandler.returnError({}, 'SPEC01010202_REQ');
        }
        let option = {
            background: true
        };

        let cache_main_key = this.setCacheName.detail;
        let cache_sub_key = [id];
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'option': option,
            'sub_key': cache_sub_key
        });

        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }

        let options = {
            background: true
        };
        let set_data = {
            'id': id
        };

        return this.spec01010102.getData(set_data, options).then(
            (successObj) => {
                let cache_option = this._cacheService.getCacheSet(cache_key);
                this._cacheService.save(cache_key, successObj, cache_option);
                return Promise.resolve(successObj);
            },
            (failedObj) => {
                return Promise.reject(failedObj);
            }
        );

    }


    /**
     * 刪除cache
     * @param type 指定刪除類別
     *  advert: 廣告
     */
    removeAllCache(type?: string) {
        type = this.setCacheName.list;
        this._cacheService.removeGroup(type);
    }

    
    /**
     * 選單事件(主頁籤)
     * @param menu 選單
     */
    onGoEvent(menu) {
        let go_path = this._formateService.checkField(menu, 'url');
        if (!go_path) {
            // this.errorHandler.handleError({}, 'EMPTY_LINK');
            // 不顯示錯誤，即無反應
            return false;
        }
        this.navgator.push(go_path);
    }

}
