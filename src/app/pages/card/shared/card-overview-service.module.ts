/**
 * 信用卡總覽 Service Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
// ---------------- Module Start ---------------- //
// ---------------- Pages Start ---------------- //
// ---------------- API Start ---------------- //
import { HistoryBillServiceModule } from '@pages/card/shared/history-bill-service.module';
import { BonusConvertHistoryServiceModule } from '@pages/card/shared/bonus-convert-history-service.module';
import { CardPersonalProfileServiceModule } from '@pages/card/shared/card-personal-profile-service.module';
// ---------------- Service Start ---------------- //
import { CardOverviewService } from './card-overview.service';

@NgModule({
    imports: [
        HistoryBillServiceModule, // 各期,未出帳查詢 API
        BonusConvertHistoryServiceModule, // 兌換紅利相關 API
        CardPersonalProfileServiceModule // 信用卡現況查詢
    ],
    providers: [
        // ---------------- API Start ---------------- //
        // ---------------- Service Start ---------------- //
        CardOverviewService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
    ]
})
export class CardOverviewServiceModule { }