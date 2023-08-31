/**
 * Route定義
 * 語言
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { SystemInfoComponent } from './systemInfo.component';

const routes: Routes = [
  { path: '', redirectTo: 'systeminfo', pathMatch: 'full' }
  , {
    path: 'systeminfo', component: SystemInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemInfoRoutingModule { }
