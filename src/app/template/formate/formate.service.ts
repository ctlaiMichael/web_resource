/**
 * 常用formate功能
 * 其他請直接使用Util
 */
import { Injectable } from '@angular/core';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { DateUtil } from '@util/formate/date/date-util';
import { AmountUtil } from '@util/formate/number/amount-util';
import { MathUtil } from '@util/formate/number/math-util';
import { NumberUtil } from '@util/formate/number/number-util';
import { EmptyUtil } from '@util/formate/string/empty-util';
import { AccountMaskUtil } from '@util/formate/mask/account-mask-util';
import { UserMaskUtil } from '@util/formate/mask/user-mask-util';
import { FieldUtil } from '@util/formate/modify/field-util';
import { DateRangeUtil } from '@util/formate/date/date-range-util';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { UrlUtil } from '@util/formate/string/url-util';
import { CURRENCY_ORDER } from '@conf/currency';
// import { DatePipe } from '@angular/common';
// import { LangTransService } from 'app/shared/pipe/langTransPipe/lang-trans.service';

@Injectable({
  // 全ＡＰＰ只有一個
  providedIn: 'root'
})
export class FormateService {

  constructor(
    // private datePipe: DatePipe,
    // private _langTransService: LangTransService
  ) { }



  // --------------------------------------------------------------------------------------------
  //       ___.        __               __
  //   ____\_ |__     |__| ____   _____/  |_
  //  /  _ \| __ \    |  |/ __ \_/ ___\   __\
  // (  <_> ) \_\ \   |  \  ___/\  \___|  |
  //  \____/|___  /\__|  |\___  >\___  >__|
  //            \/\______|    \/     \/       PART_BOX: object
  // --------------------------------------------------------------------------------------------


  /**
   * 複製物件
   * @param value object
   * @param args
   */
  public transClone(value: any): any {
    return ObjectUtil.clone(value);
  }

  /**
   * object to array
   * @param set_obj 物件
   * @param args 參數
   */
  public transArrayFillter(set_obj: any, args?: any): any {
    return ObjectUtil.toArray(set_obj, args);
  }

  /**
   * 排序處理
   */
  public transArraySort(data: Array<any>, arg: any) {
    return ObjectUtil.sort(data, arg);
  }

  /**
   * 欄位檢核
   */
  public checkField(data: any, field: string | number, other_set?: object): string {
    return FieldUtil.checkField(data, field, other_set);
  }

  /**
   * 檢查物件
   * @param jsonObj 檢查物件
   * @param check_list 檢查層級
   * @param return_type 回傳類別
   */
  public checkObjectList(jsonObj: any, check_list: string, return_type?: string): any {
    return ObjectCheckUtil.checkObjectList(jsonObj, check_list, return_type);
  }

  /**
   * 尋找資料
   */
  public findKey(str: string | Array<string>, key: string, range?: Array<number>) {
    return FieldUtil.findKey(str, key, range);
  }

  public findIndexList(oldList: object, setField: object) {
    return ObjectCheckUtil.modifyFieldIndex(oldList, setField);
  }

  /**
   * 取得排序
   * @param currency 幣別代碼
   * @param data_type order類型
   */
  public getCurrencyOrder(currency, data_type?: string) {
    let order = -1;
    if (typeof currency != 'string') {
      return order;
    }
    if (!data_type) {
      data_type = 'default';
    }
    if (data_type != 'default' && !ObjectCheckUtil.checkObject(CURRENCY_ORDER, data_type)) {
      data_type = 'default';
    }
    let search_code = this.getFormateCurrencyCode(currency);
    let currency_order_list = this.checkObjectList(CURRENCY_ORDER, data_type, 'array');
    if (currency_order_list) {
      // this._logger.log('search', currency, search_code);
      order = currency_order_list.indexOf(search_code);
    }
    return order;
  }

  // --------------------------------------------------------------------------------------------
  //           __         .__
  //   _______/  |________|__| ____    ____
  //  /  ___/\   __\_  __ \  |/    \  / ___\
  //  \___ \  |  |  |  | \/  |   |  \/ /_/  >
  // /____  > |__|  |__|  |__|___|  /\___  /
  //      \/                      \//_____/   PART_BOX: string
  // --------------------------------------------------------------------------------------------

  /**
   * @param value 文字
   * 去除空白與段行
   */
  public transEmpty(value: string | number, type?: string): any {
    return EmptyUtil.done(value, type);
  }

  /**
   * 串接url參數
   * @param url_list url string array
   * @param params_list params string array
   */
  public mappingUrl(url_list: Array<string>, params_list?: Array<string>) {
    return UrlUtil.mappingUrl(url_list, params_list);
  }

