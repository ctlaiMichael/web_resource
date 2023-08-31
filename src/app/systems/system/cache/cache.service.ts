/**
 * Cache 暫存
 */
import { Injectable } from '@angular/core';
import { CacheData } from './cache-data';
import { CacheCheckData } from './cache-check-data';
import { CACHE_SET } from '@conf/cache_set';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { Logger } from '@systems/system/logger/logger.service';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { FieldUtil } from '@util/formate/modify/field-util';
import { PAGE_SETTING } from '@conf/page';


@Injectable({
  // 全ＡＰＰ只有一個
  providedIn: 'root'
})
export class CacheService {
  cache = {};
  constructor(
    private _logger: Logger
  ) {
  }

  /**
   * 檢查資料有效
   * @param key key值
   */
  public checkUpdate(key: string) {
    let data = this.load(key);
    return !!data;
  }

  /**
   * 將資料儲入Cache
   * @param key key值
   * @param value 資料內容
   * @param option 選項
   */
  public save(key: string, value: any, option?: CacheData) {
    const defaultOption = new CacheData();
    const data = { ...defaultOption, ...option };
    data.value = ObjectUtil.clone(value);
    const nowTime = this.now();
    data.dataTime = nowTime;

    if (!!data.ttl) {
      // 設定有效時間
      data.effectTime = nowTime + (data.ttl * 60000);
    }
    if ((data.updateTimeList instanceof Array) && data.updateTimeList.length > 0 ) {
      // 設定下次更新時間
      let i;
      data.updateTimeList = data.updateTimeList.sort();
      for (i = 0; i < data.updateTimeList.length; i++) {
        if (typeof data.updateTimeList[i] != 'string' || !data.updateTimeList[i]) {
          continue;
        }
        let updateTime = this.getUpdateTime(data.updateTimeList[i]);
        if (data.dataTime < updateTime) { // 如果資料時間小於列表上第N個更新時間
          data.nextUpdateTime = updateTime; // 下次更新時間等於第N個更新時間
          break;
        }
      }
      // 如果資料時間大於列表上全部時間，下次更新時間加一天(隔天)
      if (!data.nextUpdateTime) {
        // 第一個更新時間
        let updateTime = this.getUpdateTime(data.updateTimeList[0]);
        // 加一天(隔天)的第一個更新時間
        if (updateTime > 0) {
          data.nextUpdateTime = updateTime + 86400000;
        }
      }
    }
    return this.set(key, data);
  }

  /**
   * 載入Cache中的資料
   * @param key key值
   */
  public load(key: string): any {
    const data = this.get(key, false);
    if (!data) { return data; }
    const nowTime = this.now();

    // 超過有效時間刪除
    if (!!data.effectTime && nowTime > data.effectTime) {
      this.remove(key);
      return null;
    }

    // 超過下次更新時間刪除
    if (!!data.nextUpdateTime && nowTime > data.nextUpdateTime) {
      this.remove(key);
      return null;
    }
    return ObjectUtil.clone(data.value);
  }

  /**
   * 刪除key值
   * @param key key值
   */
  public remove(key: string) {
    if (this.cache.hasOwnProperty(key)) {
      this._logger.step('Cache', 'remove', key);
      delete this.cache[key];
    }
  }

  /**
   * 刪除指定group list
   * @param group group list
   */
  public removeGroup(group: string) {
    this._logger.step('Cache', 'remove group', group);
    // tslint:disable-next-line:forin
    for (let key in this.cache) {
      const data = this.get(key, true);
      if (data && data.groupList.indexOf(group) > -1) {
        this.remove(key);
      }
    }
  }

  /**
   * 清除chche
   * @param type 類型 login(只刪除登入資訊)/ keepAlways(保留always保留) /all(全刪)/ langChangeRemove(語言轉換時刪除)
   */
  public clear(type = 'login') {
    this._logger.step('Cache', 'remove clear', type);
    if (type === 'login') {
      // tslint:disable-next-line:forin
      for (let key in this.cache) {
        const data = this.get(key, true);
        if (data && data.keepAlive === 'login') {
          this.remove(key);
        }
      }
    } else if (type === 'keepAlways') {
      // tslint:disable-next-line:forin
      for (let key in this.cache) {
        const data = this.get(key, true);
        this._logger.log('data:', data);
        if (data && data.keepAlive != 'always') {
          this._logger.log('remove:' + key);
          this.remove(key);
        }
      }
    } else if (type === 'langChangeRemove') {
      let tmp_key: any;
      for (tmp_key in this.cache) {
        if (!this.cache.hasOwnProperty(tmp_key)) {
          continue;
        }
        const data = this.get(tmp_key, true);
        this._logger.log('data:', data);
        if (data && data.langChangeRemove == 'remove') {
          this._logger.log('remove:' + tmp_key);
          this.remove(tmp_key);
        }
      }
    } else if (type === 'all') {
      this.cache = {};
    }
  }

