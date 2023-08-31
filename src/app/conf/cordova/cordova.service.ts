/**
 * Cordova Service 父類別
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { logger } from '@util/log-util';
import { ErrorObjectOption } from '@systems/handle-error/error-object-option';

@Injectable()
export class CordovaService {
    protected _setErrorObject = new ErrorObjectOption(); // 設定error obj
    private deviceReadyFlag: boolean;

    constructor(
    ) {
    }

    /**
     * 檢核device是否已ready
     * Promise Object, now Promise method
     * this.onDeviceReady.then();
     * do not use this.onDeviceReady().then() !!!!!
     */
    protected onDeviceReady = new Promise<any>((resolve, reject) => {
        let doDeviceReadyMeth = (set_obj?: any) => {
            logger.step('LoadApp', 'device cready in CordovaService:', this.constructor.name, set_obj);
            this.deviceReadyFlag = true;
            resolve();
        };
        if (this.deviceReadyFlag) {
            resolve();
        } else {
            if (environment.NATIVE) {
                document.addEventListener('deviceready', doDeviceReadyMeth, false);
            } else {
                doDeviceReadyMeth('simulation');
            }
        }
    });

}
