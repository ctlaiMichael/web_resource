/**
 * 系統框架相關Module
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';

// ---------------- Pages Start ---------------- //


// ---------------- API Start ---------------- //


// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    SharedModule
    , LayoutRoutingModule
  ],
  providers: [
    // ---------------- Service Start ---------------- //

  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
  ]
})
export class LayoutModule { }

