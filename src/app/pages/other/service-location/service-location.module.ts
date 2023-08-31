/**
 * 服務據點Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { ServiceLocationRoutingModule } from './service-location-routing.module';
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //
import { MainComponent } from './main/main.component';

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        ServiceLocationRoutingModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        MainComponent
    ]
})
export class ServiceLocationModule { }
