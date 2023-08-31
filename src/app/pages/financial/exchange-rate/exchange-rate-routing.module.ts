/**
 * Route定義
 * 外幣匯率
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { ExchangeRateMainComponent } from './main/exchange-rate-main.component';
import { ExchangeRateHistoryComponent } from './history/exchange-rate-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: ExchangeRateMainComponent
  }
  , {
    path: 'history', component: ExchangeRateHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRateRoutingModule { }
