/**
 * 信卡紅利點數查詢
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { SPEC12020201ApiService } from '@api/spec12/spec12020201/spec12020201-api.service';

@Injectable()

export class BonusConvertHistoryService {
    /**
     * 參數處理
     */

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec12020201: SPEC12020201ApiService
    ) {
    }

    /**
     * 紅利點數查詢
     */
    getBonusCount(reqData?, option?: object): Promise<any> {
        return this.spec12020201.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("getBonusCount, sucessObj:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("getBonusCount, failedObj:", failedObj);
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