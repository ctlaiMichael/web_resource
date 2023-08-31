/**
 * 幣別換算Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { CurrencyConverterRoutingModule } from './currency-converter-routing.module';
import { SharedModule } from '@systems/shared.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
import { CurrencyFlagPopupModule } from '@template/list/currency-flag/currency-flag-popup.module';
import { NumberFormateModule } from '@template/formate/number/number-formate.module';
import { ExchangeRateServiceModule } from '../shared/service/exchange-rate-service.module';

// ---------------- Pages Start ---------------- //
import { CurrencyConverterMainComponent } from './main/currency-converter-main.component';

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        CurrencyConverterRoutingModule,
        FlagFormateModule,
        CurrencyFlagPopupModule,
        NumberFormateModule,
        ExchangeRateServiceModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        CurrencyConverterMainComponent
    ]
})
export class CurrencyConverterModule { }
