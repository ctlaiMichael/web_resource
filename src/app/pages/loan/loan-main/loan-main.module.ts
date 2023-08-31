/**
 * 基本資料查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SelectAccountModule } from '@template/deposit/select-account/select-account.module';
import { AccountPopupModule } from '@template/list/account-popup/account-popup.module';
// ---------------- Module Start ---------------- //
import { LoanMainRoutingModule } from './loan-main-routing.module';
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //
import { LoanMainBasicComponent } from './loan-main-basic/loan-main-basic.component';

// ---------------- API Start ---------------- //
import { SPEC08010001ApiService } from '@api/spec08/spec08010001/spec08010001-api.service';
// ---------------- Service Start ---------------- //
import { LoanBasicService } from '../shared/loan-basic.service';

@NgModule({
    imports: [
        SharedModule,
        LoanMainRoutingModule,
        SelectAccountModule,
        AccountPopupModule, // 帳號popup
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        LoanBasicService,
        SPEC08010001ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        LoanMainBasicComponent
    ]
})
export class LoanMainModule { }
