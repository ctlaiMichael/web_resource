import { NgModule } from '@angular/core';
import { DemoSecurityRoutingModule } from './demo-security-routing.module';

// ---------------- Model Start ---------------- //
import { SharedModule } from '@systems/shared.module';
// import { DepositInquiryServiceModule } from '@pages/deposit/shared/deposit-inquiry-service.module'; // 首頁資料處理
// ---------------- API Start ---------------- //
// ---------------- Shared Start ---------------- //
import { DemoSecurityComponent } from './demo-security.component';



@NgModule({
  imports: [
    SharedModule,
    DemoSecurityRoutingModule
  ]
  ,
  providers: [
      // ---------------- Service Start ---------------- //
  ],
  declarations: [
    DemoSecurityComponent
  ],
  entryComponents: [
  ],
  exports: [
      // 主要page放出來即可
  ]

})
export class DemoSecurityModule { }
