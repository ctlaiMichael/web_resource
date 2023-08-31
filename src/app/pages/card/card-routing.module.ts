/**
 * Route定義
 * 信用卡服務
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRequired } from '@systems/system/auth/login-required.service';
// ---------------- Pages Start ---------------- //

const routes: Routes = [
  { path: '', redirectTo: 'card-overview', pathMatch: 'full' },
  // == 信用卡總覽 == //
  {
    path: 'card-overview', loadChildren: './card-overview/card-overview.module#CardOverviewModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  },
  // == 信用卡現況查詢 == //
  {
    path: 'card-personal-profile', loadChildren: './card-personal-profile/card-personal-profile.module#CardPersonalProfileModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  }
  // == 各期帳單及未出帳查詢 == //
  , {
    path: 'history-bill', loadChildren: './history-bill/history-bill.module#HistoryBillModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  }
  // == 繳信用卡款 == //
  , {
    path: 'pay-credit-payable', loadChildren: './pay-credit-payable/pay-credit-payable.module#PayCreditPayableModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  }
  // // == 紅利兌換紀錄查詢 == //
  // , {
  //   path: 'bonus-convert-history', loadChildren: './bonus-convert-history/bonus-convert-history.module#BonusConvertHistoryModule'
  //   , data: {
  //     preload: false
  //   }
  //   , canActivate: [LoginRequired]
  // }
  // // == 信用卡優惠 == //
  // , {
  //   path: 'card-information', loadChildren: './card-information/card-information.module#CardInformationModule'
  //   , data: {
  //     preload: false
  //   }
  //   // , canActivate: [LoginRequired]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
