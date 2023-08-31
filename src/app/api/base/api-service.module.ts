/**
 * API 模組
 */
import { NgModule } from '@angular/core';
import { SimulationHttpInterceptorModule } from '@simulation/simulation.module';
// ---------------- Service Start ---------------- //
import { CheckMaintainService } from '@lib/network/check-maintain.service'; // 停機公告
import { CheckNetworkService } from '@lib/network/check-network.service'; // 網路通訊狀態檢核
import { MscalePluginService } from '@lib/security/mscale/mscale-plugin.service'; // challenage response lib
import { ChallengeResponseService } from './challenge-response.service'; // challenage response

import { TelegramService } from './telegram.service';

@NgModule({
    imports: [
        SimulationHttpInterceptorModule
    ],
    providers: [
        CheckMaintainService,
        CheckNetworkService,
        MscalePluginService,
        ChallengeResponseService,
        TelegramService
    ],
    declarations: [
    ]
})
export class ApiServiceModule { }
