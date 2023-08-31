import { Injectable } from '@angular/core';
import { BiometricLibService } from './biometric-lib.service';
import { FormateService } from '@template/formate/formate.service';
import { TranslateService } from '@ngx-translate/core';
import { CryptoService } from '@lib/crypto/crypto.service';
import { Logger } from '@systems/system/logger/logger.service';


@Injectable()
export class BiometricInterfaceService {
  constructor(
    private biometricLib: BiometricLibService,
    private _formateService: FormateService,
    private _translate: TranslateService,
    private _cryptoService: CryptoService,
    private logger: Logger
  ) { }






  // 驗證裝置支援生物辨識狀態
  getBiometricStatus(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let biometricStatus = await this.biometricLib.getBiometricStatus();
        if (biometricStatus.ret_code == '0') {
          // 顯示輸入指紋或掃臉訊息  
          let showNoticeMsg = "SECURITY.PLEASETENTERFINGERPRINT"; // 請將您的指紋置於感應區域上 for i18n
          if (biometricStatus.dev_type == "F") {
            showNoticeMsg = "SECURITY.PLEASETSCEANFACE";
          }
          showNoticeMsg = this._translate.instant(showNoticeMsg);
          // 驗證
          biometricStatus['showNoticeMsg'] = showNoticeMsg;
          resolve(biometricStatus);
        } else {
          // 生物辨識狀態異常
          reject(biometricStatus);
        }
      } catch (errorStatus) {
        if (errorStatus.ret_code != '10') {
          reject(errorStatus);
        }
      }
    });
  }


  // 驗證生物辨識
  identifyByBiometric(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // 驗證裝置生物辨識狀態
        let biometricStatus = await this.getBiometricStatus();
        // 確認生物辨識狀態開啟
        let queryBioStatus = await this.queryBioService();
        if (queryBioStatus.ret_code == '0' && queryBioStatus.bio_status == '1') {
          // 驗證生物辨識身分
          let bioIdentify = await this.biometricLib.identifyByBiometric(biometricStatus.showNoticeMsg);
          if (bioIdentify.ret_code == '0') {
            // 驗證成功
            resolve(bioIdentify);
          } else {
            // 驗證失敗
            reject(bioIdentify);
            // this.alert.show(bioIdentify.err_msg).then(() => reject(bioIdentify));
          }
        } else {
          // 針對查詢的狀態轉換訊息
          queryBioStatus = this.translateBioStatus(queryBioStatus);
          reject(queryBioStatus);
          // this.alert.show(queryBioStatus.err_msg).then(() => reject(queryBioStatus));
        }
      } catch (errorStatus) {
        reject(errorStatus);
        // this.alert.show(errorStatus.err_msg).then(() => reject(errorStatus));
      }
    });
  }

  // 狀態碼轉換
  translateBioStatus(bio_obj){
    let msg = bio_obj.err_msg;
    let bio_status = this._formateService.checkField(bio_obj, 'bio_status', { to_string: true, trim_flag: true });
    switch (bio_status) {
      case '0':
        msg = "BIOMETRICSTATUS.UNACTIVE"; // 未產製device token
        break;
      case '1':
        msg = "BIOMETRICSTATUS.ACTIVE"; // 已註冊使用
        break;
      case '2':
        msg = "BIOMETRICSTATUS.WAITEACTIVE"; // 生物辨識待啟用
        break;
      case '3':
        msg = "BIOMETRICSTATUS.MODIFYBIOLIB"; // 生物辨識庫已異動，請重新設定生物辨識
        break;
      case '9':
        msg = "BIOMETRICSTATUS.DISABLE"; // 生物辨識已停用
        break;
      case '-1':
        msg = "BIOMETRICSTATUS.NOTSUPPORT"; // 目前設備裝置不支援生物辨識
        break;
      default:
    }
    // 合併錯誤訊息
    bio_status = { ...bio_obj, ...{ "msg": msg, "content": msg, "title": "ERROR.TITLE", "app_error_code": bio_status} };
    return bio_status;
  }


  // 生物辨識註冊返回 token 值
  registerBiometric(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // 驗證裝置生物辨識狀態
        let biometricStatus = await this.getBiometricStatus();
        // 先註銷才能除新註冊
        try { await this.disableBioService(); } catch (err) { }
        // 產生生物辨識token
        let genBioToken = await this.biometricLib.generateBioToken(biometricStatus.showNoticeMsg);
        if (genBioToken.ret_code == '0' && genBioToken.bio_status == '2') {
          // device_token
          resolve({ "token": genBioToken.device_token });
        }
      } catch (errorStatus) {
        reject(errorStatus);
        // this.alert.show(errorStatus.err_msg).then(() => reject(errorStatus));
      }
    });
  }

  // 生物辨識簽章
  requestBioService(signObj): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (typeof signObj == 'object' && signObj) {

        try {
          // 驗證裝置生物辨識狀態
          let biometricStatus = await this.getBiometricStatus();
          // 確認生物辨識狀態開啟
          let queryBioStatus = await this.queryBioService();
          if (queryBioStatus.ret_code == '0' && queryBioStatus.bio_status == '1') {
            
            // 簽章物件轉字串
            let signString = JSON.stringify(signObj);
            // 在轉Base64 encode 
            let base64signString = await this._cryptoService.Base64Encode(signString);
            // this.logger.log('biometric-interface.service.ts Line 153 base64EnObj', base64signString);
            // let base64signString = '';
            // if (base64EnObj.error == '0' && base64EnObj.value){
            //   base64signString = base64EnObj.value;
            // }else{
            //   // 壓碼失敗
            //   reject(base64EnObj);
            //   return false;
            // }
            let requestBio = await this.biometricLib.requestBioService(biometricStatus.showNoticeMsg, base64signString);
            this.logger.log('biometric-interface.service.ts Line 162 requestBio', requestBio);
            if (requestBio.ret_code == '0') {
              // 簽章驗證成功
              // this.logger.log('biometric-interface.service.ts Line 162 requestBio success');
              resolve(requestBio);
              return false;
              
            } else {
              // 驗證失敗
              reject(requestBio);
              return false;
            }
          } else {
            queryBioStatus = this.translateBioStatus(queryBioStatus);
            reject(queryBioStatus);
            return false;
          }
        } catch (errorStatus) {
          this.logger.log('biometric-interface.service.ts Line 162 errorStatus', errorStatus);
          reject(errorStatus);
          return false;
        }

      } else {

        reject();
        return false;
      }
    });
  }




  // 查詢生物辨識狀態
  queryBioService(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let queryBioObj = await this.biometricLib.queryBioService();

        resolve(queryBioObj);
      } catch (error) {
        reject(error);
      }


    });
  }


  // 註銷生物辨識
  /*
    {
      ret_code : '0', 
      bio_status: '9',
      err_msg: ''
    }
  
  */
  disableBioService(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.biometricLib.disableBioService().then(
        (res) => {
          resolve(res);
        }
      ).catch((error) => {
        reject(error);
      });
    });
  }

  // 開啟生物辨識
  /*
    {
      ret_code : '0', 
      bio_status: '1',
      err_msg: ''
    }
   */
  enableBioService(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.biometricLib.enableBioService().then(
        (res) => {
          resolve(res);
        }
      ).catch((error) => {
        reject(error);
      });
    });
  }

}
