/**
 * 匯率 Service Module
 */
import { NgModule } from '@angular/core';

// ---------------- Service Start ---------------- //
import { ExchangeRateService } from './exchange-rate.service';
import { ReferenceExchangeRateService } from '@template/reference-exchange-rate/reference-exchange-rate.service';

// ---------------- API Start ---------------- //
import { SPEC10060001ApiService } from '@api/spec10/spec10060001/spec10060001-api.service';

@NgModule({
    imports: [
    ],
    providers: [
        // ---------------- API Start ---------------- //
        SPEC10060001ApiService,
        // SPEC06010102ApiService,
        // ---------------- Service Start ---------------- //
        ExchangeRateService,
        ReferenceExchangeRateService
    ],
    declarations: [
    ]
})
export class ExchangeRateServiceModule { }
