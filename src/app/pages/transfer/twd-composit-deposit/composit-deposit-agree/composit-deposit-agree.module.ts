/**
 * 綜存開戶約定Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //
import { CompositDepositAgreeRoutingModule } from './composit-deposit-agree-routing.module';
import { CompositDepositAgreeComponent } from './main/composit-deposit-agree.component';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { CompositDepositAgreeService } from '@pages/transfer/shared/composit-deposit-agree.service';
import { SPEC09020101ApiService } from '@api/spec09/spec09020101/spec09020101-api.service';
import { SPEC09020102ApiService } from '@api/spec09/spec09020102/spec09020102-api.service';
import { CompositDepositAgreeContentService } from '@pages/transfer/shared/composit-deposit-agree-content.service';
import { ResultStatusTempModule } from '@template/result/result-temp.module';

@NgModule({
    imports: [
        SharedModule,
        CompositDepositAgreeRoutingModule,
        ResultStatusTempModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        CompositDepositAgreeService,
        CompositDepositAgreeContentService,
        SPEC09020101ApiService,
        SPEC09020102ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        CompositDepositAgreeComponent
    ],
    exports: [
        CompositDepositAgreeComponent
    ]
})
export class CompositDepositAgreeModule { }
