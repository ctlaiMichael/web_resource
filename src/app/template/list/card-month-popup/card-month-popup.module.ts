/**
 * 信卡月份選單popup
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
import { CardMonthPopupComponent } from './card-month-popup.component';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { CardMonthPopupService } from './card-month-popup.service';
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
        CardMonthPopupService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        CardMonthPopupComponent
    ],
    exports: [
        CardMonthPopupComponent
    ],
    entryComponents: [
        CardMonthPopupComponent
    ]
})
export class CardMonthPopupModule { }
