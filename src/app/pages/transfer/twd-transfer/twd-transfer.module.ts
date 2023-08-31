/**
 * 台幣轉帳Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { TwdTransferRoutingModule } from './twd-transfer-routing.module';
import { SharedModule } from '@systems/shared.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
import { NoteModule } from '@template/note/note.module';
import { BankCodePopupModule } from '@template/list/bank-code-popup/bank-code-popup.module';
import { BookmarkModule } from '@template/bookmark/bookmark.module';
import { TwdTransOutPopupModule } from '@template/list/twd-transout-popup/twd-transout-popup.module';
import { TwdTrainInPopupModule } from '@template/list/twd-tran-in-popup/twd-tran-in-popup.module';
import { TwdTransOutServiceModule } from '@template/list/twd-transout-popup/twd-transout-service.module';
import { ResultStatusTempModule } from '@template/result/result-temp.module';
import { ImageCtrlModule } from '@template/page-ctrl/image-ctrl/image-ctrl.module';
import { AmountMaskModule } from '@template/formate/mask/amount/amount-mask.module';
// ---------------- Pages Start ---------------- //
import { TwdTransferMainComponent } from './twd-transfer-main/twd-transfer-main.component';
import { TwdTransferConfirmResultComponent } from './twd-transfer-confirm-result/twd-transfer-confirm-result.component';
// ---------------- API Start ---------------- //
import { SPEC09000305ApiService } from '@api/spec09/spec09000305/spec09000305-api.service';
import { SPEC09000306ApiService } from '@api/spec09/spec09000306/spec09000306-api.service';
// ---------------- Service Start ---------------- //
import { TwdTransferService } from '../shared/twd-transfer.service';
import { SocialsharingPluginService } from '@lib/share/plugins/socialsharing/socialsharing-plugin.service';

@NgModule({
    imports: [
        SharedModule,
        TwdTransferRoutingModule,
        StepBarModule,
        NoteModule,
        BankCodePopupModule,
        TwdTransOutPopupModule, // 台幣轉出帳號
        TwdTrainInPopupModule, // 台幣轉入帳號
        TwdTransOutServiceModule, // 台幣轉出帳號api (包成module)
        BookmarkModule, // 頁籤套件
        ResultStatusTempModule,
        ImageCtrlModule,
        AmountMaskModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        TwdTransferService,
        SPEC09000305ApiService, // 台幣轉帳(確認)
        SPEC09000306ApiService, // 台幣轉帳(交易)
        SocialsharingPluginService // 訊息分享
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        TwdTransferMainComponent,
        TwdTransferConfirmResultComponent
    ]
})
export class TwdTransferModule { }
