/**
 * 台幣利率Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { CurrencyRateRoutingModule } from './currency-rate-routing.module';
import { SharedModule } from '@systems/shared.module';
import { MenuPopupModule } from '@template/list/menu-popup/menu-popup.module';
import { BookmarkModule } from '@template/bookmark/bookmark.module';

// ---------------- Pages Start ---------------- //
import { CurrencyRateMainComponent } from './main/currency-rate-main.component';

// ---------------- API Start ---------------- //
import { SPEC10010001ApiService } from '@api/spec10/spec10010001/spec10010001-api.service';

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        CurrencyRateRoutingModule,
        MenuPopupModule,
        BookmarkModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC10010001ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        CurrencyRateMainComponent
    ],
    exports: [
        CurrencyRateMainComponent
    ]
})
export class CurrencyRateModule { }
