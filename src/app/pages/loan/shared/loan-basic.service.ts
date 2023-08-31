/**
 * 基本資料查詢
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC08010001ApiService } from '@api/spec08/spec08010001/spec08010001-api.service';

@Injectable()

export class LoanBasicService {
    /**
     * 參數處理
     */

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,
        private spec08010101: SPEC08010001ApiService
    ) {
    }

    /**
     * 刪除cache
     * @param type 指定刪除類別
     *  foreign-ir-deposit: 國外匯入匯款
     *  alldetail: 國外匯入匯款 所有明細
     * @param acctObj 指定刪除明細
     *  iron 指定刪除單一明細
     */
    removeAllCache(type?: string, acctObj?: object) {
        if (typeof type == 'undefined') {
            type = 'loan-main-basic';
        }
        this._cacheService.removeGroup(type);
    }

    // 基本資料查詢
    /**
     * 取得自訂查詢區間資料
     * @param reqObj 請求資料
     * @param option 模式設定
     */
    getBasicData(reqData, option?: object): Promise<any> {
        this._logger.log("into getList, reqData:", reqData);
        let check_acct = this._formateService.checkField(reqData, 'accountId');
        if (check_acct === '') {
            return Promise.reject({
                title: 'ERROR.TITLE',
                content: 'ERROR.DATA_FORMAT_ERROR'
            });
        }
        let cache_main_key = 'loan-main-basic';
        let cache_sub_key = [check_acct];
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'paginator': {
                pageNumber: 1
            },
            'option': option,
            'sub_key': cache_sub_key
        });
        // const cache_check = this._cacheService.checkPaginatorOldCach(cache_main_key, 1, [], option, null, { sub_key: cache_sub_key });
        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);
        this._logger.log("cache_option:", cache_option);

        return this.spec08010101.getData(reqData).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
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




