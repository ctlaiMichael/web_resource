/**
 * 台幣轉入帳號popup
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

// ---------------- Model Start ---------------- //
import { TranslateModule } from '@ngx-translate/core';
import { RateFormateModule } from '@template/formate/number/rate/rate-formate.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
import { ImageCtrlModule } from '@template/page-ctrl/image-ctrl/image-ctrl.module';
// ---------------- Pages Start ---------------- //
import { TwdTrainInPopupComponent } from './twd-tran-in-popup.component';
// ---------------- API Start ---------------- //
import { SPEC09000303ApiService } from '@api/spec09/spec09000303/spec09000303-api.service';
import { SPEC09000304ApiService } from '@api/spec09/spec09000304/spec09000304-api.service';
// ---------------- Service Start ---------------- //
import { SharedModule } from '@systems/shared.module';
import { TwdTrainInPopupService } from './twd-tran-in-popup.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        TranslateModule,
        FlagFormateModule,
        RateFormateModule,
        SharedModule,
        ImageCtrlModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        TwdTrainInPopupService,
        SPEC09000303ApiService, // 約定轉入帳號查詢
        SPEC09000304ApiService // 常用帳號查詢
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        TwdTrainInPopupComponent
    ],
    exports: [
        TwdTrainInPopupComponent
    ],
    entryComponents: [
        TwdTrainInPopupComponent
    ]
})
export class TwdTrainInPopupModule { }
