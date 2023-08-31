/**
 * footer功能選單
 */
import { NgModule } from '@angular/core';
// ---------------- Model Start ---------------- //
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //
import { FooterComponent } from './footer.component';
// ---------------- API Start ---------------- //
// ---------------- Service Start ---------------- //
// ---------------- Shared Start ---------------- //

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    FooterComponent
  ]
})
export class FooterModule { }
