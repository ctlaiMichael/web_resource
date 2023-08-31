/**
 * Route定義
 * 定期存款
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { TimeDepositBasicComponent } from './time-deposit-basic/time-deposit-basic.component';
import { TimeDepositDetailComponent } from './time-deposit-detail/time-deposit-detail.component';
import { TimeDepositControlComponent } from './time-deposit-control/time-deposit-control.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' }
  , {
    path: 'main', component: TimeDepositControlComponent,
  }
  , {
    path: 'basic', component: TimeDepositBasicComponent,
  }
  , {
    path: 'detail', component: TimeDepositDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeDepositMainRoutingModule { }
