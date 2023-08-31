/**
 * 立即轉定存Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { CompositToTimeRoutingModule } from './composit-to-time-routing.module';
import { SharedModule } from '@systems/shared.module';
import { TransAcctPopupModule } from '@template/list/trans-acct-popup/trans-acct-popup.module';
import { ResultStatusTempModule } from '@template/result/result-temp.module';
import { NoteModule } from '@template/note/note.module';
import { InputCtrlModule } from '@template/input-ctrl/input-ctrl.module';
import { CurrencyRateModule } from '@pages/financial/currency-rate/currency-rate.module';
import { CompositDepositAgreeModule } from '../composit-deposit-agree/composit-deposit-agree.module';
// ---------------- Pages Start ---------------- //
import { CompositToTimeMainComponent } from './composit-to-time-main/composit-to-time-main.component';
import { CompositToTimeModifyComponent } from './composit-to-time-modify/composit-to-time-modify.component';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { CompositToTimeMainService } from '@pages/transfer/shared/composit-to-time-main.service';
import { CompositToTimeModifyService } from '@pages/transfer/shared/composit-to-time-modify.service';
import { SPEC09020201ApiService } from '@api/spec09/spec09020201/spec09020201-api.service';
import { SPEC09020202ApiService } from '@api/spec09/spec09020202/spec09020202-api.service';
import { SPEC09020203ApiService } from '@api/spec09/spec09020203/spec09020203-api.service';

@NgModule({
    imports: [
        SharedModule,
        CompositToTimeRoutingModule,
        TransAcctPopupModule,
        ResultStatusTempModule,
        NoteModule,
        InputCtrlModule,
        CurrencyRateModule,
        CompositDepositAgreeModule
    ],
    providers: [
        // 伺服器
        // 電文
        CompositToTimeMainService,
        CompositToTimeModifyService,
        SPEC09020201ApiService,
        SPEC09020202ApiService,
        SPEC09020203ApiService,

        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        CompositToTimeMainComponent,
        CompositToTimeModifyComponent
    ]
})
export class CompositToTimeModule { }
