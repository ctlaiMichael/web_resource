/**
 * 登入後首頁
 * [debug: Home]
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- library -- //
import { FormateService } from '@template/formate/formate.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { LOCAL_STORAGE_NAME_LIST } from '@conf/security/storage-name';
// -- api -- //
import { SPEC05010201ApiService } from '@api/spec05/spec05010201/spec05010201-api.service';

@Injectable()
export class UserHomeService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定
    private setCacheName = {
        'twd': 'overview-twd' // 列表
    };
    private acctShowStatusName = LOCAL_STORAGE_NAME_LIST.ACCT_SHOW_STATUS;

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,
        private _localStorage: LocalStorageService,
        private spec05010201: SPEC05010201ApiService
    ) {
    }

    /**
     * 台幣資產資料
     * @param option 
     */
    getTwdTotal(option?: object): Promise<any> {
        if (!option) {
            option = {
                background: true
            };
        }
        const cache_key = this.setCacheName.twd;
        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        return this.spec05010201.getData({}, option).then(
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

    /**
     * 資產是否隱藏判斷
     * @returns true 隱藏, false 顯示
     */
    getHiddenAcct(): boolean {
        let acctShowStatus: any = this._localStorage.getObj(this.acctShowStatusName);
        if (!acctShowStatus) {
            acctShowStatus = {};
        }
        let save_str = this._formateService.checkField(acctShowStatus, 'TWD');
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
        acctShowStatus['TWD'] = save_str;
        this._localStorage.setObj(set_name, acctShowStatus);
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------


}




