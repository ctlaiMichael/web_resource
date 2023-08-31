/**
 * 已綁定裝置修改刪除Service
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { SPEC03030101ApiService } from '@api/spec03/spec03030101/spec03030101-api.service';
import { SPEC03020201ApiService } from '@api/spec03/spec03020201/spec03020201-api.service';
import { SPEC03020101ApiService } from '@api/spec03/spec03020101/spec03020101-api.service';
import { CacheService } from '@systems/system/cache/cache.service';

@Injectable()

export class DeviceListService {
    /**
     * 參數處理
     */

    constructor(
        private logger: Logger,
        private spec03030101: SPEC03030101ApiService,
        private spec03020201: SPEC03020201ApiService,
        private spec03020101: SPEC03020101ApiService,
        private _cacheService: CacheService
    ) {

    }

    /**
     * 已綁定裝置清單查詢
     * 發電文取得資料
     */
    public getData(option?: object): Promise<any> {
        const cache_key = 'bind-device-list';
        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        if (cache_data) {
            return Promise.resolve(cache_data);
        }

        return this.spec03030101.getData(option).then(
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
     * 新增裝置綁定
     * 發電文新增
     */
    public addData(reqData, option?: object): Promise<any> {
        // return this.spec10090201.addData(reqData, option).then(
        //     (successObj) => {
        //         return Promise.resolve(successObj);
        //     },
        //     (errObj) => {
        //         return Promise.reject(errObj);
        //     }
        // );
        return Promise.resolve();
    }

    /**
     * 修改裝置綁定
     * 發電文修改
     */
    public updateData(reqData, option?: object): Promise<any> {
        return this.spec03020201.updateData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    /**
     * 刪除裝置綁定
     * 發電文刪除
     */
    public deleteData(reqData, option?: object): Promise<any> {
        return this.spec03020101.deleteData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    /**
     * 檢核欄位
     */
    public checkData(data) {
        let output = {
            status: true,
            errMsgObj: {
                uuid: '',
                deviceName: '',
                platform: ''
            }
        };

        // 檢核裝置uuid
        if (!data.uuid) {
            output.status = false;
            output.errMsgObj.uuid = 'SETTING.FAST_SETTING.ERROR';
        }

        // 檢核裝置name
        if (!data.deviceName) {
            output.status = false;
            output.errMsgObj.deviceName = 'SETTING.FAST_SETTING.ERROR';
        }

        // 檢核裝置platform
        if (!data.platform) {
            output.status = false;
            output.errMsgObj.platform = 'SETTING.FAST_SETTING.ERROR';
        }

        return output;
    }

    /**
     * 清除設備綁定清單cache
     */
    public removeCache() {
        this._cacheService.remove('bind-device-list');
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}