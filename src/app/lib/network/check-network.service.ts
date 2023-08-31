/**
 * 通訊狀態檢核
 * (Client)
 *  [plugin]: cordova-plugin-network-information
 *  [version]: 2.0.2
 * 
 * (Server) - Hitrust.verifyServer Plugin
 *  [plugin]: 
 *  [version]: 
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
// -- Other Library -- //
import { CordovaService } from '@conf/cordova/cordova.service';
import { FormateService } from '@template/formate/formate.service';
import { VERIFY_CERTS_INFO } from '@conf/security/verify-cert-info';

declare var navigator: any;
declare var plugin: any;

@Injectable()
export class CheckNetworkService extends CordovaService {

    constructor(
        private _logger: Logger,
        private _formateService: FormateService
    ) {
        super();
    }

    /**
     * Client 通訊檢核
     * @returns Promise object
     *  status: true 有連線, false 連線異常
     *  type: 連線類型(string)
     *  error: 錯誤物件(object)
     */
    checkClient(): Promise<object> {
        return this.getClientNetworkInfo().then(
            (network_obj) => {
                const networkState = this._formateService.checkObjectList(network_obj, 'type');
                let returnInfo = '';
                if (typeof networkState == 'string') {
                    returnInfo = networkState.replace('Connection.', '').toUpperCase();
                }
                let status = false;
                if (!!returnInfo && returnInfo != '' && returnInfo !== 'NONE') {
                    status = true;
                }
                let output = {
                    'status': status,
                    'type': returnInfo,
                    'error': {},
                    'data': network_obj
                };
                if (status) {
                    return Promise.resolve(output);
                } else {
                    return Promise.reject(output);
                }
            },
            (errorObj) => {
                return Promise.reject({
                    'status': false,
                    'type': '',
                    'error': errorObj,
                    'data': {}
                });
            }
        ).catch((rejectObj) => {
            let network_client_error = this._setErrorObject.returnError(rejectObj, 'NETWORK_CLIENT');
            return Promise.reject(network_client_error);
        });
    }

    /**
     * 取得Client 網路狀態資訊
     * @returns object 自plugin取得的client network object
     */
    getClientNetworkInfo(): Promise<any> {
        return this.onDeviceReady
            .then(() => new Promise((resolve, reject) => {
                let output: any;
                if (environment.NATIVE) {
                    output = (typeof navigator.connection == 'object') ? navigator.connection : {};
                } else {
                    // [Development]:
                    output = {
                        'type': 'wifi'
                        // 'type':  '3g',
                        // 'type':  '4g',
                        // 'type': 'none'
                    };
                    // error:
                    // output = { 'type': 'NONE' };
                }
                if (typeof output == 'object' && Object.keys(output).length > 0) {
                    resolve(output);
                } else {
                    this._logger.error('CheckNetwork', 'error in miss object', output);
                    reject(output);
                }
            }));
    }



    /**
     * Server 通訊檢核
     * @returns Promise object
     *  status: true 可連線, false 異常
     *  type: 
     *  error: 錯誤物件(object)
     *  data: 回傳物件
     */
    checkServer(): Promise<any> {
        return this.onDeviceReady
            .then(() => new Promise((resolve, reject) => {
                let successBack = (backObj?: any) => {
                    this._logger.step('CheckNetwork', 'success in checkServer', backObj);
                    let status = true;
                    let output = {
                        'status': status,
                        'type': 'allow',
                        'error': {},
                        'data': backObj
                    };
                    if (status) {
                        resolve(output);
                    } else {
                        reject(output);
                    }
                };
                let errorBack = (errorObj?: any) => {
                    this._logger.error('CheckNetwork', 'error in checkServer', errorObj);
                    reject({
                        'status': false,
                        'type': '',
                        'error': errorObj,
                        'data': {}
                    });
                };
                let check_is_ssl = (environment.SERVER_URL.substr(0, 5) == 'https') ? true : false;
                if (environment.NATIVE && environment.SERVER_CERT_CHECK && check_is_ssl) {
                    plugin.verifyServer.check(environment.SERVER_URL, VERIFY_CERTS_INFO, successBack, errorBack);
                } else {
                    // [Development]:
                    successBack();
                    // errorBack({});
                }
            })).catch((rejectObj) => {
                let network_server_error = this._setErrorObject.returnError(rejectObj, 'NETWORK_SERVER');
                return Promise.reject(network_server_error);
            });
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------


}
