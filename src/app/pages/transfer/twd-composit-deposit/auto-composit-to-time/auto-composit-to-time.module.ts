/**
 * 自動轉定存Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { AutoCompositToTimeRoutingModule } from './auto-composit-to-time-routing.module';
import { SharedModule } from '@systems/shared.module';
import { TransAcctPopupModule } from '@template/list/trans-acct-popup/trans-acct-popup.module';
import { ResultStatusTempModule } from '@template/result/result-temp.module';
import { NoteModule } from '@template/note/note.module';
import { InputCtrlModule } from '@template/input-ctrl/input-ctrl.module';
import { CompositDepositAgreeModule } from '../composit-deposit-agree/composit-deposit-agree.module';
// ---------------- Pages Start ---------------- //
import { AutoCompositToTimeMainComponent } from './auto-composit-to-time-main/auto-composit-to-time-main.component';
import { AutoCompositToTimeModifyComponent } from './auto-composit-to-time-modify/auto-composit-to-time-modify.component';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

import { SPEC09020201ApiService } from '@api/spec09/spec09020201/spec09020201-api.service';
import { AutoCompositToTimeMainService } from '@pages/transfer/shared/auto-composit-to-time-main.service';
import { AutoCompositToTimeModifyService } from '@pages/transfer/shared/auto-composit-to-time-modify.service';
import { SPEC09020301ApiService } from '@api/spec09/spec09020301/spec09020301-api.service';
import { SPEC09020302ApiService } from '@api/spec09/spec09020302/spec09020302-api.service';
import { SPEC09020303ApiService } from '@api/spec09/spec09020303/spec09020303-api.service';

@NgModule({
    imports: [
        AutoCompositToTimeRoutingModule,
        SharedModule,
        TransAcctPopupModule,
        ResultStatusTempModule,
        NoteModule,
        InputCtrlModule,
        CompositDepositAgreeModule
    ],
    providers: [
        // 伺服器
        // 電文
        AutoCompositToTimeMainService,
        AutoCompositToTimeModifyService,
        SPEC09020201ApiService,
        SPEC09020301ApiService,
        SPEC09020302ApiService,
        SPEC09020303ApiService,

        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        AutoCompositToTimeMainComponent,
        AutoCompositToTimeModifyComponent,
        
        
    ]
})
export class AutoCompositToTimeModule { }