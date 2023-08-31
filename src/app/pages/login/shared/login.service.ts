/**
 * 登入Service
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { AppCtrlService } from '@systems/system/app-ctrl/app-ctrl.service';
import { CheckIdService } from './check-id.service';
import { BiometricInterfaceService } from '@lib/biometric/biometric-interface.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { DeviceService } from '@lib/device/device.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckDeviceBindService } from '@systems/system/init/check-device-bind.service';
// == api == //
import { SPEC02010101ApiService } from '@api/spec02/spec02010101/spec02010101-api.service';
import { SPEC03020101ApiService } from '@api/spec03/spec03020101/spec03020101-api.service';

@Injectable()
export class LoginService {

    constructor(
        private auth: AuthService,
        private appCtrl: AppCtrlService,
        private _logger: Logger,
        private spec02010101: SPEC02010101ApiService,
        private spec03020101: SPEC03020101ApiService,
        private checkIdService: CheckIdService,
        private bioInterface: BiometricInterfaceService,
        private _formateService: FormateService,
        private localStorageService: LocalStorageService,
        private device: DeviceService,
        private checkDeviceBind: CheckDeviceBindService
    ) {

    }

    /**
     * 一般登入
     * @param obj 使用者輸入資料
     */
    login(obj): Promise<any> {
        return this.spec02010101.login(obj).then(
            (res) => {
                let check_data = this.checkAllowLogin(obj, res);
                if (check_data.status) {
                    this.auth.setUserInfo(res.data);
                    return Promise.resolve(res);
                } else {
                    return Promise.reject(check_data.error);
                }
            },
            (err) => {
                this._logger.error("login service err", err);
                return Promise.reject(err);
            }
        );
    }

    /**
     * OS 生物辨識檢測
     * 生物辨識使用
     * 回應資料:
     * ret_code - 回傳值
     * err_msg - 系統錯誤訊息
     * device_id - 設備識別碼
     * mac_value - 驗證值
     */
    requestBioService(userData): Promise<any> {
        return new Promise((resolve, reject) => {

            // const end_data = {
            //     lock: false,
            //     hideError: false, // 不顯示錯誤
            //     data: {},
            //     msg: ''
            // };

            const successMethod = (success) => {
                let reqData = {
                    custId: userData.custId,
                    userId: '',
                    pswd: success.mac_value,
                    loginType: '2'
                };

                return this.spec02010101.login(reqData).then(
                    (res) => {
                        let check_data = this.checkAllowLogin(reqData, res);
                        if (check_data.status) {
                            this.auth.setUserInfo(res.data);
                            resolve(res);
                        } else {
                            reject(check_data.error);
                        }
                    },
                    (err) => {
                        // end_data.data = err;
                        // end_data.msg = err.resMessage;
                        reject(err);
                    }
                );
            };

            const errorMethod = (errorObj) => {
                let check_code = this._formateService.checkField(errorObj, 'app_error_code', {
                    to_string: true,
                    trim_flag: true
                });
        
                if (check_code != '10') {
                    reject(errorObj);
                }
            };

            if (environment.NATIVE) {
                this.bioInterface.requestBioService(userData).then(
                    (resObj) => {
                        successMethod(resObj);
                    },
                    (errorObj) => {
                        errorMethod(errorObj);
                    }
                );
            } else {
                successMethod({ mac_value: "abcdefghijklmnop" });
            }

        });
    }

    /**
     * 登入後程序
     * @param data 登入成功資料
     */
    doAfterLogin(data) {
        this._logger.log('loginProcess', data);
        // 防止中台資訊和App資訊不同步
        // 登入後核對中台傳回來的快速交易flag
        if (this.auth.checkAllowAuth('fastPay')) { // 中台回傳的使用者資訊的快速交易是啟用時
            // 取得App快速綁定資訊Storage
            const tempFtData = this.localStorageService.getObj('fastData');
            if (tempFtData == null) { // 本機無快速綁定資訊
                let security = {
                    fastPay: 'N'
                };
                this.auth.setSecurity(security); // 修改使用者的快速交易為停用
            }
        }

        this.appCtrl.changeToLogin();
        this.appCtrl.redirectAfterLogin();
    }

    /**
     * 檢核欄位
     */
    public checkData(data) {
        let output = {
            status: true,
            errMsgObj: {
                custId: '',
                userId: '',
                pswd: ''
            },
            isErrorChar: false
        };

        // 檢核身分證字號
        if (!data.custId || data.custId == '') {
            output.status = false;
            output.errMsgObj.custId = 'ERROR.NO_CUST_ID';
        } else {
            // 嚴格檢核身分證格式
            // let checkStatus = this.checkIdService.checkID(data.custId);
            // if (!checkStatus) {
            //     output.status = false;
            //     output.errMsgObj.custId = 'ERROR.INVALID_CUST_ID';
            // }
        }

        // 檢核使用者名稱
        if (!data.userId || data.userId == '') {
            output.status = false;
            output.errMsgObj.userId = 'ERROR.NO_USER_ID';
        } else {
            if (data.userId.length < 6 || data.userId.length > 12) {
                output.status = false;
                output.errMsgObj.userId = 'ERROR.INVALID_USER_ID';
            } else {
                let check = true;
                // 檢查特殊字元
                for (let i = 0; i < data.userId.length; i++) {
                    const check_str = data.userId.charCodeAt(i);
                    if (!(check_str >= 21 && check_str <= 126)) {
                        output.status = false;
                        output.errMsgObj.userId = 'ERROR.ERROR_CHAR_USER_ID';
                        check = false;
                        output.isErrorChar = true;
                        break;
                    }
                }

                // 檢查連續相同字母或數字
                if (check) {
                    let check1 = this.checkIdService.checkContinuousSame(data.userId);
                    let check2 = this.checkIdService.checkContinuousNumber(data.userId);
                    if (!check1 || !check2) {
                        output.status = false;
                        output.errMsgObj.userId = 'ERROR.INVALID_USER_ID';
                    }
                }
            }
        }

        // 檢核pswd
        if (!data.pswd || data.pswd == '') {
            output.status = false;
            output.errMsgObj.pswd = 'ERROR.NO_PSWD';
        } else {
            if (data.pswd.length < 8 || data.pswd.length > 12) {
                output.status = false;
                output.errMsgObj.pswd = 'ERROR.INVALID_PSWD';
            } else {
                let check = true;
                // 檢查特殊字元
                for (let i = 0; i < data.pswd.length; i++) {
                    const check_str = data.pswd.charCodeAt(i);
                    if (!(check_str >= 21 && check_str <= 126)) {
                        output.status = false;
                        output.errMsgObj.pswd = 'ERROR.ERROR_CHAR_PSWD';
                        check = false;
                        output.isErrorChar = true;
                        break;
                    }
                }

                // 檢查連續相同字母或數字
                if (check) {
                    let check1 = this.checkIdService.checkContinuousSame(data.pswd);
                    let check2 = this.checkIdService.checkContinuousNumber(data.pswd);
                    if (!check1 || !check2) {
                        output.status = false;
                        output.errMsgObj.pswd = 'ERROR.INVALID_PSWD';
                    }
                }
            }
        }

        return output;
    }

    /**
     * 檢核登入身分是否正確(與伺服器)
     * errorCode: LOGIN_AUTH_COMPARE_ERROR
     */
    private checkAllowLogin(obj, res) {
        let set_custid_info = this._formateService.checkField(obj, 'custId');
        let back_custid_info = this._formateService.checkField(res.data, 'custId');
        let output = {
            status: false, // true表示登入成功
            error: {
                type: 'alert',
                content: 'ERROR.LOGIN.DIFFERENT_CUSTID'
            }
        };
        
        if (!environment.ONLINE) {
            output.status = true;
            return output;
        }
        // 連線把檢查登入身分相同，避免登入不同身分
        if (!!set_custid_info && !!back_custid_info
            && set_custid_info.toLocaleUpperCase() == back_custid_info.toLocaleUpperCase()
        ) {
            output.status = true;
        }
        return output;
    }


}
