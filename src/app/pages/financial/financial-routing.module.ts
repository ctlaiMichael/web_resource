/**
 * Route定義
 * 金融資訊
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRequired } from '@systems/system/auth/login-required.service';
// ---------------- Pages Start ---------------- //

const routes: Routes = [
  // { path: '', redirectTo: 'main', pathMatch: 'full' },
  // == 台幣利率 == //
  {
    path: 'currency-rate', loadChildren: './currency-rate/currency-rate.module#CurrencyRateModule'
    , data: {
      preload: false
    }
  }
  // == 外幣利率 == //
  , {
    path: 'foreign-currency-rate', loadChildren: './foreign-currency-rate/foreign-currency-rate.module#ForeignCurrencyRateModule'
    , data: {
      preload: false
    }
  }
  // == 外幣放款利率 == //
  , {
    path: 'foreign-loan-currency-rate', loadChildren: './foreign-loan-currency-rate/foreign-loan-currency-rate.module#ForeignLoanCurrencyRateModule'
    , data: {
      preload: false
    }
  }
  // == OBU存款利率 == //
  , {
    path: 'obu-currency-rate', loadChildren: './obu-currency-rate/obu-currency-rate.module#ObuCurrencyRateModule'
    , data: {
      preload: false
    }
  }
  // == 貸款本息攤還試算 == //
  , {
    path: 'loan-calculator', loadChildren: './loan-calculator/loan-calculator.module#LoanCalculatorModule'
    , data: {
      preload: false
    }
  }
  // == 外幣匯率 == //
  , {
    path: 'exchange-rate', loadChildren: './exchange-rate/exchange-rate.module#ExchangeRateModule'
    , data: {
      preload: false
    }
  }
  // == 幣別換算 == //
  , {
    path: 'currency-converter', loadChildren: './currency-converter/currency-converter.module#CurrencyConverterModule'
    , data: {
      preload: false
    }
  }
  // == 匯率到價通知設定 == //
  , {
    path: 'exchange-rate-notice', loadChildren: './exchange-rate-notice/exchange-rate-notice.module#ExchangeRateNoticeModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
