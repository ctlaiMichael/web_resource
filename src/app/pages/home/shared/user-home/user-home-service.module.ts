/**
 * 登入後首頁 Service Module
 */
import { NgModule } from '@angular/core';

// ---------------- Service Start ---------------- //
import { UserHomeService } from './user-home.service';
// ---------------- API Start ---------------- //
import { SPEC05010201ApiService } from '@api/spec05/spec05010201/spec05010201-api.service'; // 帳戶資產


@NgModule({
    imports: [
    ],
    providers: [
        // ---------------- API Start ---------------- //
        SPEC05010201ApiService,
        // ---------------- Service Start ---------------- //
        UserHomeService
    ],
    declarations: [
    ]
})
export class UserHomeServiceModule { }
