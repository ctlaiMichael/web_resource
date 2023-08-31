/**
 * 定存結清Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { TimeDepositCloseRoutingModule } from './time-deposit-close-routing.module';
import { SharedModule } from '@systems/shared.module';
import { TransAcctPopupModule } from '@template/list/trans-acct-popup/trans-acct-popup.module';

// ---------------- Pages Start ---------------- //
import { CloseTimeDepositMainComponent } from './close-time-deposit-main/close-time-deposit-main.component';

// ---------------- API Start ---------------- //
import { SPEC07040001ApiService } from '@api/spec07/spec07040001/spec07040001-api.service';

// ---------------- Service Start ---------------- //
import { CloseTimeDepositService } from '../shared/close-time-deposit.service';

@NgModule({
    imports: [
        SharedModule,
        TimeDepositCloseRoutingModule,
        TransAcctPopupModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        CloseTimeDepositService,
        SPEC07040001ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        CloseTimeDepositMainComponent
    ]
})
export class TimeDepositCloseModule { }
