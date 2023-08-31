/**
 * 帳戶明細查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { DepositOverviewRoutingModule } from './deposit-overview-routing.module';

// ---------------- Module Start ---------------- //
import { ChartDoughnutComponentModule } from '@template/chart/chart-doughnut/chart-doughnut.component.module'; // Chart
import { ExpandListModule } from '@template/expand/expand-list.module';
import { CurrencyListPopupModule } from '@template/msg/currency-list/currency-list-popup.module';
// ---------------- Pages Start ---------------- //
import { DepositOverviewMainComponent } from './deposit-overview-main/deposit-overview-main.component';
import { DepositOverviewDetailComponent } from './deposit-overview-detail/deposit-overview-detail.component';
import { DepositOverviewAccountComponent } from './deposit-overview-account/deposit-overview-account.component';
// ---------------- API Start ---------------- //
import { SPEC05010101ApiService } from '@api/spec05/spec05010101/spec05010101-api.service';

// ---------------- Service Start ---------------- //
import { DepositOverviewService } from '@pages/deposit/shared/deposit-overview.service';


@NgModule({
    imports: [
        SharedModule,
        DepositOverviewRoutingModule,
        ChartDoughnutComponentModule,
        ExpandListModule,
        CurrencyListPopupModule
    ],
    providers: [
        // ---------------- API Start ---------------- //
        SPEC05010101ApiService,
        // ---------------- Service Start ---------------- //
        DepositOverviewService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        DepositOverviewMainComponent,
        DepositOverviewDetailComponent,
        DepositOverviewAccountComponent
    ]
})
export class DepositOverviewModule { }
