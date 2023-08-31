/**
 * Chart圖處理
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- config -- //
import { APP_COLOR_SET } from '@conf/color_set';
// -- library -- //
import { TranslateService } from '@ngx-translate/core';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { MathUtil } from '@util/formate/number/math-util';
// -- api -- //
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

declare var Chart: any;

@Injectable()

export class ChartDoughnutService {
    /**
     * 參數處理
     */
    private allowPercent = 3; // 允許塗上顯示的百分比，低於不顯示
    private haveLowerPercent = 0; // 是否有低於allowPercent的資料
    private countItem = 6;    // 最多6項
    private colorArr = APP_COLOR_SET.CHART.color;
    private colorStyle = APP_COLOR_SET.CHART.class;
    private otherTxt = '';

    constructor(
        private _logger: Logger,
        private _handleError: HandleErrorService,
        private _formateService: FormateService,
        private translate: TranslateService,
        private _checkService: CheckService
    ) {
        this.translate.get('BTN.OTHER').subscribe((val) => {
            this.otherTxt = val;
        });
    }

    /**
     * 資料整理
     * 1.當剩餘比例地於10%的 整併到 "其他" < 10%
     * 2.幣別項目超過10個 (顏色不夠) => 一時可以20個 但先20個
     */
    modifyChartData(chartType?: string, set_data?: any) {
        let setDataClone = this._formateService.transClone(set_data);
        let allData = this._formateService.checkObjectList(setDataClone, 'list');
        let labelData = this._formateService.checkObjectList(setDataClone, 'labels');
        let chartData = this._formateService.checkObjectList(setDataClone, 'data');
        if (!allData) {
            allData = [];
        }
        if (!labelData) {
            labelData = [];
        }
        if (!chartData) {
            chartData = [];
        }

        // 回傳color物件
        let colorObj = {};
        labelData.forEach((name, i) => {
            let set_color = '';
            if (i < this.countItem) {
                set_color = this.colorStyle[i];
            } else {
                set_color = this.colorStyle[this.countItem];
            }
            colorObj[name] = set_color;
            if (!!allData[i]) {
                allData[i]['color'] = set_color;
            }
        });
        setDataClone['color'] = colorObj;
        // 大於countItem項特別處理
        let otherSum = 0;
        if (chartData.length > this.countItem) {
            let minIndex = this.countItem - 1;
            chartData.forEach((item, index) => {
                if (index > minIndex) {
                    otherSum = MathUtil.sum(otherSum, item);
                }
            });
            otherSum = Math.round(otherSum * 100) / 100; // 去無窮小數

            // setDataClone['data'].length = this.countItem;
            setDataClone['data'] = setDataClone['data'].slice(0, this.countItem);
            setDataClone['data'].push(otherSum);
            // setDataClone['labels'].length = this.countItem;
            setDataClone['labels'] = setDataClone['labels'].slice(0, this.countItem);
            setDataClone['labels'].push(this.otherTxt);
        }
        // this.colorArr.length=setDataClone['data'].length;

        // this._logger.step('Chart', "modiftData  ChartDoughnutComponent, setData:", setDataClone);

        return setDataClone;
    }

    /**
     * 取得chart設定
     * @param chartType 
     * @param set_data 
     */
    getChartSet(chartType?: string, set_data?: any) {
        this.haveLowerPercent = 0;
        let output: any = {};
        this._logger.step('Chart', "into doChart set have", chartType);
        switch (chartType) {
            case 'depositOverview': // 帳戶總覽
                output = this.overviewChart(set_data);
                break;
            case 'depositOverviewDetail': // 帳戶總覽-單資產
                output = this.overviewDetailChart(set_data);
                break;
            case 'myFundRisk': // 我的基金-風險
            case 'myFundProd': // 我的基金-產品
            case 'myFundCcy': // 我的基金-幣別
                output = this.fundChart(set_data);
                break;
            default:
                output = this.defaultChart(set_data);
                break;
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
     * 總覽
     */
    private defaultChart(set_data) {
        let show_labels = this._formateService.checkObjectList(set_data, 'labels', 'array');
        if (!show_labels) {
            show_labels = [];
        }
        let show_data = this._formateService.checkObjectList(set_data, 'data', 'array');
        if (!show_data) {
            show_data = [];
        }
        let onlyOne = false;
        let show_rectangle = 3; // chart圖例區塊間距
        let show_percentTextMargin = 3; // 比例與圖的距離
        if (show_data.length < 2) {
            onlyOne = true;
        }
        if (show_data.indexOf(100) > -1) {
            onlyOne = true;
        }
        if (onlyOne) {
            // 只有一筆時
            show_rectangle = 0;
            show_percentTextMargin = 10;
        }

        let output: any = {
            type: 'doughnut',
            data: {
                // labels: ['其他比例', '平衡型比例', '股票型比例', '貨幣型比例'],
                labels: show_labels,
                datasets: [{
                    data: show_data,
                    backgroundColor: this.colorArr,
                    // 處理不同百分比部分
                    borderColor: '#fff',
                    borderWidth: show_rectangle
                }]
            },
            options: {
                // 關閉比例說明區塊
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
                responsive: false,
                plugins: {
                    labels: {
                        fontColor: this.colorArr,
                        fontFamily: 'Arial',
                        fontWeight: 'bold',
                        fontSize: 14,
                        position: 'outside',                        
                        outsidePadding: 2,
                        textMargin: show_percentTextMargin, // 比例與圖的距離
                        render: (args) => {
                            return this.showChartPercent(args);
                        }
                    }
                },
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => {
                            // 獲取要顯示的數據標籤和數據值
                            // 將數據值轉換為本地字符串，以便它使用逗號分隔的數字
                            let dataLabel = data.labels[tooltipItem.index];
                            let value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%"; // 顯示處理
                            if (Chart.helpers.isArray(dataLabel)) {
                                // 在多行標籤的第一行顯示值
                                // 需要克隆，因為我們正在更改值
                                dataLabel = dataLabel.slice();
                                dataLabel[0] += value;
                            } else {
                                dataLabel += value;
                            }
                            return dataLabel;
                        }
                    }
                }

            }
        };

        return output;
    }


    /**
     * 總覽
     */
    private overviewChart(set_data) {
        let output: any = this.defaultChart(set_data);
        let datasets = this._checkService.checkObjectList(output, 'data.datasets');
        if (!!datasets) {
            let df_data = (typeof datasets[0] == 'object') ? datasets[0] : {};
            df_data['borderColor'] = '#f2f2f2';
            output['data']['datasets'] = [df_data];
        }

        return output;
    }


    /**
     * 總覽-單一資產
     */
    private overviewDetailChart(set_data) {
        let output: any = this.defaultChart(set_data);
        let datasets = this._checkService.checkObjectList(output, 'data.datasets');
        if (!!datasets) {
            let df_data = (typeof datasets[0] == 'object') ? datasets[0] : {};
            df_data['borderColor'] = '#f2f2f2';
            output['data']['datasets'] = [df_data];
        }
        // 單一資產放大後要調整大小
        output['options']['cutoutPercentage'] = 85;
        return output;
    }

    /**
     * 我的投資
     */
    private fundChart(set_data) {
        let output: any = this.defaultChart(set_data);
        return output;
    }



    /**
     * 圖上的區塊文字顯示處理(百分比)
     * @param args 
     */
    private showChartPercent(args) {
        let check_val = this._formateService.checkField(args, 'value');
        let check_val_to_number = (!!check_val) ? parseFloat(check_val) : 0;
        let show = check_val + '%';
        // [方案一] 小於% 全隱藏
        if (check_val_to_number < this.allowPercent) {
            show = '';
        }
        // [方案二] 小於% 且不是第一個需隱藏
        // if (check_val_to_number < this.allowPercent) {
        //     this.haveLowerPercent++;
        //     if (this.haveLowerPercent > 1) {
        //         show = '';
        //     }
        // }
        return show;
    }

}

