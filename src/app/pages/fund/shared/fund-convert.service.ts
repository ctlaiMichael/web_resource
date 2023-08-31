/**
 * 基金贖回
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { Subject } from 'rxjs/internal/Subject';
// -- library -- //
import { CacheService } from '@systems/system/cache/cache.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { TranslateService } from '@ngx-translate/core';
import { SPEC11030101ApiService } from '@api/spec11/spec11030101/spec11030101-api.service';
// -- api -- //

@Injectable()

export class FundConvertService {
    /**
     * 參數處理
     */
    private setCacheName = {
        // 基金贖回扣款帳號
        account: ''
    };

    expandSubject: Subject<any> = new Subject<any>();

    constructor(
        private _logger: Logger,
        private _cacheService: CacheService,
        private spec11030101: SPEC11030101ApiService,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private translate: TranslateService
    ) {
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
            type = 'redeem-edit';
        }
        this._cacheService.removeGroup(type);
    }

    // 取得 基金轉換編輯
    getEditData(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getEditTwd, reqData:", reqData);
        return this.spec11030101.getData(reqData).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    // 檢核畫面資料
    checkData(req) {
        // let output = {
        //     status: false,
        //     msg: 'CHECK.DEFAULT_MSG', // 後補i18n
        //     data: {
        //         accountID: '' // 基金帳號 
        //     },
        //     error_data: [],
        //     error_list: {
        //         accountID: '' // 基金帳號
        //     }
        // };
        // // 基金帳號
        // let account_msg = '';
        // output.data.accountID = this._formateService.checkField(req, 'accountID');
        // let check_account = this._checkService.checkEmpty(req.accountID);
        // if (check_account.status == false) {
        //     account_msg = check_account.msg;
        //     output.error_list.accountID = account_msg;
        //     output.error_data.push(output.error_list.accountID);
        // }

        // // 若無錯誤
        // if (output.error_data.length == 0) {
        //     output.status = true;
        //     output.msg = '';
        // }
        // return output;
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




