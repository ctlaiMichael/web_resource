/**
 * 版本檢核
 */
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { SPEC01030101ApiService } from '@api/spec01/spec01030101/spec01030101-api.service';
import { Logger } from '@systems/system/logger/logger.service';

@Injectable()
export class CheckVersionService {

  constructor(
    private _logger: Logger,
    private confirm: ConfirmService,
    private alert: AlertService,
    private spec01030101: SPEC01030101ApiService
  ) { }

  /**
   * 版本檢核
   */
  async checkVersion(): Promise<any> {
    return Promise.resolve({

    });
    // return this.spec01030101.getData({}).then(
    //   (res) => {
    //     this._logger.error('spec01030101 getData: ', res);
    //     if (res.hasOwnProperty('infoData')) {
    //       return Promise.resolve(res.infoData);
    //     }
    //   },
    //   (err) => {
    //     return Promise.reject(err);
    //   }
    // );

  }

  /**
   * 提示Store版本更新
   * @param storeData 
   *   forceupdateMain: 1主版本強制更新 、 2主版本柔性提醒 、 3主版本不更新
	 *   forceupdateSub:  1子版本強制更新 、 2子版本柔性提醒 、 3子版本不更新
   */
  async remindUpdate(storeData): Promise<any> {
    this._logger.error('remindStoreUpdate: ', storeData);
    let forceupdateMain = ObjectCheckUtil.checkObjectList(storeData, 'forceupdateMain');
    let forceupdateSub = ObjectCheckUtil.checkObjectList(storeData, 'forceupdateSub');

    if (forceupdateMain == '1') { 
      // 強制
      return this.alert.show('POPUP.NOTICE.VER_REMIND', { title: 'POPUP.NOTICE.TITLE' })
        .then(
          // () => this.startApp.startApp('scsb')
          () => { this._logger.error('強制更新STORE'); }
        );
    } else if (forceupdateMain == '2') { 
      // 柔性
      return this.confirm.show('POPUP.NOTICE.VER_REMIND', { btnYesTitle: 'POPUP.NOTICE.UPDATE_BTN', title: 'POPUP.NOTICE.TITLE' })
        .then(
          // () => this.startApp.startApp('scsb')
          () => { this._logger.error('使用者選擇更新APP STORE'); }
        ).catch(() => {
          this._logger.error('使用者選擇不更新APP STORE');
          this.remindDirect(forceupdateSub);
        });
    } else if (forceupdateMain == '3') {
      // 主版本不更新
      this._logger.error('主版本最新');
      this.remindDirect(forceupdateSub);
    }

  }

  remindDirect(force) {
    if (force == '1') { 
      // 強制
      return this.alert.show('資料同步', { title: '' })
        .then(() => {
          this._logger.error('強制同步APP');
          // window.location.replace(this.device.getCordovaFileApplicationDirectory() + loaderPath + queryString);
        });
    } else if (force == '2') {
      // 柔性
      return this.confirm.show('是否現在執行同步資料', { btnYesTitle: 'POPUP.CONFIRM.OK_BTN', btnNoTitle: 'POPUP.CONFIRM.CANCEL_BTN', title: 'POPUP.NOTICE.TITLE' })
        .then(() => {
          this._logger.error('使用者選擇同步APP');
          // window.location.replace(this.device.getCordovaFileApplicationDirectory() + loaderPath + queryString);
        })
        .catch(() => {
          this._logger.error('使用者選擇不同步APP');
          return Promise.resolve();
        });
    } else if (force == '3') {
      // 不更新
      return Promise.resolve();
    }

  }

  /**
   * 提示Store版本更新
   */
  // async remindStoreUpdate(storeData): Promise<any> {
  //   // const verRemind = this.systemParameter.get('verRemind');
  //   // logger.debug('verRemind:' + verRemind);
  //   // if (verRemind === '1') { // 0:不更新 1:更新版本
  //   // const confirmOpt = new ConfirmOptions();
  //   // confirmOpt.btnYesTitle = 'POPUP.NOTICE.UPDATE_BTN';
  //   // confirmOpt.title = 'POPUP.NOTICE.TITLE';
  //   // return this.confirm.show('POPUP.NOTICE.VER_REMIND', { btnYesTitle: 'POPUP.NOTICE.UPDATE_BTN', title: 'POPUP.NOTICE.TITLE' })
  //   //   // .then(() => this.startApp.startApp('tcbb'))
  //   //   .catch(() => {
  //   //     return;
  //   //   });
  //   // }

