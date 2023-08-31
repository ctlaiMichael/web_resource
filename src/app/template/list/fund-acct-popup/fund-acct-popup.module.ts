/**
 * 基金帳號popup
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

// ---------------- Model Start ---------------- //
import { TranslateModule } from '@ngx-translate/core';
import { RateFormateModule } from '@template/formate/number/rate/rate-formate.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
// ---------------- Pages Start ---------------- //
import { FundAcctPopupComponent } from './fund-acct-popup.component';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { SharedModule } from '@systems/shared.module';
import { FundAcctPopupService } from './fund-acct-popup.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        TranslateModule,
        FlagFormateModule,
        RateFormateModule,
        SharedModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        FundAcctPopupService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FundAcctPopupComponent
    ],
    exports: [
        FundAcctPopupComponent
    ],
    entryComponents: [
        FundAcctPopupComponent
    ]
})
export class FundAcctPopupModule { }
