/**
 * 自動轉期約定Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { AutoCarryOverAgreementRoutingModule } from './auto-carry-over-agreement-routing.module';
import { SharedModule } from '@systems/shared.module';
import { TransAcctPopupModule } from '@template/list/trans-acct-popup/trans-acct-popup.module';
import { InputCtrlModule } from '@template/input-ctrl/input-ctrl.module';

// ---------------- Pages Start ---------------- //
import { AutoCarryOverMainComponent } from './auto-carry-over-main/auto-carry-over-main-main.component';
import { AutoCarryOverConfirmResultComponent } from './auto-carry-over-confirm-result/auto-carry-over-confirm-result.component';

// ---------------- API Start ---------------- //
import { SPEC07030001ApiService } from '@api/spec07/spec07030001/spec07030001-api.service';
import { SPEC07030101ApiService } from '@api/spec07/spec07030101/spec07030101-api.service';
import { SPEC07030201ApiService } from '@api/spec07/spec07030201/spec07030201-api.service';
// ---------------- Service Start ---------------- //
import { AutoCarryOverService } from '../shared/auto-carry-over.service';

@NgModule({
    imports: [
        SharedModule,
        AutoCarryOverAgreementRoutingModule,
        TransAcctPopupModule,
        InputCtrlModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        AutoCarryOverService,
        SPEC07030001ApiService,
        SPEC07030101ApiService,
        SPEC07030201ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        AutoCarryOverMainComponent,
        AutoCarryOverConfirmResultComponent
    ]
})
export class AutoCarryOverAgreementModule { }
