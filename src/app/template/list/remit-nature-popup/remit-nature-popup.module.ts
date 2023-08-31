/**
 * 結匯性質選單module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from '@systems/shared.module';

// ---------------- Model Start ---------------- //
import { TranslateModule } from '@ngx-translate/core';

// ---------------- Pages Start ---------------- //
import { RemitNaturePopupComponent } from './remit-nature-popup.component';

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { RemitNaturePopupService } from './remit-nature-popup.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        TranslateModule,
        SharedModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        RemitNaturePopupService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        RemitNaturePopupComponent
    ],
    exports: [
        RemitNaturePopupComponent
    ],
    entryComponents: [
        RemitNaturePopupComponent
    ]
})
export class RemitNaturePopupModule { }
