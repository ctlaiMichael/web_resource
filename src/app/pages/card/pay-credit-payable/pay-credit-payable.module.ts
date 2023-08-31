/**
 * 繳信用卡款Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { PayCreditPayableRoutingModule } from './pay-credit-payable-routing.module';

// ---------------- Module Start ---------------- //
import { CardNoticeModule } from '@pages/card/shared/card-notice/card-notice.module';
import { TransAcctPopupModule } from '@template/list/trans-acct-popup/trans-acct-popup.module';
import { ResultStatusTempModule } from '@template/result/result-temp.module';
import { SecurityInterfaceModule } from '@systems/security-interface/security-interface.module';
// ---------------- Pages Start ---------------- //
import { PayCreditPayableMainComponent } from './pay-credit-payable-main/pay-credit-payable-main.component';
import { PayableConfirmResultComponent } from './payable-confirm-result/payable-confirm-result.component';
// ---------------- API Start ---------------- //
import { SPEC00040201ApiService } from '@api/spec00/spec00040201/spec00040201-api.service';
import { SPEC12030101ApiService } from '@api/spec12/spec12030101/spec12030101-api.service';
import { SPEC12030102ApiService } from '@api/spec12/spec12030102/spec12030102-api.service';
// ---------------- Service Start ---------------- //
import { PayCreditPayableService } from '../shared/pay-credit-payable.service';

@NgModule({
    imports: [
        SharedModule,
        PayCreditPayableRoutingModule,
        CardNoticeModule, // 謹慎理財note
        TransAcctPopupModule,
        ResultStatusTempModule,
        SecurityInterfaceModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        PayCreditPayableService,
        SPEC00040201ApiService, // 查詢轉出帳號
        SPEC12030101ApiService, // 取得繳卡費(本期帳單資訊)
        SPEC12030102ApiService // 信用卡繳卡費(交易)
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        PayCreditPayableMainComponent, // 編輯頁
        PayableConfirmResultComponent // 確認,結果頁
    ]
})
export class PayCreditPayableModule { }
