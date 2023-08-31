/**
 * 其他服務Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { OtherRoutingModule } from './other-routing.module';

// ---------------- Pages Start ---------------- //


// ---------------- API Start ---------------- //


// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    SharedModule
    , OtherRoutingModule
  ],
  providers: [
    // ---------------- Service Start ---------------- //

  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
  ]
})
export class OtherModule { }

