/**
 * 現值查詢
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs/internal/Subject';
// -- library -- //
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
// -- api -- //
import { SPEC09020301ApiService } from '@api/spec09/spec09020301/spec09020301-api.service';
import { SPEC09020302ApiService } from '@api/spec09/spec09020302/spec09020302-api.service';
import { SPEC09020303ApiService } from '@api/spec09/spec09020303/spec09020303-api.service';

@Injectable()

export class AutoCompositToTimeModifyService {
    /**
     * 參數處理
     */
    private dateCheckList = {}; // 日期檢核設定
    private setCacheName = {
        'list': 'composit-deposit-agree', // 列表
    };

    expandSubject: Subject<any> = new Subject<any>();

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec09020301: SPEC09020301ApiService,
        private spec09020302: SPEC09020302ApiService,
        private spec09020303: SPEC09020303ApiService,
    ) {
    }

    /**
     * 控制展開收合事件 之後再刪除
     * @param checkFinish 
     */
    changeExpandSubject(checkFinish: boolean) {
        this.expandSubject.next(checkFinish);
    }

    /**
     * 刪除cache
     * @param type 指定刪除類別
     *  deposit-demand: 活存
     *  alldetail: 所有明細
     * @param acctObj 指定刪除明細
     *  iron 指定刪除單一明細
     */
    removeAllCache(type?: string, acctObj?: object) {
        if (typeof type == 'undefined') {
            type = this.setCacheName.list;
        }
        if (type === 'detail') {
            type = this.setCacheName.list + '@' + this._formateService.checkField(acctObj, 'iron');
        }
        this._cacheService.removeGroup(type);
    }

    /**
     * 取得自訂查詢區間資料
     * @param reqObj 請求資料
     * @param paginator 分頁物件
     * @param option 模式設定
     */
    getListData(reqData: object,  option?: object): Promise<any> {
        this._logger.step('Deposit', "into getList, reqData/paginator:", reqData);
        return this.spec09020301.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log('Deposit', "send api success, success:", sucessObj);
                // this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log('Deposit', "send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    getResultData(reqData: object,  option?: object): Promise<any> {
        this._logger.step('Deposit', "into getList, reqData/paginator:", reqData);
        return this.spec09020302.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log('Deposit', "send api success, success:", sucessObj);
                // this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log('Deposit', "send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    getResultLiftData(reqData: object,  option?: object): Promise<any> {
        this._logger.step('Deposit', "into getList, reqData/paginator:", reqData);
        return this.spec09020303.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log('Deposit', "send api success, success:", sucessObj);
                // this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log('Deposit', "send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 取得注意資訊
     */
    getNoteData() {
        let noteData = {
            title: 'POPUP.CANCEL_EDIT.TITLE',
            // content: 'POPUP.NOTE.FOREIGN_DATE'
            content: 'POPUP.NOTE.FOREIGN_DATE'
        };
        return noteData;
    }

    modifyReqData(reqData) {
        return reqData;
    }
    modifyReqLiftData(reqData) {
        return reqData;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------
    // =====================================================================API End
}




