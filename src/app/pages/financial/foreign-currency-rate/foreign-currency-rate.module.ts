/**
 * 外幣利率Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { ForeignCurrencyRateRoutingModule } from './foreign-currency-rate-routing.module';
import { SharedModule } from '@systems/shared.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
import { CurrencyFlagPopupModule } from '@template/list/currency-flag/currency-flag-popup.module';
import { ForeignCurrencyRateMainComponent } from './main/foreign-currency-rate-main.component';

// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //
import { SPEC10020001ApiService } from '@api/spec10/spec10020001/spec10020001-api.service';

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        ForeignCurrencyRateRoutingModule,
        FlagFormateModule,
        CurrencyFlagPopupModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC10020001ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        ForeignCurrencyRateMainComponent
    ]
})
export class ForeignCurrencyRateModule { }
