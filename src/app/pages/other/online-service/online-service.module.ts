/**
 * 線上客服Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { OnlineServiceRoutingModule } from './online-service-routing.module';
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //
import { MainComponent } from './main/main.component';

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        OnlineServiceRoutingModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        MainComponent
    ]
})
export class OnlineServiceModule { }
