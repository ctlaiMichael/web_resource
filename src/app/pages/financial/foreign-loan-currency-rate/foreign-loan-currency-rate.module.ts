/**
 * 外幣放款利率Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { ForeignLoanCurrencyRateRoutingModule } from './foreign-loan-currency-rate-routing.module';
import { SharedModule } from '@systems/shared.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
// ---------------- Pages Start ---------------- //
import { ForeignLoanCurrencyRateMainComponent } from './main/foreign-loan-currency-rate-main.component';

// ---------------- API Start ---------------- //
import { SPEC10030001ApiService } from '@api/spec10/spec10030001/spec10030001-api.service';

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        ForeignLoanCurrencyRateRoutingModule,
        FlagFormateModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC10030001ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        ForeignLoanCurrencyRateMainComponent
    ]
})
export class ForeignLoanCurrencyRateModule { }
