/**
 * 設定Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { SettingRoutingModule } from './setting-routing.module';
import { MenuTempModule } from '@template/list/menu/menu-temp.module';
// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //


// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    SharedModule,
    SettingRoutingModule,
    MenuTempModule
  ],
  providers: [
    // ---------------- Service Start ---------------- //

  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
  ]
})
export class SettingModule { }

