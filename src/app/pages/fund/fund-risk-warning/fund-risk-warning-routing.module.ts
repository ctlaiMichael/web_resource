/**
 * Route定義
 * 基金贖回
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { FundRiskWarning } from './main/fundRiskWarning.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: FundRiskWarning
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundRiskWarningRoutingModule { }
