/**
 * 生物辨識
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
// import { SharedModule } from '@systems/shared.module';
import { BiometricInterfaceService } from './biometric-interface.service';
import { BiometricLibService } from './biometric-lib.service';


// ---------------- Pages Start ---------------- //


// ---------------- API Start ---------------- //


// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    
  ],
  providers: [
    // ---------------- Service Start ---------------- //
    BiometricLibService,
    BiometricInterfaceService
  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
    // CardSwiperDirective
  ]
})
export class BiometricModule { }

