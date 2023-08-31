/**
 * 停機公告檢核
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
import { HttpClient } from '@angular/common/http';
// -- Reponse Options -- //
import { ErrorObjectOption } from '@systems/handle-error/error-object-option';
// -- Other Library -- //
import { FormateService } from '@template/formate/formate.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';

@Injectable()
export class CheckMaintainService {
    protected _setErrorObject = new ErrorObjectOption(); // 設定error obj
    constructor(
        private _logger: Logger,
        private http: HttpClient,
        private _formateService: FormateService,
        private localStorageService: LocalStorageService
    ) {
    }

    /**
     * 停機公告檢核
     * @param type 
     * Promise reject 維護
     * Promise resolve 非維護
     */
    async checkIsMaintain(type: string, set_error: any): Promise<any> {
        let errorObj = this._setErrorObject.returnError({}, 'SERVER_MAINTAIN');
        let isMaintain = true;

        try {
            const now_time = this._formateService.transDate('NOW_TIME', 'timestamp');
            let isInRange = false;
            let local_anno = await this.checkAnnoClient(now_time);
            this._logger.log('TelegramBase', 'Anno', 'local', local_anno);
            if (typeof local_anno == 'object' && local_anno) {
                isMaintain = local_anno.maintain;
                isInRange = local_anno.isInRange;
                if (isMaintain) {
                    errorObj.content = local_anno.msg;
                }
            }
            // localstroage( 系統參數查詢 )
            if (!isMaintain) {
                let localStroage_anno = await this.checkAnnoLocalStroage(now_time);
                this._logger.log('TelegramBase', 'Anno', 'localStroage', localStroage_anno);
                if (typeof localStroage_anno == 'object' && localStroage_anno) {
                    isMaintain = localStroage_anno.maintain;
                    isInRange = localStroage_anno.isInRange;
                    if (isMaintain) {
                        errorObj.content = localStroage_anno.msg;
                    }
                }
            }
            if (type == 'server' && !isMaintain) {
                let server_anno = await this.checkAnnoServer(now_time);
                this._logger.log('TelegramBase', 'Anno', 'server', server_anno);
                if (typeof server_anno == 'object' && !!server_anno) {
                    // server 停機公告整理
                    isMaintain = server_anno.maintain;
                    if (isMaintain) {
                        errorObj.content = server_anno.msg;
                    }
                }
            }
            if (isMaintain) {
                return Promise.reject(errorObj);
            } else {
                return Promise.resolve(set_error);
            }
        } catch (noMaintain) {
            return Promise.resolve(set_error);
        }

    }



    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * client 停機公告
     * @param now_time
     */
    private checkAnnoClient(now_time): Promise<any> {
        return new Promise((resolve, reject) => {
            let errorObj = this._setErrorObject.returnError({}, 'SERVER_MAINTAIN');
            let output = {
                maintain: false,
                msg: errorObj.content,
                time_s: 0,
                time_e: 0,
                isInRange: false
            };
            const range_time = 3600000 * 6; // 6H

            if (!now_time || now_time <= 0) {
                resolve(output);
                return false;
            }

            const local_anno_path = environment.CLIENT_ANNO_URL;
            if (!local_anno_path || local_anno_path == '') {
                // 不提供此機制
                resolve(output);
                return false;
            }

            this._logger.log('TelegramBase', 'Anno', 'client start');
            this.http.get(local_anno_path, {}).toPromise().then(
                (local_anno) => {
                    // local 停機公告整理
                    this._logger.log('TelegramBase', 'Anno', 'local in checkAnnoClient', local_anno);
                    if (typeof local_anno == 'object' && !!local_anno) {
                        let tmp_d = this._formateService.checkField(local_anno, 'date');
                        let tmp_s = this._formateService.checkField(local_anno, 'start');
                        let tmp_e = this._formateService.checkField(local_anno, 'end');
                        let server_msg = this._formateService.checkField(local_anno, 'msg');
                        let server_time_s = this._formateService.transDate(tmp_s, 'timestamp');
                        let server_time_e = this._formateService.transDate(tmp_e, 'timestamp');
                        let server_time_d = this._formateService.transDate(tmp_d, 'date');

                        let isServerMaintain = false;
                        if (server_time_e != 0
                            && now_time >= server_time_s
                        ) {
                            // 維護開始
                            if (now_time <= server_time_e) {
                                isServerMaintain = true;
                                if (server_msg != '') {
                                    output.msg = server_msg;
                                }
                            }
                            // 維護超過預期
                            let more_range = (now_time - server_time_e) / range_time;
                            if (server_time_d == this._formateService.transDate(now_time, 'date')
                                || (more_range > 0 && more_range <= 1)
                            ) {
                                output.isInRange = true;
                            }
                        }
                        output.maintain = isServerMaintain;
                        output.time_s = server_time_s;
                        output.time_e = server_time_e;
                        resolve(output);
                    }
                }
            ).catch((errorClient) => {
                output.maintain = false;
                resolve(output);
            });

        });
    }

    /**
     * server停機公告
     * @param now_time
     */
    private checkAnnoServer(now_time): Promise<any> {
        return new Promise((resolve, reject) => {
            let errorObj = this._setErrorObject.returnError({}, 'SERVER_MAINTAIN');
            let output = {
                maintain: false,
                msg: errorObj.content,
                time_s: 0,
                time_e: 0
            };

            if (!now_time || now_time <= 0) {
                reject(output);
                return false;
            }

            let server_anno_path = environment.SERVER_ANNO_URL;
            this._logger.warn('anno', server_anno_path);
            if (!server_anno_path || server_anno_path == '') {
                // 不提供此機制
                reject(output);
                return false;
            }

            let client = new XMLHttpRequest();
            client.open('GET', server_anno_path);
            client.onreadystatechange = () => {
                if (!client || client.readyState != 4) {
                    return false;
                }
                if (!!client && client.status == 200) {
                    let server_anno = {};
                    if (typeof client.responseText == 'string') {
                        try {
                            server_anno = JSON.parse(client.responseText);
                            if (typeof server_anno == 'object' && !!server_anno) {
                                let tmp_s = this._formateService.checkField(server_anno, 'start');
                                let tmp_e = this._formateService.checkField(server_anno, 'end');
                                // // test
                                // tmp_e = '2019/12/13 00:00:00';
                                let server_msg = this._formateService.checkField(server_anno, 'msg');
                                let server_time_s = this._formateService.transDate(tmp_s, 'timestamp');
                                let server_time_e = this._formateService.transDate(tmp_e, 'timestamp');
                                let isServerMaintain = false;
                                if (server_time_e != 0 &&
                                    now_time <= server_time_e && now_time >= server_time_s
                                ) {
                                    isServerMaintain = true;
                                    if (server_msg != '') {
                                        output.msg = server_msg;
                                    }
                                }
                                output.maintain = isServerMaintain;
                                output.time_s = server_time_s;
                                output.time_e = server_time_e;
                                resolve(output);
                                return true;
                            }

                        } catch (e) {
                            reject(output);
                            return false;
                        }
                    }
                } else {
                    this._logger.log('TelegramBase', 'Anno', 'connect server error', client);
                    reject(client);
                    return false;
                }
            };
            client.send();
        });
    }
    /**
        * server停機公告(LocalStroage)
        * @param now_time
        */
    private checkAnnoLocalStroage(now_time): Promise<any> {
        return new Promise((resolve, reject) => {
            let errorObj = this._setErrorObject.returnError({}, 'SERVER_MAINTAIN');
            let output = {
                maintain: false,
                msg: errorObj.content,
                time_s: 0,
                time_e: 0
            };

            if (!now_time || now_time <= 0) {
                resolve(output);
                return false;
            }

            let server_anno = this.localStorageService.getObj('maintain');
            this._logger.warn('anno', server_anno);
            if (!server_anno) {
                // 不提供此機制
                resolve(output);
                return false;
            }
            try {
                if (typeof server_anno == 'object' && !!server_anno) {
                    let tmp_s = this._formateService.checkField(server_anno, 'start');
                    let tmp_e = this._formateService.checkField(server_anno, 'end');
                    // // test
                    // tmp_e = '2019/12/13 00:00:00';
                    let server_msg = this._formateService.checkField(server_anno, 'msg');
                    let server_time_s = this._formateService.transDate(tmp_s, 'timestamp');
                    let server_time_e = this._formateService.transDate(tmp_e, 'timestamp');
                    let isServerMaintain = false;
                    if (server_time_e != 0 &&
                        now_time <= server_time_e && now_time >= server_time_s
                    ) {
                        isServerMaintain = true;
                        if (server_msg != '') {
                            output.msg = server_msg;
                        }
                    }
                    output.maintain = isServerMaintain;
                    output.time_s = server_time_s;
                    output.time_e = server_time_e;
                    resolve(output);
                    return true;
                }

            } catch (e) {
                reject(output);
                return false;
            }
        });
    }


}
