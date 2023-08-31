/**
 * 台幣轉入帳號,常用帳號popup
 */
import { Injectable, Component, ComponentRef } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC09000303ApiService } from '@api/spec09/spec09000303/spec09000303-api.service';
import { SPEC09000304ApiService } from '@api/spec09/spec09000304/spec09000304-api.service';


@Injectable()
export class TwdTrainInPopupService {

  constructor(
    private _logger: Logger,
    // private _formateService: FormateService,
    private _cacheService: CacheService,
    private spec09000303: SPEC09000303ApiService, // 約定轉入帳號
    private spec09000304: SPEC09000304ApiService // 常用帳號
  ) {
  }

  // 約定轉入, 常用帳號
  private setCacheTransData = {
    'tranInt': 'twd-transint-agreed', // 約定轉入
    'offen': 'twd-transint-offen' // 常用帳號
  };

  /**
   * 刪除全部台幣轉出帳號
   */
  // removeAllCache() {
  //   let type = 'twd-transout';
  //   this._cacheService.removeGroup(type);
  // }

  /**
   * 發送 約定轉出帳號
   */
  getTranInData(option?: object): Promise<any> {
    // 紀錄cache
    let cache_main_key = this.setCacheTransData.tranInt;
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
    //   [], {}, null, { sub_key: cache_sub_key });
    const cache_key = cache_check.cache_key;
    if (cache_check.status) {
      return Promise.resolve(cache_check.data);
    }
    let cache_option = this._cacheService.getCacheSet(cache_key);
    cache_option.groupList.push(cache_main_key);

    return this.spec09000303.getData({}, option).then(
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
   * 發送 常用帳號
   */
  getOffenData(option?: object): Promise<any> {
    // 紀錄cache
    let cache_main_key = this.setCacheTransData.offen;
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
    //   [], {}, null, { sub_key: cache_sub_key });
    const cache_key = cache_check.cache_key;
    if (cache_check.status) {
      return Promise.resolve(cache_check.data);
    }
    let cache_option = this._cacheService.getCacheSet(cache_key);
    cache_option.groupList.push(cache_main_key);

    return this.spec09000304.getData({}, option).then(
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
