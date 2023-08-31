import { Injectable } from '@angular/core';
import { CordovaService } from '@conf/cordova/cordova.service';
import { environment } from 'environments/environment';
import { SessionStorageService } from '@lib/storage/session-storage.service';
import { FormateService } from '@template/formate/formate.service';
import { TranslateService } from '@ngx-translate/core';

declare var HiBiometricAuth: any;

@Injectable()
export class BiometricLibService extends CordovaService {
  constructor(
    private session: SessionStorageService,
    private _formateService: FormateService,
    private _translate: TranslateService,
  ) {

    super();
    document.addEventListener('pause', () => {
      this.session.setObj('bioDevicePause', true);
    }, false);

    document.addEventListener('resume', () => {
      this.session.setObj('bioDevicePause', false);
    }, false);
  }

  // 生物辨識元件回傳手機生物辨識狀態代碼 
  getBiometricAuthStatusCode(resObj) {
    let resCode = this._formateService.checkField(resObj, 'ret_code', { to_string: true, trim_flag: true });
    let bakObj = resObj;
    let msg = "";

    switch (resCode) {
      case '0':
        msg = "BIOMETRICAUTHRESULT.SUCCESS"; // 成功
        break;
      case '1':
        // 硬體設備不支援
        msg = "BIOMETRICAUTHRESULT.NOT_AVAILABLE";
        break;
      case '2':
        // 尚未啟用生物辨識
        msg = "BIOMETRICAUTHRESULT.SCREEN_LOCK_ERROR";
        break;
      case '3':
        // 尚未設定生物辨識
        msg = "BIOMETRICAUTHRESULT.HAS_ENROLLED_ERROR";
        break;
      case '5':
        // 尚未產製設備信物
        msg = "BIOMETRICAUTHRESULT.NO_TOKEN";
        break;
      case '6':
        // 尚未啟用驗證服務
        msg = "BIOMETRICAUTHRESULT.SERVCICE_DISABLE";
        break;
      case '7':
        // 已啟用驗證服務
        msg = "BIOMETRICAUTHRESULT.SERVICE_ENABLE";
        break;
      case '10':
        // 使用者取消
        msg = "BIOMETRICAUTHRESULT.USER_CANCELED";
        break;
      case '11':
        // 超過警告之驗證次數 (default 3)
        msg = "BIOMETRICAUTHRESULT.AUTH_WARNING";
        break;
      case '12':
        // 超過允許之驗證次數 (default 5)
        msg = "BIOMETRICAUTHRESULT.AUTH_ERROR";
        break;
      case '13':
        // 驗證功能被鎖住無法執行
        msg = "BIOMETRICAUTHRESULT.AUTH_LOCKED";
        break;
      case '-1':
        // 系統錯誤/作業系統錯誤訊息"
        msg = "BIOMETRICAUTHRESULT.SYSTEM_ERROR";
        msg = this._translate.instant(msg, { ERRORCODE: resCode });
        break;
      default:
        // 系統錯誤/作業系統錯誤訊息"
        msg = "BIOMETRICAUTHRESULT.SYSTEM_DEFAULT_ERROR";
        msg = this._translate.instant(msg, { ERRORCODE: resCode });
    }
    bakObj = { ...bakObj, ...{ "msg": msg, "content": msg, "title": "ERROR.TITLE", "app_error_code": resCode } };
    return bakObj;
  }

  /*
    *  裝置是否支援生物辨識
    *  回應資料:
    *  ret_code - 回傳值
    *  err_msg - 系統錯誤訊息
    *  value - 種類
    */

