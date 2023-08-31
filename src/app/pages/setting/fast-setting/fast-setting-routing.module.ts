/**
 * Route定義
 * 快速設定
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRequired } from '@systems/system/auth/login-required.service';
// ---------------- Pages Start ---------------- //
import { FastSettingComponent } from './main/fast-setting-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: FastSettingComponent
    , canActivate: [LoginRequired]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FastSettingRoutingModule { }
