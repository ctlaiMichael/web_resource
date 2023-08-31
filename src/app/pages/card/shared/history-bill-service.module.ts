/**
 * 各期帳單及未出帳查詢 Service Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
// ---------------- Module Start ---------------- //
// ---------------- Module Service Start ---------------- //
import { CardSelectMonthModule } from '@pages/card/shared/card-select-month/card-select-month.module';
// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //
import { SPEC12010201ApiService } from '@api/spec12/spec12010201/spec12010201-api.service';
import { SPEC12010202ApiService } from '@api/spec12/spec12010202/spec12010202-api.service';
import { SPEC12010301ApiService } from '@api/spec12/spec12010301/spec12010301-api.service';
// ---------------- Service Start ---------------- //
import { HistoryBillService } from '@pages/card/shared/history-bill-main.service';

@NgModule({
    imports: [
        CardSelectMonthModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC12010201ApiService,
        SPEC12010202ApiService,
        SPEC12010301ApiService,
        HistoryBillService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
    ]
})
export class HistoryBillServiceModule { }
