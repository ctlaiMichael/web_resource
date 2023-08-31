/**
 * Route定義
 * 外幣兌換
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { ForeignTransferMainComponent } from './main/foreign-transfer-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: ForeignTransferMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForeignTransferRoutingModule { }
