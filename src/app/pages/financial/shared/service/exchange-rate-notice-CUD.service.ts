/**
 * 匯率到價通知新增、修改、刪除Service
 */
import { Injectable } from '@angular/core';
import { SPEC10090201ApiService } from '@api/spec10/spec10090201/spec10090201-api.service';

@Injectable()

export class ExchangeRateNoticeCUDService {
    /**
     * 參數處理
     */

    constructor(
        private spec10090201: SPEC10090201ApiService
    ) {

    }

    /**
     * 匯率到價通知新增
     * 發電文取得資料
     */
    public addData(reqData, option?: object): Promise<any> {
        return this.spec10090201.addData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    /**
     * 匯率到價通知修改
     * 發電文取得資料
     */
    public updateData(reqData, option?: object): Promise<any> {
        return this.spec10090201.updateData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    /**
     * 匯率到價通知刪除
     * 發電文取得資料
     */
    public deleteData(reqData, option?: object): Promise<any> {
        return this.spec10090201.deleteData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
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