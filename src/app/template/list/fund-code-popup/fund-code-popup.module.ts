/**
 * 基金標的popup
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from '@systems/shared.module';
import { FundCodePopupServiceModule } from './fund-code-popup-service.module';
// ---------------- Model Start ---------------- //
import { TranslateModule } from '@ngx-translate/core';
import { RateFormateModule } from '@template/formate/number/rate/rate-formate.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
// ---------------- Pages Start ---------------- //
import { FundCodePopupComponent } from './fund-code-popup.component';
// ---------------- Service Start ---------------- //
import { FundCodePopupService } from './fund-code-popup.service';
import { SearchFundCodeDirective } from '@template/deposit/searchFundCode/search-fundcode.directive';
// == 其他template清單 == //
const TemplateList = [
    SearchFundCodeDirective
  ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        TranslateModule,
        FlagFormateModule,
        RateFormateModule,
        SharedModule,
        FundCodePopupServiceModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        FundCodePopupService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FundCodePopupComponent,
        TemplateList
    ],
    exports: [
        FundCodePopupComponent,
        TemplateList
    ],
    entryComponents: [
        FundCodePopupComponent
    ]
})
export class FundCodePopupModule { }
