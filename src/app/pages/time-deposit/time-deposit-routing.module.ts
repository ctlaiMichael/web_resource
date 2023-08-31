/**
 * Route定義
 * 定期存款服務
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ---------------- Pages Start ---------------- //

const routes: Routes = [
    // == 定期存款 == //
    {
      path: 'time-deposit-main', loadChildren: './time-deposit-main/time-deposit-main.module#TimeDepositMainModule'
      , data: {
        preload: false
      }
    },
  // == 自動轉期約定 == //
  {
    path: 'auto-carry-over-agreement', loadChildren: './auto-carry-over-agreement/auto-carry-over-agreement.module#AutoCarryOverAgreementModule'
    , data: {
      preload: false
    }
  }
  // == 定存結清 == //
  , {
    path: 'time-deposit-close', loadChildren: './time-deposit-close/time-deposit-close.module#TimeDepositCloseModule'
    , data: {
      preload: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeDepositRoutingModule { }
