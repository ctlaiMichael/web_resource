/**
 * 匯率到價通知設定Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { ExchangeRateNoticeRoutingModule } from './exchange-rate-notice-routing.module';
import { SharedModule } from '@systems/shared.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
import { CurrencyFlagPopupModule } from '@template/list/currency-flag/currency-flag-popup.module';
import { DatepickerPopComponentModule } from '@template/list/datepicker-pop/datepicker-pop-component.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
import { NumberFormateModule } from '@template/formate/number/number-formate.module';
import { ExchangeRateServiceModule } from '../shared/service/exchange-rate-service.module';
import { ResultStatusTempModule } from '@template/result/result-temp.module';

// ---------------- Pages Start ---------------- //
import { ExchangeRateNoticeMainComponent } from './main/exchange-rate-notice-main.component';
import { ExchangeRateNoticeSettingComponent } from './notice-setting/exchange-rate-notice-setting.component';
import { NoticeConfirmResultComponent } from './notice-confirm-result/notice-confirm-result.component';

// ---------------- API Start ---------------- //
import { SPEC10090101ApiService } from '@api/spec10/spec10090101/spec10090101-api.service';
import { SPEC10090201ApiService } from '@api/spec10/spec10090201/spec10090201-api.service';

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        ExchangeRateNoticeRoutingModule,
        FlagFormateModule,
        CurrencyFlagPopupModule,
        DatepickerPopComponentModule,
        StepBarModule,
        NumberFormateModule,
        ExchangeRateServiceModule,
        ResultStatusTempModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC10090101ApiService,
        SPEC10090201ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        ExchangeRateNoticeMainComponent,
        ExchangeRateNoticeSettingComponent,
        NoticeConfirmResultComponent
    ]
})
export class ExchangeRateNoticeModule { }