  public getBiometricStatus(): Promise<any> {
    if (environment.NATIVE) {
      let self = this;
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => {
          let returnRsolve = (returnObj) => { resolve(self.getBiometricAuthStatusCode(returnObj)); };
          let returnReject = (returnObj) => { reject(self.getBiometricAuthStatusCode(returnObj)); };
          HiBiometricAuth.getBiometricStatus(returnRsolve, returnReject);

        }
        ));
    } else {
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => resolve({
          'ret_code': '0',
          'err_msg': 'BIOMETRICAUTHRESULT.SUCCESS',
          'dev_type': 'T' // T指紋 F臉部 
        })));
    }
  }

  /*
  * 產製並儲存此裝置生物辨識信物
  * @param promptMessage popup msg
  * 回應資料:
  * ret_code - 回傳值
  * err_msg - 系統錯誤訊息
  * device_id - 設備識別碼
  * device_token - 設備註冊信物
  * bio_status - 啟用狀態
  */
  public generateBioToken(promptMessage): Promise<any> {
    if (environment.NATIVE) {
      let self = this;
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => {
          let returnRsolve = (returnObj) => { resolve(self.getBiometricAuthStatusCode(returnObj)); };
          let returnReject = (returnObj) => { reject(self.getBiometricAuthStatusCode(returnObj)); };
          HiBiometricAuth.generateBioToken(returnRsolve, (error) => {
            const isPause = this.session.get('bioDevicePause');
            if (!!isPause && isPause != 'false') {
              // reject(error);
            } else {
              error = self.getBiometricAuthStatusCode(error);
              reject(error);
            }
          }, promptMessage);
        }));
    } else {
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => resolve(
          {
            //  STATUS_EMPTY = 0;           //未啟用, 未產製device token
            //  STATUS_ENABLE = 1;          //已啟用
            //  STATUS_CREATE = 2;          //待啟用, 已產製 device token
            //  STATUS_INVALIDATED = 3;     //已失效
            //  STATUS_DISABLE = 9;         //已停用
            'bio_status': 2,
            'device_id': '91E29A6A-74FC-467B-A9D5-536FB0404CB9',
            'device_os': 'AN', // ANDROID
            'device_token': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1qbLTky8fM659sHBG+MVQPKZqkw5OEcth8ME3nzbz2xGadt819hFx6U8tDoWuMapLc1RPAZ1/u97nWs0NrVC6waDK5os20W2…',
            'device_version': '12.1',
            'err_msg': '',
            'ret_code': 0
          }
        )));
    }
  }

  /*
  * 啟用生物辨識驗證服務
  * @param listener
  * 回應資料:
  * ret_code - 回傳值
  * err_msg - 系統錯誤訊息
  * bio_status - 啟用狀態
  */
  public enableBioService(): Promise<any> {
    if (environment.NATIVE) {
      let self = this;
      return this.onDeviceReady.then(() => new Promise((resolve, reject) => {
        let returnRsolve = (returnObj) => { resolve(self.getBiometricAuthStatusCode(returnObj)); };
        let returnReject = (returnObj) => { reject(self.getBiometricAuthStatusCode(returnObj)); };
        HiBiometricAuth.enableBioService(returnRsolve, returnReject);
      }
      ));

    } else {
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => resolve(
          {
            'bio_status': 2,
            'err_msg': '',
            'ret_code': 0
          }
        )));
    }
  }

  /*
     * 停用生物辨識驗證服務
     * @param listener
     * 回應資料:
     * ret_code - 回傳值
     * err_msg - 系統錯誤訊息
     * bio_status - 啟用狀態
     */
  public disableBioService(): Promise<any> {
    if (environment.NATIVE) {
      let self = this;
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => {
          let returnRsolve = (returnObj) => { resolve(self.getBiometricAuthStatusCode(returnObj)); };
          let returnReject = (returnObj) => { reject(self.getBiometricAuthStatusCode(returnObj)); };
          HiBiometricAuth.disableBioService(returnRsolve, returnReject);
        }));
    } else {
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => resolve(
          {
            'bio_status': 9,
            'err_msg': '',
            'ret_code': 0
          }
        )));
    }
  }

  /*
     * 指紋辨識使用
     * @param txData custId + userId
     * @param promptMessage popup msg
     * 回應資料:
     * ret_code - 回傳值
     * err_msg - 系統錯誤訊息
     * device_id - 設備識別碼
     * mac_value - 驗證值
     */
  public requestBioService(promptMessage, txData): Promise<any> {
    if (environment.NATIVE) {
      let self = this;
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => {
          let returnRsolve = (returnObj) => { resolve(self.getBiometricAuthStatusCode(returnObj)); };
          let returnReject = (returnObj) => { reject(self.getBiometricAuthStatusCode(returnObj)); };
          HiBiometricAuth.requestBioService(returnRsolve, (error) => {
            const isPause = this.session.get('bioDevicePause');
            if (!!isPause && isPause != 'false') {
              // reject(error);
            } else {
              error = self.getBiometricAuthStatusCode(error);
              reject(error);
            }
          }, txData, promptMessage);
        }));
    } else {
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => resolve(
          {
            'device_id': '91E29A6A-74FC-467B-A9D5-536FB0404CB9',
            'err_msg': '',
            'ret_code': 0,
            // tslint:disable-next-line: max-line-length
            'mac_value': '52F04D77C68E705073531196E04FD0041C97FABFEC3C910DA1B7C2B1CD868D69208E41508DD4DA1702803C72D570BC1C1BE1BBFDF9AD785FD05E549A957E90E6216EB8649544…'
          }
        )));
    }
  }

  /*
     * 查詢生物辨識驗證服務資訊
     * @param listener
     * 回應資料:
     * ret_code - 回傳值
     * err_msg - 系統錯誤訊息
     * device_id - 設備識別碼
     * device_token - 設備註冊信物
     * bio_status - 啟用狀態
     */
  public queryBioService(): Promise<any> {
    if (environment.NATIVE) {
      let self = this;
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => {
          // let returnRsolve = (returnObj) => { resolve(self.getBiometricAuthStatusCode(returnObj)); };
          let returnReject = (returnObj) => { reject(self.getBiometricAuthStatusCode(returnObj)); };
          HiBiometricAuth.gueryBioService(resolve, returnReject);
        }

        ));
    } else {
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => resolve(
          {
            bio_status: 1,
            err_msg: '',
            ret_code: 0,
            device_id: '5DBF5F38-F99F-4E0E-96C8-3B62EABF458E',
            device_token: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwFviOy…O8YtW/9qWzwwd5BXlag8cGuoZnRwaHRmR3VpOu2wyzwIDAQAB'
          }
        )));
    }
  }

  /*
   * 指紋辨識使用
   * @param txData custId + userId
   * @param promptMessage popup msg
   * 回應資料:
   * ret_code - 回傳值
   * err_msg - 系統錯誤訊息
   * device_id - 設備識別碼
   * mac_value - 驗證值
   */
  public identifyByBiometric(promptMessage): Promise<any> {
    if (environment.NATIVE) {
      let self = this;
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => {
          let returnRsolve = (returnObj) => { resolve(self.getBiometricAuthStatusCode(returnObj)); };
          let returnReject = (returnObj) => { reject(self.getBiometricAuthStatusCode(returnObj)); };
          HiBiometricAuth.identifyByBiometric(returnRsolve, returnReject, promptMessage);

        }));
    } else {
      return this.onDeviceReady
        .then(() => new Promise((resolve, reject) => resolve({ret_code: '0'}
        )));
    }
  }
}
