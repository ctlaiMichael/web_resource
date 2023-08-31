/**
 * Route定義
 * 投資交易明細查詢
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { FundProfitLossMainComponent } from './fund-profit-loss-main/fund-profit-loss-main.component';
import { FundProfitLossDetailComponent } from './fund-profit-loss-detail/fund-profit-loss-detail.component';


const routes: Routes = [
  // { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: FundProfitLossMainComponent
  },
  {
    path: 'detail', component: FundProfitLossDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundProfitLossRoutingModule { }


