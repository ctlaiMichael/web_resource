/**
 * Route定義
 * 投資總覽
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { FundOverviewComponent } from './fund-overview-main/fund-overview.component';

const routes: Routes = [
  {
    path: 'main', component: FundOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundOverviewRoutingModule { }
