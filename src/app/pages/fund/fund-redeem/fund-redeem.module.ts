/**
 * 基金贖回Module
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
import { SecurityInterfaceModule } from '@systems/security-interface/security-interface.module';
import { FundRedeemMainComponent } from './fund-redeem-main/fund-redeem-main.component';
import { FundRedeemConfirmResultComponent } from './fund-redeem-confirm-result/fund-redeem-confirm-result.component';
import { FundRedeemService } from '../shared/fund-redeem.service';
import { SPEC11020101ApiService } from '@api/spec11/spec11020101/spec11020101-api.service';
import { SPEC11020201ApiService } from '@api/spec11/spec11020201/spec11020201-api.service';
import { SPEC11020301ApiService } from '@api/spec11/spec11020301/spec11020301-api.service';
import { SPEC11020102ApiService } from '@api/spec11/spec11020102/spec11020102-api.service';
import { SPEC11020202ApiService } from '@api/spec11/spec11020202/spec11020202-api.service';
import { SPEC11020302ApiService } from '@api/spec11/spec11020302/spec11020302-api.service';
import { FundAcctPopupService } from '@template/list/fund-acct-popup/fund-acct-popup.service';
import { ResultStatusTempModule } from '@template/result/result-temp.module';
import { FundProfitComponentModule } from '@pages/fund/shared/fund-profit/fund-profit-component.module';

const TemplateList = [
    FundRedeemMainComponent, // 贖回編輯頁
    FundRedeemConfirmResultComponent // 贖回確認,結果頁
];

@NgModule({
  imports: [
    SharedModule,
    StepBarModule,
    ResultStatusTempModule,
    SecurityInterfaceModule,
    FundProfitComponentModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
    FundRedeemService,
    FundAcctPopupService,
    SPEC11020101ApiService, // 基金贖回編輯(台幣)
    SPEC11020201ApiService, // 基金贖回確認(台幣)
    SPEC11020301ApiService, // 基金贖回結果(台幣)
    SPEC11020102ApiService, // 基金贖回編輯(外幣)
    SPEC11020202ApiService, // 基金贖回確認(外幣)
    SPEC11020302ApiService  // 基金贖回結果(外幣)
  ]
})
export class FundRedeemModule { }


