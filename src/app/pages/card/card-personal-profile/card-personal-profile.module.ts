/**
 * 信用卡現況查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { CardPersonalProfileRoutingModule } from './card-personal-profile-routing.module';

// ---------------- Module Start ---------------- //
import { CardNoticeModule } from '@pages/card/shared/card-notice/card-notice.module';
import { CardPersonalProfileServiceModule } from '../shared/card-personal-profile-service.module';
// ---------------- Pages Start ---------------- //
import { CardPersonalProfileMainComponent } from './card-personal-profile-main/card-personal-profile-main.component';

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        CardNoticeModule, // 謹慎理財note
        CardPersonalProfileRoutingModule,
        CardPersonalProfileServiceModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        CardPersonalProfileMainComponent
    ]
})
export class CardPersonalProfileModule { }
