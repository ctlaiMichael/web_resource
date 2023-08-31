/**
 * 頁面轉址
 */
import { Injectable } from '@angular/core';
import { SessionStorageService } from '@lib/storage/session-storage.service';
import { CommonUtil } from '@util/common-util';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { logger } from '@util/log-util';

@Injectable()
export class UrlSchemeHandlerService {

  constructor(
    private session: SessionStorageService,
    private navCtrl: NavgatorService
  ) { }

  /**
   * 由外部呼叫執行uriScheme
   * @param url urlScheme
   */
  executeScheme(url: string) {
    const inited = this.session.get('init');
    // 等待初始完成
    if (!!inited && inited === 'Y') {
      logger.debug('execute scheme...');
      this.execute(url);
    } else {
      CommonUtil.wait(1000).then(() => {
        logger.debug('executeScheme waiting...');
        this.executeScheme(url);
      });
      return;
    }
  }

  /**
   * 執行url scheme處理
   * @param scheme
   */
  execute(scheme: string) {

    // modify chengwie for 投資了才導頁190916
    // TODO decode && redirect
    let schemeTitle = scheme.substr(0, scheme.indexOf(':'));
    let schemeData = scheme.substr(scheme.indexOf('?') + 1, scheme.length);
    logger.debug('schemeTitle', schemeTitle);
    logger.debug('schemeData', schemeData);
    let urlObj = {
      url: scheme,
      'schemeData': schemeData
    };
    // switch (schemeTitle) {
    //   case 'demo':
    //     this.navCtrl.push('home', {}, urlObj);
    //     break;
    //   default:
    //     break;
    // }
    logger.debug('scheme:', scheme);
    // return scheme;
  }
}
