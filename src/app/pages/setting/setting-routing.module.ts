/**
 * Route定義
 * 設定
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRequired } from '@systems/system/auth/login-required.service';
// ---------------- Pages Start ---------------- //

const routes: Routes = [
  // == 快速(登入/交易)設定 == //
  {
    path: 'fast-setting', loadChildren: './fast-setting/fast-setting.module#FastSettingModule'
    , data: {
      preload: false
    }
    , canActivate: [LoginRequired]
  },
  // == 語言 == //
  {
    path: 'language', loadChildren: './language/language.module#LanguageModule'
    , data: {
      preload: false
    }
    // , canActivate: [LoginRequired]
  },
  // == 系統資訊 == //
  {
    path: 'systeminfo', loadChildren: './systemInfo/systemInfo.module#SystemInfoModule'
    , data: {
      preload: false
    }
    // , canActivate: [LoginRequired]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
