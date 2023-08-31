/**
 * 查詢非約定轉出帳號
 * 
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC09000302ApiService } from '@api/spec09/spec09000302/spec09000302-api.service';
import { SPEC09000301ApiService } from '@api/spec09/spec09000301/spec09000301-api.service';
import { promise } from 'protractor';
import { AccountMaskUtil } from '@util/formate/mask/account-mask-util';

@Injectable()

export class TwdTransOutService {
    /**
     * 
     */

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,
        private spec09000302: SPEC09000302ApiService,
        private spec09000301: SPEC09000301ApiService
    ) {
    }

    // 非約定
    private setCacheNotTwdTransout = {
        'list': 'twd-transout-not'
    };

    // 約定
    private setCacheTwdTransout = {
        'list': 'twd-transout-agreed'
    };

    /**
     * 刪除全部台幣轉出帳號
     */
    removeAllCache() {
        let type = 'twd-transfer';
        this._cacheService.removeGroup(type);
    }

    /**
     * 發送 非約定轉出帳號
     */
    getNotTwdTransout(option?: object): Promise<any> {
        // 紀錄cache
        let cache_main_key = this.setCacheNotTwdTransout.list;
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

        return this.spec09000302.getData({}, option).then(
            (sucessObj) => {
                this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 發送 約定轉出帳號
     */
    getTwdTransout(option?: object): Promise<any> {
        // 紀錄cache
        let cache_main_key = this.setCacheTwdTransout.list;
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

        return this.spec09000301.getData({}, option).then(
            (sucessObj) => {
                this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                return Promise.reject(failedObj);
            }
        );
    }


    /**
     * 預設轉出帳號
     * @param type 類別：非約轉notAgreed ,約定agreement
     */
    async getTransOutDefault(type: string): Promise<any> {
        this._logger.log("into getTransOutDefault, type:", type);
        let output = {
            status: false,
            msg: '',
            data: [],
            defaultAcct: '', // 預設帳號(第0筆)
            defaultAmount: '' // 預設餘額(第0筆)
        };
        try {
            let toList: any;
            if (type == 'agreement') {
                // 約轉
                toList = await this.getTwdTransout();
            } else {
                toList = await this.getNotTwdTransout();
            }
            if (toList.hasOwnProperty('transOutAcctData') && toList.transOutAcctData.length != 0) {
                output.data = toList['transOutAcctData'];
                let first = toList['transOutAcctData'][0];
                output.defaultAcct = first['accountId'];
                output.defaultAmount = first['avlAmount'];
            }
            return output;
        } catch (errorObj) {
            this._logger.log("into errorObj:", errorObj);
            return Promise.reject(errorObj);
        }
    }

    /**
     * 切換轉出帳號
     * @param accountObj 以選擇之帳號物件
     * @param type 類別：約轉 'agreement',非約 'notAgreed'
     */
    async checkTransOut(accountObj: object, type: string): Promise<any> {
        this._logger.log("into checkTransOut, accountObj:", accountObj);
        let output = {
            data: {}, // 相同的那筆資料
            list: [],
            status: true
        };
        let toList: any;
        try {
            if (type == 'agreement') {
                // 約轉
                let twdTranOut = await this.getTwdTransout();
                toList = twdTranOut['transOutAcctData'];
            } else {
                let twdNotTranOut = await this.getNotTwdTransout();
                toList = twdNotTranOut['transOutAcctData'];
            }
            this._logger.log("toList:", toList);
            if (typeof toList == 'undefined') {
                output.status = false;
                return Promise.resolve(output);
            }
            let account = this._formateService.checkField(accountObj, 'accountId');
            let showAcct = AccountMaskUtil.accountNoFormate(account); // 畫面上轉出帳號(去除前兩位00)
            // list
            toList.forEach(item => {
                let accountId = this._formateService.checkField(item, 'accountId');
                let itemAcct = AccountMaskUtil.accountNoFormate(accountId); // 每一筆轉出帳號(去除前兩位00)
                this._logger.log("itemAcct:", itemAcct);
                this._logger.log("showAcct:", showAcct);
                if (itemAcct == showAcct) {
                    this._logger.log("accountId same, item:", item);
                    output.data = item;
                    output.list.push(item);
                }
            });
            this._logger.log("checkTransOut, output:", output);
            return Promise.resolve(output);
        } catch (errorObj) {
            this._logger.log("into checkTransOut, errorObj");
            output.status = false;
            return Promise.resolve(output);
        }


    }

}
