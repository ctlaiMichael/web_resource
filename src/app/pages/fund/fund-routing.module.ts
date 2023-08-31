/**
 * Route定義
 * 投資理財服務
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRequired } from '@systems/system/auth/login-required.service';
import { FundRequired } from '@systems/system/auth/fund-required.service';
// ---------------- Pages Start ---------------- //

const routes: Routes = [
  { path: '', redirectTo: 'fund-overview', pathMatch: 'full' },
  // ----------------------------------- 查詢 ----------------------------------- //
  // == 投資理財總覽 == //
  {
    path: 'fund-overview', loadChildren: './fund-overview/fund-overview.module#FundOverviewModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  }
  // == 投資組合分析 == //
  , {
    path: 'fund-invest-healthy', loadChildren: './fund-invest-healthy/fund-invest-healthy.module#FundInvestHealthyModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  }
  // == 投資現值查詢 == //
  , {
    path: 'fund-account-balance', loadChildren: './fund-account-balance/fund-account-balance.module#FundAccountBalanceModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  }
  // == 已實現損益查詢 == //
  , {
    path: 'fund-profit-loss', loadChildren: './fund-profit-loss/fund-profit-loss.module#FundProfitLossModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  },
  // == 投資交易明細查詢 == //
  {
    path: 'fund-history', loadChildren: './fund-history/fund-history.module#FundHistoryModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  }

  
  // ----------------------------------- 交易 ----------------------------------- //
  // == 基金申購 == //
  , {
    path: 'fund-invest', loadChildren: './fund-invest/fund-invest.module#FundInvestModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  }
  // == 基金贖回 == //
  , {
    path: 'fund-redeem', loadChildren: './fund-redeem/fund-redeem.module#FundRedeemModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  }
  // == 基金轉換 == //
  , {
    path: 'fund-convert', loadChildren: './fund-convert/fund-convert.module#FundConvertModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  }
  // == 定期(不)定額查詢修改 == //
  , {
    path: 'fund-inquiry-modify', loadChildren: './fund-inquiry-modify/fund-inquiry-modify.module#FundInquiryModifyModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  }
  // == 理財妙管家 == //
  , {
    path: 'auto-fund-redeem', loadChildren: './auto-fund-redeem/auto-fund-redeem.module#AutoFundRedeemModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired, FundRequired]
  }

  
  // ----------------------------------- 其他 ----------------------------------- //
  // // == 投資資訊情報 == // 尚未開放
  // , {
  //   path: 'invest-information', loadChildren: './invest-information/invest-information.module#InvestInformationModule'
  //   , data: {
  //     preload: false
  //   }
  //   // , canActivate: [LoginRequired]
  // }
  // == 基金風險警語 == //
  , {
    path: 'fund-risk-warning', loadChildren: './fund-risk-warning/fund-risk-warning.module#FundRiskWarningModule'
    , data: {
      preload: false
    }
    // , canActivate: [LoginRequired]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundRoutingModule { }
