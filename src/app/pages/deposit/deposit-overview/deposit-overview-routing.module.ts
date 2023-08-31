/**
 * Route定義
 * 帳戶總覽查詢
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositOverviewMainComponent } from './deposit-overview-main/deposit-overview-main.component';

// ---------------- Pages Start ---------------- //


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: DepositOverviewMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositOverviewRoutingModule { }
