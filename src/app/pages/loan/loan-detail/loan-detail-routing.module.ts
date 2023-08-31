/**
 * Route定義
 * 基本資料查詢
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { LoanDetailMainComponent } from './loan-detail-main/loan-detail-main.component';
import { LoanDetailDetailsComponent } from './loan-detail-details/loan-detail-details.component';
import { LoanDetailInterestComponent } from './loan-detail-interest/loan-detail-interest.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: LoanDetailMainComponent,
  }
  , {
    path: 'detail', component: LoanDetailDetailsComponent,
  }
  , {
    path: 'interest', component: LoanDetailInterestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanDetailRoutingModule { }
