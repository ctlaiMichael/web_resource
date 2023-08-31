/**
 * Route定義
 * 貸款服務
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ---------------- Pages Start ---------------- //

const routes: Routes = [
  // == 基本資料查詢 == //
  {
    path: 'loan-main', loadChildren: './loan-main/loan-main.module#LoanMainModule'
    , data: {
      preload: false
    }
  }
  // == 本金利息明細查詢 == //
  , {
    path: 'loan-detail', loadChildren: './loan-detail/loan-detail.module#LoanDetailModule'
    , data: {
      preload: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
