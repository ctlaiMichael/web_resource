/**
 * Route定義
 * 投資現值查詢
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { BalanceDetailComponent } from './fund-account-balance-detail/balance-detail.component';
import { BalanceMainComponent } from './fund-account-balance-main/balance-main.component';

const routes: Routes = [
  {
    path: 'detail', component: BalanceDetailComponent
  },
  {
    path: 'main', component: BalanceMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundAccountBalanceRoutingModule { }
