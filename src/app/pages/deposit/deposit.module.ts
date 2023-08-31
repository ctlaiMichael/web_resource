/**
 * 帳戶資產查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { DepositRoutingModule } from './deposit-routing.module';

// ---------------- Pages Start ---------------- //


// ---------------- API Start ---------------- //


// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    SharedModule
    , DepositRoutingModule
  ],
  providers: [
    // ---------------- Service Start ---------------- //

  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
  ]
})
export class DepositModule { }

