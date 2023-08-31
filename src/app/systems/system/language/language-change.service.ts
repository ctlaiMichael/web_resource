/**
 * 語言切換Service
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE_SET } from '@conf/language';
import { FormateService } from '@template/formate/formate.service';
import { CacheService } from '../cache/cache.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';

@Injectable({
  // 全ＡＰＰ只有一個
  providedIn: 'root'
})

export class LanguageChangeService {
  /**
   * 參數處理
   */

  constructor(
    private translate: TranslateService,
    private _formate: FormateService,
    private cache: CacheService,
    private localStorage: LocalStorageService
  ) {
  }

  /**
   * 取得語言設定檔
   */
  getLanguageSet(key?: string) {
    let output = this._formate.transClone(LANGUAGE_SET);
    if (typeof key != 'undefined') {
      let item = this._formate.checkObjectList(output, 'list.' + key);
      return item;
    } else {
      return output;
    }
  }


  /**
   * 取得當前語系
   */
  getNowLanguage() {
    let output: any = {
      lang: '',
      data: {}
    };
    let lang = this.translate.currentLang;
    let lang_data = this.getLanguageSet(lang);
    output.lang = lang;
    output.data = lang_data;
    return output;
  }

  /**
   * 設定預設語言
   */
  setDefaultLanguage() {
    this.translate.addLangs(['en-us', 'zh-tw']);
    let dfLang = this.localStorage.get("customLanguage");
    if (!dfLang) {
      let browser_lang = this.translate.getBrowserLang();
      browser_lang = (typeof browser_lang == 'string') ? browser_lang : 'zh';
      if (browser_lang == 'zh') {
        // 全轉繁中
        dfLang = 'zh-tw';
      } else {
        // 全轉英文
        dfLang = 'en-us';
      }
    }

    this.translate.setDefaultLang(dfLang);
    let item = this.getLanguageSet(dfLang);
    this.changeLanguage(item);
  }

  /**
   * 變換語言
   * @param item 
   */
  changeLanguage(item) {
    let output = {
      lang: '',
      lang_old: '',
      data: item,
      need_change: false
    };

    let lang = this._formate.checkField(item, 'id');
    let langOldObj = this.getNowLanguage();
    const need_change = (langOldObj.lang != lang) ? true : false;

    if (need_change) {
      output.lang = lang;
      output.lang_old = langOldObj.lang;
      output.need_change = need_change;
      this.translate.use(lang);
      this.changeBodyClass(item, langOldObj.data);
      this.localStorage.set("customLanguage", lang);
      this.cache.clear('langChangeRemove');
      return output;
    }
    return output;
  }

  /**
   * 變換語系的class
   */
  changeBodyClass(item, item_old) {
    let set_class = this._formate.checkField(item, 'class');
    let rm_class = this._formate.checkField(item_old, 'class');

    // remove all語系相關class name
    if (!!rm_class && rm_class != '') {
      let body_list = document.body.classList;
      const class_key = 'bodyLang_';
      let i: any;
      if (!!body_list) {
        for (i = 0; i < body_list.length; i++) {
          if (!!body_list[i]) {
            let body_class = body_list[i];
            if (body_class.indexOf(class_key) != -1) {
              document.body.classList.remove(body_class);
            }
          }
        }
      }
    }

    // add 語系相關class name
    if (!!set_class && set_class != '') {
      document.body.classList.add(set_class);
    }
  }



  // --------------------------------------------------------------------------------------------
  //  ____       _            _         _____                 _
  //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
  //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
  //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
  //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
  // --------------------------------------------------------------------------------------------

}
