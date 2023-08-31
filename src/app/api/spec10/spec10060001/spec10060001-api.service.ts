/**
 * API: SPEC10060001-外幣匯率查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC10060001Req } from './spec10060001-req';
// -- Other Library -- //

@Injectable()
export class SPEC10060001ApiService extends ApiBaseService {
    protected serviceId = 'SPEC10060001'; // API Name

    getData(reqData?: object, option?: object): Promise<any> {

        let sendObj = new ApiRequestOption(SPEC10060001Req, {
            'reqData': reqData
        });
        // 欄位檢核


        // 修改request
        // let update_req = {};
        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    responseTime: '', // 查詢回應時間
                    dataTime: '', // 資料時間
                    data: [],
                    nonCashData: [], // 非現金幣別array
                    cashData: [], // 現金幣別array
                    currencyData: [], // 全部幣別array 排除台幣
                    list: {}, // 全部幣別object 排除台幣
                    foreignTransCurrencyList: {}, // 外幣兌換功能的幣別object
                    foreignTransCurrencyData: [], // 外幣兌換功能的幣別array
                    currencyConverterList: {}, // 幣別兌換試算功能的幣別object
                    currencyConverterData: [], // 幣別兌換試算功能的幣別array
                    exchangeNoticeList: {}, // 匯率到價通知功能的幣別object
                    exchangeNoticeData: [] // 匯率到價通知功能的幣別array
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();
                output.responseTime = resObj.getResponseTime();
                let resData = resObj.getData();
                output.dataTime = this._formateService.checkField(resData, 'dataTime');

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC10060001_SERVER_REP');
                }

                let modify_data = this._formateService.checkObjectList(resData, 'rowData');
                if (modify_data) {
                    output.data = modify_data;
                    let CNY_sellRate = '';
                    let CNH_sellRate = '';
                    let CNY_buyRate = '';
                    let CNH_buyRate = '';
                    let twd_ccy = ['TWD', 'NTD', 'NT$'];
                    output.data.forEach(item => {
                        // 需要資料整理
                        let sub_list = {
                            order: -1,
                            order_app: -1,
                            order_app2: -1, // 匯率到價知
                            currencyCode: this._formateService.checkField(item, 'currencyCode'),
                            currencyCodeShow: this._formateService.checkField(item, 'currencyCode'),
                            currencyName: this._formateService.checkField(item, 'currencyName'),
                            currencyNameShow: this._formateService.checkField(item, 'currencyName'),
                            category: this._formateService.checkObjectList(item, 'category'),
                            buyRate: this._formateService.checkObjectList(item, 'buyRate'),
                            sellRate: this._formateService.checkObjectList(item, 'sellRate'),
                            weight: this._formateService.checkObjectList(item, 'currencyWeight.weight'),
                            bonus: this._formateService.checkObjectList(item, 'currencyWeight.bonus'),
                            customerDiscountRate: this._formateService.checkObjectList(item, 'currencyWeight.customerDiscountRate'),
                            employeeDiscountRate: this._formateService.checkObjectList(item, 'currencyWeight.employeeDiscountRate')
                        };
                        // 排序處理
                        sub_list.order_app = this._formateService.getCurrencyOrder(sub_list.currencyCode, 'default');
                        sub_list.order_app2 = this._formateService.getCurrencyOrder(sub_list.currencyCode, 'exchange_notice');
                        let order_server = this._formateService.checkField(item, 'order');
                        if (!!order_server) {
                            // tslint:disable-next-line:radix
                            sub_list.order = parseInt(order_server);
                        }
                        item['order'] = sub_list.order;
                        item['order_app'] = sub_list.order_app;
                        item['order_app2'] = sub_list.order_app2;
                        
                        let isTwd = (twd_ccy.indexOf(sub_list.currencyCode) > -1) ? true : false;
                        if (sub_list.currencyCode == 'USD (>10K)') {
                            sub_list.currencyCodeShow = 'USD (>=10K)';
                        }
                        if (sub_list.category == '0') { // 即期匯率
                            if (!isTwd) {
                                // 非台幣才顯示處理
                                output.nonCashData.push(sub_list);
                            }
                            if (sub_list.currencyCode != 'USD (<10K)' && sub_list.currencyCode != 'CNY') {
                                if (sub_list.currencyCode == 'USD (>10K)') {
                                    let temp = this._formateService.transClone(sub_list);
                                    temp.currencyCode = 'USD';
                                    temp.currencyCodeShow = 'USD';
                                    temp.currencyNameShow = '美金';
                                    output.exchangeNoticeData.push(temp);
                                    output.exchangeNoticeList[temp.currencyCode] = temp;
                                } else if (sub_list.currencyCode == 'CNH') {
                                    let temp = this._formateService.transClone(sub_list);
                                    temp.currencyCodeShow = 'CNY';
                                    temp.currencyNameShow = '人民幣';
                                    output.exchangeNoticeData.push(temp);
                                    output.exchangeNoticeList[temp.currencyCode] = temp;
                                } else {
                                    output.exchangeNoticeData.push(sub_list);
                                    output.exchangeNoticeList[sub_list.currencyCode] = sub_list;
                                }
                            }
                            if (sub_list.currencyCode != 'KRW' && sub_list.currencyCode != 'CNY' && sub_list.currencyCode != 'CNH') {
                                if (sub_list.currencyCode == 'USD (>10K)') {
                                    let temp = this._formateService.transClone(sub_list);
                                    temp.currencyCode = 'USD';
                                    temp.currencyCodeShow = 'USD';
                                    temp.currencyName = '美金';
                                    temp.currencyNameShow = '美金';
                                    output.foreignTransCurrencyList[temp.currencyCode] = temp;
                                }
                                output.foreignTransCurrencyData.push(sub_list);
                                output.foreignTransCurrencyList[sub_list.currencyCode] = sub_list;
                            }
                        } else if (sub_list.category == '1') { // 現金匯率
                            if (!isTwd) {
                                // 非台幣才顯示處理
                                output.cashData.push(sub_list);
                            }
                        }
                        if (sub_list.currencyCode != 'CNY') { // 排除在岸人民幣
                            output.currencyConverterData.push(sub_list);
                            output.currencyConverterList[sub_list.currencyCode] = sub_list;
                        }

                        if (!isTwd) { // 排除台幣
                            output.list[sub_list.currencyCode] = sub_list;
                            output.currencyData.push(sub_list);
                        }

                        if (sub_list.currencyCode == 'CNY') {
                            CNY_sellRate = sub_list.sellRate;
                            CNY_buyRate = sub_list.buyRate;
                        } else if (sub_list.currencyCode == 'CNH') {
                            CNH_sellRate = sub_list.sellRate;
                            CNH_buyRate = sub_list.buyRate;
                        }
                    });

                    if (typeof output.list['CNY'] != 'undefined' && typeof output.list['CNH'] != 'undefined') {
                        let temp = this._formateService.transClone(output.list['CNY']);
                        temp.currencyNameShow = '人民幣';
                        if (parseFloat(CNY_sellRate) < parseFloat(CNH_sellRate)) {
                            temp.sellRate = CNY_sellRate;
                        } else {
                            temp.sellRate = CNH_sellRate;
                        }

                        if (parseFloat(CNY_buyRate) >= parseFloat(CNH_buyRate)) {
                            temp.buyRate = CNY_buyRate;
                        } else {
                            temp.buyRate = CNH_buyRate;
                        }
                        output.foreignTransCurrencyData.push(temp);
                        output.foreignTransCurrencyList['CNY'] = temp;
                    } else if (typeof output.list['CNY'] != 'undefined') {
                        let temp = output.list['CNY'];
                        temp.currencyNameShow = '人民幣';
                        output.foreignTransCurrencyData.push(temp);
                        output.foreignTransCurrencyList['CNY'] = temp;
                    } else if (typeof output.list['CNH'] != 'undefined') {
                        let temp = output.list['CNH'];
                        temp.currencyCode = 'CNY';
                        temp.currencyCodeShow = 'CNY';
                        temp.currencyNameShow = '人民幣';
                        output.foreignTransCurrencyData.push(temp);
                        output.foreignTransCurrencyList['CNY'] = temp;
                    }

                    // 排序處理(目前以APP內設定為主,再以server為主)
                    output.exchangeNoticeData = this._formateService.transArraySort(output.exchangeNoticeData
                        , { sort: ['order'], reverse: 'ASC' });
                }

                if (!this._checkService.checkEmpty(output.data, true)) {
                    return this.returnError({
                        content: 'ERROR.EMPTY'
                    }, 'SPEC10060001_SERVER_REP');
                }

                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(errorObj);
            }
        );
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}
