/**
 * 投資總覽 Service Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
// ---------------- Module Start ---------------- //
// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //
import { SPEC11010101ApiService } from '@api/spec11/spec11010101/spec11010101-api.service'; // 基金總覽
import { SPEC11010301ApiService } from '@api/spec11/spec11010301/spec11010301-api.service'; // 投資組合
// ---------------- Service Start ---------------- //
import { FundOverviewService } from './fund-overview.service';

@NgModule({
    imports: [
    ],
    providers: [
        // ---------------- API Start ---------------- //
        SPEC11010301ApiService,
        SPEC11010101ApiService,
        // ---------------- Service Start ---------------- //
        FundOverviewService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
    ]
})
export class FundOverviewServiceModule { }