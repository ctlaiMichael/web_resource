/**
 * 各期帳單及未出帳查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { HistoryBillRoutingModule } from './history-bill-routing.module';
// ---------------- Module Start ---------------- //
import { CardNoticeModule } from '@pages/card/shared/card-notice/card-notice.module';
import { ExpandListModule } from '@template/expand/expand-list.module';
import { CardSelectMonthModule } from '@pages/card/shared/card-select-month/card-select-month.module';
import { CardMonthPopupModule } from '@template/list/card-month-popup/card-month-popup.module';
import { PaymentStatusModule } from '@pages/card/shared/payment-status/payment-status.module';
import { CardsAmountComponentModule } from '@template/deposit/cards-amount/cards-amount-component.module'; // 金額處理
// ---------------- Pages Start ---------------- //
import { HistoryBillMainComponent } from './history-bill-main/history-bill-main.component';
import { HistoryBillDetailComponent } from './history-bill-detail/history-bill-detail.component';
import { HistoryBillInfoComponent } from './history-bill-info/history-bill-info.component';
import { HistoryBillUnpaidComponent } from './history-bill-unpaid/history-bill-unpaid.component';
// ---------------- API Start ---------------- //
// ---------------- Service Start ---------------- //
import { HistoryBillServiceModule } from '@pages/card/shared/history-bill-service.module';
import { CardDetailShowYearModule } from '@template/card-detail-show-year/card-detail-show-year.module';
@NgModule({
    imports: [
        SharedModule,
        HistoryBillRoutingModule,
        CardNoticeModule,
        ExpandListModule,
        CardSelectMonthModule,
        CardMonthPopupModule,
        PaymentStatusModule,
        HistoryBillServiceModule,
        CardDetailShowYearModule,
        CardsAmountComponentModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        HistoryBillMainComponent,
        HistoryBillDetailComponent,
        HistoryBillInfoComponent,
        HistoryBillUnpaidComponent
    ]
})
export class HistoryBillModule { }
