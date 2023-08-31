/**
 * 銀行代碼選單popup
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from '@systems/shared.module';
// ---------------- Model Start ---------------- //
import { TranslateModule } from '@ngx-translate/core';
import { RateFormateModule } from '@template/formate/number/rate/rate-formate.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';

// import { BookmarkModule } from '@shared/template/select/bookmark/bookmark.module'; // 頁籤
// ---------------- Pages Start ---------------- //
import { BankCodePopupComponent } from './bank-code-popup.component';
// ---------------- API Start ---------------- //
import { SPEC00010101ApiService } from '@api/spec00/spec00010101/spec00010101-api.service';
// ---------------- Service Start ---------------- //
import { BankCodePopupService } from './bank-code-popup.service';
import { BankCodeService } from './bank-code.service';

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
        BankCodePopupService,
        BankCodeService,
        SPEC00010101ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        BankCodePopupComponent
    ],
    exports: [
        BankCodePopupComponent
    ],
    entryComponents: [
        BankCodePopupComponent
    ]
})
export class BankCodePopupModule { }
