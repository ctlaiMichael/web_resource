import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategy } from '@systems/route/selective-preloading-strategy';
import { LoginRequired } from '@systems/system/auth/login-required.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    // == 框架與系統相關其他功能 == //
    path: 'layout', loadChildren: '@pages/layout/layout.module#LayoutModule'
    , data: {
      preload: true
    }
  },
  {
    // 首頁
    path: 'home', loadChildren: '@pages/home/home.module#HomeModule'
    , data: {
      preload: true
    }
  },
  {
    // == 登入頁面 == //
    path: 'login', loadChildren: '@pages/login/login.module#LoginModule'
    , data: {
      preload: true
    }
  },
  {
    // == Demo == //
    path: 'demo', loadChildren: '@pages/demo/demo.module#DemoModule'
    , data: {
      preload: false
    }
  },
  // ======================================== 業務功能 ======================================== //
  {
    // == 帳戶資產查詢 == //
    path: 'deposit', loadChildren: '@pages/deposit/deposit.module#DepositModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  },
  {
    // == 定期存款服務 == //
    path: 'time-deposit', loadChildren: '@pages/time-deposit/time-deposit.module#TimeDepositModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  },
  {
    // == 貸款服務 == //
    path: 'loan', loadChildren: '@pages/loan/loan.module#LoanModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  },
  {
    // == 轉帳交易服務 == //
    path: 'transfer', loadChildren: '@pages/transfer/transfer.module#TransferModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  },
  {
    // == 基金業務 == //
    path: 'fund', loadChildren: '@pages/fund/fund.module#FundModule'
    , data: {
      preload: false
    }
  },
  {
    // == 信用卡 == //
    path: 'card', loadChildren: '@pages/card/card.module#CardModule'
    , data: {
      preload: false
    }
  },
  // ======================================== 其他功能 ======================================== //
  {
    // == 金融資訊 == //
    path: 'financial', loadChildren: '@pages/financial/financial.module#FinancialModule'
    , data: {
      preload: true // 首頁效果要漂亮先載入為佳
    }
  },
  {
    // == 其他服務 == //
    path: 'other', loadChildren: '@pages/other/other.module#OtherModule'
    , data: {
      preload: false
    }
  },
  {
    // == 設定 == //
    path: 'setting', loadChildren: '@pages/setting/setting.module#SettingModule'
    , data: {
      preload: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
    , preloadingStrategy: SelectivePreloadingStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
