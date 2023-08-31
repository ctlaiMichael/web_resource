/**
 * 信卡紅利點數查詢 Service Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
// ---------------- Module Start ---------------- //
// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //
import { SPEC12020201ApiService } from '@api/spec12/spec12020201/spec12020201-api.service';
// ---------------- Service Start ---------------- //
import { BonusConvertHistoryService } from './bonus-convert-history.service';

@NgModule({
    imports: [
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC12020201ApiService,
        BonusConvertHistoryService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
    ]
})
export class BonusConvertHistoryServiceModule { }
