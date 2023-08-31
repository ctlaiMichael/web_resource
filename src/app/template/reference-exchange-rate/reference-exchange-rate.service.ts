/**
 * 參考匯率(交叉匯率)Service
 */
import { Injectable } from '@angular/core';
import { CacheService } from '@systems/system/cache/cache.service';
import { FormateService } from '@template/formate/formate.service';
import { CURRENCY_WEIGHT } from '@template/reference-exchange-rate/currency-weight';
import { NumberUtil } from '@util/formate/number/number-util';
import { Logger } from '@systems/system/logger/logger.service';

@Injectable()

export class ReferenceExchangeRateService {
    /**
     * 參數處理
     */
    private sellCurrency = ''; // 兌出幣
    private buyCurrency = ''; // 兌入幣
    private sellCurrencyWeight: any; // 兌出幣權重
    private buyCurrencyWeight: any; // 兌入幣權重
    private sellCurrencyBuyRate = ''; // 兌出幣買匯
    private buyCurrencySellRate = ''; // 兌入幣賣匯
    private sellCurrency_bonus = ''; // 兌出幣bonus
    private buyCurrency_bonus = ''; // 兌入幣bonus
    private sellCurrency_custDisRate = ''; // 兌出幣customer折扣利率
    private buyCurrency_custDisRate = ''; // 兌入幣customer折扣利率
    private sellCurrency_employeeDisRate = ''; // 兌出幣employee折扣利率
    private buyCurrency_employeeDisRate = ''; // 兌入幣employee折扣利率
    private referenceCurrencyRate = 0; // 參考匯率
    private referenceCurrencyRate_bonus = 0; // 參考匯率bonus
    private referenceCurrencyRate_customer = 0; // 參考匯率customer
    private referenceCurrencyRate_employee = 0; // 參考匯率employee
    private convertRate = 0; // 轉換比值

    output = {
        msg: '',
        referenceCurrencyRate: '',
        referenceCurrencyRate_bonus: '',
        referenceCurrencyRate_customer: '',
        referenceCurrencyRate_employee: '',
        // convertRate: '',
        weightType: '' // 1:權重大轉小 2:權重小轉大
    };

    constructor(
        private _cacheService: CacheService,
        private _formateService: FormateService,
        private logger: Logger
    ) {

    }

