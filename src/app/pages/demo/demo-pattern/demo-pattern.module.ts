import { NgModule } from '@angular/core';
import { DemoPatternRoutingModule } from './demo-pattern-routing.module';

// ---------------- Model Start ---------------- //
import { SharedModule } from '@systems/shared.module';
// import { DepositInquiryServiceModule } from '@pages/deposit/shared/deposit-inquiry-service.module'; // 首頁資料處理
// ---------------- API Start ---------------- //
// ---------------- Shared Start ---------------- //
import { DemoPatternComponent } from './demo-pattern.component';
import { PatternLockModule } from '@lib/pattern/pattern-lock.module';



@NgModule({
  imports: [
    SharedModule,
    DemoPatternRoutingModule,
    PatternLockModule
  ]
  ,
  providers: [
      // ---------------- Service Start ---------------- //
  ],
  declarations: [
    DemoPatternComponent
  ],
  entryComponents: [
  ],
  exports: [
      // 主要page放出來即可
  ]

})
export class DemoPatternModule { }
