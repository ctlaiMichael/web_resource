/**
 * 檢查設備綁定Service
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { SPEC03040101ApiService } from '@api/spec03/spec03040101/spec03040101-api.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { DeviceListService } from '@pages/setting/shared/service/device-list.service';
import { BiometricInterfaceService } from '@lib/biometric/biometric-interface.service';
import { DeviceService } from '@lib/device/device.service';

@Injectable()

export class CheckDeviceBindService {
    /**
     * 參數處理
     */

    constructor(
        private logger: Logger,
        private spec03040101: SPEC03040101ApiService,
        private localStorageService: LocalStorageService,
        private deviceListService: DeviceListService,
        private bioService: BiometricInterfaceService,
        private device: DeviceService
    ) {

    }

    /**
     * 檢查設備綁定
     * 發電文設定
     */
    public checkBind(reqData, option?: object): Promise<any> {
        return this.spec03040101.sendData(reqData, option).then(
            (successObj) => {
                return Promise.resolve(successObj);
            },
            (errObj) => {
                return Promise.reject(errObj);
            }
        );
    }

    /**
     * 解除設備綁定
     * 發電文設定
     */
    public unBind() {
        // 註銷原有生物辨識
        this.bioService.disableBioService().then(
            (disableRes) => {
            },
            (disableErr) => {
            }
        );

        let uuid = this.device.getDevicesInfo('uuid');

        let outputData = {
            'uuid': uuid,
            'type': '2'
        };
        // 發解除綁定電文請中台解除綁定
        this.deviceListService.deleteData(outputData, { background: true }).then(
            (resObj) => {
                
            },
            (errObj) => {
                
            }
        );
    }

    /**
     * 儲存設備綁定資訊
     */
    public saveLocalBindData(data) {
        this.localStorageService.setObj('fastData', data);
    }

    /**
     * 取得設備綁定資訊
     */
    public getLocalBindData() {
        let fastData = this.localStorageService.getObj('fastData');
        return fastData;
    }

    /**
     * 刪除設備綁定資訊
     */
    public clearLocalBindData() {
        this.localStorageService.remove('fastData');
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}