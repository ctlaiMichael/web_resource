/**
 * 安控
 */
import { Injectable } from '@angular/core';
import { CordovaService } from '@conf/cordova/cordova.service';
import { environment } from '@environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
import { FieldUtil } from '@util/formate/modify/field-util';
import { ObjectCheckUtil } from '@util/check/object-check-util';
declare var plugin: any;

@Injectable()
export class CryptoService extends CordovaService {
    constructor(
        private _logger: Logger
    ) {
        super();
    }

    public InitPhoneData(deviceInfo): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                resolve(res);
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Crypto', 'Error InitPhoneData', res);
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CRYPTO_INIT_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof plugin == 'object' && typeof plugin.crypto == 'object' && typeof plugin.crypto.InitPhoneData === 'function') {
                check_method = true;
            }
            this._logger.step('Crypto', 'InitPhoneData check_method', check_method);
            if (environment.NATIVE) {
                if (check_method) {
                    plugin.crypto.InitPhoneData(deviceInfo, successCallback, errorCallback);
                } else {
                    // miss
                    errorCallback({}, 'CRYPTO_MISS_ERROR');
                }
            } else {
                successCallback({});
            }
        }));
    }

    public RSA_Encrypt(pubkey, text): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                resolve(res);
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Crypto', 'Error RSA_Encrypt', res);
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CRYPTO_RSA_ENCODE_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof plugin == 'object' && typeof plugin.crypto == 'object' && typeof plugin.crypto.RSA_Encrypt === 'function') {
                check_method = true;
            }
            this._logger.step('Crypto', 'RSA_Encrypt check_method', check_method);
            if (environment.NATIVE) {
                plugin.crypto.RSA_Encrypt(pubkey, text, successCallback, errorCallback);
            } else {
                successCallback('');
            }
        }));
    }

    
    public SHA256(text): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                resolve(res);
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Crypto', 'Error SHA256', res);
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CRYPTO_SHA256_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof plugin == 'object' && typeof plugin.crypto == 'object' && typeof plugin.crypto.SHA256 === 'function') {
                check_method = true;
            }
            this._logger.step('Crypto', 'SHA256 check_method', check_method);
            if (environment.NATIVE) {
                plugin.crypto.SHA256(text, successCallback, errorCallback);
            } else {
                successCallback('');
            }
        }));
    }


    public AES_Encrypt(keyLabel, text): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                resolve(res);
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Crypto', 'Error AES_Encrypt', res);
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CRYPTO_AES_ENCODE_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof plugin == 'object' && typeof plugin.crypto == 'object' && typeof plugin.crypto.AES_Encrypt === 'function') {
                check_method = true;
            }
            this._logger.step('Crypto', 'AES_Encrypt check_method', check_method);
            if (environment.NATIVE) {
                plugin.crypto.AES_Encrypt(keyLabel, text, successCallback, errorCallback);
            } else {
                successCallback('');
            }
        }));
    }

    public AES_Decrypt(keyLabel, text): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                resolve(res);
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Crypto', 'Error AES_Decrypt', res);
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CRYPTO_AES_DECODE_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof plugin == 'object' && typeof plugin.crypto == 'object' && typeof plugin.crypto.AES_Decrypt === 'function') {
                check_method = true;
            }
            this._logger.step('Crypto', 'AES_Decrypt check_method', check_method);
            if (environment.NATIVE) {
                plugin.crypto.AES_Decrypt(keyLabel, text, successCallback, errorCallback);
            } else {
                successCallback('');
            }
        }));
    }

    public Base64Encode(text): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                let plugin_code = FieldUtil.checkField(res, 'error', { to_string: true });
                let val = ObjectCheckUtil.checkObjectList(res, 'value');
                if (plugin_code == '0' && val){
                    resolve(val);
                } else {
                    errorCallback(res, plugin_code);
                }
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Crypto', 'Error Base64Encode', res);
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CRYPTO_BASE64_ENCODE_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof plugin == 'object' && typeof plugin.crypto == 'object' && typeof plugin.crypto.Base64Encode === 'function') {
                check_method = true;
            }
            this._logger.step('Crypto', 'Base64Encode check_method', check_method);
            if (environment.NATIVE) {
                plugin.crypto.Base64Encode(text, successCallback, errorCallback);
            } else {
                successCallback({
                    error: '0',
                    value: 'test base64 string'
                });
                // successCallback('');
            }
        }));
    }

    public Base64Decode(base64Text): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                resolve(res);
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Crypto', 'Error Base64Decode', res);
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CRYPTO_BASE64_DECODE_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof plugin == 'object' && typeof plugin.crypto == 'object' && typeof plugin.crypto.Base64Decode === 'function') {
                check_method = true;
            }
            this._logger.step('Crypto', 'Base64Decode check_method', check_method);
            if (environment.NATIVE) {
                plugin.crypto.Base64Decode(base64Text, successCallback, errorCallback);
            } else {
                successCallback('');
            }
        }));
    }

    /**
    public MD5(text): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                resolve(res);
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Crypto', 'Error InitPhoneData', res);
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CRYPTO_MD5_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof plugin == 'object' && typeof plugin.crypto == 'object' && typeof plugin.crypto.MD5 === 'function') {
                check_method = true;
            }
            this._logger.step('Crypto', 'MD5 check_method', check_method);
            if (environment.NATIVE) {
                plugin.crypto.MD5(text, successCallback, errorCallback);
            } else {
                successCallback('');
            }
        }));
    }

    public SHA1(text): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let successCallback = (res) => {
                resolve(res);
            };
            let errorCallback = (res?: any, error_code?: any) => {
                this._logger.error('Crypto', 'Error InitPhoneData', res);
                if (typeof error_code == 'undefined' || !error_code) {
                    error_code = 'CRYPTO_SHA1_ERROR';
                }
                let errorObj = this._setErrorObject.returnError(res, error_code);
                reject(errorObj);
            };
            let check_method = false;
            if (typeof plugin == 'object' && typeof plugin.crypto == 'object' && typeof plugin.crypto.SHA1 === 'function') {
                check_method = true;
            }
            this._logger.step('Crypto', 'SHA1 check_method', check_method);
            if (environment.NATIVE) {
                plugin.crypto.SHA1(text, successCallback, errorCallback);
            } else {
                successCallback('');
            }
        }));
    }
    // **/

}
