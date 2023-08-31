/**
 * 帳號選單(交易類)popup
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

// ---------------- Model Start ---------------- //
import { TranslateModule } from '@ngx-translate/core';
import { RateFormateModule } from '@template/formate/number/rate/rate-formate.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';

// import { BookmarkModule } from '@shared/template/select/bookmark/bookmark.module'; // 頁籤
// ---------------- Pages Start ---------------- //
import { TransAcctPopupComponent } from './trans-acct-popup.component';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { TransAcctPopupService } from './trans-acct-popup.service';
import { SharedModule } from '@systems/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        TranslateModule,
        FlagFormateModule,
        RateFormateModule,
        SharedModule
        // BookmarkModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        TransAcctPopupService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        TransAcctPopupComponent
    ],
    exports: [
        TransAcctPopupComponent
    ],
    entryComponents: [
        TransAcctPopupComponent
    ]
})
export class TransAcctPopupModule { }