  /**
   * 取得格式化後的幣別代碼
   * @param currency 
   * CNY CASH => CNY_CASH
   */
  public getFormateCurrencyCode(currency: string) {
    if (typeof currency != 'string') {
      return currency;
    }
    let currency_set = currency.toLocaleUpperCase();
    return EmptyUtil.trimAll(currency, '_');
  }

  // --------------------------------------------------------------------------------------------
  //                     ___
  //   ____  __ __  _____\_ |__   ___________
  //  /    \|  |  \/     \| __ \_/ __ \_  __ \
  // |   |  \  |  /  Y Y  \ \_\ \  ___/|  | \/
  // |___|  /____/|__|_|  /___  /\___  >__|
  //      \/            \/    \/     \/       PART_BOX: number
  // --------------------------------------------------------------------------------------------

  /**
   * 數值轉換
   * @param value 數值字串
   * @param doParse 特殊處理
   */
  public transNumber(value: any, doParse?: any): any {
    return NumberUtil.toNumber(value, doParse);
  }

  /**
   * 金額格式化
   * @param value 金額
   * @param currency 幣別
   * 在處理金額的地方加上 htMoney:model.CUR_COD
   * model.CUR_COD為電文帶入的國家
   */
  public transMoney(value: any, currency?: any): any {
    return AmountUtil.amount(value, currency);
  }


  /**
   * 顯示幣別與金額
   * @param value
   * @param currency
   */
  public currencyAmount(value: any, currency?: any): any {
    return AmountUtil.currencyAmount(value, currency);
  }

  /**
   * @param value 文字
   * 金融資訊
   * xxxxx.xxxx
   */
  public transFinancial(value: any, set_data?: any): any {
    return NumberUtil.toFinancial(value, set_data);
  }

  /**
   * 隨機取亂數
   * @param max 指定最大值 
   */
  public getRandomInt(max: number) {
    return MathUtil.getRandomInt(max);
  }

  /**
   * 取得數值資訊
   * @param data 
   */
  getNumberInfo(data, pre_data?: any) {
    return NumberUtil.getNumberInfo(data, pre_data);
  }

  // --------------------------------------------------------------------------------------------
  //     ___       __
  //   __| _/____ _/  |_  ____
  //  / __ |\__  \\   __\/ __ \
  // / /_/ | / __ \|  | \  ___/
  // \____ |(____  /__|  \___  >
  //      \/     \/          \/   PART_BOX: number
  // --------------------------------------------------------------------------------------------


  /**
   * 日期transfer
   * @param value 日期
   * @param args 格式
   */
  public transDate(value: any, args?: any): any {
    return DateUtil.transDate(value, args);
  }

  /**
   * 日期transfer (民國年轉為西元年)
   * @param value 日期
   * @param args 格式
   */
  public transChinDate(value: string, args?: string): any {
    return DateUtil.transChinDate(value, args);
  }

  /**
   * 取得日期範圍資訊
   * @param value 基準日
   * @param args 其他條件
   *      returnType: 依照設定格式，所有日期格式會轉成DateUtil.transDate的回傳格式(預設date)
   *      rangeType: M 月份, D 日期
   *      rangeNum: 差異時間(負值代表計算最小日，正值代表計算最大日)
   *      rangeBaseDate: 當rangeType為M時，的基礎日期
   */
  public transDateRange(value: any, args?: any) {
    return DateRangeUtil.getRange(value, args);
  }



  // --------------------------------------------------------------------------------------------
  //   /\/\    /_\  / _\  /\ /\
  //  /    \  //_\\ \ \  / //_/
  // / /\/\ \/  _  \_\ \/ __ \
  // \/    \/\_/ \_/\__/\/  \/ PART_BOX: mask
  // --------------------------------------------------------------------------------------------


  /**
   * 本行帳號遮碼
   * @param value 帳號
   * @param type 遮碼類型
   *  (default) dddd-ddd-dddddddddddd
   *  mask: dddd-***-***ddd
   */
  public transAccount(value: string, type?: string): string {
    let check_type = (type && type != '') ? type : '';
    switch (check_type) {
      case 'mask':
        return AccountMaskUtil.account(value);
      default:
        return AccountMaskUtil.accountNoFormate(value);
    }
  }


  /**
   * 信用卡號號遮碼
   * @param value 信用卡號
   */
  public transCard(value: string): string {
    return AccountMaskUtil.card(value);
  }


  /**
   * 身分證遮碼
   * @param value 身分證
   */
  public transIdentity(value: string): string {
    return UserMaskUtil.identity(value);
  }

  /**
   * mail遮碼
   * @param value mail
   */
  public transEmail(value: string): string {
    return UserMaskUtil.email(value);
  }

  // --------------------------------------------------------------------------------------------
  //  ____       _            _         _____                 _
  //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
  //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
  //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
  //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__| PART_BOX: private
  // --------------------------------------------------------------------------------------------


}

