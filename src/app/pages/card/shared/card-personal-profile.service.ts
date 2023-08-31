/**
 * 信卡現況查詢
 */
import { Injectable } from "@angular/core";
import { Logger } from '@systems/system/logger/logger.service';
import { SPEC12010101ApiService } from '@api/spec12/spec12010101/spec12010101-api.service';

@Injectable()

export class CardPersonalProfileService {
    /**
     * 參數處理
     */

    constructor(
        private _logger: Logger,
        private spec12010101: SPEC12010101ApiService
    ) { }

    /**
     *  信用卡現況查詢
     */
    getCardProfile(reqData?, option?: object): Promise<any> {
        return this.spec12010101.getData(reqData,option).then(
            (sucessObj) => {
                this._logger.log("getCardProfile, sucessObj:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("getCardProfile, failedObj:", failedObj);
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