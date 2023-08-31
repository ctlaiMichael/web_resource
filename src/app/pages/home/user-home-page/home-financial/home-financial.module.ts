/**
 * 登入首頁-帳戶區塊
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { HomeFinancialComponent } from './home-financial.component';
import { ExchangeRateServiceModule } from '@pages/financial/shared/service/exchange-rate-service.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';

// == 其他template清單 == //
const TemplateList = [
  HomeFinancialComponent
];

@NgModule({
  imports: [
    SharedModule,
    ExchangeRateServiceModule,
    FlagFormateModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: []
})
export class HomeFinancialModule { }
