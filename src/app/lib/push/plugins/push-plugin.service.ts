/**
 * Push
 * (Server) - Hitrust.verifyServer Plugin
 *  [plugin]: phonegap-plugin-push
 *  [version]: 2.3.0
 */
import { Injectable } from '@angular/core';
import { CordovaService } from '@conf/cordova/cordova.service';
import { environment } from '@environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';

declare var PushNotification: any;

@Injectable({
    providedIn: 'root'
})
export class PushPluginService extends CordovaService {
    push: any;
    /*
    title： 推播標題
    message： 推播訊息內容
    count ：Badge數量
    Sound： Sound file name
    image：Image path
    additionalData：Collection data
    (
    additionalData.foreground：當App在前景時是否有收到推播
    additionalData.coldstart：如果App被點擊推播後再開啟該值為true，反之在App開啟的狀態下點擊則為false
    additionalData.dismissed：如果推播被使用者取消，則設為true
    )
    */
    notifications: { title: any, message: any, count: any, sound: any, image: any, additionalData: any }[] = [];
    constructor(
        private _logger: Logger,
        private _formateService: FormateService
    ) {
        super();
        this.init();
    }

    /**
     * 執行初始化
     */
    init(): Promise<any> {
        this._logger.step('PUSH', 'init');
        return this.onDeviceReady
            .then(() => {
                if (environment.NATIVE) {
                    this.push = PushNotification.init({
                        android: {
                        },
                        ios: {
                            alert: "true",
                            badge: true,
                            sound: 'false'
                        }
                    });
                } else {
                    this.push = {};
                }
                return Promise.resolve(true);
            })
            .catch((e) => {
                return Promise.resolve(e);
            });
    }

    /**
     * 取得push token
     */
    registration(): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let output = '';
            if (environment.NATIVE) {
                this.push.on('registration', (data) => {
                    this._logger.step('PUSH', 'registration', data);
                    let token = this._formateService.checkField(data, 'registrationId');
                    if (token != '') {
                        output = token;
                    }
                    resolve(output);
                });
            } else {
                output = 'test_push_token';
                resolve(output);
            }
        }))
            .catch((e) => new Promise((resolve, reject) => {
                this._logger.step('PUSH', 'registration Error', e);
                resolve(e);
            }));
    }

    /**
     * 取得title內容
     */
    getTitle(): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let output = '';
            if (environment.NATIVE) {
                this.push.on('notification', (data) => {
                    this._logger.step('PUSH', 'getTitle', data);
                    let msg = this._formateService.checkField(data, 'title');
                    if (msg != '') {
                        output = msg;
                    }
                    resolve(output);
                });
            } else {
                output = 'testTitle';
                resolve(output);
            }
        }))
            .catch((e) => new Promise((resolve, reject) => {
                this._logger.step('PUSH', 'getTitle Error', e);
                resolve(e);
            }));
    }

    /**
     * 取得訊息內容
     */
    getMessage(): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let output = '';
            if (environment.NATIVE) {
                this.push.on('notification', (data) => {
                    this._logger.step('PUSH', 'getMessage', data);
                    let msg = this._formateService.checkField(data, 'message');
                    if (msg != '') {
                        output = msg;
                    }
                    resolve(output);
                });
            } else {
                output = 'test msg';
                resolve(output);
            }
        }))
            .catch((e) => new Promise((resolve, reject) => {
                resolve(e);
            }));
    }

    /**
     * 取得訊息資訊
     */
    getNotifications(): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            if (environment.NATIVE) {
                this.push.on('notification', (data) => {
                    this._logger.step('PUSH', 'getNotifications', data);
                    let title = this._formateService.checkObjectList(data, 'title');
                    let message = this._formateService.checkObjectList(data, 'message');
                    let count = this._formateService.checkObjectList(data, 'count');
                    let sound = this._formateService.checkObjectList(data, 'sound');
                    let image = this._formateService.checkObjectList(data, 'image');
                    let additionalData = this._formateService.checkObjectList(data, 'additionalData');
                    this.notifications.push({
                        'title': title,
                        'message': message,
                        'count': count,
                        'sound': sound,
                        'image': image,
                        'additionalData': additionalData
                    });
                    resolve(this.notifications);
                });
            } else {
                resolve(true);
            }
        }))
        .catch((e) => new Promise((resolve, reject) => {
            resolve(e);
        }));
    }

    /**
     * 取得錯誤訊息
     */
    errorMessage(): Promise<any> {
        return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
            let output = '';
            if (environment.NATIVE) {
                this.push.on('error', (e) => {
                    this._logger.step('PUSH', 'errorMessage', e);
                    let er_msg = this._formateService.checkField(e, 'message');
                    if (er_msg != '') {
                        output = er_msg;
                    }
                    resolve(output);
                });
            } else {
                resolve(output);
            }
        }));
    }


}
