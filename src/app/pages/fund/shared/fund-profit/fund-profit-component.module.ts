/**
 * 存款帳戶資訊顯示
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { FundProfitDirective } from './fund-profit.directive';
import { FundCodeDirective } from './fund-code.directive';
import { FundAmountDirective } from './fund-amount.directive';
// == 其他template清單 == //
const TemplateList = [
  FundProfitDirective // 損益
  , FundCodeDirective // 基金標的
  , FundAmountDirective // 投資金額
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
  ]
})
export class FundProfitComponentModule { }
