/**
 * 投資組合分析(主控)
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FundOverviewService } from '@pages/fund/shared/fund-overview.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Component({
  selector: 'app-fund-invest-healthy-main',
  templateUrl: './fund-invest-healthy-main.component.html',
  styleUrls: []
})

export class FundInvestHealthyMainComponent implements OnInit {
  selectTag = 'total'; // 切換tag頁籤, 'total': 投資合計, 'analysis': 組合分析
  infoData: any;
  nowPage = 'infoPage'; // 當下頁面 
  hasInfoData = false; // 是否取得資訊資料
  // 儲存cache資料,帶入子層
  resultData = {
    sumupInfo: [], // 合計資料
    riskData: [], // 風險的PIECHART數據資料
    regionData: [], // 產品的PIECHAR數據資料
    currencyData: [] // 幣別的PIECHAR數據資料
  };
  errorBoxMsg = ''; // errorBox錯誤訊息

  constructor(
    private _logger: Logger,
    private _overviewService: FundOverviewService,
    private _handleError: HandleErrorService
  ) { }

  ngOnInit() {
    this._logger.log("into FundInvestHealthyMainComponent");
    // 發送api時,若有cache過會直接resolve資料回來,因此直接送
      this.sendInvestHealthy();
  }

  // 切換頁籤
  onSelectTag(type) {
    this._logger.log("into onSelectTag, type:", type);
    if (type == 'total') {
      this.selectTag = 'total';
    } else {
      this.selectTag = 'analysis';
    }
  }

  // 發送投資合計/組合分析API 
  sendInvestHealthy() {
    this._overviewService.getInvestHealthy({}).then(
      (result) => {
        this._logger.log("getInvestHealthy, result:", result);
        this.infoData = result.infoData;
        this.doFormateData(result);
        this.hasInfoData = true; // 有取得資訊資料
        this.selectTag = 'total';
      },
      (errorObj) => {
        this._logger.log("getInvestHealthy, errorObj:", errorObj);
        this._handleError.handleError(errorObj);
        this.errorBoxMsg = errorObj.content;
        this.nowPage = 'errorBox'; // 錯誤頁面
      }
    );
  }

  // 整理資料, 分為投資組合及組合分析
  doFormateData(setData) {
    this.resultData.sumupInfo = setData.sumupInfo;
    this.resultData.riskData = setData.riskData;
    this.resultData.currencyData = setData.currencyData;
    this.resultData.regionData = setData.regionData;
  }
}
