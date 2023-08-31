/**
 * Route定義
 * 綜存開戶約定
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { CompositDepositAgreeComponent } from './main/composit-deposit-agree.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: CompositDepositAgreeComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompositDepositAgreeRoutingModule { }
