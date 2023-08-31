/**
 * Route定義
 * Demo-Popup
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoPopupComponent } from './demo-popup.component';

// == Route 設定 == //
const routes: Routes = [
    { path: '', redirectTo: 'popup', pathMatch: 'full' },
    // Popup
    { path: 'popup', component: DemoPopupComponent, data: {} },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoPopupRoutingModule {
    constructor(
    ) {
    }
}