  /**
   * 取得cache設定值
   * @param key cache key
   */
  public getCacheSet(key: string): CacheData {
    let output = new CacheData();
    let key_list = key.split('@');
    let set_key = (typeof key_list[0] !== 'undefined') ? key_list[0] : key;

    if (!CACHE_SET.hasOwnProperty(set_key)) {
      return output;
    }
    const key_obj = ObjectUtil.clone(CACHE_SET[set_key]);
    output = { ...output, ...key_obj };

    return output;
  }

  /**
   * Cache設定檔取得 
   * (請統一透過checkCacheData取資料!)
   * @param option 請參考CacheCheckData
   */
  private checkCacheSet(option): CacheCheckData {
    let output = new CacheCheckData();
    output = { ...output, ...option };
    return output;
  }

  /**
   * 檢查是否有cache存在
   */
  checkCacheData(cache_key, option?: object) {
    let output: any;
    const cache_check = this.checkCacheSet(option);

    if (!cache_check.reget) {
      // 背景取得，首頁請求，取cache
      output = this.load(cache_key);
    } else {
      // 強制清除cache (取得最新的)
      this.remove(cache_key);
    }
    return output;
  }

  
  /**
   * 分頁常用cache處理
   * @param main_cache_key 主要cache key
   * @param other_set 其他參數
   *    option 設定(API)
   *    paginator 分頁設定
   *    sub_key 子參數
   */
  getPaginatorCache(main_cache_key: string, other_set?: object) {
    let output = {
      status: false,
      data: null,
      background: false,
      reget: false,
      cache_key: ''
    };
    
    let option: any = {};
    let sub_key: any;
    let paginator: any = {};
    let page: any;
    let pageSize: any;
    let sortColName: any;
    let sortDirection: any;
    if (!!other_set) {
      paginator = this.setPageReq(ObjectCheckUtil.checkObjectList(other_set, 'paginator'));
      option = ObjectCheckUtil.checkObjectList(other_set, 'option');
      sub_key = ObjectCheckUtil.checkObjectList(other_set, 'sub_key');
    }
    if (!!paginator) {
      page = ObjectCheckUtil.checkObjectList(paginator, 'pageNumber');
      pageSize = ObjectCheckUtil.checkObjectList(paginator, 'pageSize');
      sortColName = FieldUtil.checkField(paginator, 'sortColName');
      sortDirection = FieldUtil.checkField(paginator, 'sortDirection');
    }

    if (typeof page === 'undefined' || (!page && page != 0)) {
        page = 1;
    }
    let sug_cache_key = [];
    sug_cache_key.push(page.toString());
    let hasSize = false;
    if (typeof pageSize !== 'undefined' && !!pageSize) {
        hasSize = true;
        sug_cache_key.push(pageSize.toString());
    }
    if (typeof sortColName !== 'undefined' && !!sortColName) {
      sug_cache_key.push(sortColName.toString());
    }
    if (typeof sortDirection !== 'undefined' && !!sortDirection) {
      sug_cache_key.push(sortDirection.toString());
    }

    if (!!sub_key) {
      if (typeof sub_key === 'string' || typeof sub_key === 'number') {
        sug_cache_key.push(sub_key.toString());
      } else if (sub_key instanceof Array) {
        sug_cache_key.push(sub_key.join('_'));
      }
    }
    const cache_key = main_cache_key + '@' + sug_cache_key.join('_');
    const cache_check = this.checkCacheSet(option);
    if (!cache_check.reget) {
        // 背景取得，首頁請求，取cache
        const cache_data = this.load(cache_key);
        if (cache_data) {
            output.data = cache_data;
            output.status = true;
        }
    } else {
        if (hasSize) {
            this.remove(cache_key);
        } else {
            this.removeGroup(main_cache_key);
        }
    }

    output.reget = cache_check.reget;
    output.background = cache_check.background;
    output.cache_key = cache_key;
    return output;
  }


  // /**
  //  * 分頁常用cache處理 (old)
  //  * @param main_cache_key 主要cache key
  //  * @param page 頁數
  //  * @param sort 排序 目前無作用
  //  * @param option 設定
  //  * @param pageSize 一頁數量
  //  * @param other_set 其他參數
  //  */
  // // tslint:disable-next-line:max-line-length
  // public checkPaginatorCach(main_cache_key: string, page?: number, sort?: Array<any>, option?: object, pageSize?: string | number, other_set?: object) {
  //   let output = {
  //     status: false,
  //     data: null,
  //     background: false,
  //     reget: false,
  //     cache_key: ''
  //   };
  //   this._logger.error('!!!!!!!!!!!!!!!!checkPaginatorCach 廢除!!!請換getPaginatorCach');

