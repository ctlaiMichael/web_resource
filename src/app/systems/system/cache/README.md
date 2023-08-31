# Template說明: Cache
## 目的
暫存機制處理說明


## 參數設定
### options
請參考cache_set.ts、cache-data.ts定義




## 基本module引用
    N/A
    全域共用，一個APP只能引用一次


## html
N/A


## component
N/A

以service 使用為準

## service

    import { CacheService } from '@systems/system/cache/cache.service';

    constructor(
        private cacheService: CacheService,
    ) {

    }

## 範例

### 刪除指定群組

    this.cacheService.removeGroup('cache_set.ts的key');

    /**
     * 刪除cache
     * deposit-tw: 台幣存款查詢
     * deposit-tw-demand: 存款查詢-活存明細
     * deposit-tw-time: 存款查詢-定存明細
     * deposit-tw-demand@帳號: 刪除帳號資料
     */
    removeAllCache(type?: string, acctObj?: object) {
        if (typeof type == 'undefined') {
            type = 'deposit-tw';
        }
        if (type === 'alldetail') {
            type = 'deposit-tw-demand@' + this._formateService.checkField(acctObj, 'acctNo');
        }
        this._cacheService.removeGroup(type);
    }


### 一般暫存資料範例

    const cache_key = 'user-home-deposit';
    const cache_data = this._cacheService.checkCacheData(cache_key, option);
    if (cache_data) {
        return Promise.resolve(cache_data);
    }

    return this.scsb10010101.getData(reqObj).then(
        (jsonObj) => {
            let cache_option = this._cacheService.getCacheSet(cache_key);
            cache_option.groupList.push(cache_group);
            this._cacheService.save(cache_key, jsonObj, cache_option);
            return Promise.resolve(jsonObj);
        },
        (errorObj) => {
            return Promise.reject(errorObj);
        }
    );


### 查詢條件暫存資料範例(建議使用getPaginatorCache)

    getDetailData(reqObj: object, option?: Object): Promise<any> {
        const cache_group = 'deposit-tw-demand@' + this._formateService.checkField(reqObj, 'acctNo');
        const cache_key = cache_group + '@summary-pb';
        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        if (cache_data) {
            return Promise.resolve(cache_data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_group);

        return this.scsb10010101.getData(reqObj).then(
            (jsonObj) => {
                this._cacheService.save(cache_key, jsonObj, cache_option);
                return Promise.resolve(jsonObj);
            },
            (errorObj) => {
                return Promise.reject(errorObj);
            }
        );
    }


### 無分頁區間查詢暫存資料範例


    getDetailData(reqObj: object, option?: Object): Promise<any> {
        // 日期檢核: 
        let check_id = this._formateService.checkField(reqObj, 'id');
        let start_date = this._formateService.checkField(reqObj, 'startDate');
        let end_date = this._formateService.checkField(reqObj, 'endDate');
        if (check_id === '') {
            return Promise.reject({
                title: 'ERROR.TITLE',
                content: 'ERROR.DATA_FORMAT_ERROR'
            });
        }
        let check_date = this.getDateSet(check_id);
        let check_data = this._checkService.checkDateRange([start_date, end_date], check_date);
        if (!check_data.status) {
            return Promise.reject({
                title: 'ERROR.TITLE',
                content: check_data.errorMsg.join('')
            });
        }

        // cache data get
        const acctNo = this._formateService.checkField(reqObj, 'acctNo');
        let cache_main_key = 'deposit-tw-demand@' + acctNo;
        let cache_sub_key = [start_date, end_date];
        
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'paginator': {
                pageNumber: 1
            },
            'option': option,
            'sub_key': cache_sub_key
        });
        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);

        return this.scsb10010101.getData(reqObj).then(
            (jsonObj) => {
                this._cacheService.save(cache_key, jsonObj, cache_option);
                return Promise.resolve(jsonObj);
            },
            (errorObj) => {
                return Promise.reject(errorObj);
            }
        );
    }


### 有分頁區間查詢暫存資料範例


    /**
     * 取得自訂查詢區間資料
     * @param reqObj
     * @param page
     */
    getDetailData(reqObj: object, page, option?: Object, pageSize?: string | number): Promise<any> {
        // 日期檢核: 
        let check_id = this._formateService.checkField(reqObj, 'id');
        let start_date = this._formateService.checkField(reqObj, 'startDate');
        let end_date = this._formateService.checkField(reqObj, 'endDate');
        if (check_id === '') {
            return Promise.reject({
                title: 'ERROR.TITLE',
                content: 'ERROR.DATA_FORMAT_ERROR'
            });
        }
        let check_date = this.getDateSet(check_id);
        let check_data = this._checkService.checkDateRange([start_date, end_date], check_date);
        if (!check_data.status) {
            return Promise.reject({
                title: 'ERROR.TITLE',
                content: check_data.errorMsg.join('')
            });
        }

        // cache data get
        const acctNo = this._formateService.checkField(reqObj, 'acctNo');
        let cache_main_key = 'deposit-tw-demand@' + acctNo;
        let cache_sub_key = [start_date, end_date];
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            // 'paginator': paginator,
            'paginator': {
                pageSize: 200,
                pageNumber: 1,
                sortColName: '',
                sortDirection: 'DESC'
            },
            'option': option,
            'sub_key': cache_sub_key
        });

        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);

        return this.scsb10010101.getData(reqObj, page, [], pageSize).then(
            (jsonObj) => {
                this._cacheService.save(cache_key, jsonObj, cache_option);
                return Promise.resolve(jsonObj);
            },
            (errorObj) => {
                return Promise.reject(errorObj);
            }
        );
    }

