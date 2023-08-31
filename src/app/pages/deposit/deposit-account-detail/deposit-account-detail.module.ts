/**
 * 帳戶明細查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { DepositAccountDetailRoutingModule } from './deposit-account-detail-routing.module';
import { SharedModule } from '@systems/shared.module';
import { ExpandListModule } from '@template/expand/expand-list.module';
import { BookmarkModule } from '@template/bookmark/bookmark.module';
import { DateSelectModule } from '@template/list/date-select-popup/date-select.module';
import { DateRangeSearchComponentModule } from '@template/date-range-search/date-range-search-component.module';
import { PaginatorCtrlModule } from '@template/paginator/paginator-ctrl.module';
import { SelectAccountModule } from '@template/deposit/select-account/select-account.module';
import { AccountPopupModule } from '@template/list/account-popup/account-popup.module';
import { DepositAmountComponentModule } from '@template/deposit/deposit-amount/deposit-amount-component.module';
import { DetailShowYearModule } from '@template/detail-show-year/detail-show-year.module';
// ---------------- Pages Start ---------------- //
import { AccountMainComponent } from './account-main/account-main.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
// ---------------- API Start ---------------- //
import { SPEC05030101ApiService } from '@api/spec05/spec05030101/spec05030101-api.service';

// ---------------- Service Start ---------------- //
import { DepositAccountDetailService } from '@pages/deposit/shared/deposit-account-detail.service';


@NgModule({
    imports: [
        SharedModule,
        DepositAccountDetailRoutingModule,
        ExpandListModule,
        BookmarkModule, // 頁籤套件
        DateSelectModule,
        DateRangeSearchComponentModule,
        PaginatorCtrlModule, // 分頁機制
        SelectAccountModule,
        AccountPopupModule, // 帳號popup
        DepositAmountComponentModule, // 支出存入處理
        DetailShowYearModule
    ],
    providers: [
        // ---------------- API Start ---------------- //
        SPEC05030101ApiService,
        // ---------------- Service Start ---------------- //
        DepositAccountDetailService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        AccountMainComponent,
        AccountDetailComponent
    ]
})
export class DepositAccountDetailModule { }
