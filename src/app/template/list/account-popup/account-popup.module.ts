/**
 * 外幣匯率popup
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
import { AccountPopupComponent } from './account-popup.component';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { AccountPopupService } from './account-popup.service';
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
        AccountPopupService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        AccountPopupComponent
    ],
    exports: [
        AccountPopupComponent
    ],
    entryComponents: [
        AccountPopupComponent
    ]
})
export class AccountPopupModule { }
