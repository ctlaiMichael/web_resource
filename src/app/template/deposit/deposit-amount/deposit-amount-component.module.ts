/**
 * 存款帳戶資訊顯示
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { DepositAmountDirective } from './deposit-amount.directive';
import { DepositAmountResultDirective } from './deposit-amount-result.directive';
// == 其他template清單 == //
const TemplateList = [
  DepositAmountDirective,
  DepositAmountResultDirective
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
export class DepositAmountComponentModule { }
