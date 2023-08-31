/**
 * 基金申購Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
// ---------------- Module Start ---------------- //
import { FundInvestRoutingModule } from './fund-invest-routing.module';
import { SharedModule } from '@systems/shared.module';
import { BookmarkModule } from '@template/bookmark/bookmark.module';
import { NoteModule } from '@template/note/note.module';
import { InputDateComponentModule } from '@template/date/input-date/input-date-component.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
import { FundCodePopupModule } from '@template/list/fund-code-popup/fund-code-popup.module';
import { ResultStatusTempModule } from '@template/result/result-temp.module';
import { SecurityInterfaceModule } from '@systems/security-interface/security-interface.module';
import { DateSelectModule } from '@template/list/date-select-popup/date-select.module';
import { TermPopupModule } from '@template/list/term-popup/term-popup.module';
// ---------------- Pages Start ---------------- //
import { FundInvestMainComponent } from './fund-invest-main/fund-invest-main.component';
import { SingleInvestEditComponent } from './single-invest/single-invest-edit/single-invest-edit.component';
import { SingleConfirmResultComponent } from './single-invest/single-invest-confirm-result/single-confirm-result.component';
import { RegularInvestEditComponent } from './regular-invest/regular-invest-edit/regular-invest-edit.component';
import { RegularConfirmResultComponent } from './regular-invest/regular-confirm-result/regular-confirm-result.component';
import { InvestTermComponent } from './invest-term/invest-term.component';
// ---------------- API Start ---------------- //
import { SPEC11040201ApiService } from '@api/spec11/spec11040201/spec11040201-api.service';
import { SPEC11040202ApiService } from '@api/spec11/spec11040202/spec11040202-api.service';
import { SPEC11040104ApiService } from '@api/spec11/spec11040104/spec11040104-api.service';
import { SPEC11040204ApiService } from '@api/spec11/spec11040204/spec11040204-api.service';
import { SPEC11040301ApiService } from '@api/spec11/spec11040301/spec11040301-api.service';
import { SPEC11040302ApiService } from '@api/spec11/spec11040302/spec11040302-api.service';
import { SPEC11040105ApiService } from '@api/spec11/spec11040105/spec11040105-api.service';
import { SPEC11040205ApiService } from '@api/spec11/spec11040205/spec11040205-api.service';
import { SPEC11040401ApiService } from '@api/spec11/spec11040401/spec11040401-api.service';
import { SPEC11040402ApiService } from '@api/spec11/spec11040402/spec11040402-api.service';
import { SPEC11040106ApiService } from '@api/spec11/spec11040106/spec11040106-api.service';
import { SPEC11040206ApiService } from '@api/spec11/spec11040206/spec11040206-api.service';
import { SPEC11040001ApiService } from '@api/spec11/spec11040001/spec11040001-api.service';
import { SPEC00050201ApiService } from '@api/spec00/spec00050201/spec00050201-api.service';
// ---------------- Service Start ---------------- //
import { FundInvestService } from '../shared/fund-invest.service';
import { FundAcctPopupService } from '@template/list/fund-acct-popup/fund-acct-popup.service';
import { TermPopupService } from '@template/list/term-popup/term-popup.service';

@NgModule({
    imports: [
        SharedModule,
        FundInvestRoutingModule,
        BookmarkModule,
        NoteModule,
        InputDateComponentModule,
        StepBarModule,
        FundCodePopupModule,
        ResultStatusTempModule,
        SecurityInterfaceModule,
        DateSelectModule,
        TermPopupModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        FundInvestService,
        FundAcctPopupService, // 基金共用帳號popup清單
        SPEC11040201ApiService, // 台幣單筆申購-編輯頁
        SPEC11040202ApiService, // 外幣單筆申購-編輯頁
        SPEC11040104ApiService, // 台幣定期定額-編輯頁
        SPEC11040204ApiService, // 外幣定期定額-編輯頁
        SPEC11040301ApiService, // 台幣單筆申購-確認頁
        SPEC11040302ApiService, // 外幣單筆申購-確認頁
        SPEC11040105ApiService, // 台幣定期定額-確認頁 
        SPEC11040205ApiService, // 外幣定期定額-確認頁
        SPEC11040401ApiService, // 台幣單筆申購-結果頁 
        SPEC11040402ApiService, // 外幣單筆申購-結果頁
        SPEC11040106ApiService, // 台幣定期定額-結果頁
        SPEC11040206ApiService, // 外幣定期定額-結果頁
        SPEC11040001ApiService, // 條款相關
        SPEC00050201ApiService,  // 條款查詢html範本
        TermPopupService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FundInvestMainComponent, // 申購主控
        SingleInvestEditComponent, // 單筆申購-編輯頁
        SingleConfirmResultComponent, // 單筆申購-確認-結果頁
        RegularInvestEditComponent, // 定期定額-編輯頁
        RegularConfirmResultComponent, // 定期定額-確認-結果頁
        InvestTermComponent // 基金申購-同意條款
    ]
})
export class FundInvestModule { }
