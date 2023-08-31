/**
 * 貸款本息攤還試算Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { LoanCalculatorRoutingModule } from './loan-calculator-routing.module';
import { SharedModule } from '@systems/shared.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
import { InputCtrlModule } from '@template/input-ctrl/input-ctrl.module';

// ---------------- Pages Start ---------------- //
import { LoanCalculatorMainComponent } from './main/loan-calculator-main.component';
import { LoanCalculatorResultComponent } from './loan-calculator-result/loan-calculator-result.component';

// ---------------- API Start ---------------- //
import { SPEC10050001ApiService } from '@api/spec10/spec10050001/spec10050001-api.service';

// ---------------- Service Start ---------------- //
import { LoanCalculatorService } from '../shared/service/loan-calculator.service';

@NgModule({
    imports: [
        SharedModule,
        LoanCalculatorRoutingModule,
        StepBarModule,
        InputCtrlModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        LoanCalculatorService,
        SPEC10050001ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        LoanCalculatorMainComponent,
        LoanCalculatorResultComponent
    ]
})
export class LoanCalculatorModule { }
