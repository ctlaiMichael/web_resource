/**
 * 信用卡總覽Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { CardOverviewRoutingModule } from './card-overview-routing.module';
// ---------------- Module Start ---------------- //
import { HomeCardsModule } from '@pages/home/user-home-page/home-cards/home-cards.module'; // 未列帳單區塊
import { CardNoticeModule } from '@pages/card/shared/card-notice/card-notice.module'; // 謹慎理財note
import { PaymentStatusModule } from '@pages/card/shared/payment-status/payment-status.module';
import { AdvertModule } from '@template/advert/advert.module';
// ---------------- Module Service Start ---------------- //
import { CardOverviewServiceModule } from '@pages/card/shared/card-overview-service.module';
// ---------------- Pages Start ---------------- //
import { CardOverviewComponent } from './card-overview.component';
// import { CardSwiperDirective } from '@pages/card/shared/card-swiper.directive';
// ---------------- API Start ---------------- //
// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        CardOverviewRoutingModule,
        // ---------------- Service Module ---------------- //
        CardOverviewServiceModule,
        // ---------------- Component Module ---------------- //
        CardNoticeModule, // 謹慎理財note
        PaymentStatusModule, // 繳費狀態區塊
        HomeCardsModule,
        AdvertModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        CardOverviewComponent
    ]
})
export class CardOverviewModule { }
