/**
 * 基本資料查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { LoanDetailRoutingModule } from './loan-detail-routing.module';
import { SharedModule } from '@systems/shared.module';
import { ExpandListModule } from '@template/expand/expand-list.module';
import { BookmarkModule } from '@template/bookmark/bookmark.module';
import { DateSelectModule } from '@template/list/date-select-popup/date-select.module';
import { DateRangeSearchComponentModule } from '@template/date-range-search/date-range-search-component.module';
import { NoteModule } from '@template/note/note.module';
import { PaginatorCtrlModule } from '@template/paginator/paginator-ctrl.module';
import { SelectAccountModule } from '@template/deposit/select-account/select-account.module';
import { AccountPopupModule } from '@template/list/account-popup/account-popup.module';
import { DepositAmountComponentModule } from '@template/deposit/deposit-amount/deposit-amount-component.module';
import { DetailShowYearModule } from '@template/detail-show-year/detail-show-year.module';
// ---------------- Pages Start ---------------- //
import { LoanDetailMainComponent } from './loan-detail-main/loan-detail-main.component';
import { LoanDetailDetailsComponent } from './loan-detail-details/loan-detail-details.component';
import { LoanDetailInterestComponent } from './loan-detail-interest/loan-detail-interest.component';

// ---------------- API Start ---------------- //
import { SPEC08020101ApiService } from '@api/spec08/spec08020101/spec08020101-api.service';
import { SPEC08020201ApiService } from '@api/spec08/spec08020201/spec08020201-api.service';
// ---------------- Service Start ---------------- //
import { LoanDetailService } from '../shared/loan-detail.service';

@NgModule({
    imports: [
        SharedModule,
        LoanDetailRoutingModule,
        ExpandListModule,
        BookmarkModule, // 頁籤套件
        DateSelectModule,
        DateRangeSearchComponentModule,
        NoteModule,
        PaginatorCtrlModule, // 分頁機制
        SelectAccountModule,
        AccountPopupModule, // 帳號popup
        DepositAmountComponentModule, // 支出存入處理
        DetailShowYearModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        LoanDetailService,
        SPEC08020101ApiService,
        SPEC08020201ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        LoanDetailMainComponent, // 本金利息明細查詢
        LoanDetailDetailsComponent, // 本金利息明細查詢(本金)
        LoanDetailInterestComponent // 本金利息明細查詢(利息)
    ]
})
export class LoanDetailModule { }
