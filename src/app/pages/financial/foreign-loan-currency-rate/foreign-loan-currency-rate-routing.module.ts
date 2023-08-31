/**
 * Route定義
 * 外幣放款利率
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { ForeignLoanCurrencyRateMainComponent } from './main/foreign-loan-currency-rate-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: ForeignLoanCurrencyRateMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForeignLoanCurrencyRateRoutingModule { }
