/**
 * Route定義
 * 帳戶資產查詢
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ---------------- Pages Start ---------------- //

const routes: Routes = [
  { path: '', redirectTo: 'deposit-overview', pathMatch: 'full' },
  // == 帳戶總覽 == //
  {
    path: 'deposit-overview', loadChildren: './deposit-overview/deposit-overview.module#DepositOverviewModule'
    , data: {
      preload: true
    }
  }
  // == 帳戶明細查詢 == //
  , {
    path: 'deposit-account-detail', loadChildren: './deposit-account-detail/deposit-account-detail.module#DepositAccountDetailModule'
    , data: {
      preload: false
    }
  }
  // == 定存基本資料查詢 == //
  , {
    path: 'time-deposit-all-account', loadChildren: './time-deposit-all-account/time-deposit-all-account.module#TimeDepositAllAccountModule'
    , data: {
      preload: false
    }
  }
  // == 定存本金利息明細查詢 == //
  , {
    path: 'time-deposit-account-detail', loadChildren: './time-deposit-account-detail/time-deposit-account-detail.module#TimeDepositAccountDetailModule'
    , data: {
      preload: false
    }
  }
  // == 國外匯入匯款查詢 == //
  , {
    path: 'foreign-ir', loadChildren: './foreign-ir/foreign-ir.module#ForeignIrModule'
    , data: {
      preload: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositRoutingModule { }
