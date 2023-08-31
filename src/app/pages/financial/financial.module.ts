/**
 * 金融資訊Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { FinancialRoutingModule } from './financial-routing.module';
import { MenuTempModule } from '@template/list/menu/menu-temp.module';


// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //


// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    SharedModule,
    FinancialRoutingModule,
    MenuTempModule
  ],
  providers: [
    // ---------------- Service Start ---------------- //

  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
  ]
})
export class FinancialModule { }

