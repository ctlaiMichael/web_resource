/**
 * 外幣兌換Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { ForeignTransferRoutingModule } from './foreign-transfer-routing.module';
import { SharedModule } from '@systems/shared.module';
import { MenuPopupModule } from '@template/list/menu-popup/menu-popup.module';
import { BookmarkModule } from '@template/bookmark/bookmark.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
import { CurrencyFlagPopupModule } from '@template/list/currency-flag/currency-flag-popup.module';
import { ExchangeRateServiceModule } from '@pages/financial/shared/service/exchange-rate-service.module';
import { TransAcctPopupModule } from '@template/list/trans-acct-popup/trans-acct-popup.module';
import { RemitNaturePopupModule } from '@template/list/remit-nature-popup/remit-nature-popup.module';
import { NumberFormateModule } from '@template/formate/number/number-formate.module';
import { AmountMaskModule } from '@template/formate/mask/amount/amount-mask.module';
import { ResultStatusTempModule } from '@template/result/result-temp.module';
import { CountDownModule } from '@template/count-down/count-down.module';
// ---------------- Pages Start ---------------- //
import { ForeignTransferMainComponent } from './main/foreign-transfer-main.component';
import { ForeignTransferConfirmResultComponent } from './foreign-transfer-confirm-result/foreign-transfer-confirm-result.component';

// ---------------- API Start ---------------- //
import { SPEC09030001ApiService } from '@api/spec09/spec09030001/spec09030001-api.service';
import { SPEC09030101ApiService } from '@api/spec09/spec09030101/spec09030101-api.service';
import { SPEC09030201ApiService } from '@api/spec09/spec09030201/spec09030201-api.service';

// ---------------- Service Start ---------------- //
import { ForeignTransferService } from '../shared/service/foreign-transfer.service';
import { ExchangeRateModule } from '@pages/financial/exchange-rate/exchange-rate.module';


@NgModule({
    imports: [
        SharedModule,
        ForeignTransferRoutingModule,
        MenuPopupModule,
        BookmarkModule,
        StepBarModule,
        FlagFormateModule,
        CurrencyFlagPopupModule,
        ExchangeRateServiceModule,
        TransAcctPopupModule,
        RemitNaturePopupModule,
        NumberFormateModule,
        AmountMaskModule,
        ResultStatusTempModule,
        CountDownModule,
        ExchangeRateModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        ForeignTransferService,
        SPEC09030001ApiService,
        SPEC09030101ApiService,
        SPEC09030201ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        ForeignTransferMainComponent,
        ForeignTransferConfirmResultComponent
    ]
})
export class ForeignTransferModule { }
