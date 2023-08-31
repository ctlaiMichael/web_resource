/**
 * 信用卡服務Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { CardRoutingModule } from './card-routing.module';
// import { CardSwiperDirective } from './shared/card-swiper.directive';

// ---------------- Pages Start ---------------- //


// ---------------- API Start ---------------- //


// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    SharedModule
    , CardRoutingModule
  ],
  providers: [
    // ---------------- Service Start ---------------- //

  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
    // CardSwiperDirective
  ]
})
export class CardModule { }

