/**
 * 理財妙管家Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { AutoFundRedeemRoutingModule } from './auto-fund-redeem-routing.module';
import { SharedModule } from '@systems/shared.module';
import { ExpandListModule } from '@template/expand/expand-list.module';
import { NoteModule } from '@template/note/note.module';
import { PaginatorCtrlModule } from '@template/paginator/paginator-ctrl.module';
import { ErrorBoxModule } from '@template/msg/error-box/error-box.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
import { FundProfitComponentModule } from '../shared/fund-profit/fund-profit-component.module';
// ---------------- Pages Start ---------------- //
import { FundRedeemMainComponent } from './auto-fund-redeem-main/auto-fund-redeem-main.component';
import { FundRedeemDetailComponent } from './auto-fund-redeem-detail/auto-fund-redeem-detail.component';
import { FundRedeemContentComponent } from './auto-fund-redeem-content/auto-fund-redeem-content.component';
import { FundRedeemModifyComponent } from './auto-fund-redeem-modify/auto-fund-redeem-modify.component';
import { AutoModifyConfirmResultComponent } from '../auto-modify-confirm-result/auto-modify-confirm-result.component';
// ---------------- API Start ---------------- //
import { SPEC11060101ApiService } from '@api/spec11/spec11060101/spec11060101-api.service';
import { SPEC11060201ApiService } from '@api/spec11/spec11060201/spec11060201-api.service';
import { SPEC11060301ApiService } from '@api/spec11/spec11060301/spec11060301-api.service';
// ---------------- Service Start ---------------- //
import { AutoFundRedeemService } from '../shared/auto-fund-redeem.service';
import { FundAcctPopupService } from '@template/list/fund-acct-popup/fund-acct-popup.service';


@NgModule({
    imports: [
        SharedModule,
        AutoFundRedeemRoutingModule,
        ExpandListModule,
        NoteModule,
        PaginatorCtrlModule, // 分頁機制
        ErrorBoxModule,
        StepBarModule,
        FundProfitComponentModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        AutoFundRedeemService,
        FundAcctPopupService,
        // api
        SPEC11060101ApiService,
        SPEC11060201ApiService,
        SPEC11060301ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FundRedeemMainComponent,
        FundRedeemDetailComponent,
        FundRedeemContentComponent,
        FundRedeemModifyComponent,
        AutoModifyConfirmResultComponent
    ]
})
export class AutoFundRedeemModule { }
