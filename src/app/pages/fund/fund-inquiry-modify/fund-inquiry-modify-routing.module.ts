/**
 * Route定義
 * 定期(不)定額查詢修改
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { FundInquiryModifyDetailComponent } from './fund-inquiry-modify-detail/fund-inquiry-modify-detail.component';
import { FundInquiryModifyMainComponent } from './fund-inquiry-modify-main/fund-inquiry-modify-main.component';

const routes: Routes = [
  {
    path: 'detail', component: FundInquiryModifyDetailComponent
  },
  {
    path: 'main', component: FundInquiryModifyMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundInquiryModifyRoutingModule { }
