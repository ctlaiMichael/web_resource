/**
 * 外幣放款利率
 */
import { Component, OnInit } from '@angular/core';
import { ForeignLoanCurrencyService } from '@pages/financial/shared/service/foreign-loan-currency.service';

@Component({
  selector: 'app-foreign-loan-currency-rate-main',
  templateUrl: './foreign-loan-currency-rate-main.component.html',
  styleUrls: [],
  providers: [ForeignLoanCurrencyService]
})

export class ForeignLoanCurrencyRateMainComponent implements OnInit {
  dataTime: any; // 資料時間
  currencyData = []; // 幣別data
  haveData = true;
  errorMsg = '';

  constructor(
    private mainService: ForeignLoanCurrencyService,
  ) { }

  ngOnInit() {
    // 取得外幣放款利率data
    this.mainService.getData().then(
      (res) => {
        this.haveData = true;
        this.dataTime = res.dataTime;
        this.currencyData = res.currencyData;
      },
      (errObj) => {
        this.haveData = false;
        this.errorMsg = errObj.content;
        // Error
      }
    );
  }

}
