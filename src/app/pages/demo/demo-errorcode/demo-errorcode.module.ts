import { NgModule } from '@angular/core';
import { DemoErrorCodeRoutingModule } from './demo-errorcode-routing.module';

// ---------------- Model Start ---------------- //
import { SharedModule } from '@systems/shared.module';
// ---------------- API Start ---------------- //
// ---------------- Shared Start ---------------- //
import { DemoErrorCodeComponent } from './demo-errorcode.component';



@NgModule({
  imports: [
    SharedModule,
    DemoErrorCodeRoutingModule
  ]
  ,
  providers: [
      // ---------------- Service Start ---------------- //
  ],
  declarations: [
    DemoErrorCodeComponent
  ],
  entryComponents: [
  ],
  exports: [
      // 主要page放出來即可
  ]

})
export class DemoErrorCodeModule { }
