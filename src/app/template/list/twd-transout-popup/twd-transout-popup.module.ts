/**
 * 台幣轉出帳號popup
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
// ---------------- Pages Start ---------------- //
import { TwdTransOutPopupComponent } from './twd-transout-popup.component';
// ---------------- Service Start ---------------- //
import { TwdTransOutPopupService } from './twd-transout-popup.service';
import { TwdTransOutServiceModule } from './twd-transout-service.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        TranslateModule,
        FlagFormateModule,
        RateFormateModule,
        SharedModule,
        TwdTransOutServiceModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        TwdTransOutPopupService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        TwdTransOutPopupComponent
    ],
    exports: [
        TwdTransOutPopupComponent
    ],
    entryComponents: [
        TwdTransOutPopupComponent
    ]
})
export class TwdTransOutPopupModule { }
