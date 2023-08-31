/**
 * 
 * 
 *
 *
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { SECURITYMODE } from '@conf/security/secruity-setting-of-function';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { StringCheckUtil } from '@util/check/string-check-util';
import { TranslateService } from '@ngx-translate/core';
import { SPEC00060201ApiService } from '@api/spec00/spec00060201/spec00060201-api.service';
import { BiometricInterfaceService } from '@lib/biometric/biometric-interface.service';
@Injectable()

export class SecurityInterfaceService {
    /**
     * 
     */

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private _auth: AuthService,
        private _translate: TranslateService,
        private _spec00060201: SPEC00060201ApiService,
        private _biometricService: BiometricInterfaceService,
    ) {
    }




    checkSecurityList(securityList) {
        let ArrayData = Array.isArray(securityList);
        let userAuth = this._auth.getSecurityData();
        this._logger.log("使用者安控權限資料 security-interface.service.ts.41", userAuth);
        let canUseList = [];
        // 快速交易模式
        let fastMode = (!!userAuth['fastMode']) ? userAuth['fastMode'] : '';
        if (ArrayData && userAuth) {
            let authOrder = userAuth['securityOrder'] ? userAuth['securityOrder'] : [];
            let sortObj = {};
            let tmpArry = [];

            securityList.forEach((element) => {
                //   '1': { name: '輸入認證', id: '1', checkList: ['id4Num'] },

                // checkList 需檢核的權限
                let checkArray = SECURITYMODE[element]['checkList'];
                let authStatus = true;
                if (checkArray.length > 0) {
                    // 比對user權限
                    checkArray.forEach((e) => {
                        // 取得快速交易紀錄模式
                        // "fastAgreement": "Y", 1 OR 2 
                        // "deviceBind": "Y" // 是否有綁定裝置 0 ,1 
                        if (e == 'fastAgreement') {
                            if (userAuth[e] == '2') {
                                userAuth[e] = "Y";
                            } else {
                                userAuth[e] = 'N';
                            }

                        }
                        if (e == 'deviceBind') {
                            if (userAuth[e] == '1') {
                                userAuth[e] = "Y";
                            } else {
                                userAuth[e] = 'N';
                            }
                        }

                        if (userAuth[e] == 'N') {
                            authStatus = false;
                        }
                    });
                }
                // 都回傳Y 確認有此權限塞回可用權限列表
                if (authStatus) {
                    // 比對可用權限是否有在渠線排序中
                    let securityposition = authOrder.indexOf(SECURITYMODE[element]['funName']);
                    // 有set 權限
                    if (securityposition > -1) {

                        // 紀錄權限順序位置
                        sortObj[securityposition] = SECURITYMODE[element];
                        // 如果是快速交易設定模式為哪個
                        if (SECURITYMODE[element]['funName'] == 'fastPay') {
                            sortObj[securityposition]['fastMode'] = fastMode;
                        }
                        // 紀錄物件Key值做排序用
                        tmpArry.push(securityposition);
                    }

                    if (SECURITYMODE[element]['funName'] == 'otp_device') {
                        sortObj[3] = SECURITYMODE[element];
                        tmpArry.push(3);
                    }

                }
            });
            // 帶入記錄位置與對應物件做後續回傳實際權限表
            canUseList = this.doCanUseListSort(tmpArry, sortObj);
        }
        return canUseList;
    }

    // 排權限順序
    doCanUseListSort(arrayObj, sortObj) {
        arrayObj = arrayObj.sort();
        arrayObj.forEach((x, index) => {
            arrayObj[index] = sortObj[x];
        });
        return arrayObj;
    }


    // 欄位檢核
    checkinput(type, checkdata) {
        // 檢核狀態

        let returnObj = {
            checkStaus: false,
            errorMsg: 'SECURITY.EMPTVALUE'
        };

        // 檢查空值
        if (!ObjectCheckUtil.checkEmpty(checkdata, true)) {
            return returnObj;
        }
        // 檢查英數
        let chek_EN_NUM = StringCheckUtil.checkEnglish(checkdata, 'english_number', true);
        if (!chek_EN_NUM) {
            returnObj.errorMsg = 'SECURITY.TYPENUMOREN';
            return returnObj;
        }

        // 檢核長度 type
        if (type == '1' || type == '2') {
            let Length = (type == '1') ? 4 : 6;
            // 檢查是否高過最大長度
            let checkMaxlenght = StringCheckUtil.checkLength(checkdata, Length, 'max');
            if (!checkMaxlenght.status) {
                returnObj.errorMsg = 'SECURITY.MAXLENGTHERROR';
                return returnObj;
            }
            // 檢查是否是否輸入長度不足
            let checkMinlenght = StringCheckUtil.checkLength(checkdata, Length, 'min');
            if (!checkMinlenght.status) {
                returnObj.errorMsg = 'SECURITY.MINLENGTHERROR';
                returnObj.errorMsg = this._translate.instant(returnObj.errorMsg, { LENGTH: Length });
                return returnObj;
            }
        }
        
        // 身分證檢核
        if (type == '1') {
            let auth_id = this._auth.getCustId();
            if (!!auth_id && (auth_id.substr(-4, 4) != checkdata)) {
                returnObj.errorMsg = 'SECURITY.CHECK_ERROR.SECURITY_CHECK_ERROR_1';
                return returnObj;
            }
        }

        // 沒有錯誤
        returnObj.checkStaus = true;
        return returnObj;
    }

    /**
     * 
     * @param selectMode 
     * @param {
     *      transNum: '',   // 交易序號
     *      otpCheckCode: 'T124UG', // OTP驗證碼     
     *      inputValue:'123' 
     *  }
     */

    // 跟據安控項目對應處理方式
    async doSecurity(selectMode, setSecurity, dofast): Promise<any> {
        let returnObj = {
            "securityType": selectMode['id'],
            "transServiceId": setSecurity['transServiceId']
        };
        if (selectMode) {
            return new Promise(async (resolve, reject) => {
                if (selectMode['id'] == '2' || selectMode['id'] == '5') {
                    // 直接發OTP認證 //OTP 電文

                    this._spec00060201.getData(setSecurity).then(
                        (otp_s) => {
                            this._logger.log(otp_s);
                            let data = otp_s.infoData;
                            if (data) {
                                returnObj['transNum'] = data.transNum;
                                returnObj['otpCheckCode'] = data.otpCheckCode;
                                returnObj['date'] = data.date;
                                returnObj['time'] = data.time;
                                returnObj['dateTime'] = data.date + '' + data.time;
                            }
                            // OTP發送成功 回傳成功
                            resolve(returnObj);
                            return true;
                        }, (otp_f) => {
                            // error handle 回傳格式可能需要調整
                            reject(otp_f);

                            return false;
                        });


                } else if ((selectMode['id'] == '3' || selectMode['id'] == '4') && dofast == true) {
                    // 執行快速認證
                    // 確認簽章本文
                    let signText = this._formateService.checkField(setSecurity, 'signText');
                    // 快速交易模式
                    let fastMode = this._formateService.checkField(selectMode, 'fastMode');

                    if (fastMode && signText) {

                        returnObj['fastMode'] = fastMode;

                        if (fastMode == '2') { // 生物圖形或臉部 
                            // 呼叫plugin 
                            this._logger.log('check bio start');
                            try {
                                let requestBio = await this._biometricService.requestBioService(signText);
                                this._logger.log('check bio success', requestBio);
                                returnObj['signText'] = requestBio['mac_value'];
                            } catch (error) {
                                this._logger.log('check bio error', error);
                                reject(error);
                                return false;
                            }

                        } else if (fastMode == '1') { // 圖形
                            // 暫時沒有圖形
                            reject({ "title": "ERROR.TITLE", "content": "暫時不提供此安控交易。" });
                            return false;
                        }
                        resolve(returnObj);
                        return false;
                    } else {
                        // 參數錯誤
                        reject({ "title": "ERROR.TITLE", "content": "參數傳遞錯誤" });
                        return false;
                    }

                } else {
                    resolve(returnObj);
                    return false;
                }
            });

        } else {
            // 無傳遞對應的安控參數 erro handle
            return Promise.reject({ "title": "ERROR.TITLE", "content": "參數錯誤" });
        }

    }
}
