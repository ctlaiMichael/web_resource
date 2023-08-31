/**
 * 綜存開戶約定Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { SharedModule } from '@systems/shared.module';
// ---------------- Pages Start ---------------- //
import { HomePageAgreeAgreeRoutingModule } from './home-page-agree-routing.module';
import { HomePageAgreeComponent } from './main/home-page-agree.component';
// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //

@NgModule({
    imports: [
        SharedModule,
        HomePageAgreeAgreeRoutingModule,
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        HomePageAgreeComponent
    ]
})
export class HomePageAgreeModule { }
