/**
 * 投資理財服務Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { FundRoutingModule } from './fund-routing.module';
import { FundRequired } from '@systems/system/auth/fund-required.service';

// ---------------- Pages Start ---------------- //


// ---------------- API Start ---------------- //


// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    SharedModule
    , FundRoutingModule
  ],
  providers: [
    // ---------------- Service Start ---------------- //
    FundRequired
  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
  ]
})
export class FundModule { }

