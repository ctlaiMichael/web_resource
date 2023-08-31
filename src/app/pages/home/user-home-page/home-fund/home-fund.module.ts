/**
 * 登入首頁-投資理財
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
// -- page -- //
import { HomeFundComponent } from './home-fund.component';
import { FundProfitComponentModule } from '@pages/fund/shared/fund-profit/fund-profit-component.module';
import { FundOverviewServiceModule } from '@pages/fund/shared/fund-overview-service.module';

// == 其他template清單 == //
const TemplateList = [
  HomeFundComponent
];

@NgModule({
  imports: [
    SharedModule,
    FundOverviewServiceModule,
    FundProfitComponentModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: []
})
export class HomeFundModule { }
