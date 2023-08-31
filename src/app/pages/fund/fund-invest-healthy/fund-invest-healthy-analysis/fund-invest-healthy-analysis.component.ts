/**
 * 投資組合分析(組合分析)
 */
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { logger } from '@util/log-util';
declare var Chart: any;

@Component({
    selector: 'app-fund-invest-healthy-analysis',
    templateUrl: './fund-invest-healthy-analysis.component.html',
    styleUrls: []
})

export class FundInvestHealthyAnalysisComponent implements OnInit, AfterViewInit {
    @Input() setData: any;
    expandFlag: boolean; // 是否全部展開
    riskData: any; // 風險的PIECHART數據資料
    currencyData: any; // 幣別的PIECHAR數據資料
    regionData: any; // 產品的PIECHAR數據資料
    chartData: any; // chart圖
    checkData = {
        'riskData': false,
        'regionData': false,
        'currencyData': false
    };
    constructor(
        private _logger: Logger,
        private _formateServcie: FormateService
    ) { }

    ngOnInit() {
        this._logger.log("into FundInvestHealthyAnalysisComponent, setData:", this.setData);
        this.expandFlag = false;
        let rishcheck = this._formateServcie.checkField(this.setData, 'riskData');
        if (rishcheck != '') {
            this.riskData = this._formateServcie.transArraySort(this.setData.riskData, { 'sort': 'value', 'reverse': 'DESC', 'special': 'amount' });
            this.checkData.riskData = true;
        }
        let regionDatacheck = this._formateServcie.checkField(this.setData, 'regionData');
        if (regionDatacheck != '') {
            this.currencyData = this._formateServcie.transArraySort(this.setData.currencyData, { 'sort': 'value', 'reverse': 'DESC', 'special': 'amount' });
            this.checkData.regionData = true;
        }
        let currencyDatacheck = this._formateServcie.checkField(this.setData, 'currencyData');
        if (currencyDatacheck != '') {
            this.regionData = this._formateServcie.transArraySort(this.setData.regionData, { 'sort': 'value', 'reverse': 'DESC', 'special': 'amount' });
            this.checkData.currencyData = true;
        }
        let data = this._formateServcie.transClone(this.setData);
        this.modifyChartData(data);
    }

    ngAfterViewInit() {
        this._logger.log("into ngAfterViewInit");
    }

    modifyChartData(data) {
        let chartData = {
            'riskData': {
                'labels': [],
                'data': [],
                'type': 'riskData'
            },
            'regionData': {
                'labels': [],
                'data': [],
                'type': 'regionData'
            },
            'currencyData': {
                'labels': [],
                'data': [],
                'type': 'currencyData'
            }
        };

        if (this.checkData.riskData) {
            data['riskData'] = this._formateServcie.transArraySort(data['riskData'], { 'sort': 'value', 'reverse': 'DESC', 'special': 'amount' });
            data['riskData'].forEach(item => {
                let chiName = this._formateServcie.checkField(item, 'chiName');
                let value = this._formateServcie.checkField(item, 'value');
                if (chiName && value) {
                    chartData['riskData']['labels'].push(item['chiName']);
                    chartData['riskData']['data'].push(parseFloat(item['value']));

                }
            });
            chartData['riskData']['list'] = data['riskData'];
        }
        if (this.checkData.regionData) {
            data['regionData'] = this._formateServcie.transArraySort(data['regionData'], { 'sort': 'value', 'reverse': 'DESC', 'special': 'amount' });
            // logger.error('transArraySort regionData', data['regionData']);
            data['regionData'].forEach(item => {
                let chiName = this._formateServcie.checkField(item, 'chiName');
                let value = this._formateServcie.checkField(item, 'value');
                if (chiName && value) {
                    chartData['regionData']['labels'].push(item['chiName']);
                    chartData['regionData']['data'].push(parseFloat(item['value']));
                }
            });
            chartData['regionData']['list'] = data['regionData'];
        }
        if (this.checkData.currencyData) {
            data['currencyData'] = this._formateServcie.transArraySort(data['currencyData']
                , { 'sort': 'value', 'reverse': 'DESC', 'special': 'amount' });
            data['currencyData'].forEach(item => {
                let chiName = this._formateServcie.checkField(item, 'chiName');
                let value = this._formateServcie.checkField(item, 'value');
                if (chiName && value) {
                    chartData['currencyData']['labels'].push(item['chiName']);
                    chartData['currencyData']['data'].push(parseFloat(item['value']));
                }

            });
            chartData['currencyData']['list'] = data['currencyData'];
        }

        this.chartData = chartData;
        logger.log('modifyChartData', this.chartData);
    }

    /**
     * 排序 改用formatService
     */
    // sortData(arr){
    //     if(arr && arr instanceof Array && arr.length>0){
    //         return arr=arr.sort(function (a, b) {
    //             return parseFloat(a.value) < parseFloat(b.value) ? 1 : -1;
    //         });
    //     }else{
    //         return arr
    //     }
    // }

    /**
     * canvas output
     */
    onPageBackEvent(e) {
        logger.log('onPageBackEvent', e);
        let type = this._formateServcie.checkField(e, 'type');
        if (type != '') {
            switch (type) {
                case 'riskData':
                    this.riskData = this.colorSet(this.riskData, e);
                    break;
                case 'regionData':
                    this.regionData = this.colorSet(this.regionData, e);
                    break;
                case 'currencyData':
                    this.currencyData = this.colorSet(this.currencyData, e);
                    break;
                default:
                    break;
            }
        }

    }
    colorSet(arr, e) {
        if (arr && arr instanceof Array && arr.length > 0) {
            arr.forEach((item) => {
                if (item['chiName'] && !!e && !!e['color'] && !!e['color'][item['chiName']]) {
                    item['color'] = e['color'][item['chiName']];
                }
            });
        }
        return arr;
    }
}