  //   let storeUpdate = ObjectCheckUtil.checkObjectList(storeData, 'store.update');
  //   let storeForce = ObjectCheckUtil.checkObjectList(storeData, 'store.force');

  //   if (storeUpdate != 'Y') {
  //     return Promise.resolve();
  //   }

  //   if (storeForce == 'Y') {
  //     return this.alert.show('POPUP.NOTICE.VER_REMIND', { title: 'POPUP.NOTICE.TITLE' })
  //       .then(
  //         // () => this.startApp.startApp('tcbb')
  //       );
  //   } else {
  //     return this.confirm.show('POPUP.NOTICE.VER_REMIND', { btnYesTitle: 'POPUP.NOTICE.UPDATE_BTN', title: 'POPUP.NOTICE.TITLE' })
  //       .then(
  //         // () => this.startApp.startApp('tcbb')
  //       )
  //       .catch(() => {
  //         return Promise.resolve();
  //       });
  //   }

  // }

  /**
   * DirectUpdate檢查->更新->RedirectToUpdate
   */
  async checkDirectUpdate(directData): Promise<any> {
    // logger.debug('checkDirectUpdate');
    if (!environment.DIRECTUPDATE) {
      return Promise.resolve();
    }

    // let directUpdateInformation = this.session.get('directUpdateInformation');
    // if (typeof directUpdateInformation === 'string' && directUpdateInformation !== '') {
    //   directUpdateInformation = JSON.parse(directUpdateInformation.replace(/\\/g, ''));
    // } else {
    //   return Promise.resolve();
    // }
    // // logger.debug('directUpdateInformation:' + JSON.stringify(directUpdateInformation));
    // if (typeof directUpdateInformation !== 'object') {
    //   return Promise.resolve();
    // }

    // // loader路徑
    // const loaderPath = 'www/index.html#';
    // // 要更新的資訊
    // const queryString = '?para_count=' + directUpdateInformation.para_count +
    //   '&para_path=' + directUpdateInformation.para_path +
    //   '&para_update=' + directUpdateInformation.para_update +
    //   '&para_force=' + directUpdateInformation.para_force;

    // if (directUpdateInformation.para_force === true) {
    //   // logger.debug('App Force Update'); // 強制更新
    //   return this.alert.show('資料同步', { title: '' })
    //     .then(() => {
    //       // logger.debug(window.location.href + loaderPath + queryString);
    //       // window.location.replace(this.device.getCordovaFileApplicationDirectory() + loaderPath + queryString);
    //     });
    // } else if (directUpdateInformation.para_update === true) {
    //   // logger.debug('App Need Update'); // 提示更新
    //   // const confirmOpt = new ConfirmOptions();
    //   // confirmOpt.btnYesTitle = 'POPUP.CONFIRM.OK_BTN';
    //   // confirmOpt.btnNoTitle = 'POPUP.CONFIRM.CANCEL_BTN';
    //   // confirmOpt.title = 'POPUP.NOTICE.TITLE';

    //   return this.confirm.show('是否現在執行同步資料', { btnYesTitle: 'POPUP.CONFIRM.OK_BTN', btnNoTitle: 'POPUP.CONFIRM.CANCEL_BTN', title: 'POPUP.NOTICE.TITLE' })
    //     .then(() => {
    //       // logger.debug(window.location.href + loaderPath + queryString);
    //       // window.location.replace(this.device.getCordovaFileApplicationDirectory() + loaderPath + queryString);
    //     })
    //     .catch(() => {
    //       return Promise.resolve();
    //     });
    // }

    let directUpdate = ObjectCheckUtil.checkObjectList(directData, 'direct.update');
    let directForce = ObjectCheckUtil.checkObjectList(directData, 'direct.force');

    if (directUpdate != 'Y') {
      return Promise.resolve();
    }

    if (directForce == 'Y') {
      return this.alert.show('資料同步', { title: '' })
        .then(() => {
          // window.location.replace(this.device.getCordovaFileApplicationDirectory() + loaderPath + queryString);
        });
    } else {
      return this.confirm.show('是否現在執行同步資料', { btnYesTitle: 'POPUP.CONFIRM.OK_BTN', btnNoTitle: 'POPUP.CONFIRM.CANCEL_BTN', title: 'POPUP.NOTICE.TITLE' })
        .then(() => {
          // window.location.replace(this.device.getCordovaFileApplicationDirectory() + loaderPath + queryString);
        })
        .catch(() => {
          return Promise.resolve();
        });
    }

  }

}
