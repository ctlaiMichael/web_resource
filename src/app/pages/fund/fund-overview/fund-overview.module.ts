/**
 * 投資總覽Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { FundOverviewRoutingModule } from './fund-overview-routing.module';

// ---------------- Module Start ---------------- //
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module'; // 國旗
import { FundProfitComponentModule } from '@pages/fund/shared/fund-profit/fund-profit-component.module'; // 投資報酬率樣式
import { FundOverviewServiceModule } from '@pages/fund/shared/fund-overview-service.module';
// ---------------- Pages Start ---------------- //
import { FundOverviewComponent } from './fund-overview-main/fund-overview.component';
import { HomeFundModule } from '@pages/home/user-home-page/home-fund/home-fund.module';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //


@NgModule({
    imports: [
        SharedModule,
        FundOverviewRoutingModule,
        FlagFormateModule,
        FundProfitComponentModule,
        FundOverviewServiceModule,
        // 基金總覽區塊
        HomeFundModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FundOverviewComponent
    ]
})
export class FundOverviewModule { }
