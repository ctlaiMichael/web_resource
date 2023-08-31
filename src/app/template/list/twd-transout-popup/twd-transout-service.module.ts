/**
 * 台幣轉出帳號資料取得
 */
import { NgModule } from '@angular/core';
// ---------------- API Start ---------------- //
import { SPEC09000301ApiService } from '@api/spec09/spec09000301/spec09000301-api.service';
import { SPEC09000302ApiService } from '@api/spec09/spec09000302/spec09000302-api.service';
import { TwdTransOutService } from './twd-transout.service';


@NgModule({
    imports: [
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC09000302ApiService, // 非約定轉出帳號查詢
        SPEC09000301ApiService, // 約定轉出帳號查詢
        TwdTransOutService
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class TwdTransOutServiceModule { }
