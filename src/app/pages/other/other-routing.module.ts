/**
 * Route定義
 * 其他服務
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ---------------- Pages Start ---------------- //

const routes: Routes = [
  // == 服務據點 == //
  {
    path: 'service-location', loadChildren: './service-location/service-location.module#ServiceLocationModule'
    , data: {
      preload: false
    }
  }
  // == 線上客服 == //
  , {
    path: 'online-service', loadChildren: './online-service/online-service.module#OnlineServiceModule'
    , data: {
      preload: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherRoutingModule { }
