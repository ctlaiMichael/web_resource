/**
 * 基金贖回Module
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
import { SecurityInterfaceModule } from '@systems/security-interface/security-interface.module';
import { ResultStatusTempModule } from '@template/result/result-temp.module';
import { FundConvertMainComponent } from './fund-convert-main/fund-convert-main.component';
import { FundConvertService } from '../shared/fund-convert.service';
import { SPEC11030101ApiService } from '@api/spec11/spec11030101/spec11030101-api.service';

const TemplateList = [
  FundConvertMainComponent // 轉換編輯頁
];

@NgModule({
  imports: [
    SharedModule,
    StepBarModule,
    ResultStatusTempModule,
    SecurityInterfaceModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
    FundConvertService,
    SPEC11030101ApiService
  ]
})
export class FundConvertModule { }


