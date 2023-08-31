/**
 * 帳戶總覽
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- config -- //
import { DEPOSIT_ACCOUNT_MENU } from '@conf/menu/home-menu';
// -- library -- //
import { TranslateService } from '@ngx-translate/core';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
// -- api -- //
import { SPEC05010101ApiService } from '@api/spec05/spec05010101/spec05010101-api.service';
import { MathUtil } from '@util/formate/number/math-util';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

@Injectable()

export class DepositOverviewService {
    /**
     * 參數處理
     */
    private setCacheName = {
        'list': 'deposit-overview', // 列表
    };
    private _mainData: any; // 資料暫存
    // 各帳戶別的功能選單
    private _accountMenu = DEPOSIT_ACCOUNT_MENU;


    constructor(
        private _logger: Logger,
        private _handleError: HandleErrorService,
        private _formateService: FormateService,
        private translate: TranslateService,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec05010101: SPEC05010101ApiService,
        private navgator: NavgatorService
    ) {
        this._mainData = {};
    }

    /**
     * 功能轉址
     * @param go_path 
     */
    onGoEvent(go_path, url_params?: any) {
        if (!go_path) {
            this._handleError.handleError({}, 'EMPTY_PATH');
            return false;
        }
        this.navgator.push(go_path, url_params);
    }

    /**
     * 刪除cache
     */
    removeAllCache() {
        let type = this.setCacheName.list;
        this._cacheService.removeGroup(type);
        this._mainData = {};
    }

    /**
     * 取得資產資料
     */
    getAllData(): Promise<any> {
        let option = {};
        const cache_key = this.setCacheName.list;
        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        if (cache_data) {
            this._mainData = cache_data;
            return Promise.resolve(cache_data);
        }

        return this.spec05010101.getData({}, option).then(
            (successObj) => {
                let modify = this.modifyMainData(successObj);
                let cache_option = this._cacheService.getCacheSet(cache_key);
                this._cacheService.save(cache_key, modify, cache_option);
                this._mainData = modify;
                this._logger.step('DeviceOverview', this._formateService.transClone(modify));
                return Promise.resolve(modify);
            },
            (failedObj) => {
                return Promise.reject(failedObj);
            }
        );
    }


    /**
     * 取得單一資產
     */
    async getDetail(dataType?: string): Promise<any> {
        try {
            if (!this._checkService.checkEmpty(this._mainData, true)) {
                let main_list = await this.getAllData();
            }
            if (!this._checkService.checkObject(this._mainData, dataType)) {
                this._logger.error('DeviceOverview', 'miss obj', dataType, this._formateService.transClone(this._mainData));
                let err = this._handleError.getErrorObj({}, '');
                return Promise.reject(err);
            }
            return Promise.resolve(this._mainData[dataType]);
        } catch (errorObj) {
            this._logger.error('DeviceOverview', 'error getDetail', errorObj);
            return Promise.reject(errorObj);
        }
    }
    
    /**
     * 取得選單
     * @param itemType 子項目資產群處類別
     * @param list 單一項目資訊
     * @param assetsType 資產群處類別
     */
    getMenu(itemType: string, itmeInfo: object, assetsType?: string) {
        this._logger.log('getMenu', itemType, itmeInfo);
        let accType = this._formateService.checkField(itmeInfo, 'accType'); // 帳號別
        let accountId = this._formateService.checkField(itmeInfo, 'accountId'); // 帳號
        if (assetsType == 'partTwd' && itemType == 'savingsAcctInfoData') {
            itemType = itemType + '_TWD';
        }
        let output = this._formateService.checkObjectList(this._accountMenu, itemType, 'array');
        if (!output) {
            output = [];
        }

        return output;
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 資料整理
     */
    private modifyMainData(allData) {
        this._logger.step('DeviceOverview', 'modify start');
        let jsonObj = this._formateService.checkObjectList(allData, 'allData');
        let output: any = {
            status: false,
            error: {},
            sourceData: jsonObj,
            memo: "", // 資產備註說明
            sumTotal: {},
            itemHave: false,
            itemList: []
        };

        // 中台回傳錯誤訊息
        output.memo = this._formateService.checkField(allData, 'msg');
        // 總資產
        output.sumTotal = this.modifyAssetsData(jsonObj);

        // 台幣帳戶
        output['partTwd'] = this.modifyPartTwd(jsonObj, 'partTwd');
        if (output['partTwd'].show) {
            output.itemList.push(output['partTwd']);
        }

        // 外幣帳戶
        output['partForeign'] = this.modifyPartForeign(jsonObj, 'partForeign');
        if (output['partForeign'].show) {
            output.itemList.push(output['partForeign']);
        }

        // 投資性資產
        output['partInvest'] = this.modifyPartInvest(jsonObj, 'partInvest');
        if (output['partInvest'].show) {
            output.itemList.push(output['partInvest']);
        }

        // 負資產
        output['partNegative'] = this.modifyPartNegative(jsonObj, 'partNegative');
        if (output['partNegative'].show) {
            output.itemList.push(output['partNegative']);
        }

        if (output.itemList.length > 0) {
            output.itemHave = true;
        }

        if (!output.itemHave && !output.sumTotal.status) {
            // 無資產資料
            output.status = false;
            output.error = this._handleError.getErrorObj({
                'content': output.memo
            }, 'SPEC05010101_EMPTY');
        } else {
            output.status = true;
        }

        return output;
    }

    /**
     * 整理單群資料
     * @param jsonObj 
     */
    private modifyItemData(jsonObj, typeName: string, ccy: string = 'TWD', total_info?: object) {
        let emptyStr = '- -';
        let output: any = {
            id: typeName,
            status: false,
            title: '',
            pathUrl: '', // 指定群組導頁功能
            haveAmt: false, // 是否有群組金額
            typeTotalBalance: emptyStr, // 群組金額
            amountInfo: {}, // 群組金額資訊
            amountPercent: 0, // 群組金額占單一資產的比例
            currency: ccy, // 幣別
            showAccount: false, // 是否有子項目
            account: [] // 子項目
        };
        let itemData = this._formateService.checkObjectList(jsonObj, typeName, 'object');
        if (!itemData) {
            return output;
        }
        let show_special_amount = false;
        let show_ccy = ccy;
        if (show_ccy == 'TWD_ABOUT') {
            show_special_amount = true;
            ccy = 'TWD';
            this.translate.get('FIELD.AMT_ABOUT').subscribe((i18nval) => {
                show_ccy = i18nval;
            });
        }

        let amount = this._formateService.checkField(itemData, 'typeTotalBalance');
        if (amount != '') {
            output.haveAmt = true;
            output.amountInfo = this._formateService.getNumberInfo(amount);
            output.typeTotalBalance = this._formateService.currencyAmount(amount, ccy);
            if (show_special_amount) {
                // 約當
                output.typeTotalBalance = show_ccy + '' + output.typeTotalBalance;
            }
            this._logger.step('DeviceOverview', 'item math start: amount=', amount, output.amountInfo);

            // percent計算
            let doTotal = this._checkService.checkObject(total_info); // 是否為物件，回傳boolean
            let total_abs = (doTotal) ? this._formateService.checkObjectList(total_info, 'abs') : 0;
            if (!total_abs) {
                doTotal = false;
                total_abs = 0;
            }
            this._logger.step('DeviceOverview', 'item math: doToal,totalabs =', doTotal, total_abs);

            if (doTotal) {
                output.amountPercent = MathUtil.toPercent(output.amountInfo.abs, total_abs);
                this._logger.step('DeviceOverview', '計算百分比', output.id, output.amountInfo.abs, total_abs, output.amountPercent);
            }


        } else {
            output.amountInfo = this._formateService.getNumberInfo(0);
        }
        let account = this._formateService.checkObjectList(itemData, 'account', 'array');
        if (account) {
            output.account = account;
            output.showAccount = true;
        }
        output.status = true;
        return output;
    }


    /**
     * 整理外幣的pipe資料 (特規)
     * @param jsonObj 
     */
    private modifyForeignCurrencyItemData(jsonObj, total_info?: object) {
        let ccy = this._formateService.checkField(jsonObj, 'currencyCode');
        if (!ccy) {
            ccy = '';
        }
        let typeName = 'Foreign_' + ccy;
        let emptyStr = '- -';
        let output: any = {
            id: typeName,
            status: false,
            title: ccy,
            pathUrl: '', // 指定群組導頁功能
            haveAmt: false, // 是否有群組金額
            typeTotalBalance: emptyStr, // 群組金額
            amountInfo: {}, // 群組金額資訊
            amountRealInfo: {}, // 群組金額資訊(原幣)
            amountPercent: 0, // 群組金額占單一資產的比例
            currency: ccy, // 幣別
            showAccount: false, // 是否有子項目
            account: [] // 子項目
        };
        let itemData = jsonObj;
        if (!itemData) {
            return output;
        }
        let show_ccy = ccy;
        this.translate.get('FIELD.AMT_ABOUT').subscribe((i18nval) => {
            show_ccy = i18nval;
        });

        let amount = this._formateService.checkField(itemData, 'balanceTwd'); // 折台金額
        if (amount != '') {
            output.haveAmt = true;
            output.amountInfo = this._formateService.getNumberInfo(amount);
            // 約當
            output.typeTotalBalance = show_ccy + '' + output.typeTotalBalance;
            // output.typeTotalBalance = this._formateService.currencyAmount(amount, ccy);
            this._logger.step('DeviceOverview', 'item math start: amount=', amount, output.amountInfo);

            // percent計算
            let doTotal = this._checkService.checkObject(total_info); // 是否為物件，回傳boolean
            let total_abs = (doTotal) ? this._formateService.checkObjectList(total_info, 'abs') : 0;
            if (!total_abs) {
                doTotal = false;
                total_abs = 0;
            }
            this._logger.step('DeviceOverview', 'item math(2): doToal,totalabs =', doTotal, total_abs);

            if (doTotal) {
                output.amountPercent = MathUtil.toPercent(output.amountInfo.abs, total_abs);
                this._logger.step('DeviceOverview', '計算百分比(2)', output.id, output.amountInfo.abs, total_abs, output.amountPercent);
            }
        } else {
            output.amountInfo = this._formateService.getNumberInfo(0);
        }
        let amountReal = this._formateService.checkField(itemData, 'balance'); // 原幣金額
        if (amountReal != '') {
            output.amountRealInfo = this._formateService.getNumberInfo(amountReal);
        } else {
            output.amountRealInfo = this._formateService.getNumberInfo(0);
        }

        output.status = true;
        return output;
    }

    /**
     * 依照設定置放chart
     * @param setData 
     * @param name chart的名稱 
     * @param total_info total info 
     */
    private modifyChartData(setData: Array<object>, name?: string) {
        let output = {
            status: false,
            type: "",
            labels: [],
            data: [],
            list: []
        };
        if (typeof name == 'string' && name != '') {
            output.type = name;
        }

        setData.forEach((item, item_index) => {
            let item_id = this._formateService.checkField(item, 'id');
            if (item_id == '') {
                item_id = item_index.toString();
            }
            let amountInfo = this._formateService.checkObjectList(item, 'amountInfo');
            if (!amountInfo) {
                amountInfo = {};
            }
            let title = this._formateService.checkField(item, 'title');
            let percent = this._formateService.checkObjectList(item, 'value');
            if (typeof percent != 'number') {
                percent = 0;
            }
            this.translate.get(title).subscribe((i18nval) => {
                title = i18nval;
            });
            if (!!title || !!percent) {
                let tmp: any = {
                    'id': item_id,
                    'title': title,
                    'percent': percent,
                    'amount': amountInfo,
                    'color': 'chart_color_20' // 預設顏色
                };
                output.labels.push(title);
                output.data.push(percent);
                output.list.push(tmp);
            }
            this._logger.step('DeviceOverview', '計算百分比 end', title, percent);
        });

        if (output.data.length > 0) {
            output.status = true;
        }
        // this._logger.step('DeviceOverview', '計算百分比 final', this._formateService.transClone(output));
        return output;
    }


    /**
     * 總資產整理
     * @param jsonObj 
     */
    private modifyAssetsData(jsonObj) {
        let output = {
            status: true, // 格式與內容檢核
            total: "",
            chart: {},
            // 正資產
            positiveName: 'DEPOSIT_OVERVIEW.POSITIVE',
            positiveInfo: {},
            positive: "",
            positivePercent: "- -",
            // 負資產
            negativeName: 'DEPOSIT_OVERVIEW.NEGATIVE',
            negativeInfo: {},
            negative: "",
            negativePercent: "- -"
        };
        let positive_field = this._formateService.checkField(jsonObj, 'positive');
        let negative_field = this._formateService.checkField(jsonObj, 'negative');
        if (positive_field == '' && negative_field == '') {
            output.status = false;
            return output;
        }

        let tmp_positive = this._formateService.getNumberInfo(this._formateService.checkField(jsonObj, 'positive'));
        let tmp_negative = this._formateService.getNumberInfo(this._formateService.checkField(jsonObj, 'negative'));
        // 沖正處理
        if (tmp_positive.isNegative && tmp_negative.isNegative) {
            this._logger.step('DeviceOverview', 'mainAssets 沖正處理: 互換');
            let positive_abs = tmp_positive.abs;
            let negative_abs = tmp_negative.abs;
            tmp_positive = this._formateService.getNumberInfo(negative_abs, tmp_positive);
            tmp_negative = this._formateService.getNumberInfo(positive_abs, tmp_negative);
        } else if (tmp_positive.isNegative) {
            this._logger.step('DeviceOverview', 'mainAssets 沖正處理: 全負債');
            let tmp_positive2: any = this._formateService.getNumberInfo(MathUtil.sum(tmp_positive.number, tmp_negative.abs), tmp_positive);
            tmp_positive = tmp_positive2;
            tmp_negative = this._formateService.getNumberInfo(0, tmp_negative);
        } else if (tmp_negative.isNegative) {
            this._logger.step('DeviceOverview', 'mainAssets 沖正處理: 全正值');
            let tmp_negative2: any = this._formateService.getNumberInfo(MathUtil.sum(tmp_negative.number, tmp_positive.abs), tmp_negative);
            tmp_negative = tmp_negative2;
            tmp_positive = this._formateService.getNumberInfo(0, tmp_positive);
        }

        output.positiveInfo = tmp_positive;
        output.negativeInfo = tmp_negative;
        // 整理
        output.positive = tmp_positive.source;
        output.negative = tmp_negative.source;
        let total_abs = MathUtil.sum(tmp_positive.abs, tmp_negative.abs); // 絕對值相加
        output.total = total_abs.toString();
        if (total_abs > 0) {
            let positivePercent = MathUtil.toPercent(tmp_positive.number, total_abs);
            let negativePercent = MathUtil.toPercent(tmp_negative.number, total_abs);
            output.positivePercent = positivePercent.toString() + '%';
            output.negativePercent = negativePercent.toString() + '%';
            // chart
            output.chart = this.modifyChartData([
                { id: 'positive', title: output.positiveName, value: positivePercent },
                { id: 'negative', title: output.negativeName, value: negativePercent }
            ], 'mainChart');
        }

        return output;
    }


    /**
     * 台幣資產整理
     * @param jsonObj 
     */
    private modifyPartTwd(jsonObj, partIndex) {
        let output: any = {
            id: 'partTwd',
            show: false,
            error: {},
            title: 'DEPOSIT_OVERVIEW.TITLE.PART_TWD', // 台幣帳戶
            title_header: 'DEPOSIT_OVERVIEW.TITLE.PART_TWD', // 台幣帳戶
            ccyAbout: '', // 約當
            currency: 'TWD',
            totalBalance: '',
            classSet: '',
            memo: '',
            data: {},
            chart: {},
            showChartColor: false,
            showItemAmount: true,
            itemHave: false,
            subItem: [] // 顯示的項目
        };
        let partData = this._formateService.checkObjectList(jsonObj, partIndex, 'object');
        if (!partData) {
            // 取得失敗
            output.error = this._handleError.getErrorObj({
                'content': output.memo
            }, 'SPEC05010101_SERVER_MISSOBJ');
            output.memo = output.error.content;
            return output;
        }
        output.data = partData;
        output.memo = this._formateService.checkField(partData, 'errorMsg');
        output.totalBalance = this._formateService.checkField(partData, 'totalBalance');
        if (output.totalBalance == '' && output.memo != '') {
            // 資料來源掛了
            output.error = this._handleError.getErrorObj({
                'content': output.memo
            }, 'SPEC05010101_EMPTY');
            output.memo = output.error.content;
            return output;
        }
        let mainChart = [];
        let total_info = this._formateService.getNumberInfo(output.totalBalance);

        // 支票存款 checkingAcctInfoData
        let dataA = this.modifyItemData(partData, 'checkingAcctInfoData', 'TWD', total_info);
        dataA['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_checkingAcct';
        if (dataA.haveAmt || dataA.showAccount) {
            output.subItem.push(dataA);
            mainChart.push({ id: dataA.id, title: dataA['title'], value: dataA.amountPercent, amountInfo: dataA.amountInfo });
        }
        // 活期 savingsAcctInfoData
        let dataB = this.modifyItemData(partData, 'savingsAcctInfoData', 'TWD', total_info);
        dataB['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_savingsAcct';
        if (dataB.haveAmt || dataB.showAccount) {
            output.subItem.push(dataB);
            mainChart.push({ id: dataB.id, title: dataB['title'], value: dataB.amountPercent, amountInfo: dataB.amountInfo });
        }
        // 定期存款 timeAcctInfoData
        let dataC = this.modifyItemData(partData, 'timeAcctInfoData', 'TWD', total_info);
        dataC['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_timeAcct';
        if (dataC.haveAmt || dataC.showAccount) {
            output.subItem.push(dataC);
            mainChart.push({ id: dataC.id, title: dataC['title'], value: dataC.amountPercent, amountInfo: dataC.amountInfo });
        }
        // 其他帳號 otherAcctInfoData (有才顯示區塊)
        let dataD = this.modifyItemData(partData, 'otherAcctInfoData', 'TWD', total_info);
        dataD['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_otherAcct';
        if (dataD.haveAmt || dataD.showAccount) {
            output.subItem.push(dataD);
            mainChart.push({ id: dataD.id, title: dataD['title'], value: dataD.amountPercent, amountInfo: dataD.amountInfo });
        }

        if (total_info.status) {
            // 資產有數值
            output.chart = this.modifyChartData(mainChart, output.id);
        }



        if (output.subItem.length > 0) {
            output.itemHave = true;
        }
        if (!output.itemHave && !total_info.status) {
            // 無資產資料
            output.show = false;
            output.error = this._handleError.getErrorObj({
                'content': output.memo
            }, 'SPEC05010101_EMPTY');
            output.memo = output.error.content;
        } else {
            output.show = true;
        }
        return output;
    }


    /**
     * 外幣資產整理
     * @param jsonObj 
     */
    private modifyPartForeign(jsonObj, partIndex) {
        let output = {
            id: 'partForeign',
            show: false,
            title: 'DEPOSIT_OVERVIEW.TITLE.PART_FOREIGN', // 外幣帳戶
            title_header: 'DEPOSIT_OVERVIEW.TITLE.PART_FOREIGN', // 外幣帳戶
            ccyAbout: 'FIELD.AMT_ABOUT', // 約當
            currency: 'TWD',
            totalBalance: '',
            classSet: '',
            memo: '',
            data: {},
            chart: {},
            showChartColor: false,
            showItemAmount: false,
            subItem: [], // 顯示的項目
            // 幣別清單資訊
            ccyList: {
                list: {},
                data: []
            }
        };
        let partData = this._formateService.checkObjectList(jsonObj, partIndex, 'object');
        if (!partData) {
            // 取得失敗
            return output;
        }
        output.data = partData;
        output.memo = this._formateService.checkField(partData, 'errorMsg');
        output.totalBalance = this._formateService.checkField(partData, 'totalBalance');
        if (output.totalBalance == '' && output.memo != '') {
            // 資料來源掛了
            return output;
        }
        let total_info = this._formateService.getNumberInfo(output.totalBalance);

        // 活期 savingsAcctInfoData
        let dataB = this.modifyItemData(partData, 'savingsAcctInfoData', 'TWD', total_info);
        dataB['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_savingsAcct';
        if (dataB.haveAmt || dataB.showAccount) {
            output.subItem.push(dataB);
        }
        // 定期存款 timeAcctInfoData
        let dataC = this.modifyItemData(partData, 'timeAcctInfoData', 'TWD', total_info);
        dataC['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_timeAcct';
        if (dataC.haveAmt || dataC.showAccount) {
            output.subItem.push(dataC);
        }
        // 其他帳號 otherAcctInfoData (有才顯示區塊)
        let dataD = this.modifyItemData(partData, 'otherAcctInfoData', 'TWD', total_info);
        dataD['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_otherAcct';
        if (dataD.haveAmt || dataD.showAccount) {
            output.subItem.push(dataD);
        }

        let mainChart = [];
        let currencyAssets = this._formateService.checkObjectList(partData, 'currencyList', 'array');
        currencyAssets = this._formateService.transArraySort(currencyAssets, { 
            'sort': 'value', 'reverse': 'DESC', 'special': 'balanceTwd'
        });
        if (!!currencyAssets) {
            currencyAssets.forEach(item => {
                let tmp_data = this.modifyForeignCurrencyItemData(item, total_info);
                output.ccyList['list'][tmp_data.id] = tmp_data;
                output.ccyList['data'].push(tmp_data);
                if (tmp_data.haveAmt) {
                    mainChart.push({ 
                        id: tmp_data.id,
                        title: tmp_data['title'],
                        value: tmp_data.amountPercent,
                        amountInfo: tmp_data.amountInfo
                    });
                }
            });
        }
        
        if (total_info.status) {
            // 資產有數值
            output.chart = this.modifyChartData(mainChart, output.id);
        }

        output.show = true;
        return output;
    }

    /**
     * 投資性資產整理
     * @param jsonObj 
     */
    private modifyPartInvest(jsonObj, partIndex) {
        let output = {
            id: 'partInvest',
            show: false,
            title: 'DEPOSIT_OVERVIEW.TITLE.PART_INVEST', // 投資性資產
            title_header: 'DEPOSIT_OVERVIEW.TITLE.PART_INVEST_HEADER', // 投資性資產
            ccyAbout: 'FIELD.AMT_ABOUT', // 約當
            currency: 'TWD',
            totalBalance: '',
            classSet: 'account_card_list_r2',
            memo: '',
            data: {},
            chart: {},
            showChartColor: false,
            showItemAmount: true,
            subItem: [] // 顯示的項目
        };
        let partData = this._formateService.checkObjectList(jsonObj, partIndex, 'object');
        if (!partData) {
            // 取得失敗
            return output;
        }
        output.data = partData;
        output.memo = this._formateService.checkField(partData, 'errorMsg');
        output.totalBalance = this._formateService.checkField(partData, 'totalBalance');
        if (output.totalBalance == '' && output.memo != '') {
            // 資料來源掛了
            return output;
        }
        let mainChart = [];
        let total_info = this._formateService.getNumberInfo(output.totalBalance);

        // 基金 fundInfoData
        let dataA = this.modifyItemData(partData, 'fundInfoData', 'TWD_ABOUT', total_info);
        dataA['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_fund';
        dataA['pathUrl'] = 'fund-overview'; // 投資總覽
        if (dataA.haveAmt || dataA.showAccount) {
            dataA.showAccount = false; // 固定不顯示明細
            output.subItem.push(dataA);
            mainChart.push({ id: dataA.id, title: dataA['title'], value: dataA.amountPercent, amountInfo: dataA.amountInfo });
        }
        // 黃金存摺 goldInfoData
        let dataB = this.modifyItemData(partData, 'goldInfoData', 'TWD_ABOUT', total_info);
        dataB['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_gold';
        if (dataB.haveAmt || dataB.showAccount) {
            output.subItem.push(dataB);
            mainChart.push({ id: dataB.id, title: dataB['title'], value: dataB.amountPercent, amountInfo: dataB.amountInfo });
        }

        if (total_info.status) {
            // 資產有數值
            output.chart = this.modifyChartData(mainChart, output.id);
        }

        output.show = true;
        return output;
    }

    /**
     * 負資產整理
     * @param jsonObj 
     */
    private modifyPartNegative(jsonObj, partIndex) {
        let output = {
            id: 'partNegative',
            show: false,
            title: 'DEPOSIT_OVERVIEW.TITLE.PART_NEGATIVE', // 負資產
            title_header: 'DEPOSIT_OVERVIEW.TITLE.PART_NEGATIVE', // 負資產
            ccyAbout: '', // 約當
            currency: 'TWD',
            totalBalance: '',
            classSet: '',
            memo: '',
            data: {},
            chart: {},
            showChartColor: false,
            showItemAmount: true,
            subItem: [] // 顯示的項目
        };
        let partData = this._formateService.checkObjectList(jsonObj, partIndex, 'object');
        if (!partData) {
            // 取得失敗
            return output;
        }
        output.data = partData;
        output.memo = this._formateService.checkField(partData, 'errorMsg');
        output.totalBalance = this._formateService.checkField(partData, 'totalBalance');
        if (output.totalBalance == '' && output.memo != '') {
            // 資料來源掛了
            return output;
        }
        let mainChart = [];
        let total_info = this._formateService.getNumberInfo(output.totalBalance);

        // 貸款 loansInfoData
        let dataA = this.modifyItemData(partData, 'loansInfoData', 'TWD', total_info);
        dataA['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_loans';
        if (dataA.haveAmt || dataA.showAccount) {
            output.subItem.push(dataA);
            mainChart.push({ id: dataA.id, title: dataA['title'], value: dataA.amountPercent, amountInfo: dataA.amountInfo });
        }
        // 信用卡 cardsInfoData
        let dataB = this.modifyItemData(partData, 'cardsInfoData', 'TWD', total_info);
        dataB['title'] = 'DEPOSIT_OVERVIEW.TITLE.ITEM_cards';
        dataB['pathUrl'] = 'card-overview'; // 信用卡總覽
        if (dataB.haveAmt || dataB.showAccount) {
            dataB.showAccount = false; // 固定不顯示明細
            output.subItem.push(dataB);
            mainChart.push({ id: dataB.id, title: dataB['title'], value: dataB.amountPercent, amountInfo: dataB.amountInfo });
        }


        if (total_info.status) {
            // 資產有數值
            output.chart = this.modifyChartData(mainChart, output.id);
        }

        output.show = true;
        return output;
    }


}

