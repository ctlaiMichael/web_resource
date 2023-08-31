/**
 * Route定義
 * 帳戶明細查詢
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { AccountMainComponent } from './account-main/account-main.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';


const routes: Routes = [
  // { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: AccountMainComponent
  },
  {
    path: 'detail', component: AccountDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositAccountDetailRoutingModule { }
