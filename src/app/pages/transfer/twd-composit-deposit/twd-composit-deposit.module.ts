/**
 * 台幣綜存及定存Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { TwdCompositDepositRoutingModule } from './twd-composit-deposit-routing.module';
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        TwdCompositDepositRoutingModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
    ]
})
export class TwdCompositDepositModule { }
