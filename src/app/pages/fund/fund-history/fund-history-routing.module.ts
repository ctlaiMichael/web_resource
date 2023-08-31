/**
 * Route定義
 * 投資交易明細查詢
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { FundHistoryDetailComponent } from './fund-history-detail/fund-histroy-detail.component';
import { FundHistoryMainComponent } from './fund-histroy-main/fund-histroy-main.component';
import { FundHistoryContnetComponent } from './fund-history-content/fund-history-content.component';


const routes: Routes = [
  // { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: FundHistoryMainComponent
  },
  {
    path: 'detail', component: FundHistoryDetailComponent
  },
  {
    path: 'content', component: FundHistoryContnetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundHistoryRoutingModule { }


