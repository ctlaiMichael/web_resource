/**
 * 投資資訊情報Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { InvestInformationRoutingModule } from './invest-information-routing.module';
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        InvestInformationRoutingModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
    ]
})
export class InvestInformationModule { }
