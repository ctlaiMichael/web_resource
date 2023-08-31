/**
 * Route定義
 * 理財妙管家
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { FundRedeemDetailComponent } from './auto-fund-redeem-detail/auto-fund-redeem-detail.component';
import { FundRedeemMainComponent } from './auto-fund-redeem-main/auto-fund-redeem-main.component';

const routes: Routes = [
  {
    path: 'detail', component: FundRedeemDetailComponent
  },
  {
    path: 'main', component: FundRedeemMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoFundRedeemRoutingModule { }
