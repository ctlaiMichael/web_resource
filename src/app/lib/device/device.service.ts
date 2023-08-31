/**
 * 裝置與版本資訊
 * 取得裝置資訊
 *  [plugin]:  cordova-plugin-trusted-device
 *  [version]: 2.0.0
 * 
 * 取得目錄資訊
 *  [plugin]:  cordova-plugin-file
 *  [version]: 1.0
 */
import { Injectable } from '@angular/core';
import { CordovaService } from '@conf/cordova/cordova.service';
import { environment } from 'environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
// === lib === //
import { ObjectUtil } from '@util/formate/modify/object-util';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { FieldUtil } from '@util/formate/modify/field-util';
import { LoadFileService } from '@lib/file/load-file.service';
// import { SessionStorageService } from '@lib/storage/session-storage.service';
// import { LocalStorageService } from '@lib/storage/local-storage.service';
// === option === //
import { DeviceInfoOption } from '@lib/device/device-info-option';
import { IOS_DEVICE_NAME } from './ios-device-name';

declare var device: any;
declare var cordova: any;
declare var plugin: any;
declare var MobileAccessibility: any;

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class DeviceService extends CordovaService {

    private applicationDirectory = ''; // APP根目錄
    private deviceInfoData: DeviceInfoOption; // 裝置資訊
    private getInfoNativeData = {}; // 原本native plugin getInfo()方法回傳的裝置資訊結構

    constructor(
        private _logger: Logger,
        private loadFileService: LoadFileService
        // private session: SessionStorageService,
        // private localStorage: LocalStorageService
    ) {
        super();
        // this.getNativeDeviceInfo();
    }

    /**
     * 啟動裝置資訊
     */
    async initUuid(): Promise<any> {
        try {
            let app_path = await this.getFileApplicationDirectory();
            let device_obj = await this.devicesInfo();
            let device_info = this.getDevicesInfo('uuid');
            return Promise.resolve(device_info);
        } catch (rejectObj) {
            let initError = this._setErrorObject.returnError(rejectObj, 'DEVICE_INIT_ERROR');
            return Promise.reject(initError);
        }
    }

    /**
     * 取得裝置資訊
     */
    getDevicesInfo(search_field?: string) {
        let output = ObjectUtil.clone(this.deviceInfoData);
        if (typeof search_field != 'undefined' && !!search_field) {
            output = ObjectCheckUtil.checkObjectList(output, search_field);
        }
        // this._logger.step('deviceInfo', 'get devicesInfo', search_field, '=>', output, this.deviceInfoData);
        return output;
    }

    /**
     * 取得裝置資訊 (必須確定有資料，部分程式必須這樣處理)
     */
    devicesInfo(search_field?: string): Promise<any> {
        return this.onDeviceReady.then(() => {
            if (!this.deviceInfoData) {
                return this.getNativeDeviceInfo().then(() => {
                    let device_info = this.getDevicesInfo(search_field);
                    return Promise.resolve(device_info);
                });
            } else {
                let device_info = this.getDevicesInfo(search_field);
                return Promise.resolve(device_info);
            }
        });
    }

    /**
     * 取得原本native plugin getInfo()方法回傳的裝置資訊結構
     * 特殊功能才使用，一般功能取裝置資訊用getDevicesInfo()方法
     */
    deviceGetInfo(): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let check_method = false;
            if (typeof device == 'object' && typeof device.getInfo === 'function') {
                check_method = true;
            }
            if (environment.NATIVE) {
                if (check_method) {
                    let successCallback = (res) => {
                        this.getInfoNativeData = res;
                        resolve(res);
                    };
                    let errorCallback = (err) => {
                        this._logger.error('device.getInfo Error', err);
                        reject(err);
                    };
                    device.getInfo(successCallback, errorCallback);
                } else {
                    this._logger.error('getCordovaFileApplicationDirectory: miss', device);
                }
            } else {
                // android sample
                let deviceObj = {
                    "available": true,
                    "platform": "Android",
                    "version": "6.0.1",
                    "uuid": "CB5A28MMEM-479AEDD606FAC7BE-21C1",
                    "cordova": "7.1.4",
                    "model": "E5823",
                    "manufacturer": "Sony",
                    "isVirtual": false,
                    "serial": "CB5A28MMEM",
                    "hostname": "android-479aedd606fac7be",
                    "appinfo": {
                        "name": "SCSB",
                        "version": "1.0.0",
                        "identifier": "com.example.hello"
                    }
                };
                return Promise.resolve(deviceObj);
            }
        }));
    }


    /**
     * 取得裝置根目錄
     */
    getCordovaFileApplicationDirectory() {
        return this.applicationDirectory;
    }

    /**
     * 檢查platform
     */
    checkPlatform(platform: string) {
        let device_platform = this.getDevicesInfo('platformLower');
        let output = false;
        switch (platform) {
            case 'android':
                output = (device_platform === 'android') ? true : false;
                break;
            case 'ios':
                output = (device_platform === 'ios') ? true : false;
                break;
            default:
                break;
        }

        return output;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 裝置資訊取得
     */
    private async getNativeDeviceInfo(): Promise<any> {
        try {
            this._logger.step('deviceInfo', 'getNativeDeviceInfo start');
            let output = new DeviceInfoOption();
            let deviceObj;
            if (environment.NATIVE) {
                if (!!ObjectCheckUtil.checkObject(device)) {
                    deviceObj = ObjectUtil.clone(device);
                } else {
                    this._logger.error('getCordovaFileApplicationDirectory: miss', device);
                }
            } else {
                // android sample
                deviceObj = {
                    "available": true,
                    "platform": "Android",
                    "version": "6.0.1",
                    "uuid": "CB5A28MMEM-479AEDD606FAC7BE-21C1",
                    "cordova": "7.1.4",
                    "model": "E5823",
                    "manufacturer": "Sony",
                    "isVirtual": false,
                    "serial": "CB5A28MMEM",
                    "hostname": "android-479aedd606fac7be",
                    "appinfo": {
                        "name": "SCSB",
                        "version": "1.0.0",
                        "identifier": "com.example.hello"
                    }
                };
            }
            // == 裝置軟體資訊 == //
            output.platform = FieldUtil.checkField(deviceObj, 'platform');
            output.platformLower = output.platform.toLocaleLowerCase();
            output.osVersion = FieldUtil.checkField(deviceObj, 'version');
            output.hostname = FieldUtil.checkField(deviceObj, 'hostname');

            // == 裝置資訊 == //
            output.manufacturer = FieldUtil.checkField(deviceObj, 'manufacturer');
            output.modelSource = FieldUtil.checkField(deviceObj, 'model');
            output.model = this.getModelName(output.modelSource);

            // == APP 與裝置狀況 == //
            let checkVirtual = ObjectCheckUtil.checkObjectList(deviceObj, 'isVirtual');
            output.isVirtual = (!!checkVirtual) ? true : false;

            // == APP 軟體資訊 == //
            output.cordovaVersion = FieldUtil.checkField(deviceObj, 'cordova');
            output.appinfo.name = ObjectCheckUtil.checkObjectList(deviceObj, 'appinfo.name');
            output.appinfo.identifier = ObjectCheckUtil.checkObjectList(deviceObj, 'appinfo.identifier');
            output.appinfo.version = ObjectCheckUtil.checkObjectList(deviceObj, 'appinfo.version');
            output.appinfo.subVersion = await this.getSubVersion();
            output.appVersion = output.appinfo.version + ' (' + output.appinfo.subVersion + ')';

            // == 其他資訊 == //
            output.uuid = FieldUtil.checkField(deviceObj, 'uuid');
            output.serialNo = FieldUtil.checkField(deviceObj, 'serial');

            this.deviceInfoData = output;
            // this._logger.step('deviceInfo', 'save', output);
            return Promise.resolve(output);
        } catch (rejectObj) {
            let initError = this._setErrorObject.returnError(rejectObj, 'DEVICE_GET_ERROR');
            return Promise.reject(initError);
        }
    }


    /**
     * 取得cordova file application directory
     */
    private getFileApplicationDirectory(): Promise<any> {
        return this.onDeviceReady
            .then(() => {
                let output = '.';
                if (environment.NATIVE) {
                    if (typeof cordova == 'object' && typeof cordova.file == 'object') {
                        output = ObjectCheckUtil.checkObjectList(cordova, 'file.applicationDirectory');
                    }
                    if (!output) {
                        output = '.';
                        // tslint:disable-next-line:max-line-length
                        this._logger.error('getCordovaFileApplicationDirectory: miss', typeof cordova.file, typeof cordova.file.applicationDirectory);
                    }
                }
                this.applicationDirectory = output;
                return Promise.resolve(output);
            });
    }

    /**
     * 取得裝置型號
     */
    private getModelName(model: string) {
        let output = model;
        if (ObjectCheckUtil.checkObject(IOS_DEVICE_NAME, model)) {
            output = IOS_DEVICE_NAME[model];
        }
        return output;
    }


    /**
     * 取得子版號
     */
    private getSubVersion(): Promise<string> {
        const aboutFile = './assets/data/resource/about.json';
        let output = '';
        return this.loadFileService.getJsonFile(aboutFile)
            .then((jsonObj) => {
                output = ObjectCheckUtil.checkObjectList(jsonObj, 'Release');
                return Promise.resolve(output);
            })
            .catch((errorObj) => {
                this._logger.error('getSubVersion: error', errorObj);
                output = '';
                return Promise.resolve(output);
            });

        // const aboutXml = './resource/about.xml';
        // return this.loadFileService.getXmlFile(aboutXml)
        //     .then((resultJson) => {
        //         let subVersion = ObjectCheckUtil.checkObjectList(resultJson, 'About.Release.0');
        //         return subVersion;
        //     });
    }
    // 控制大小寫
    getUsePreferredTextZoom(): Promise<any> {
        return this.onDeviceReady
            .then(() => {
                let check_method = false;
                if (typeof MobileAccessibility == 'object' && typeof MobileAccessibility.usePreferredTextZoom === 'function') {
                    check_method = true;
                }
                this._logger.step('Mscale', 'doChallengeResponse check_method', check_method);
                if (environment.NATIVE) {
                    if (check_method) {
                        MobileAccessibility.usePreferredTextZoom(false);
                        return Promise.resolve({});
                    } else {
                        // miss
                        let errorObj = this._setErrorObject.returnError({}, 'PLUGIN_ERROR');
                        return Promise.reject(errorObj);
                    }
                }
            });
    }

    // // 測試
    // public systeminformation(): Promise<any>{
    //   const systeminformation = {
    //     'uuid': device.uuid,
    //     'appuid': device.appinfo.identifier,
    //     'model': (!IOS_DEVICE_NAME[device.model]) ? device.model : IOS_DEVICE_NAME[device.model],
    //     'platform': device.platform,
    //     'osversion': device.version,
    //     'appversion': device.appinfo.version + '.' + device.appinfo.subVersion,
    //   };
    //   this._logger.error(systeminformation);
    //   return Promise.resolve(systeminformation);
    // }




}
