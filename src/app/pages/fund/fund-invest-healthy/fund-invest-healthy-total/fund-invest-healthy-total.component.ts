/**
 * 投資組合分析(投資合計)
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';

@Component({
    selector: 'app-fund-invest-healthy-total',
    templateUrl: './fund-invest-healthy-total.component.html',
    styleUrls: []
})

export class FundInvestHealthyTotalComponent implements OnInit {
    @Input() setData: any;
    showData: any;

    constructor(
        private _logger: Logger,
        private _formateService: FormateService
    ) { }

    ngOnInit() {
        this._logger.log("into FundInvestHealthyTotalComponent, setData:", this._formateService.transClone(this.setData));
        this.showData = this.setData.sumupInfo;
        this._logger.log("into FundInvestHealthyTotalComponent, setData2:", this._formateService.transClone(this.showData));
    }

}