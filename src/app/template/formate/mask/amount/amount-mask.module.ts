/**
 * 帳號餘額眼睛功能Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { SharedModule } from '@systems/shared.module';

// ---------------- Pages Start ---------------- //
import { AmountMaskComponent } from './amount-mask.component';
import { DepositAmountComponentModule } from '@template/deposit/deposit-amount/deposit-amount-component.module';

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        DepositAmountComponentModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        AmountMaskComponent
    ],
    exports: [
        AmountMaskComponent
    ]
})
export class AmountMaskModule { }