    /**
     * 取得參考匯率
     * @param sellCurrencyObj 兌出幣Obj
     * @param buyCurrencyObj 兌入幣Obj
     */
    public async getReferenceRate(sellCurrencyObj, buyCurrencyObj): Promise<any> {
        this.sellCurrency = this._formateService.checkField(sellCurrencyObj, 'currencyCode');
        this.buyCurrency = this._formateService.checkField(buyCurrencyObj, 'currencyCode');
        this.sellCurrencyBuyRate = this._formateService.checkField(sellCurrencyObj, 'buyRate');
        this.buyCurrencySellRate = this._formateService.checkField(buyCurrencyObj, 'sellRate');
        this.sellCurrencyWeight = this._formateService.checkField(sellCurrencyObj, 'weight');
        this.buyCurrencyWeight = this._formateService.checkField(buyCurrencyObj, 'weight');
        this.sellCurrency_bonus = this._formateService.checkField(sellCurrencyObj, 'bonus');
        this.buyCurrency_bonus = this._formateService.checkField(buyCurrencyObj, 'bonus');
        this.sellCurrency_custDisRate = this._formateService.checkField(sellCurrencyObj, 'customerDiscountRate');
        this.buyCurrency_custDisRate = this._formateService.checkField(buyCurrencyObj, 'customerDiscountRate');
        this.sellCurrency_employeeDisRate = this._formateService.checkField(sellCurrencyObj, 'employeeDiscountRate');
        this.buyCurrency_employeeDisRate = this._formateService.checkField(buyCurrencyObj, 'employeeDiscountRate');

        await this.getReferenceRate_normal();
        await this.getReferenceRate_bonus();
        await this.getReferenceRate_customer();
        await this.getReferenceRate_employee();
        
        return Promise.resolve(this.output);
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    private async getReferenceRate_normal() {
        if (!!this.sellCurrency && !!this.buyCurrency && !!this.sellCurrencyBuyRate && !!this.buyCurrencySellRate
            && !!this.sellCurrencyWeight && !!this.buyCurrencyWeight) {
            // this.sellCurrencyWeight = CURRENCY_WEIGHT[this.sellCurrency].weight;
            // this.buyCurrencyWeight = CURRENCY_WEIGHT[this.buyCurrency].weight;
            const sellCurrencyWeight = NumberUtil.toNumber(this.sellCurrencyWeight, 'int');
            const buyCurrencyWeight = NumberUtil.toNumber(this.buyCurrencyWeight, 'int');
            const sellCurrencyBuyRate = NumberUtil.toNumber(this.sellCurrencyBuyRate, 'float');
            const buyCurrencySellRate = NumberUtil.toNumber(this.buyCurrencySellRate, 'float');
            if (sellCurrencyWeight > buyCurrencyWeight) { // 權重小轉權重大
                this.referenceCurrencyRate = buyCurrencySellRate / sellCurrencyBuyRate;
                this.referenceCurrencyRate = Math.round(this.referenceCurrencyRate * 10000) / 10000;
                this.output.weightType = '2';
            } else if (sellCurrencyWeight < buyCurrencyWeight) { // 權重大轉權重小
                this.referenceCurrencyRate = sellCurrencyBuyRate / buyCurrencySellRate;
                this.referenceCurrencyRate = Math.round(this.referenceCurrencyRate * 10000) / 10000;
                this.output.weightType = '1';
            } else {
                this.referenceCurrencyRate = 1;
            }
            this.output.referenceCurrencyRate = this.referenceCurrencyRate.toString();
        } else {
            this.output.referenceCurrencyRate = '';
        }
    }

    private async getReferenceRate_bonus() {
        if (!!this.sellCurrency && !!this.buyCurrency && !!this.sellCurrencyBuyRate && !!this.buyCurrencySellRate
            && !!this.sellCurrencyWeight && !!this.buyCurrencyWeight && !!this.sellCurrency_bonus && !!this.buyCurrency_bonus) {
            // this.sellCurrencyWeight = CURRENCY_WEIGHT[this.sellCurrency].weight;
            // this.buyCurrencyWeight = CURRENCY_WEIGHT[this.buyCurrency].weight;
            const sellCurrencyWeight = NumberUtil.toNumber(this.sellCurrencyWeight, 'int');
            const buyCurrencyWeight = NumberUtil.toNumber(this.buyCurrencyWeight, 'int');
            const sellCurrencyBuyRate = NumberUtil.toNumber(this.sellCurrencyBuyRate, 'float');
            const buyCurrencySellRate = NumberUtil.toNumber(this.buyCurrencySellRate, 'float');
            const sellCurrency_bonus = NumberUtil.toNumber(this.sellCurrency_bonus, 'float');
            const buyCurrency_bonus = NumberUtil.toNumber(this.buyCurrency_bonus, 'float');
            if (sellCurrencyWeight > buyCurrencyWeight) { // 權重小轉權重大
                this.referenceCurrencyRate_bonus = (buyCurrencySellRate - buyCurrency_bonus) / (sellCurrencyBuyRate + sellCurrency_bonus);
                this.referenceCurrencyRate_bonus = Math.round(this.referenceCurrencyRate_bonus * 10000) / 10000;
                this.output.weightType = '2';
            } else if (sellCurrencyWeight < buyCurrencyWeight) { // 權重大轉權重小
                this.referenceCurrencyRate_bonus = (sellCurrencyBuyRate + sellCurrency_bonus) / (buyCurrencySellRate - buyCurrency_bonus);
                this.referenceCurrencyRate_bonus = Math.round(this.referenceCurrencyRate_bonus * 10000) / 10000;
                this.output.weightType = '1';
            } else {
                this.referenceCurrencyRate_bonus = 1;
            }
            this.output.referenceCurrencyRate_bonus = this.referenceCurrencyRate_bonus.toString();
        } else {
            this.output.referenceCurrencyRate_bonus = '';
        }
    }

    private async getReferenceRate_customer() {
        if (!!this.sellCurrency && !!this.buyCurrency && !!this.sellCurrencyBuyRate && !!this.buyCurrencySellRate
            && !!this.sellCurrencyWeight && !!this.buyCurrencyWeight && !!this.sellCurrency_custDisRate && !!this.buyCurrency_custDisRate) {
            // this.sellCurrencyWeight = CURRENCY_WEIGHT[this.sellCurrency].weight;
            // this.buyCurrencyWeight = CURRENCY_WEIGHT[this.buyCurrency].weight;
            const sellCurrencyWeight = NumberUtil.toNumber(this.sellCurrencyWeight, 'int');
            const buyCurrencyWeight = NumberUtil.toNumber(this.buyCurrencyWeight, 'int');
            const sellCurrencyBuyRate = NumberUtil.toNumber(this.sellCurrencyBuyRate, 'float');
            const buyCurrencySellRate = NumberUtil.toNumber(this.buyCurrencySellRate, 'float');
            const sellCurrency_custDisRate = NumberUtil.toNumber(this.sellCurrency_custDisRate, 'float');
            const buyCurrency_custDisRate = NumberUtil.toNumber(this.buyCurrency_custDisRate, 'float');
            if (sellCurrencyWeight > buyCurrencyWeight) { // 權重小轉權重大
                this.referenceCurrencyRate_customer =
                (buyCurrencySellRate - buyCurrency_custDisRate) / (sellCurrencyBuyRate + sellCurrency_custDisRate);
                this.referenceCurrencyRate_customer = Math.round(this.referenceCurrencyRate_customer * 10000) / 10000;
                this.output.weightType = '2';
            } else if (sellCurrencyWeight < buyCurrencyWeight) { // 權重大轉權重小
                this.referenceCurrencyRate_customer =
                 (sellCurrencyBuyRate + sellCurrency_custDisRate) / (buyCurrencySellRate - buyCurrency_custDisRate);
                this.referenceCurrencyRate_customer = Math.round(this.referenceCurrencyRate_customer * 10000) / 10000;
                this.output.weightType = '1';
            } else {
                this.referenceCurrencyRate_customer = 1;
            }
            this.output.referenceCurrencyRate_customer = this.referenceCurrencyRate_customer.toString();
        } else {
            this.output.referenceCurrencyRate_customer = '';
        }
    }

    private async getReferenceRate_employee() {
        if (!!this.sellCurrency && !!this.buyCurrency && !!this.sellCurrencyBuyRate && !!this.buyCurrencySellRate
            && !!this.sellCurrencyWeight && !!this.buyCurrencyWeight && !!this.sellCurrency_employeeDisRate
             && !!this.buyCurrency_employeeDisRate) {
            // this.sellCurrencyWeight = CURRENCY_WEIGHT[this.sellCurrency].weight;
            // this.buyCurrencyWeight = CURRENCY_WEIGHT[this.buyCurrency].weight;
            const sellCurrencyWeight = NumberUtil.toNumber(this.sellCurrencyWeight, 'int');
            const buyCurrencyWeight = NumberUtil.toNumber(this.buyCurrencyWeight, 'int');
            const sellCurrencyBuyRate = NumberUtil.toNumber(this.sellCurrencyBuyRate, 'float');
            const buyCurrencySellRate = NumberUtil.toNumber(this.buyCurrencySellRate, 'float');
            const sellCurrency_employeeDisRate = NumberUtil.toNumber(this.sellCurrency_employeeDisRate, 'float');
            const buyCurrency_employeeDisRate = NumberUtil.toNumber(this.buyCurrency_employeeDisRate, 'float');
            if (sellCurrencyWeight > buyCurrencyWeight) { // 權重小轉權重大
                this.referenceCurrencyRate_employee =
                (buyCurrencySellRate - buyCurrency_employeeDisRate) / (sellCurrencyBuyRate + sellCurrency_employeeDisRate);
                this.referenceCurrencyRate_employee = Math.round(this.referenceCurrencyRate_employee * 10000) / 10000;
                this.output.weightType = '2';
            } else if (sellCurrencyWeight < buyCurrencyWeight) { // 權重大轉權重小
                this.referenceCurrencyRate_employee =
                 (sellCurrencyBuyRate + sellCurrency_employeeDisRate) / (buyCurrencySellRate - buyCurrency_employeeDisRate);
                this.referenceCurrencyRate_employee = Math.round(this.referenceCurrencyRate_employee * 10000) / 10000;
                this.output.weightType = '1';
            } else {
                this.referenceCurrencyRate_employee = 1;
            }
            this.output.referenceCurrencyRate_employee = this.referenceCurrencyRate_employee.toString();
        } else {
            this.output.referenceCurrencyRate_employee = '';
        }
    }

}