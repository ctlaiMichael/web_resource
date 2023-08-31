/**
 * 定期存款Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { TimeDepositMainRoutingModule } from './time-deposit-main-routing.module';
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
import { TimeDepositControlComponent } from './time-deposit-control/time-deposit-control.component';
import { TimeDepositBasicComponent } from './time-deposit-basic/time-deposit-basic.component';
import { TimeDepositDetailComponent } from './time-deposit-detail/time-deposit-detail.component';

// ---------------- API Start ---------------- //
import { SPEC07010101ApiService } from '@api/spec07/spec07010101/spec07010101-api.service';
import { SPEC07010201ApiService } from '@api/spec07/spec07010201/spec07010201-api.service';
// ---------------- Service Start ---------------- //
import { CheckService } from '@template/check/check.service';
import { TimeDepositMainService } from '../shared/time-deposit-main.service';


@NgModule({
    imports: [
        SharedModule,
        TimeDepositMainRoutingModule,
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
        // ---------------- Service Start ---------------- //
        TimeDepositMainService,
        CheckService,
        SPEC07010101ApiService,
        SPEC07010201ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        TimeDepositControlComponent, // 定期存款(主控)
        TimeDepositBasicComponent, // 定期存款(基本資料)
        TimeDepositDetailComponent // 定期存款(明細)
    ]
})
export class TimeDepositMainModule { }
