/**
 * 登入首頁-信用卡區塊
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { HomeCardsComponent } from './home-cards.component';
import { CardOverviewServiceModule } from '@pages/card/shared/card-overview-service.module';

// == 其他template清單 == //
const TemplateList = [
  HomeCardsComponent
];

@NgModule({
  imports: [
    SharedModule,
    CardOverviewServiceModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: []
})
export class HomeCardsModule { }