  //   // if (typeof page === 'undefined' || (!page && page != 0)) {
  //   //     page = 1;
  //   // }
  //   // let sug_cache_key = [];
  //   // sug_cache_key.push(page.toString());
  //   // let hasSize = false;
  //   // if (typeof pageSize !== 'undefined' && !!pageSize) {
  //   //     hasSize = true;
  //   //     sug_cache_key.push(pageSize.toString());
  //   // }
  //   // if (!!other_set) {
  //   //   if (other_set.hasOwnProperty('sub_key') && !!other_set['sub_key']) {
  //   //     if (typeof other_set['sub_key'] === 'string' || typeof other_set['sub_key'] === 'number') {
  //   //       sug_cache_key.push(other_set['sub_key'].toString());
  //   //     } else if (other_set['sub_key'] instanceof Array) {
  //   //       sug_cache_key.push(other_set['sub_key'].join('_'));
  //   //     }
  //   //   }
  //   // }
  //   // const cache_key = main_cache_key + '@' + sug_cache_key.join('_');
  //   // const cache_check = this.checkCacheSet(option);
  //   // if (!cache_check.reget) {
  //   //     // 背景取得，首頁請求，取cache
  //   //     const cache_data = this.load(cache_key);
  //   //     if (cache_data) {
  //   //         output.data = cache_data;
  //   //         output.status = true;
  //   //     }
  //   // } else {
  //   //     if (hasSize) {
  //   //         this.remove(cache_key);
  //   //     } else {
  //   //         this.removeGroup(main_cache_key);
  //   //     }
  //   // }

  //   // output.reget = cache_check.reget;
  //   // output.background = cache_check.background;
  //   // output.cache_key = cache_key;
  //   return output;
  // }


  // --------------------------------------------------------------------------------------------
  //  ____       _            _         _____                 _
  //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
  //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
  //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
  //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
  // --------------------------------------------------------------------------------------------


  /**
   * 儲存
   * @param key key值
   * @param value 資料
   */
  private set(key: string, data: CacheData) {
    this._logger.step('Cache', 'save', key, data);
    this.cache[key] = data;
  }

  /**
   * 取得資料
   * @param key key值
   * @param isCheck 是否本程式取資料使用(不console)
   */
  private get(key: string, isCheck?: boolean): CacheData {
    if (this.cache.hasOwnProperty(key)) {
      if (!isCheck) {
        this._logger.step('Cache', 'get', key, this.cache[key]);
      }
      return ObjectUtil.clone(this.cache[key]);
    } else {
      if (!isCheck) {
        this._logger.step('Cache', 'get', key, 'error(undefined)');
      }
      return undefined;
    }
  }

  /**
   * 計算時間
   * @param time 
   */
  private getUpdateTime(time: string) {
    const todaydate = new Date().toLocaleDateString();
    const data_time = new Date(todaydate + ' ' + time).getTime();
    if (!data_time) {
      return 0;
    } else {
      return data_time;
    }
  }

  /**
   * 
   */
  private now() {
    return new Date().getTime();
  }


  
  /**
   * 分頁物件設定
   * pageSize: 1 第一頁
   *           2~N 第2~n頁
   */
  private setPageReq(data: object) {
    let output = {
      pageSize: 0,
      pageNumber: 0,
      sortColName: '',
      sortDirection: ''
    };
    if (!data) {
      return output;
    }
    // tslint:disable-next-line:radix
    let page = parseInt(FieldUtil.checkField(data, 'pageNumber'));
    if (!page || page <= 0) {
        page = 1;
    }
    // tslint:disable-next-line:radix
    let page_size = parseInt(FieldUtil.checkField(data, 'pageSize'));
    if (!page_size || page_size <= 0) {
        page_size = PAGE_SETTING.PAGE_SIZE;
    }

    let sort = FieldUtil.checkField(data, 'sortColName');
    let sortDirection = FieldUtil.checkField(data, 'sortDirection');
    sortDirection = (sortDirection.toUpperCase() === 'DESC') ? 'DESC' : 'ASC';


    output['pageSize'] = page_size;
    output['pageNumber'] = page;
    output['sortColName'] = sort;
    output['sortDirection'] = sortDirection;
    // logger.error("pageCheck", data, JSON.parse(JSON.stringify(output)));
    return output;
  }

}
