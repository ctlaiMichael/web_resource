/**
 * 定期(不)定額查詢修改Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { FundInquiryModifyRoutingModule } from './fund-inquiry-modify-routing.module';
import { SharedModule } from '@systems/shared.module';
import { ExpandListModule } from '@template/expand/expand-list.module';
import { NoteModule } from '@template/note/note.module';
import { PaginatorCtrlModule } from '@template/paginator/paginator-ctrl.module';
import { ErrorBoxModule } from '@template/msg/error-box/error-box.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
// ---------------- Pages Start ---------------- //
import { FundInquiryModifyMainComponent } from './fund-inquiry-modify-main/fund-inquiry-modify-main.component';
import { FundInquiryModifyDetailComponent } from './fund-inquiry-modify-detail/fund-inquiry-modify-detail.component';
import { FundInquiryModifyContentComponent } from './fund-inquiry-modify-content/fund-inquiry-modify-content.component';
import { FundInquiryChangeStatusComponent } from './inquery-change-status/fund-inquiry-change-status/fund-inquiry-change-status.component';
import { FundInquiryStatusResultComponent } from './inquery-change-status/fund-inquery-status-result/fund-inquiry-status-result.component';
import { FundInquiryChangeEditComponent } from './inquery-change-edit/fund-inquiry-change-edit/fund-inquiry-change-edit.component';
import { FundInquiryConfirmResultComponent } from './inquery-change-edit/fund-inquiry-confirm-result/fund-inquiry-confirm-result.component';
// ---------------- API Start ---------------- //
import { SPEC11050101ApiService } from '@api/spec11/spec11050101/spec11050101-api.service';
import { SPEC11050201ApiService } from '@api/spec11/spec11050201/spec11050201-api.service';
import { SPEC11050202ApiService } from '@api/spec11/spec11050202/spec11050202-api.service';
import { SPEC11050301ApiService } from '@api/spec11/spec11050301/spec11050301-api.service';
import { SPEC11050302ApiService } from '@api/spec11/spec11050302/spec11050302-api.service';
import { SPEC11050401ApiService } from '@api/spec11/spec11050401/spec11050401-api.service';
import { SPEC11050402ApiService } from '@api/spec11/spec11050402/spec11050402-api.service';
// ---------------- Service Start ---------------- //
import { FundInquiryModifyService } from '../shared/fund-inquiry-modify.service';
import { FundAcctPopupService } from '@template/list/fund-acct-popup/fund-acct-popup.service';
import { DateSelectService } from '@template/list/date-select-popup/date-select.service';

@NgModule({
    imports: [
        SharedModule,
        FundInquiryModifyRoutingModule,
        ExpandListModule,
        NoteModule,
        PaginatorCtrlModule, // 分頁機制
        ErrorBoxModule,
        StepBarModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        FundInquiryModifyService,
        FundAcctPopupService,
        DateSelectService,
        // api
        SPEC11050101ApiService, // 定期定額定期(不)定額查詢
        SPEC11050201ApiService, // 定期定額定期(不)定額編輯(台幣)
        SPEC11050202ApiService, // 定期定額定期(不)定額編輯(外幣)
        SPEC11050301ApiService, // 定期定額定期(不)定額確認(台幣)
        SPEC11050302ApiService, // 定期定額定期(不)定額確認(外幣)
        SPEC11050401ApiService, // 定期定額定期(不)定額變更(台幣)
        SPEC11050402ApiService  // 定期定額定期(不)定額變更(外幣)
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FundInquiryModifyMainComponent, // 
        FundInquiryModifyDetailComponent,
        FundInquiryModifyContentComponent,
        FundInquiryChangeStatusComponent, // 定期定額修改-暫停,恢復扣款(編輯頁)
        FundInquiryStatusResultComponent, // 定期定額修改-暫停,恢復扣款(確認結果頁)
        FundInquiryChangeEditComponent, // 定期定額修改-修改帳號金額日期
        FundInquiryConfirmResultComponent // 定期定額修改-修改帳號金額日期(確認,結果頁)
    ]
})
export class FundInquiryModifyModule { }
