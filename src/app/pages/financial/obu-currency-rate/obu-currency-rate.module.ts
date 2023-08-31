/**
 * OBU存款利率Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { ObuCurrencyRateRoutingModule } from './obu-currency-rate-routing.module';
import { SharedModule } from '@systems/shared.module';
import { ObuCurrencyRateMainComponent } from './main/obu-currency-rate-main.component';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
import { CurrencyFlagPopupModule } from '@template/list/currency-flag/currency-flag-popup.module';

// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //
import { SPEC10040001ApiService } from '@api/spec10/spec10040001/spec10040001-api.service';

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        ObuCurrencyRateRoutingModule,
        FlagFormateModule,
        CurrencyFlagPopupModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC10040001ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        ObuCurrencyRateMainComponent
    ]
})
export class ObuCurrencyRateModule { }
