/**
 * 投資交易明細查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { FundHistoryRoutingModule } from './fund-history-routing.module';
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
// ---------------- Pages Start ---------------- //
import { FundHistoryMainComponent } from './fund-histroy-main/fund-histroy-main.component';
import { FundHistoryDetailComponent } from './fund-history-detail/fund-histroy-detail.component';
import { FundHistoryContnetComponent } from './fund-history-content/fund-history-content.component';
// ---------------- API Start ---------------- //
import { SPEC11080101ApiService } from '@api/spec11/spec11080101/spec11080101-api.service';

// ---------------- Service Start ---------------- //
import { FundHistoryService } from '../shared/fund-history.service';


@NgModule({
    imports: [
        SharedModule,
        FundHistoryRoutingModule,
        ExpandListModule,
        BookmarkModule, // 頁籤套件
        DateSelectModule,
        DateRangeSearchComponentModule,
        NoteModule,
        PaginatorCtrlModule, // 分頁機制
        SelectAccountModule,
        AccountPopupModule, // 帳號popup
        DepositAmountComponentModule // 支出存入處理
    ],
    providers: [
        // ---------------- API Start ---------------- //
        SPEC11080101ApiService,
        // ---------------- Service Start ---------------- //
        FundHistoryService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FundHistoryMainComponent, // 主控
        FundHistoryDetailComponent, // 明細
        FundHistoryContnetComponent // 詳細內容
    ]
})
export class FundHistoryModule { }

