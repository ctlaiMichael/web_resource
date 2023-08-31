/**
 * Route定義
 * 匯率到價通知設定
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRequired } from '@systems/system/auth/login-required.service';
// ---------------- Pages Start ---------------- //
import { ExchangeRateNoticeMainComponent } from './main/exchange-rate-notice-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: ExchangeRateNoticeMainComponent
    , canActivate: [LoginRequired]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRateNoticeRoutingModule { }
