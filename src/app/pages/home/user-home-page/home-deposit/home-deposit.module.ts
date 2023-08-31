/**
 * 登入首頁-帳戶區塊
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { HomeDepositComponent } from './home-deposit.component';
import { UserHomeServiceModule } from '@pages/home/shared/user-home/user-home-service.module';

// == 其他template清單 == //
const TemplateList = [
  HomeDepositComponent
];

@NgModule({
  imports: [
    SharedModule,
    UserHomeServiceModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: []
})
export class HomeDepositModule { }
