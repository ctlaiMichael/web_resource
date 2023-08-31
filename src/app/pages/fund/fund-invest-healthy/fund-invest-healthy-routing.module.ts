/**
 * Route定義
 * 投資組合分析
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { FundInvestHealthyMainComponent } from './fund-invest-healthy-main/fund-invest-healthy-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: FundInvestHealthyMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundInvestHealthyRoutingModule { }
