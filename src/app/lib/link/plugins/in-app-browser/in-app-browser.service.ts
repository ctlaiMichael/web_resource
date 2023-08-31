import { Injectable } from '@angular/core';
import { CordovaService } from '@conf/cordova/cordova.service';
import { InAppBrowserOption } from './in-app-browser-option';
import { InAppBrowserConfirm } from './in-app-browser-confirm';
import { Sites } from '@conf/external-web';
import { environment } from '@environments/environment';
declare var cordova: any;
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { ConfirmOptions } from '@template/msg/confirm/confirm-options';
import { logger } from '@util/log-util';

@Injectable()
export class InAppBrowserService extends CordovaService {

  constructor(
    private confirm: ConfirmService
  ) {
    super();
  }

  isLoggedIn() {
    if (!!sessionStorage.userInfo) {
      const userInfo = JSON.parse(sessionStorage.userInfo);
      return !!userInfo.custId && !!userInfo.userId;
    }
    return false;
  }

  /**
   * 以設定方式開啟網頁
   * @param web 網頁設定檔
   */
  openWeb(sitesName: string, urlParams?: any): Promise<any> {
    let output = {
      status: false,
      msg: '',
      loginRequired: false
    };

    const web = Sites[sitesName];

    if (!web) {
      logger.debug('sitesName not find:' + sitesName);
      output.msg = 'ERROR.PATH_NOT_EXIST';
      return Promise.reject(output);
    }

    if (!!web.loginRequired && !this.isLoggedIn()) {
      output.loginRequired = true;
      return Promise.reject(output);
    }

    let send_url = web.url;

    if (typeof urlParams === 'object') {
      const urlPar = Object.keys(urlParams).map((key) => {
        return key + '=' + urlParams[key];
      }).join('&');
      send_url = send_url + urlPar;
      // window.open(send_url);
      // output.status = true;
      // return Promise.resolve(output);
    }
    
    logger.debug('open site:' + sitesName);
    return this.open(send_url, web.target, web.option, web.confirmOptions).then(
      () => {
        output.status = true;
        return Promise.resolve(output);
      },
      () => {
        // ?
        return Promise.reject(output);
      }
    );

  }

  private showConfirm(confirmPopup: InAppBrowserConfirm): Promise<any> {
    const confirmOpt = new ConfirmOptions();
    confirmOpt.btnNoTitle = 'POPUP.CONFIRM.CANCEL_BTN';
    confirmOpt.btnYesTitle = 'POPUP.WEB_OPEN.GO_BTN';
    confirmOpt.title = (!!confirmPopup.title) ? confirmPopup.title : 'POPUP.NOTICE.TITLE';
    return this.confirm.show(confirmPopup.context, confirmOpt).then(() => {
      return;
    }).catch(() => {
      return Promise.reject('');
    });
  }

  /**
   * 開啟網址
   * @param url 開啟網址
   * @param target 開啟方式_self(本身)/_blank(InApp)/_system(系統)
   * @param options 其他設定
   */
  open(url: string, target: string, options?: InAppBrowserOption, confirmPopup?: InAppBrowserConfirm) {
    if (target === '_self') {
      window.location.replace(url);
      return Promise.resolve();
    }
    let btnFontSize = 20;
    // 樣式
    let option = {
      
      statusbar: {
        color: '#000000'
       },
      toolbar: {
        height: 44,
        color: '#f74f0d'
      },
      title: {
        color: '#bae3e0',
        showPageTitle: true
      },

      closeButton: {
        // btnName: 'CLOSE',
        wwwImage: '/assets/images/browser_i_close.png',
        align: 'right',
        event: 'closePressed',
        btnSize: btnFontSize
      },

      forwardButton: {
        wwwImage: '/assets/images/browser_i_select_right.png',
        // imagePressed: 'forward_pressed',
        align: 'left',
        event: 'forwardPressed',
        height: 30
       },
       backButton: {
        wwwImage: '/assets/images/browser_i_select_left.png',
        // imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed',
        height: 30
      },
      // backButtonCanClose: true,
      disableAnimation: false,
      // fullscreen: false
      // hidden : true
    };

    return this.onDeviceReady.then(() => {
        if (!!confirmPopup && !!confirmPopup.context) {
          return this.showConfirm(confirmPopup);
        } else {
          return Promise.resolve();
        }
      }).then(() => {
        logger.debug('open :', url, target);
        if (environment.NATIVE) {
          // return cordova.InAppBrowser.open(url, target, 'enableViewportScale=yes,closebuttoncaption=X');
          cordova.ThemeableBrowser.open(url, target,option);
          return Promise.resolve();
        } else {
          window.open(url);
          return Promise.resolve();
        }
      }).catch(() => {
        return;
      });
  }

  /**
   * InApp方式開啟網址
   * @param url 開啟網址
   * @param options 其他設定
   */
  innAppOpen(url: string, options?: InAppBrowserOption) {
    return this.open(url, '_blank', options);
  }

  /**
   * oout App方式開啟網址
   * @param url 開啟網址
   * @param options 其他設定
   */
  outAppOpen(url: string, options?: InAppBrowserOption) {
    return this.open(url, '_system', options);
  }

}
