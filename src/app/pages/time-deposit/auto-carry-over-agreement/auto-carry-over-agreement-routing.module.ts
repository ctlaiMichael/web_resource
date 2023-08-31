/**
 * Route定義
 * 自動轉期約定
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { AutoCarryOverMainComponent } from './auto-carry-over-main/auto-carry-over-main-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: AutoCarryOverMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoCarryOverAgreementRoutingModule { }
