/**
 * Route定義
 * 外幣利率
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { ForeignCurrencyRateMainComponent } from './main/foreign-currency-rate-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: ForeignCurrencyRateMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForeignCurrencyRateRoutingModule { }
