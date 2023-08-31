/**
 * 設備綁定Service
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { SPEC03010101ApiService } from '@api/spec03/spec03010101/spec03010101-api.service';

@Injectable()

export class DeviceBindService {
    /**
     * 參數處理
     */

    constructor(
        private logger: Logger,
        private spec03010101: SPEC03010101ApiService
    ) {

    }

    /**
     * 新增設備綁定
     * 發電文設定
     */
    public sendData(reqData, option?: object): Promise<any> {
        return this.spec03010101.sendData(reqData, option).then(
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
                deviceName: '',
                otpNumber: ''
            }
        };

        // 檢核裝置uuid
        // if (!data.uuid) {
        //     output.status = false;
        //     output.errMsgObj.uuid = 'SETTING.FAST_SETTING.ERROR';
        // }

        // 檢核裝置name
        if (!data.deviceName) {
            output.status = false;
            output.errMsgObj.deviceName = 'SETTING.FAST_SETTING.ERROR';
        }

        // 檢核裝置platform
        // if (!data.platform) {
        //     output.status = false;
        //     output.errMsgObj.platform = 'SETTING.FAST_SETTING.ERROR';
        // }

        // 檢核裝置綁定時間
        // if (!data.bindTime) {
        //     output.status = false;
        //     output.errMsgObj.bindTime = 'SETTING.FAST_SETTING.ERROR';
        // }

        // 檢核OTP驗證碼
        // if (!data.otpNumber) {
        //     output.status = false;
        //     output.errMsgObj.otpNumber = 'SETTING.FAST_SETTING.ERROR';
        // }

        return output;
    }

    public modifyReqData(reqData) {
        return reqData;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}