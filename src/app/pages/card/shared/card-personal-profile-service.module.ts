import { NgModule } from "@angular/core";
import { SPEC12010101ApiService } from '@api/spec12/spec12010101/spec12010101-api.service';
import { CardPersonalProfileService } from './card-personal-profile.service';

/**
 * 信卡現況查詢 Service Module
 */
// == 基本設定 == //


@NgModule({
    imports: [

    ],
    providers: [
        // ---------------- Service Start ---------------- //
        SPEC12010101ApiService,
        CardPersonalProfileService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
    ]
})
export class CardPersonalProfileServiceModule { }