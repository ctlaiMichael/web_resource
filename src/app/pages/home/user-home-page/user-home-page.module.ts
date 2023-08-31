/**
 * 登入後首頁
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { UserHomePageRoutingModule } from './user-home-page-routing.module';

// ---------------- Model Start ---------------- //
import { GreetingsModule } from '@template/greetings/greetings.module'; // 問候語
import { HomeDepositModule } from '@pages/home/user-home-page/home-deposit/home-deposit.module'; // 帳戶
import { HomeCardsModule } from '@pages/home/user-home-page/home-cards/home-cards.module'; // 信用卡
import { HomeFundModule } from '@pages/home/user-home-page/home-fund/home-fund.module'; // 投資理財
import { HomeFinancialModule } from '@pages/home/user-home-page/home-financial/home-financial.module'; // 外幣匯率
import { AdvertModule } from '@template/advert/advert.module';
// ---------------- API Start ---------------- //
// ---------------- Shared Start ---------------- //
// ---------------- Page Start ---------------- //
import { UserHomePageComponent } from './user-home-page.component';


@NgModule({
  imports: [
    SharedModule,
    UserHomePageRoutingModule
    // == 首頁資料處理 == //
    , GreetingsModule // 問候語
    , HomeDepositModule
    , HomeCardsModule
    , HomeFundModule
    , HomeFinancialModule
    , AdvertModule
  ]
  ,
  providers: [
      // ---------------- Service Start ---------------- //
  ],
  declarations: [
    UserHomePageComponent
  ],
  entryComponents: [
  ],
  exports: [
      // 主要page放出來即可
  ]

})
export class UserHomePageModule { }
