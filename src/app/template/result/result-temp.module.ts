/**
 * 交易結果畫面Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormateModule } from '@template/formate/formate.module';
import { TranslateModule } from '@ngx-translate/core';
import { ResultStatusTempComponent } from './result-status-temp.component';

// == 其他template清單 == //
const TemplateList = [
  ResultStatusTempComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormateModule,
    TranslateModule
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
export class ResultStatusTempModule { }
