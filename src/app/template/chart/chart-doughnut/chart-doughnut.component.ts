/**
 * 環狀圖
 */
import { Component, OnInit, Input, Output, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { ChartDoughnutService } from '@template/chart/chart-doughnut/chart-doughnut.service';
declare var Chart: any;

@Component({
    selector: 'app-chart-doughnut',
    templateUrl: './chart-doughnut.component.html',
    styleUrls: []
})

export class ChartDoughnutComponent implements OnInit, AfterViewInit {
    @Input() chartType: string; // 指定類型
    @Input() setData: any;
    @Input() width;
    @Input() height;
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    private chart: any;

    constructor(
        private _logger: Logger,
        private _mainService: ChartDoughnutService,
        private _formateService: FormateService,
        private el: ElementRef
    ) {
    }

    ngOnInit() {
        // this._logger.log("into  ChartDoughnutComponent, setData:", this._formateService.transClone(this.setData));
        let labels = this._formateService.checkField(this.setData, 'labels');
        let data = this._formateService.checkField(this.setData, 'data');

        if (labels != '' && data != '') {
            this.doChart();
        }
    }

    ngAfterViewInit() {

    }

    // 繪製環狀圖 (目前資料先寫死,中台傳入筆數非固定,選色上為隨機? 待補)
    doChart() {
        let setDataClone = this._mainService.modifyChartData(this.chartType, this.setData);
        this._logger.step('Chart', "modiftData  ChartDoughnutComponent, setData:", setDataClone);
        // this._logger.step('Chart', "into doChart");
        let ctx = this.el.nativeElement.querySelector('canvas');
        ctx.width = this.width;
        ctx.height = this.height;
        let set_option = this._mainService.getChartSet(this.chartType, setDataClone);
        this._logger.step('Chart', "into doChart set", set_option);
        this.chart = new Chart(ctx, set_option);
        this.backPageEmit.emit(setDataClone);
    }


}