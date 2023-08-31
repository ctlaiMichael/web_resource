/**
 * 基金贖回Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //
import { FundRiskWarningRoutingModule } from './fund-risk-warning-routing.module';
import { FundRiskWarning } from './main/fundRiskWarning.component';

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        FundRiskWarningRoutingModule,
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FundRiskWarning
    ]
})
export class FundRiskWarningModule { }
