import { Injectable } from '@angular/core';
import { CordovaService } from '@conf/cordova/cordova.service';
import { environment } from '@environments/environment';
import { FieldUtil } from '@util/formate/modify/field-util';
import { logger } from '@util/log-util';
import { Logger } from '@systems/system/logger/logger.service';

/*
enableHighAccuracy： 當為true時，提供一個準確性較高的方法，例如衛星定位。
timeout(毫秒)：call method到成功(success)允許的最長時間，超過設定時間即報錯，預設5000。 
maximumAge(毫秒)：位置的緩存時間小於設定時間，接受緩存的位置座標。意思是位置資訊在緩存裡的時間很短的話，可直接接受(時間很短位置不會差太多)，預設3000。
latitude：緯度
longitude：經度
altitude：海拔
accuracy：經緯度的精度，以米為單位
altitudeAccuracy：海拔的精度，以米為單位(Android devices, returning null)
heading：行進的方向，以正北為基準，順時針計算角度
speed：現行device的移動速度，單位m/s
timestamp：時間戳記
*/ 
declare var cordova: any;
@Injectable()
export class GeolocationPluginService extends CordovaService {
    public getCurrentPosition(maxiMumAge?, timeOut?): Promise<any> {
        if (environment.NATIVE) {
          return this.onDeviceReady
            .then(() => new Promise((resolve, reject) => {
              // 授權檢查，回傳false即是沒有授權
              const autSuccessEvent = (result) => {
                logger.error('GPS授權檢查有成功');
                if (!result) {
                  logger.error('沒有提供GPS權限');
                  // alert('沒有提供GPS權限');
                  return resolve(result);
                }
            };
            // GPS檢查，只要回傳false即是GPS未開啟
            const successEvent = (result) => {
              logger.error('GPS是否開啟檢查有成功');
              if (!result) {
                logger.error('沒開啟GPS');
                // alert('GPS未開啟');
                return resolve(result);
              }
          };
            //GPS授權或是GPS開啟檢查失敗
            const errorEvent = (result) => {
                logger.error('失敗');
                return reject(result);
            };
            //檢查是否有GPS授權
              if (typeof cordova.plugins.diagnostic !== 'undefined' && typeof cordova.plugins.diagnostic['isLocationAuthorized'] !== 'undefined') {
                cordova.plugins.diagnostic.isLocationAuthorized(autSuccessEvent, errorEvent);
              } else {
                logger.error('Error IN Htframework isLocationAuthorized undefined!(檢查gps是否授權的PLugIn未定義)')
                    if (typeof autSuccessEvent === 'function') {
                          autSuccessEvent(false);
                    }
            }
            //檢查GPS是否開啟
            if (typeof cordova.plugins.diagnostic !== 'undefined' && typeof cordova.plugins.diagnostic['isLocationAvailable'] !== 'undefined') {
              cordova.plugins.diagnostic.isLocationAvailable(successEvent, errorEvent);
            } else {
              logger.error('Error IN Htframework isLocationAvailable undefined!(檢查gps是否開啟的PLugIn未定義)')
                  if (typeof successEvent === 'function') {
                        successEvent(false);
                    }
            }

              let obj = {
                latitude: '',
                longitude: '',
                accuracy: '',
                altitude: '',
                altitudeAccuracy: '',
                heading: '',
                speed: '',
                timestamp: '',
              };
              var onSuccess = (position) => {
    
                obj.latitude = position.coords.latitude;
                obj.longitude = position.coords.longitude;
                obj.altitude = position.coords.altitude;
                obj.accuracy = position.coords.accuracy;
                obj.altitudeAccuracy = position.coords.altitudeAccuracy;
                resolve(obj)
              };
    
              // onError Callback receives a PositionError object
              var onError = (error) =>{
                reject(error);
              };
       // 取得衛星定位的資訊method，將先前宣告的引數代入，第三個引數是optional
              navigator.geolocation.getCurrentPosition(onSuccess, onError,
                { maximumAge: (!!maxiMumAge) ? maxiMumAge : 3000, timeout: (!!timeOut) ? timeOut : 5000,
                 enableHighAccuracy: false });
            }));
        }
        else {
          return Promise.resolve({
            latitude: '24.1504536',
            longitude: '120.68325279999999',
            accuracy: '',
            altitude: '1788',
            altitudeAccuracy: '',
            heading: '',
            speed: '',
            timestamp: '1555480876992',
          });
        }
      }
}