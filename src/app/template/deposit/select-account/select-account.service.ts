/**
 * 基金單筆申購
 * 
 * 
 * 
 *
 *
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC00040101ApiService } from '@api/spec00/spec00040101/spec00040101-api.service';
import { SPEC00040801ApiService } from '@api/spec00/spec00040801/spec00040801-api.service';
import { CheckService } from '@template/check/check.service';

@Injectable()

export class SelectAccountService {
    /**
     * 
     */

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _cacheService: CacheService,
        private _checkService: CheckService,
        private spec00040101: SPEC00040101ApiService,
        private spec00040801: SPEC00040801ApiService
    ) {
    }

    /**
     * 取得帳號資訊
     * @param reqData 
     */
    getAcctData(reqData?: object, type?: string, option?: object): Promise<any> {
        this._logger.log("into getAcctData, reqData:", reqData);
        // let token = this.getToken();
        // 紀錄cache
        let cache_main_key = 'select-account';
        let cache_sub_key = [type];
        // tslint:disable-next-line:radix
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'paginator': {
                pageNumber: 1
            },
            'option': option,
            'sub_key': cache_sub_key
        });
        // const cache_check = this._cacheService.checkPaginatorOldCach(cache_main_key, 1,
        //     [], option, null, { sub_key: cache_sub_key });
        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);
        // 發貸款特規 貸款帳戶
        if (type == 'loan') {
            this._logger.log("cache_option:", cache_option);
            this._logger.log("ready to send loan account api");
            // 2020/08/10 依照中台改為統一發同一支api
            return this.spec00040801.getData({}).then(
                (sucessObj) => {
                    this._logger.log("send 00040801 api success, success:", sucessObj);
                    this._cacheService.save(cache_key, sucessObj, cache_option);
                    return Promise.resolve(sucessObj);
                },
                (failedObj) => {
                    this._logger.log("send 00040801 api failed, failed:", failedObj);
                    return Promise.reject(failedObj);
                }
            );
            // 其餘情況都發 帳號查詢 
        } else {
            this._logger.log("ready to send nornal account api");
            return this.spec00040101.getData({}).then(
                (sucessObj) => {
                    this._logger.log("send 00040101 api success, success:", sucessObj);
                    this._cacheService.save(cache_key, sucessObj, cache_option);
                    return Promise.resolve(sucessObj);
                },
                (failedObj) => {
                    this._logger.log("send 00040101 api failed, failed:", failedObj);
                    return Promise.reject(failedObj);
                }
            );
        }
    }

    /**
     * 設定預設帳號資訊
     * @param setData 
     * @param defaultObj 
     * @param checkCurrency 是否比對幣別, true要比對, 貸款不比對
     */
    setDefaultInfo(setData, defaultObj, checkCurrency?: boolean) {
        this._logger.log("into setDefaultInfo, setData:", setData);
        this._logger.log("into setDefaultInfo, defaultObj:", defaultObj);
        let output = {
            accountId: '',
            currencyCode: ''
        };
        let defaultAcct = this._formateService.checkField(defaultObj, 'account');
        let defaultCcy = this._formateService.checkField(defaultObj, 'currencyCode');
        let i: any;
        for (i in setData) {
            if (typeof setData[i] == 'undefined') {
                continue;
            }
            let item = setData[i];
            if (item['accountId'] == defaultAcct) {
                if (!!checkCurrency && item['currencyCode'] == defaultCcy) {
                    output.accountId = item['accountId'];
                    output.currencyCode = item['currencyCode'];
                    break;
                } else if (!checkCurrency) {
                    output.accountId = item['accountId'];
                    output.currencyCode = item['currencyCode'];
                    break;
                } else {
                    // 繼續跑迴圈
                }
            }
        }

        // 防呆 起碼回傳進來的帳號
        if (!this._checkService.checkEmpty(output.accountId, true)) {
            output.accountId = defaultAcct;
        }
        this._logger.log("into setDefaultInfo, output:", output);
        return output;
    }

    getDefaultAcct(defaultAcct) {
        let output = {
            account: '',
            currencyCode: ''
        };
        if (this._checkService.checkEmpty(defaultAcct, true)) {
            if (typeof defaultAcct == 'object') {
                output.account = this._formateService.checkField(defaultAcct, 'account');
                output.currencyCode = this._formateService.checkField(defaultAcct, 'currencyCode');
            } else {
                output.account = defaultAcct;
                output.currencyCode = '';
            }
        }
        return output;
    }

    /**
     * 負責找出第一筆參數
     * @param list 資料
     */
    getFirstData(list: Array<any>) {
        let output: any;
        if ((list instanceof Array) && list.length > 0 && !!list[0]) {
            output = list[0];
        }
        return output;
    }
}
