/**
 * chart.js套件 走勢圖
 * 
 * 走勢圖色系
 *  1. #E7373C & #F9BE00
 *  2. #F9BE00 & #D15B9C
 *  3. #E7373C & #137CEC
 *  4. #F9BE00 & #E95504
 *  5. #F9BE00 & #46B8B5
 *  6. #F9BE00 & #137CEC
 * 
 */
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { ChartLineService } from './chart-line.service';
import { TranslateService } from '@ngx-translate/core';
declare let Chart: any;

@Component({
    selector: 'app-chart-line',
    templateUrl: './chart-line.component.html',
    styleUrls: [],

})
export class ChartLineComponent implements OnInit, OnChanges {
    /**
     * 參數處理
     */
    @Input() setData; // 帶入 買匯,賣匯array
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    line: any;
    private colorSet = { buy: '#E7373C', sell: '#F9BE00'}; // 顏色定義1
    // private colorSet = { buy: '#F9BE00', sell: '#D15B9C'}; // 顏色定義2
    // private colorSet = { buy: '#E7373C', sell: '#137CEC'}; // 顏色定義3
    // private colorSet = { buy: '#F9BE00', sell: '#E95504'}; // 顏色定義4
    // private colorSet = { buy: '#F9BE00', sell: '#46B8B5'}; // 顏色定義5
    // private colorSet = { buy: '#F9BE00', sell: '#137CEC'}; // 顏色定義6

    constructor(
        private _logger: Logger,
        private _mainService: ChartLineService,
        private translate: TranslateService
    ) {
    }


    ngOnInit() {
        this._logger.log("into ngOnInit");
    }

    ngOnChanges() {
        this._logger.log("into ngOnChanges, setData:", this.setData);
        this.doLine();
    }

    doLine() {
        this._logger.log("into doLine");
        // 防呆處理
        if (this.setData.length == 0) {
            this.onErrorPageData(this.setData);
        }
        let formateData = this._mainService.doFormateData(this.setData);

        // rateData
        let buyLabelText = ''; // 買入
        let sellLabelText = ''; // 賣出
        this.translate.get('FINANCIAL.BUY_RATE_HISTORY').subscribe((val) => {
            buyLabelText = val;
        });
        this.translate.get('FINANCIAL.SELL_RATE_HISTORY').subscribe((val) => {
            sellLabelText = val;
        });

        let config = {
            type: 'line',
            data: {
                labels: formateData.dateData,
                datasets: [
                {
                    label: sellLabelText,
                    // 賣匯
                    fill: false,
                    backgroundColor: this.colorSet.sell,
                    borderColor: this.colorSet.sell,
                    data: formateData.sellData,
                    borderWidth: '2',
                    pointRadius: '',
                },
                {
                    label: buyLabelText,
                    // 買匯
                    backgroundColor: this.colorSet.buy,
                    borderColor: this.colorSet.buy,
                    data: formateData.buyData,
                    fill: false,
                    borderWidth: '2',
                    pointRadius: '',
                }]
            },
            options: {
                // 控制rwd版面
                responsive: true,
                maintainAspectRatio: false,
                // 控制hover顯示框
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    axis: 'x'
                },
                // 指標移動跟隨顯示
                hover: {
                    mode: 'index',
                    intersect: false,
                    axis: 'x'
                },
                // label 說明樣式
                legend: {
                    display: true,
                    position: "top",
                    align: "start",
                    // position: 'bottom', // 位置
                    labels: {
                        fontColor: '#333',
                        usePointStyle: true,
                        fontSize: 16,
                        fontFamily: '微軟正黑體, "Microsoft JhengHei", 新細明體, PMingLiU, 細明體, MingLiU, Arial, "Arial Black", Verdana',
                        boxWidth: 5,
                        boxHeight: 5
                    }
                },
                // x,y軸設定
                scales: {
                    xAxes: [{
                        display: true,
                        // 決定是否顯示x軸名稱與資料
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        },
                        // x軸隔線是否顯示
                        gridLines: {
                            display: false,
                            offsetGridLines: true
                        }
                    }],
                    yAxes: [{
                        display: true,
                        // 決定是否顯示y軸名稱與資料
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        },
                        gridLines: {
                            display: true
                        }
                    }]
                }
            }
        };

        let ctx = document.getElementById("canvas");
        this.line = new Chart(ctx, config);
        this._logger.log("has new Chart");
    }

    /**
     * 返回上一層
     * @param item
     */
    onBackPageData(item?: any) {
        // 返回最新消息選單
        let output = {
            'page': 'chart-line',
            'type': 'back',
            'data': item
        };
        this._logger.log("date-range-search onBackPageData, output:", output);
        this.backPageEmit.emit(output);
    }

    onErrorPageData(item?: any) {
        // 返回最新消息選單
        let output = {
            'page': 'chart-line',
            'type': 'back',
            'data': item
        };
        this.errorPageEmit.emit(output);
    }



}

