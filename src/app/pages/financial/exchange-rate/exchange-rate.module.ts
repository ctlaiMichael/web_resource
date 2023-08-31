/**
 * 外幣匯率Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { SharedModule } from '@systems/shared.module';
import { BookmarkModule } from '@template/bookmark/bookmark.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
import { CurrencyFlagPopupModule } from '@template/list/currency-flag/currency-flag-popup.module';
import { ExchangeRateServiceModule } from '../shared/service/exchange-rate-service.module';

// ---------------- Pages Start ---------------- //
import { ExchangeRateMainComponent } from './main/exchange-rate-main.component';
import { ExchangeRateHistoryComponent } from './history/exchange-rate-history.component';

// ---------------- API Start ---------------- //
import { SPEC10070001ApiService } from '@api/spec10/spec10070001/spec10070001-api.service';
import { ChartLineComponentModule } from '@template/chart/chart-line/chart-line.component.module';

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        ExchangeRateRoutingModule,
        BookmarkModule,
        FlagFormateModule,
        CurrencyFlagPopupModule,
        ExchangeRateServiceModule,
        ChartLineComponentModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC10070001ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        ExchangeRateMainComponent,
        ExchangeRateHistoryComponent
    ],
    exports: [
        ExchangeRateMainComponent,
        ExchangeRateHistoryComponent
    ]
})
export class ExchangeRateModule { }
