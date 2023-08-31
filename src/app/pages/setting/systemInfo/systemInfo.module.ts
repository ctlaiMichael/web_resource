/**
 * 系統資訊Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { SystemInfoRoutingModule } from './systemInfo-routing.module';

// ---------------- Pages Start ---------------- //
import { SystemInfoComponent } from './systemInfo.component';

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { SharedModule } from '@systems/shared.module';

@NgModule({
    imports: [
        SharedModule,
        SystemInfoRoutingModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        SystemInfoComponent
    ]
})
export class SystemInfoModule { }