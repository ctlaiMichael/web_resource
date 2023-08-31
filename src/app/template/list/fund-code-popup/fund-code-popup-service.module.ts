/**
 * 基金標的
 */
import { NgModule } from '@angular/core';
// ---------------- API Start ---------------- //
import { SPEC11040101ApiService } from '@api/spec11/spec11040101/spec11040101-api.service';
import { FundCodeService } from './fund-code.service';

@NgModule({
    imports: [
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        FundCodeService,
        SPEC11040101ApiService // 標的選擇
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class FundCodePopupServiceModule { }
