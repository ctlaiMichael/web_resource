/**
 * 投資交易明細查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { FundProfitLossRoutingModule } from './fund-profit-loss-routing.module';
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
import { FundProfitLossMainComponent } from './fund-profit-loss-main/fund-profit-loss-main.component';
import { FundProfitLossDetailComponent } from './fund-profit-loss-detail/fund-profit-loss-detail.component';
import { FundProfitLossContentComponent } from './fund-profit-loss-content/fund-profit-loss-content.component';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { FundProfitLossService } from '../shared/fund-profit-loss.service';
import { SPEC11070101ApiService } from '@api/spec11/spec11070101/spec11070101-api.service';
import { FundProfitComponentModule } from '../shared/fund-profit/fund-profit-component.module';


@NgModule({
    imports: [
        SharedModule,
        FundProfitLossRoutingModule,
        ExpandListModule,
        BookmarkModule, // 頁籤套件
        DateSelectModule,
        DateRangeSearchComponentModule,
        NoteModule,
        PaginatorCtrlModule, // 分頁機制
        SelectAccountModule,
        AccountPopupModule, // 帳號popup
        DepositAmountComponentModule, // 支出存入處理
        FundProfitComponentModule
        
    ],
    providers: [
        // ---------------- API Start ---------------- //
        SPEC11070101ApiService,
        // ---------------- Service Start ---------------- //
        FundProfitLossService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FundProfitLossMainComponent,
        FundProfitLossDetailComponent,
        FundProfitLossContentComponent
    ]
})
export class  FundProfitLossModule { }

