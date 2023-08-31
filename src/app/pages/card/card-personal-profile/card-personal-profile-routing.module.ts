/**
 * Route定義
 * 信用卡現況查詢
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { CardPersonalProfileMainComponent } from './card-personal-profile-main/card-personal-profile-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: CardPersonalProfileMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardPersonalProfileRoutingModule { }
