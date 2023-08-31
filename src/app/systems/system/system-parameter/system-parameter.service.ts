/**
 * 取得Server系統參數
 */

import { Injectable } from '@angular/core';
import { SessionStorageService } from '@lib/storage/session-storage.service';
import { SYSTEM_PARAMS } from '@conf/system-params';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { SPEC00050101ApiService } from '@api/spec00/spec00050101/spec00050101-api.service';
import { logger } from '@util/log-util';
import { FormateService } from '@template/formate/formate.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { Logger } from '../logger/logger.service';

@Injectable({
  // 全ＡＰＰ只有一個
  providedIn: 'root'
})
export class SystemParameterService {
  paramters = {};

  constructor(
    private sessionStorage: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spec00050101ApiService: SPEC00050101ApiService,
    private _logger: Logger,
    protected _formateService: FormateService
  ) {
    this.paramters = this.sessionStorage.getObj('SystemParameter') || {};
    // TODO 發電文至中台取回資料儲存
    // this._initEvent(); // 目前啟動流程會抓取paramters來半段是否需要初始化，此段流程先mark(F1000103輕量化機制)
  }

  // 之後不用sessionStorage時，註解第一行
  /**
   * 系統參數取得
   * @param key 
   * @param return_type true 回傳boolean, false(預設) 回傳資料值
   */
  get(key: string, return_type?: boolean) {
    this.paramters = this.sessionStorage.getObj('SystemParameter') || {};
    let output = this.paramters[key];
    if (typeof return_type !== 'undefined' && return_type === true) {
      output = (output && (output !== 'N')) ? true : false;
    }
    return output;
  }
  // 之後不用sessionStorage時，註解第二行
  set(key: string, data: any) {
    this.paramters[key] = data;
    this.sessionStorage.setObj('SystemParameter', this.paramters);
    if (key == 'maintain') {
      this.localStorageService.setObj('maintain', data); // 停機公告
    }
  }


  /**
   * local 系統參數設定
   * (啟動一定透過angular 4)
   */
  private _initEvent() {
    if (typeof SYSTEM_PARAMS === 'object' && SYSTEM_PARAMS) {
      this.paramters = ObjectUtil.clone(SYSTEM_PARAMS);
      this.sessionStorage.setObj('SystemParameter', this.paramters);
    }
  }

  /**
   * 取得伺服器系統參數與APP系統參數資訊
   */
  getData(): Promise<any> {
    let option = {
      'background': true
    };
    return Promise.resolve({});
    // [TODO:] Look api not ready
    // return this.spec00050101ApiService.getData({}, option).then(
    //   (resObj) => {
    //     let res = this._formateService.checkObjectList(resObj, 'infoData');
    //     if (typeof res != undefined) {
    //       let key: any;
    //       for (key in res) {
    //         this.set(key, res[key]);
    //       }
    //     }
    //     return Promise.resolve(res);
    //   },
    //   (err) => {
    //     this._logger.log('get systemparam error');
    //     return Promise.reject(err);
    //   }
    // );
  }

}
