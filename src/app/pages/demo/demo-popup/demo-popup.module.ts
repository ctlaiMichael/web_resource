import { NgModule } from '@angular/core';
import { DemoPopupComponent } from './demo-popup.component';
import { DemoPopupRoutingModule } from './demo-popup-routing.module';
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    SharedModule,
    DemoPopupRoutingModule
  ],
  providers: [
    // ---------------- Service Start ---------------- //

  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
    DemoPopupComponent
  ]
})
export class DemoPopupModule { }
