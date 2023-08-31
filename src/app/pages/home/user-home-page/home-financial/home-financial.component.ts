/**
 *  登入首頁-帳戶區塊
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- Other Lib -- //
import { FormateService } from '@template/formate/formate.service';
import { ExchangeRateService } from '@pages/financial/shared/service/exchange-rate.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { ObjectUtil } from '@util/formate/modify/object-util';

@Component({
    selector: 'app-home-financial',
    templateUrl: './home-financial.component.html',
    styleUrls: [],
    providers: []
})
export class HomeFinancialComponent implements OnInit {
    dataTime = '';
    mainData = [];
    showErrorMsg = ''; // 載入中
    showData = false;
    private allData: any;
    private maxItemNum = 3; // 顯示數量控制
    private loadingStr = 'HOME.INFO.LOADING'; // 載入中

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private mainService: ExchangeRateService,
        private navavgator: NavgatorService
    ) { 
    }

    ngOnInit() {
        this.getData();
    }

    /**
     * 看更多
     */
    onMore() {
        this.navavgator.push('exchangeRate');
    }

    /**
     * 取資料
     */
    private async getData() {
        this._logger.step('Home', 'HomeFinancial getData');
        this.showData = false;
        this.showErrorMsg = this.loadingStr;
        try {
            let resObj = await this.mainService.getData({ background: true });
            this._logger.step('Home', 'HomeFinancial success', resObj);
            this.allData = resObj;
            this.dataTime = this._formateService.checkField(resObj, 'dataTime');

            this.setCurrecy();
            this.checkIsEmpty();
        } catch (errorObj) {
            // 取不到資料的例外處理
            let error_msg = 'HOME.FINANCIAL.ERROR';
            // let error_msg = this._formateService.checkField(errorObj, 'content');
            // if (error_msg == '') {
            //     error_msg = this._formateService.checkField(errorObj, 'msg');
            // }
            this.showErrorMsg = error_msg;
            this.checkIsEmpty();
        }
    }

    /**
     * 檢核無匯率資料
     */
    private checkIsEmpty() {
        if (this.mainData.length <= 0) {
            this.showData = false;
        } else {
            this.showData = true;
        }
    }


    /**
     * 處理顯示資料
     * @param resObj 
     * @param ccy 
     */
    private modifyShowData(ccy: string, set: boolean) {
        let tmp_data = {
            show: false,
            buyRate: '',
            sellRate: '',
            currencyCode: '',
            currencyName: '',
            currencyCodeShow: '',
            currencyNameShow: ''
        };
        let set_ccy = ccy.toUpperCase();
        let resData = this._formateService.checkObjectList(this.allData, 'list.' + set_ccy);
        if (!!resData) {
            tmp_data.buyRate = this._formateService.checkField(resData, 'buyRate');
            tmp_data.sellRate = this._formateService.checkField(resData, 'sellRate');
            tmp_data.currencyCode = this._formateService.checkField(resData, 'currencyCode');
            tmp_data.currencyName = this._formateService.checkField(resData, 'currencyName');
            tmp_data.currencyCodeShow = this._formateService.checkField(resData, 'currencyCodeShow');
            tmp_data.currencyNameShow = this._formateService.checkField(resData, 'currencyNameShow');
            if (!!tmp_data.buyRate || !!tmp_data.sellRate) {
                tmp_data.show = true;
            }
        }
        if (tmp_data.show && set) {
            // 放入顯示清單內
            this.mainData.push(tmp_data);
        }
        return tmp_data;
    }


    /**
     * 設定要顯示的幣別資料
     */
    private setCurrecy() {
        let have_ccy = [];
        let usd_data = this.modifyShowData('USD (>10K)', true);
        if (usd_data.show) { have_ccy.push('USD (>10K)'); }
        let jpy_data = this.modifyShowData('JPY', true);
        if (jpy_data.show) { have_ccy.push('JPY'); }
        // 個人戶判斷CNH 或 CNY 孰優，就用那一個匯率。(買入)
        let have_cnh = true;
        let cnh_data = this.modifyShowData('CNH', false);
        let cny_data = this.modifyShowData('CNY', false);
        if (cnh_data.show && cny_data.show) {
            let cnh_buy = parseFloat(cnh_data.buyRate);
            let cny_buy = parseFloat(cny_data.buyRate);
            if (cnh_buy <= cny_buy) {
                this.mainData.push(cnh_data);
            } else {
                this.mainData.push(cny_data);
            }
        } else if (cnh_data.show) {
            // cnh
            this.mainData.push(cnh_data);
        } else if (cny_data.show) {
            // cny
            this.mainData.push(cny_data);
        } else {
            have_cnh = false;
        }
        if (have_cnh) {
            have_ccy.push('CNY');
            have_ccy.push('CNH');
        }
        // 如果不足筆數 隨機取得
        let spot_data = this._formateService.checkObjectList(this.allData, 'foreignTransCurrencyData');
        // random排序
        spot_data = ObjectUtil.shuffle(spot_data);
        if (this.mainData.length < this.maxItemNum && spot_data.length > 0) {
            let ignor_ccy = ['TWD', 'NTD', 'NT$'];
            spot_data.some((item, item_index) => {
                let tmp_ccy = this._formateService.checkField(item, 'currencyCode');
                if (have_ccy.indexOf(tmp_ccy) > -1 || ignor_ccy.indexOf(tmp_ccy) > -1) {
                    return false; // is same continue;
                }
                let tmp_data = this.modifyShowData(tmp_ccy, true);
                if (tmp_data.show) {
                    have_ccy.push(tmp_ccy);
                }
                if (this.mainData.length >= this.maxItemNum) {
                    return true; // is same break;
                }
            });

        }
    }

}
